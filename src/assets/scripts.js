document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.getElementById('navbar');

    // Mobile Navigation Toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        console.log("Toggle clicked!");
    });

    // Close mobile menu when a link is clicked
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Responsive Animation for Skill Bars
    const skillItems = document.querySelectorAll('.skill-item');
    const observerOptions = {
        threshold: 0.1
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 50);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillItems.forEach(item => {
        skillObserver.observe(item);
    });

    // Responsive Touch Interactions for Project Cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('touchstart', () => {
            card.classList.add('touched');
        });

        card.addEventListener('touchend', () => {
            card.classList.remove('touched');
        });
    });  
});

const firebaseConfig = {
    apiKey: "AIzaSyBRzAPr7ofWqlCt8MOiUMOHcbvGgmqiz3s",
    authDomain: "contact-form-portfolio-4c127.firebaseapp.com",
    projectId: "contact-form-portfolio-4c127",
    storageBucket: "contact-form-portfolio-4c127.firebasestorage.app",
    messagingSenderId: "60876468756",
    appId: "1:60876468756:web:2eb1cd51eccf78cf0aad01",
    measurementId: "G-3Q3S5LL7GS",
    databaseURL: "https://contact-form-portfolio-4c127-default-rtdb.asia-southeast1.firebasedatabase.app"
};
  
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// Contact form submission
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    if (!name || !email) {
        alert("Please fill all fields.");
        return;
    }

    // Push data to Firebase
    let newMessageRef = database.ref("messages").push();
    newMessageRef.set({
        name: name,
        email: email,
        timestamp: new Date().toISOString()
    }).then(() => {
        alert("Message sent successfully!");
        document.getElementById("contactForm").reset();
    }).catch(error => {
        alert("Error: " + error.message);
    });
});
