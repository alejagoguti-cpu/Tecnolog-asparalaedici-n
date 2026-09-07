/**
 * ==========================================================================
 * TECNOLOGÍAS DEL SECRETO — MOTOR VISUAL E INTERACTIVO EN 10 MÓDULOS
 * Ensayo interactivo de revelación progresiva y semántica editorial limpia.
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
  // 2. INTERACCIÓN CON LOS NODOS CONCEPTUALES (<nodo-concepto>)
  // ==========================================================================
  const allConceptNodes = document.querySelectorAll('nodo-concepto');

  allConceptNodes.forEach((node) => {
    // Permitir clic para fijar o desfijar la tarjeta de texto revelado
    node.addEventListener('click', (e) => {
      // Si el clic fue dentro de un enlace o botón de audio, no togglear el nodo
      if (e.target.closest('reproductor-voz')) return;
      node.classList.toggle('fijado');
    });

    // Accesibilidad por teclado
    const boton = node.querySelector('nodo-boton');
    if (boton) {
      boton.setAttribute('tabindex', '0');
      boton.setAttribute('role', 'button');
      boton.setAttribute('aria-expanded', 'false');

      boton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          node.classList.toggle('fijado');
          boton.setAttribute('aria-expanded', node.classList.contains('fijado') ? 'true' : 'false');
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
      '01': { r: 0, g: 240, b: 255 },    // Mod 01: Artefacto (Cyan)
      '02': { r: 0, g: 229, b: 255 },    // Mod 02: Comunidad (Turquesa)
      '03': { r: 244, g: 63, b: 94 },    // Mod 03: Vigilancia (Rojo carmesí)
      '04': { r: 255, g: 184, b: 0 },    // Mod 04: Memoria (Ámbar)
      '05': { r: 0, g: 240, b: 255 },    // Mod 05: Traducción digital (Cyan)
      '06': { r: 168, g: 85, b: 247 },   // Mod 06: Anansi (Violeta)
      '07': { r: 192, g: 132, b: 252 },  // Mod 07: Capas ocultas (Púrpura)
      '08': { r: 255, g: 0, b: 127 },    // Mod 08: Angisas (Magenta)
      '09': { r: 0, g: 229, b: 255 },    // Mod 09: Río (Turquesa fluvial)
      '10': { r: 255, g: 184, b: 0 }     // Mod 10: Reflexión y libertad (Dorado solar)
    };

    let currentRGB = { r: 0, g: 240, b: 255 };
    let targetRGB = { r: 0, g: 240, b: 255 };

    const sections = document.querySelectorAll(
      'saludo, modulo-artefacto, modulo-comunidad, modulo-vigilancia, modulo-memoria, modulo-intencion, modulo-anansi, modulo-capas, modulo-angisas, modulo-rio, modulo-reflexion'
    );

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const secId = entry.target.getAttribute('data-section') || '00';
          if (sectionThemes[secId]) {
            targetRGB = sectionThemes[secId];
          }
        }
      });
    }, { root: null, rootMargin: '-20% 0px -40% 0px', threshold: 0.15 });

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

      // Interpolación suave del color cromático
      currentRGB.r += (targetRGB.r - currentRGB.r) * 0.04;
      currentRGB.g += (targetRGB.g - currentRGB.g) * 0.04;
      currentRGB.b += (targetRGB.b - currentRGB.b) * 0.04;

      const docHeight = document.documentElement.scrollHeight - window.innerHeight || 1;
      const scrollProgress = Math.min(1, Math.max(0, scrollY / docHeight));

      const orb1X = w * (0.25 + Math.sin(time * 0.3) * 0.1);
      const orb1Y = h * (0.3 + Math.cos(time * 0.25) * 0.1 - scrollProgress * 0.15);
      const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 30, orb1X, orb1Y, w * 0.55);
      grad1.addColorStop(0, `rgba(${Math.round(currentRGB.r)}, ${Math.round(currentRGB.g)}, ${Math.round(currentRGB.b)}, 0.14)`);
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);

      const orb2X = w * (0.8 - Math.sin(time * 0.35) * 0.12);
      const orb2Y = h * (0.65 + Math.sin(time * 0.4) * 0.1);
      const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 40, orb2X, orb2Y, w * 0.48);
      grad2.addColorStop(0, `rgba(${Math.round(255 - currentRGB.r * 0.2)}, ${Math.round(currentRGB.g * 0.4)}, ${Math.round(255 - currentRGB.b * 0.1)}, 0.08)`);
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      time += 0.015;
      requestAnimationFrame(drawAmbient);
    }
    drawAmbient();
  }

  // ==========================================================================
  // 4. CANVASES DE LOS 10 MÓDULOS DIAGRAMÁTICOS
  // ==========================================================================

  // --- MÓDULO 01: ESCANEO DE ARTEFACTO (#canvasModulo01) ---
  const canvas01 = document.getElementById('canvasModulo01');
  if (canvas01) {
    const ctx = canvas01.getContext('2d');
    let t = 0;
    function draw01() {
      const rect = canvas01.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width, h = rect.height;
      if (canvas01.width !== Math.floor(w * dpr) || canvas01.height !== Math.floor(h * dpr)) {
        canvas01.width = Math.floor(w * dpr);
        canvas01.height = Math.floor(h * dpr);
        ctx.scale(dpr, dpr);
      }
      ctx.clearRect(0, 0, w, h);
      t += 0.02;

      const cx = w * 0.5, cy = h * 0.5;
      for (let r = 50; r <= 180; r += 35) {
        ctx.beginPath();
        ctx.arc(cx, cy, r + Math.sin(t * 1.5 + r) * 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 + 0.15 * Math.sin(t + r)})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      requestAnimationFrame(draw01);
    }
    draw01();
  }

  // --- MÓDULO 02: RED COMUNITARIA DE SURINAM (#canvasModulo02) ---
  const canvas02 = document.getElementById('canvasModulo02');
  if (canvas02) {
    const ctx = canvas02.getContext('2d');
    const pts = Array.from({ length: 22 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0012,
      vy: (Math.random() - 0.5) * 0.0012
    }));
    function draw02() {
      const rect = canvas02.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width, h = rect.height;
      if (canvas02.width !== Math.floor(w * dpr) || canvas02.height !== Math.floor(h * dpr)) {
        canvas02.width = Math.floor(w * dpr);
        canvas02.height = Math.floor(h * dpr);
        ctx.scale(dpr, dpr);
      }
      ctx.clearRect(0, 0, w, h);

      pts.forEach((p, idx) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0.05) p.x = 0.95; if (p.x > 0.95) p.x = 0.05;
        if (p.y < 0.05) p.y = 0.95; if (p.y > 0.95) p.y = 0.05;

        const px = p.x * w, py = p.y * h;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 255, 0.75)';
        ctx.fill();

        for (let j = idx + 1; j < pts.length; j++) {
          const p2 = pts[j];
          const dist = Math.hypot(px - p2.x * w, py - p2.y * h);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(p2.x * w, p2.y * h);
            ctx.strokeStyle = `rgba(0, 229, 255, ${(1 - dist / 130) * 0.28})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw02);
    }
    draw02();
  }

  // --- MÓDULO 03: RADAR DE VIGILANCIA COLONIAL (#canvasModulo03) ---
  const canvas03 = document.getElementById('canvasModulo03');
  if (canvas03) {
    const ctx = canvas03.getContext('2d');
    let angle = 0;
    function draw03() {
      const rect = canvas03.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width, h = rect.height;
      if (canvas03.width !== Math.floor(w * dpr) || canvas03.height !== Math.floor(h * dpr)) {
        canvas03.width = Math.floor(w * dpr);
        canvas03.height = Math.floor(h * dpr);
        ctx.scale(dpr, dpr);
      }
      ctx.clearRect(0, 0, w, h);
      angle += 0.025;

      const cx = w * 0.5, cy = h * 0.5;
      const radius = Math.min(w, h) * 0.45;

      for (let r = 1; r <= 3; r++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (radius / 3) * r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.18)';
        ctx.stroke();
      }

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, angle, angle + 0.45);
      ctx.closePath();
      const sweepGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
      sweepGrad.addColorStop(0, 'rgba(244, 63, 94, 0.35)');
      sweepGrad.addColorStop(1, 'rgba(244, 63, 94, 0.0)');
      ctx.fillStyle = sweepGrad;
      ctx.fill();
      ctx.restore();

      requestAnimationFrame(draw03);
    }
    draw03();
  }

  // --- MÓDULO 04: CONSTELACIÓN DE MEMORIA VIVA (#canvasModulo04) ---
  const canvas04 = document.getElementById('canvasModulo04');
  if (canvas04) {
    const ctx = canvas04.getContext('2d');
    let t = 0;
    const stars = Array.from({ length: 32 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 2 + 1,
      phase: Math.random() * Math.PI * 2
    }));
    function draw04() {
      const rect = canvas04.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width, h = rect.height;
      if (canvas04.width !== Math.floor(w * dpr) || canvas04.height !== Math.floor(h * dpr)) {
        canvas04.width = Math.floor(w * dpr);
        canvas04.height = Math.floor(h * dpr);
        ctx.scale(dpr, dpr);
      }
      ctx.clearRect(0, 0, w, h);
      t += 0.02;

      stars.forEach((s) => {
        const px = s.x * w, py = s.y * h;
        const alpha = 0.3 + 0.5 * Math.sin(t + s.phase);
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 184, 0, ${alpha})`;
        ctx.shadowColor = '#ffb800';
        ctx.shadowBlur = 8;
        ctx.fill();
      });
      ctx.shadowBlur = 0;
      requestAnimationFrame(draw04);
    }
    draw04();
  }

  // --- MÓDULO 05: TRADUCCIÓN DIGITAL Y MATRIZ (#canvasModulo05) ---
  const canvas05 = document.getElementById('canvasModulo05');
  if (canvas05) {
    const ctx = canvas05.getContext('2d');
    let t = 0;
    function draw05() {
      const rect = canvas05.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width, h = rect.height;
      if (canvas05.width !== Math.floor(w * dpr) || canvas05.height !== Math.floor(h * dpr)) {
        canvas05.width = Math.floor(w * dpr);
        canvas05.height = Math.floor(h * dpr);
        ctx.scale(dpr, dpr);
      }
      ctx.clearRect(0, 0, w, h);
      t += 0.018;

      const cx = w * 0.5, cy = h * 0.5;
      const step = 40;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
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

      // Cuadrados pulsantes
      const count = 4;
      for (let i = 1; i <= count; i++) {
        const size = i * 45 + Math.sin(t * 1.5 + i) * 6;
        ctx.beginPath();
        ctx.rect(cx - size / 2, cy - size / 2, size, size);
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 + 0.12 * Math.sin(t + i)})`;
        ctx.stroke();
      }

      requestAnimationFrame(draw05);
    }
    draw05();
  }

  // --- MÓDULO 06: TELARAÑA FRACTAL DE ANANSI (#anansiWebCanvas) ---
  const webCanvas = document.getElementById('anansiWebCanvas');
  if (webCanvas) {
    const wctx = webCanvas.getContext('2d');
    let webTime = 0;

    function drawAnansiWeb() {
      const rect = webCanvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width;
      const h = rect.height;

      if (webCanvas.width !== Math.floor(w * dpr) || webCanvas.height !== Math.floor(h * dpr)) {
        webCanvas.width = Math.floor(w * dpr);
        webCanvas.height = Math.floor(h * dpr);
        wctx.scale(dpr, dpr);
      }

      wctx.clearRect(0, 0, w, h);
      webTime += 0.015;

      const centerX = w * 0.5;
      const centerY = h * 0.28;
      const maxR = Math.min(w, h) * 0.55;
      const spokes = 10;
      const rings = 6;

      wctx.save();
      wctx.beginPath();
      for (let i = 0; i < spokes; i++) {
        const angle = (i * 2 * Math.PI) / spokes + Math.sin(webTime * 0.3) * 0.05;
        wctx.moveTo(centerX, centerY);
        wctx.lineTo(centerX + Math.cos(angle) * maxR, centerY + Math.sin(angle) * maxR);
      }
      wctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
      wctx.lineWidth = 1.2;
      wctx.stroke();
      wctx.restore();

      for (let r = 1; r <= rings; r++) {
        const ringR = (maxR / rings) * r;
        wctx.save();
        wctx.beginPath();
        for (let i = 0; i <= spokes; i++) {
          const angle = (i * 2 * Math.PI) / spokes + Math.sin(webTime * 0.3) * 0.05;
          const wobble = Math.sin(webTime * 2 + r + i) * 4;
          const x = centerX + Math.cos(angle) * (ringR + wobble);
          const y = centerY + Math.sin(angle) * (ringR + wobble);
          if (i === 0) wctx.moveTo(x, y);
          else wctx.lineTo(x, y);
        }
        wctx.strokeStyle = `rgba(168, 85, 247, ${0.2 + (r / rings) * 0.35})`;
        wctx.lineWidth = 1.4;
        wctx.shadowColor = '#d946ef';
        wctx.shadowBlur = 10;
        wctx.stroke();
        wctx.restore();
      }

      requestAnimationFrame(drawAnansiWeb);
    }
    drawAnansiWeb();
  }

  // --- MÓDULO 07: MATRIZ DE LA SEGUNDA CAPA OCULTA (#canvasModulo07) ---
  const canvas07 = document.getElementById('canvasModulo07');
  if (canvas07) {
    const ctx = canvas07.getContext('2d');
    let t = 0;
    const glyphs = ['⚿', '⟐', '✦', '⎈', '≋', '⎔', '∿', '0', '1'];
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random(),
      y: Math.random(),
      char: glyphs[Math.floor(Math.random() * glyphs.length)],
      speed: Math.random() * 0.001 + 0.0005,
      alpha: Math.random() * 0.5 + 0.2
    }));

    function draw07() {
      const rect = canvas07.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width, h = rect.height;
      if (canvas07.width !== Math.floor(w * dpr) || canvas07.height !== Math.floor(h * dpr)) {
        canvas07.width = Math.floor(w * dpr);
        canvas07.height = Math.floor(h * dpr);
        ctx.scale(dpr, dpr);
      }
      ctx.clearRect(0, 0, w, h);
      t += 0.015;

      ctx.font = '13px monospace';
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) p.y = 1;
        ctx.fillStyle = `rgba(192, 132, 252, ${p.alpha * (0.6 + 0.4 * Math.sin(t * 2))})`;
        ctx.fillText(p.char, p.x * w, p.y * h);
      });

      requestAnimationFrame(draw07);
    }
    draw07();
  }

  // --- MÓDULO 08: SEMIESFERA DE RAYOS TEXTILES DE ANGISAS (#rayosCanvas) ---
  const rayosCanvas = document.getElementById('rayosCanvas');
  if (rayosCanvas) {
    const rctx = rayosCanvas.getContext('2d');
    let rayTime = 0;
    const numRays = 64;

    function drawFiberRays() {
      const rect = rayosCanvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width;
      const h = rect.height;

      if (rayosCanvas.width !== Math.floor(w * dpr) || rayosCanvas.height !== Math.floor(h * dpr)) {
        rayosCanvas.width = Math.floor(w * dpr);
        rayosCanvas.height = Math.floor(h * dpr);
        rctx.scale(dpr, dpr);
      }

      rctx.clearRect(0, 0, w, h);
      rayTime += 0.016;

      const originX = w * 0.5;
      const originY = h * 0.22;
      const maxRadius = Math.min(w, h) * 0.75;

      for (let i = 0; i < numRays; i++) {
        const fraction = i / (numRays - 1);
        const angle = Math.PI * 0.1 + fraction * Math.PI * 0.8;
        const wave = Math.sin(rayTime * 1.6 + i * 0.2) * 0.03;
        const finalAngle = angle + wave;

        const rayLength = maxRadius * (0.65 + Math.sin(rayTime * 2 + i * 0.25) * 0.15);
        const endX = originX + Math.cos(finalAngle) * rayLength;
        const endY = originY + Math.sin(finalAngle) * rayLength;

        rctx.save();
        rctx.beginPath();
        rctx.moveTo(originX, originY);
        rctx.lineTo(endX, endY);
        const alpha = 0.15 + Math.sin(rayTime + i) * 0.12;
        rctx.strokeStyle = i % 2 === 0 ? `rgba(0, 240, 255, ${alpha})` : `rgba(255, 0, 127, ${alpha})`;
        rctx.lineWidth = 1.1;
        rctx.stroke();
        rctx.restore();

        const dotT = ((rayTime * 0.25 + i * 0.04) % 1);
        const dotX = originX + Math.cos(finalAngle) * (rayLength * dotT);
        const dotY = originY + Math.sin(finalAngle) * (rayLength * dotT);

        rctx.save();
        rctx.beginPath();
        rctx.arc(dotX, dotY, 1.4, 0, Math.PI * 2);
        rctx.fillStyle = i % 2 === 0 ? 'rgba(0, 240, 255, 0.8)' : 'rgba(255, 0, 127, 0.8)';
        rctx.fill();
        rctx.restore();
      }

      // Hilos conectores hacia los 3 pliegues inferiores
      const pliegueTargets = [
        { x: w * 0.22, y: h * 0.68, col: '#00f0ff' },
        { x: w * 0.50, y: h * 0.68, col: '#ff007f' },
        { x: w * 0.78, y: h * 0.68, col: '#ffb800' }
      ];

      pliegueTargets.forEach((p) => {
        rctx.save();
        rctx.beginPath();
        rctx.moveTo(originX, originY);
        rctx.lineTo(p.x, p.y);
        rctx.strokeStyle = p.col;
        rctx.lineWidth = 1.5;
        rctx.setLineDash([5, 5]);
        rctx.lineDashOffset = -rayTime * 20;
        rctx.stroke();
        rctx.restore();
      });

      requestAnimationFrame(drawFiberRays);
    }
    drawFiberRays();
  }

  // --- MÓDULO 09: ESPECTROGRAMA FLUVIAL DEL RÍO (#rioCanvas) ---
  const rioCanvas = document.getElementById('rioCanvas');
  if (rioCanvas) {
    const ctx = rioCanvas.getContext('2d');
    let time = 0;

    function drawRio() {
      const rect = rioCanvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width;
      const h = rect.height;

      if (rioCanvas.width !== Math.floor(w * dpr) || rioCanvas.height !== Math.floor(h * dpr)) {
        rioCanvas.width = Math.floor(w * dpr);
        rioCanvas.height = Math.floor(h * dpr);
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, w, h);
      time += 0.02;

      const midY = h * 0.4;
      const streamGrad = ctx.createLinearGradient(0, 0, w, 0);
      streamGrad.addColorStop(0.0, '#00e5ff');
      streamGrad.addColorStop(0.4, '#38bdf8');
      streamGrad.addColorStop(0.7, '#a855f7');
      streamGrad.addColorStop(1.0, '#ffb800');

      function getWave(x, phase, amplitude) {
        const normX = x / w;
        const env = Math.sin(normX * Math.PI);
        const w1 = Math.sin(normX * 8 + time * 2.0 + phase) * (h * 0.15 * amplitude);
        const w2 = Math.cos(normX * 14 - time * 1.2) * (h * 0.06 * amplitude);
        const w3 = Math.sin(normX * 22 + time * 2.5) * (h * 0.02 * amplitude);
        return midY + (w1 + w2 + w3) * env;
      }

      ctx.save();
      ctx.beginPath();
      for (let x = 0; x <= w; x += 4) {
        const y = getWave(x, 0, 1.0);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = streamGrad;
      ctx.lineWidth = 2.8;
      ctx.shadowColor = 'rgba(0, 229, 255, 0.8)';
      ctx.shadowBlur = 16;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      for (let x = 0; x <= w; x += 4) {
        const y = getWave(x, Math.PI * 0.7, -0.75);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.7)';
      ctx.lineWidth = 1.6;
      ctx.shadowColor = 'rgba(168, 85, 247, 0.6)';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.restore();

      const n1 = { x: w * 0.32, y: h * 0.40 };
      const n2 = { x: w * 0.68, y: h * 0.40 };

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(n1.x, n1.y);
      ctx.lineTo(n2.x, n2.y);
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.35)';
      ctx.setLineDash([4, 4]);
      ctx.lineDashOffset = -time * 15;
      ctx.stroke();
      ctx.restore();

      requestAnimationFrame(drawRio);
    }
    drawRio();
  }

  // --- MÓDULO 10: CONSTELACIÓN SOLAR DE LA LIBERTAD (#cierreCanvas) ---
  const cierreCanvas = document.getElementById('cierreCanvas');
  if (cierreCanvas) {
    const ctx = cierreCanvas.getContext('2d');
    let time = 0;
    const numSolarRays = 48;

    function drawCierre() {
      const rect = cierreCanvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width;
      const h = rect.height;

      if (cierreCanvas.width !== Math.floor(w * dpr) || cierreCanvas.height !== Math.floor(h * dpr)) {
        cierreCanvas.width = Math.floor(w * dpr);
        cierreCanvas.height = Math.floor(h * dpr);
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, w, h);
      time += 0.012;

      const centerX = w * 0.5;
      const centerY = h * 0.28;
      const bottomY = h * 0.80;

      const solarGlow = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, w * 0.4);
      solarGlow.addColorStop(0, 'rgba(255, 184, 0, 0.22)');
      solarGlow.addColorStop(0.6, 'rgba(255, 0, 127, 0.08)');
      solarGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = solarGlow;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < numSolarRays; i++) {
        const angle = (i * 2 * Math.PI) / numSolarRays + time * 0.15;
        const length = 120 + Math.sin(time * 3 + i * 0.5) * 35;
        const ex = centerX + Math.cos(angle) * length;
        const ey = centerY + Math.sin(angle) * length;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = `rgba(255, 184, 0, ${0.12 + Math.sin(time + i) * 0.08})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();
        ctx.restore();
      }

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX, bottomY);
      ctx.strokeStyle = 'rgba(255, 184, 0, 0.45)';
      ctx.lineWidth = 2.0;
      ctx.setLineDash([8, 6]);
      ctx.lineDashOffset = -time * 25;
      ctx.shadowColor = '#ffb800';
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.restore();

      requestAnimationFrame(drawCierre);
    }
    drawCierre();
  }

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
});

