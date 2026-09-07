/**
 * ==========================================================================
 * TECNOLOGÍAS PARA LA EDICIÓN — ALEJANDRA GÓMEZ GUTIÉRREZ
 * Motor Generativo de Vanguardia — Ultra Optimizado a 60/120 FPS
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  let scrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
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
    let cw = window.innerWidth;
    let ch = window.innerHeight;

    const sectionThemes = {
      '00': { r: 0, g: 240, b: 255 },
      '01': { r: 0, g: 240, b: 255 },
      '02': { r: 0, g: 229, b: 255 },
      '03': { r: 244, g: 63, b: 94 },
      '04': { r: 255, g: 184, b: 0 },
      '05': { r: 0, g: 240, b: 255 },
      '06': { r: 168, g: 85, b: 247 },
      '07': { r: 192, g: 132, b: 252 },
      '08': { r: 255, g: 0, b: 127 },
      '09': { r: 0, g: 229, b: 255 },
      '10': { r: 255, g: 184, b: 0 }
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
    }, { root: null, rootMargin: '-10% 0px -20% 0px', threshold: 0.1 });

    allSections.forEach((sec) => sectionObserver.observe(sec));

    function resizeAmbient() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      cw = window.innerWidth;
      ch = window.innerHeight;
      canvas.width = Math.floor(cw * dpr);
      canvas.height = Math.floor(ch * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    window.addEventListener('resize', resizeAmbient);
    resizeAmbient();

    function drawAmbient() {
      ctx.clearRect(0, 0, cw, ch);

      currentRGB.r += (targetRGB.r - currentRGB.r) * 0.04;
      currentRGB.g += (targetRGB.g - currentRGB.g) * 0.04;
      currentRGB.b += (targetRGB.b - currentRGB.b) * 0.04;

      const docHeight = document.documentElement.scrollHeight - ch || 1;
      const scrollProgress = Math.min(1, Math.max(0, scrollY / docHeight));

      const orb1X = cw * (0.28 + Math.sin(time * 0.25) * 0.1);
      const orb1Y = ch * (0.35 + Math.cos(time * 0.2) * 0.1 - scrollProgress * 0.15);
      const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 30, orb1X, orb1Y, cw * 0.6);
      grad1.addColorStop(0, `rgba(${Math.round(currentRGB.r)}, ${Math.round(currentRGB.g)}, ${Math.round(currentRGB.b)}, 0.12)`);
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, cw, ch);

      const orb2X = cw * (0.75 - Math.sin(time * 0.3) * 0.12);
      const orb2Y = ch * (0.65 + Math.sin(time * 0.35) * 0.1);
      const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 40, orb2X, orb2Y, cw * 0.5);
      grad2.addColorStop(0, `rgba(${Math.round(255 - currentRGB.r * 0.2)}, ${Math.round(currentRGB.g * 0.4)}, ${Math.round(255 - currentRGB.b * 0.1)}, 0.06)`);
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, cw, ch);

      time += 0.015;
      requestAnimationFrame(drawAmbient);
    }
    drawAmbient();
  }

  // ==========================================================================
  // 4. MOTOR DE LAS 10 EXPERIENCIAS GENERATIVAS FLUIDAS (60/120 FPS)
  // ==========================================================================

  function initSpectacularAnimation(canvas, themeColor, animType) {
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
    let isVisible = false;
    let animationFrameId = null;

    let cw = 800;
    let ch = 500;
    let rectTop = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      cw = rect.width || 800;
      ch = rect.height || 500;
      rectTop = rect.top + window.scrollY;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(cw * dpr);
      canvas.height = Math.floor(ch * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    window.addEventListener('resize', resize);
    resize();

    // INTERSECTION OBSERVER: Pausa cuando está fuera de pantalla (¡CERO LAG!)
    const visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          resize();
          if (!animationFrameId) {
            draw();
          }
        } else {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        }
      });
    }, { root: null, rootMargin: '100px 0px 100px 0px', threshold: 0.01 });

    visibilityObserver.observe(canvas.parentElement || canvas);

    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      localMouseX = e.clientX - rect.left;
      localMouseY = e.clientY - rect.top;
    }, { passive: true });

    canvas.parentElement.addEventListener('mouseleave', () => {
      localMouseX = -1000;
      localMouseY = -1000;
    }, { passive: true });

    // Partículas generativas
    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0012,
      vy: (Math.random() - 0.5) * 0.0012,
      size: Math.random() * 2.2 + 1,
      char: ['⚿', '⟐', '✦', '⎈', '≋', '⎔', '∿', '0', '1'][i % 9],
      phase: Math.random() * Math.PI * 2,
      radius: Math.random() * 160 + 40,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.015 + 0.005
    }));

    // Nodos de palabras del texto
    const nodes = conceptList.map((word, i) => {
      const angle = (i / conceptList.length) * Math.PI * 2;
      const radiusDist = 0.32 + (i % 3) * 0.08;
      return {
        text: word,
        baseXRatio: 0.5 + Math.cos(angle) * radiusDist,
        baseYRatio: 0.5 + Math.sin(angle) * radiusDist,
        depth: 0.4 + (i % 4) * 0.25,
        phase: i * 1.3,
        highlight: false
      };
    });

    // Geometría 3D de artefacto para Módulo 01
    const vertices3D = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
      [0, -1.5, 0], [0, 1.5, 0], [-1.5, 0, 0], [1.5, 0, 0]
    ];
    const edges3D = [
      [0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7],
      [8,0],[8,1],[8,4],[8,5],[9,2],[9,3],[9,6],[9,7],[10,0],[10,3],[10,4],[10,7],[11,1],[11,2],[11,5],[11,6]
    ];

    function draw() {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      ctx.clearRect(0, 0, cw, ch);
      time += 0.016;

      const viewportOffset = (rectTop - scrollY + ch / 2 - window.innerHeight / 2) / window.innerHeight;
      const cx = cw * 0.5;
      const cy = ch * 0.5 - viewportOffset * 20;

      // ======================================================================
      // 10 ANIMACIONES VECTORIALES OPTIMIZADAS:
      // ======================================================================

      if (animType === 'artefacto3d') {
        // 01. ARTEFACTO 3D KINÉTICO FLOTANTE
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
        ctx.lineWidth = 1.2;

        for (let r = 80; r <= 280; r += 55) {
          ctx.beginPath();
          ctx.arc(cx, cy, r + Math.sin(time * 1.5 + r) * 6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.06 + 0.05 * Math.sin(time + r)})`;
          ctx.stroke();
        }

        const scale3D = Math.min(cw, ch) * 0.16;
        const rotX = time * 0.5;
        const rotY = time * 0.8;

        const proj = vertices3D.map(([vx, vy, vz]) => {
          let x1 = vx * Math.cos(rotY) - vz * Math.sin(rotY);
          let z1 = vx * Math.sin(rotY) + vz * Math.cos(rotY);
          let y2 = vy * Math.cos(rotX) - z1 * Math.sin(rotX);
          let z2 = vy * Math.sin(rotX) + z1 * Math.cos(rotX);
          const fov = 3.2;
          const p = fov / (fov + z2);
          return { x: cx + x1 * scale3D * p, y: cy + y2 * scale3D * p };
        });

        ctx.beginPath();
        edges3D.forEach(([i, j]) => {
          ctx.moveTo(proj[i].x, proj[i].y);
          ctx.lineTo(proj[j].x, proj[j].y);
        });
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.65)';
        ctx.lineWidth = 1.4;
        ctx.stroke();

      } else if (animType === 'redneuronal') {
        // 02. RED TOPOLÓGICA CON RESORTES ELÁSTICOS
        particles.forEach((p, idx) => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0.05) p.x = 0.95; if (p.x > 0.95) p.x = 0.05;
          if (p.y < 0.05) p.y = 0.95; if (p.y > 0.95) p.y = 0.05;
          const px = p.x * cw;
          const py = p.y * ch;

          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 229, 255, 0.85)';
          ctx.fill();

          for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(px - p2.x * cw, py - p2.y * ch);
            if (dist < 140) {
              ctx.beginPath();
              ctx.moveTo(px, py);
              ctx.lineTo(p2.x * cw, p2.y * ch);
              ctx.strokeStyle = `rgba(0, 229, 255, ${(1 - dist / 140) * 0.35})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });

      } else if (animType === 'lasersearch') {
        // 03. RADAR Y CONO LÁSER DE VIGILANCIA
        const radius = Math.min(cw, ch) * 0.5;
        for (let r = 1; r <= 3; r++) {
          ctx.beginPath();
          ctx.arc(cx, cy, (radius / 3) * r, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(244, 63, 94, 0.16)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        const angle = time * 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, angle, angle + 0.5);
        ctx.closePath();
        const laserGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
        laserGrad.addColorStop(0, 'rgba(244, 63, 94, 0.35)');
        laserGrad.addColorStop(1, 'rgba(244, 63, 94, 0.0)');
        ctx.fillStyle = laserGrad;
        ctx.fill();

      } else if (animType === 'nebulamemoria') {
        // 04. VÓRTICE DE POLVO ESTELAR Y MEMORIA DORADA
        particles.forEach((p) => {
          p.angle += p.speed;
          const px = cx + Math.cos(p.angle) * p.radius;
          const py = cy + Math.sin(p.angle) * (p.radius * 0.6);
          const alpha = 0.3 + 0.6 * Math.sin(time * 2 + p.phase);

          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 184, 0, ${alpha})`;
          ctx.fill();
        });

      } else if (animType === 'matrixflow') {
        // 05. FLUJO DIGITAL VECTORIAL Y MATRIZ
        const step = 50;
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
        ctx.lineWidth = 1;
        for (let x = 0; x <= cw; x += step) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, ch); ctx.stroke();
        }
        for (let y = 0; y <= ch; y += step) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cw, y); ctx.stroke();
        }

        for (let i = 1; i <= 4; i++) {
          const sz = (i * 65 + time * 50) % (Math.min(cw, ch) * 0.85);
          ctx.beginPath();
          ctx.rect(cx - sz / 2, cy - sz / 2, sz, sz);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.28 * (1 - sz / (Math.min(cw, ch) * 0.85))})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }

      } else if (animType === 'anansi3dweb') {
        // 06. TELARAÑA FRACTAL DE ANANSI
        const spokes = 12;
        const rings = 7;
        const maxR = Math.min(cw, ch) * 0.54;

        ctx.strokeStyle = 'rgba(168, 85, 247, 0.25)';
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
            const vib = Math.sin(time * 2.5 + r + i) * 4;
            const x = cx + Math.cos(ang) * (ringR + vib);
            const y = cy + Math.sin(ang) * (ringR + vib);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.15 + (r / rings) * 0.3})`;
          ctx.stroke();
        }

      } else if (animType === 'steganoglass') {
        // 07. LENTE ESTEGANOGRÁFICA Y GLIFOS
        ctx.font = '600 15px "DM Mono", monospace';
        particles.forEach((p) => {
          p.y -= 0.001;
          if (p.y < 0) p.y = 1;
          const px = p.x * cw;
          const py = p.y * ch;
          const distMouse = Math.hypot(px - localMouseX, py - localMouseY);
          const isDecoded = distMouse < 140;

          ctx.fillStyle = isDecoded ? 'rgba(0, 240, 255, 0.95)' : `rgba(192, 132, 252, ${0.25 + 0.25 * Math.sin(time * 2 + p.phase)})`;
          ctx.fillText(p.char, px, py);
        });

      } else if (animType === 'textileorigami') {
        // 08. RAYOS TEXTILES DE ANGISAS
        const numRays = 48;
        const maxRadius = Math.min(cw, ch) * 0.8;
        for (let i = 0; i < numRays; i++) {
          const fraction = i / (numRays - 1);
          const angle = Math.PI * 0.12 + fraction * Math.PI * 0.76;
          const wave = Math.sin(time * 1.6 + i * 0.2) * 0.03;
          const finalAngle = angle + wave;
          const rayLen = maxRadius * (0.65 + Math.sin(time * 2 + i * 0.25) * 0.18);
          const ex = cx + Math.cos(finalAngle) * rayLen;
          const ey = cy + Math.sin(finalAngle) * rayLen;

          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(ex, ey);
          const alpha = 0.14 + Math.sin(time + i) * 0.1;
          ctx.strokeStyle = i % 2 === 0 ? `rgba(0, 240, 255, ${alpha})` : `rgba(255, 0, 127, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

      } else if (animType === 'liquidriver') {
        // 09. OLAS FLUVIALES LÍQUIDAS
        const streamGrad = ctx.createLinearGradient(0, 0, cw, 0);
        streamGrad.addColorStop(0.0, '#00e5ff');
        streamGrad.addColorStop(0.5, '#38bdf8');
        streamGrad.addColorStop(1.0, '#ffb800');

        for (let layer = 0; layer < 3; layer++) {
          ctx.beginPath();
          for (let x = 0; x <= cw; x += 6) {
            const normX = x / cw;
            const env = Math.sin(normX * Math.PI);
            const w1 = Math.sin(normX * 8 + time * 2.2 + layer * 1.5) * (ch * 0.1);
            const w2 = Math.cos(normX * 14 - time * 1.5 + layer) * (ch * 0.04);
            const y = cy + (w1 + w2) * env;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = layer === 0 ? streamGrad : `rgba(0, 229, 255, ${0.35 - layer * 0.1})`;
          ctx.lineWidth = 2.2 - layer * 0.5;
          ctx.stroke();
        }

      } else if (animType === 'supernovasolar') {
        // 10. CORONA SOLAR Y HACES DE LIBERTAD
        const solarGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, cw * 0.5);
        solarGlow.addColorStop(0, 'rgba(255, 184, 0, 0.28)');
        solarGlow.addColorStop(0.5, 'rgba(255, 0, 127, 0.08)');
        solarGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = solarGlow;
        ctx.fillRect(0, 0, cw, ch);

        const numRays = 42;
        for (let i = 0; i < numRays; i++) {
          const ang = (i * 2 * Math.PI) / numRays + time * 0.1;
          const len = 120 + Math.sin(time * 2.5 + i * 0.5) * 35;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(ang) * len, cy + Math.sin(ang) * len);
          ctx.strokeStyle = `rgba(255, 184, 0, ${0.15 + Math.sin(time * 2 + i) * 0.1})`;
          ctx.lineWidth = 1.3;
          ctx.stroke();
        }
      }

      // ======================================================================
      // RED CONCEPTUAL POÉTICA DE PALABRAS DEL TEXTO (OPTIMIZADA)
      // ======================================================================
      nodes.forEach((n, i) => {
        const parallaxY = viewportOffset * (n.depth * 35);
        const targetXRatio = n.baseXRatio + Math.sin(time + n.phase) * 0.035;
        const targetYRatio = n.baseYRatio + Math.cos(time + n.phase * 0.8) * 0.035;
        const px = targetXRatio * cw;
        const py = targetYRatio * ch - parallaxY;

        const distMouse = Math.hypot(px - localMouseX, py - localMouseY);
        n.highlight = distMouse < 140;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = n.highlight ? themeColor : 'rgba(255, 255, 255, 0.06)';
        ctx.lineWidth = n.highlight ? 1.6 : 0.8;
        ctx.stroke();

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const parallaxY2 = viewportOffset * (n2.depth * 35);
          const px2 = (n2.baseXRatio + Math.sin(time + n2.phase) * 0.035) * cw;
          const py2 = (n2.baseYRatio + Math.cos(time + n2.phase * 0.8) * 0.035) * ch - parallaxY2;
          const dist = Math.hypot(px - px2, py - py2);

          if (dist < 220) {
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px2, py2);
            const alpha = (1 - dist / 220) * (n.highlight || n2.highlight ? 0.5 : 0.12);
            ctx.strokeStyle = themeColor.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      // Dibujar píldoras de conceptos
      ctx.font = '600 12.5px "DM Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      nodes.forEach((n) => {
        const parallaxY = viewportOffset * (n.depth * 35);
        const curXRatio = n.baseXRatio + Math.sin(time + n.phase) * 0.035;
        const curYRatio = n.baseYRatio + Math.cos(time + n.phase * 0.8) * 0.035;
        const px = curXRatio * cw;
        const py = curYRatio * ch - parallaxY;

        const textMetrics = ctx.measureText(n.text);
        const padX = 12;
        const padY = 5;
        const boxW = textMetrics.width + padX * 2;
        const boxH = 24;

        ctx.beginPath();
        ctx.roundRect(px - boxW / 2, py - boxH / 2, boxW, boxH, 12);
        ctx.fillStyle = n.highlight ? 'rgba(255, 255, 255, 0.96)' : 'rgba(4, 10, 22, 0.9)';
        ctx.fill();

        ctx.strokeStyle = n.highlight ? '#ffffff' : themeColor;
        ctx.lineWidth = n.highlight ? 1.8 : 1.1;
        ctx.stroke();

        ctx.fillStyle = n.highlight ? '#010306' : '#f0f6fc';
        ctx.fillText(n.text, px, py + 1);
      });

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();
  }

  // ==========================================================================
  // INICIALIZACIÓN DE LAS 10 EXPERIENCIAS GENERATIVAS
  // ==========================================================================
  initSpectacularAnimation(document.getElementById('canvasModulo01'), 'rgb(0, 240, 255)', 'artefacto3d');
  initSpectacularAnimation(document.getElementById('canvasModulo02'), 'rgb(0, 229, 255)', 'redneuronal');
  initSpectacularAnimation(document.getElementById('canvasModulo03'), 'rgb(244, 63, 94)', 'lasersearch');
  initSpectacularAnimation(document.getElementById('canvasModulo04'), 'rgb(255, 184, 0)', 'nebulamemoria');
  initSpectacularAnimation(document.getElementById('canvasModulo05'), 'rgb(0, 240, 255)', 'matrixflow');
  initSpectacularAnimation(document.getElementById('anansiWebCanvas'), 'rgb(168, 85, 247)', 'anansi3dweb');
  initSpectacularAnimation(document.getElementById('canvasModulo07'), 'rgb(192, 132, 252)', 'steganoglass');
  initSpectacularAnimation(document.getElementById('rayosCanvas'), 'rgb(255, 0, 127)', 'textileorigami');
  initSpectacularAnimation(document.getElementById('rioCanvas'), 'rgb(0, 229, 255)', 'liquidriver');
  initSpectacularAnimation(document.getElementById('cierreCanvas'), 'rgb(255, 184, 0)', 'supernovasolar');

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
