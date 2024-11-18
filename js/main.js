document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    emailjs.init("EPazYqFY-bpXJ_MEY");

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', 
            mobileMenuBtn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    function showStatus(message, isError = false) {
        formStatus.textContent = message;
        formStatus.className = isError ? 'error-message' : 'success-message';
        formStatus.style.display = 'block';

        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }

    function setFormState(isSubmitting) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        submitButton.disabled = isSubmitting;
        inputs.forEach(input => input.disabled = isSubmitting);
        submitButton.textContent = isSubmitting ? 'Sending...' : 'Send Message';
    }

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        setFormState(true);

        // Get form data
        const formData = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            to_name: 'Abdelali Belmady',
            to_email: 'abdelali.belmady@gmail.com'
        };

        try {
            // Send email using EmailJS
            const response = await emailjs.send(
                'service_kr61x6q',    // Your EmailJS service ID
                'template_iljlnfk',    // Your EmailJS template ID
                formData
            );

            if (response.status === 200) {
                showStatus('Message sent successfully! I will get back to you soon.');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('EmailJS Error:', error);
            showStatus('Failed to send message. Please try again later.', true);
        } finally {
            setFormState(false);
        }
    });

    // Form validation
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', function() {
        if (emailInput.validity.typeMismatch) {
            emailInput.setCustomValidity('Please enter a valid email address');
        } else {
            emailInput.setCustomValidity('');
        }
    });
});

const style = document.createElement('style');
style.textContent = `
    #form-status {
        display: none;
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 0.5rem;
        font-weight: 500;
    }

    .success-message {
        background-color: #dcfce7;
        color: #166534;
        border: 1px solid #166534;
    }

    .error-message {
        background-color: #fee2e2;
        color: #991b1b;
        border: 1px solid #991b1b;
    }

    button[type="submit"]:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);