/**
 * TECNOLOGÍAS DEL SECRETO — INTERACTIVIDAD DEL ENSAYO PRO
 * Motor Cuántico: Aurora Cromática Adaptativa por Sección, Física 3D de Pliegues,
 * Espectro Hidro-Acústico Fluido y Síntesis Sonora
 */

// ==========================================================================
// 1. LIENZO AMBIENTAL CROMÁTICO ADAPTATIVO (FONDO DE LUZ POR SECCIONES)
// ==========================================================================
const ambientContainer = document.querySelector('#ambientCanvas');
if (ambientContainer) {
  let canvas = ambientContainer.querySelector('canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    ambientContainer.appendChild(canvas);
  }
  const ctx = canvas.getContext('2d');
  let time = 0;
  let scrollY = window.scrollY;

  // Paletas de color por tema de sección
  const sectionThemes = {
    '00': { r: 0, g: 240, b: 255 },    // Cyan
    '01': { r: 0, g: 240, b: 255 },    // Cyan Origen
    '02': { r: 168, g: 85, b: 247 },   // Violeta Anansi
    '03': { r: 255, g: 0, b: 127 },    // Magenta Angisa
    '04': { r: 0, g: 229, b: 255 },    // Turquesa Río
    '05': { r: 255, g: 184, b: 0 }     // Ámbar Cierre
  };

  let currentRGB = { r: 0, g: 240, b: 255 };
  let targetRGB = { r: 0, g: 240, b: 255 };

  // Detección de sección activa con IntersectionObserver
  const sections = document.querySelectorAll('saludo, origen, historias-anansi, panuelos-angisa, canciones-rio, cierre');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -40% 0px',
    threshold: 0.2
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const secId = entry.target.getAttribute('data-section') || '01';
        if (sectionThemes[secId]) {
          targetRGB = sectionThemes[secId];
        }
      }
    });
  }, observerOptions);

  sections.forEach((sec) => sectionObserver.observe(sec));

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  }, { passive: true });

  function resizeAmbient() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', resizeAmbient);
  resizeAmbient();

  function drawAmbient() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
      resizeAmbient();
    }

    ctx.clearRect(0, 0, w, h);

    // Suavizado e interpolación de color
    currentRGB.r += (targetRGB.r - currentRGB.r) * 0.04;
    currentRGB.g += (targetRGB.g - currentRGB.g) * 0.04;
    currentRGB.b += (targetRGB.b - currentRGB.b) * 0.04;

    const docHeight = document.documentElement.scrollHeight - window.innerHeight || 1;
    const scrollProgress = Math.min(1, Math.max(0, scrollY / docHeight));

    // Aura 1: Núcleo Primario Dinámico
    const orb1X = w * (0.3 + Math.sin(time * 0.35) * 0.12);
    const orb1Y = h * (0.3 + Math.cos(time * 0.28) * 0.1 - scrollProgress * 0.15);
    const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 20, orb1X, orb1Y, w * 0.5);
    grad1.addColorStop(0, `rgba(${Math.round(currentRGB.r)}, ${Math.round(currentRGB.g)}, ${Math.round(currentRGB.b)}, 0.14)`);
    grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, w, h);

    // Aura 2: Contraluz Cromático
    const orb2X = w * (0.75 - Math.sin(time * 0.4) * 0.1);
    const orb2Y = h * (0.6 + Math.sin(time * 0.45) * 0.12);
    const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 30, orb2X, orb2Y, w * 0.45);
    grad2.addColorStop(0, `rgba(${Math.round(255 - currentRGB.r * 0.3)}, ${Math.round(currentRGB.g * 0.5)}, ${Math.round(255 - currentRGB.b * 0.2)}, 0.09)`);
    grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, w, h);

    time += 0.015;
    requestAnimationFrame(drawAmbient);
  }
  drawAmbient();
}

// ==========================================================================
// 2. ESPECTRO HIDRO-ACÚSTICO FLUVIAL INTERACTIVO (RÍO CUÁNTICO)
// ==========================================================================
const riverContainer = document.querySelector('#rio');
if (riverContainer) {
  let canvas = riverContainer.querySelector('canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    riverContainer.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');
  let time = 0;
  let mouseX = 0;
  let isHovered = false;

  riverContainer.addEventListener('mouseenter', () => { isHovered = true; });
  riverContainer.addEventListener('mouseleave', () => { isHovered = false; });
  riverContainer.addEventListener('mousemove', (e) => {
    const rect = riverContainer.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
  });

  const nodes = [
    { label: '[01 // ACÚSTICA FLUVIAL]', pct: 0.12, color: '#00e5ff' },
    { label: '[02 // MEMORIA ORAL]', pct: 0.32, color: '#38bdf8' },
    { label: '[03 // CRIPTOGRAFÍA EN CANTO]', pct: 0.50, color: '#a855f7' },
    { label: '[04 // PROPAGACIÓN HÍDRICA]', pct: 0.68, color: '#ec4899' },
    { label: '[05 // RESISTENCIA COLECTIVA]', pct: 0.85, color: '#ffb800' }
  ];

  function drawRiver() {
    const r = riverContainer.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = r.width;
    const h = r.height;

    if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, w, h);

    const midY = h * 0.52;
    const hoverAmp = isHovered ? 1.3 : 1.0;

    // Resplandor ambiental interior del sonar
    const riverGlow = ctx.createRadialGradient(w * 0.5, midY, 10, w * 0.5, midY, w * 0.55);
    riverGlow.addColorStop(0, 'rgba(0, 229, 255, 0.18)');
    riverGlow.addColorStop(0.5, 'rgba(168, 85, 247, 0.12)');
    riverGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = riverGlow;
    ctx.fillRect(0, 0, w, h);

    // Gradiente Espectral
    const streamGrad = ctx.createLinearGradient(0, 0, w, 0);
    streamGrad.addColorStop(0.0, '#00e5ff');
    streamGrad.addColorStop(0.35, '#38bdf8');
    streamGrad.addColorStop(0.65, '#a855f7');
    streamGrad.addColorStop(0.85, '#ff007f');
    streamGrad.addColorStop(1.0, '#ffb800');

    function calculateWave(x, phase, scale) {
      const normX = x / w;
      const envelope = Math.sin(normX * Math.PI);
      const mouseInfluence = isHovered ? Math.exp(-Math.pow((x - mouseX) / (w * 0.18), 2)) * 0.4 : 0;
      const wave1 = Math.sin(normX * 9 + time * 1.8 + phase) * (h * 0.22 * scale);
      const wave2 = Math.cos(normX * 16 - time * 1.1) * (h * 0.08 * scale);
      const wave3 = Math.sin(normX * 24 + time * 2.4) * (h * 0.03 * scale);
      return midY + (wave1 + wave2 + wave3 + mouseInfluence * h * 0.15) * envelope * hoverAmp;
    }

    // Trazo 1: Onda Principal
    ctx.save();
    ctx.beginPath();
    for (let x = 0; x <= w; x += 3) {
      const y = calculateWave(x, 0, 1.0);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = streamGrad;
    ctx.lineWidth = 2.6;
    ctx.shadowColor = 'rgba(0, 229, 255, 0.8)';
    ctx.shadowBlur = 18;
    ctx.stroke();
    ctx.restore();

    // Trazo 2: Onda Armónica Secundaria
    ctx.save();
    ctx.beginPath();
    for (let x = 0; x <= w; x += 3) {
      const y = calculateWave(x, Math.PI * 0.8, -0.75);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.75)';
    ctx.lineWidth = 1.6;
    ctx.shadowColor = 'rgba(168, 85, 247, 0.6)';
    ctx.shadowBlur = 12;
    ctx.stroke();
    ctx.restore();

    // Nodos de Frecuencia Flotantes
    nodes.forEach((node, i) => {
      const x = w * node.pct;
      const isUpper = i % 2 === 0;
      const y = calculateWave(x, isUpper ? 0 : Math.PI * 0.8, isUpper ? 1.0 : -0.75);

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = node.color;
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.font = '600 10.5px "DM Mono", monospace';
      ctx.fillStyle = node.color;
      ctx.textAlign = 'center';
      const textOffset = isUpper ? -16 : 20;
      ctx.fillText(node.label, x, y + textOffset);
      ctx.restore();
    });

    time += 0.02;
    requestAnimationFrame(drawRiver);
  }
  drawRiver();
}

// ==========================================================================
// 3. FÍSICA 3D DE PLIEGUES KINÉTICOS (ANGISAS) CON BRILLO ESPECULAR
// ==========================================================================
const pliegueCards = document.querySelectorAll('secreto, alerta, resistencia');
pliegueCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -8;
    const rotY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ==========================================================================
// 4. SÍNTESIS DE VOZ Y TRANSMISIÓN DE AUDIO (CIERRE DEL ENSAYO)
// ==========================================================================
const closingNarrative =
  'Después de hacer este ejercicio, creo que lo que más cambió para mí fue la forma de entender qué significa realmente diseñar tecnología. La tecnología no está necesariamente en el objeto, sino en la relación que construimos con él y en la capacidad que tenemos de transformarlo según lo que necesitamos. Y quizás por eso la tecnología ha existido mucho antes de las pantallas: porque antes de existir los dispositivos ya existía la necesidad humana de comunicarse, organizarse, protegerse y encontrar formas de ser libres. Muchas gracias.';

function speakClosing() {
  if (!('speechSynthesis' in window)) {
    alert('La síntesis de voz no está soportada en este navegador.');
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(closingNarrative);
  utterance.lang = 'es-CO';
  utterance.rate = 0.88;
  utterance.pitch = 0.9;

  window.speechSynthesis.speak(utterance);
}

const voiceTrigger = document.querySelector('#voz');
if (voiceTrigger) {
  voiceTrigger.addEventListener('click', speakClosing);
  voiceTrigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      speakClosing();
    }
  });
}





