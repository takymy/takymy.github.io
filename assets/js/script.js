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
