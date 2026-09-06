/**
 * TECNOLOGÍAS DEL SECRETO — INTERACTIVIDAD DEL ENSAYO
 * Dinámica visual, oscilación acústica y sintetizador narrativo
 */

// 1. Seguimiento fluido de luminiscencia del cursor
const glow = document.querySelector('cursor-luminiscencia, .cursor-glow');
if (glow) {
  window.addEventListener('pointermove', (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
}

// 2. Simulación de ondas acústicas en el lienzo del río
const riverContainer = document.querySelector('#riverCanvas');
if (riverContainer) {
  let canvas = riverContainer.tagName.toLowerCase() === 'canvas' ? riverContainer : riverContainer.querySelector('canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    riverContainer.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');
  let ripple = 0;
  let soundActive = false;

  function drawRiver() {
    const r = riverContainer.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    // Ajuste dinámico de resolución de pantalla
    if (canvas.width !== Math.floor(r.width * dpr) || canvas.height !== Math.floor(r.height * dpr)) {
      canvas.width = Math.floor(r.width * dpr);
      canvas.height = Math.floor(r.height * dpr);
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, r.width, r.height);

    for (let row = 0; row < 7; row++) {
      ctx.beginPath();
      for (let x = 0; x <= r.width; x += 10) {
        const y =
          r.height * 0.45 +
          row * 24 +
          Math.sin(x * 0.015 + ripple + row * 0.8) * (8 + row * 1.5) +
          Math.sin(x * 0.035 - ripple * 0.6) * 5;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = `rgba(${soundActive ? '215, 255, 56' : '145, 167, 164'}, ${0.15 + row * 0.04})`;
      ctx.lineWidth = soundActive ? 1.5 : 1;
      ctx.stroke();
    }

    ripple += soundActive ? 0.06 : 0.02;
    requestAnimationFrame(drawRiver);
  }

  drawRiver();

  // Control de atmósfera sonora
  const soundToggle = document.querySelector('#soundToggle');
  let audioCtx = null;
  let oscillator = null;
  let gainNode = null;

  function toggleAudio() {
    soundActive = !soundActive;
    soundToggle.setAttribute('aria-pressed', soundActive.toString());
    const label = soundToggle.querySelector('estado-sonido') || soundToggle.querySelector('strong') || soundToggle.querySelector('span');
    if (label) {
      label.textContent = soundActive ? 'ON' : 'OFF';
    }

    if (soundActive) {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioCtx = new AudioContextClass();
          oscillator = audioCtx.createOscillator();
          gainNode = audioCtx.createGain();

          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(108, audioCtx.currentTime); // Tono grave y místico (A2)
          
          gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + 1.5);

          oscillator.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          oscillator.start();
        }
      } catch (err) {
        console.warn('AudioContext no disponible:', err);
      }
    } else {
      if (gainNode && audioCtx) {
        try {
          gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
          setTimeout(() => {
            if (oscillator) oscillator.stop();
            if (audioCtx) audioCtx.close();
          }, 500);
        } catch (e) {
          // cleanup
        }
      }
    }
  }

  if (soundToggle) {
    soundToggle.addEventListener('click', toggleAudio);
    soundToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleAudio();
      }
    });
  }
}

// 3. Sintetizador de voz para el cierre del ensayo
const closingNarrative =
  'La tecnología no empezó con internet ni con las pantallas. Ha existido siempre en el ingenio de las personas para organizarse, resistir y ser libres con lo que tienen a la mano. La verdadera innovación radica en proteger la dignidad y la vida. Muchas gracias.';

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

const voiceBtn1 = document.querySelector('#voiceButton');
const voiceBtn2 = document.querySelector('#voiceButtonText');

function bindVoiceButton(btn) {
  if (!btn) return;
  btn.addEventListener('click', speakClosing);
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      speakClosing();
    }
  });
}

bindVoiceButton(voiceBtn1);
bindVoiceButton(voiceBtn2);

