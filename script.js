let target = 0;
let targetCnt = 0;
let targetList = [2, 0, 1, 3];
let scale = 0.5;
var x_step = 100 * scale + 20, y_step = 100 * scale + 20;
const start = Date.now();
let last = 0;
let speed = 1;
let translate = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function draw() {
    var canvas = document.getElementById('tutorial');
    canvas.width = window.innerWidth + 4 * x_step;
    canvas.height = window.innerHeight + 4 * y_step;
    if (canvas.getContext) {
        requestAnimationFrame(drawCanvas);
    }
}

async function drawCanvas() {
    let now = Date.now();
    let timeInSec = (now - start) / 1000;
    if (timeInSec > last + speed) {
        last = timeInSec;
        switchTarget();
    }
    var canvas = document.getElementById('tutorial');
    var ctx = canvas.getContext('2d');
    ctx.translate(-1, -1);
    translate += 1;
    if (translate >= 4 * x_step) {
        translate = 0;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var x, y, pos_x, pos_y, pattern;
    for (x = 0; (x - 1) * x_step <= canvas.width; x++) {
        for (y = 0; (y - 1) * y_step <= canvas.width; y++) {
            pos_x = x * x_step;
            pos_y = y * y_step;
            pattern = (x + y) % 4;
            var trans = target == pattern ? 0.25 : 0.08;
            if (pattern == 0) {
                drawSquare(ctx, pos_x, pos_y, 48 * scale, 0.6, "rgba(242,160,75," + trans + ")")
            } else if (pattern == 1) {
                drawCross(ctx, pos_x, pos_y, 42 * scale, 20 * scale, "rgba(73,179,231," + trans + ")")
            } else if (pattern == 2) {
                drawTriangle(ctx, pos_x, pos_y, 46 * scale, 0.4, "rgba(246,166,207," + trans + ")")
            } else if (pattern == 3) {
                drawCircle(ctx, pos_x, pos_y, 49 * scale, 0.6, "rgba(203,137,228," + trans + ")")
            }
        }
    }
    await sleep(50);
    requestAnimationFrame(drawCanvas);
}

function switchTarget() {
    targetCnt = (targetCnt + 1) % 4;
    target = targetList[targetCnt];
}

function resizeCanvas() {
    var canvas = document.getElementById('tutorial');
    canvas.width = window.innerWidth + 4 * x_step;
    canvas.height = window.innerHeight + 4 * y_step;
}

function drawTriangle(ctx, x, y, size, inner_ratio, color) {
    // draw outer triangle
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + size * 1.1547, y + size);
    ctx.lineTo(x - size * 1.1547, y + size);
    ctx.lineTo(x, y - size);
    ctx.fill();
    // draw inner triangle
    ctx.beginPath();
    ctx.fillStyle = "white";
    y += 0.3333 * size;
    size *= inner_ratio;
    ctx.moveTo(x + size * 1.1547, y + size * 0.6667);
    ctx.lineTo(x - size * 1.1547, y + size * 0.6667);
    ctx.lineTo(x, y - size * 1.3333);
    ctx.fill();
}

function drawSquare(ctx, x, y, size, inner_ratio, color) {
    // draw outer Rect
    ctx.fillStyle = color;
    ctx.fillRect(x - size, y - size, size * 2, size * 2);
    // draw inner Rect
    ctx.fillStyle = "white";
    size *= inner_ratio;
    ctx.fillRect(x - size, y - size, size * 2, size * 2);
}

function drawCircle(ctx, x, y, radius, inner_ratio, color) {
    // draw outer circle
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    // draw inner circle
    ctx.fillStyle = "white";
    ctx.beginPath();
    radius *= inner_ratio;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}

function drawCross(ctx, x, y, len, lineWidth, color) {
    // draw '/' part of the cross
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x - len, y - len);
    ctx.lineTo(x + len, y + len);
    // draw '\' part of the cross
    ctx.moveTo(x + len, y - len);
    ctx.lineTo(x - len, y + len);
    ctx.stroke();
}