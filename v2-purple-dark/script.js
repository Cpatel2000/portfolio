// ===== Cursor glow effect =====
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
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

// ===== Experience tabs =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;

        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById('panel-' + tabId).classList.add('active');
    });
});

// ===== Scroll reveal =====
const revealElements = document.querySelectorAll(
    '.section-heading, .about-text, .about-image-wrapper, .experience-tabs, ' +
    '.project-card, .skill-category, .blog-card, .contact-content'
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
    { selector: '.skills-grid', child: '.skill-category' },
    { selector: '.blog-grid', child: '.blog-card' }
];

staggerContainers.forEach(({ selector, child }) => {
    const container = document.querySelector(selector);
    if (!container) return;

    const items = container.querySelectorAll(child);
    items.forEach((item, i) => {
        item.style.transitionDelay = `${i * 0.1}s`;
    });
});

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
                link.style.color = 'var(--accent)';
            } else {
                link.style.color = '';
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
