const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = document.querySelectorAll('main section[id]');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.getElementById('nav-menu');
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalTags = document.getElementById('modal-tags');
const toast = document.getElementById('toast');
const themeToggle = document.getElementById('theme-toggle');

const projects = [
  {
    title: 'Student Admission System (PHP/MySQL)',
    description:
      'A complete admission workflow with online form capture, admin review, and student record management.',
    tags: ['PHP', 'MySQL', 'Admin Panel']
  },
  {
    title: 'QR Gate Entry Verification',
    description:
      'A lightweight verification system for scanning and confirming gate entries with instant validation.',
    tags: ['QR', 'Security', 'Dashboard']
  },
  {
    title: 'Alumni Directory Portal',
    description:
      'A searchable alumni platform with categorized profiles and profile update workflows.',
    tags: ['Portal', 'MySQL', 'UI/UX']
  },
  {
    title: 'Business Landing Page',
    description:
      'A high-converting responsive landing page featuring clear CTA flow and basic SEO structure.',
    tags: ['HTML', 'CSS', 'SEO']
  },
  {
    title: 'Snooker/Café Management (Concept)',
    description:
      'Concept project for order tracking, table occupancy visibility, and billing assistance in one dashboard.',
    tags: ['Concept', 'UI/UX', 'Web App']
  },
  {
    title: 'Event Registration System',
    description:
      'Registration form engine with attendee list management and status-based tracking.',
    tags: ['Forms', 'PHP', 'MySQL']
  }
];

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
};

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) =>
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)
        );
      }
    });
  },
  { threshold: 0.45 }
);
sections.forEach((section) => observer.observe(section));

menuToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

const openModal = (project) => {
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalTags.innerHTML = '';
  project.tags.forEach((tag) => {
    const chip = document.createElement('span');
    chip.textContent = tag;
    modalTags.appendChild(chip);
  });
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  modal.hidden = true;
  document.body.style.overflow = '';
};

document.querySelectorAll('.project-btn').forEach((button) => {
  button.addEventListener('click', () => {
    openModal(projects[Number(button.dataset.project)]);
  });
});

document.querySelector('.modal-close')?.addEventListener('click', closeModal);
modal?.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.hidden) closeModal();
});

const copyEmailBtn = document.getElementById('copy-email');
copyEmailBtn?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('info@zeeshanalizafar.com');
    showToast('Email copied to clipboard.');
  } catch {
    showToast('Unable to copy right now.');
  }
});

const form = document.getElementById('contact-form');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const subject = String(data.get('subject') || '').trim();
  const message = String(data.get('message') || '').trim();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailValid || !subject || message.length < 10) {
    showToast('Please complete all fields with a valid email and message.');
    return;
  }

  form.reset();
  showToast('Message ready. I will respond soon.');
});

const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeToggle.textContent = '☀️';
}

themeToggle?.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
  themeToggle.textContent = isDark ? '🌙' : '☀️';
});
