/**
 * ==========================================================================
 * TECNOLOGÍAS PARA LA EDICIÓN — ALEJANDRA GÓMEZ GUTIÉRREZ
 * Motor Generativo 3D Unificado: Nodos Integrados en Geometrías Vivas
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
  // 4. MOTOR 3D GENERATIVO: CADA MÓDULO TIENE SU GEOMETRÍA 3D VIVA
  // ==========================================================================

  function init3DIntegratedAnimation(canvas, themeColor, geometryType) {
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

    // INTERSECTION OBSERVER: Pausa cuando está fuera del viewport
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
    // DEFINICIÓN DE GEOMETRÍAS 3D ÚNICAS POR MÓDULO (VÉRTICES Y ARISTAS)
    // ========================================================================
    let baseVertices3D = [];
    let edges3D = [];

    if (geometryType === 'octahedron') {
      // 01. Octaedro / Artefacto 3D
      baseVertices3D = [
        { x: 0, y: -1.4, z: 0 }, { x: 1.4, y: 0, z: 0 }, { x: 0, y: 0, z: 1.4 },
        { x: -1.4, y: 0, z: 0 }, { x: 0, y: 0, z: -1.4 }, { x: 0, y: 1.4, z: 0 }
      ];
      edges3D = [
        [0,1],[0,2],[0,3],[0,4],[5,1],[5,2],[5,3],[5,4],[1,2],[2,3],[3,4],[4,1]
      ];

    } else if (geometryType === 'geodesic') {
      // 02. Red Geodésica / Icosaedro Comunitario
      const tVal = (1 + Math.sqrt(5)) / 2 * 0.8;
      baseVertices3D = [
        { x: -0.8, y: tVal, z: 0 }, { x: 0.8, y: tVal, z: 0 }, { x: -0.8, y: -tVal, z: 0 },
        { x: 0.8, y: -tVal, z: 0 }, { x: 0, y: -0.8, z: tVal }, { x: 0, y: 0.8, z: tVal }
      ];
      edges3D = [
        [0,1],[0,5],[1,5],[2,3],[2,4],[3,4],[0,4],[1,4],[2,5],[3,5],[0,2],[1,3]
      ];

    } else if (geometryType === 'cylinder') {
      // 03. Cilindro / Jaula Radar de Vigilancia
      baseVertices3D = [
        { x: -1.1, y: -0.9, z: 0.6 }, { x: 1.1, y: -0.9, z: 0.6 }, { x: 0, y: -0.9, z: -1.2 },
        { x: -1.1, y: 0.9, z: 0.6 }, { x: 1.1, y: 0.9, z: 0.6 }, { x: 0, y: 0.9, z: -1.2 }
      ];
      edges3D = [
        [0,1],[1,2],[2,0],[3,4],[4,5],[5,3],[0,3],[1,4],[2,5],[0,4],[1,5],[2,3]
      ];

    } else if (geometryType === 'helix') {
      // 04. Doble Hélice / Espiral de Memoria
      baseVertices3D = [
        { x: -1.3, y: -1.2, z: 0.8 }, { x: 1.3, y: -0.7, z: -0.8 },
        { x: -1.1, y: -0.2, z: -0.8 }, { x: 1.1, y: 0.3, z: 0.8 },
        { x: -1.3, y: 0.8, z: 0.8 }, { x: 1.3, y: 1.3, z: -0.8 }
      ];
      edges3D = [
        [0,2],[2,4],[1,3],[3,5],[0,1],[2,3],[4,5],[0,3],[2,5]
      ];

    } else if (geometryType === 'hypercube') {
      // 05. Hipercubo / Matriz Tesseract
      baseVertices3D = [
        { x: -1.0, y: -1.0, z: 1.0 }, { x: 1.0, y: -1.0, z: 1.0 },
        { x: 1.0, y: 1.0, z: 1.0 }, { x: -1.0, y: 1.0, z: 1.0 },
        { x: 0, y: -1.5, z: -1.0 }, { x: 0, y: 1.5, z: -1.0 }
      ];
      edges3D = [
        [0,1],[1,2],[2,3],[3,0],[4,0],[4,1],[5,2],[5,3],[4,5],[0,2],[1,3]
      ];

    } else if (geometryType === 'spiderdome') {
      // 06. Cúpula Fractal / Telaraña de Anansi 3D
      baseVertices3D = [
        { x: 0, y: -1.5, z: 0.4 }, { x: 1.3, y: -0.6, z: -0.3 }, { x: 1.3, y: 0.6, z: 0.4 },
        { x: 0, y: 1.5, z: -0.3 }, { x: -1.3, y: 0.6, z: 0.4 }, { x: -1.3, y: -0.6, z: -0.3 }
      ];
      edges3D = [
        [0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,2],[2,4],[4,0],[1,3],[3,5],[5,1]
      ];

    } else if (geometryType === 'prism') {
      // 07. Prisma Criptográfico / Bipirámide Hexagonal
      baseVertices3D = [
        { x: 0, y: -1.6, z: 0 }, { x: 1.2, y: -0.4, z: 0.7 }, { x: 0.8, y: 0.8, z: 0.7 },
        { x: 0, y: 1.6, z: 0 }, { x: -0.8, y: 0.8, z: -0.7 }, { x: -1.2, y: -0.4, z: -0.7 }
      ];
      edges3D = [
        [0,1],[0,2],[0,4],[0,5],[3,1],[3,2],[3,4],[3,5],[1,2],[2,3],[4,5],[5,1]
      ];

    } else if (geometryType === 'origamifold') {
      // 08. Telar de Origami Textil 3D (Angisas)
      baseVertices3D = [
        { x: -1.4, y: -1.0, z: 0.6 }, { x: 0, y: -1.4, z: -0.7 }, { x: 1.4, y: -1.0, z: 0.6 },
        { x: 1.4, y: 1.0, z: -0.6 }, { x: 0, y: 1.4, z: 0.7 }, { x: -1.4, y: 1.0, z: -0.6 }
      ];
      edges3D = [
        [0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[1,4],[0,3],[2,5],[0,4],[2,4]
      ];

    } else if (geometryType === 'waveribbon') {
      // 09. Cinta Ondulante / Río Fluvial 3D
      baseVertices3D = [
        { x: -1.5, y: -0.6, z: 0.7 }, { x: -0.9, y: 0.6, z: -0.7 },
        { x: -0.3, y: -0.6, z: 0.7 }, { x: 0.3, y: 0.6, z: -0.7 },
        { x: 0.9, y: -0.6, z: 0.7 }, { x: 1.5, y: 0.6, z: -0.7 }
      ];
      edges3D = [
        [0,1],[1,2],[2,3],[3,4],[4,5],[0,2],[2,4],[1,3],[3,5],[0,3],[2,5]
      ];

    } else if (geometryType === 'astrolabe') {
      // 10. Astrolabio Solar / Giroscopio de Libertad 3D
      baseVertices3D = [
        { x: 0, y: -1.5, z: 0 }, { x: 1.5, y: 0, z: 0 }, { x: 0, y: 0, z: 1.5 },
        { x: -1.5, y: 0, z: 0 }, { x: 0, y: 0, z: -1.5 }, { x: 0, y: 1.5, z: 0 }
      ];
      edges3D = [
        [0,1],[0,2],[0,3],[0,4],[5,1],[5,2],[5,3],[5,4],[1,2],[2,3],[3,4],[4,1],[0,5],[1,3],[2,4]
      ];
    }

    // Función de renderizado de la pastilla integrada directamente en el vértice
    function drawVertexBadge(x, y, text, isHovered, scale = 1) {
      ctx.save();
      ctx.font = `600 ${Math.max(10, Math.round(12.5 * scale))}px "DM Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const metrics = ctx.measureText(text);
      const padX = 10 * scale;
      const padY = 5 * scale;
      const bw = (metrics.width + padX * 2);
      const bh = 22 * scale;

      // Caja de la pastilla
      ctx.beginPath();
      ctx.roundRect(x - bw / 2, y - bh / 2, bw, bh, 11 * scale);
      ctx.fillStyle = isHovered ? 'rgba(255, 255, 255, 0.98)' : 'rgba(3, 8, 20, 0.92)';
      ctx.fill();

      ctx.strokeStyle = isHovered ? '#ffffff' : themeColor;
      ctx.lineWidth = isHovered ? 2 * scale : 1.2 * scale;
      ctx.stroke();

      // Vértice ancla luminoso
      ctx.beginPath();
      ctx.arc(x, y - bh / 2 - 3 * scale, 2.5 * scale, 0, Math.PI * 2);
      ctx.fillStyle = isHovered ? '#ffffff' : themeColor;
      ctx.fill();

      // Texto
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

      // Escala 3D proporcional
      const scale3D = Math.min(cw, ch) * 0.22;
      const rotX = time * 0.55 + (localMouseY !== -1000 ? (localMouseY - cy) * 0.001 : 0);
      const rotY = time * 0.75 + (localMouseX !== -1000 ? (localMouseX - cx) * 0.001 : 0);

      // Proyección 3D de los vértices
      const projected = baseVertices3D.map((v, i) => {
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
          text: conceptList[i] || `Nodo ${i+1}`
        };
      });

      // Dibujar aristas de la red 3D
      ctx.beginPath();
      edges3D.forEach(([i, j]) => {
        if (projected[i] && projected[j]) {
          ctx.moveTo(projected[i].x, projected[i].y);
          ctx.lineTo(projected[j].x, projected[j].y);
        }
      });
      ctx.strokeStyle = themeColor.replace('rgb', 'rgba').replace(')', ', 0.45)');
      ctx.lineWidth = 1.3;
      ctx.stroke();

      // Rayos conectores desde el núcleo central
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = themeColor.replace('rgb', 'rgba').replace(')', `, ${0.12 * p.p})`);
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Dibujar los nodos de texto EXACTAMENTE en los vértices 3D
      projected.forEach((p) => {
        const distMouse = Math.hypot(p.x - localMouseX, p.y - localMouseY);
        drawVertexBadge(p.x, p.y, p.text, distMouse < 100, Math.min(1.15, Math.max(0.85, p.p * 0.95)));
      });

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();
  }

  // ==========================================================================
  // INICIALIZACIÓN DE LAS 10 GEOMETRÍAS 3D VIVAS
  // ==========================================================================
  init3DIntegratedAnimation(document.getElementById('canvasModulo01'), 'rgb(0, 240, 255)', 'octahedron');
  init3DIntegratedAnimation(document.getElementById('canvasModulo02'), 'rgb(0, 229, 255)', 'geodesic');
  init3DIntegratedAnimation(document.getElementById('canvasModulo03'), 'rgb(244, 63, 94)', 'cylinder');
  init3DIntegratedAnimation(document.getElementById('canvasModulo04'), 'rgb(255, 184, 0)', 'helix');
  init3DIntegratedAnimation(document.getElementById('canvasModulo05'), 'rgb(0, 240, 255)', 'hypercube');
  init3DIntegratedAnimation(document.getElementById('anansiWebCanvas'), 'rgb(168, 85, 247)', 'spiderdome');
  init3DIntegratedAnimation(document.getElementById('canvasModulo07'), 'rgb(192, 132, 252)', 'prism');
  init3DIntegratedAnimation(document.getElementById('rayosCanvas'), 'rgb(255, 0, 127)', 'origamifold');
  init3DIntegratedAnimation(document.getElementById('rioCanvas'), 'rgb(0, 229, 255)', 'waveribbon');
  init3DIntegratedAnimation(document.getElementById('cierreCanvas'), 'rgb(255, 184, 0)', 'astrolabe');

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
