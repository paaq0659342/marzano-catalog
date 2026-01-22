document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar & Hamburger
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeBtn = document.querySelector('.close-lightbox');

    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
        src: item.querySelector('img').getAttribute('data-full') || item.querySelector('img').src,
        alt: item.querySelector('img').alt
    }));

    function openLightbox(index) {
        currentIndex = index;
        lightbox.style.display = 'block';
        lightboxImg.src = images[currentIndex].src;
        document.body.style.overflow = 'hidden'; // Prevent scroll
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.onclick = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    window.onclick = (event) => {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // Navigation in Lightbox
    document.querySelector('.next').onclick = (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        openLightbox(currentIndex);
    };

    document.querySelector('.prev').onclick = (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openLightbox(currentIndex);
    };

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'ArrowRight') document.querySelector('.next').click();
            if (e.key === 'ArrowLeft') document.querySelector('.prev').click();
            if (e.key === 'Escape') closeBtn.click();
        }
    });

    // 3. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('section, .feature-card, .gallery-item');
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.9;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // 4. Contact Form Handling with Validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const phoneInput = contactForm.querySelector('input[type="tel"]');

            if (!nameInput.value || !emailInput.value || !phoneInput.value) {
                alert('Por favor complete todos los campos.');
                return;
            }

            // Construct WhatsApp message
            const message = `Hola, mi nombre es ${nameInput.value}. Estoy interesado en el Dúplex Penthouse de La Aurora (Marzano 15XX). Mi teléfono es ${phoneInput.value} y mi email es ${emailInput.value}.`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/51985663335?text=${encodedMessage}`;

            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');

            // Show a premium success message
            contactForm.innerHTML = `
                <div style="text-align: center; padding: 2rem; animation: zoom 0.5s;">
                    <div style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;">✓</div>
                    <h3 style="color: var(--accent); margin-bottom: 1rem;">¡Redirigiendo a WhatsApp!</h3>
                    <p>Gracias por tu interés en Luxury Aurora. Se ha abierto una ventana de chat para contactar a tu asesor.</p>
                </div>
            `;
        });
    }

    // 5. Header transparency on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.8rem 2rem';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
        } else {
            header.style.padding = '1rem 2rem';
            header.style.background = 'rgba(255, 255, 255, 0.8)';
            header.style.boxShadow = 'none';
        }
    });
});
