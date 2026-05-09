/* ==================== SCRIPT.JS - SITOP ==================== */

/* ==================== 1. NAVBAR ==================== */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ==================== 2. MENÚ HAMBURGUESA ==================== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    if (hamburger) hamburger.classList.remove('open');
  });
});

//* ==================== 3. HERO SLIDER ==================== */
const sliderContainer = document.querySelector('.slider-container');

if (sliderContainer) {
  const slides  = document.querySelectorAll('.slide');
  const dots    = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');

  let currentSlide = 0;
  let autoPlayTimer;
  const INTERVAL = 5000;

  function reiniciarAnimacionLinea() {
  setTimeout(() => {
    const eslogan = document.querySelector('.slide.active .hero-eslogan');
    if (eslogan) {
      // Método 1: Quitar y volver a poner la clase
      const parent = eslogan.parentNode;
      const clone = eslogan.cloneNode(true);
      parent.replaceChild(clone, eslogan);
    }
  }, 50);
}

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = index;
  if (currentSlide >= slides.length) currentSlide = 0;
  if (currentSlide < 0) currentSlide = slides.length - 1;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
  
  // Reiniciar animación de la línea en el nuevo slide
  reiniciarAnimacionLinea();
}

  if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoPlay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoPlay(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.slide));
      resetAutoPlay();
    });
  });

  function startAutoPlay() {
    autoPlayTimer = setInterval(() => goToSlide(currentSlide + 1), INTERVAL);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
  }

  sliderContainer.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
  sliderContainer.addEventListener('mouseleave', startAutoPlay);

  let touchStartX = 0;
  let touchEndX   = 0;

  sliderContainer.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  sliderContainer.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) { goToSlide(currentSlide + 1); resetAutoPlay(); }
    else if (diff < -50) { goToSlide(currentSlide - 1); resetAutoPlay(); }
  });

  startAutoPlay();
}

/* ==================== 4. ANIMACIONES SCROLL ==================== */
const elementosAnimados = document.querySelectorAll(
  '.card, .service-card, .project-card, .section-title, .section-label, .section-text, .contact-wrapper, .redes-sociales'
);

elementosAnimados.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

elementosAnimados.forEach(el => observer.observe(el));

/* ==================== 5. ANIMACIÓN ESCALONADA ==================== */
document.querySelectorAll('.services-grid .service-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 80}ms`;
});
document.querySelectorAll('.cards-grid .card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 120}ms`;
});
document.querySelectorAll('.projects-grid .project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 100}ms`;
});

/* ==================== 6. SCROLL SUAVE ==================== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    const navHeight = navbar.offsetHeight;
    const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top: targetPos, behavior: 'smooth' });
  });
});

/* ==================== 7. AÑO FOOTER ==================== */
const footerCopy = document.querySelector('.footer-copy');
if (footerCopy) {
  footerCopy.textContent = `© ${new Date().getFullYear()} SITOP. Todos los derechos reservados.`;
}

/* ==================== 8. FORMULARIO ==================== */
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', e => {
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando...';
    btn.style.opacity = '0.7';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '¡Mensaje enviado!';
      btn.style.background = 'var(--teal)';
      btn.style.opacity = '1';
      setTimeout(() => {
        btn.textContent = 'Enviar mensaje';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 2000);
  });
}

/* ==================== 9. CONTADORES ==================== */
function startCounters() {
  const qualityElement = document.getElementById('qualityCount');
  const yearsElement   = document.getElementById('yearsCount');
  if (!qualityElement || !yearsElement) return;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let currentQuality = 0;
        const qualityTimer = setInterval(() => {
          currentQuality += 2;
          if (currentQuality >= 100) {
            qualityElement.innerHTML = `100<span class="symbol">%</span>`;
            clearInterval(qualityTimer);
          } else {
            qualityElement.innerHTML = `${currentQuality}<span class="symbol">%</span>`;
          }
        }, 30);

        let currentYear = 0;
        const yearTimer = setInterval(() => {
          currentYear += 0.1;
          if (currentYear >= 3) {
            yearsElement.innerHTML = `+3<span class="symbol"></span>`;
            clearInterval(yearTimer);
          } else {
            yearsElement.innerHTML = `+${currentYear.toFixed(1)}<span class="symbol"></span>`;
          }
        }, 80);

        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const photoCol = document.querySelector('.photo-col');
  if (photoCol) counterObserver.observe(photoCol);
}

document.addEventListener('DOMContentLoaded', startCounters);

/* ==================== 10. ACORDEÓN MISIÓN Y VISIÓN ==================== */
function toggleAccordion(btn) {
  const item   = btn.parentElement;
  const isOpen = item.classList.contains('open');

  document.querySelectorAll('.accordion-item').forEach(i => {
    i.classList.remove('open');
    const icon = i.querySelector('.accordion-icon');
    if (icon) icon.textContent = '+';
  });

  if (!isOpen) {
    item.classList.add('open');
    const icon = item.querySelector('.accordion-icon');
    if (icon) icon.textContent = '−';
  }
}

/* ==================== 11. CARRUSEL CINTA (SERVICIOS) ==================== */
let cintaIndex = 0;

function getVisibles() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function moverCinta(dir) {
  const track = document.getElementById('cintaTrack');
  if (!track) return;
  const total = track.children.length;

  cintaIndex = (cintaIndex + dir + total) % total;
  actualizarCinta();
}

function irA(i) {
  cintaIndex = i;
  actualizarCinta();
}

function actualizarCinta() {
  const track = document.getElementById('cintaTrack');
  if (!track) return;
  const card      = track.querySelector('.cinta-card');
  const gap       = parseFloat(window.getComputedStyle(track).gap) || 20;
  const cardWidth = card.getBoundingClientRect().width + gap;
  const total     = track.children.length;
  const visibles  = getVisibles();

  const max = total - visibles;
  const realIndex = cintaIndex > max ? 0 : cintaIndex;
  if (cintaIndex > max) cintaIndex = 0;

  track.style.transform = `translateX(-${realIndex * cardWidth}px)`;

  document.querySelectorAll('.cinta-dot').forEach((d, i) => {
    d.classList.toggle('active', i === cintaIndex);
  });
}

function abrirCard(el) {
  document.querySelectorAll('.cinta-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

window.addEventListener('resize', () => {
  cintaIndex = 0;
  actualizarCinta();
});

/* ==================== 12. MODAL DE PROYECTOS ==================== */
// Base de datos de proyectos
const proyectos = {
  1: {
    titulo: "Construcción de pavimento de concreto hidráulico",
    ubicacion: "Bo. El Edén, Choluteca, Honduras",

    cliente: "Servicios de Energía",
    servicio: "Construcción de pavimento",
    fechaInicio: "20 de junio de 2025",
    fechaRecepcion: "18 de agosto de 2025",
    imagenes: [
      "img/pavimento-choluteca/pavcholu1.png",
      "img/pavimento-choluteca/pavcholu2.png",
      "img/pavimento-choluteca/pavcholu3.png",
      "img/pavimento-choluteca/pavcholu4.png"
    ]
  },
  2: {
    titulo: "Construcción de valla publicitaria",
    ubicacion: "Residencial Las Uvas, Tegucigalpa, Honduras",

    cliente: "Servicios de Energía",
    servicio: "Construcción de vallas",
    fechaInicio: "2 de mayo del 2025",
    fechaRecepcion: "31 de julio del 2025",
    imagenes: [
      "img/valla/vallaportada.png",
      "img/valla/valla2.png",
      "img/valla/valla3.png",
      "img/valla/vallaterminada.png"
    ]
  },
  3: {
    titulo: "Construcción de pavimento de concreto hidráulico",
    ubicacion: "Tencoa, Santa Bárbara, Honduras",
    cliente: "Distrito de Tencoa",
    servicio: "Construcción de pavimento",
    fechaInicio: "Septiembre de 2025",
    fechaRecepcion: "Febrero de 2025",
    imagenes: [
      "img/pavimento-tencoa/paviportada.jpg",
      "img/pavimento-tencoa/pavi2.jpg",
      "img/pavimento-tencoa/pavi3.jpg",
      "img/pavimento-tencoa/pavi4.jpg",
      "img/pavimento-tencoa/pavi5.jpg",
      "img/pavimento-tencoa/paviterminada.jpg"
    ]
  },
  4: {
    titulo: "Levantamiento topográfico de terreno para residencial",
    ubicacion: "Tatumbla, Francisco Morazán, Honduras",
    cliente: "Aníbal Róbelo",
    servicio: "Levantamiento topográfico",
    fechaInicio: "Marzo 2026",
    fechaRecepcion: "Abril 2026",
    imagenes: [
      "img/levantamiento-residencial/levantamiento.jpg",
    ]
  },
  5: {
    titulo: "Supervisión de lotitificacion",
    ubicacion: "Tencoa, Santa Bárbara, Honduras",
    cliente: "Distrito de Tencoa",
    servicio: "Supervisión para lotificación, trazado y apertura ",
    fechaInicio: "03 de enero del 2025",
    fechaRecepcion: "20 de diciembre del 2025",
    imagenes: [
      "img/supervision-lotificacion/supervision.jpg",
    ]
  },

  6: {
    titulo: "Construcción de pavimento de concreto",
    ubicacion: "Tencoa, Santa Bárbara, Honduras",
    cliente: "Distrito de Tencoa",
    servicio: "Construcción de pavimento",
    fechaInicio: "Octubre del 2025",
    fechaRecepcion: "Sigue actualmente",
    imagenes: [
      "img/pavimento-tencoa2/paviementoportada.jpg",
      "img/pavimento-tencoa2/pavimento2.jpg",
    ]
  }
};

// Variables del carrusel
let currentImageIndex = 0;
let currentProjectImages = [];

// Actualizar imagen principal
function updateMainImage() {
  const mainImage = document.getElementById('mainImage');
  if (mainImage && currentProjectImages.length > 0) {
    mainImage.src = currentProjectImages[currentImageIndex];
    document.querySelectorAll('.gallery-thumbs img').forEach((thumb, idx) => {
      if (idx === currentImageIndex) {
        thumb.classList.add('active-thumb');
      } else {
        thumb.classList.remove('active-thumb');
      }
    });
  }
}

// Siguiente imagen
function nextImage() {
  if (currentProjectImages.length === 0) return;
  currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
  updateMainImage();
}

// Imagen anterior
function prevImage() {
  if (currentProjectImages.length === 0) return;
  currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
  updateMainImage();
}

// Abrir modal
function openModal(id) {
  const proyecto = proyectos[id];
  if (!proyecto) return;

  currentProjectImages = proyecto.imagenes;
  currentImageIndex = 0;

  const tituloEl = document.getElementById('proyectoTitulo');
  const ubicacionEl = document.getElementById('proyectoUbicacion');
  const clienteEl = document.getElementById('proyectoCliente');
  const servicioEl = document.getElementById('proyectoServicio');
  const fechaInicioEl = document.getElementById('proyectoFechaInicio');
  const fechaRecepcionEl = document.getElementById('proyectoFechaRecepcion');

  if (tituloEl) tituloEl.textContent = proyecto.titulo;
  if (ubicacionEl) ubicacionEl.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${proyecto.ubicacion}`;
  if (clienteEl) clienteEl.textContent = proyecto.cliente;
  if (servicioEl) servicioEl.textContent = proyecto.servicio;
  if (fechaInicioEl) fechaInicioEl.textContent = proyecto.fechaInicio || "No especificada";
  if (fechaRecepcionEl) fechaRecepcionEl.textContent = proyecto.fechaRecepcion || "No especificada";

  const mainImage = document.getElementById('mainImage');
  if (mainImage) mainImage.src = proyecto.imagenes[0];

  const thumbContainer = document.getElementById('thumbnails');
  if (thumbContainer) {
    thumbContainer.innerHTML = '';
    proyecto.imagenes.forEach((imgSrc, index) => {
      const thumb = document.createElement('img');
      thumb.src = imgSrc;
      thumb.alt = `Imagen ${index + 1}`;
      if (index === 0) thumb.classList.add('active-thumb');
      thumb.onclick = () => {
        currentImageIndex = index;
        updateMainImage();
      };
      thumbContainer.appendChild(thumb);
    });
  }

  const modal = document.getElementById('modal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

// Cerrar modal
function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Eventos del modal
document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('modal');
  if (modal && modal.style.display === 'flex') {
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape') closeModal();
  }
});

const modalElement = document.getElementById('modal');
if (modalElement) {
  modalElement.addEventListener('click', (e) => {
    if (e.target === modalElement) closeModal();
  });
}

/* ==================== 13. FILTROS PARA PROYECTOS.HTML ==================== */
if (document.querySelector('.filtro-btn')) {
  document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filtro = btn.dataset.filtro;
      document.querySelectorAll('.proyecto-card').forEach(card => {
        if (filtro === 'todos' || card.dataset.categoria === filtro) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}