document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. HELP WIDGET SETUP
       ========================================================================== */
    const helpWidget = document.createElement('div');
    helpWidget.id = 'lazyvim-help-widget';
    helpWidget.innerHTML = `
        <div class="help-header">
            <span class="fg-blue">[?]</span> Help & Controls
        </div>
        <div class="help-content">
            <p><span class="fg-orange">j</span> / <span class="fg-orange">↓</span> : Move down</p>
            <p><span class="fg-orange">k</span> / <span class="fg-orange">↑</span> : Move up</p>
            <p><span class="fg-orange">h</span> / <span class="fg-orange">←</span> : Back to tree</p>
            <p><span class="fg-orange">l</span> / <span class="fg-orange">→</span> : Open / Focus</p>
            <p><span class="fg-orange">Enter</span> : Open file</p>
            <p><span class="fg-orange">Esc</span> : Close menu</p>
            <br>
            <p class="fg-blue hint-text">(Hover or click to toggle)</p>
        </div>
    `;
    
    // Only append to DOM on larger screens
    if (window.innerWidth > 768) {
        document.body.appendChild(helpWidget);
    }

    // Toggle help content on click (or hover handled via CSS)
    helpWidget.addEventListener('click', () => {
        helpWidget.classList.toggle('expanded');
    });


    /* ==========================================================================
       2. VIM MOTIONS & KEYBOARD NAVIGATION
       ========================================================================== */
       
    // Determine context: Are we on the Dashboard (.menu-item) or Neotree (.tree-node)?
    let isDashboard = document.querySelector('.dashboard-menu') !== null;
    let navItems = isDashboard 
        ? Array.from(document.querySelectorAll('.menu-item'))
        : Array.from(document.querySelectorAll('.tree-node')).filter(node => node.getAttribute('href') !== null);
    
    let currentIndex = -1;

    // Helper to visually update selection
    const updateSelection = () => {
        navItems.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('vim-selected');
                // Ensure it's in view
                item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            } else {
                item.classList.remove('vim-selected');
            }
        });
    };

    // Global Key Listener
    window.addEventListener('keydown', (e) => {
        // Ignore if user is typing in an input (if any exist later)
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        // Help Menu Toggle
        if (e.key === '?') {
            helpWidget.classList.toggle('expanded');
            return;
        }

        if (e.key === 'Escape') {
            helpWidget.classList.remove('expanded');
            navItems.forEach(item => item.classList.remove('vim-selected'));
            currentIndex = -1;
            return;
        }

        // Vim Motions (j/k/h/l or Arrows)
        if (e.key === 'j' || e.key === 'ArrowDown') {
            e.preventDefault(); // Prevent scrolling
            if (currentIndex === -1) {
                const activeIdx = navItems.findIndex(item => item.classList.contains('active'));
                currentIndex = activeIdx >= 0 ? activeIdx : 0;
            } else if (currentIndex < navItems.length - 1) {
                currentIndex++;
            }
            updateSelection();
        } 
        else if (e.key === 'k' || e.key === 'ArrowUp') {
            e.preventDefault(); // Prevent scrolling
            if (currentIndex === -1) {
                const activeIdx = navItems.findIndex(item => item.classList.contains('active'));
                currentIndex = activeIdx >= 0 ? activeIdx : (navItems.length > 0 ? navItems.length - 1 : 0);
            } else if (currentIndex > 0) {
                currentIndex--;
            }
            updateSelection();
        }
        else if (e.key === 'h' || e.key === 'ArrowLeft') {
            e.preventDefault();
            if (!isDashboard && currentIndex === -1) {
                // Return focus to the neotree sidebar
                const activeItem = navItems.findIndex(item => item.classList.contains('active'));
                currentIndex = activeItem >= 0 ? activeItem : 0;
                updateSelection();
            }
        }
        else if (e.key === 'l' || e.key === 'ArrowRight') {
            e.preventDefault();
            if (currentIndex >= 0 && currentIndex < navItems.length) {
                navItems[currentIndex].click(); 
                if (!isDashboard) {
                    navItems.forEach(item => item.classList.remove('vim-selected'));
                    currentIndex = -1; // Remove focus from tree, simulating drop into right buffer
                }
            }
        }
        else if (e.key === 'Enter') {
            if (currentIndex >= 0 && currentIndex < navItems.length) {
                navItems[currentIndex].click(); 
                if (!isDashboard) {
                    navItems.forEach(item => item.classList.remove('vim-selected'));
                    currentIndex = -1;
                }
            }
        }
    });

    // Dashboard specific shortcuts mapped to hrefs (e.g., 'p' for Projects)
    if (isDashboard) {
        const dashboardShortcuts = {
            'a': '{{ "/#about" | relative_url }}', // Note: Jekyll vars won't parse in a pure JS file unless it's served by Jekyll with YAML frontmatter.
            // Since this is a pure JS file, we will dynamically read them from the DOM
        };
        
        // Build shortcut map from DOM elements
        const shortcutMap = {};
        navItems.forEach(item => {
            const keySpan = item.querySelector('.menu-key');
            if (keySpan) {
                const key = keySpan.textContent.trim().toLowerCase();
                const url = item.getAttribute('href');
                shortcutMap[key] = url;
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            const key = e.key.toLowerCase();
            if (shortcutMap[key]) {
                window.location.href = shortcutMap[key];
            }
        });
    }

    /* ==========================================================================
       3. SPA BUFFER SWITCHING & TAB MANAGEMENT (Neo-tree specific)
       ========================================================================== */
    if (!isDashboard) {
        const bufferContent = document.querySelector('.buffer-content');
        const statusFileName = document.getElementById('status-filename');
        const tabsContainer = document.getElementById('editor-tabs');
        const dashboardLink = '/'; 
        
        const TABS_KEY = 'neovim_tabs';
        
        const getTabs = () => {
            const tabsStr = sessionStorage.getItem(TABS_KEY);
            return tabsStr ? JSON.parse(tabsStr) : [];
        };
        
        const saveTabs = (tabs) => {
            sessionStorage.setItem(TABS_KEY, JSON.stringify(tabs));
        };
        
        const removeTab = (url) => {
            let tabs = getTabs();
            tabs = tabs.filter(t => t.url !== url);
            saveTabs(tabs);
            return tabs;
        };

        const renderTabs = () => {
            if (!tabsContainer) return;
            const tabs = getTabs();
            const currentUrl = window.location.pathname;
            
            tabsContainer.innerHTML = '';
            
            tabs.forEach(tab => {
                const isActive = tab.url === currentUrl;
                const tabEl = document.createElement('div');
                tabEl.className = `buffer-tab ${isActive ? 'active' : ''}`;
                tabEl.onclick = () => { if (!isActive) navigateTo(tab.url, false); };
                
                tabEl.innerHTML = `
                    <span class="tab-icon"><i class="fa-brands fa-markdown fg-blue"></i></span>
                    <span>${tab.title}</span>
                    <span class="tab-close"><i class="fa-solid fa-xmark"></i></span>
                `;
                
                const closeBtn = tabEl.querySelector('.tab-close');
                closeBtn.onclick = (e) => {
                    e.stopPropagation(); 
                    const remaining = removeTab(tab.url);
                    if (isActive) {
                        // If we closed the active tab, go to the last available tab, or dashboard
                        if (remaining.length > 0) {
                            navigateTo(remaining[remaining.length - 1].url, false);
                        } else {
                            window.location.href = dashboardLink;
                        }
                    } else {
                        renderTabs(); // Just re-render if it wasn't the active one
                    }
                };
                
                tabsContainer.appendChild(tabEl);
            });
            
            setTimeout(() => {
                const activeTab = tabsContainer.querySelector('.active');
                if (activeTab) activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }, 50);
        };
        
        const initCurrentTab = () => {
            const currentUrl = window.location.pathname;
            let tabs = getTabs();
            
            const activeSidebarLink = document.querySelector('.tree-node.active');
            let docTitle = "buffer.md";
            
            if (activeSidebarLink) {
                docTitle = activeSidebarLink.textContent.trim();
            }
            
            if (!tabs.find(t => t.url === currentUrl)) {
                tabs.push({ url: currentUrl, title: docTitle });
                saveTabs(tabs);
            }
            
            renderTabs();
        };

        const scrollPercentEl = document.getElementById('scroll-percentage');
        
        const updateScrollPercentage = () => {
            if (!scrollPercentEl || !bufferContent) return;
            const scrollTop = bufferContent.scrollTop;
            const scrollHeight = bufferContent.scrollHeight;
            const clientHeight = bufferContent.clientHeight;
            
            if (scrollHeight <= clientHeight) {
                scrollPercentEl.textContent = '100%';
                return;
            }
            
            const percent = Math.floor((scrollTop / (scrollHeight - clientHeight)) * 100);
            
            if (percent === 0) {
                scrollPercentEl.textContent = 'Top';
            } else if (percent === 100) {
                scrollPercentEl.textContent = 'Bot';
            } else {
                scrollPercentEl.textContent = percent + '%';
            }
        };

        bufferContent.addEventListener('scroll', updateScrollPercentage);
        window.addEventListener('resize', updateScrollPercentage);
        updateScrollPercentage(); 
        
        const navigateTo = async (url, pushState = true) => {
            const sidebarLink = navItems.find(l => l.getAttribute('href') === url);
            let docTitle = "buffer.md";
            
            if (sidebarLink) {
                docTitle = sidebarLink.textContent.trim();
            }

            navItems.forEach(l => l.classList.remove('active'));
            if (sidebarLink) sidebarLink.classList.add('active');
            
            try {
                const response = await fetch(url);
                const html = await response.text();
                const doc = new DOMParser().parseFromString(html, 'text/html');
                
                const newContent = doc.querySelector('.buffer-content').innerHTML;
                bufferContent.innerHTML = newContent;
                
                const newStatusFileNameStr = doc.getElementById('status-filename').textContent;
                if (statusFileName) statusFileName.textContent = newStatusFileNameStr;
                
                let tabs = getTabs();
                if (!tabs.find(t => t.url === url)) {
                    tabs.push({ url: url, title: docTitle });
                    saveTabs(tabs);
                }
                
                if (pushState) {
                    window.history.pushState({}, '', url);
                }
                
                renderTabs();
                setTimeout(updateScrollPercentage, 50);
                
            } catch (err) {
                console.error('Buffer fetch failed:', err);
                window.location.href = url;
            }
        };

        navItems.forEach(link => {
            if (link.getAttribute('href') === '/' || link.getAttribute('href') === '/index.html') return;
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(link.getAttribute('href'), true);
            });
        });

        window.addEventListener('popstate', () => {
            window.location.reload(); 
        });
        
        initCurrentTab();
    }

});
