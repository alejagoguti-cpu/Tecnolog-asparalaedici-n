/**
 * TECNOLOGÍAS DEL SECRETO — INTERACTIVIDAD DEL ENSAYO
 */

// 1. Simulación de ondas en el río
const riverContainer = document.querySelector('#riverCanvas');
if (riverContainer) {
  let canvas = riverContainer.tagName.toLowerCase() === 'canvas' ? riverContainer : riverContainer.querySelector('canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    riverContainer.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');
  let ripple = 0;

  function drawRiver() {
    const r = riverContainer.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    if (canvas.width !== Math.floor(r.width * dpr) || canvas.height !== Math.floor(r.height * dpr)) {
      canvas.width = Math.floor(r.width * dpr);
      canvas.height = Math.floor(r.height * dpr);
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, r.width, r.height);

    for (let row = 0; row < 5; row++) {
      ctx.beginPath();
      for (let x = 0; x <= r.width; x += 10) {
        const y =
          r.height * 0.45 +
          row * 16 +
          Math.sin(x * 0.02 + ripple + row * 0.8) * (6 + row * 1.2) +
          Math.sin(x * 0.04 - ripple * 0.5) * 4;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = `rgba(145, 167, 164, ${0.2 + row * 0.08})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ripple += 0.03;
    requestAnimationFrame(drawRiver);
  }

  drawRiver();
}

// 2. Sintetizador de voz para el cierre del ensayo
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
  utterance.pitch = 0.88;

  window.speechSynthesis.speak(utterance);
}

const voiceTrigger = document.querySelector('#voiceTrigger');
if (voiceTrigger) {
  voiceTrigger.addEventListener('click', speakClosing);
  voiceTrigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      speakClosing();
    }
  });
}

