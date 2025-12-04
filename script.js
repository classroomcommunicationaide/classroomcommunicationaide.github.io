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

function createCarouselBase(containerId, items, renderSlide, intervalTime = 5000) {
    const container = document.getElementById(containerId);
    const dotsContainer = container.querySelector(".dots");
    const leftArrow = container.querySelector(".arrow.left");
    const rightArrow = container.querySelector(".arrow.right");

    items.forEach((item, i) => {
        const slide = document.createElement("div");
        slide.classList.add("slide");
        if (i === 0) {
            slide.classList.add("active");
        }

        slide.innerHTML = renderSlide(item);
        container.appendChild(slide);
    });

    items.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) {
            dot.classList.add("active");
        }
        dotsContainer.appendChild(dot);
    });

    const slides = container.querySelectorAll(".slide");
    const dots = dotsContainer.querySelectorAll(".dot");

    let currentIndex = 0;
    let interval;
    const itemsLength = items.length;

    function showSlide(index) {
        currentIndex = index;

        slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
            dot.style.setProperty("--progress", "0%");
        });
    }

    function startProgress() {
        let start = null;
        const duration = intervalTime;

        function frame(timestamp) {
            if (!start) {
                start = timestamp;
            }

            let progress = (timestamp - start) / duration * 100;

            if (progress > 100) {
                progress = 100;
            }

            dots[currentIndex].style.setProperty("--progress", progress + "%");

            if (progress < 100) {
                requestAnimationFrame(frame);
            }
        }
        requestAnimationFrame(frame);
    }

    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(() => {
            showSlide((currentIndex + 1) % itemsLength);
            startProgress();
        }, intervalTime);
        startProgress();
    }

    // Initialize
    showSlide(0);
    resetInterval();

    // Allow clicks
    leftArrow.onclick = () => { 
        showSlide((currentIndex - 1 + itemsLength) % itemsLength); 
        resetInterval(); 
    }
    rightArrow.onclick = () => { 
        showSlide((currentIndex + 1) % itemsLength); 
        resetInterval(); 
    }
    dots.forEach((dot, i) => dot.onclick = (() => { 
        showSlide(i); 
        resetInterval(); 
    }));
}

function createImageCarousel(id, imagePaths, intervalTime = 5000) {
    createCarouselBase(id, imagePaths, (path) => `
        <img src="${path}" class="img"/>
    `, intervalTime);
}

createImageCarousel('Research-Methodology-Carousel', [
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

createImageCarousel('System-Analysis-Carousel', [
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

createImageCarousel('User-Study-Carousel', [
    'img/group_prototype/prototype_3/01_student_default_page.png',
    'img/group_prototype/prototype_3/02_teacher_all_student_list_view_try_yourself.png',
    'img/group_prototype/prototype_3/03_teacher_all_student_icon_view_try_yourself.png',
]);

function createTextCarousel(id, papers, intervalTime = 8000) {
    createCarouselBase(id, papers, (paper) => `
        <h3 class="paper-title">${paper.title}</h3>
        <a href="${paper.link}" target="_blank" class="paper-link">🔗 View Paper</a>
        <p class="paper-desc">${paper.desc}</p>
    `, intervalTime);
}

createTextCarousel('Text-Carousel', [
    {
        title: "The Effects of Multi-Sensory Augmented Reality on Students’ Motivation in English Language Learning",
        link: "https://ieeexplore.ieee.org/document/8725096",
        desc: "Designing our project’s features in a way that naturally lends to language acquisition is in alignment with our end goal. The findings in the paper give us some great clues about the importance of including both visual text and auditory elements in our design. Additionally, the paper brings up a novel tool (augmented reality) and describes how it can be used to supplement teacher instruction."
    },
    {
        title: "Mobile Translation Apps. and Second Language Teaching; What do Students think?",
        link: "https://ieeexplore.ieee.org/document/9105728",
        desc: "Translation features can be helpful to include for our users and their feelings of belongingness and understanding in class. At the same time, it is a valid concern that too much translation aid can inhibit the natural acquisition of a language for our young users. This paper provides support for incorporating translation features into our web app solution, and backs the idea that it could be more helpful than harmful for students with a low level of language skill."
    },
    {
        title: "Augmentative and Alternative Communication in an Elementary School Setting: A Case Study",
        link: "https://doi.org/10.1044/2021_LSHSS-21-00052",
        desc: "The paper’s naturalistic observations of when, where, and why AAC is used highlight real limitations, such as reliance on fixed command sets, that directly inform our design. By providing large, visual, customizable shortcut buttons and real time teacher notifications, our web app addresses those gaps and supports more consistent, classroom-centered communication."
    },
    {
        title: "Effect of mobile technology featuring visual scene displays and just-in-time programming on communication turns by preadolescent and adolescent beginning communicators",
        link: "https://www.tandfonline.com/doi/full/10.1080/17549507.2018.1441440",
        desc: "The paper emphasizes visual interfaces and the rapid creation of context relevant supports: the study’s visual scene displays (VSDs) and just-in-time (JIT) programming map directly to our large icon buttons, rapid shortcut creation, and teacher dashboard. By leveraging immediacy, meaningful visuals, and teacher mediated support, our design should promote faster, more confident student to teacher interactions."
    },
    {
        title: "The impact of Integrated Learning Apps on Oral Proficiency Development in Chinese EFL Learners",
        link: "https://ieeexplore.ieee.org/document/11113597",
        desc: "put here"
    },
    {
        title: "ICT tools’ contributions in a technology-enhanced peer learning program involving EFL learners",
        link: "https://ieeexplore.ieee.org/document/9499949",
        desc: "put here"
    },
    {
        title: "EFL Students’ Perceptions on the Use of Booklet in Grammar Classes",
        link: "https://dl.acm.org/doi/10.1145/3606094.3606117",
        desc: "put here"
    }, 
    {
        title: "Enhancing Grammar Learning for ESL Primary School Students through a Game-Based Response System",
        link: "https://ieeexplore.ieee.org/document/10868919",
        desc: "put here"
    }
]);

function createSystemCarousel(id, systems, intervalTime = 8000) {
    createCarouselBase(id, systems, (system) => `
        <h3 class="system-title"><a href="${system.link}" target="_blank" class="system-link">${system.title1}</a></h3>
        <h3 class="system-title"><a href="${system.link}" target="_blank" class="system-link">${system.title1}</a></h3>
        <p class="system-desc">${system.desc}</p>
    `, intervalTime);
}

createSystemCarousel('System-Carousel', [
    {
        link1: "https://www.classdojo.com/",
        title1: "ClassDojo",
        link1: "https://www.classdojo.com/",
        title1: "ClassDojo",
        desc: "hi"
    }

]);