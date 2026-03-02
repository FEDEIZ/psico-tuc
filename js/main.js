// JavaScript principal para la página de aterrizaje de psicóloga
// Se cargará con el atributo `defer`, por lo que se ejecuta después del renderizado del DOM.

'use strict';

// Toggle de navegación móvil
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    });
}

// Endpoint para envío de formulario (reemplazar con el endpoint real de Formspree)
const FORM_ENDPOINT = 'https://formspree.io/f/mnjbyrzz';

// Validación accesible del formulario de contacto
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    // Crear contenedores de errores y configurar ARIA
    const nameGroup = contactForm.querySelector('#name').closest('.form-group');
    const emailGroup = contactForm.querySelector('#email').closest('.form-group');
    const messageGroup = contactForm.querySelector('#message').closest('.form-group');
    
    function createErrorMessageElement(group, fieldId) {
        let errorEl = group.querySelector('.error-message');
        if (!errorEl) {
            errorEl = document.createElement('span');
            errorEl.className = 'error-message';
            errorEl.id = fieldId + '-error';
            errorEl.setAttribute('aria-live', 'polite');
            group.appendChild(errorEl);
        }
        return errorEl;
    }
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        const group = field.closest('.form-group');
        const errorEl = createErrorMessageElement(group, fieldId);
        errorEl.textContent = message;
        field.setAttribute('aria-invalid', 'true');
        group.classList.add('has-error');
    }
    
    function clearError(fieldId) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        const group = field.closest('.form-group');
        const errorEl = group.querySelector('.error-message');
        if (errorEl) errorEl.textContent = '';
        field.setAttribute('aria-invalid', 'false');
        group.classList.remove('has-error');
    }
    
    // Validar email con expresión regular simple
    function isValidEmail(email) {
        const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        return re.test(email);
    }
    
    // Validar campo requerido
    function validateRequired(fieldId) {
        const field = document.getElementById(fieldId);
        if (!field) return true;
        const value = field.value.trim();
        if (value === '') {
            showError(fieldId, 'Este campo es obligatorio.');
            return false;
        } else {
            clearError(fieldId);
            return true;
        }
    }
    
    // Validar email
    function validateEmail(fieldId) {
        const field = document.getElementById(fieldId);
        if (!field) return true;
        const value = field.value.trim();
        if (value === '') {
            showError(fieldId, 'Este campo es obligatorio.');
            return false;
        } else if (!isValidEmail(value)) {
            showError(fieldId, 'Por favor, introduce un email válido.');
            return false;
        } else {
            clearError(fieldId);
            return true;
        }
    }
    
    // Validar mensaje
    function validateMessage(fieldId) {
        return validateRequired(fieldId); // mismo comportamiento
    }
    
    // Limpiar errores al escribir
    contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', () => {
            clearError(field.id);
        });
        field.addEventListener('blur', () => {
            // validación en tiempo real opcional
        });
    });
    
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Validar todos los campos
        const isNameValid = validateRequired('name');
        const isEmailValid = validateEmail('email');
        const isMessageValid = validateRequired('message');
        
        if (isNameValid && isEmailValid && isMessageValid) {
            // Deshabilitar botón para evitar doble envío
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            // Real POST al endpoint de Formspree
            const formData = new FormData(contactForm);
            const params = new URLSearchParams();
            for (const [key, value] of formData) {
                params.append(key, value);
            }
            // Añadir dirección de respuesta (reply‑to)
            const emailValue = formData.get('email');
            if (emailValue) {
                params.append('_replyto', emailValue);
            }
            
            // Debug: verificar parámetros enviados
            console.log('Formspree submission params:', params.toString());
            
            fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString()
            })
            .then(response => {
                if (response.ok) {
                    // Mostrar mensaje de éxito
                    const successMsg = document.createElement('p');
                    successMsg.className = 'success-message';
                    successMsg.textContent = '¡Gracias! Tu mensaje ha sido enviado. Te responderé pronto.';
                    successMsg.setAttribute('role', 'alert');
                    successMsg.setAttribute('aria-live', 'assertive');
                    contactForm.innerHTML = '';
                    contactForm.appendChild(successMsg);
                } else {
                    throw new Error('Error en el envío');
                }
            })
            .catch(error => {
                // Mostrar mensaje de error
                const errorMsg = document.createElement('p');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'Hubo un problema al enviar el mensaje. Por favor, inténtalo nuevamente más tarde.';
                errorMsg.setAttribute('role', 'alert');
                contactForm.insertBefore(errorMsg, contactForm.firstChild);
                // Restaurar botón
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            })
            .finally(() => {
                // Restaurar botón si no se ha restaurado ya (en caso de éxito el formulario se reemplaza)
                if (contactForm.contains(submitBtn)) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            });
        } else {
            // Enfocar el primer campo con error
            const firstError = contactForm.querySelector('[aria-invalid="true"]');
            if (firstError) firstError.focus();
        }
    });
}

// Actualización dinámica del año en el footer (ya se hace inline)
// No es necesario repetir.

// Scroll suave para enlaces internos (mejora progresiva)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Modal accesible para detalles de servicios
const serviceModal = document.getElementById('service-modal');
if (serviceModal) {
    const modalTitle = serviceModal.querySelector('#modal-title');
    const modalDescription = serviceModal.querySelector('#modal-description');
    const closeButtons = serviceModal.querySelectorAll('[data-modal-close]');
    let previouslyFocusedElement = null;

    function openModal(title, description) {
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        serviceModal.setAttribute('aria-hidden', 'false');
        serviceModal.setAttribute('aria-modal', 'true');
        previouslyFocusedElement = document.activeElement;
        // Enfocar el botón de cerrar
        closeButtons[0].focus();
        // El foco ya está atrapado por initModalFocusTrap
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        serviceModal.setAttribute('aria-hidden', 'true');
        serviceModal.setAttribute('aria-modal', 'false');
        document.body.style.overflow = '';
        if (previouslyFocusedElement) previouslyFocusedElement.focus();
    }

    // Atrapa el foco dentro del modal
    function initModalFocusTrap(element) {
        element.addEventListener('keydown', function (e) {
            if (element.getAttribute('aria-hidden') === 'true') return;
            if (e.key === 'Escape') {
                closeModal();
                return;
            }
            if (e.key === 'Tab') {
                const focusable = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (focusable.length === 0) return;
                const firstFocusable = focusable[0];
                const lastFocusable = focusable[focusable.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        });
    }
    initModalFocusTrap(serviceModal);

    // Cerrar al hacer clic en overlay o botón de cerrar
    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

}

// Mejorar accesibilidad del acordeón nativo (FAQ)
document.querySelectorAll('.faq-item').forEach(details => {
    const summary = details.querySelector('summary');
    if (summary) {
        // Inicializar aria-expanded según el estado open
        summary.setAttribute('aria-expanded', details.hasAttribute('open'));
        // Actualizar al cambiar
        details.addEventListener('toggle', () => {
            summary.setAttribute('aria-expanded', details.hasAttribute('open'));
        });
    }
});

// Navegación sticky con enlace activo según scroll
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = Array.from(navLinks).map(link => {
    const href = link.getAttribute('href');
    return href.startsWith('#') ? document.querySelector(href) : null;
}).filter(Boolean);

function setActiveLink() {
    const scrollPos = window.scrollY + window.innerHeight / 3;
    let current = '';
    sections.forEach(section => {
        if (!section) return;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = '#' + section.id;
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Botón «volver arriba»
const backToTopButton = document.createElement('button');
backToTopButton.className = 'back-to-top';
backToTopButton.setAttribute('aria-label', 'Volver arriba');
backToTopButton.innerHTML = '↑';
backToTopButton.style.display = 'none';
backToTopButton.style.position = 'fixed';
backToTopButton.style.bottom = '2rem';
backToTopButton.style.right = '2rem';
backToTopButton.style.zIndex = '999';
backToTopButton.style.width = '3rem';
backToTopButton.style.height = '3rem';
backToTopButton.style.borderRadius = '50%';
backToTopButton.style.backgroundColor = 'var(--color-brown-medium)';
backToTopButton.style.color = 'var(--color-white)';
backToTopButton.style.fontSize = '1.5rem';
backToTopButton.style.border = 'none';
backToTopButton.style.cursor = 'pointer';
backToTopButton.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
backToTopButton.style.transition = 'opacity 0.3s, transform 0.3s';
document.body.appendChild(backToTopButton);

function toggleBackToTop() {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
        backToTopButton.style.opacity = '1';
        backToTopButton.style.transform = 'translateY(0)';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (window.scrollY <= 300) backToTopButton.style.display = 'none';
        }, 300);
    }
}

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', toggleBackToTop);
window.addEventListener('load', toggleBackToTop);

// Lazy loading de imágenes (si se añaden en el futuro)
if ('loading' in HTMLImageElement.prototype) {
    // El navegador soporta `loading="lazy"` nativo
} else {
    // Cargar polyfill si es necesario
}

// Consola de bienvenida (solo para desarrollo)
console.log('Página de Florencia Daiana Lazo cargada correctamente.');