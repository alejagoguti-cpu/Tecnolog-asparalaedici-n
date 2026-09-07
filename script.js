/**
 * TECNOLOGÍAS DEL SECRETO — MOTOR VISUAL DRAMÁTICO & ENSAYO EN CÓDIGO
 * Arquitectura Enigmática Unificada:
 * 1. Haz de Escaneo Lumínico Cursor (#cursorGlow)
 * 2. Contador de Secretos Descifrados en HUD (#indicadorSecretos)
 * 3. Lienzo Ambiental Adaptativo (#ambientCanvas)
 * 4. Red Neural de Origen y Ruptura (#redOrigenCanvas)
 * 5. Telaraña Fractal de Anansi (#anansiWebCanvas)
 * 6. Semiesfera de Rayos de Fibra Óptica (#rayosCanvas)
 * 7. Espectrograma Cuántico Fluvial (#rioCanvas)
 * 8. Constelación Solar & Manifiesto de Libertad (#cierreCanvas)
 * 9. Desencriptación y Bloqueo de Nodos Reveladores (Click para fijar)
 * 10. Síntesis de Voz Neural (#voz)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. HAZ DE ESCANEO LUMÍNICO CURSOR (#cursorGlow)
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
  // 2. SISTEMA DE REVELACIÓN Y CONTADOR DE SECRETOS EN EL HUD
  // ==========================================================================
  const allNodes = document.querySelectorAll('nodo-revelador');
  const indicadorHUD = document.getElementById('indicadorSecretos');
  const discoveredNodes = new Set();

  function updateHUDCounter() {
    if (indicadorHUD) {
      const count = discoveredNodes.size;
      const total = allNodes.length;
      indicadorHUD.textContent = `PASA EL CURSOR POR LA RED PARA REVELAR EL TEXTO [${count}/${total} DESCIFRADOS]`;
      if (count === total) {
        indicadorHUD.textContent = `⚡ [${count}/${total}] TRANSMISIÓN TOTALMENTE DESCODIFICADA // TEXTO VIVO`;
        indicadorHUD.style.color = '#00f0ff';
        indicadorHUD.style.borderColor = 'rgba(0, 240, 255, 0.6)';
        indicadorHUD.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.4)';
      }
    }
  }

  allNodes.forEach((node, idx) => {
    // Permitir clic para fijar/desfijar la revelación
    node.addEventListener('click', () => {
      node.classList.toggle('fijado');
      discoveredNodes.add(idx);
      updateHUDCounter();
    });

    node.addEventListener('mouseenter', () => {
      discoveredNodes.add(idx);
      updateHUDCounter();
    });
  });

  // ==========================================================================
  // 3. LIENZO AMBIENTAL CROMÁTICO ADAPTATIVO (#ambientCanvas)
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
      '00': { r: 0, g: 240, b: 255 },    // Cyan Apertura
      '01': { r: 0, g: 240, b: 255 },    // Cyan Origen
      '02': { r: 168, g: 85, b: 247 },   // Violeta Anansi
      '03': { r: 255, g: 0, b: 127 },    // Magenta Angisa
      '04': { r: 0, g: 229, b: 255 },    // Turquesa Río
      '05': { r: 255, g: 184, b: 0 }     // Ámbar Cierre
    };

    let currentRGB = { r: 0, g: 240, b: 255 };
    let targetRGB = { r: 0, g: 240, b: 255 };

    const sections = document.querySelectorAll('saludo, origen, historias-anansi, panuelos-angisa, canciones-rio, cierre');

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const secId = entry.target.getAttribute('data-section') || '01';
          if (sectionThemes[secId]) {
            targetRGB = sectionThemes[secId];
          }
        }
      });
    }, { root: null, rootMargin: '-20% 0px -40% 0px', threshold: 0.2 });

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
  // 4. DIAGRAMA 1: RED DE ORIGEN Y FILAMENTOS (#redOrigenCanvas)
  // ==========================================================================
  const redOrigenCanvas = document.getElementById('redOrigenCanvas');
  if (redOrigenCanvas) {
    const ctx = redOrigenCanvas.getContext('2d');
    let time = 0;

    const backgroundNodes = Array.from({ length: 45 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
      size: Math.random() * 2 + 1,
      baseAlpha: Math.random() * 0.4 + 0.2
    }));

    function drawRedOrigen() {
      const rect = redOrigenCanvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width;
      const h = rect.height;

      if (redOrigenCanvas.width !== Math.floor(w * dpr) || redOrigenCanvas.height !== Math.floor(h * dpr)) {
        redOrigenCanvas.width = Math.floor(w * dpr);
        redOrigenCanvas.height = Math.floor(h * dpr);
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      const originNodes = [
        { x: w * 0.22, y: h * 0.28, color: '#00f0ff', label: 'ARTEFACTO' },
        { x: w * 0.50, y: h * 0.42, color: '#ff003c', label: 'ERROR' },
        { x: w * 0.78, y: h * 0.32, color: '#00f0ff', label: 'SURINAM' },
        { x: w * 0.30, y: h * 0.75, color: '#ff003c', label: 'VIGILANCIA' },
        { x: w * 0.70, y: h * 0.78, color: '#ffb800', label: 'MEMORIA' }
      ];

      const connections = [
        [0, 1], [1, 2], [0, 3], [3, 4], [2, 4], [1, 4]
      ];

      connections.forEach(([i, j]) => {
        const n1 = originNodes[i];
        const n2 = originNodes[j];
        const isAlert = n1.color === '#ff003c' || n2.color === '#ff003c';

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.strokeStyle = isAlert ? 'rgba(255, 0, 60, 0.35)' : 'rgba(0, 240, 255, 0.3)';
        ctx.lineWidth = isAlert ? 1.6 : 1.2;
        ctx.setLineDash([6, 6]);
        ctx.lineDashOffset = -time * 20;
        ctx.stroke();
        ctx.restore();

        const pulseT = ((time * 0.4 + (i + j) * 0.2) % 1);
        const px = n1.x + (n2.x - n1.x) * pulseT;
        const py = n1.y + (n2.y - n1.y) * pulseT;

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = isAlert ? '#ff003c' : '#ffffff';
        ctx.shadowColor = isAlert ? '#ff003c' : '#00f0ff';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      });

      backgroundNodes.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;

        const px = p.x * w;
        const py = p.y * h;

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${p.baseAlpha * 0.5})`;
        ctx.fill();
        ctx.restore();

        for (let j = idx + 1; j < backgroundNodes.length; j++) {
          const p2 = backgroundNodes[j];
          const p2x = p2.x * w;
          const p2y = p2.y * h;
          const dist = Math.hypot(px - p2x, py - p2y);
          if (dist < 80) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(p2x, p2y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - dist / 80) * 0.12})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
            ctx.restore();
          }
        }
      });

      originNodes.forEach((n, idx) => {
        const pulseR = 25 + Math.sin(time * 2 + idx) * 8;
        ctx.save();
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseR, 0, Math.PI * 2);
        ctx.strokeStyle = n.color === '#ff003c' ? 'rgba(255, 0, 60, 0.4)' : 'rgba(0, 240, 255, 0.25)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      });

      requestAnimationFrame(drawRedOrigen);
    }
    drawRedOrigen();
  }

  // ==========================================================================
  // 5. DIAGRAMA 2: TELARAÑA FRACTAL DE ANANSI (#anansiWebCanvas)
  // ==========================================================================
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
      const centerY = h * 0.22;
      const maxR = Math.min(w, h) * 0.6;
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

      const target1X = w * 0.25;
      const target1Y = h * 0.58;
      const target2X = w * 0.75;
      const target2Y = h * 0.58;

      [ { x: target1X, y: target1Y }, { x: target2X, y: target2Y } ].forEach((t) => {
        wctx.save();
        wctx.beginPath();
        wctx.moveTo(centerX, centerY);
        wctx.quadraticCurveTo((centerX + t.x) / 2 + Math.sin(webTime) * 15, (centerY + t.y) / 2, t.x, t.y);
        wctx.strokeStyle = 'rgba(217, 70, 239, 0.5)';
        wctx.lineWidth = 1.8;
        wctx.setLineDash([4, 4]);
        wctx.lineDashOffset = -webTime * 15;
        wctx.stroke();
        wctx.restore();
      });

      requestAnimationFrame(drawAnansiWeb);
    }
    drawAnansiWeb();
  }

  // ==========================================================================
  // 6. DIAGRAMA 3: SEMIESFERA DE RAYOS DE FIBRA ÓPTICA (#rayosCanvas)
  // ==========================================================================
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
      const originY = h * 0.18;
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

      const pliegueTargets = [
        { x: w * 0.22, y: h * 0.64, col: '#00f0ff' },
        { x: w * 0.50, y: h * 0.64, col: '#ff007f' },
        { x: w * 0.78, y: h * 0.64, col: '#ffb800' }
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

  // ==========================================================================
  // 7. DIAGRAMA 4: ESPECTROGRAMA CUÁNTICO FLUVIAL (#rioCanvas)
  // ==========================================================================
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

      const midY = h * 0.35;
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

      const n1 = { x: w * 0.30, y: h * 0.30 };
      const n2 = { x: w * 0.70, y: h * 0.30 };

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

  // ==========================================================================
  // 8. DIAGRAMA 5: CONSTELACIÓN SOLAR DE LA LIBERTAD (#cierreCanvas)
  // ==========================================================================
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
      const centerY = h * 0.25;
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
  // 9. SÍNTESIS DE VOZ Y TRANSMISIÓN DE AUDIO EN VIVO (#voz)
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
});
