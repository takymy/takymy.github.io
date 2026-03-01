---
---
// Mobile Menu Logic
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// --- TERMINAL FUNCTIONALITY ---
const floatingTermBtn = document.getElementById("floating-terminal-btn");
const terminalInput = document.getElementById("terminal-input");
const terminalBody = document.getElementById("terminal-body");
const heroSection = document.getElementById("hero");

// Hide floating button initially
if (floatingTermBtn) {
    floatingTermBtn.style.opacity = "0";
    floatingTermBtn.style.pointerEvents = "none";
    floatingTermBtn.style.transition = "opacity 0.3s ease";
}

// Scroll Event Listener for floating button
window.addEventListener("scroll", () => {
    if (!heroSection || !floatingTermBtn) return;
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    // Show button only when scrolled past hero
    if (heroBottom < 100) {
        floatingTermBtn.style.opacity = "1";
        floatingTermBtn.style.pointerEvents = "auto";
    } else {
        floatingTermBtn.style.opacity = "0";
        floatingTermBtn.style.pointerEvents = "none";
    }
});

if (floatingTermBtn) {
    floatingTermBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
            if(terminalInput) terminalInput.focus();
        }, 800);
    });
}

// Function to print a new line to the terminal
function printToTerminal(htmlContent, className = "output") {
    const newLine = document.createElement("div");
    newLine.className = `terminal-line ${className}`;
    newLine.innerHTML = htmlContent;
    const inputLine = document.querySelector(".terminal-input-line");
    terminalBody.insertBefore(newLine, inputLine);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Command execution map
const sections = [{% for item in site.data.nav %}{% if item.title != "Blog" and item.title != "Contact" %}"{{ item.title | downcase }}"{% unless forloop.last %}, {% endunless %}{% endif %}{% endfor %}, "contact"];

const fastfetchOutput = `
<div class="fetch-container" style="flex-direction: row; gap: 4rem; padding: 1rem 0; align-items: flex-start; display: flex;">
    <div class="fetch-logo accent-green mono">
<pre style="margin:0; text-shadow: 0 0 10px rgba(104, 138, 109, 0.4);">
  __  __   _____ 
 |  \\/  | / ____|
 | \\  / || |     
 | |\\/| || |     
 | |  | || |____ 
 |_|  |_| \\_____|
</pre>
    </div>
    <div class="fetch-info mono" style="display: flex; flex-direction: column; gap: 0.3rem;">
        <div class="fetch-title"><span class="accent-green">{{ site.author.prompt_user }}</span>@<span class="accent-blue">{{ site.author.prompt_hostname }}</span></div>
        <div class="fetch-line" style="color: var(--text-muted);">-------------------------</div>
        <div class="fetch-stat"><span class="accent-yellow" style="font-weight:bold; display:inline-block; white-space:pre;">OS   </span>: {{ site.author.os }}</div>
        <div class="fetch-stat"><span class="accent-yellow" style="font-weight:bold; display:inline-block; white-space:pre;">Host </span>: {{ site.author.name }}</div>
        <div class="fetch-stat"><span class="accent-yellow" style="font-weight:bold; display:inline-block; white-space:pre;">Role </span>: {{ site.author.role }}</div>
        <div class="fetch-stat"><span class="accent-yellow" style="font-weight:bold; display:inline-block; white-space:pre;">Focus</span>: {{ site.author.focus }}</div>
        <div class="fetch-colors" style="display: flex; gap: 0.5rem; margin-top: 1rem; margin-bottom: 1.5rem;">
            <span class="color-block" style="width:20px; height:20px; border-radius:0; background-color:var(--bg-dark); border:1px solid var(--border-color);"></span>
            <span class="color-block" style="width:20px; height:20px; border-radius:0; background-color:var(--accent-primary);"></span>
            <span class="color-block" style="width:20px; height:20px; border-radius:0; background-color:var(--accent-danger);"></span>
            <span class="color-block" style="width:20px; height:20px; border-radius:0; background-color:var(--accent-tertiary);"></span>
            <span class="color-block" style="width:20px; height:20px; border-radius:0; background-color:var(--text-muted);"></span>
        </div>
    </div>
</div>
`;

function executeCommand(commandStr) {
    const args = commandStr.trim().toLowerCase().split(/\s+/);
    const cmd = args[0];

    if (cmd === "") return;

    if (cmd === "help") {
        printToTerminal("<br><strong style='color: var(--accent-primary);'>AVAILABLE COMMANDS:</strong>");
        printToTerminal("<div style='margin-bottom:0.5rem; padding-left: 1rem; border-left: 2px solid var(--border-color);'>");
        printToTerminal("<span style='color: var(--accent-danger);'>fastfetch</span>                - Display system information summary.");
        printToTerminal("<span style='color: var(--accent-danger);'>cd</span> <span style='color: var(--accent-tertiary);'>[dir]</span>             - Navigate to a specific section.");
        printToTerminal(`<span style='color: var(--text-muted);'>↳ Valid dirs:</span> ${sections.map(s => `<span style='color: var(--text-primary);'>${s}</span>/`).join(", ")}`);
        printToTerminal("<span style='color: var(--accent-danger);'>./send_message.sh</span>    - Connect to comms (Contact section).");
        printToTerminal("<span style='color: var(--accent-danger);'>clear</span>                - Clear terminal output.");
    } else if (cmd === "ls") {
        printToTerminal("<div style='display:flex; gap:1rem; flex-wrap:wrap; margin-top:0.5rem;'>");
        sections.forEach(s => {
            printToTerminal(`<span style='color: var(--accent-tertiary); font-weight: bold;'>${s}/</span>`, "");
        });
        printToTerminal(`<span style='color: var(--accent-primary);'>send_message.sh</span>*`, "");
        printToTerminal("</div>");
    } else if (cmd === "fastfetch") {
        printToTerminal(fastfetchOutput);
    } else if (cmd === "rm" && args.includes("-rf") && (args.includes("*") || args.includes("/"))) {
        printToTerminal("<span style='color:var(--accent-danger); font-weight:bold;'>[!] ALERT: Nice try! hehe you sneaky bastard, gotcha ;)</span>");
    } else if (cmd === "clear") {
        const lines = terminalBody.querySelectorAll(".terminal-line");
        lines.forEach(line => line.remove());
    } else if (cmd === "exit" || cmd === "close") {
        printToTerminal(`Cannot close main terminal interface.`, "accent-red");
    } else if (cmd === "cd") {
        let target = args[1] || "";
        target = target.replace(/\/$/, ""); 
        
        if (sections.includes(target)) {
            printToTerminal(`Changing directory to <span style='color:var(--accent-primary);'>/${target}</span>...`);
            setTimeout(() => {
                const element = document.getElementById(target);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
        } else if (target === "~" || target === "") {
            printToTerminal(`Already at <span style='color:var(--accent-primary);'>/home</span>`);
        } else {
            printToTerminal(`cd: no such file or directory: <span style='color:var(--accent-danger);'>${target}</span>`, "accent-red");
        }
    } else if (cmd === "./send_message.sh") {
        printToTerminal(`Executing <span style='color:var(--accent-danger);'>send_message.sh</span>... Opening secure email client.`);
        setTimeout(() => {
            window.location.href = 'mailto:{{ site.author.email }}';
        }, 500);
    } else if (cmd.startsWith("./")) {
        printToTerminal(`bash: ${cmd}: Permission denied or script not found.`, "accent-red");
    } else {
        printToTerminal(`bash: <span style='color:var(--accent-danger);'>${cmd}</span>: command not found. Type 'help' for a list of commands.`, "accent-red");
    }
}

// Handle Enter key in terminal
if (terminalInput) {
    terminalInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            const command = this.value;
            printToTerminal(`<span class="prompt accent-green">{{ site.author.prompt_user }}@{{ site.author.prompt_hostname }}:~$</span> ${command}`);
            this.value = "";
            executeCommand(command);
        }
    });

    // Always keep focus on input if terminal clicked
    terminalBody.addEventListener("click", () => {
        if (!window.getSelection().toString()) {
            terminalInput.focus();
        }
    });

    // Run fastfetch on initial load
    setTimeout(() => {
        printToTerminal(`<span class="prompt accent-green">{{ site.author.prompt_user }}@{{ site.author.prompt_hostname }}:~$</span> fastfetch`);
        executeCommand("fastfetch");
        printToTerminal("<br>Type 'help' to see available commands.");
    }, 500);
}

/* =========================================
   DYNAMIC LINUX TYPING LOGO LOGIC
   ========================================= */
const dynLogo = document.getElementById("dynamic-logo");
let typingInterval;
const dummyCommands = [
{% for item in site.data.nav %}{% if item.title != "Contact" %}    "cd {{ item.title | downcase }}/",
{% endif %}{% endfor %}    "rm -rf /"
];
let currentCommandIndex = 0;

function typeGarbage() {
    if(!dynLogo) return;
    const rndCmd = dummyCommands[currentCommandIndex];
    currentCommandIndex++;
    
    let currentText = "{{ site.author.prompt_user }}@{{ site.author.prompt_hostname }}:~$ ";
    let i = 0;
    
    clearInterval(typingInterval);
    
    dynLogo.innerHTML = currentText + "<span>_</span>";
    
    typingInterval = setInterval(() => {
        if (i < rndCmd.length) {
            currentText += rndCmd.charAt(i);
            dynLogo.innerHTML = currentText + "<span class='cursor-blink'>_</span>";
            i++;
        } else {
            // Wait a sec then proceed
            clearInterval(typingInterval);
            
            if (rndCmd === "rm -rf /") {
                // Trigger glitch animation
                setTimeout(() => {
                    dynLogo.classList.add("glitch-effect");
                    dynLogo.style.color = "var(--accent-danger)";
                    setTimeout(() => {
                        dynLogo.classList.remove("glitch-effect");
                        dynLogo.style.color = ""; // reset color
                        dynLogo.innerHTML = ""; // Complete wipe
                        currentCommandIndex = 0; // Reset loop
                        setTimeout(typeGarbage, 800);
                    }, 800); // 800ms of aggressive glitching
                }, 400); // short pause before execution
            } else {
                setTimeout(typeGarbage, 1200);
            }
        }
    }, 80);
}

// Start typing by default
typeGarbage();

// On hover, pause typing and offer "cd ~" to return to top
if (dynLogo) {
    dynLogo.addEventListener("mouseenter", () => {
        clearInterval(typingInterval);
        dynLogo.innerHTML = "{{ site.author.prompt_user }}@{{ site.author.prompt_hostname }}:~$ cd ~<span class='cursor-blink'>_</span>";
        dynLogo.classList.remove("glitch-effect");
        dynLogo.style.color = "";
    });

    // On mouse leave, only start again if we weren't mid-glitch
    dynLogo.addEventListener("mouseleave", () => {
        if (!dynLogo.classList.contains("glitch-effect")) {
            typeGarbage();
        }
    });
}
