document.addEventListener('DOMContentLoaded', () => {

  //Contador carrusel del slid.bs.carousel
  const carousel = document.getElementById('carouselNoticias');
  const contador = document.getElementById('contadorCarousel');
  if (carousel && contador) {
    const totalSlides = carousel.querySelectorAll('.carousel-item').length;
    contador.textContent = `Bloque 1 de ${totalSlides}`;
    carousel.addEventListener('slid.bs.carousel', (e) => {
      const index = e.to + 1;
      contador.textContent = `Bloque ${index} de ${totalSlides}`;
      document.querySelectorAll('#carouselNoticias .carousel-indicators [data-bs-target]').forEach((btn, i) => {
        btn.classList.toggle('active', i === e.to);
      });
      console.log('Carrusel cambiado a slide', index);
    });
  }

  //Focus en modales al abrir y reset tras cerrar
  document.querySelectorAll('.modal').forEach(modalEl => {
    modalEl.addEventListener('shown.bs.modal', () => {
      const primer = modalEl.querySelector('input, textarea');
      if (primer) primer.focus();
      console.log('Modal abierto:', modalEl.id);
    });
    modalEl.addEventListener('hidden.bs.modal', () => {
      const form = modalEl.querySelector('form');
      if (form) form.reset();
      console.log('Modal cerrado:', modalEl.id);
    });
  });

  //Logs de resultados en los collapse
  const panelResultados = document.getElementById('panelResultados');
  if (panelResultados) {
    panelResultados.addEventListener('show.bs.collapse', () => console.log('Resultados: abierto'));
    panelResultados.addEventListener('hidden.bs.collapse', () => console.log('Resultados: cerrado'));
  }
  document.querySelectorAll('.accordion-collapse').forEach(acc => {
    acc.addEventListener('show.bs.collapse', () => console.log('Accordion abierto:', acc.id));
    acc.addEventListener('hidden.bs.collapse', () => console.log('Accordion cerrado:', acc.id));
  });

  //Simular OK enviado en contacto
  const contactForm = document.getElementById('contactForm');
  const toastEl = document.getElementById('toastEnvio');
  const toastInstance = toastEl ? new bootstrap.Toast(toastEl) : null;
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (toastInstance) toastInstance.show();
      contactForm.reset();
      console.log('Formulario de contacto enviado (simulado).');
    });
  }

  //Filtro de equipos en el dropdown
  document.querySelectorAll('.filtro').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const comp = btn.getAttribute('data-comp');
      const texto = comp === 'all' ? 'Todas' : comp;
      const filtroTextEl = document.getElementById('filtroText');
      if (filtroTextEl) filtroTextEl.textContent = texto;
      document.querySelectorAll('.equipo-card').forEach(card => {
        const c = card.getAttribute('data-competition');
        card.style.display = (comp === 'all' || c === comp) ? '' : 'none';
      });
    });
  });

  //Filtrado en vivo de jugadores
  const buscar = document.getElementById('buscarJugador');
  if (buscar) {
    buscar.addEventListener('input', () => {
      const q = buscar.value.trim().toLowerCase();
      document.querySelectorAll('.jugador-card').forEach(card => {
        const nombre = (card.getAttribute('data-nombre') || '').toLowerCase();
        card.style.display = nombre.includes(q) ? '' : 'none';
      });
    });
  }

  //UX en cerrar del menú movil tras click en el link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const navbarCollapse = document.getElementById('navCollapse');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        new bootstrap.Collapse(navbarCollapse).toggle();
      }
    });
  });

  //Simular OK enviado en inscripcón
  (() => {
    const insForm = document.getElementById('inscripcionForm');
    const toastElIns = document.getElementById('toastInscripcion');
    const toastIns = toastElIns ? new bootstrap.Toast(toastElIns) : null;

    if (insForm) {
      insForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!insForm.checkValidity()) {
          insForm.classList.add('was-validated');
          return;
        }

        if (toastIns) toastIns.show();

        insForm.reset();
        insForm.classList.remove('was-validated');

        const modalEl = document.getElementById('modalInscripcion');
        if (modalEl) {
          setTimeout(() => {
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
          }, 1000);
        }

        console.log('Formulario de inscripción enviado (simulado).');
      });
    }
  })();

});