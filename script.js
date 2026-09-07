/**
 * ==========================================================================
 * TECNOLOGÍAS PARA LA EDICIÓN — ALEJANDRA GÓMEZ GUTIÉRREZ
 * Lógica interactiva y poética de scroll profundo con red conceptual viva
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  let scrollY = window.scrollY;
  let scrollVelocity = 0;
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    scrollVelocity = scrollY - lastScrollY;
    lastScrollY = scrollY;
  }, { passive: true });

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
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
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
  // 3. FONDO LUMÍNICO Y SCROLL OBSERVADOR POÉTICO (#ambientCanvas)
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
          entry.target.classList.add('en-foco');
          const secId = entry.target.getAttribute('data-seccion') || '00';
          if (sectionThemes[secId]) {
            targetRGB = sectionThemes[secId];
          }
        } else {
          entry.target.classList.remove('en-foco');
        }
      });
    }, { root: null, rootMargin: '-15% 0px -25% 0px', threshold: 0.1 });

    allSections.forEach((sec) => sectionObserver.observe(sec));

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

      currentRGB.r += (targetRGB.r - currentRGB.r) * 0.035;
      currentRGB.g += (targetRGB.g - currentRGB.g) * 0.035;
      currentRGB.b += (targetRGB.b - currentRGB.b) * 0.035;

      const docHeight = document.documentElement.scrollHeight - window.innerHeight || 1;
      const scrollProgress = Math.min(1, Math.max(0, scrollY / docHeight));

      const orb1X = w * (0.28 + Math.sin(time * 0.25) * 0.12);
      const orb1Y = h * (0.35 + Math.cos(time * 0.2) * 0.12 - scrollProgress * 0.2);
      const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 40, orb1X, orb1Y, w * 0.65);
      grad1.addColorStop(0, `rgba(${Math.round(currentRGB.r)}, ${Math.round(currentRGB.g)}, ${Math.round(currentRGB.b)}, 0.14)`);
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);

      const orb2X = w * (0.75 - Math.sin(time * 0.3) * 0.15);
      const orb2Y = h * (0.65 + Math.sin(time * 0.35) * 0.12);
      const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 50, orb2X, orb2Y, w * 0.55);
      grad2.addColorStop(0, `rgba(${Math.round(255 - currentRGB.r * 0.2)}, ${Math.round(currentRGB.g * 0.4)}, ${Math.round(255 - currentRGB.b * 0.1)}, 0.08)`);
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      time += 0.012;
      requestAnimationFrame(drawAmbient);
    }
    drawAmbient();
  }

  // ==========================================================================
  // 4. MOTOR DE REDES CONCEPTUALES POÉTICAS CON PARALAJE DE SCROLL
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

    // Crear nodos con offsets de profundidad para scroll parallax
    const nodes = conceptList.map((word, i) => {
      const angle = (i / conceptList.length) * Math.PI * 2;
      const radiusDist = 0.30 + (i % 3) * 0.06;
      return {
        text: word,
        xRatio: 0.5 + Math.cos(angle) * radiusDist,
        yRatio: 0.5 + Math.sin(angle) * radiusDist,
        baseXRatio: 0.5 + Math.cos(angle) * radiusDist,
        baseYRatio: 0.5 + Math.sin(angle) * radiusDist,
        depth: 0.4 + (i % 4) * 0.25, // Profundidad para paralaje
        phase: i * 1.3,
        highlight: false
      };
    });

    function drawNetwork() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width;
      const h = rect.height;

      // Calcular paralaje según posición respecto al viewport
      const viewportCenterOffset = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;

      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      const cx = w * 0.5;
      const cy = h * 0.5 - viewportCenterOffset * 35; // Desplazamiento central sutil

      // --- CAPA PROCEDURAL BASE POR TIPO ---
      if (proceduralType === 'scanning') {
        for (let r = 70; r <= 260; r += 45) {
          ctx.beginPath();
          ctx.arc(cx, cy, r + Math.sin(time * 1.4 + r) * 5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.05 + 0.05 * Math.sin(time + r)})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 10]);
          ctx.stroke();
        }
        ctx.setLineDash([]);
      } else if (proceduralType === 'radar') {
        const radius = Math.min(w, h) * 0.46;
        for (let r = 1; r <= 3; r++) {
          ctx.beginPath();
          ctx.arc(cx, cy, (radius / 3) * r, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(244, 63, 94, 0.12)';
          ctx.stroke();
        }
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, time * 1.3, time * 1.3 + 0.45);
        ctx.closePath();
        const sweepGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
        sweepGrad.addColorStop(0, 'rgba(244, 63, 94, 0.22)');
        sweepGrad.addColorStop(1, 'rgba(244, 63, 94, 0.0)');
        ctx.fillStyle = sweepGrad;
        ctx.fill();
        ctx.restore();
      } else if (proceduralType === 'web') {
        const spokes = 12;
        const rings = 6;
        const maxR = Math.min(w, h) * 0.52;
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.16)';
        ctx.lineWidth = 1.1;
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
        for (let layer = 0; layer < 3; layer++) {
          ctx.beginPath();
          for (let x = 0; x <= w; x += 5) {
            const normX = x / w;
            const y = cy + Math.sin(normX * 9 + time * 1.8 + layer * 2) * (h * 0.09) * Math.sin(normX * Math.PI);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = layer === 0 ? 'rgba(0, 229, 255, 0.22)' : 'rgba(168, 85, 247, 0.16)';
          ctx.lineWidth = 1.6;
          ctx.stroke();
        }
      } else if (proceduralType === 'solar') {
        const numRays = 36;
        for (let i = 0; i < numRays; i++) {
          const ang = (i * 2 * Math.PI) / numRays + time * 0.08;
          const len = 110 + Math.sin(time * 2 + i) * 30;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(ang) * len, cy + Math.sin(ang) * len);
          ctx.strokeStyle = 'rgba(255, 184, 0, 0.14)';
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }

      // --- DIBUJAR LÍNEAS DE CONEXIÓN ENTRE ELEMENTOS ---
      nodes.forEach((n, i) => {
        // Deriva flotante con paralaje de scroll
        const parallaxY = viewportCenterOffset * (n.depth * 45);
        const curXRatio = n.baseXRatio + Math.sin(time + n.phase) * 0.035;
        const curYRatio = n.baseYRatio + Math.cos(time + n.phase * 0.8) * 0.035;
        const px = curXRatio * w;
        const py = curYRatio * h - parallaxY;

        // Atracción suave al cursor
        const distMouse = Math.hypot(px - localMouseX, py - localMouseY);
        n.highlight = distMouse < 150;

        // Conexión al centro orbital
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = n.highlight ? themeColor : 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = n.highlight ? 1.6 : 0.8;
        ctx.stroke();

        // Conectar con nodos vecinos
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const parallaxY2 = viewportCenterOffset * (n2.depth * 45);
          const px2 = (n2.baseXRatio + Math.sin(time + n2.phase) * 0.035) * w;
          const py2 = (n2.baseYRatio + Math.cos(time + n2.phase * 0.8) * 0.035) * h - parallaxY2;
          const dist = Math.hypot(px - px2, py - py2);

          if (dist < 240) {
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px2, py2);
            const alpha = (1 - dist / 240) * (n.highlight || n2.highlight ? 0.5 : 0.14);
            ctx.strokeStyle = themeColor.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      // --- DIBUJAR ETIQUETAS DE CONCEPTOS DEL TEXTO ---
      ctx.font = '500 12.5px "DM Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      nodes.forEach((n) => {
        const parallaxY = viewportCenterOffset * (n.depth * 45);
        const curXRatio = n.baseXRatio + Math.sin(time + n.phase) * 0.035;
        const curYRatio = n.baseYRatio + Math.cos(time + n.phase * 0.8) * 0.035;
        const px = curXRatio * w;
        const py = curYRatio * h - parallaxY;

        const textMetrics = ctx.measureText(n.text);
        const padX = 12;
        const padY = 6;
        const boxW = textMetrics.width + padX * 2;
        const boxH = 24;

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(px - boxW / 2, py - boxH / 2, boxW, boxH, 12);
        ctx.fillStyle = n.highlight ? 'rgba(255, 255, 255, 0.96)' : 'rgba(6, 12, 24, 0.88)';
        ctx.strokeStyle = n.highlight ? '#ffffff' : themeColor;
        ctx.lineWidth = n.highlight ? 1.8 : 1.1;
        ctx.shadowColor = themeColor;
        ctx.shadowBlur = n.highlight ? 18 : 6;
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = n.highlight ? '#010306' : '#eaf2fa';
        ctx.fillText(n.text, px, py + 1);
      });

      requestAnimationFrame(drawNetwork);
    }
    drawNetwork();
  }

  // Inicializar los 10 lienzos con sus colores y temáticas
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
