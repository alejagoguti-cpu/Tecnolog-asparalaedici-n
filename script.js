/**
 * TECNOLOGÍAS DEL SECRETO — MOTOR VISUAL DRAMÁTICO & ENSAYO EN CÓDIGO
 * Experiencia Poética: Hologramas de Artefactos, Red 3D Comunitaria, Portal Surinam,
 * Espectro Hidro-Acústico Fluido y Física de Pliegues Cinéticos
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

      const orb1X = w * (0.3 + Math.sin(time * 0.35) * 0.12);
      const orb1Y = h * (0.3 + Math.cos(time * 0.28) * 0.1 - scrollProgress * 0.15);
      const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 20, orb1X, orb1Y, w * 0.5);
      grad1.addColorStop(0, `rgba(${Math.round(currentRGB.r)}, ${Math.round(currentRGB.g)}, ${Math.round(currentRGB.b)}, 0.14)`);
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);

      const orb2X = w * (0.75 - Math.sin(time * 0.4) * 0.1);
      const orb2Y = h * (0.6 + Math.sin(time * 0.45) * 0.12);
      const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 30, orb2X, orb2Y, w * 0.45);
      grad2.addColorStop(0, `rgba(${Math.round(255 - currentRGB.r * 0.3)}, ${Math.round(currentRGB.g * 0.5)}, ${Math.round(255 - currentRGB.b * 0.2)}, 0.09)`);
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      time += 0.015;
      requestAnimationFrame(drawAmbient);
    }
    drawAmbient();
  }

  // ==========================================================================
  // 2. INYECCIÓN VISUAL EN <pensamiento>: HOLOGRAMAS & ALERTA ROJA
  // ==========================================================================
  const pensamientoEl = document.querySelector('pensamiento');
  if (pensamientoEl) {
    const visualBox = document.createElement('div');
    visualBox.className = 'visual-artefactos-container';
    visualBox.innerHTML = `
      <div class="holograma-card" title="Computador Personal">
        <svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="12" rx="2"/><path d="M6 20h12M12 16v4"/></svg>
        <span>COMPUTADOR</span>
      </div>
      <div class="holograma-card" title="Teléfono Celular">
        <svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="3"/><circle cx="12" cy="18" r="1"/></svg>
        <span>CELULAR</span>
      </div>
      <div class="holograma-card" title="Dispositivo Digital Inteligente">
        <svg viewBox="0 0 24 24"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="4"/></svg>
        <span>OBJETO DIGITAL</span>
      </div>
      <div class="holograma-card" title="Microprocesador">
        <svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></svg>
        <span>CIRCUITO / AVANCE</span>
      </div>
    `;
    pensamientoEl.appendChild(visualBox);

    const alertaRed = document.createElement('div');
    alertaRed.className = 'alerta-limitacion-red';
    alertaRed.innerHTML = `
      <div class="icono-alerta">⚠</div>
      <div class="texto-alerta">
        <strong>ERROR COGNITIVO // VISIÓN REDUCCIONISTA:</strong><br>
        La tecnología no es solo el artefacto físico digital. Es la capacidad comunitaria de responder creativamente ante una limitación.
      </div>
    `;
    pensamientoEl.appendChild(alertaRed);
  }

  // ==========================================================================
  // 3. INYECCIÓN VISUAL EN <definicion>: PORTAL SURINAM & RED 3D COMUNITARIA
  // ==========================================================================
  const definicionEl = document.querySelector('definicion');
  if (definicionEl) {
    const surinamContainer = document.createElement('div');
    surinamContainer.className = 'visual-surinam-container';
    surinamContainer.innerHTML = `
      <div class="foto-surinam-card">
        <div class="foto-surinam-meta">
          <h4>FOTOENSAYO SURINAM</h4>
          <p>[COORD: 05°50′N 55°10′W // CUENCA FLUVIAL]</p>
        </div>
      </div>
      <div class="canvas-red-3d-box">
        <span class="badge-red">RED 3D // SISTEMA COMUNITARIO</span>
        <canvas id="comunidadCanvas"></canvas>
      </div>
    `;
    definicionEl.appendChild(surinamContainer);

    // Motor de Red 3D en Canvas
    const comCanvas = document.getElementById('comunidadCanvas');
    if (comCanvas) {
      const cctx = comCanvas.getContext('2d');
      let rotAngle = 0;
      const numNodes = 20;
      const nodes3D = [];

      for (let i = 0; i < numNodes; i++) {
        const phi = Math.acos(-1 + (2 * i) / numNodes);
        const theta = Math.sqrt(numNodes * Math.PI) * phi;
        nodes3D.push({
          x: Math.cos(theta) * Math.sin(phi),
          y: Math.sin(theta) * Math.sin(phi),
          z: Math.cos(phi),
          pulse: Math.random() * Math.PI
        });
      }

      function draw3DNetwork() {
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
        rotAngle += 0.012;

        const radius = Math.min(w, h) * 0.38;
        const centerX = w / 2;
        const centerY = h / 2;
        const projectedNodes = [];

        nodes3D.forEach((n) => {
          // Rotación 3D en eje Y y X
          const cosY = Math.cos(rotAngle);
          const sinY = Math.sin(rotAngle);
          const x1 = n.x * cosY - n.z * sinY;
          const z1 = n.z * cosY + n.x * sinY;

          const cosX = Math.cos(rotAngle * 0.5);
          const sinX = Math.sin(rotAngle * 0.5);
          const y2 = n.y * cosX - z1 * sinX;
          const z2 = z1 * cosX + n.y * sinX;

          const perspective = 300 / (300 + z2 * radius);
          projectedNodes.push({
            px: centerX + x1 * radius * perspective,
            py: centerY + y2 * radius * perspective,
            depth: z2,
            scale: perspective
          });
        });

        // Dibujar filamentos de conexión entre nodos cercanos
        cctx.beginPath();
        for (let i = 0; i < projectedNodes.length; i++) {
          for (let j = i + 1; j < projectedNodes.length; j++) {
            const dx = projectedNodes[i].px - projectedNodes[j].px;
            const dy = projectedNodes[i].py - projectedNodes[j].py;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < radius * 0.8) {
              const alpha = Math.max(0, 1 - dist / (radius * 0.8)) * 0.35;
              cctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
              cctx.lineWidth = 1;
              cctx.moveTo(projectedNodes[i].px, projectedNodes[i].py);
              cctx.lineTo(projectedNodes[j].px, projectedNodes[j].py);
            }
          }
        }
        cctx.stroke();

        // Dibujar nodos luminosos
        projectedNodes.forEach((pn) => {
          const nodeRadius = Math.max(1.8, 3.5 * pn.scale);
          cctx.save();
          cctx.beginPath();
          cctx.arc(pn.px, pn.py, nodeRadius, 0, Math.PI * 2);
          cctx.fillStyle = pn.depth > 0 ? '#00f0ff' : '#ffffff';
          cctx.shadowColor = '#00f0ff';
          cctx.shadowBlur = 10;
          cctx.fill();
          cctx.restore();
        });

        requestAnimationFrame(draw3DNetwork);
      }
      draw3DNetwork();
    }
  }

  // ==========================================================================
  // 4. INYECCIÓN VISUAL EN <vigilancia>: SCANNER RADAR
  // ==========================================================================
  const vigilanciaEl = document.querySelector('vigilancia');
  if (vigilanciaEl) {
    const radarBox = document.createElement('div');
    radarBox.className = 'radar-vigilancia-box';
    radarBox.innerHTML = `
      <div class="radar-sweep-line"></div>
      <div style="font-family: var(--font-mono); font-size: 0.78rem; color: #fca5a5; letter-spacing: 0.14em;">
        [ESCÁNER COLONIAL: INTERCEPTACIÓN DE COMUNICACIONES DETECTADA // SE REQUIERE CODIFICACIÓN DE EMERGENCIA]
      </div>
    `;
    vigilanciaEl.appendChild(radarBox);
  }

  // ==========================================================================
  // 5. INYECCIÓN VISUAL EN <memoria>: CÁPSULAS INTERACTIVAS
  // ==========================================================================
  const memoriaEl = document.querySelector('memoria');
  if (memoriaEl) {
    const capsulasBox = document.createElement('div');
    capsulasBox.className = 'capsulas-memoria-grid';
    capsulasBox.innerHTML = `
      <div class="capsula-item"><span>📖</span> HISTORIAS</div>
      <div class="capsula-item"><span>🧣</span> TELAS</div>
      <div class="capsula-item"><span>🎵</span> CANCIONES</div>
      <div class="capsula-item"><span>🌊</span> EL AGUA</div>
      <div class="capsula-item"><span>🧠</span> MEMORIA VIVA</div>
    `;
    memoriaEl.insertBefore(capsulasBox, memoriaEl.firstChild);
  }

  // ==========================================================================
  // 6. INYECCIÓN VISUAL EN <historias-anansi>: TELARAÑA CRIPTOGRÁFICA
  // ==========================================================================
  const anansiEl = document.querySelector('historias-anansi');
  if (anansiEl) {
    const webBox = document.createElement('div');
    webBox.className = 'visual-anansi-web';
    webBox.innerHTML = '<canvas id="anansiWebCanvas"></canvas>';
    anansiEl.insertBefore(webBox, anansiEl.querySelector('capas'));

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

        const centerX = w / 2;
        const centerY = h / 2;
        const maxR = Math.min(w, h) * 0.44;
        const spokes = 8;
        const rings = 5;

        // Radios de la telaraña
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
          wctx.strokeStyle = `rgba(168, 85, 247, ${0.2 + (r / rings) * 0.4})`;
          wctx.lineWidth = 1.4;
          wctx.shadowColor = '#d946ef';
          wctx.shadowBlur = 8;
          wctx.stroke();
          wctx.restore();
        }

        // Núcleo Araña Anansi
        wctx.save();
        wctx.beginPath();
        wctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
        wctx.fillStyle = '#ffffff';
        wctx.shadowColor = '#a855f7';
        wctx.shadowBlur = 15;
        wctx.fill();
        wctx.restore();

        requestAnimationFrame(drawAnansiWeb);
      }
      drawAnansiWeb();
    }
  }

  // ==========================================================================
  // 7. ESPECTRO HIDRO-ACÚSTICO FLUVIAL INTERACTIVO (RÍO CUÁNTICO)
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
  // 8. FÍSICA 3D DE PLIEGUES KINÉTICOS (ANGISAS) CON BRILLO ESPECULAR
  // ==========================================================================
  const pliegueCards = document.querySelectorAll('secreto, alerta, resistencia');
  pliegueCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotX = ((y - centerY) / centerY) * -8;
      const rotY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ==========================================================================
  // 9. SÍNTESIS DE VOZ Y TRANSMISIÓN DE AUDIO (CIERRE DEL ENSAYO)
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





