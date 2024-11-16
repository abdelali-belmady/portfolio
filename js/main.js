// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// EmailJS initialization
(function() {
    emailjs.init("EPazYqFY-bpXJ_MEY"); // Replace with your actual public key
})();

// Contact form handling
const contactForm = document.getElementById('contactForm');
const successMessage = document.createElement('div');
const errorMessage = document.createElement('div');

// Style success and error messages
successMessage.style.cssText = `
    display: none;
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: #dcfce7;
    color: #166534;
`;
errorMessage.style.cssText = `
    display: none;
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: #fee2e2;
    color: #991b1b;
`;

successMessage.textContent = 'Message sent successfully!';
errorMessage.textContent = 'Failed to send message. Please try again.';

// Add messages to the form
contactForm.appendChild(successMessage);
contactForm.appendChild(errorMessage);

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        to_email: "abdelali.belmady@gmail.com"
    };

    try {
        await emailjs.send(
            'service_kr61x6q',
            'template_iljlnfk',
            formData
        );

        // Show success message
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);

    } catch (error) {
        console.error('Error:', error);
        // Show error message
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';

        // Hide error message after 5 seconds
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }
});