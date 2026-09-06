/* ACOTACIÓN: La página no entrega el secreto de golpe. Cada gesto del lector altera la señal. */
const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => { glow.style.left = `${event.clientX}px`; glow.style.top = `${event.clientY}px`; });

/* ACOTACIÓN: Onda-río — el agua es el cable y responde al movimiento del visitante. */
const canvas = document.querySelector('#riverCanvas');
const ctx = canvas.getContext('2d');
let ripple = 0, soundOn = false;
function drawRiver(){
  const r = canvas.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
  canvas.width = r.width * dpr; canvas.height = r.height * dpr; ctx.scale(dpr,dpr); ctx.clearRect(0,0,r.width,r.height);
  for(let row=0; row<9; row++){
    ctx.beginPath();
    for(let x=0; x<=r.width; x+=8){
      const y = r.height*.48 + row*43 + Math.sin(x*.014+ripple+row)* (10+row*2) + Math.sin(x*.033-ripple*.7)*7;
      x ? ctx.lineTo(x,y) : ctx.moveTo(x,y);
    }
    ctx.strokeStyle = `rgba(${soundOn?'215,255,56':'145,167,164'},${.12+row*.025})`; ctx.lineWidth=1; ctx.stroke();
  }
  ripple += soundOn ? .085 : .025; requestAnimationFrame(drawRiver);
}
drawRiver();

/* ACOTACIÓN: La voz final es una guía provisional del navegador. Puede reemplazarse por una grabación propia. */
const closing = 'La tecnología no empezó con internet ni con las pantallas. Ha existido siempre en el ingenio de las personas para organizarse, resistir y ser libres con lo que tienen a la mano. Muchas gracias.';
function speakClosing(){
  if(!('speechSynthesis' in window)) return;
  speechSynthesis.cancel(); const voice = new SpeechSynthesisUtterance(closing);
  voice.lang='es-CO'; voice.rate=.84; voice.pitch=.84; speechSynthesis.speak(voice);
}
document.querySelector('#voiceButton').addEventListener('click',speakClosing);
document.querySelector('#voiceButtonText').addEventListener('click',speakClosing);
document.querySelector('#soundToggle').addEventListener('click',(e)=>{soundOn=!soundOn;e.currentTarget.setAttribute('aria-pressed',soundOn);e.currentTarget.querySelector('span').textContent=soundOn?'ON':'OFF';});
