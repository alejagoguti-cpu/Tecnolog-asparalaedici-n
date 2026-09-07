/**
 * ==========================================================================
 * TECNOLOGÍAS PARA LA EDICIÓN — ALEJANDRA GÓMEZ GUTIÉRREZ
 * 10 Animaciones Procedurales Únicas (Olas, Red, Flujo, Matriz, Telaraña, etc.)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  let scrollY = window.scrollY;
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
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
  // 4. MOTOR DE LAS 10 ANIMACIONES DISTINTAS Y REDES CONCEPTUALES
  // ==========================================================================

  function initDistinctAnimation(canvas, themeColor, animType) {
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

    // Partículas auxiliares para tipos específicos
    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0015,
      vy: (Math.random() - 0.5) * 0.0015,
      size: Math.random() * 2.5 + 1,
      char: ['⚿', '⟐', '✦', '⎈', '≋', '⎔', '∿', '0', '1'][Math.floor(Math.random() * 9)],
      phase: Math.random() * Math.PI * 2
    }));

    // Nodos de palabras del texto
    const nodes = conceptList.map((word, i) => {
      const angle = (i / conceptList.length) * Math.PI * 2;
      const radiusDist = 0.30 + (i % 3) * 0.06;
      return {
        text: word,
        xRatio: 0.5 + Math.cos(angle) * radiusDist,
        yRatio: 0.5 + Math.sin(angle) * radiusDist,
        baseXRatio: 0.5 + Math.cos(angle) * radiusDist,
        baseYRatio: 0.5 + Math.sin(angle) * radiusDist,
        depth: 0.4 + (i % 4) * 0.25,
        phase: i * 1.3,
        highlight: false
      };
    });

    function draw() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width;
      const h = rect.height;

      const viewportOffset = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;

      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      const cx = w * 0.5;
      const cy = h * 0.5 - viewportOffset * 30;

      // ======================================================================
      // 10 ANIMACIONES TOTALMENTE DIFERENTES:
      // ======================================================================

      if (animType === 'scanning') {
        // 01. ESCANEO CONCÉNTRICO PULSANTE
        for (let r = 70; r <= 280; r += 45) {
          ctx.beginPath();
          ctx.arc(cx, cy, r + Math.sin(time * 1.5 + r) * 6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.07 + 0.06 * Math.sin(time + r)})`;
          ctx.lineWidth = 1.2;
          ctx.setLineDash([4, 12]);
          ctx.stroke();
        }
        ctx.setLineDash([]);

      } else if (animType === 'network') {
        // 02. RED VIVA DINÁMICA DE MALLA INTERCONECTADA
        particles.forEach((p, idx) => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0.05) p.x = 0.95; if (p.x > 0.95) p.x = 0.05;
          if (p.y < 0.05) p.y = 0.95; if (p.y > 0.95) p.y = 0.05;
          const px = p.x * w;
          const py = p.y * h;

          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 229, 255, 0.7)';
          ctx.fill();

          for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(px - p2.x * w, py - p2.y * h);
            if (dist < 140) {
              ctx.beginPath();
              ctx.moveTo(px, py);
              ctx.lineTo(p2.x * w, p2.y * h);
              ctx.strokeStyle = `rgba(0, 229, 255, ${(1 - dist / 140) * 0.25})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });

      } else if (animType === 'radar') {
        // 03. RADAR DE BARRIDO DE VIGILANCIA COLONIAL
        const radius = Math.min(w, h) * 0.46;
        for (let r = 1; r <= 3; r++) {
          ctx.beginPath();
          ctx.arc(cx, cy, (radius / 3) * r, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(244, 63, 94, 0.16)';
          ctx.stroke();
        }
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, time * 1.6, time * 1.6 + 0.5);
        ctx.closePath();
        const sweep = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
        sweep.addColorStop(0, 'rgba(244, 63, 94, 0.28)');
        sweep.addColorStop(1, 'rgba(244, 63, 94, 0.0)');
        ctx.fillStyle = sweep;
        ctx.fill();
        ctx.restore();

      } else if (animType === 'stardust') {
        // 04. CONSTELACIÓN ESTELAR DE POLVO Y MEMORIA DORADA
        particles.forEach((p) => {
          const px = p.x * w;
          const py = p.y * h;
          const alpha = 0.25 + 0.65 * Math.sin(time * 2 + p.phase);
          ctx.beginPath();
          ctx.arc(px, py, p.size * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 184, 0, ${alpha})`;
          ctx.shadowColor = '#ffb800';
          ctx.shadowBlur = 10;
          ctx.fill();
        });
        ctx.shadowBlur = 0;

      } else if (animType === 'gridflow') {
        // 05. MATRIZ DE CUADRÍCULA DIGITAL Y FLUJO VECTORIAL
        const step = 45;
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.09)';
        ctx.lineWidth = 1;
        for (let x = 0; x <= w; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = 0; y <= h; y += step) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
        // Pulsos que viajan por las líneas
        for (let i = 1; i <= 4; i++) {
          const sz = i * 50 + Math.sin(time * 1.6 + i) * 8;
          ctx.beginPath();
          ctx.rect(cx - sz / 2, cy - sz / 2, sz, sz);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 + 0.1 * Math.sin(time + i)})`;
          ctx.stroke();
        }

      } else if (animType === 'spiderweb') {
        // 06. TELARAÑA FRACTAL EN ESPIRAL DE ANANSI
        const spokes = 12;
        const rings = 7;
        const maxR = Math.min(w, h) * 0.54;
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
        ctx.lineWidth = 1.1;
        for (let i = 0; i < spokes; i++) {
          const ang = (i * 2 * Math.PI) / spokes + Math.sin(time * 0.25) * 0.04;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(ang) * maxR, cy + Math.sin(ang) * maxR);
          ctx.stroke();
        }
        for (let r = 1; r <= rings; r++) {
          const ringR = (maxR / rings) * r;
          ctx.beginPath();
          for (let i = 0; i <= spokes; i++) {
            const ang = (i * 2 * Math.PI) / spokes + Math.sin(time * 0.25) * 0.04;
            const wobble = Math.sin(time * 2 + r + i) * 4;
            const x = cx + Math.cos(ang) * (ringR + wobble);
            const y = cy + Math.sin(ang) * (ringR + wobble);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.14 + (r / rings) * 0.3})`;
          ctx.stroke();
        }

      } else if (animType === 'glyphs') {
        // 07. GLIFOS Y SÍMBOLOS CIFRADOS EN CASCADA FLOTANTE
        ctx.font = '14px monospace';
        particles.forEach((p) => {
          p.y -= 0.001;
          if (p.y < 0) p.y = 1;
          ctx.fillStyle = `rgba(192, 132, 252, ${0.3 + 0.4 * Math.sin(time * 2 + p.phase)})`;
          ctx.fillText(p.char, p.x * w, p.y * h);
        });

      } else if (animType === 'textile') {
        // 08. RAYOS TEXTILES DE ANGISAS Y HILOS EN ABANICO
        const numRays = 52;
        const maxRadius = Math.min(w, h) * 0.78;
        for (let i = 0; i < numRays; i++) {
          const fraction = i / (numRays - 1);
          const angle = Math.PI * 0.12 + fraction * Math.PI * 0.76;
          const wave = Math.sin(time * 1.5 + i * 0.2) * 0.03;
          const finalAngle = angle + wave;
          const rayLen = maxRadius * (0.65 + Math.sin(time * 2 + i * 0.25) * 0.15);
          const ex = cx + Math.cos(finalAngle) * rayLen;
          const ey = cy + Math.sin(finalAngle) * rayLen;

          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(ex, ey);
          const alpha = 0.12 + Math.sin(time + i) * 0.1;
          ctx.strokeStyle = i % 2 === 0 ? `rgba(0, 240, 255, ${alpha})` : `rgba(255, 0, 127, ${alpha})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }

      } else if (animType === 'riverwaves') {
        // 09. OLAS FLUVIALES Y ONDAS ARMÓNICAS DEL RÍO
        const streamGrad = ctx.createLinearGradient(0, 0, w, 0);
        streamGrad.addColorStop(0.0, '#00e5ff');
        streamGrad.addColorStop(0.5, '#38bdf8');
        streamGrad.addColorStop(1.0, '#ffb800');

        for (let layer = 0; layer < 3; layer++) {
          ctx.beginPath();
          for (let x = 0; x <= w; x += 4) {
            const normX = x / w;
            const env = Math.sin(normX * Math.PI);
            const w1 = Math.sin(normX * 8 + time * 2.2 + layer * 1.5) * (h * 0.11);
            const w2 = Math.cos(normX * 14 - time * 1.4 + layer) * (h * 0.04);
            const y = cy + (w1 + w2) * env;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = layer === 0 ? streamGrad : `rgba(168, 85, 247, ${0.4 - layer * 0.12})`;
          ctx.lineWidth = 2.4 - layer * 0.5;
          ctx.stroke();
        }

      } else if (animType === 'solar') {
        // 10. CONSTELACIÓN SOLAR Y HACES DE LIBERTAD
        const numSolarRays = 42;
        const solarGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, w * 0.45);
        solarGlow.addColorStop(0, 'rgba(255, 184, 0, 0.22)');
        solarGlow.addColorStop(0.6, 'rgba(255, 0, 127, 0.08)');
        solarGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = solarGlow;
        ctx.fillRect(0, 0, w, h);

        for (let i = 0; i < numSolarRays; i++) {
          const ang = (i * 2 * Math.PI) / numSolarRays + time * 0.1;
          const len = 110 + Math.sin(time * 2.5 + i * 0.5) * 35;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(ang) * len, cy + Math.sin(ang) * len);
          ctx.strokeStyle = `rgba(255, 184, 0, ${0.12 + Math.sin(time + i) * 0.08})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      // ======================================================================
      // RED CONCEPTUAL POÉTICA DE PALABRAS DEL TEXTO CON PARALAJE
      // ======================================================================
      nodes.forEach((n, i) => {
        const parallaxY = viewportOffset * (n.depth * 45);
        const curXRatio = n.baseXRatio + Math.sin(time + n.phase) * 0.035;
        const curYRatio = n.baseYRatio + Math.cos(time + n.phase * 0.8) * 0.035;
        const px = curXRatio * w;
        const py = curYRatio * h - parallaxY;

        const distMouse = Math.hypot(px - localMouseX, py - localMouseY);
        n.highlight = distMouse < 150;

        // Conexión con el centro
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = n.highlight ? themeColor : 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = n.highlight ? 1.6 : 0.8;
        ctx.stroke();

        // Conexión entre nodos vecinos
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const parallaxY2 = viewportOffset * (n2.depth * 45);
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

      // Dibujar píldoras de conceptos
      ctx.font = '500 12.5px "DM Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      nodes.forEach((n) => {
        const parallaxY = viewportOffset * (n.depth * 45);
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

      requestAnimationFrame(draw);
    }
    draw();
  }

  // ==========================================================================
  // INICIALIZACIÓN DE LOS 10 MÓDULOS CON SUS 10 ANIMACIONES ESPECÍFICAS
  // ==========================================================================
  initDistinctAnimation(document.getElementById('canvasModulo01'), 'rgb(0, 240, 255)', 'scanning');
  initDistinctAnimation(document.getElementById('canvasModulo02'), 'rgb(0, 229, 255)', 'network');
  initDistinctAnimation(document.getElementById('canvasModulo03'), 'rgb(244, 63, 94)', 'radar');
  initDistinctAnimation(document.getElementById('canvasModulo04'), 'rgb(255, 184, 0)', 'stardust');
  initDistinctAnimation(document.getElementById('canvasModulo05'), 'rgb(0, 240, 255)', 'gridflow');
  initDistinctAnimation(document.getElementById('anansiWebCanvas'), 'rgb(168, 85, 247)', 'spiderweb');
  initDistinctAnimation(document.getElementById('canvasModulo07'), 'rgb(192, 132, 252)', 'glyphs');
  initDistinctAnimation(document.getElementById('rayosCanvas'), 'rgb(255, 0, 127)', 'textile');
  initDistinctAnimation(document.getElementById('rioCanvas'), 'rgb(0, 229, 255)', 'riverwaves');
  initDistinctAnimation(document.getElementById('cierreCanvas'), 'rgb(255, 184, 0)', 'solar');

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
