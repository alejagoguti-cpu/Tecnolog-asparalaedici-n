/**
 * TECNOLOGÍAS DEL SECRETO — INTERACTIVIDAD DEL ENSAYO
 * Sistema visual cromático inmersivo, ondas lumínicas y síntesis sonora
 */

// ==========================================================================
// 1. LIENZO AMBIENTAL CROMÁTICO (FONDO DE LUZ GLOBAL)
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

    const docHeight = document.documentElement.scrollHeight - window.innerHeight || 1;
    const scrollProgress = Math.min(1, Math.max(0, scrollY / docHeight));

    // Auras radiales dinámicas que viajan con el scroll
    // 1. Aura Azul (Origen)
    const orb1X = w * (0.2 + Math.sin(time * 0.4) * 0.08);
    const orb1Y = h * (0.25 + Math.cos(time * 0.3) * 0.06 - scrollProgress * 0.3);
    const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 10, orb1X, orb1Y, w * 0.45);
    grad1.addColorStop(0, 'rgba(59, 130, 246, 0.12)');
    grad1.addColorStop(1, 'rgba(59, 130, 246, 0)');
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, w, h);

    // 2. Aura Magenta / Púrpura (Angisas / Anansi)
    const orb2X = w * (0.8 - Math.sin(time * 0.35) * 0.08);
    const orb2Y = h * (0.5 + Math.sin(time * 0.5) * 0.08);
    const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 10, orb2X, orb2Y, w * 0.48);
    grad2.addColorStop(0, 'rgba(236, 72, 153, 0.11)');
    grad2.addColorStop(1, 'rgba(236, 72, 153, 0)');
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, w, h);

    // 3. Aura Ámbar / Dorada (Río y Cierre)
    const orb3X = w * (0.5 + Math.cos(time * 0.45) * 0.1);
    const orb3Y = h * (0.75 + scrollProgress * 0.2);
    const grad3 = ctx.createRadialGradient(orb3X, orb3Y, 15, orb3X, orb3Y, w * 0.52);
    grad3.addColorStop(0, 'rgba(245, 158, 11, 0.13)');
    grad3.addColorStop(1, 'rgba(245, 158, 11, 0)');
    ctx.fillStyle = grad3;
    ctx.fillRect(0, 0, w, h);

    time += 0.012;
    requestAnimationFrame(drawAmbient);
  }
  drawAmbient();
}

// ==========================================================================
// 2. ONDA DE SONIDO CROMÁTICA EN EL RÍO
// ==========================================================================
const riverContainer = document.querySelector('#rio') || document.querySelector('#riverCanvas');
if (riverContainer) {
  let canvas = riverContainer.tagName.toLowerCase() === 'canvas' ? riverContainer : riverContainer.querySelector('canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    riverContainer.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');
  let time = 0;
  let isHovered = false;

  riverContainer.addEventListener('mouseenter', () => { isHovered = true; });
  riverContainer.addEventListener('mouseleave', () => { isHovered = false; });

  const nodes = [
    { label: 'el río como tecnología', pct: 0.12, color: '#60a5fa' },
    { label: 'memoria', pct: 0.32, color: '#818cf8' },
    { label: 'secreto', pct: 0.48, color: '#c084fc' },
    { label: 'sonido', pct: 0.65, color: '#f472b6' },
    { label: 'resistencia', pct: 0.82, color: '#fb923c' },
    { label: 'libertad', pct: 0.94, color: '#fbbf24' }
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
    const hoverAmp = isHovered ? 1.25 : 1.0;

    // Auras difusas y resplandor cromático volumétrico
    const glow1 = ctx.createRadialGradient(w * 0.35, midY - 20, 10, w * 0.35, midY, 90);
    glow1.addColorStop(0, 'rgba(59, 130, 246, 0.28)');
    glow1.addColorStop(1, 'rgba(59, 130, 246, 0)');
    ctx.fillStyle = glow1;
    ctx.fillRect(0, 0, w, h);

    const glow2 = ctx.createRadialGradient(w * 0.62, midY + 10, 10, w * 0.62, midY, 100);
    glow2.addColorStop(0, 'rgba(236, 72, 153, 0.25)');
    glow2.addColorStop(1, 'rgba(236, 72, 153, 0)');
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, w, h);

    const glow3 = ctx.createRadialGradient(w * 0.85, midY, 15, w * 0.85, midY, 110);
    glow3.addColorStop(0, 'rgba(245, 158, 11, 0.32)');
    glow3.addColorStop(1, 'rgba(245, 158, 11, 0)');
    ctx.fillStyle = glow3;
    ctx.fillRect(0, 0, w, h);

    // Gradiente lineal cromático
    const strokeGrad = ctx.createLinearGradient(w * 0.08, 0, w * 0.95, 0);
    strokeGrad.addColorStop(0.0, '#3b82f6');
    strokeGrad.addColorStop(0.25, '#6366f1');
    strokeGrad.addColorStop(0.5, '#ec4899');
    strokeGrad.addColorStop(0.75, '#f97316');
    strokeGrad.addColorStop(1.0, '#fbbf24');

    function getWaveY(x, phase, scale) {
      const normX = x / w;
      const envelope = Math.sin(normX * Math.PI);
      const wave1 = Math.sin(normX * 8 + time * 1.5 + phase) * (h * 0.22 * scale);
      const wave2 = Math.cos(normX * 14 - time * 0.8) * (h * 0.08 * scale);
      const wave3 = Math.sin(normX * 22 + time * 2.0) * (h * 0.03 * scale);
      return midY + (wave1 + wave2 + wave3) * envelope * hoverAmp;
    }

    // Onda armónica superior
    ctx.save();
    ctx.beginPath();
    for (let x = 0; x <= w; x += 3) {
      const y = getWaveY(x, 0, 1.0);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = strokeGrad;
    ctx.lineWidth = 2.4;
    ctx.shadowColor = 'rgba(236, 72, 153, 0.7)';
    ctx.shadowBlur = 14;
    ctx.stroke();
    ctx.restore();

    // Onda armónica inferior
    ctx.save();
    ctx.beginPath();
    for (let x = 0; x <= w; x += 3) {
      const y = getWaveY(x, Math.PI * 0.75, -0.85);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    const lowerGrad = ctx.createLinearGradient(w * 0.1, 0, w * 0.9, 0);
    lowerGrad.addColorStop(0.0, 'rgba(59, 130, 246, 0.7)');
    lowerGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.7)');
    lowerGrad.addColorStop(1.0, 'rgba(245, 158, 11, 0.8)');
    ctx.strokeStyle = lowerGrad;
    ctx.lineWidth = 1.6;
    ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.restore();

    // Línea punteada orbital entre nodos
    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([3, 5]);
    for (let x = 0; x <= w; x += 4) {
      const y = getWaveY(x, Math.PI * 0.35, 0.35);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(240, 237, 230, 0.35)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    // Nodos luminosos y tipografía flotante
    nodes.forEach((node, i) => {
      const x = w * node.pct;
      const isTop = i % 2 === 1;
      const y = getWaveY(x, isTop ? 0 : Math.PI * 0.75, isTop ? 1.0 : -0.85);

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = node.color;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.font = '500 11px "DM Mono", monospace';
      ctx.fillStyle = node.color;
      ctx.textAlign = 'center';
      const textOffset = isTop ? -14 : 18;
      ctx.fillText(node.label, x, y + textOffset);
      ctx.restore();
    });

    time += 0.018;
    requestAnimationFrame(drawRiver);
  }

  drawRiver();
}

// ==========================================================================
// 3. EFECTO 3D EN TARJETAS DE PLIEGUES (ANGISAS)
// ==========================================================================
const pliegueCards = document.querySelectorAll('secreto, alerta, resistencia');
pliegueCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -6;
    const rotY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-3px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ==========================================================================
// 4. SINTETIZADOR DE VOZ PARA EL CIERRE DEL ENSAYO
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
  utterance.pitch = 0.88;

  window.speechSynthesis.speak(utterance);
}

const voiceTrigger = document.querySelector('#voz') || document.querySelector('#voiceTrigger');
if (voiceTrigger) {
  voiceTrigger.addEventListener('click', speakClosing);
  voiceTrigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      speakClosing();
    }
  });
}




