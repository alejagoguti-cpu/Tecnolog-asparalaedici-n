/**
 * ==========================================================================
 * TECNOLOGÍAS PARA LA EDICIÓN — ALEJANDRA GÓMEZ GUTIÉRREZ
 * Motor Generativo de Vanguardia: 10 Experiencias Visuales Espectaculares
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
  // 4. MOTOR DE LAS 10 EXPERIENCIAS VISUALES ESPECTACULARES
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

    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      localMouseX = e.clientX - rect.left;
      localMouseY = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', () => {
      localMouseX = -1000;
      localMouseY = -1000;
    });

    // Ondas de clic interactivas
    let ripples = [];
    canvas.parentElement.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        r: 5,
        maxR: 280,
        alpha: 1
      });
    });

    // Partículas generativas avanzadas
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.002,
      vy: (Math.random() - 0.5) * 0.002,
      size: Math.random() * 3 + 1,
      char: ['⚿', '⟐', '✦', '⎈', '≋', '⎔', '∿', '0', '1', '§', '◊'][i % 11],
      phase: Math.random() * Math.PI * 2,
      radius: Math.random() * 180 + 40,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.005
    }));

    // Nodos de palabras del texto con masa y resorte
    const nodes = conceptList.map((word, i) => {
      const angle = (i / conceptList.length) * Math.PI * 2;
      const radiusDist = 0.32 + (i % 3) * 0.08;
      return {
        text: word,
        x: 0,
        y: 0,
        baseXRatio: 0.5 + Math.cos(angle) * radiusDist,
        baseYRatio: 0.5 + Math.sin(angle) * radiusDist,
        vx: 0,
        vy: 0,
        depth: 0.4 + (i % 4) * 0.25,
        phase: i * 1.3,
        highlight: false
      };
    });

    // Geometría 3D de artefacto para Módulo 01 (Dodecaedro / Hipercubo)
    const vertices3D = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
      [0, -1.6, 0], [0, 1.6, 0], [-1.6, 0, 0], [1.6, 0, 0]
    ];
    const edges3D = [
      [0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7],
      [8,0],[8,1],[8,4],[8,5],[9,2],[9,3],[9,6],[9,7],[10,0],[10,3],[10,4],[10,7],[11,1],[11,2],[11,5],[11,6]
    ];

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
      time += 0.018;

      const cx = w * 0.5;
      const cy = h * 0.5 - viewportOffset * 25;

      // ======================================================================
      // RENDERIZADO DE LAS 10 ESCENAS GENERATIVAS DE ALTO IMPACTO:
      // ======================================================================

      if (animType === 'artefacto3d') {
        // 01. ARTEFACTO 3D KINÉTICO FLOTANTE + SONAR ÓRBITAL
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
        ctx.lineWidth = 1.4;

        // Sonar de fondo
        for (let r = 80; r <= 320; r += 50) {
          ctx.beginPath();
          ctx.arc(cx, cy, r + Math.sin(time * 1.8 + r) * 8, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.06 + 0.06 * Math.sin(time + r)})`;
          ctx.setLineDash([4, 12]);
          ctx.stroke();
        }
        ctx.setLineDash([]);

        // Rotación 3D del artefacto
        const scale3D = Math.min(w, h) * 0.16;
        const rotX = time * 0.6 + localMouseY * 0.001;
        const rotY = time * 0.9 + localMouseX * 0.001;

        const proj = vertices3D.map(([vx, vy, vz]) => {
          let x1 = vx * Math.cos(rotY) - vz * Math.sin(rotY);
          let z1 = vx * Math.sin(rotY) + vz * Math.cos(rotY);
          let y2 = vy * Math.cos(rotX) - z1 * Math.sin(rotX);
          let z2 = vy * Math.sin(rotX) + z1 * Math.cos(rotX);
          const fov = 3.2;
          const p = fov / (fov + z2);
          return { x: cx + x1 * scale3D * p, y: cy + y2 * scale3D * p, p };
        });

        edges3D.forEach(([i, j]) => {
          ctx.beginPath();
          ctx.moveTo(proj[i].x, proj[i].y);
          ctx.lineTo(proj[j].x, proj[j].y);
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.55)';
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 12;
          ctx.stroke();
        });
        ctx.shadowBlur = 0;
        ctx.restore();

      } else if (animType === 'redneuronal') {
        // 02. RED TOPOLÓGICA CON RESORTES ELÁSTICOS Y PARTÍCULAS VIVAS
        ctx.save();
        particles.forEach((p, idx) => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0.05) p.x = 0.95; if (p.x > 0.95) p.x = 0.05;
          if (p.y < 0.05) p.y = 0.95; if (p.y > 0.95) p.y = 0.05;
          const px = p.x * w;
          const py = p.y * h;

          ctx.beginPath();
          ctx.arc(px, py, p.size * 1.3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 229, 255, 0.85)';
          ctx.shadowColor = '#00e5ff';
          ctx.shadowBlur = 8;
          ctx.fill();

          for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(px - p2.x * w, py - p2.y * h);
            if (dist < 160) {
              ctx.beginPath();
              ctx.moveTo(px, py);
              ctx.lineTo(p2.x * w, p2.y * h);
              ctx.strokeStyle = `rgba(0, 229, 255, ${(1 - dist / 160) * 0.4})`;
              ctx.lineWidth = 1.2;
              ctx.stroke();
            }
          }
        });
        ctx.shadowBlur = 0;
        ctx.restore();

      } else if (animType === 'lasersearch') {
        // 03. RADAR DE BARRIDO Y LÁSER VOLUMÉTRICO DE VIGILANCIA
        ctx.save();
        const radius = Math.min(w, h) * 0.52;
        for (let r = 1; r <= 4; r++) {
          ctx.beginPath();
          ctx.arc(cx, cy, (radius / 4) * r, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(244, 63, 94, 0.2)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Cono de haz de luz rojo volumétrico
        const angle = time * 1.8;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, angle, angle + 0.6);
        ctx.closePath();
        const laserGrad = ctx.createRadialGradient(cx, cy, 15, cx, cy, radius);
        laserGrad.addColorStop(0, 'rgba(244, 63, 94, 0.5)');
        laserGrad.addColorStop(0.7, 'rgba(244, 63, 94, 0.15)');
        laserGrad.addColorStop(1, 'rgba(244, 63, 94, 0.0)');
        ctx.fillStyle = laserGrad;
        ctx.fill();

        // Línea de rayo central
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle + 0.3) * radius, cy + Math.sin(angle + 0.3) * radius);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 18;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.restore();

      } else if (animType === 'nebulamemoria') {
        // 04. VÓRTICE CÓSMICO DE POLVO ESTELAR Y MEMORIA DORADA
        ctx.save();
        particles.forEach((p) => {
          p.angle += p.speed;
          const px = cx + Math.cos(p.angle) * p.radius;
          const py = cy + Math.sin(p.angle) * (p.radius * 0.6);
          const alpha = 0.3 + 0.7 * Math.sin(time * 2.5 + p.phase);

          ctx.beginPath();
          ctx.arc(px, py, p.size * 1.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 184, 0, ${alpha})`;
          ctx.shadowColor = '#ffb800';
          ctx.shadowBlur = 14;
          ctx.fill();
        });
        ctx.shadowBlur = 0;
        ctx.restore();

      } else if (animType === 'matrixflow') {
        // 05. FLUJO DIGITAL VECTORIAL Y PULSOS DE CUADRÍCULA
        ctx.save();
        const step = 50;
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.1)';
        ctx.lineWidth = 1;
        for (let x = 0; x <= w; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }
        for (let y = 0; y <= h; y += step) {
          ctx.beginPath();
          ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }

        // Ondas de cuadrícula digital viajando
        for (let i = 1; i <= 5; i++) {
          const sz = (i * 65 + time * 60) % (Math.min(w, h) * 0.9);
          ctx.beginPath();
          ctx.rect(cx - sz / 2, cy - sz / 2, sz, sz);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.35 * (1 - sz / (Math.min(w, h) * 0.9))})`;
          ctx.lineWidth = 1.6;
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 10;
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
        ctx.restore();

      } else if (animType === 'anansi3dweb') {
        // 06. TELARAÑA FRACTAL EN ESPIRAL CON VIBRACIÓN DE SEDA
        ctx.save();
        const spokes = 14;
        const rings = 8;
        const maxR = Math.min(w, h) * 0.58;

        for (let i = 0; i < spokes; i++) {
          const ang = (i * 2 * Math.PI) / spokes + Math.sin(time * 0.3) * 0.05;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(ang) * maxR, cy + Math.sin(ang) * maxR);
          ctx.strokeStyle = 'rgba(168, 85, 247, 0.35)';
          ctx.lineWidth = 1.3;
          ctx.stroke();
        }

        for (let r = 1; r <= rings; r++) {
          const ringR = (maxR / rings) * r;
          ctx.beginPath();
          for (let i = 0; i <= spokes; i++) {
            const ang = (i * 2 * Math.PI) / spokes + Math.sin(time * 0.3) * 0.05;
            const vib = Math.sin(time * 3 + r * 1.5 + i) * 6;
            const x = cx + Math.cos(ang) * (ringR + vib);
            const y = cy + Math.sin(ang) * (ringR + vib);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.2 + (r / rings) * 0.4})`;
          ctx.lineWidth = 1.5;
          ctx.shadowColor = '#d946ef';
          ctx.shadowBlur = 12;
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
        ctx.restore();

      } else if (animType === 'steganoglass') {
        // 07. LENTE ESTEGANOGRÁFICA MAGNÉTICA Y GLIFOS FLOTANTES
        ctx.save();
        ctx.font = '600 16px "DM Mono", monospace';
        particles.forEach((p) => {
          p.y -= 0.0012;
          if (p.y < 0) p.y = 1;
          const px = p.x * w;
          const py = p.y * h;
          const distMouse = Math.hypot(px - localMouseX, py - localMouseY);
          const isDecoded = distMouse < 160;

          if (isDecoded) {
            ctx.fillStyle = 'rgba(0, 240, 255, 0.95)';
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = 16;
            ctx.fillText(p.char, px, py);
          } else {
            ctx.fillStyle = `rgba(192, 132, 252, ${0.25 + 0.3 * Math.sin(time * 2 + p.phase)})`;
            ctx.shadowBlur = 0;
            ctx.fillText(p.char, px, py);
          }
        });
        ctx.shadowBlur = 0;
        ctx.restore();

      } else if (animType === 'textileorigami') {
        // 08. HACES TEXTILES EN ABANICO Y TELAR CINÉTICO
        ctx.save();
        const numRays = 64;
        const maxRadius = Math.min(w, h) * 0.85;
        for (let i = 0; i < numRays; i++) {
          const fraction = i / (numRays - 1);
          const angle = Math.PI * 0.1 + fraction * Math.PI * 0.8;
          const wave = Math.sin(time * 2 + i * 0.25) * 0.04;
          const finalAngle = angle + wave;
          const rayLen = maxRadius * (0.65 + Math.sin(time * 2.5 + i * 0.3) * 0.2);
          const ex = cx + Math.cos(finalAngle) * rayLen;
          const ey = cy + Math.sin(finalAngle) * rayLen;

          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(ex, ey);
          const alpha = 0.18 + Math.sin(time * 1.5 + i) * 0.14;
          ctx.strokeStyle = i % 2 === 0 ? `rgba(0, 240, 255, ${alpha})` : `rgba(255, 0, 127, ${alpha})`;
          ctx.lineWidth = 1.3;
          ctx.stroke();
        }
        ctx.restore();

      } else if (animType === 'liquidriver') {
        // 09. SIMULACIÓN DE OLAS FLUVIALES LÍQUIDAS Y PATRONES ACÚSTICOS
        ctx.save();
        const streamGrad = ctx.createLinearGradient(0, 0, w, 0);
        streamGrad.addColorStop(0.0, '#00e5ff');
        streamGrad.addColorStop(0.4, '#38bdf8');
        streamGrad.addColorStop(0.8, '#a855f7');
        streamGrad.addColorStop(1.0, '#ffb800');

        for (let layer = 0; layer < 4; layer++) {
          ctx.beginPath();
          for (let x = 0; x <= w; x += 4) {
            const normX = x / w;
            const env = Math.sin(normX * Math.PI);
            const w1 = Math.sin(normX * 8 + time * 2.5 + layer * 1.4) * (h * 0.12);
            const w2 = Math.cos(normX * 16 - time * 1.8 + layer) * (h * 0.05);
            const y = cy + (w1 + w2) * env;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = layer === 0 ? streamGrad : `rgba(0, 229, 255, ${0.45 - layer * 0.1})`;
          ctx.lineWidth = 2.6 - layer * 0.5;
          ctx.shadowColor = 'rgba(0, 229, 255, 0.6)';
          ctx.shadowBlur = layer === 0 ? 16 : 0;
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
        ctx.restore();

      } else if (animType === 'supernovasolar') {
        // 10. CORONA SOLAR VOLUMÉTRICA Y HACES DE LIBERTAD
        ctx.save();
        const solarGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, w * 0.55);
        solarGlow.addColorStop(0, 'rgba(255, 184, 0, 0.35)');
        solarGlow.addColorStop(0.4, 'rgba(255, 0, 127, 0.12)');
        solarGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = solarGlow;
        ctx.fillRect(0, 0, w, h);

        const numRays = 54;
        for (let i = 0; i < numRays; i++) {
          const ang = (i * 2 * Math.PI) / numRays + time * 0.12;
          const len = 140 + Math.sin(time * 3 + i * 0.6) * 45;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(ang) * len, cy + Math.sin(ang) * len);
          ctx.strokeStyle = `rgba(255, 184, 0, ${0.18 + Math.sin(time * 2 + i) * 0.12})`;
          ctx.lineWidth = 1.4;
          ctx.shadowColor = '#ffb800';
          ctx.shadowBlur = 12;
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
        ctx.restore();
      }

      // ======================================================================
      // ONDAS DE CLIC INTERACTIVAS (RIPPLES)
      // ======================================================================
      ripples.forEach((rp, idx) => {
        rp.r += 4.5;
        rp.alpha *= 0.96;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = themeColor.replace('rgb', 'rgba').replace(')', `, ${rp.alpha * 0.7})`);
        ctx.lineWidth = 2;
        ctx.stroke();
      });
      ripples = ripples.filter(rp => rp.alpha > 0.05);

      // ======================================================================
      // RED CONCEPTUAL POÉTICA DE PALABRAS DEL TEXTO
      // ======================================================================
      nodes.forEach((n, i) => {
        const parallaxY = viewportOffset * (n.depth * 45);
        const targetXRatio = n.baseXRatio + Math.sin(time + n.phase) * 0.04;
        const targetYRatio = n.baseYRatio + Math.cos(time + n.phase * 0.8) * 0.04;
        const targetPx = targetXRatio * w;
        const targetPy = targetYRatio * h - parallaxY;

        // Atracción al cursor
        const distMouse = Math.hypot(targetPx - localMouseX, targetPy - localMouseY);
        n.highlight = distMouse < 160;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(targetPx, targetPy);
        ctx.strokeStyle = n.highlight ? themeColor : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = n.highlight ? 1.8 : 0.9;
        ctx.stroke();

        // Conectar con nodos vecinos
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const parallaxY2 = viewportOffset * (n2.depth * 45);
          const px2 = (n2.baseXRatio + Math.sin(time + n2.phase) * 0.04) * w;
          const py2 = (n2.baseYRatio + Math.cos(time + n2.phase * 0.8) * 0.04) * h - parallaxY2;
          const dist = Math.hypot(targetPx - px2, targetPy - py2);

          if (dist < 260) {
            ctx.beginPath();
            ctx.moveTo(targetPx, targetPy);
            ctx.lineTo(px2, py2);
            const alpha = (1 - dist / 260) * (n.highlight || n2.highlight ? 0.6 : 0.16);
            ctx.strokeStyle = themeColor.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }
      });

      // Dibujar píldoras de conceptos
      ctx.font = '600 13px "DM Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      nodes.forEach((n) => {
        const parallaxY = viewportOffset * (n.depth * 45);
        const curXRatio = n.baseXRatio + Math.sin(time + n.phase) * 0.04;
        const curYRatio = n.baseYRatio + Math.cos(time + n.phase * 0.8) * 0.04;
        const px = curXRatio * w;
        const py = curYRatio * h - parallaxY;

        const textMetrics = ctx.measureText(n.text);
        const padX = 14;
        const padY = 7;
        const boxW = textMetrics.width + padX * 2;
        const boxH = 26;

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(px - boxW / 2, py - boxH / 2, boxW, boxH, 13);
        ctx.fillStyle = n.highlight ? 'rgba(255, 255, 255, 0.98)' : 'rgba(4, 10, 22, 0.92)';
        ctx.strokeStyle = n.highlight ? '#ffffff' : themeColor;
        ctx.lineWidth = n.highlight ? 2.0 : 1.2;
        ctx.shadowColor = themeColor;
        ctx.shadowBlur = n.highlight ? 22 : 8;
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = n.highlight ? '#010306' : '#f0f6fc';
        ctx.fillText(n.text, px, py + 1);
      });

      requestAnimationFrame(draw);
    }
    draw();
  }

  // ==========================================================================
  // INICIALIZACIÓN DE LAS 10 EXPERIENCIAS GENERATIVAS DIFERENTES
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
