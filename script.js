document.addEventListener("DOMContentLoaded", () => {
    const sections = [...document.querySelectorAll("section[id]")];
    const navLinks = [...document.querySelectorAll("nav a")];

    function updateActive() {
        let currentSection = sections[0].id;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();

            if (rect.top <= window.innerHeight * 0.10) {
                currentSection = section.id;
            }
        });

        // Update highlight
        navLinks.forEach(link => {
            const isActive = link.getAttribute("href") === `#${currentSection}`;
            link.classList.toggle("active", isActive);
        });
    }

    window.addEventListener("scroll", updateActive);
    updateActive();
});
