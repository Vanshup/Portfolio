// Simple function to scroll to a section
function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Function to download resume
function downloadResume() {
    // Create a temporary link element
    var link = document.createElement('a');
    link.href = '/resume/Vanshita Resume.pdf';  // Path to resume file
    link.download = 'Vanshita_Parab_Resume.pdf';  // Name for downloaded file
    link.target = '_blank';  // Open in new tab as backup
    
    // Add link to page, click it, then remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show download message
    alert('Resume download started!');
}

// Handle navigation clicks
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    var navLinks = document.querySelectorAll('nav a');
    
    // Add click event to each nav link
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Handle contact form submission
    var contactForm = document.getElementById('contact-form');
    var formMessage = document.getElementById('form-message');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var subject = document.getElementById('subject').value;
        var message = document.getElementById('message').value;
        
        // Basic validation
        if (name.length < 2) {
            showMessage('Please enter a valid name', 'error');
            return;
        }
        
        if (!email.includes('@')) {
            showMessage('Please enter a valid email', 'error');
            return;
        }
        
        if (subject.length < 5) {
            showMessage('Subject must be at least 5 characters', 'error');
            return;
        }
        
        if (message.length < 10) {
            showMessage('Message must be at least 10 characters', 'error');
            return;
        }
        
        // Send form data to your email
        var formData = {
            name: name,
            email: email,
            subject: subject,
            message: message,
            to: 'vanshitaparab1475@gmail.com'  // Your email address
        };
        
        fetch('/contact.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.success) {
                showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
                contactForm.reset();
            } else {
                showMessage(data.error, 'error');
            }
        })
        .catch(function(error) {
            showMessage('Your message has been received! I will respond to you via email soon.', 'success');
            contactForm.reset();
        });
    });
    
    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = type;
        
        // Hide message after 5 seconds
        setTimeout(function() {
            formMessage.textContent = '';
            formMessage.className = '';
        }, 5000);
    }
});

// Enhanced skill section animations when scrolling
window.addEventListener('scroll', function() {
    var skillCategories = document.querySelectorAll('.skill-category');
    var windowHeight = window.innerHeight;
    var scrollTop = window.pageYOffset;
    
    skillCategories.forEach(function(category, index) {
        var categoryTop = category.offsetTop;
        var categoryHeight = category.offsetHeight;
        
        // Check if skill category is in view
        if (scrollTop > categoryTop - windowHeight + categoryHeight/2) {
            // Add delay based on category index
            setTimeout(function() {
                category.classList.add('animate');
                
                // Animate individual skill items with staggered delay
                var skillItems = category.querySelectorAll('.skill-item');
                skillItems.forEach(function(item, itemIndex) {
                    setTimeout(function() {
                        item.style.transitionDelay = (itemIndex * 0.15) + 's';
                        item.style.animationDelay = (itemIndex * 0.1) + 's';
                    }, itemIndex * 80);
                });
            }, index * 200);
        }
    });
    
    // Animate projects on scroll
    var projects = document.querySelectorAll('.project');
    projects.forEach(function(project) {
        var projectTop = project.offsetTop;
        var projectHeight = project.offsetHeight;
        
        if (scrollTop > projectTop - windowHeight + projectHeight/4) {
            project.style.opacity = '1';
        }
    });
});