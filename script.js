/**
 * ==========================================================================
 * TECNOLOGÍAS PARA LA EDICIÓN — ALEJANDRA GÓMEZ GUTIÉRREZ
 * Nodos Integrados Directamente DENTRO de las Redes y Geometrías en Movimiento
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
  // 4. MOTOR GENERATIVO CON NODOS INTEGRADOS DENTRO DE LAS REDES
  // ==========================================================================

  function initIntegratedAnimation(canvas, themeColor, animType) {
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

    // INTERSECTION OBSERVER
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

    // --- GEOMETRÍA 3D PARA MÓDULO 01 (OCTAEDRO ESTELAR / POLIEDRO CON NODOS EN VÉRTICES) ---
    // 6 vértices principales corresponden a los 6 conceptos
    const baseVertices3D = [
      { x: 0, y: -1.4, z: 0, text: conceptList[0] || 'Artefacto' },
      { x: 1.4, y: 0, z: 0, text: conceptList[1] || 'Computador' },
      { x: 0, y: 0, z: 1.4, text: conceptList[2] || 'Celular' },
      { x: -1.4, y: 0, z: 0, text: conceptList[3] || 'Digital' },
      { x: 0, y: 0, z: -1.4, text: conceptList[4] || 'Avance' },
      { x: 0, y: 1.4, z: 0, text: conceptList[5] || 'Límite' }
    ];

    const edgesOctahedron = [
      [0,1],[0,2],[0,3],[0,4],
      [5,1],[5,2],[5,3],[5,4],
      [1,2],[2,3],[3,4],[4,1]
    ];

    // Partículas auxiliares para redes dinámicas
    const particles = conceptList.map((word, i) => {
      const angle = (i / conceptList.length) * Math.PI * 2;
      return {
        text: word,
        x: Math.cos(angle) * 160,
        y: Math.sin(angle) * 120,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        angle: angle,
        radius: 140 + (i % 3) * 35,
        speed: 0.012 + (i % 2) * 0.006,
        phase: i * 1.2
      };
    });

    // Función auxiliar para dibujar pastilla/píldora sobre el nodo integrado
    function drawNodeBadge(x, y, text, isHovered, scale = 1) {
      ctx.save();
      ctx.font = `600 ${Math.max(10, Math.round(12.5 * scale))}px "DM Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const metrics = ctx.measureText(text);
      const padX = 10 * scale;
      const padY = 5 * scale;
      const bw = (metrics.width + padX * 2);
      const bh = 22 * scale;

      ctx.beginPath();
      ctx.roundRect(x - bw / 2, y - bh / 2, bw, bh, 11 * scale);
      ctx.fillStyle = isHovered ? 'rgba(255, 255, 255, 0.98)' : 'rgba(3, 8, 20, 0.92)';
      ctx.fill();

      ctx.strokeStyle = isHovered ? '#ffffff' : themeColor;
      ctx.lineWidth = isHovered ? 2 * scale : 1.2 * scale;
      ctx.stroke();

      // Punto central luminoso
      ctx.beginPath();
      ctx.arc(x, y - bh / 2 - 3 * scale, 2.5 * scale, 0, Math.PI * 2);
      ctx.fillStyle = isHovered ? '#ffffff' : themeColor;
      ctx.fill();

      ctx.fillStyle = isHovered ? '#010306' : '#f0f6fc';
      ctx.fillText(text, x, y + 1);
      ctx.restore();
    }

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
      // 10 MODOS: NODOS INTEGRADOS DIRECTAMENTE DENTRO DE LA RED EN MOVIMIENTO
      // ======================================================================

      if (animType === 'artefacto3d') {
        // 01. LOS NODOS SON LOS VÉRTICES MISMOS DEL ARTEFACTO 3D EN ROTACIÓN
        const scale3D = Math.min(cw, ch) * 0.22;
        const rotX = time * 0.55 + (localMouseY !== -1000 ? (localMouseY - cy) * 0.001 : 0);
        const rotY = time * 0.75 + (localMouseX !== -1000 ? (localMouseX - cx) * 0.001 : 0);

        // Proyección 3D de cada vértice
        const projected = baseVertices3D.map((v) => {
          let x1 = v.x * Math.cos(rotY) - v.z * Math.sin(rotY);
          let z1 = v.x * Math.sin(rotY) + v.z * Math.cos(rotY);
          let y2 = v.y * Math.cos(rotX) - z1 * Math.sin(rotX);
          let z2 = v.y * Math.sin(rotX) + z1 * Math.cos(rotX);
          const fov = 3.5;
          const p = fov / (fov + z2);
          return {
            x: cx + x1 * scale3D * p,
            y: cy + y2 * scale3D * p,
            z: z2,
            p: p,
            text: v.text
          };
        });

        // Dibujar aristas de la red 3D
        ctx.beginPath();
        edgesOctahedron.forEach(([i, j]) => {
          ctx.moveTo(projected[i].x, projected[i].y);
          ctx.lineTo(projected[j].x, projected[j].y);
        });
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Conectar cada vértice al centro con líneas de pulso
        projected.forEach((p) => {
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * p.p})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });

        // Dibujar nodos de texto EXACTAMENTE en los vértices 3D
        projected.forEach((p) => {
          const distMouse = Math.hypot(p.x - localMouseX, p.y - localMouseY);
          drawNodeBadge(p.x, p.y, p.text, distMouse < 100, Math.min(1.15, Math.max(0.85, p.p * 0.95)));
        });

      } else if (animType === 'redneuronal') {
        // 02. RED COMUNITARIA: LAS PALABRAS SON LOS NODOS DE LA MALLA
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -180 || p.x > 180) p.vx *= -1;
          if (p.y < -120 || p.y > 120) p.vy *= -1;
        });

        // Conectar los nodos entre sí con líneas elásticas
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const x1 = cx + p1.x;
            const y1 = cy + p1.y;
            const x2 = cx + p2.x;
            const y2 = cy + p2.y;
            const dist = Math.hypot(x1 - x2, y1 - y2);

            if (dist < 220) {
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.strokeStyle = `rgba(0, 229, 255, ${(1 - dist / 220) * 0.4})`;
              ctx.lineWidth = 1.2;
              ctx.stroke();
            }
          }
        }

        particles.forEach((p) => {
          const px = cx + p.x;
          const py = cy + p.y;
          const distMouse = Math.hypot(px - localMouseX, py - localMouseY);
          drawNodeBadge(px, py, p.text, distMouse < 100);
        });

      } else if (animType === 'lasersearch') {
        // 03. VIGILANCIA: LOS NODOS ESTÁN SOBRE LOS ANILLOS DEL RADAR
        const radius = Math.min(cw, ch) * 0.44;
        for (let r = 1; r <= 3; r++) {
          ctx.beginPath();
          ctx.arc(cx, cy, (radius / 3) * r, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(244, 63, 94, 0.2)';
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }

        const sweepAngle = time * 1.6;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, sweepAngle, sweepAngle + 0.5);
        ctx.closePath();
        const laserGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
        laserGrad.addColorStop(0, 'rgba(244, 63, 94, 0.4)');
        laserGrad.addColorStop(1, 'rgba(244, 63, 94, 0.0)');
        ctx.fillStyle = laserGrad;
        ctx.fill();

        particles.forEach((p, i) => {
          const ringRadius = (radius / 3) * (1 + (i % 3));
          const nodeAngle = (i / particles.length) * Math.PI * 2;
          const px = cx + Math.cos(nodeAngle) * ringRadius;
          const py = cy + Math.sin(nodeAngle) * ringRadius;

          // Rayo conector desde el centro
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = 'rgba(244, 63, 94, 0.15)';
          ctx.stroke();

          // Iluminar si el barrido del radar pasa cerca del ángulo
          const angleDiff = Math.abs((sweepAngle % (Math.PI * 2)) - (nodeAngle % (Math.PI * 2)));
          const isSwept = angleDiff < 0.3 || angleDiff > (Math.PI * 2 - 0.3);
          const distMouse = Math.hypot(px - localMouseX, py - localMouseY);

          drawNodeBadge(px, py, p.text, isSwept || distMouse < 100);
        });

      } else if (animType === 'nebulamemoria') {
        // 04. MEMORIA: LOS NODOS ORBITAN DENTRO DEL VÓRTICE DORADO
        particles.forEach((p, i) => {
          p.angle += p.speed;
          const px = cx + Math.cos(p.angle) * p.radius;
          const py = cy + Math.sin(p.angle) * (p.radius * 0.65);

          // Hilo estelar entre nodos sucesivos
          const nextP = particles[(i + 1) % particles.length];
          const npx = cx + Math.cos(nextP.angle) * nextP.radius;
          const npy = cy + Math.sin(nextP.angle) * (nextP.radius * 0.65);

          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(npx, npy);
          ctx.strokeStyle = 'rgba(255, 184, 0, 0.25)';
          ctx.lineWidth = 1;
          ctx.stroke();

          const distMouse = Math.hypot(px - localMouseX, py - localMouseY);
          drawNodeBadge(px, py, p.text, distMouse < 100);
        });

      } else if (animType === 'matrixflow') {
        // 05. MATRIZ: LOS NODOS ESTÁN FIJADOS EN LAS INTERSECCIONES DE LA CUADRÍCULA
        const step = 60;
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
        ctx.lineWidth = 1;
        for (let x = 0; x <= cw; x += step) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, ch); ctx.stroke();
        }
        for (let y = 0; y <= ch; y += step) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cw, y); ctx.stroke();
        }

        particles.forEach((p, i) => {
          const col = Math.floor(i % 3) - 1;
          const row = Math.floor(i / 3) === 0 ? -1 : 1;
          const px = cx + col * step * 2.2 + Math.sin(time + i) * 6;
          const py = cy + row * step * 1.5 + Math.cos(time + i) * 6;

          // Cruz vectorial en la intersección
          ctx.beginPath();
          ctx.moveTo(px - 15, py); ctx.lineTo(px + 15, py);
          ctx.moveTo(px, py - 15); ctx.lineTo(px, py + 15);
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
          ctx.stroke();

          const distMouse = Math.hypot(px - localMouseX, py - localMouseY);
          drawNodeBadge(px, py, p.text, distMouse < 100);
        });

      } else if (animType === 'anansi3dweb') {
        // 06. ANANSI: LOS NODOS ESTÁN TEJIDOS EN LOS ANILLOS DE LA TELARAÑA
        const spokes = 12;
        const rings = 6;
        const maxR = Math.min(cw, ch) * 0.48;

        ctx.strokeStyle = 'rgba(168, 85, 247, 0.25)';
        ctx.lineWidth = 1.2;
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

        particles.forEach((p, i) => {
          const ringIdx = (i % 3) + 2;
          const spokeIdx = (i * 2) % spokes;
          const ringR = (maxR / rings) * ringIdx;
          const ang = (spokeIdx * 2 * Math.PI) / spokes;
          const vib = Math.sin(time * 2.5 + ringIdx + spokeIdx) * 4;
          const px = cx + Math.cos(ang) * (ringR + vib);
          const py = cy + Math.sin(ang) * (ringR + vib);

          const distMouse = Math.hypot(px - localMouseX, py - localMouseY);
          drawNodeBadge(px, py, p.text, distMouse < 100);
        });

      } else if (animType === 'steganoglass') {
        // 07. SEGUNDA CAPA: LOS NODOS EMERGEN DENTRO DE LA CORTINA DE GLIFOS
        particles.forEach((p, i) => {
          p.y -= 0.6;
          if (p.y < -140) p.y = 140;

          const px = cx + p.x;
          const py = cy + p.y;
          const distMouse = Math.hypot(px - localMouseX, py - localMouseY);
          const isDecoded = distMouse < 140;

          // Hilo conector
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = isDecoded ? 'rgba(0, 240, 255, 0.4)' : 'rgba(192, 132, 252, 0.12)';
          ctx.stroke();

          drawNodeBadge(px, py, p.text, isDecoded);
        });

      } else if (animType === 'textileorigami') {
        // 08. ANGISAS: LOS NODOS ESTÁN EN LOS EXTREMOS DE LOS RAYOS TEXTILES
        const numRays = 40;
        const maxRadius = Math.min(cw, ch) * 0.72;

        for (let i = 0; i < numRays; i++) {
          const fraction = i / (numRays - 1);
          const angle = Math.PI * 0.15 + fraction * Math.PI * 0.7;
          const wave = Math.sin(time * 1.6 + i * 0.25) * 0.03;
          const finalAngle = angle + wave;
          const rayLen = maxRadius * (0.65 + Math.sin(time * 2 + i * 0.25) * 0.15);
          const ex = cx + Math.cos(finalAngle) * rayLen;
          const ey = cy + Math.sin(finalAngle) * rayLen;

          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(ex, ey);
          ctx.strokeStyle = i % 2 === 0 ? 'rgba(0, 240, 255, 0.14)' : 'rgba(255, 0, 127, 0.14)';
          ctx.stroke();
        }

        particles.forEach((p, i) => {
          const fraction = (i + 0.5) / particles.length;
          const angle = Math.PI * 0.18 + fraction * Math.PI * 0.64;
          const rayLen = maxRadius * 0.78;
          const px = cx + Math.cos(angle) * rayLen;
          const py = cy + Math.sin(angle) * rayLen;

          const distMouse = Math.hypot(px - localMouseX, py - localMouseY);
          drawNodeBadge(px, py, p.text, distMouse < 100);
        });

      } else if (animType === 'liquidriver') {
        // 09. RÍO: LOS NODOS FLOTAN DIRECTAMENTE SOBRE LAS OLAS DE AGUA
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
          ctx.strokeStyle = layer === 0 ? streamGrad : `rgba(0, 229, 255, ${0.3 - layer * 0.1})`;
          ctx.lineWidth = 2.2 - layer * 0.5;
          ctx.stroke();
        }

        particles.forEach((p, i) => {
          const normX = (i + 1) / (particles.length + 1);
          const px = cw * normX;
          const env = Math.sin(normX * Math.PI);
          const w1 = Math.sin(normX * 8 + time * 2.2) * (ch * 0.1);
          const w2 = Math.cos(normX * 14 - time * 1.5) * (ch * 0.04);
          const py = cy + (w1 + w2) * env;

          const distMouse = Math.hypot(px - localMouseX, py - localMouseY);
          drawNodeBadge(px, py, p.text, distMouse < 100);
        });

      } else if (animType === 'supernovasolar') {
        // 10. LIBERTAD: LOS NODOS ESTÁN EN LOS HACES DE LA RADIACIÓN SOLAR
        const solarGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, cw * 0.45);
        solarGlow.addColorStop(0, 'rgba(255, 184, 0, 0.28)');
        solarGlow.addColorStop(0.6, 'rgba(255, 0, 127, 0.06)');
        solarGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = solarGlow;
        ctx.fillRect(0, 0, cw, ch);

        const numRays = 36;
        for (let i = 0; i < numRays; i++) {
          const ang = (i * 2 * Math.PI) / numRays + time * 0.1;
          const len = 120 + Math.sin(time * 2.5 + i * 0.5) * 35;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(ang) * len, cy + Math.sin(ang) * len);
          ctx.strokeStyle = `rgba(255, 184, 0, ${0.16 + Math.sin(time * 2 + i) * 0.1})`;
          ctx.lineWidth = 1.3;
          ctx.stroke();
        }

        particles.forEach((p, i) => {
          const ang = (i * 2 * Math.PI) / particles.length + time * 0.1;
          const rayLen = 140 + Math.sin(time * 2 + i) * 20;
          const px = cx + Math.cos(ang) * rayLen;
          const py = cy + Math.sin(ang) * (rayLen * 0.7);

          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = 'rgba(255, 184, 0, 0.35)';
          ctx.lineWidth = 1.4;
          ctx.stroke();

          const distMouse = Math.hypot(px - localMouseX, py - localMouseY);
          drawNodeBadge(px, py, p.text, distMouse < 100);
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();
  }

  // ==========================================================================
  // INICIALIZACIÓN DE LAS 10 EXPERIENCIAS INTEGRIVAS
  // ==========================================================================
  initIntegratedAnimation(document.getElementById('canvasModulo01'), 'rgb(0, 240, 255)', 'artefacto3d');
  initIntegratedAnimation(document.getElementById('canvasModulo02'), 'rgb(0, 229, 255)', 'redneuronal');
  initIntegratedAnimation(document.getElementById('canvasModulo03'), 'rgb(244, 63, 94)', 'lasersearch');
  initIntegratedAnimation(document.getElementById('canvasModulo04'), 'rgb(255, 184, 0)', 'nebulamemoria');
  initIntegratedAnimation(document.getElementById('canvasModulo05'), 'rgb(0, 240, 255)', 'matrixflow');
  initIntegratedAnimation(document.getElementById('anansiWebCanvas'), 'rgb(168, 85, 247)', 'anansi3dweb');
  initIntegratedAnimation(document.getElementById('canvasModulo07'), 'rgb(192, 132, 252)', 'steganoglass');
  initIntegratedAnimation(document.getElementById('rayosCanvas'), 'rgb(255, 0, 127)', 'textileorigami');
  initIntegratedAnimation(document.getElementById('rioCanvas'), 'rgb(0, 229, 255)', 'liquidriver');
  initIntegratedAnimation(document.getElementById('cierreCanvas'), 'rgb(255, 184, 0)', 'supernovasolar');

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
