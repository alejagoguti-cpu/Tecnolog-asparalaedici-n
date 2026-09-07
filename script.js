/**
 * TECNOLOGÍAS DEL SECRETO — MOTOR VISUAL DEL HILO CONDUCTOR & NARRATIVA CONTINUA
 * 
 * 1. Hilo Conductor Cuántico Continuo (#hiloConductorCanvas)
 * 2. Lienzo Ambiental Adaptativo (#ambientCanvas)
 * 3. Haz de Escaneo Lumínico (#cursorGlow)
 * 4. Rastreo de Tramos Editoriales & Contador de HUD (#indicadorSecretos)
 * 5. Telaraña Elástica de Anansi (#anansiWebCanvas)
 * 6. Rayos de Fibra Óptica Angisa (#rayosCanvas)
 * 7. Espectrograma Acústico Fluvial (#rioCanvas)
 * 8. Constelación Solar de Cierre (#cierreCanvas)
 * 9. Síntesis de Voz Neural (#voz)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. HAZ LUMÍNICO DEL CURSOR (#cursorGlow)
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

  function updateCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    if (cursorGlow) {
      cursorGlow.style.left = `${curX}px`;
      cursorGlow.style.top = `${curY}px`;
    }
    requestAnimationFrame(updateCursor);
  }
  updateCursor();

  // ==========================================================================
  // 2. HILO CONDUCTOR CUÁNTICO CONTINUO (#hiloConductorCanvas)
  // Conecta verticalmente todas las secciones con un filamento elástico vivo
  // ==========================================================================
  const spineContainer = document.getElementById('hiloConductorCanvas');
  if (spineContainer) {
    let canvas = spineContainer.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      spineContainer.appendChild(canvas);
    }
    const ctx = canvas.getContext('2d');
    let spineTime = 0;

    function resizeSpine() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.scale(dpr, dpr);
    }
    window.addEventListener('resize', resizeSpine);
    resizeSpine();

    function drawSpine() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        resizeSpine();
      }

      ctx.clearRect(0, 0, w, h);
      spineTime += 0.02;

      // Localizar todos los tramos o nodos visibles en la ventana
      const tramos = document.querySelectorAll('tramo-narrativo, emisor-central, despedida');
      const points = [];

      tramos.forEach((t) => {
        const r = t.getBoundingClientRect();
        // Solo considerar elementos cerca o dentro de la pantalla
        if (r.bottom > -200 && r.top < h + 200) {
          points.push({
            x: r.left + 20,
            y: r.top + r.height / 2
          });
        }
      });

      // Si hay al menos 2 puntos, dibujar la curva fluida continua
      if (points.length >= 2) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          const cx = (p1.x + p2.x) / 2 + Math.sin(spineTime * 1.5 + i) * 12;
          const cy = (p1.y + p2.y) / 2;

          // Influencia del cursor
          const distMouse = Math.hypot(curX - cx, curY - cy);
          const pull = Math.max(0, 1 - distMouse / 250) * 35;
          const pullX = (curX - cx) * (pull / 250);

          ctx.quadraticCurveTo(cx + pullX, cy, p2.x, p2.y);
        }

        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, 'rgba(0, 240, 255, 0.6)');
        grad.addColorStop(0.35, 'rgba(168, 85, 247, 0.6)');
        grad.addColorStop(0.65, 'rgba(255, 0, 127, 0.6)');
        grad.addColorStop(0.85, 'rgba(0, 229, 255, 0.6)');
        grad.addColorStop(1, 'rgba(255, 184, 0, 0.7)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 12;
        ctx.stroke();

        // Pulsos de luz cuánticos que viajan por el hilo
        points.forEach((p, idx) => {
          const pulseR = 4 + Math.sin(spineTime * 3 + idx) * 2;
          ctx.beginPath();
          ctx.arc(p.x, p.y, pulseR, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 15;
          ctx.fill();
        });

        ctx.restore();
      }

      requestAnimationFrame(drawSpine);
    }
    drawSpine();
  }

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
      '00': { r: 0, g: 240, b: 255 },    // Cyan
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

      const orb1X = w * (0.3 + Math.sin(time * 0.25) * 0.12);
      const orb1Y = h * (0.35 + Math.cos(time * 0.2) * 0.1 - scrollProgress * 0.15);
      const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 40, orb1X, orb1Y, w * 0.55);
      grad1.addColorStop(0, `rgba(${Math.round(currentRGB.r)}, ${Math.round(currentRGB.g)}, ${Math.round(currentRGB.b)}, 0.15)`);
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);

      const orb2X = w * (0.75 - Math.sin(time * 0.3) * 0.15);
      const orb2Y = h * (0.65 + Math.sin(time * 0.35) * 0.12);
      const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 50, orb2X, orb2Y, w * 0.5);
      grad2.addColorStop(0, `rgba(${Math.round(255 - currentRGB.r * 0.2)}, ${Math.round(currentRGB.g * 0.4)}, ${Math.round(255 - currentRGB.b * 0.1)}, 0.09)`);
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      time += 0.015;
      requestAnimationFrame(drawAmbient);
    }
    drawAmbient();
  }

  // ==========================================================================
  // 4. RASTREO DE TRAMOS Y CONTADOR DE SECRETOS EN EL HUD
  // ==========================================================================
  const tramos = document.querySelectorAll('tramo-narrativo');
  const indicadorHUD = document.getElementById('indicadorSecretos');
  const discoveredTramos = new Set();

  function updateHUDCounter() {
    if (indicadorHUD) {
      const count = discoveredTramos.size;
      const total = tramos.length;
      indicadorHUD.textContent = `HILO CONDUCTOR // DESCIFRANDO EL ENSAYO [${count}/${total}]`;
      if (count === total) {
        indicadorHUD.textContent = `⚡ [${count}/${total}] TRANSMISIÓN TOTALMENTE DESCODIFICADA // HISTORIA VIVA`;
        indicadorHUD.style.color = '#00f0ff';
        indicadorHUD.style.textShadow = '0 0 15px rgba(0, 240, 255, 0.7)';
      }
    }
  }

  const tramoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('activo');
        tramos.forEach((t, i) => {
          if (t === entry.target) {
            discoveredTramos.add(i);
            updateHUDCounter();
          }
        });
      }
    });
  }, { root: null, rootMargin: '-10% 0px -20% 0px', threshold: 0.3 });

  tramos.forEach((t) => {
    tramoObserver.observe(t);
    t.addEventListener('mouseenter', () => {
      tramos.forEach((elem, i) => {
        if (elem === t) {
          discoveredTramos.add(i);
          updateHUDCounter();
        }
      });
    });
  });

  // ==========================================================================
  // 5. TELARAÑA ELÁSTICA DE ANANSI (#anansiWebCanvas)
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

      const centerX = w * 0.82;
      const centerY = h * 0.35;
      const maxR = Math.min(w, h) * 0.55;
      const spokes = 9;
      const rings = 6;

      // Radios
      wctx.save();
      wctx.beginPath();
      for (let i = 0; i < spokes; i++) {
        const angle = (i * 2 * Math.PI) / spokes + Math.sin(webTime * 0.3) * 0.04;
        wctx.moveTo(centerX, centerY);
        wctx.lineTo(centerX + Math.cos(angle) * maxR, centerY + Math.sin(angle) * maxR);
      }
      wctx.strokeStyle = 'rgba(168, 85, 247, 0.25)';
      wctx.lineWidth = 1.2;
      wctx.stroke();
      wctx.restore();

      // Anillos espirales
      for (let r = 1; r <= rings; r++) {
        const ringR = (maxR / rings) * r;
        wctx.save();
        wctx.beginPath();
        for (let i = 0; i <= spokes; i++) {
          const angle = (i * 2 * Math.PI) / spokes + Math.sin(webTime * 0.3) * 0.04;
          const wobble = Math.sin(webTime * 2 + r + i) * 3.5;
          const x = centerX + Math.cos(angle) * (ringR + wobble);
          const y = centerY + Math.sin(angle) * (ringR + wobble);
          if (i === 0) wctx.moveTo(x, y);
          else wctx.lineTo(x, y);
        }
        wctx.strokeStyle = `rgba(168, 85, 247, ${0.15 + (r / rings) * 0.3})`;
        wctx.lineWidth = 1.4;
        wctx.shadowColor = '#d946ef';
        wctx.shadowBlur = 8;
        wctx.stroke();
        wctx.restore();
      }

      requestAnimationFrame(drawAnansiWeb);
    }
    drawAnansiWeb();
  }

  // ==========================================================================
  // 6. RAYOS DE FIBRA ÓPTICA ANGISAS (#rayosCanvas)
  // ==========================================================================
  const rayosCanvas = document.getElementById('rayosCanvas');
  if (rayosCanvas) {
    const rctx = rayosCanvas.getContext('2d');
    let rayTime = 0;
    const numRays = 50;

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

      const originX = w * 0.15;
      const originY = h * 0.45;
      const maxRadius = Math.min(w, h) * 0.65;

      for (let i = 0; i < numRays; i++) {
        const fraction = i / (numRays - 1);
        const angle = -Math.PI * 0.4 + fraction * Math.PI * 0.8;
        const wave = Math.sin(rayTime * 1.5 + i * 0.2) * 0.03;
        const finalAngle = angle + wave;

        const rayLength = maxRadius * (0.65 + Math.sin(rayTime * 2 + i * 0.25) * 0.15);
        const endX = originX + Math.cos(finalAngle) * rayLength;
        const endY = originY + Math.sin(finalAngle) * rayLength;

        rctx.save();
        rctx.beginPath();
        rctx.moveTo(originX, originY);
        rctx.lineTo(endX, endY);
        const alpha = 0.12 + Math.sin(rayTime + i) * 0.1;
        rctx.strokeStyle = i % 2 === 0 ? `rgba(0, 240, 255, ${alpha})` : `rgba(255, 0, 127, ${alpha})`;
        rctx.lineWidth = 1.1;
        rctx.stroke();
        rctx.restore();
      }

      requestAnimationFrame(drawFiberRays);
    }
    drawFiberRays();
  }

  // ==========================================================================
  // 7. ESPECTROGRAMA ACÚSTICO FLUVIAL (#rioCanvas)
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

      const midY = h * 0.5;
      const streamGrad = ctx.createLinearGradient(0, 0, w, 0);
      streamGrad.addColorStop(0.0, '#00e5ff');
      streamGrad.addColorStop(0.5, '#38bdf8');
      streamGrad.addColorStop(1.0, '#ffb800');

      function getWave(x, phase, amplitude) {
        const normX = x / w;
        const env = Math.sin(normX * Math.PI);
        const w1 = Math.sin(normX * 7 + time * 1.8 + phase) * (h * 0.12 * amplitude);
        const w2 = Math.cos(normX * 12 - time * 1.1) * (h * 0.05 * amplitude);
        return midY + (w1 + w2) * env;
      }

      ctx.save();
      ctx.beginPath();
      for (let x = 0; x <= w; x += 4) {
        const y = getWave(x, 0, 1.0);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = streamGrad;
      ctx.lineWidth = 2.4;
      ctx.shadowColor = 'rgba(0, 229, 255, 0.8)';
      ctx.shadowBlur = 14;
      ctx.stroke();
      ctx.restore();

      requestAnimationFrame(drawRio);
    }
    drawRio();
  }

  // ==========================================================================
  // 8. CONSTELACIÓN SOLAR DE CIERRE (#cierreCanvas)
  // ==========================================================================
  const cierreCanvas = document.getElementById('cierreCanvas');
  if (cierreCanvas) {
    const ctx = cierreCanvas.getContext('2d');
    let time = 0;

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
      const centerY = h * 0.3;

      const solarGlow = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, w * 0.45);
      solarGlow.addColorStop(0, 'rgba(255, 184, 0, 0.2)');
      solarGlow.addColorStop(0.6, 'rgba(255, 0, 127, 0.06)');
      solarGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = solarGlow;
      ctx.fillRect(0, 0, w, h);

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
