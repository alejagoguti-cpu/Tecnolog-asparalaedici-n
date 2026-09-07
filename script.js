/**
 * ==========================================================================
 * TECNOLOGÍAS PARA LA EDICIÓN — ALEJANDRA GÓMEZ GUTIÉRREZ
 * Lógica e interactividad para manuscrito semántico continuo y 5 módulos
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
  // 2. FONDO LUMÍNICO ADAPTATIVO EN 5 MÓDULOS CROMÁTICOS (#ambientCanvas)
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
      '01': { r: 0, g: 240, b: 255 },    // Módulo 01: Cyan
      '02': { r: 168, g: 85, b: 247 },   // Módulo 02: Anansi (Violeta)
      '03': { r: 255, g: 0, b: 127 },    // Módulo 03: Angisas (Magenta)
      '04': { r: 0, g: 229, b: 255 },    // Módulo 04: Río (Turquesa fluvial)
      '05': { r: 255, g: 184, b: 0 }     // Módulo 05: Reflexión y libertad (Dorado solar)
    };

    let currentRGB = { r: 0, g: 240, b: 255 };
    let targetRGB = { r: 0, g: 240, b: 255 };

    const sections = document.querySelectorAll('saludo, modulo');

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const secId = entry.target.getAttribute('data-seccion') || '00';
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
      grad1.addColorStop(0, `rgba(${Math.round(currentRGB.r)}, ${Math.round(currentRGB.g)}, ${Math.round(currentRGB.b)}, 0.12)`);
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);

      const orb2X = w * (0.8 - Math.sin(time * 0.35) * 0.12);
      const orb2Y = h * (0.65 + Math.sin(time * 0.4) * 0.1);
      const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 40, orb2X, orb2Y, w * 0.48);
      grad2.addColorStop(0, `rgba(${Math.round(255 - currentRGB.r * 0.2)}, ${Math.round(currentRGB.g * 0.4)}, ${Math.round(255 - currentRGB.b * 0.1)}, 0.06)`);
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      time += 0.015;
      requestAnimationFrame(drawAmbient);
    }
    drawAmbient();
  }

  // ==========================================================================
  // 3. CANVASES DE LOS 5 MÓDULOS
  // ==========================================================================

  // --- MÓDULO 01: ESCANEO AMBIENTAL Y ENCUADRE (#canvasModulo01) ---
  const canvas01 = document.getElementById('canvasModulo01');
  if (canvas01) {
    const ctx = canvas01.getContext('2d');
    let t = 0;
    function draw01() {
      const rect = canvas01.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width;
      const h = rect.height;

      if (canvas01.width !== Math.floor(w * dpr) || canvas01.height !== Math.floor(h * dpr)) {
        canvas01.width = Math.floor(w * dpr);
        canvas01.height = Math.floor(h * dpr);
        ctx.scale(dpr, dpr);
      }
      ctx.clearRect(0, 0, w, h);
      t += 0.02;

      const cx = w * 0.5;
      const cy = h * 0.5;
      for (let r = 50; r <= 220; r += 40) {
        ctx.beginPath();
        ctx.arc(cx, cy, r + Math.sin(t * 1.5 + r) * 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 + 0.12 * Math.sin(t + r)})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      requestAnimationFrame(draw01);
    }
    draw01();
  }

  // --- MÓDULO 02: TELARAÑA FRACTAL DE ANANSI (#anansiWebCanvas) ---
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
      const centerY = h * 0.35;
      const maxR = Math.min(w, h) * 0.65;
      const spokes = 12;
      const rings = 7;

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
        wctx.lineWidth = 1.3;
        wctx.shadowColor = '#d946ef';
        wctx.shadowBlur = 8;
        wctx.stroke();
        wctx.restore();
      }

      requestAnimationFrame(drawAnansiWeb);
    }
    drawAnansiWeb();
  }

  // --- MÓDULO 03: RAYOS TEXTILES DE ANGISAS (#rayosCanvas) ---
  const rayosCanvas = document.getElementById('rayosCanvas');
  if (rayosCanvas) {
    const rctx = rayosCanvas.getContext('2d');
    let rayTime = 0;
    const numRays = 48;

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
      const originY = h * 0.2;
      const maxRadius = Math.min(w, h) * 0.8;

      for (let i = 0; i < numRays; i++) {
        const fraction = i / (numRays - 1);
        const angle = Math.PI * 0.15 + fraction * Math.PI * 0.7;
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

  // --- MÓDULO 04: ESPECTROGRAMA FLUVIAL DEL RÍO (#rioCanvas) ---
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

      const midY = h * 0.45;
      const streamGrad = ctx.createLinearGradient(0, 0, w, 0);
      streamGrad.addColorStop(0.0, '#00e5ff');
      streamGrad.addColorStop(0.5, '#38bdf8');
      streamGrad.addColorStop(1.0, '#ffb800');

      function getWave(x, phase, amplitude) {
        const normX = x / w;
        const env = Math.sin(normX * Math.PI);
        const w1 = Math.sin(normX * 8 + time * 2.0 + phase) * (h * 0.12 * amplitude);
        const w2 = Math.cos(normX * 14 - time * 1.2) * (h * 0.05 * amplitude);
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
      ctx.shadowColor = 'rgba(0, 229, 255, 0.7)';
      ctx.shadowBlur = 14;
      ctx.stroke();
      ctx.restore();

      requestAnimationFrame(drawRio);
    }
    drawRio();
  }

  // --- MÓDULO 05: CONSTELACIÓN SOLAR DE LA LIBERTAD (#cierreCanvas) ---
  const cierreCanvas = document.getElementById('cierreCanvas');
  if (cierreCanvas) {
    const ctx = cierreCanvas.getContext('2d');
    let time = 0;
    const numSolarRays = 36;

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

      const solarGlow = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, w * 0.4);
      solarGlow.addColorStop(0, 'rgba(255, 184, 0, 0.18)');
      solarGlow.addColorStop(0.6, 'rgba(255, 0, 127, 0.06)');
      solarGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = solarGlow;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < numSolarRays; i++) {
        const angle = (i * 2 * Math.PI) / numSolarRays + time * 0.15;
        const length = 110 + Math.sin(time * 3 + i * 0.5) * 30;
        const ex = centerX + Math.cos(angle) * length;
        const ey = centerY + Math.sin(angle) * length;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = `rgba(255, 184, 0, ${0.1 + Math.sin(time + i) * 0.08})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();
        ctx.restore();
      }

      requestAnimationFrame(drawCierre);
    }
    drawCierre();
  }

  // ==========================================================================
  // 4. INTERACTIVIDAD DE CLIC PARA ELEMENTOS REVELABLES
  // ==========================================================================
  const interactiveElements = document.querySelectorAll('secreto, alerta, resistencia, concepto');
  interactiveElements.forEach((el) => {
    el.addEventListener('click', () => {
      el.classList.toggle('activo');
    });
  });

  // ==========================================================================
  // 5. SÍNTESIS DE VOZ Y TRANSMISIÓN DE AUDIO (#voz)
  // ==========================================================================
  const closingNarrative =
    'Después de hacer este ejercicio, creo que lo que más cambió para mí fue la forma de entender qué significa realmente diseñar tecnología. Antes pensaba en la tecnología como algo que nosotros utilizamos. Ahora pienso que también puede ser algo que construimos cuando tenemos una necesidad y buscamos una manera de responder a ella. El fotoensayo me hizo pensar que muchas veces llamamos tecnología únicamente a aquello que reconocemos como moderno: una pantalla, un computador, un programa. Pero al mirar estas historias, me di cuenta de que también hubo tecnología en la manera en que una comunidad utilizó una historia para ocultar un mensaje, una tela para comunicarse en silencio o una canción para mantener un vínculo. Y creo que ahí está mi principal reflexión: la tecnología no está necesariamente en el objeto, sino en la relación que construimos con él y en la capacidad que tenemos de transformarlo según lo que necesitamos. Eso también cambió mi manera de mirar mi propia página. Al principio pensaba que simplemente estaba haciendo una traducción del fotoensayo a un formato digital. Pero durante el proceso entendí que realmente estaba intentando hacer lo mismo que hicieron esas comunidades: tomar un medio disponible y encontrar una manera diferente de utilizarlo para comunicar algo. Por eso, para mí, esta entrega no se trata solamente de hacer una página web sobre tres tecnologías del fotoensayo. Se trata de entender que diseñar también puede ser encontrar nuevas formas de comunicar cuando las formas tradicionales no son suficientes. Y quizás por eso la tecnología ha existido mucho antes de las pantallas: porque antes de existir los dispositivos ya existía la necesidad humana de comunicarse, organizarse, protegerse y encontrar formas de ser libres. Muchas gracias.';

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
    utterance.rate = 0.9;
    utterance.pitch = 0.95;

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
