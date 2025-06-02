// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    mobileMenuBtn.classList.toggle("active");
});

// Header Scroll Effect
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.remove("scrolled");
    } else {
        header.classList.add("scrolled");
    }
});

// Scroll Animations
const fadeInElements = document.querySelectorAll(
    ".fade-in, .fade-in-left, .fade-in-right, .scale-in"
);

const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeInElements.forEach((element) => {
    observer.observe(element);
});

// FAQ Accordion
// const faqItems = document.querySelectorAll(".faq-item");

// faqItems.forEach((item) => {
//     const question = item.querySelector(".faq-question");
//     question.addEventListener("click", () => {
//         const isActive = item.classList.contains("active");

//         // Close all other FAQ items
//         faqItems.forEach((i) => {
//             if (i !== item) {
//                 i.classList.remove("active");
//             }
//         });

//         // Toggle current FAQ item
//         item.classList.toggle("active", !isActive);
//     });
// });

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: "smooth",
            });

            // Close mobile menu if open
            navLinks.classList.remove("active");
            mobileMenuBtn.classList.remove("active");
        }
    });
});

// Stats Counter Animation
const statNumbers = document.querySelectorAll(".stat-number");
let statsAnimated = false;

const animateStats = () => {
    statNumbers.forEach((stat) => {
        const target = parseInt(stat.textContent.replace(/[^0-9]/g, ""));
        let current = 0;
        const increment = target / 100;

        const updateCounter = () => {
            current += increment;
            if (current >= target) {
                stat.textContent = stat.textContent.replace(
                    /[0-9,]+/,
                    target.toLocaleString()
                );
                return;
            }
            stat.textContent = stat.textContent.replace(
                /[0-9,]+/,
                Math.floor(current).toLocaleString()
            );
            requestAnimationFrame(updateCounter);
        };

        updateCounter();
    });
};

const statsSection = document.querySelector(".stats-section");
const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
        animateStats();
        statsAnimated = true;
    }
}, observerOptions);

statsObserver.observe(statsSection);

// Form Submission Handling (Placeholder)
const contactForm = document.querySelector(".contact-form form");
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Placeholder for form submission logic
    console.log("Form submitted:", { name, email, message });
    alert("Thank you for your message! We will get back to you soon.");

    // Reset form
    contactForm.reset();
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.classList.add('dark-theme');
    updateIcons(true);
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    updateIcons(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

function updateIcons(isDark) {
    const sunIcon = themeToggle.querySelector('.fa-sun');
    const moonIcon = themeToggle.querySelector('.fa-moon');

    if (sunIcon && moonIcon) {
        sunIcon.style.display = isDark ? 'none' : 'inline';
        moonIcon.style.display = isDark ? 'inline' : 'none';
    }
}
