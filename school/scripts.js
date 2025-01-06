document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });

    // Fetch and display programs
    fetchPrograms();

    // Fetch and display events
    fetchEvents();

    // Fetch and display news
    fetchNews();

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', handleContactFormSubmit);

    // Handle newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', handleNewsletterFormSubmit);
});

async function fetchPrograms() {
    try {
        const response = await fetch('/api/programs');
        const programs = await response.json();
        const programGrid = document.getElementById('program-grid');
        programGrid.innerHTML = programs.map(program => `
            <div class="program-item">
                <h3>${program.name}</h3>
                <p>${program.description}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching programs:', error);
    }
}

async function fetchEvents() {
    try {
        const response = await fetch('/api/events');
        const events = await response.json();
        const eventList = document.getElementById('event-list');
        eventList.innerHTML = events.map(event => `
            <div class="event-item">
                <h3>${event.name}</h3>
                <p>Date: ${new Date(event.date).toLocaleDateString()}</p>
                <p>${event.description}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

async function fetchNews() {
    try {
        const response = await fetch('/api/news');
        const newsItems = await response.json();
        const newsGrid = document.getElementById('news-grid');
        newsGrid.innerHTML = newsItems.map(item => `
            <div class="news-item">
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
                <a href="${item.link}" target="_blank">Read more</a>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

async function handleContactFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            alert('Thank you for your message. We will get back to you soon!');
            event.target.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Error submitting contact form:', error);
        alert('There was an error sending your message. Please try again later.');
    }
}

async function handleNewsletterFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
        const response = await fetch('/api/newsletter', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            alert('Thank you for subscribing to our newsletter!');
            event.target.reset();
        } else {
            throw new Error('Failed to subscribe');
        }
    } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        alert('There was an error subscribing to the newsletter. Please try again later.');
    }
}