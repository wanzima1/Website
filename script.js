document.addEventListener('DOMContentLoaded', function() {
    // Slideshow for home section
    const images = ["/placeholder.svg?height=600&width=1200&text=Welcome+to+Our+School", 
                    "/placeholder.svg?height=600&width=1200&text=Quality+Education", 
                    "/placeholder.svg?height=600&width=1200&text=Nurturing+Future+Leaders"];
    let currentIndex = 0;

    function changeImage() {
        const slideImage = document.getElementById("slideImage");
        currentIndex = (currentIndex + 1) % images.length;
        slideImage.src = images[currentIndex];
    }

    setInterval(changeImage, 5000);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact form submission
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            document.getElementById("formResponse").textContent = "Thank you for your message! We'll get back to you soon.";
            this.reset();
        });
    }

    // Newsletter subscription
    const newsletterForm = document.getElementById("newsletter-form");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Thank you for subscribing to our newsletter!");
            this.reset();
        });
    }

    // Admission form submission
    const admissionForm = document.getElementById("admission-form");
    if (admissionForm) {
        admissionForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Thank you for your admission inquiry. We'll contact you shortly with more information.");
            this.reset();
        });
    }

    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 50) {
                element.classList.add('animated');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check on page load

    // Toggle mobile menu
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }
});