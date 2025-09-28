// Generate floating particles
        function createParticles() {
            const particles = document.querySelector('.particles');
            if (!particles) return;
            // clear existing
            particles.innerHTML = '';
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                particles.appendChild(particle);
            }
        }

        // Fade in animation on scroll
        function fadeInOnScroll() {
            const elements = document.querySelectorAll('.fade-in');
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }

        // Smooth scrolling for navigation links
        function setupSmoothScrolling() {
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        window.scrollTo({ top: targetSection.offsetTop - 80, behavior: 'smooth' });
                    }
                });
            });
        }

        // Typewriter effect
        function typewriterEffect() {
            const typewriterElement = document.getElementById('typewriter');
            const texts = ['future AI engineer', 'computer science student'];
            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let isPausing = false;

            function type() {
                if (isPausing) return;
                const currentText = texts[textIndex];
                if (!isDeleting) {
                    typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                    charIndex++;
                    if (charIndex === currentText.length) {
                        isPausing = true;
                        setTimeout(() => { isPausing = false; isDeleting = true; }, 3000);
                        return;
                    }
                } else {
                    typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                    charIndex--;
                    if (charIndex === 0) {
                        isDeleting = false;
                        textIndex = (textIndex + 1) % texts.length;
                    }
                }
            }

            setInterval(type, 100);
        }

        // Copy email function
        function copyEmail() {
            const email = 'nahilelbezzari@gmail.com';
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).then(showCopyMessage).catch(fallbackCopy);
            } else {
                fallbackCopy();
            }

            function fallbackCopy() {
                const textArea = document.createElement("textarea");
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showCopyMessage();
            }
        }

        function showCopyMessage() {
            const message = document.getElementById('copyMessage');
            message.classList.add('show');
            setTimeout(function() { message.classList.remove('show'); }, 2000);
        }

        // Initialize everything when page loads
        document.addEventListener('DOMContentLoaded', function() {
            setupSmoothScrolling();
            fadeInOnScroll(); // Initial check
            typewriterEffect(); // Start typewriter effect
            createParticles(); // create floating particles
            // Show first section immediately
            const hero = document.querySelector('.hero-content');
            if (hero) hero.classList.add('visible');
        });

        // Check for elements to fade in on scroll
        window.addEventListener('scroll', fadeInOnScroll);