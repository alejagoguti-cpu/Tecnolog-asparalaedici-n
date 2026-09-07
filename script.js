/**
 * TECNOLOGÍAS DEL SECRETO — MOTOR VISUAL DRAMÁTICO & ENSAYO EN CÓDIGO
 * Arquitectura Widescreen (100vw):
 * 1. Lienzo Ambiental Adaptativo Multicromático (#ambientCanvas)
 * 2. Globo 3D de Partículas de Red Comunitaria (#comunidadCanvas - Ref. 5)
 * 3. Telaraña Geométrica Cuántica de Anansi (#anansiWebCanvas)
 * 4. Semiesfera de Rayos de Fibra Óptica (#rayosCanvas - Ref. 4 "um estado de transição")
 * 5. Espectrograma Cuántico Fluvial Hidro-Acústico (#rio)
 * 6. HUD de Navegación Lateral y Física 3D de Pliegues Cinéticos
 * 7. Síntesis de Voz Neural en Tiempo Real (#voz)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. LIENZO AMBIENTAL CROMÁTICO ADAPTATIVO (FONDO DE LUZ GLOBAL)
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
    const navItems = document.querySelectorAll('nav-lateral item-nav');

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const secId = entry.target.getAttribute('data-section') || '01';
          if (sectionThemes[secId]) {
            targetRGB = sectionThemes[secId];
          }

          // Actualizar indicador en HUD lateral
          navItems.forEach((item) => {
            if (item.getAttribute('data-target') === entry.target.id) {
              item.classList.add('activo');
            } else {
              item.classList.remove('activo');
            }
          });
        }
      });
    }, { root: null, rootMargin: '-20% 0px -40% 0px', threshold: 0.2 });

    sections.forEach((sec) => sectionObserver.observe(sec));

    // Smooth scroll en HUD lateral
    navItems.forEach((item) => {
      item.addEventListener('click', () => {
        const targetId = item.getAttribute('data-target');
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

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
      grad1.addColorStop(0, `rgba(${Math.round(currentRGB.r)}, ${Math.round(currentRGB.g)}, ${Math.round(currentRGB.b)}, 0.16)`);
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);

      const orb2X = w * (0.8 - Math.sin(time * 0.35) * 0.12);
      const orb2Y = h * (0.65 + Math.sin(time * 0.4) * 0.1);
      const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 40, orb2X, orb2Y, w * 0.48);
      grad2.addColorStop(0, `rgba(${Math.round(255 - currentRGB.r * 0.2)}, ${Math.round(currentRGB.g * 0.4)}, ${Math.round(255 - currentRGB.b * 0.1)}, 0.1)`);
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      time += 0.015;
      requestAnimationFrame(drawAmbient);
    }
    drawAmbient();
  }

  // ==========================================================================
  // 2. GLOBO 3D DE PARTÍCULAS - RED COMUNITARIA (<red-comunidad-3d> - Ref. 5)
  // ==========================================================================
  const comCanvas = document.getElementById('comunidadCanvas');
  if (comCanvas) {
    const cctx = comCanvas.getContext('2d');
    let rotY = 0;
    let rotX = 0.2;
    const numParticles = 240;
    const sphereParticles = [];

    // Distribución esférica de Fibonacci
    for (let i = 0; i < numParticles; i++) {
      const phi = Math.acos(-1 + (2 * i) / numParticles);
      const theta = Math.sqrt(numParticles * Math.PI) * phi;
      sphereParticles.push({
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
        size: Math.random() * 1.8 + 1.2,
        brightness: Math.random() * 0.5 + 0.5
      });
    }

    function draw3DSphere() {
      const rect = comCanvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width;
      const h = rect.height;

      if (comCanvas.width !== Math.floor(w * dpr) || comCanvas.height !== Math.floor(h * dpr)) {
        comCanvas.width = Math.floor(w * dpr);
        comCanvas.height = Math.floor(h * dpr);
        cctx.scale(dpr, dpr);
      }

      cctx.clearRect(0, 0, w, h);
      rotY += 0.008;

      const radius = Math.min(w, h) * 0.38;
      const centerX = w / 2;
      const centerY = h / 2;
      const projected = [];

      sphereParticles.forEach((p) => {
        // Rotación en Y
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // Rotación en X
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        const fov = 300;
        const scale = fov / (fov + z2 * radius);
        projected.push({
          px: centerX + x1 * radius * scale,
          py: centerY + y2 * radius * scale,
          depth: z2,
          scale: scale,
          size: p.size * scale,
          alpha: Math.max(0.15, (z2 + 1) * 0.45 * p.brightness)
        });
      });

      // Ordenar por profundidad (Z-buffering)
      projected.sort((a, b) => a.depth - b.depth);

      // Filamentos de conexión en nodos frontales
      cctx.beginPath();
      for (let i = 0; i < projected.length; i++) {
        if (projected[i].depth < -0.2) continue;
        for (let j = i + 1; j < projected.length; j++) {
          if (projected[j].depth < -0.2) continue;
          const dx = projected[i].px - projected[j].px;
          const dy = projected[i].py - projected[j].py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 42) {
            const filamentAlpha = (1 - dist / 42) * 0.28 * projected[i].alpha;
            cctx.strokeStyle = `rgba(0, 240, 255, ${filamentAlpha})`;
            cctx.lineWidth = 0.8;
            cctx.moveTo(projected[i].px, projected[i].py);
            cctx.lineTo(projected[j].px, projected[j].py);
          }
        }
      }
      cctx.stroke();

      // Partículas luminosas
      projected.forEach((p) => {
        cctx.save();
        cctx.beginPath();
        cctx.arc(p.px, p.py, Math.max(1, p.size), 0, Math.PI * 2);
        cctx.fillStyle = p.depth > 0.2 ? '#ffffff' : `rgba(0, 240, 255, ${p.alpha})`;
        if (p.depth > 0) {
          cctx.shadowColor = '#00f0ff';
          cctx.shadowBlur = 10 * p.scale;
        }
        cctx.fill();
        cctx.restore();
      });

      requestAnimationFrame(draw3DSphere);
    }
    draw3DSphere();
  }

  // ==========================================================================
  // 3. TELARAÑA GEOMÉTRICA DE ANANSI (<visor-anansi>)
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
      webTime += 0.014;

      const centerX = w / 2;
      const centerY = h / 2;
      const maxR = Math.min(w, h) * 0.44;
      const spokes = 8;
      const rings = 5;

      // Radios
      wctx.save();
      wctx.beginPath();
      for (let i = 0; i < spokes; i++) {
        const angle = (i * 2 * Math.PI) / spokes + Math.sin(webTime * 0.4) * 0.08;
        wctx.moveTo(centerX, centerY);
        wctx.lineTo(centerX + Math.cos(angle) * maxR, centerY + Math.sin(angle) * maxR);
      }
      wctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
      wctx.lineWidth = 1.2;
      wctx.stroke();
      wctx.restore();

      // Anillos concéntricos espirales
      for (let r = 1; r <= rings; r++) {
        const ringR = (maxR / rings) * r;
        wctx.save();
        wctx.beginPath();
        for (let i = 0; i <= spokes; i++) {
          const angle = (i * 2 * Math.PI) / spokes + Math.sin(webTime * 0.4) * 0.08;
          const wobble = Math.sin(webTime * 2 + r + i) * 3;
          const x = centerX + Math.cos(angle) * (ringR + wobble);
          const y = centerY + Math.sin(angle) * (ringR + wobble);
          if (i === 0) wctx.moveTo(x, y);
          else wctx.lineTo(x, y);
        }
        wctx.strokeStyle = `rgba(168, 85, 247, ${0.25 + (r / rings) * 0.4})`;
        wctx.lineWidth = 1.4;
        wctx.shadowColor = '#d946ef';
        wctx.shadowBlur = 8;
        wctx.stroke();
        wctx.restore();
      }

      // Núcleo Anansi
      wctx.save();
      wctx.beginPath();
      wctx.arc(centerX, centerY, 5.5, 0, Math.PI * 2);
      wctx.fillStyle = '#ffffff';
      wctx.shadowColor = '#a855f7';
      wctx.shadowBlur = 15;
      wctx.fill();
      wctx.restore();

      requestAnimationFrame(drawAnansiWeb);
    }
    drawAnansiWeb();
  }

  // ==========================================================================
  // 4. SEMIESFERA DE RAYOS DE FIBRA ÓPTICA (<semiesfera-rayos> - Ref. 4)
  // ==========================================================================
  const rayosCanvas = document.getElementById('rayosCanvas');
  if (rayosCanvas) {
    const rctx = rayosCanvas.getContext('2d');
    let rayTime = 0;
    const numRays = 72;

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
      rayTime += 0.018;

      const originX = w * 0.52;
      const originY = h * 0.5;
      const maxRadius = Math.min(w, h) * 0.44;

      // Dibujar rayos que emergen en abanico semicircular hacia la izquierda
      for (let i = 0; i < numRays; i++) {
        const angleFraction = i / (numRays - 1);
        const baseAngle = Math.PI * 0.5 + angleFraction * Math.PI; // Semicírculo izquierdo
        const wave = Math.sin(rayTime * 1.5 + i * 0.15) * 0.04;
        const angle = baseAngle + wave;

        const rayLength = maxRadius * (0.8 + Math.sin(rayTime * 2 + i * 0.3) * 0.18);
        const endX = originX + Math.cos(angle) * rayLength;
        const endY = originY + Math.sin(angle) * rayLength;

        // Línea de fibra óptica
        rctx.save();
        rctx.beginPath();
        rctx.moveTo(originX, originY);
        rctx.lineTo(endX, endY);
        const rayAlpha = 0.2 + Math.sin(rayTime + i) * 0.15;
        rctx.strokeStyle = `rgba(0, 240, 255, ${rayAlpha})`;
        rctx.lineWidth = 1.2;
        rctx.stroke();
        rctx.restore();

        // Puntos de luz a lo largo del rayo
        const dotSteps = 4;
        for (let d = 1; d <= dotSteps; d++) {
          const dotT = (d / dotSteps) * ((rayTime * 0.3 + i * 0.05) % 1);
          const dotX = originX + Math.cos(angle) * (rayLength * dotT);
          const dotY = originY + Math.sin(angle) * (rayLength * dotT);

          rctx.save();
          rctx.beginPath();
          rctx.arc(dotX, dotY, 1.4, 0, Math.PI * 2);
          rctx.fillStyle = 'rgba(0, 240, 255, 0.7)';
          rctx.fill();
          rctx.restore();
        }

        // Nodo luminoso en la punta del rayo
        rctx.save();
        rctx.beginPath();
        rctx.arc(endX, endY, 2.8, 0, Math.PI * 2);
        rctx.fillStyle = i % 2 === 0 ? '#00f0ff' : '#ffffff';
        rctx.shadowColor = '#00f0ff';
        rctx.shadowBlur = 10;
        rctx.fill();
        rctx.restore();
      }

      // Eje central de emisión
      rctx.save();
      rctx.beginPath();
      rctx.arc(originX, originY, 6, 0, Math.PI * 2);
      rctx.fillStyle = '#ffffff';
      rctx.shadowColor = '#00f0ff';
      rctx.shadowBlur = 20;
      rctx.fill();
      rctx.restore();

      requestAnimationFrame(drawFiberRays);
    }
    drawFiberRays();
  }

  // ==========================================================================
  // 5. ESPECTRO HIDRO-ACÚSTICO FLUVIAL INTERACTIVO (#rio)
  // ==========================================================================
  const riverContainer = document.querySelector('#rio');
  if (riverContainer) {
    let canvas = riverContainer.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      riverContainer.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    let time = 0;
    let mouseX = 0;
    let isHovered = false;

    riverContainer.addEventListener('mouseenter', () => { isHovered = true; });
    riverContainer.addEventListener('mouseleave', () => { isHovered = false; });
    riverContainer.addEventListener('mousemove', (e) => {
      const rect = riverContainer.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
    });

    const nodes = [
      { label: '[01 // ACÚSTICA FLUVIAL]', pct: 0.12, color: '#00e5ff' },
      { label: '[02 // MEMORIA ORAL]', pct: 0.32, color: '#38bdf8' },
      { label: '[03 // CRIPTOGRAFÍA EN CANTO]', pct: 0.50, color: '#a855f7' },
      { label: '[04 // PROPAGACIÓN HÍDRICA]', pct: 0.68, color: '#ec4899' },
      { label: '[05 // RESISTENCIA COLECTIVA]', pct: 0.85, color: '#ffb800' }
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
      const hoverAmp = isHovered ? 1.3 : 1.0;

      const riverGlow = ctx.createRadialGradient(w * 0.5, midY, 10, w * 0.5, midY, w * 0.55);
      riverGlow.addColorStop(0, 'rgba(0, 229, 255, 0.18)');
      riverGlow.addColorStop(0.5, 'rgba(168, 85, 247, 0.12)');
      riverGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = riverGlow;
      ctx.fillRect(0, 0, w, h);

      const streamGrad = ctx.createLinearGradient(0, 0, w, 0);
      streamGrad.addColorStop(0.0, '#00e5ff');
      streamGrad.addColorStop(0.35, '#38bdf8');
      streamGrad.addColorStop(0.65, '#a855f7');
      streamGrad.addColorStop(0.85, '#ff007f');
      streamGrad.addColorStop(1.0, '#ffb800');

      function calculateWave(x, phase, scale) {
        const normX = x / w;
        const envelope = Math.sin(normX * Math.PI);
        const mouseInfluence = isHovered ? Math.exp(-Math.pow((x - mouseX) / (w * 0.18), 2)) * 0.4 : 0;
        const wave1 = Math.sin(normX * 9 + time * 1.8 + phase) * (h * 0.22 * scale);
        const wave2 = Math.cos(normX * 16 - time * 1.1) * (h * 0.08 * scale);
        const wave3 = Math.sin(normX * 24 + time * 2.4) * (h * 0.03 * scale);
        return midY + (wave1 + wave2 + wave3 + mouseInfluence * h * 0.15) * envelope * hoverAmp;
      }

      ctx.save();
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const y = calculateWave(x, 0, 1.0);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = streamGrad;
      ctx.lineWidth = 2.6;
      ctx.shadowColor = 'rgba(0, 229, 255, 0.8)';
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const y = calculateWave(x, Math.PI * 0.8, -0.75);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.75)';
      ctx.lineWidth = 1.6;
      ctx.shadowColor = 'rgba(168, 85, 247, 0.6)';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.restore();

      nodes.forEach((node, i) => {
        const x = w * node.pct;
        const isUpper = i % 2 === 0;
        const y = calculateWave(x, isUpper ? 0 : Math.PI * 0.8, isUpper ? 1.0 : -0.75);

        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.font = '600 10.5px "DM Mono", monospace';
        ctx.fillStyle = node.color;
        ctx.textAlign = 'center';
        const textOffset = isUpper ? -16 : 20;
        ctx.fillText(node.label, x, y + textOffset);
        ctx.restore();
      });

      time += 0.02;
      requestAnimationFrame(drawRiver);
    }
    drawRiver();
  }

  // ==========================================================================
  // 6. FÍSICA 3D EN TARJETAS DE ARTEFACTOS Y PLIEGUES KINÉTICOS
  // ==========================================================================
  const interactiveCards = document.querySelectorAll('secreto, alerta, resistencia, nodo-orbital, terminal-codigo');
  interactiveCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotX = ((y - centerY) / centerY) * -6;
      const rotY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ==========================================================================
  // 7. SÍNTESIS DE VOZ Y TRANSMISIÓN DE AUDIO (CIERRE DEL ENSAYO)
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






