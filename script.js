// ===== Mouse gradient follower (smooth lerp) =====
const mouseGradient = document.getElementById('mouseGradient');
if (mouseGradient && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let gradX = 0, gradY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function lerpGradient() {
        gradX += (mouseX - gradX) * 0.08;
        gradY += (mouseY - gradY) * 0.08;
        mouseGradient.style.left = gradX + 'px';
        mouseGradient.style.top = gradY + 'px';
        requestAnimationFrame(lerpGradient);
    }
    lerpGradient();
}

// ===== Hero floating particles =====
const heroCanvas = document.getElementById('heroParticles');
if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 40;

    function resizeCanvas() {
        const hero = document.getElementById('hero');
        heroCanvas.width = hero.offsetWidth;
        heroCanvas.height = hero.offsetHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * heroCanvas.width,
            y: Math.random() * heroCanvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.4 + 0.1,
            pulse: Math.random() * Math.PI * 2
        };
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(createParticle());
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.pulse += 0.01;

            if (p.x < 0) p.x = heroCanvas.width;
            if (p.x > heroCanvas.width) p.x = 0;
            if (p.y < 0) p.y = heroCanvas.height;
            if (p.y > heroCanvas.height) p.y = 0;

            const pulseOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(167, 139, 250, ${pulseOpacity})`;
            ctx.fill();
        });

        requestAnimationFrame(drawParticles);
    }

    resizeCanvas();
    initParticles();
    drawParticles();
    window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
}

// ===== Typewriter effect =====
const typewriterEl = document.getElementById('typewriterText');
if (typewriterEl) {
    const phrases = [
        'embedded systems',
        'portable MRI technology',
        'agentic AI workflows',
        'firmware + APIs + imaging',
        'medical device software',
        'cloud infrastructure'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typewrite() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            typewriterEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typewriterEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === current.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400;
        }

        setTimeout(typewrite, typeSpeed);
    }

    setTimeout(typewrite, 1200);
}

// ===== Click ripple effect =====
const rippleContainer = document.getElementById('rippleContainer');
if (rippleContainer) {
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        rippleContainer.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
}

// ===== Navbar scroll behavior =====
const nav = document.getElementById('nav');
let lastScrollY = 0;
let ticking = false;

function updateNav() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    if (currentScrollY > lastScrollY && currentScrollY > 200) {
        nav.classList.add('hidden');
    } else {
        nav.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
    }
});

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Smooth scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== Scroll reveal =====
const revealElements = document.querySelectorAll(
    '.section-label, .about-layout, .about-headline, .about-right, .exp-card, ' +
    '.project-card, .skill-group, .blog-card, .contact-block'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== Staggered reveal for grid items =====
const staggerContainers = [
    { selector: '.projects-grid', child: '.project-card' },
    { selector: '.skills-layout', child: '.skill-group' },
    { selector: '.blog-grid', child: '.blog-card' },
    { selector: '.exp-grid', child: '.exp-card' }
];

staggerContainers.forEach(({ selector, child }) => {
    const container = document.querySelector(selector);
    if (!container) return;

    const items = container.querySelectorAll(child);
    items.forEach((item, i) => {
        item.style.transitionDelay = `${i * 0.1}s`;
    });
});

// ===== Chip pop-in animation =====
const chipObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const chips = entry.target.querySelectorAll('.chip');
            chips.forEach((chip, i) => {
                setTimeout(() => {
                    chip.classList.add('visible');
                }, i * 80);
            });
            chipObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const aboutChips = document.querySelector('.about-chips');
if (aboutChips) chipObserver.observe(aboutChips);

// ===== Active nav link highlighting =====
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.scrollY + 200;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);

        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                link.style.color = 'var(--accent-3)';
            } else {
                link.style.color = '';
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===== Card hover glow tracking =====
if (window.innerWidth > 768) {
    document.querySelectorAll('.exp-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });
}

// ===== Contact form (Web3Forms AJAX) =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.form-submit');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
            });
            const data = await res.json();
            if (data.success) {
                btn.textContent = 'Message Sent!';
                btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
                contactForm.reset();
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            } else {
                throw new Error(data.message || 'Something went wrong');
            }
        } catch (err) {
            btn.textContent = 'Failed — try again';
            btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            btn.disabled = false;
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 3000);
        }
    });
}

// ===== Tilt effect on project cards =====
if (window.innerWidth > 768) {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            card.style.transform = `translateY(-4px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}
