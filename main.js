let sides = 3;          // ready to use values
let stroke = 'white'    // ready to use values
let lastTap = 0;
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const pct = 2/3  // amount of screen used
const SIDES_ALLOWED = Array.from(new Array(12), (_,i) => i%8+1) //[1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4] higher weight of simpler shapes plus cross

canvas.addEventListener('click', handleClick)
canvas.addEventListener('touchend', handleClick)
window.addEventListener('resize', draw);

window.onload = () => {
    draw();
  }


function handleClick(e) {
    if (e.type === 'touchend') {
        e.preventDefault();
        goFullScreen()

        /*currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
            exitFullscreen();
        }
        lastTap = currentTime;*/
    } else if (e.type === 'click') {
        //goFullScreen();
        if (e.detail===2) goFullScreen()
    }
    draw();
}

function goFullScreen() {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Safari
            document.documentElement.webkitRequestFullscreen();
        }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { // Safari
        document.webkitExitFullscreen();
    }
}

function toggleFullScreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) goFullScreen();
    else exitFullscreen();
}
  

function drawPolygon(ctx, x, y, radius, _sides, startAngle = 0, strokeStyle = stroke, fillStyle = 'transparent') {
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.fillStyle = fillStyle;
    ctx.lineWidth = 2

    if (_sides===1) { // circle is the 1 side
        ctx.arc(x, y, radius, 0, 2*Math.PI)
    }
    else if (_sides===2){ // cross is the 2 sides
        ctx.moveTo(x-radius, y)
        ctx.lineTo(x+radius, y)
        ctx.moveTo(x, y-radius)
        ctx.lineTo(x, y+radius)
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
        //console.log(sides, stroke) // show color in case user wants to save it
    }
    requestAnimationFrame(ddraw)
  }


  function ddraw() {
    resizeCanvas()

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