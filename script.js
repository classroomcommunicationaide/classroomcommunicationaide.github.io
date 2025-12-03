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

    document.getElementById("year").textContent = new Date().getFullYear();
});

function createCarousel(containerId, imagePaths, intervalTime = 5000) {
    const container = document.getElementById(containerId);

    // Add images dynamically
    imagePaths.forEach((path, i) => {
        const img = document.createElement('img');
        img.src = path;
        if (i === 0) {
            img.classList.add('active');
        }
        container.appendChild(img);
    });

    const images = container.querySelectorAll('img');
    const imageLength = images.length;
    const dotsContainer = container.querySelector('.dots');
    const leftArrow = container.querySelector('.arrow.left');
    const rightArrow = container.querySelector('.arrow.right');

    imagePaths.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) {
            dot.classList.add('active');
        }
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    let currentIndex = 0;
    let interval;

    function showImage(index) {
        images.forEach((img, i) => img.classList.toggle('active', i === index));
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
            dot.style.setProperty('--progress', '0%');
        });
    }

    function goToImage(index) {
        currentIndex = index;
        showImage(currentIndex);
    }

    function startProgress() {
        let start = null;
        const duration = intervalTime;

        function step(timestamp) {
            if (!start) {
                start = timestamp;
            }

            let progress = (timestamp - start) / duration * 100;

            if (progress > 100) {
                progress = 100;
            }

            dots[currentIndex].style.setProperty('--progress', progress + '%');

            if (progress < 100) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    }

    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(() => {
            goToImage((currentIndex + 1) % imageLength);
            startProgress();
        }, intervalTime);
        startProgress();
    }

    // Initialize
    showImage(currentIndex);
    resetInterval();

    // Allow clicks
    leftArrow.addEventListener('click', () => { 
        goToImage((currentIndex - 1 + imageLength) % imageLength);
        resetInterval(); 
    });

    rightArrow.addEventListener('click', () => { 
        goToImage((currentIndex + 1) % imageLength);
        resetInterval(); 
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToImage(index);
            resetInterval();
        });
    });
}

createCarousel('Research-Methodology-Carousel', [
    'img/group_prototype/prototype_1/01_student_login.png',
    'img/group_prototype/prototype_1/02_teacher_login.png',
    'img/group_prototype/prototype_1/03_student_page1.png',
    'img/group_prototype/prototype_1/04_student_page2.png',
    'img/group_prototype/prototype_1/05_teacher_defaul_page1.png',
    'img/group_prototype/prototype_1/06_teacher_defaul_page2.png',
    'img/group_prototype/prototype_1/07_teacher_custom_msg_res.png',
    'img/group_prototype/prototype_1/08_teacher_request_history.png',
    'img/group_prototype/prototype_1/09_teacher_all_student.png',
    'img/group_prototype/prototype_1/10_teacher_add_student.png',
]);

createCarousel('System-Analysis-Carousel', [
    'img/group_prototype/prototype_2/01_student_page.png',
    'img/group_prototype/prototype_2/02_student_popup1.png',
    'img/group_prototype/prototype_2/03_student_popup2.png',
    'img/group_prototype/prototype_2/04_student_translation_page.png',
    'img/group_prototype/prototype_2/05_student_edit_page.png',
    'img/group_prototype/prototype_2/06_teacher_default_page.png',
    'img/group_prototype/prototype_2/07_teacher_setting_page.png',
    'img/group_prototype/prototype_2/08_teacher_all_student_icon_view.png',
    'img/group_prototype/prototype_2/09_teacher_all_student_icon_view_add_student.png',
    'img/group_prototype/prototype_2/10_teacher_all_student_icon_view_student_info.png',
    'img/group_prototype/prototype_2/11_teacher_all_student_list_view.png',
    'img/group_prototype/prototype_2/12_teacher_all_student_list_view_add_student.png',
    'img/group_prototype/prototype_2/13_teacher_custom_msg_res.png',
    'img/group_prototype/prototype_2/14_teacher_request_history.png',
]);

createCarousel('User-Study-Carousel', [
    'img/group_prototype/prototype_3/01_student_default_page.png',
    'img/group_prototype/prototype_3/02_teacher_all_student_list_view_try_yourself.png',
    'img/group_prototype/prototype_3/03_teacher_all_student_icon_view_try_yourself.png',
]);

