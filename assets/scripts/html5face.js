function face() {
ctx = document.getElementById('canvas').getContext('2d');

//background
ctx.fillStyle = "#35b6e6";
ctx.beginPath();
ctx.moveTo(39, 250);
ctx.lineTo(17, 0);
ctx.lineTo(262, 0);
ctx.lineTo(239, 250);
ctx.lineTo(139, 278);
ctx.closePath();
ctx.fill();

// right hand, lighter part of the background
ctx.fillStyle = "#8acbe3";
ctx.beginPath();
ctx.moveTo(139, 257);
ctx.lineTo(220, 234);
ctx.lineTo(239, 20);
ctx.lineTo(139, 20);
ctx.closePath();
ctx.fill();

//Right eye
ctx.fillStyle = "#FFFFFF";
ctx.beginPath();
ctx.moveTo(157, 121);
ctx.lineTo(160, 102);
ctx.lineTo(213, 102);
ctx.lineTo(213, 121);
ctx.closePath();
ctx.fill();

//Right pupil
ctx.fillStyle = "#000000";
ctx.beginPath();
ctx.moveTo(190, 121);
ctx.lineTo(190, 102);
ctx.lineTo(180, 102);
ctx.lineTo(180, 121);
ctx.closePath();
ctx.fill();

//left eye
ctx.fillStyle = "#FFFFFF";
ctx.beginPath();
ctx.moveTo(60, 121);
ctx.lineTo(60, 102);
ctx.lineTo(113, 102);
ctx.lineTo(116, 121);
ctx.closePath();
ctx.fill();

//left pupil
ctx.fillStyle = "#000000";
ctx.beginPath();
ctx.moveTo(90, 121);
ctx.lineTo(90, 102);
ctx.lineTo(80, 102);
ctx.lineTo(80, 121);
ctx.closePath();
ctx.fill();

//mouth
ctx.fillStyle = "#32525e";
ctx.beginPath();
ctx.moveTo(90, 191);
ctx.lineTo(90, 182);
ctx.lineTo(183, 182);
ctx.lineTo(183, 191);
ctx.closePath();
ctx.fill();

}
