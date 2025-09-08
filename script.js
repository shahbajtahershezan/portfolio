// Enhanced JavaScript with improved interactivity
document.addEventListener("DOMContentLoaded", function() {
    // =====================
    // Page Fade Transition
    // =====================
    document.body.classList.add("page-loaded");

    // =====================
    // Header Scroll + Shrink
    // =====================
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 50);
    });

    // =====================
    // Mobile Menu Toggle
    // =====================
    const menuIcon = document.getElementById("menu-icon");
    const navbar = document.querySelector(".navbar");

    if (menuIcon) {
        menuIcon.addEventListener("click", () => {
            navbar.classList.toggle("active");
            menuIcon.classList.toggle("bx-x");
            document.body.classList.toggle("no-scroll", navbar.classList.contains("active"));
        });

        document.querySelectorAll(".navbar a").forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active");
                menuIcon.classList.remove("bx-x");
                document.body.classList.remove("no-scroll");
            });
        });
    }

    // =====================
    // Active Link on Scroll
    // =====================
    const navLinks = document.querySelectorAll(".navbar a");
    const sections = document.querySelectorAll("section[id], .about-me");
    let scrolling = false;

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            scrolling = true;

            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);
            if (target) {
                const topOffset = header.offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - topOffset + 5,
                    behavior: "smooth"
                });
            }
            setTimeout(() => scrolling = false, 600);
        });
    });

    // Update active link on scroll
    window.addEventListener("scroll", () => {
        if (scrolling) return;
        
        // Show/hide scroll to top button
        const scrollTopBtn = document.querySelector('.scroll-top-btn');
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
        
        let current = "";
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop - header.offsetHeight - 30;
            if (window.scrollY >= sectionTop) current = sec.getAttribute("id");
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    // Scroll to top functionality
    document.querySelector('.scroll-top-btn').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    // =====================
    // Typing Effect
    // =====================
    const roles = [
        "Full Stack Developer",
        "AI Enthusiast",
        "Data Analyst",
        "Front-End Developer",
        "Data Science Learner",
        "Creative Coder"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 120;
    const typingSpan = document.getElementById("typing");

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Remove characters
            typingSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 60;
        } else {
            // Add characters
            typingSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 120;
        }
        
        // Determine next step
        if (!isDeleting && charIndex === currentRole.length) {
            typingDelay = 1500; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingDelay = 500;
        }
        
        setTimeout(typeEffect, typingDelay);
    }

    // Start typing effect
    typeEffect();

    // =====================
    // Blinking "Hire Me" Button Effect
    // =====================
    const hireMeBtn = document.querySelector('.btn-box a:first-child');
    if (hireMeBtn) {
        setInterval(() => {
            hireMeBtn.classList.toggle('pulse');
            
            // Add temporary glow effect
            if (hireMeBtn.classList.contains('pulse')) {
                hireMeBtn.style.boxShadow = '0 0 20px rgba(58, 132, 194, 0.8)';
                setTimeout(() => {
                    hireMeBtn.style.boxShadow = '';
                }, 1000);
            }
        }, 3000);
    }

    // =====================
    // Floating Elements Animation
    // =====================
    const floatingElements = document.querySelectorAll('.home-sci a, .project-card, .aboutme-image');
    floatingElements.forEach(el => {
        // Set random animation delay for staggered effect
        el.style.animationDelay = `${Math.random() * 0.5}s`;
        el.classList.add('float-element');
    });

    // ================================
    // Skills Progress Bar Animation
    // ================================
    const bars = document.querySelectorAll(".skills .bar span");
    let animationTriggered = false;

    function animateBar(bar) {
        const finalWidth = bar.getAttribute("data-width");
        const label = bar.closest(".progress").querySelector("h3 span");
        const endValue = parseInt(finalWidth, 10);
        let currentCount = 0;
        const duration = 2000; // 2 seconds
        const incrementTime = Math.floor(duration / endValue);

        // Set initial state
        bar.style.width = "0%";
        
        // Force reflow to ensure the transition works properly
        void bar.offsetWidth;
        
        // Trigger animation
        bar.style.width = finalWidth;

        // Number counter animation
        const counter = setInterval(() => {
            currentCount++;
            if (currentCount >= endValue) {
                currentCount = endValue;
                clearInterval(counter);
            }
            label.textContent = currentCount + "%";
        }, incrementTime);
    }

    function checkIfInView() {
        if (animationTriggered) return;
        
        const skillsSection = document.getElementById('skills');
        const sectionPos = skillsSection.getBoundingClientRect();
        
        // Check if skills section is in viewport
        if (sectionPos.top < window.innerHeight && sectionPos.bottom >= 0) {
            animationTriggered = true;
            
            // Animate each bar with a slight delay between them
            bars.forEach((bar, index) => {
                setTimeout(() => {
                    animateBar(bar);
                }, index * 150); // 150ms delay between each bar animation
            });
        }
    }

    // Check on load and on scroll
    window.addEventListener('load', checkIfInView);
    window.addEventListener('scroll', checkIfInView);
    
    // Initial check
    checkIfInView();

    // =====================
    // Enhanced Form Validation with Real-time Feedback
    // =====================
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        // Add error message containers
        inputs.forEach(input => {
            const container = input.closest('.input-field, .textarea-field');
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            container.appendChild(errorMsg);
        });
        
        inputs.forEach(input => {
            // Validate on input blur
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Clear error on input
            input.addEventListener('input', function() {
                clearError(this);
            });
        });
        
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate all fields
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('.btn');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                try {
                    // Simulate form submission (replace with actual API call)
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    
                    // Show success toast
                    showToast("✅ Thanks! Your message has been sent successfully.", 'success');
                    
                    // Reset form
                    contactForm.reset();
                } catch (error) {
                    showToast("❌ Sorry, there was an error sending your message. Please try again.", 'error');
                } finally {
                    // Restore button state
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            } else {
                showToast("⚠️ Please fix the errors in the form before submitting.", 'warning');
            }
        });
        
        function validateField(field) {
            const fieldContainer = field.closest('.input-field, .textarea-field');
            const errorMessage = fieldContainer.querySelector('.error-message');
            
            // Clear previous error
            fieldContainer.classList.remove('error');
            errorMessage.textContent = '';
            
            // Check required fields
            if (field.hasAttribute('required') && !field.value.trim()) {
                fieldContainer.classList.add('error');
                errorMessage.textContent = 'This field is required';
                return false;
            }
            
            // Email validation
            if (field.type === 'email' && field.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(field.value)) {
                    fieldContainer.classList.add('error');
                    errorMessage.textContent = 'Please enter a valid email address';
                    return false;
                }
            }
            
            // Phone validation
            if (field.type === 'tel' && field.value) {
                const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
                if (!phonePattern.test(field.value.replace(/[\s\-\(\)]/g, ''))) {
                    fieldContainer.classList.add('error');
                    errorMessage.textContent = 'Please enter a valid phone number';
                    return false;
                }
            }
            
            return true;
        }
        
        function clearError(field) {
            const fieldContainer = field.closest('.input-field, .textarea-field');
            fieldContainer.classList.remove('error');
            const errorMessage = fieldContainer.querySelector('.error-message');
            errorMessage.textContent = '';
        }
    }

    // Toast notification function
    function showToast(message, type = 'info') {
        // Remove existing toasts
        document.querySelectorAll('.custom-toast').forEach(toast => toast.remove());
        
        const toast = document.createElement("div");
        toast.textContent = message;
        toast.className = `custom-toast ${type}`;
        
        // Style based on type
        const styles = {
            success: { background: '#4CAF50', icon: '✅' },
            error: { background: '#f44336', icon: '❌' },
            warning: { background: '#ff9800', icon: '⚠️' },
            info: { background: '#2196F3', icon: 'ℹ️' }
        };
        
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${styles[type].background};
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 10px;
            max-width: 400px;
            animation: toastSlideIn 0.3s ease-out;
        `;
        
        // Add icon if provided
        if (styles[type].icon) {
            toast.innerHTML = `${styles[type].icon} ${message}`;
        }
        
        document.body.appendChild(toast);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'toastSlideOut 0.3s ease-in';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
        
        // Allow manual dismiss on click
        toast.addEventListener('click', () => {
            toast.style.animation = 'toastSlideOut 0.3s ease-in';
            setTimeout(() => toast.remove(), 300);
        });
    }

    // =====================
    // Project Card Interactions
    // =====================
    document.querySelectorAll(".project-card").forEach(card => {
        // 3D hover effect
        card.addEventListener("mousemove", e => {
            if (window.innerWidth > 768) { // Only on larger screens
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = (y / rect.height - 0.5) * 10;
                const rotateY = (x / rect.width - 0.5) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            }
        });
        
        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
        });
        
        // Click to view project details
        card.addEventListener("click", function(e) {
            if (!e.target.classList.contains('btn')) {
                const projectTitle = this.querySelector('h3').textContent;
                
                // Create a modal-like effect
                const overlay = document.createElement('div');
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    animation: fadeIn 0.3s ease;
                `;
                
                const modal = document.createElement('div');
                modal.style.cssText = `
                    background: #1a2a3a;
                    padding: 30px;
                    border-radius: 15px;
                    max-width: 500px;
                    width: 90%;
                    text-align: center;
                    border: 1px solid rgba(0, 234, 255, 0.3);
                    box-shadow: 0 0 30px rgba(0, 234, 255, 0.2);
                `;
                
                modal.innerHTML = `
                    <h3 style="margin-bottom: 15px; color: #00eaff;">${projectTitle}</h3>
                    <p style="margin-bottom: 20px;">This would show detailed information about the "${projectTitle}" project. In a real implementation, this would include project description, technologies used, live demo links, and more.</p>
                    <button style="background: #00eaff; color: #041624; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold;">Close</button>
                `;
                
                overlay.appendChild(modal);
                document.body.appendChild(overlay);
                
                // Close modal on button click or overlay click
                const closeBtn = modal.querySelector('button');
                closeBtn.addEventListener('click', () => {
                    overlay.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => overlay.remove(), 300);
                });
                
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        overlay.style.animation = 'fadeOut 0.3s ease';
                        setTimeout(() => overlay.remove(), 300);
                    }
                });
            }
        });
    });

    // =====================
    // About Me Image Parallax
    // =====================
    document.querySelectorAll(".aboutme-image img").forEach(img => {
        img.addEventListener("mousemove", e => {
            if (window.innerWidth > 768) { // Only on larger screens
                const rect = img.getBoundingClientRect();
                const offsetX = (e.clientX - rect.left) / rect.width - 0.5;
                const offsetY = (e.clientY - rect.top) / rect.height - 0.5;
                img.style.transform = `scale(1.05) rotateX(${offsetY * 10}deg) rotateY(${offsetX * 10}deg)`;
            }
        });
        
        img.addEventListener("mouseleave", () => {
            img.style.transform = "scale(1) rotate(0)";
        });
    });

    // =====================
    // Background Particle Effect
    // =====================
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        document.body.appendChild(particlesContainer);
        
        // Create particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(0, 234, 255, 0.5);
                border-radius: 50%;
                animation: floatParticle 15s infinite linear;
            `;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random animation delay
            particle.style.animationDelay = `${Math.random() * 15}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();

    // =====================
    // Responsive Adjustments
    // =====================
    function handleResize() {
        // Adjust animations based on screen size
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            // Disable complex animations on mobile
            document.querySelectorAll('.project-card, .aboutme-image img').forEach(el => {
                el.style.transform = '';
            });
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(100px);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes float-element {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
        }
        
        .float-element {
            animation: float-element 3s ease-in-out infinite;
        }
        
        @keyframes toastSlideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes toastSlideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: rgba(0, 234, 255, 0.8);
            color: #041624;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 999;
        }
        
        .scroll-top-btn.active {
            opacity: 1;
            transform: translateY(0);
        }
        
        .scroll-top-btn:hover {
            background: rgba(0, 234, 255, 1);
            transform: translateY(-5px);
        }
        
        .input-field.error input,
        .textarea-field.error textarea {
            border-color: #ff4757 !important;
            box-shadow: 0 0 10px rgba(255, 71, 87, 0.3) !important;
        }
        
        .error-message {
            color: #ff4757;
            font-size: 0.8rem;
            margin-top: 5px;
            min-height: 20px;
        }
    `;
    
    document.head.appendChild(style);
});