document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Screen
    const loader = document.querySelector('.loader-wrapper');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                // Trigger hero reveal
                revealOnScroll();
            }, 500);
        }, 2000); // Artificial delay for effect
    });

    // 2. Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth follower movement
    const animateCursor = () => {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.left = (followerX - 15) + 'px';
        follower.style.top = (followerY - 15) + 'px';
        
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .nav-toggle');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.transform = 'scale(1.5)';
            follower.style.background = 'rgba(0, 242, 255, 0.1)';
            follower.style.borderColor = 'transparent';
        });
        el.addEventListener('mouseleave', () => {
            follower.style.transform = 'scale(1)';
            follower.style.background = 'transparent';
            follower.style.borderColor = 'var(--primary)';
        });
    });

    // 3. Particles Canvas
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = Math.random() > 0.5 ? '#00f2ff' : '#bc13fe';
            this.opacity = Math.random() * 0.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
        }
    }

    const initParticles = () => {
        particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    };
    initParticles();

    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    };
    animateParticles();

    // 4. Reveal on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
                
                // Trigger skill bar animation if in skill section
                if (el.classList.contains('skill-item')) {
                    const bar = el.querySelector('.skill-progress');
                    bar.style.width = bar.getAttribute('style').split(':')[1];
                }
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);

    // 5. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 6. 3D Hover Effect for Profile Image
    const imageContainer = document.querySelector('.image-wrapper');
    const profileImg = document.querySelector('.profile-img');

    imageContainer.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = imageContainer.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        profileImg.style.transform = `
            perspective(1000px) 
            rotateY(${x * 20}deg) 
            rotateX(${-y * 20}deg) 
            translateY(${Math.sin(Date.now() / 1000) * 10}px)
        `;
    });

    imageContainer.addEventListener('mouseleave', () => {
        profileImg.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
    });

    // 7. Active Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 8. Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinksContainer.style.display = navLinksContainer.style.display === 'flex' ? 'none' : 'flex';
        if (navLinksContainer.style.display === 'flex') {
            navLinksContainer.style.flexDirection = 'column';
            navLinksContainer.style.position = 'absolute';
            navLinksContainer.style.top = '100%';
            navLinksContainer.style.left = '0';
            navLinksContainer.style.width = '100%';
            navLinksContainer.style.background = 'rgba(5, 5, 16, 0.95)';
            navLinksContainer.style.padding = '2rem';
            navLinksContainer.style.textAlign = 'center';
            navLinksContainer.style.backdropFilter = 'blur(10px)';
        }
    });

    // 9. Typing Effect
    const subtitle = document.querySelector('.hero-subtitle');
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;

    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };

    // Trigger typing effect after loader
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 2500); // Start after loader finishes
    });
});
