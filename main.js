let sides = 3;
let stroke = 'white'
const canvas = document.getElementById('myCanvas');
const pct = 2/3


window.addEventListener('click', (e)=>{
    if (e.detail===2) toggleFullScreen()
    sides = Math.floor( Math.random() * (12 - 3 + 1)) + 3;
    draw()
})

window.addEventListener('resize', draw);

window.onload = () => {
    draw();
  }

  
function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
  

function drawPolygon(ctx, x, y, radius, sides, startAngle = 0, strokeStyle = 'black', fillStyle = 'transparent') {
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.fillStyle = fillStyle;
  
    for (let i = 0; i < sides; i++) {
      const angle = startAngle + (i * 2 * Math.PI / sides);
      const pointX = x + radius * Math.cos(angle);
      const pointY = y + radius * Math.sin(angle);
      if (i === 0) {  ctx.moveTo(pointX, pointY); }
      else {  ctx.lineTo(pointX, pointY);  }
    }
  
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function draw() {
    requestAnimationFrame(ddraw())
  }


  function ddraw() {
    resizeCanvas()
    const ctx = canvas.getContext('2d');

    const centerX = (window.innerWidth) /2;
    const centerY = (window.innerHeight) /2;
    const radius = Math.min(centerX, centerY) * pct

    drawPolygon(ctx, centerX, centerY, radius, sides, .5*Math.PI-(Math.PI / sides), stroke)
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }


  