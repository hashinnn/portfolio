// ===== TYPING EFFECT =====
const phrases = [
    'full-stack web apps.',
    'secure authentication  systems.',
    'database-driven backends.',
    'API-integrated platforms.',
    'real-world solutions.',
    'clean, purposeful code.'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeLoop() {
    const current = phrases[phraseIndex];
    if (!isDeleting) {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
            isDeleting = true;
            setTimeout(typeLoop, 1800);
            return;
        }
        setTimeout(typeLoop, 70);
    } else {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeLoop, 400);
            return;
        }
        setTimeout(typeLoop, 40);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeLoop, 600);
});

// ===== CURSOR GLOW =====
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// ===== PARTICLES =====
const canvas = document.getElementById('particles');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function createParticles() {
        particles = [];
        const count = Math.min(40, Math.floor(window.innerWidth / 30));
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.3 + 0.1
            });
        }
    }
    createParticles();

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(45, 212, 191, ' + p.opacity + ')';
            ctx.fill();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = 'rgba(45, 212, 191, ' + (0.06 * (1 - dist / 120)) + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            document.querySelector('.nav-links').classList.remove('open');
        }
    });
});

// ===== ACTIVE NAV & SIDE DOTS =====
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const dots = document.querySelectorAll('.dot');

function updateActiveSection() {
    let current = '';

    // If scrolled to the very bottom, force Contact as active
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        current = 'contact';
    } else {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom > 150) {
                current = section.getAttribute('id');
            }
        });
    }

    if (current) {
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + current));
        dots.forEach(dot => dot.classList.toggle('active', dot.getAttribute('data-section') === current));
    }
}

window.addEventListener('scroll', updateActiveSection);
window.addEventListener('load', updateActiveSection);

// ===== HAMBURGER =====
document.getElementById('hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('open');
});

// ===== SCROLL FADE-IN =====
function initFadeIn() {
    const elements = document.querySelectorAll(
        '.about-text, .about-card, .skill-card, .project-card, .timeline-item, .cert-card, .contact-card'
    );
    elements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    elements.forEach(el => observer.observe(el));
}
document.addEventListener('DOMContentLoaded', initFadeIn);

// ===== SKILLS FILTER =====
document.querySelectorAll('.legend-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.legend-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        document.querySelectorAll('.skill-card').forEach(node => {
            if (filter === 'all') {
                node.classList.remove('dimmed');
                node.classList.remove('highlighted');
            } else {
                if (node.getAttribute('data-category') === filter) {
                    node.classList.remove('dimmed');
                    node.classList.add('highlighted');
                } else {
                    node.classList.add('dimmed');
                    node.classList.remove('highlighted');
                }
            }
        });
    });
});

// ===== MODALS =====
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        modal.querySelectorAll('video').forEach(v => v.pause());
    }
}

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
            modal.querySelectorAll('video').forEach(v => v.pause());
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.show').forEach(modal => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
            modal.querySelectorAll('video').forEach(v => v.pause());
        });
    }
});

// ===== IMAGE/PDF MODAL =====
function openImageModal(src) {
    const wrapper = document.getElementById('modalImageWrapper');
    const ext = src.split('.').pop().toLowerCase();
    if (ext === 'pdf') {
        wrapper.innerHTML = '<iframe src="' + src + '" title="Certificate"></iframe>';
    } else {
        wrapper.innerHTML = '<img src="' + src + '" alt="Certificate">';
    }
    openModal('modal-image');
}

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 15, 44, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 15, 44, 0.7)';
    }
});

// ===== TILT EFFECT ON PROJECT CARDS =====
if (window.innerWidth > 768) {
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -4;
            const rotateY = (x - centerX) / centerX * 4;
            card.style.transform = 'perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px) scale(1.01)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===== CONTACT FORM =====
async function submitContact() {
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();
    const btn = document.getElementById('cfSubmit');
    const btnText = document.getElementById('cfBtnText');
    const status = document.getElementById('cfStatus');

    if (!name || !email || !message) {
        status.textContent = 'Please fill in all fields.';
        status.className = 'cf-status error';
        return;
    }

    btnText.textContent = 'Sending...';
    btn.disabled = true;
    status.textContent = '';
    status.className = 'cf-status';

    try {
        const res = await fetch('/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });
        const data = await res.json();

        if (data.success) {
            status.textContent = '✓ Message sent! I\'ll get back to you soon.';
            status.className = 'cf-status success';
            document.getElementById('cf-name').value = '';
            document.getElementById('cf-email').value = '';
            document.getElementById('cf-message').value = '';
        } else {
            status.textContent = 'Something went wrong. Try emailing me directly.';
            status.className = 'cf-status error';
        }
    } catch {
        status.textContent = 'Network error. Try emailing me directly.';
        status.className = 'cf-status error';
    } finally {
        btnText.textContent = 'Send Message';
        btn.disabled = false;
    }
}