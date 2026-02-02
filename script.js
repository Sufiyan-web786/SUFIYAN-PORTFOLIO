// Video Portfolio Data
const portfolioItems = [
    {
        id: 1,
        title: "LONG EDITED VIDEO",
        video: "assets/videos/project1.mp4",
        thumbnail: "assets/images/thumb1.jpg",
        category: "YOUTUBE LONG VIDEO"
    },
    {
        id: 2,
        title: "SHORT REEL EDITED",
        description: "Episodic travel vlog series edited for maximum viewer engagement and retention.",
        video: "assets/videos/project2.mp4",
        thumbnail: "assets/images/thumb2.jpg",
        category: "YouTube"
    },
    {
        id: 3,
        title: "EDITED VOICE",
        description: "High-energy promotional video for a fitness brand with motivational editing style.",
        video: "assets/videos/project3.mp4",
        thumbnail: "assets/images/thumb3.jpg",
        category: "Commercial"
    }
       
];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const portfolioGrid = document.querySelector('.portfolio-grid');
const videoModal = document.getElementById('video-modal');
const modalVideo = document.getElementById('modal-video');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeModal = document.querySelector('.close-modal');
const playShowreelBtn = document.getElementById('play-showreel');
const showreelVideo = document.getElementById('showreel-video');
const videoOverlay = document.querySelector('.video-overlay');
const contactForm = document.getElementById('contact-form');
const newsletterForm = document.getElementById('newsletter-form');
const skillProgressBars = document.querySelectorAll('.skill-progress');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
    initializeScrollReveal();
    initializeSkillBars();
    setupEventListeners();
});

// Initialize portfolio grid
function initializePortfolio() {
    if (!portfolioGrid) return;
    
    portfolioItems.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item reveal';
        portfolioItem.dataset.id = item.id;
        
        portfolioItem.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}" class="portfolio-thumbnail" loading="lazy">
            <div class="portfolio-overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <button class="play-btn small">
                    <i class="fas fa-play"></i>
                </button>
            </div>
        `;
        
        portfolioGrid.appendChild(portfolioItem);
    });
    
    // Add click event to portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', function() {
            const itemId = this.dataset.id;
            const portfolioItem = portfolioItems.find(item => item.id == itemId);
            
            if (portfolioItem) {
                openVideoModal(portfolioItem);
            }
        });
    });
}

// Initialize scroll reveal animations
function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
}

// Initialize skill bars animation
function initializeSkillBars() {
    // Animate skill bars when they come into view
    const animateSkillBars = () => {
        skillProgressBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (barTop < windowHeight - 100) {
                const width = bar.dataset.width;
                bar.style.width = `${width}%`;
            }
        });
    };
    
    // Initial check
    animateSkillBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);
}

// Setup all event listeners
function setupEventListeners() {
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Showreel play button
    if (playShowreelBtn) {
        playShowreelBtn.addEventListener('click', () => {
            showreelVideo.play();
            videoOverlay.classList.add('fade-out');
        });
    }
    
    // Close modal when clicking the X
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            closeVideoModal();
        });
    }
    
    // Close modal when clicking outside
    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
    }
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show an alert
            alert(`Thank you ${name}! Your message has been sent. I'll get back to you soon at ${email}.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // In a real application, you would send this to a newsletter service
            alert(`Thank you for subscribing with ${email}! You'll receive updates soon.`);
            
            // Reset form
            this.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update navbar on scroll
    window.addEventListener('scroll', updateNavbar);
}

// Open video modal
function openVideoModal(item) {
    modalVideo.src = item.video;
    modalTitle.textContent = item.title;
    modalDescription.textContent = item.description;
    
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close video modal
function closeVideoModal() {
    videoModal.classList.remove('active');
    modalVideo.pause();
    modalVideo.currentTime = 0;
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Update navbar style on scroll
function updateNavbar() {
    const header = document.querySelector('.header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        header.style.padding = '10px 0';
        header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
    } else {
        header.style.padding = '20px 0';
        header.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
    }
    
    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Handle video error
if (showreelVideo) {
    showreelVideo.addEventListener('error', function() {
        console.error('Error loading showreel video. Please check the file path.');
        videoOverlay.innerHTML = `
            <div style="text-align: center; color: white;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 20px;"></i>
                <h3>Video Not Found</h3>
                <p>Please ensure the showreel video is in the correct location: assets/videos/showreel.mp4</p>
            </div>
        `;
    });
}

// Handle portfolio video errors
if (modalVideo) {
    modalVideo.addEventListener('error', function() {
        console.error('Error loading portfolio video.');
        modalVideo.innerHTML = `
            <div style="text-align: center; color: white; padding: 50px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 20px;"></i>
                <h3>Video Not Found</h3>
                <p>Sample video file not found. In a real portfolio, this would play your actual work.</p>
            </div>
        `;
    });
}
