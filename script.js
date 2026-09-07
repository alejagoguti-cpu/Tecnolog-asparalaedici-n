/**
 * ==========================================================================
 * TECNOLOGÍAS PARA LA EDICIÓN — ALEJANDRA GÓMEZ GUTIÉRREZ
 * Lógica interactiva: Revelación por número y Red Conceptual de Elementos
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. HAZ DE LUZ DE SEGUIMIENTO DEL CURSOR (#cursorGlow)
  // ==========================================================================
  const cursorGlow = document.getElementById('cursorGlow');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let curX = mouseX;
  let curY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function updateCursorLight() {
    curX += (mouseX - curX) * 0.15;
    curY += (mouseY - curY) * 0.15;
    if (cursorGlow) {
      cursorGlow.style.left = `${curX}px`;
      cursorGlow.style.top = `${curY}px`;
    }
    requestAnimationFrame(updateCursorLight);
  }
  updateCursorLight();

  // ==========================================================================
  // 2. DISPARADOR DE REVELACIÓN POR NÚMERO / ENCABEZADO
  // ==========================================================================
  const sectionContainers = document.querySelectorAll(
    'pensamiento, revelacion, observacion, memoria, intencion, comprension, reflexion, lenguaje, experiencia, construccion'
  );

  sectionContainers.forEach((sec) => {
    const header = sec.querySelector('encabezado');
    const badge = sec.querySelector('indicador-despliegue');

    if (header) {
      header.addEventListener('click', () => {
        const isHidden = sec.classList.contains('seccion-oculta');
        if (isHidden) {
          sec.classList.remove('seccion-oculta');
          sec.classList.add('seccion-activa');
          if (badge) badge.textContent = 'ACTIVO';
        } else {
          sec.classList.add('seccion-oculta');
          sec.classList.remove('seccion-activa');
          if (badge) badge.textContent = 'REVELAR';
        }
      });

      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          header.click();
        }
      });
    }
  });

  // ==========================================================================
  // 3. FONDO LUMÍNICO ADAPTATIVO EN 10 FASES CROMÁTICAS (#ambientCanvas)
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

    const sectionThemes = {
      '00': { r: 0, g: 240, b: 255 },    // Apertura: Cyan
      '01': { r: 0, g: 240, b: 255 },    // 01 Pensamiento: Artefacto (Cyan)
      '02': { r: 0, g: 229, b: 255 },    // 02 Revelación: Comunidad (Turquesa)
      '03': { r: 244, g: 63, b: 94 },    // 03 Observación: Vigilancia (Rojo carmesí)
      '04': { r: 255, g: 184, b: 0 },    // 04 Memoria: Recursos (Ámbar)
      '05': { r: 0, g: 240, b: 255 },    // 05 Intención: Traducción digital (Cyan)
      '06': { r: 168, g: 85, b: 247 },   // 06 Comprensión: Anansi (Violeta)
      '07': { r: 192, g: 132, b: 252 },  // 07 Reflexión: Capas ocultas (Púrpura)
      '08': { r: 255, g: 0, b: 127 },    // 08 Lenguaje: Angisas (Magenta)
      '09': { r: 0, g: 229, b: 255 },    // 09 Experiencia: Río (Turquesa fluvial)
      '10': { r: 255, g: 184, b: 0 }     // 10 Construcción: Libertad (Dorado solar)
    };

    let currentRGB = { r: 0, g: 240, b: 255 };
    let targetRGB = { r: 0, g: 240, b: 255 };

    const allSections = document.querySelectorAll(
      'saludo, pensamiento, revelacion, observacion, memoria, intencion, comprension, reflexion, lenguaje, experiencia, construccion'
    );

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const secId = entry.target.getAttribute('data-seccion') || '00';
          if (sectionThemes[secId]) {
            targetRGB = sectionThemes[secId];
          }
        }
      });
    }, { root: null, rootMargin: '-20% 0px -40% 0px', threshold: 0.15 });

    allSections.forEach((sec) => sectionObserver.observe(sec));

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

      currentRGB.r += (targetRGB.r - currentRGB.r) * 0.04;
      currentRGB.g += (targetRGB.g - currentRGB.g) * 0.04;
      currentRGB.b += (targetRGB.b - currentRGB.b) * 0.04;

      const docHeight = document.documentElement.scrollHeight - window.innerHeight || 1;
      const scrollProgress = Math.min(1, Math.max(0, scrollY / docHeight));

      const orb1X = w * (0.25 + Math.sin(time * 0.3) * 0.1);
      const orb1Y = h * (0.3 + Math.cos(time * 0.25) * 0.1 - scrollProgress * 0.15);
      const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 30, orb1X, orb1Y, w * 0.55);
      grad1.addColorStop(0, `rgba(${Math.round(currentRGB.r)}, ${Math.round(currentRGB.g)}, ${Math.round(currentRGB.b)}, 0.12)`);
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);

      const orb2X = w * (0.8 - Math.sin(time * 0.35) * 0.12);
      const orb2Y = h * (0.65 + Math.sin(time * 0.4) * 0.1);
      const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 40, orb2X, orb2Y, w * 0.48);
      grad2.addColorStop(0, `rgba(${Math.round(255 - currentRGB.r * 0.2)}, ${Math.round(currentRGB.g * 0.4)}, ${Math.round(255 - currentRGB.b * 0.1)}, 0.06)`);
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      time += 0.015;
      requestAnimationFrame(drawAmbient);
    }
    drawAmbient();
  }

  // ==========================================================================
  // 4. MOTOR DE REDES CONCEPTUALES (CANVAS CON ELEMENTOS DEL TEXTO)
  // ==========================================================================

  function initConceptNetwork(canvas, themeColor, proceduralType = 'default') {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let conceptList = [];
    try {
      conceptList = JSON.parse(canvas.getAttribute('data-conceptos') || '[]');
    } catch (e) {
      conceptList = ['Tecnología', 'Sistema', 'Lenguaje', 'Sentido'];
    }

    let time = 0;
    let localMouseX = -1000;
    let localMouseY = -1000;

    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      localMouseX = e.clientX - rect.left;
      localMouseY = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', () => {
      localMouseX = -1000;
      localMouseY = -1000;
    });

    // Crear nodos de conceptos
    const nodes = conceptList.map((word, i) => {
      const angle = (i / conceptList.length) * Math.PI * 2;
      return {
        text: word,
        xRatio: 0.5 + Math.cos(angle) * (0.28 + (i % 2) * 0.08),
        yRatio: 0.5 + Math.sin(angle) * (0.28 + (i % 2) * 0.08),
        baseXRatio: 0.5 + Math.cos(angle) * (0.28 + (i % 2) * 0.08),
        baseYRatio: 0.5 + Math.sin(angle) * (0.28 + (i % 2) * 0.08),
        vx: (Math.random() - 0.5) * 0.0008,
        vy: (Math.random() - 0.5) * 0.0008,
        phase: i * 1.2,
        highlight: false
      };
    });

    function drawNetwork() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width;
      const h = rect.height;

      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, w, h);
      time += 0.015;

      const cx = w * 0.5;
      const cy = h * 0.5;

      // --- CAPA PROCEDURAL BASE POR TIPO ---
      if (proceduralType === 'scanning') {
        for (let r = 60; r <= 220; r += 40) {
          ctx.beginPath();
          ctx.arc(cx, cy, r + Math.sin(time * 1.5 + r) * 4, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.06 + 0.06 * Math.sin(time + r)})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 8]);
          ctx.stroke();
        }
        ctx.setLineDash([]);
      } else if (proceduralType === 'radar') {
        const radius = Math.min(w, h) * 0.45;
        for (let r = 1; r <= 3; r++) {
          ctx.beginPath();
          ctx.arc(cx, cy, (radius / 3) * r, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(244, 63, 94, 0.12)';
          ctx.stroke();
        }
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, time * 1.5, time * 1.5 + 0.45);
        ctx.closePath();
        const sweepGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
        sweepGrad.addColorStop(0, 'rgba(244, 63, 94, 0.25)');
        sweepGrad.addColorStop(1, 'rgba(244, 63, 94, 0.0)');
        ctx.fillStyle = sweepGrad;
        ctx.fill();
        ctx.restore();
      } else if (proceduralType === 'web') {
        const spokes = 10;
        const rings = 5;
        const maxR = Math.min(w, h) * 0.48;
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.15)';
        ctx.lineWidth = 1;
        for (let i = 0; i < spokes; i++) {
          const ang = (i * 2 * Math.PI) / spokes;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(ang) * maxR, cy + Math.sin(ang) * maxR);
          ctx.stroke();
        }
        for (let r = 1; r <= rings; r++) {
          const ringR = (maxR / rings) * r;
          ctx.beginPath();
          for (let i = 0; i <= spokes; i++) {
            const ang = (i * 2 * Math.PI) / spokes;
            const x = cx + Math.cos(ang) * ringR;
            const y = cy + Math.sin(ang) * ringR;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      } else if (proceduralType === 'river') {
        for (let layer = 0; layer < 2; layer++) {
          ctx.beginPath();
          for (let x = 0; x <= w; x += 6) {
            const normX = x / w;
            const y = cy + Math.sin(normX * 8 + time * 2.0 + layer * 2) * (h * 0.08) * Math.sin(normX * Math.PI);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = layer === 0 ? 'rgba(0, 229, 255, 0.25)' : 'rgba(168, 85, 247, 0.2)';
          ctx.lineWidth = 1.6;
          ctx.stroke();
        }
      } else if (proceduralType === 'solar') {
        const numRays = 32;
        for (let i = 0; i < numRays; i++) {
          const ang = (i * 2 * Math.PI) / numRays + time * 0.1;
          const len = 90 + Math.sin(time * 2 + i) * 20;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(ang) * len, cy + Math.sin(ang) * len);
          ctx.strokeStyle = 'rgba(255, 184, 0, 0.12)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // --- DIBUJAR LÍNEAS DE CONEXIÓN ENTRE ELEMENTOS DEL TEXTO ---
      nodes.forEach((n, i) => {
        // Movimiento flotante suave
        const curXRatio = n.baseXRatio + Math.sin(time + n.phase) * 0.03;
        const curYRatio = n.baseYRatio + Math.cos(time + n.phase * 0.8) * 0.03;
        const px = curXRatio * w;
        const py = curYRatio * h;

        // Atracción al cursor
        const distMouse = Math.hypot(px - localMouseX, py - localMouseY);
        n.highlight = distMouse < 140;

        // Conectar con centro
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = n.highlight ? themeColor : 'rgba(255, 255, 255, 0.06)';
        ctx.lineWidth = n.highlight ? 1.5 : 0.8;
        ctx.stroke();

        // Conectar con nodos vecinos
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const px2 = (n2.baseXRatio + Math.sin(time + n2.phase) * 0.03) * w;
          const py2 = (n2.baseYRatio + Math.cos(time + n2.phase * 0.8) * 0.03) * h;
          const dist = Math.hypot(px - px2, py - py2);

          if (dist < 220) {
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px2, py2);
            const alpha = (1 - dist / 220) * (n.highlight || n2.highlight ? 0.45 : 0.12);
            ctx.strokeStyle = themeColor.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      // --- DIBUJAR ETIQUETAS Y NODOS DE CONCEPTOS DEL TEXTO ---
      ctx.font = '500 12px "DM Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      nodes.forEach((n) => {
        const curXRatio = n.baseXRatio + Math.sin(time + n.phase) * 0.03;
        const curYRatio = n.baseYRatio + Math.cos(time + n.phase * 0.8) * 0.03;
        const px = curXRatio * w;
        const py = curYRatio * h;

        // Píldora de fondo para la palabra
        const textMetrics = ctx.measureText(n.text);
        const padX = 10;
        const padY = 5;
        const boxW = textMetrics.width + padX * 2;
        const boxH = 22;

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(px - boxW / 2, py - boxH / 2, boxW, boxH, 11);
        ctx.fillStyle = n.highlight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(8, 16, 32, 0.85)';
        ctx.strokeStyle = n.highlight ? '#ffffff' : themeColor;
        ctx.lineWidth = n.highlight ? 1.5 : 1;
        ctx.shadowColor = themeColor;
        ctx.shadowBlur = n.highlight ? 15 : 4;
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Texto del concepto
        ctx.fillStyle = n.highlight ? '#020408' : '#e2e8f0';
        ctx.fillText(n.text, px, py + 1);
      });

      requestAnimationFrame(drawNetwork);
    }
    drawNetwork();
  }

  // Inicializar cada canvas con sus elementos conceptuales y colores
  initConceptNetwork(document.getElementById('canvasModulo01'), 'rgb(0, 240, 255)', 'scanning');
  initConceptNetwork(document.getElementById('canvasModulo02'), 'rgb(0, 229, 255)', 'default');
  initConceptNetwork(document.getElementById('canvasModulo03'), 'rgb(244, 63, 94)', 'radar');
  initConceptNetwork(document.getElementById('canvasModulo04'), 'rgb(255, 184, 0)', 'default');
  initConceptNetwork(document.getElementById('canvasModulo05'), 'rgb(0, 240, 255)', 'default');
  initConceptNetwork(document.getElementById('anansiWebCanvas'), 'rgb(168, 85, 247)', 'web');
  initConceptNetwork(document.getElementById('canvasModulo07'), 'rgb(192, 132, 252)', 'default');
  initConceptNetwork(document.getElementById('rayosCanvas'), 'rgb(255, 0, 127)', 'default');
  initConceptNetwork(document.getElementById('rioCanvas'), 'rgb(0, 229, 255)', 'river');
  initConceptNetwork(document.getElementById('cierreCanvas'), 'rgb(255, 184, 0)', 'solar');

  // ==========================================================================
  // 5. SÍNTESIS DE VOZ Y TRANSMISIÓN DE AUDIO (#voz)
  // ==========================================================================
  const closingNarrative =
    'Después de hacer este ejercicio, creo que lo que más cambió para mí fue la forma de entender qué significa realmente diseñar tecnología. La tecnología no está necesariamente en el objeto, sino en la relación que construimos con él y en la capacidad que tenemos de transformarlo según lo que necesitamos. Y quizás por eso la tecnología ha existido mucho antes de las pantallas: porque antes de existir los dispositivos ya existía la necesidad humana de comunicarse, organizarse, protegerse y encontrar formas de ser libres. Muchas gracias.';

  function speakClosing() {
    if (!('speechSynthesis' in window)) {
      alert('La síntesis de voz no está disponible en este navegador.');
      return;
    }

    const voicePlayer = document.querySelector('#voz');

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      if (voicePlayer) voicePlayer.classList.remove('reproduciendo');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(closingNarrative);
    utterance.lang = 'es-CO';
    utterance.rate = 0.88;
    utterance.pitch = 0.92;

    if (voicePlayer) voicePlayer.classList.add('reproduciendo');

    utterance.onend = () => {
      if (voicePlayer) voicePlayer.classList.remove('reproduciendo');
    };

    utterance.onerror = () => {
      if (voicePlayer) voicePlayer.classList.remove('reproduciendo');
    };

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
});
