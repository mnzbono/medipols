let sides = 3;
let stroke = 'white'
const canvas = document.getElementById('myCanvas');
const pct = 2/3
let lastTap = 0;
const SIDES_ALLOWED = [1, 3, 4, 5, 6, 7, 8]

canvas.addEventListener('click', handleClick)
canvas.addEventListener('touchend', handleClick)

window.addEventListener('resize', draw);

window.onload = () => {
    draw();
  }


function handleClick(e) {
    if (e.type === 'touchend') {
        e.preventDefault();
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
            toggleFullScreen();
        }
        lastTap = currentTime;
    } else if (e.type === 'click' && e.detail === 2) {
        toggleFullScreen();
    }


    draw();
}

function toggleFullScreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Safari
            document.documentElement.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // Safari
            document.webkitExitFullscreen();
        }
    }
}
  

function drawPolygon(ctx, x, y, radius, _sides, startAngle = 0, strokeStyle = stroke, fillStyle = 'transparent') {
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.fillStyle = fillStyle;
    ctx.lineWidth = 2

    if (_sides===1) {
        ctx.arc(x, y, radius, 0, 2*Math.PI)
    }
    else {
        for (let i = 0; i < _sides; i++) {
            const angle = startAngle + (i * 2 * Math.PI / _sides);
            const pointX = x + radius * Math.cos(angle);
            const pointY = y + radius * Math.sin(angle);
            if (i === 0) {  ctx.moveTo(pointX, pointY); }
            else {  ctx.lineTo(pointX, pointY);  }
        }
    }
  
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function draw(randomized = true) {
    if (randomized) {
        sides = SIDES_ALLOWED[Math.floor(Math.random() * SIDES_ALLOWED.length)] ;
        stroke = getRandomColor();
        console.log(sides, stroke)
    }
    requestAnimationFrame(ddraw)
  }


  function ddraw() {
    resizeCanvas()
    const ctx = canvas.getContext('2d');

    const centerX = (window.innerWidth) /2;
    const centerY = (window.innerHeight) /2;
    const radius = Math.min(centerX, centerY) * pct

    drawPolygon(ctx, centerX, centerY, radius, sides, .5*Math.PI-(Math.PI / sides))
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }


  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }