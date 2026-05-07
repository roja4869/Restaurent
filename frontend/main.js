// Initialize Lucide Icons
lucide.createIcons();

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2000);
});

// Scroll Progress
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollable) * 100;
    scrollProgress.style.width = `${scrolled}%`;

    const nav = document.getElementById('main-nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Gold Dust Particles
const createParticles = () => {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and animation duration
        const x = Math.random() * 100;
        const duration = 10 + Math.random() * 15;
        const delay = Math.random() * 20;
        const size = 2 + Math.random() * 4;
        
        particle.style.left = `${x}vw`;
        particle.style.top = `100vh`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `-${delay}s`;
        
        container.appendChild(particle);
    }
};
createParticles();

// Reveal on Scroll
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

revealElements.forEach(el => revealObserver.observe(el));

// Menu Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const menuCategories = document.querySelectorAll('.menu-category');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        menuCategories.forEach(cat => {
            cat.classList.remove('active');
            if (cat.id === target) {
                cat.classList.add('active');
                // Trigger reveal for elements inside the new category
                const revealInCat = cat.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
                revealInCat.forEach(el => el.classList.add('active'));
            }
        });
    });
});

// Mobile Menu
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Basic toggle - style in CSS for mobile
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Simple Testimonial Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');

const showSlide = (n) => {
    slides.forEach(s => s.style.display = 'none');
    dots.forEach(d => d.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].style.display = 'block';
    slides[currentSlide].style.animation = 'fadeIn 0.8s ease';
    dots[currentSlide].classList.add('active');
};

// Initialize if testimonials exist
if (slides.length > 0) {
    showSlide(0);
    setInterval(() => showSlide(currentSlide + 1), 5000);
}

// Form Submission (Connected to Backend)
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = bookingForm.querySelector('button');
        const originalText = btn.innerText;
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            guests: document.getElementById('guests').value,
            phone: document.getElementById('phone').value
        };

        btn.innerText = 'PREPARING YOUR ROYAL TABLE...';
        btn.disabled = true;
        
        try {
            const response = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                alert(`Pranam ${formData.name}! Your royal table reservation has been confirmed. ${result.message}`);
                bookingForm.reset();
            } else {
                alert('Apologies, there was an issue with your reservation: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Pranam! Your request has been received (Simulated Mode). We look forward to serving you!');
            bookingForm.reset();
        } finally {
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });
}
