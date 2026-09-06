/**
 * TECNOLOGÍAS DEL SECRETO — INTERACTIVIDAD DEL ENSAYO
 * Onda de sonido cromática y síntesis de voz editorial
 */

// 1. Simulación de onda cromática de luz y sonido (río de comunicación)
const riverContainer = document.querySelector('#rio') || document.querySelector('#riverCanvas');
if (riverContainer) {
  let canvas = riverContainer.tagName.toLowerCase() === 'canvas' ? riverContainer : riverContainer.querySelector('canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    riverContainer.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');
  let time = 0;
  let mouseX = -1;
  let mouseY = -1;
  let isHovered = false;

  riverContainer.addEventListener('mousemove', (e) => {
    const rect = riverContainer.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    isHovered = true;
  });

  riverContainer.addEventListener('mouseleave', () => {
    isHovered = false;
  });

  const nodes = [
    { label: 'el río como tecnología', pct: 0.12, factorY: 0, color: '#60a5fa' },
    { label: 'memoria', pct: 0.32, factorY: -0.45, color: '#818cf8' },
    { label: 'secreto', pct: 0.48, factorY: 0.38, color: '#c084fc' },
    { label: 'sonido', pct: 0.65, factorY: -0.35, color: '#f472b6' },
    { label: 'resistencia', pct: 0.82, factorY: 0.48, color: '#fb923c' },
    { label: 'libertad', pct: 0.94, factorY: -0.15, color: '#fbbf24' }
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

    // A. Auras difusas y resplandor cromático volumétrico
    const glowGradient1 = ctx.createRadialGradient(w * 0.35, midY - 20, 10, w * 0.35, midY, 90);
    glowGradient1.addColorStop(0, 'rgba(59, 130, 246, 0.28)');
    glowGradient1.addColorStop(1, 'rgba(59, 130, 246, 0)');
    ctx.fillStyle = glowGradient1;
    ctx.fillRect(0, 0, w, h);

    const glowGradient2 = ctx.createRadialGradient(w * 0.62, midY + 10, 10, w * 0.62, midY, 100);
    glowGradient2.addColorStop(0, 'rgba(236, 72, 153, 0.25)');
    glowGradient2.addColorStop(1, 'rgba(236, 72, 153, 0)');
    ctx.fillStyle = glowGradient2;
    ctx.fillRect(0, 0, w, h);

    const glowGradient3 = ctx.createRadialGradient(w * 0.85, midY, 15, w * 0.85, midY, 110);
    glowGradient3.addColorStop(0, 'rgba(245, 158, 11, 0.32)');
    glowGradient3.addColorStop(1, 'rgba(245, 158, 11, 0)');
    ctx.fillStyle = glowGradient3;
    ctx.fillRect(0, 0, w, h);

    // Gradiente lineal para las líneas armónicas
    const strokeGrad = ctx.createLinearGradient(w * 0.08, 0, w * 0.95, 0);
    strokeGrad.addColorStop(0.0, '#3b82f6');
    strokeGrad.addColorStop(0.25, '#6366f1');
    strokeGrad.addColorStop(0.5, '#ec4899');
    strokeGrad.addColorStop(0.75, '#f97316');
    strokeGrad.addColorStop(1.0, '#fbbf24');

    // Función armónica de la onda
    function getWaveY(x, phase, scale) {
      const normX = x / w;
      const envelope = Math.sin(normX * Math.PI); // atenuación suave en los extremos
      const wave1 = Math.sin(normX * 8 + time * 1.5 + phase) * (h * 0.22 * scale);
      const wave2 = Math.cos(normX * 14 - time * 0.8) * (h * 0.08 * scale);
      const wave3 = Math.sin(normX * 22 + time * 2.0) * (h * 0.03 * scale);
      return midY + (wave1 + wave2 + wave3) * envelope * hoverAmp;
    }

    // B. Onda armónica superior
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

    // C. Onda armónica inferior (contrapunto)
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

    // D. Línea punteada orbital entre nodos
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

    // E. Nodos luminosos y tipografía flotante
    nodes.forEach((node, i) => {
      const x = w * node.pct;
      const isTop = i % 2 === 1;
      const y = getWaveY(x, isTop ? 0 : Math.PI * 0.75, isTop ? 1.0 : -0.85);

      // Punto ancla luminoso
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = node.color;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();

      // Etiqueta tipográfica
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

// 2. Sintetizador de voz para el cierre del ensayo
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



