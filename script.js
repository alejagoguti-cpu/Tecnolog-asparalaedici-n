/**
 * ==========================================================================
 * TECNOLOGÍAS PARA LA EDICIÓN — ALEJANDRA GÓMEZ GUTIÉRREZ
 * 10 Animaciones Totalmente Distintas y Vivas con Nodos Dinámicos Integrados
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
  // 3. FONDO LUMÍNICO ADAPTATIVO (#ambientCanvas)
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
  // 4. MOTOR GENERATIVO DE 10 ANIMACIONES TOTALMENTE DIFERENTES Y VIVAS
  // ==========================================================================

  function initUniqueDynamicAnimation(canvas, themeColor, animType) {
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
    let ch = 550;
    let rectTop = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      cw = rect.width || 800;
      ch = rect.height || 550;
      rectTop = rect.top + window.scrollY;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(cw * dpr);
      canvas.height = Math.floor(ch * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    window.addEventListener('resize', resize);
    resize();

    // INTERSECTION OBSERVER: Pausa cuando está fuera de pantalla (Rendimiento 60-120 FPS)
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

    // ========================================================================
    // MODELOS Y PARTÍCULAS ESPECÍFICAS PARA CADA ANIMACIÓN
    // ========================================================================

    // 01. Vértices 3D para Icosaedro / Octaedro Holográfico
    const phi = (1 + Math.sqrt(5)) / 2;
    const vertices3D = [
      { x: -1, y: phi, z: 0 }, { x: 1, y: phi, z: 0 }, { x: -1, y: -phi, z: 0 }, { x: 1, y: -phi, z: 0 },
      { x: 0, y: -1, z: phi }, { x: 0, y: 1, z: phi }, { x: 0, y: -1, z: -phi }, { x: 0, y: 1, z: -phi },
      { x: phi, y: 0, z: -1 }, { x: phi, y: 0, z: 1 }, { x: -phi, y: 0, z: -1 }, { x: -phi, y: 0, z: 1 }
    ];
    const edges3D = [
      [0,11],[0,5],[0,1],[0,7],[0,10],[1,5],[1,9],[1,8],[1,7],[2,11],[2,4],[2,6],[2,10],[3,9],[3,4],[3,6],[3,8],
      [4,5],[4,9],[4,11],[5,11],[6,7],[6,8],[6,10],[7,8],[7,10],[8,9],[10,11]
    ];
    const dustParticles3D = Array.from({ length: 40 }, () => ({
      x: (Math.random() - 0.5) * 500,
      y: (Math.random() - 0.5) * 350,
      z: (Math.random() - 0.5) * 400,
      size: Math.random() * 2 + 1
    }));

    // 02. Nodos con Física de Red y Potenciales de Acción Sinápticos
    const synapseNodes = Array.from({ length: 22 }, (_, i) => {
      const isHub = i < conceptList.length;
      return {
        isHub,
        text: isHub ? conceptList[i] : '',
        x: (Math.random() - 0.5) * 460,
        y: (Math.random() - 0.5) * 280,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: isHub ? 8 : 3.5,
        energy: Math.random()
      };
    });
    const actionPulses = Array.from({ length: 12 }, () => ({
      from: Math.floor(Math.random() * synapseNodes.length),
      to: Math.floor(Math.random() * synapseNodes.length),
      progress: Math.random(),
      speed: Math.random() * 0.02 + 0.015
    }));

    // 03. Sonar & Telemetría Militar
    let sonarShockwaves = [
      { radius: 10, alpha: 1 },
      { radius: 100, alpha: 0.6 },
      { radius: 200, alpha: 0.3 }
    ];

    // 04. Vórtice Galáctico de Polvo Estelar (Keplerian Spiral)
    const galaxyStars = Array.from({ length: 110 }, (_, i) => {
      const arm = i % 2;
      const dist = Math.pow(Math.random(), 1.5) * 240 + 20;
      const baseAngle = dist * 0.045 + arm * Math.PI + (Math.random() - 0.5) * 0.45;
      return {
        dist,
        baseAngle,
        speed: (28 / (dist + 30)) * 0.03,
        size: Math.random() * 2.8 + 0.8,
        hue: Math.random() > 0.4 ? 'gold' : 'amber'
      };
    });
    let shootingStar = { x: -100, y: -100, vx: 0, vy: 0, life: 0 };

    // 05. Horizonte Cyber Vectorial Tron
    const gridCols = 16;
    const gridRows = 10;

    // 06. Telaraña Fractal de Anansi
    const webDewDrops = Array.from({ length: 45 }, () => ({
      spoke: Math.floor(Math.random() * 16),
      ring: Math.floor(Math.random() * 7) + 1,
      size: Math.random() * 3 + 1.5,
      sparkle: Math.random() * Math.PI * 2
    }));

    // 07. Lluvia de Esteganografía Matricial
    const glyphChars = ['✦', '⎔', '∿', '⚿', '§', '0', '1', '⟐', '≋', '∆', '⎈', 'Ξ', '⍟', '⌘'];
    const matrixColumns = Array.from({ length: 32 }, (_, i) => ({
      x: i / 32,
      y: Math.random(),
      speed: Math.random() * 0.0035 + 0.0018,
      symbols: Array.from({ length: 14 }, () => glyphChars[Math.floor(Math.random() * glyphChars.length)])
    }));

    // 08. Cintas Textiles y Fibras Angisa
    const textileRibbons = Array.from({ length: 7 }, (_, i) => ({
      offset: i * 0.28,
      speed: 0.8 + i * 0.15,
      color: i % 2 === 0 ? 'rgba(255, 0, 127, 0.4)' : 'rgba(0, 240, 255, 0.35)'
    }));

    // 09. Olas Fluviales Bioluminiscentes & Ecualizador
    const riverPlankton = Array.from({ length: 65 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 2.5 + 1,
      speed: Math.random() * 0.002 + 0.001,
      bobOffset: Math.random() * Math.PI * 2
    }));

    // 10. Supernova Solar de Libertad
    const solarFlares = Array.from({ length: 36 }, (_, i) => ({
      angle: (i / 36) * Math.PI * 2,
      baseLen: Math.random() * 70 + 110,
      freq: Math.random() * 2.5 + 1.2,
      phase: Math.random() * Math.PI * 2
    }));
    const risingEmbers = Array.from({ length: 50 }, () => ({
      x: (Math.random() - 0.5) * 320,
      y: Math.random() * 300 - 50,
      vy: Math.random() * 1.5 + 0.8,
      vx: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2.5 + 1,
      alpha: Math.random()
    }));

    // ========================================================================
    // RENDERIZADOR DE NODOS / BADGES DE ALTA DEFINICIÓN (GLASSMORPHISM)
    // ========================================================================
    function drawNodeBadge(x, y, text, isHovered, scale = 1, alpha = 1, accentColor = themeColor, extraSubtext = '') {
      ctx.save();
      ctx.globalAlpha = Math.max(0.15, Math.min(1, alpha));
      ctx.font = `600 ${Math.max(10, Math.round(12 * scale))}px "DM Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const metrics = ctx.measureText(text);
      const padX = 12 * scale;
      const padY = 6 * scale;
      const bw = metrics.width + padX * 2;
      const bh = (extraSubtext ? 32 : 24) * scale;

      // Aura de Resplandor
      if (isHovered) {
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = 18 * scale;
      } else {
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 8 * scale;
      }

      // Pastilla de Fondo Glassmorphic
      ctx.beginPath();
      ctx.roundRect(x - bw / 2, y - bh / 2, bw, bh, 12 * scale);
      ctx.fillStyle = isHovered ? 'rgba(255, 255, 255, 0.98)' : 'rgba(3, 8, 22, 0.88)';
      ctx.fill();

      // Borde Luminoso
      ctx.strokeStyle = isHovered ? '#ffffff' : accentColor;
      ctx.lineWidth = isHovered ? 2.2 * scale : 1.3 * scale;
      ctx.stroke();

      // Punto Núcleo / Conector
      ctx.beginPath();
      ctx.arc(x, y - bh / 2 - 3 * scale, 2.5 * scale, 0, Math.PI * 2);
      ctx.fillStyle = isHovered ? '#ffffff' : accentColor;
      ctx.fill();

      // Texto Principal
      ctx.fillStyle = isHovered ? '#010306' : '#f0f6fc';
      ctx.fillText(text, x, extraSubtext ? y - 4 * scale : y + 0.5);

      // Subtexto Técnico opcional
      if (extraSubtext) {
        ctx.font = `500 ${Math.max(8, Math.round(8.5 * scale))}px "DM Mono", monospace`;
        ctx.fillStyle = isHovered ? 'rgba(1, 3, 6, 0.75)' : accentColor;
        ctx.fillText(extraSubtext, x, y + 8 * scale);
      }

      ctx.restore();
    }

    // ========================================================================
    // BUCLE PRINCIPAL DE ANIMACIÓN
    // ========================================================================
    function draw() {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      ctx.clearRect(0, 0, cw, ch);
      time += 0.016;

      const viewportOffset = (rectTop - scrollY + ch / 2 - window.innerHeight / 2) / window.innerHeight;
      const cx = cw * 0.5;
      const cy = ch * 0.5 - viewportOffset * 15;

      // ======================================================================
      // 01. ARTEFACTO 3D: POLIEDRO HOLOGRÁFICO CON ANILLOS GIROSCÓPICOS
      // ======================================================================
      if (animType === 'artefacto3d') {
        const scale3D = Math.min(cw, ch) * 0.22;
        const rotX = time * 0.65 + (localMouseY !== -1000 ? (localMouseY - cy) * 0.0015 : 0);
        const rotY = time * 0.85 + (localMouseX !== -1000 ? (localMouseX - cx) * 0.0015 : 0);

        // Polvo Estelar Cuántico
        dustParticles3D.forEach((p) => {
          const px = cx + p.x + Math.sin(time + p.y) * 15;
          const py = cy + p.y + Math.cos(time + p.x) * 15;
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 240, 255, 0.25)';
          ctx.fill();
        });

        // 3 Anillos Giroscópicos
        for (let ring = 0; ring < 3; ring++) {
          const ringR = scale3D * (1.3 + ring * 0.35);
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(time * (0.4 - ring * 0.15) + ring * 1.05);
          ctx.scale(1, 0.38);
          ctx.beginPath();
          ctx.arc(0, 0, ringR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 + ring * 0.08})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();

          // Partícula satélite orbitando
          const satAngle = time * (1.8 + ring * 0.6);
          const sx = Math.cos(satAngle) * ringR;
          const sy = Math.sin(satAngle) * ringR;
          ctx.beginPath();
          ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.restore();
        }

        // Proyección 3D del Poliedro
        const proj = vertices3D.map((v) => {
          let x1 = v.x * Math.cos(rotY) - v.z * Math.sin(rotY);
          let z1 = v.x * Math.sin(rotY) + v.z * Math.cos(rotY);
          let y2 = v.y * Math.cos(rotX) - z1 * Math.sin(rotX);
          let z2 = v.y * Math.sin(rotX) + z1 * Math.cos(rotX);
          const fov = 4.0;
          const p = fov / (fov + z2);
          return {
            x: cx + x1 * scale3D * p,
            y: cy + y2 * scale3D * p,
            z: z2,
            p: p
          };
        });

        // Caras y Aristas 3D
        ctx.beginPath();
        edges3D.forEach(([i, j]) => {
          ctx.moveTo(proj[i].x, proj[i].y);
          ctx.lineTo(proj[j].x, proj[j].y);
        });
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Pulsos sónicos expansivos
        for (let r = 80; r <= 280; r += 70) {
          const pulseR = (r + time * 35) % 280;
          ctx.beginPath();
          ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.25 * (1 - pulseR / 280)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Nodos Anclados a Vértices 3D
        conceptList.forEach((word, i) => {
          const vIdx = (i * 2) % proj.length;
          const p = proj[vIdx];
          const distMouse = Math.hypot(p.x - localMouseX, p.y - localMouseY);
          const isHovered = distMouse < 90;

          // Hilo láser hacia el centro
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * p.p})`;
          ctx.stroke();

          drawNodeBadge(p.x, p.y, word, isHovered, Math.min(1.2, Math.max(0.8, p.p * 0.95)), p.p > 0.8 ? 1 : 0.65, '#00f0ff', `3D:Z ${p.z.toFixed(1)}`);
        });

      // ======================================================================
      // 02. RED COMUNITARIA: MALLA SINÁPTICA VIVA CON IMPULSOS ELÉCTRICOS
      // ======================================================================
      } else if (animType === 'redneuronal') {
        // Actualizar física de nodos
        synapseNodes.forEach((node, i) => {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < -cw * 0.42 || node.x > cw * 0.42) node.vx *= -1;
          if (node.y < -ch * 0.38 || node.y > ch * 0.38) node.vy *= -1;

          // Interacción con el cursor (Atracción/Repulsión magnética)
          if (localMouseX !== -1000) {
            const dx = (cx + node.x) - localMouseX;
            const dy = (cy + node.y) - localMouseY;
            const d = Math.hypot(dx, dy);
            if (d < 160 && d > 1) {
              node.x -= (dx / d) * 1.8;
              node.y -= (dy / d) * 1.8;
            }
          }
        });

        // Dibujar Conexiones Axonales
        for (let i = 0; i < synapseNodes.length; i++) {
          for (let j = i + 1; j < synapseNodes.length; j++) {
            const n1 = synapseNodes[i];
            const n2 = synapseNodes[j];
            const x1 = cx + n1.x;
            const y1 = cy + n1.y;
            const x2 = cx + n2.x;
            const y2 = cy + n2.y;
            const dist = Math.hypot(x1 - x2, y1 - y2);

            if (dist < 180) {
              const alpha = (1 - dist / 180) * 0.45;
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
              ctx.lineWidth = n1.isHub || n2.isHub ? 1.5 : 0.8;
              ctx.stroke();
            }
          }
        }

        // Potenciales de Acción (Chispas eléctricas viajando)
        actionPulses.forEach((pulse) => {
          pulse.progress += pulse.speed;
          if (pulse.progress >= 1) {
            pulse.from = Math.floor(Math.random() * synapseNodes.length);
            pulse.to = Math.floor(Math.random() * synapseNodes.length);
            pulse.progress = 0;
          }
          const n1 = synapseNodes[pulse.from];
          const n2 = synapseNodes[pulse.to];
          const px = cx + n1.x + (n2.x - n1.x) * pulse.progress;
          const py = cy + n1.y + (n2.y - n1.y) * pulse.progress;

          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#00e5ff';
          ctx.shadowBlur = 12;
          ctx.fill();
        });

        // Relámpagos hacia el cursor
        if (localMouseX !== -1000) {
          const nearest = [...synapseNodes]
            .map((n) => ({ n, d: Math.hypot((cx + n.x) - localMouseX, (cy + n.y) - localMouseY) }))
            .sort((a, b) => a.d - b.d)
            .slice(0, 3);

          nearest.forEach(({ n }) => {
            ctx.beginPath();
            ctx.moveTo(localMouseX, localMouseY);
            const midX = (localMouseX + cx + n.x) / 2 + (Math.random() - 0.5) * 20;
            const midY = (localMouseY + cy + n.y) / 2 + (Math.random() - 0.5) * 20;
            ctx.quadraticCurveTo(midX, midY, cx + n.x, cy + n.y);
            ctx.strokeStyle = 'rgba(0, 229, 255, 0.75)';
            ctx.lineWidth = 1.8;
            ctx.stroke();
          });
        }

        // Dibujar Nodos Hub y Badges
        synapseNodes.forEach((node) => {
          const px = cx + node.x;
          const py = cy + node.y;
          const distMouse = Math.hypot(px - localMouseX, py - localMouseY);
          const isHovered = distMouse < 90;

          if (node.isHub) {
            // Aura Bioluminiscente
            const glow = ctx.createRadialGradient(px, py, 2, px, py, 25);
            glow.addColorStop(0, 'rgba(0, 229, 255, 0.6)');
            glow.addColorStop(1, 'rgba(0, 229, 255, 0)');
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(px, py, 25, 0, Math.PI * 2);
            ctx.fill();

            drawNodeBadge(px, py, node.text, isHovered, 1, 1, '#00e5ff', 'SYNAPSE ACTIVE');
          } else {
            ctx.beginPath();
            ctx.arc(px, py, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(0, 229, 255, 0.7)';
            ctx.fill();
          }
        });

      // ======================================================================
      // 03. VIGILANCIA: RADAR TÁCTICO MILITAR HUD Y BARRIDO LÁSER VOLUMÉTRICO
      // ======================================================================
      } else if (animType === 'lasersearch') {
        const radius = Math.min(cw, ch) * 0.44;

        // Anillos HUD Concéntricos con Marcas de Grados
        [0.35, 0.65, 1.0].forEach((ratio, rIdx) => {
          const r = radius * ratio;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(244, 63, 94, ${0.18 + rIdx * 0.1})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Marcas de grados en el anillo exterior
          if (rIdx === 2) {
            for (let deg = 0; deg < 360; deg += 30) {
              const rad = (deg * Math.PI) / 180 + time * (deg % 60 === 0 ? 0.05 : -0.05);
              const x1 = cx + Math.cos(rad) * (r - 6);
              const y1 = cy + Math.sin(rad) * (r - 6);
              const x2 = cx + Math.cos(rad) * (r + 4);
              const y2 = cy + Math.sin(rad) * (r + 4);
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.strokeStyle = 'rgba(244, 63, 94, 0.45)';
              ctx.stroke();
            }
          }
        });

        // Retícula de Ejes Centrales
        ctx.beginPath();
        ctx.moveTo(cx - radius * 1.05, cy); ctx.lineTo(cx + radius * 1.05, cy);
        ctx.moveTo(cx, cy - radius * 1.05); ctx.lineTo(cx + radius * 1.05, cy);
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.2)';
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Ondas Sonar Expansivas
        sonarShockwaves.forEach((wave) => {
          wave.radius += 1.8;
          wave.alpha = Math.max(0, 1 - wave.radius / (radius * 1.1));
          if (wave.radius > radius * 1.1) {
            wave.radius = 10;
            wave.alpha = 1;
          }
          ctx.beginPath();
          ctx.arc(cx, cy, wave.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(244, 63, 94, ${wave.alpha * 0.4})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });

        // Barrido Láser 360° con Cola Fosforescente
        const sweepAngle = time * 1.5;
        const beamArc = 0.65;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, sweepAngle - beamArc, sweepAngle);
        ctx.closePath();
        const laserGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
        laserGrad.addColorStop(0, 'rgba(244, 63, 94, 0.55)');
        laserGrad.addColorStop(1, 'rgba(244, 63, 94, 0.0)');
        ctx.fillStyle = laserGrad;
        ctx.fill();

        // Línea principal del haz
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(sweepAngle) * radius, cy + Math.sin(sweepAngle) * radius);
        ctx.strokeStyle = '#ffffff';
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 10;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Nodos con Brackets de Bloqueo HUD
        conceptList.forEach((word, i) => {
          const ringR = radius * (0.45 + (i % 3) * 0.26);
          const nodeAngle = (i / conceptList.length) * Math.PI * 2 + 0.3;
          const px = cx + Math.cos(nodeAngle) * ringR;
          const py = cy + Math.sin(nodeAngle) * ringR;

          // Cálculo de intercepción con el haz
          const normSweep = ((sweepAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
          const normNode = ((nodeAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
          let diff = Math.abs(normSweep - normNode);
          if (diff > Math.PI) diff = Math.PI * 2 - diff;
          const isSwept = diff < 0.4;
          const distMouse = Math.hypot(px - localMouseX, py - localMouseY);
          const isHovered = distMouse < 90 || isSwept;

          // Brackets tácticos [ ]
          const sz = 16;
          ctx.strokeStyle = isHovered ? '#ffffff' : 'rgba(244, 63, 94, 0.6)';
          ctx.lineWidth = 1.6;
          // Esquina sup izq
          ctx.beginPath(); ctx.moveTo(px - 38, py - sz + 6); ctx.lineTo(px - 38, py - sz); ctx.lineTo(px - 38 + 6, py - sz); ctx.stroke();
          // Esquina sup der
          ctx.beginPath(); ctx.moveTo(px + 38 - 6, py - sz); ctx.lineTo(px + 38, py - sz); ctx.lineTo(px + 38, py - sz + 6); ctx.stroke();
          // Esquina inf izq
          ctx.beginPath(); ctx.moveTo(px - 38, py + sz - 6); ctx.lineTo(px - 38, py + sz); ctx.lineTo(px - 38 + 6, py + sz); ctx.stroke();
          // Esquina inf der
          ctx.beginPath(); ctx.moveTo(px + 38 - 6, py + sz); ctx.lineTo(px + 38, py + sz); ctx.lineTo(px + 38, py + sz - 6); ctx.stroke();

          drawNodeBadge(px, py, word, isHovered, 1, 1, '#f43f5e', `LOCK:${(isHovered ? 98 : 45) + (i % 5)}%`);
        });

        // Retícula de mira en el Cursor
        if (localMouseX !== -1000) {
          ctx.beginPath();
          ctx.arc(localMouseX, localMouseY, 16, 0, Math.PI * 2);
          ctx.moveTo(localMouseX - 24, localMouseY); ctx.lineTo(localMouseX + 24, localMouseY);
          ctx.moveTo(localMouseX, localMouseY - 24); ctx.lineTo(localMouseX, localMouseY + 24);
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

      // ======================================================================
      // 04. MEMORIA: VÓRTICE CÓSMICO Y ESPIRAL ÁUREA DE POLVO ESTELAR
      // ======================================================================
      } else if (animType === 'nebulamemoria') {
        // Núcleo galáctico súper masivo
        const coreGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 140);
        coreGrad.addColorStop(0, 'rgba(255, 220, 100, 0.85)');
        coreGrad.addColorStop(0.3, 'rgba(255, 184, 0, 0.35)');
        coreGrad.addColorStop(0.7, 'rgba(255, 100, 0, 0.1)');
        coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, 140, 0, Math.PI * 2);
        ctx.fill();

        // Brazos de la Espiral Logarítmica
        for (let arm = 0; arm < 2; arm++) {
          ctx.beginPath();
          for (let th = 0; th < Math.PI * 3.5; th += 0.1) {
            const r = Math.pow(1.18, th) * 12;
            const ang = th + time * 0.3 + arm * Math.PI;
            const x = cx + Math.cos(ang) * r;
            const y = cy + Math.sin(ang) * (r * 0.72);
            if (th === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = 'rgba(255, 184, 0, 0.18)';
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }

        // Estrellas / Polvo Estelar Giratorio
        galaxyStars.forEach((star) => {
          star.baseAngle += star.speed;
          let px = cx + Math.cos(star.baseAngle) * star.dist;
          let py = cy + Math.sin(star.baseAngle) * (star.dist * 0.72);

          // Gravitación con el Cursor
          if (localMouseX !== -1000) {
            const dx = px - localMouseX;
            const dy = py - localMouseY;
            const d = Math.hypot(dx, dy);
            if (d < 140 && d > 1) {
              px -= (dx / d) * 15;
              py -= (dy / d) * 15;
            }
          }

          ctx.beginPath();
          ctx.arc(px, py, star.size, 0, Math.PI * 2);
          ctx.fillStyle = star.hue === 'gold' ? 'rgba(255, 215, 0, 0.75)' : 'rgba(255, 160, 50, 0.65)';
          ctx.fill();
        });

        // Estrella Fugaz (Meteoro)
        if (shootingStar.life <= 0 && Math.random() < 0.03) {
          shootingStar = {
            x: cx + (Math.random() - 0.5) * cw,
            y: cy - ch * 0.4,
            vx: (Math.random() - 0.5) * 8 + 4,
            vy: Math.random() * 6 + 4,
            life: 35
          };
        }
        if (shootingStar.life > 0) {
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(shootingStar.x - shootingStar.vx * 3, shootingStar.y - shootingStar.vy * 3);
          ctx.strokeStyle = `rgba(255, 255, 255, ${shootingStar.life / 35})`;
          ctx.lineWidth = 2.5;
          ctx.stroke();
          shootingStar.x += shootingStar.vx;
          shootingStar.y += shootingStar.vy;
          shootingStar.life--;
        }

        // Nodos en Órbita Celeste
        conceptList.forEach((word, i) => {
          const orbitR = 120 + (i % 3) * 45;
          const ang = time * 0.35 + (i / conceptList.length) * Math.PI * 2;
          const px = cx + Math.cos(ang) * orbitR;
          const py = cy + Math.sin(ang) * (orbitR * 0.72);

          // Filamento de Luz Dorada hacia el Centro
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = 'rgba(255, 184, 0, 0.25)';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          const distMouse = Math.hypot(px - localMouseX, py - localMouseY);
          drawNodeBadge(px, py, word, distMouse < 90, 1, 1, '#ffb800', `ORBIT ${i+1}`);
        });

      // ======================================================================
      // 05. INTENCIÓN: HORIZONTE CYBER VECTORIAL TRON Y PILARES LÁSER
      // ======================================================================
      } else if (animType === 'matrixflow') {
        // Cuadrícula 3D en Perspectiva
        const horizonY = cy - 30;
        const bottomY = ch + 40;

        for (let row = 0; row <= gridRows; row++) {
          const normY = row / gridRows;
          const y = horizonY + Math.pow(normY, 1.8) * (bottomY - horizonY);
          const wave = Math.sin(time * 2.5 + row * 0.6) * (normY * 12);
          ctx.beginPath();
          ctx.moveTo(0, y + wave);
          ctx.lineTo(cw, y + wave);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 + normY * 0.35})`;
          ctx.lineWidth = 1 + normY * 1.2;
          ctx.stroke();
        }

        for (let col = -gridCols; col <= gridCols; col++) {
          const xTop = cx + col * 12;
          const xBottom = cx + col * 65;
          ctx.beginPath();
          ctx.moveTo(xTop, horizonY);
          ctx.lineTo(xBottom, bottomY);
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.18)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Pilares de Luz Láser Verticales
        for (let p = 0; p < 6; p++) {
          const px = cx + ((p - 2.5) * 110);
          const py = horizonY + 80 + Math.sin(time * 2 + p) * 30;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px, 0);
          const beamGrad = ctx.createLinearGradient(px, py, px, 0);
          beamGrad.addColorStop(0, 'rgba(0, 240, 255, 0.7)');
          beamGrad.addColorStop(1, 'rgba(0, 240, 255, 0)');
          ctx.strokeStyle = beamGrad;
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }

        // Lluvia de Código Binario de Fondo
        ctx.font = '10px monospace';
        ctx.fillStyle = 'rgba(0, 240, 255, 0.35)';
        for (let i = 0; i < 18; i++) {
          const bx = (i * 48 + 20);
          const by = ((time * 40 + i * 25) % (ch * 0.7));
          ctx.fillText(i % 2 === 0 ? '1010' : '0101', bx, by);
        }

        // Nodos Microchip Isométricos
        conceptList.forEach((word, i) => {
          const col = (i % 3) - 1;
          const row = Math.floor(i / 3);
          const px = cx + col * 180 + Math.sin(time * 2 + i) * 8;
          const py = horizonY + 60 + row * 90 + Math.cos(time * 2 + i) * 6;

          // Línea guía vertical hacia el suelo
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px, py + 40);
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
          ctx.setLineDash([2, 4]);
          ctx.stroke();
          ctx.setLineDash([]);

          const distMouse = Math.hypot(px - localMouseX, py - localMouseY);
          drawNodeBadge(px, py, word, distMouse < 90, 1, 1, '#00f0ff', 'ISO // LOGIC');
        });

      // ======================================================================
      // 06. ANANSI: TELARAÑA FRACTAL EN ESPIRAL CON GOTAS DE ROCÍO VIVAS
      // ======================================================================
      } else if (animType === 'spiderweb') {
        const spokes = 16;
        const rings = 8;
        const maxR = Math.min(cw, ch) * 0.48;

        // Radios de Seda
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
        ctx.lineWidth = 1.3;
        for (let i = 0; i < spokes; i++) {
          const ang = (i * 2 * Math.PI) / spokes;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(ang) * maxR, cy + Math.sin(ang) * maxR);
          ctx.stroke();
        }

        // Espirales Poligonales Armónicas
        for (let r = 1; r <= rings; r++) {
          const ringR = (maxR / rings) * r;
          ctx.beginPath();
          for (let i = 0; i <= spokes; i++) {
            const ang = (i * 2 * Math.PI) / spokes;
            const vib = Math.sin(time * 3 + r * 1.2 + i * 0.8) * 4;
            const x = cx + Math.cos(ang) * (ringR + vib);
            const y = cy + Math.sin(ang) * (ringR + vib);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.15 + (r / rings) * 0.4})`;
          ctx.stroke();
        }

        // Gotas de Rocío Perladas Brillantes
        webDewDrops.forEach((dew) => {
          const ang = (dew.spoke * 2 * Math.PI) / spokes;
          const ringR = (maxR / rings) * dew.ring;
          const dx = cx + Math.cos(ang) * ringR;
          const dy = cy + Math.sin(ang) * ringR;

          ctx.beginPath();
          ctx.arc(dx, dy, dew.size, 0, Math.PI * 2);
          ctx.fillStyle = Math.sin(time * 3 + dew.sparkle) > 0.3 ? '#ffffff' : 'rgba(216, 180, 254, 0.85)';
          ctx.shadowColor = '#a855f7';
          ctx.shadowBlur = 8;
          ctx.fill();
        });

        // Ondas de Tensión al Tocar con el Cursor
        if (localMouseX !== -1000) {
          ctx.beginPath();
          ctx.arc(localMouseX, localMouseY, 35, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(216, 180, 254, 0.6)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Nodos Tejidos en la Malla de Anansi
        conceptList.forEach((word, i) => {
          const ringIdx = (i % 3) + 3;
          const spokeIdx = (i * 3) % spokes;
          const ringR = (maxR / rings) * ringIdx;
          const ang = (spokeIdx * 2 * Math.PI) / spokes;
          const px = cx + Math.cos(ang) * ringR;
          const py = cy + Math.sin(ang) * ringR;

          const distMouse = Math.hypot(px - localMouseX, py - localMouseY);
          drawNodeBadge(px, py, word, distMouse < 90, 1, 1, '#a855f7', 'ANANSI SILK');
        });

      // ======================================================================
      // 07. REFLEXIÓN: MATRIZ DE ESTEGANOGRAFÍA Y DECODIFICACIÓN CRÍPTICA
      // ======================================================================
      } else if (animType === 'glyphs') {
        // Lluvia de Columnas de Glifos
        ctx.font = '13px monospace';
        matrixColumns.forEach((col, cIdx) => {
          col.y += col.speed;
          if (col.y > 1) col.y = 0;

          const colX = col.x * cw;
          for (let s = 0; s < col.symbols.length; s++) {
            const symY = ((col.y + s * 0.06) % 1) * ch;
            const distMouse = Math.hypot(colX - localMouseX, symY - localMouseY);
            const isNearMouse = distMouse < 120;

            if (s === 0) {
              ctx.fillStyle = '#ffffff'; // Cabeza brillante
            } else if (isNearMouse) {
              ctx.fillStyle = 'rgba(0, 240, 255, 0.95)';
            } else {
              ctx.fillStyle = `rgba(192, 132, 252, ${0.4 - s * 0.025})`;
            }
            ctx.fillText(col.symbols[s], colX, symY);
          }
        });

        // Escáner Láser Horizontal
        const scannerY = (time * 65) % ch;
        ctx.beginPath();
        ctx.moveTo(0, scannerY);
        ctx.lineTo(cw, scannerY);
        const scanGrad = ctx.createLinearGradient(0, scannerY, cw, scannerY);
        scanGrad.addColorStop(0, 'rgba(192, 132, 252, 0)');
        scanGrad.addColorStop(0.5, 'rgba(0, 240, 255, 0.85)');
        scanGrad.addColorStop(1, 'rgba(192, 132, 252, 0)');
        ctx.strokeStyle = scanGrad;
        ctx.lineWidth = 2.2;
        ctx.stroke();

        // Nodos con Decodificación de Texto (Cifrado -> Descifrado)
        conceptList.forEach((word, i) => {
          const ang = (i / conceptList.length) * Math.PI * 2;
          const px = cx + Math.cos(ang) * 160 + Math.sin(time * 1.5 + i) * 12;
          const py = cy + Math.sin(ang) * 105 + Math.cos(time * 1.5 + i) * 12;

          const distMouse = Math.hypot(px - localMouseX, py - localMouseY);
          const isDecoded = distMouse < 120 || Math.abs(py - scannerY) < 40;

          // Texto Cifrado vs Descifrado
          let displayText = word;
          if (!isDecoded && (i % 2 === 1)) {
            displayText = word.split('').map((c, idx) => glyphChars[(idx + i) % glyphChars.length]).join('');
          }

          drawNodeBadge(px, py, displayText, isDecoded, 1, 1, isDecoded ? '#00f0ff' : '#c084fc', isDecoded ? 'DECRYPTED' : 'CIPHERED');
        });

      // ======================================================================
      // 08. LENGUAJE: TELAR DE CINTAS DE SEDA 3D Y PLIEGUES ANGISAS
      // ======================================================================
      } else if (animType === 'textile') {
        const numRays = 48;
        const maxRadius = Math.min(cw, ch) * 0.72;

        // Haces de Rayos en Abanico de Tela
        for (let i = 0; i < numRays; i++) {
          const fraction = i / (numRays - 1);
          const angle = Math.PI * 0.12 + fraction * Math.PI * 0.76;
          const wave = Math.sin(time * 2.2 + i * 0.3) * 0.045;
          const finalAngle = angle + wave;
          const rayLen = maxRadius * (0.65 + Math.sin(time * 2.5 + i * 0.35) * 0.18);
          const ex = cx + Math.cos(finalAngle) * rayLen;
          const ey = cy + Math.sin(finalAngle) * rayLen;

          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(ex, ey);
          ctx.strokeStyle = i % 2 === 0 ? 'rgba(0, 240, 255, 0.22)' : 'rgba(255, 0, 127, 0.25)';
          ctx.lineWidth = i % 3 === 0 ? 1.8 : 1.0;
          ctx.stroke();
        }

        // Cintas de Seda Ondulantes (Efecto Moiré)
        textileRibbons.forEach((ribbon, rIdx) => {
          ctx.beginPath();
          for (let x = 0; x <= cw; x += 10) {
            const normX = x / cw;
            const y = cy + Math.sin(normX * 6 + time * ribbon.speed + ribbon.offset) * 35;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = ribbon.color;
          ctx.lineWidth = 3.5;
          ctx.stroke();
        });

        // Nodos Anclados a las Puntas del Abanico Textil
        conceptList.forEach((word, i) => {
          const fraction = (i + 0.5) / conceptList.length;
          const angle = Math.PI * 0.16 + fraction * Math.PI * 0.68;
          const rayLen = maxRadius * 0.82;
          const px = cx + Math.cos(angle) * rayLen;
          const py = cy + Math.sin(angle) * rayLen;

          // Hilo conector
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = 'rgba(255, 0, 127, 0.45)';
          ctx.lineWidth = 1.4;
          ctx.stroke();

          const distMouse = Math.hypot(px - localMouseX, py - localMouseY);
          drawNodeBadge(px, py, word, distMouse < 90, 1, 1, '#ff007f', 'ANGISA WEAVE');
        });

      // ======================================================================
      // 09. EXPERIENCIA: OLAS FLUVIALES LÍQUIDAS Y ECUALIZADOR ACÚSTICO
      // ======================================================================
      } else if (animType === 'riverwaves') {
        // Plancton Bioluminiscente Flotando
        riverPlankton.forEach((p) => {
          p.x -= p.speed;
          if (p.x < 0) p.x = 1;
          const px = p.x * cw;
          const py = cy + (p.y - 0.5) * 160 + Math.sin(time * 2 + p.bobOffset) * 14;

          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 229, 255, 0.65)';
          ctx.fill();
        });

        // 4 Capas de Olas Líquidas con Relleno Gradiente
        for (let layer = 0; layer < 4; layer++) {
          ctx.beginPath();
          ctx.moveTo(0, ch);
          for (let x = 0; x <= cw; x += 8) {
            const normX = x / cw;
            const env = Math.sin(normX * Math.PI);
            const w1 = Math.sin(normX * 7 + time * 2.4 + layer * 1.2) * (ch * 0.08);
            const w2 = Math.cos(normX * 12 - time * 1.6 + layer) * (ch * 0.03);
            const y = cy + (layer * 18 - 25) + (w1 + w2) * env;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(cw, ch);
          ctx.closePath();

          const waterGrad = ctx.createLinearGradient(0, cy - 40, 0, ch);
          waterGrad.addColorStop(0, `rgba(0, 229, 255, ${0.12 - layer * 0.02})`);
          waterGrad.addColorStop(1, 'rgba(2, 8, 24, 0.85)');
          ctx.fillStyle = waterGrad;
          ctx.fill();

          ctx.strokeStyle = `rgba(0, 229, 255, ${0.45 - layer * 0.08})`;
          ctx.lineWidth = 2.2 - layer * 0.4;
          ctx.stroke();
        }

        // Espectro de Audio / Ecualizador del Canto de los Remeros
        for (let bar = 0; bar < 28; bar++) {
          const bx = cw * (0.15 + (bar / 28) * 0.7);
          const barH = Math.sin(time * 3.5 + bar * 0.4) * 28 + 32;
          ctx.beginPath();
          ctx.moveTo(bx, cy + 50);
          ctx.lineTo(bx, cy + 50 - barH);
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
          ctx.lineWidth = 3;
          ctx.stroke();
        }

        // Nodos Flotando como Boyas sobre las Crestas
        conceptList.forEach((word, i) => {
          const normX = (i + 1) / (conceptList.length + 1);
          const px = cw * normX;
          const env = Math.sin(normX * Math.PI);
          const w1 = Math.sin(normX * 7 + time * 2.4) * (ch * 0.08);
          const w2 = Math.cos(normX * 12 - time * 1.6) * (ch * 0.03);
          const py = cy - 25 + (w1 + w2) * env;

          // Hilo acústico hacia el fondo
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px, py + 45);
          ctx.strokeStyle = 'rgba(0, 229, 255, 0.45)';
          ctx.stroke();

          const distMouse = Math.hypot(px - localMouseX, py - localMouseY);
          drawNodeBadge(px, py, word, distMouse < 90, 1, 1, '#00e5ff', 'RIVER BUOY');
        });

      // ======================================================================
      // 10. LIBERTAD: SUPERNOVA SOLAR CORONAL Y RAYOS DE LIBERTAD
      // ======================================================================
      } else if (animType === 'solar') {
        // Corona y Resplandor Solar
        const solarGlow = ctx.createRadialGradient(cx, cy, 15, cx, cy, cw * 0.48);
        solarGlow.addColorStop(0, 'rgba(255, 220, 100, 0.95)');
        solarGlow.addColorStop(0.2, 'rgba(255, 184, 0, 0.55)');
        solarGlow.addColorStop(0.5, 'rgba(255, 0, 127, 0.15)');
        solarGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = solarGlow;
        ctx.fillRect(0, 0, cw, ch);

        // Chispas / Fuego Solar Ascendiendo
        risingEmbers.forEach((ember) => {
          ember.y -= ember.vy;
          ember.x += ember.vx + Math.sin(time * 3 + ember.y * 0.05) * 0.6;
          if (ember.y < -ch * 0.5) {
            ember.y = ch * 0.3;
            ember.x = (Math.random() - 0.5) * 300;
          }
          ctx.beginPath();
          ctx.arc(cx + ember.x, cy + ember.y, ember.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 200, 50, ${ember.alpha})`;
          ctx.fill();
        });

        // 36 Rayos Volumétricos de Libertad (Godrays)
        solarFlares.forEach((flare) => {
          const len = flare.baseLen + Math.sin(time * flare.freq + flare.phase) * 45;
          const ang = flare.angle + time * 0.08;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(ang) * len, cy + Math.sin(ang) * len);
          ctx.strokeStyle = `rgba(255, 184, 0, ${0.22 + Math.sin(time * 2 + flare.phase) * 0.12})`;
          ctx.lineWidth = 1.6;
          ctx.stroke();
        });

        // Bucles Magnéticos Coronales (Prominencias Solares)
        for (let loop = 0; loop < 5; loop++) {
          const loopAng = time * 0.2 + (loop * Math.PI * 2) / 5;
          const lx1 = cx + Math.cos(loopAng - 0.2) * 75;
          const ly1 = cy + Math.sin(loopAng - 0.2) * 75;
          const lx2 = cx + Math.cos(loopAng + 0.2) * 75;
          const ly2 = cy + Math.sin(loopAng + 0.2) * 75;
          const topX = cx + Math.cos(loopAng) * 140;
          const topY = cy + Math.sin(loopAng) * 140;

          ctx.beginPath();
          ctx.moveTo(lx1, ly1);
          ctx.quadraticCurveTo(topX, topY, lx2, ly2);
          ctx.strokeStyle = 'rgba(255, 80, 0, 0.45)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Nodos Anclados en los Haces Solares
        conceptList.forEach((word, i) => {
          const ang = (i * 2 * Math.PI) / conceptList.length + time * 0.08;
          const rayLen = 175 + Math.sin(time * 2.5 + i) * 25;
          const px = cx + Math.cos(ang) * rayLen;
          const py = cy + Math.sin(ang) * (rayLen * 0.75);

          // Rayo de plasma hacia el nodo
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = 'rgba(255, 184, 0, 0.45)';
          ctx.lineWidth = 1.6;
          ctx.stroke();

          const distMouse = Math.hypot(px - localMouseX, py - localMouseY);
          drawNodeBadge(px, py, word, distMouse < 90, 1, 1, '#ffb800', 'SOLAR FREEDOM');
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();
  }

  // ==========================================================================
  // INICIALIZACIÓN DE LAS 10 ANIMACIONES ESPECÍFICAS Y VIVAS
  // ==========================================================================
  initUniqueDynamicAnimation(document.getElementById('canvasModulo01'), 'rgb(0, 240, 255)', 'artefacto3d');
  initUniqueDynamicAnimation(document.getElementById('canvasModulo02'), 'rgb(0, 229, 255)', 'redneuronal');
  initUniqueDynamicAnimation(document.getElementById('canvasModulo03'), 'rgb(244, 63, 94)', 'lasersearch');
  initUniqueDynamicAnimation(document.getElementById('canvasModulo04'), 'rgb(255, 184, 0)', 'nebulamemoria');
  initUniqueDynamicAnimation(document.getElementById('canvasModulo05'), 'rgb(0, 240, 255)', 'matrixflow');
  initUniqueDynamicAnimation(document.getElementById('anansiWebCanvas'), 'rgb(168, 85, 247)', 'spiderweb');
  initUniqueDynamicAnimation(document.getElementById('canvasModulo07'), 'rgb(192, 132, 252)', 'glyphs');
  initUniqueDynamicAnimation(document.getElementById('rayosCanvas'), 'rgb(255, 0, 127)', 'textile');
  initUniqueDynamicAnimation(document.getElementById('rioCanvas'), 'rgb(0, 229, 255)', 'riverwaves');
  initUniqueDynamicAnimation(document.getElementById('cierreCanvas'), 'rgb(255, 184, 0)', 'solar');

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
