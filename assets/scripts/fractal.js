//taken from https://gist.github.com/lelandbatey/da83c8ee2b5d9b3c7f2e289a28d1a4ff


function create_draw(ctx) {
	return {
		line: (start, end) => {
			let [sx, sy] = start;
			let [ex, ey] = end;
			ctx.beginPath();
			ctx.lineWidth = 0.5
			ctx.strokeStyle = 'black';
			ctx.moveTo(sx, sy);
			ctx.lineTo(ex, ey);
			ctx.stroke();
		},
		circle: (center, radius) => {
			ctx.beginPath();
			ctx.strokeStyle = 'white';
			let [x, y] = center;
			ctx.arc(x, y, radius, Math.PI, Math.PI-.0001, 0);
			ctx.stroke();
		}
	}
}
function polar2cart(start, r, theta) {
	let [sx, sy] = start;
	let x = r * Math.cos(theta);
	let y = r * Math.sin(theta);
	return [sx+x, sy+y];
}
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
// Caluclate the max height of the tree, given a seed height and it's shrink factor.
function max_height(start_height, shrink_factor) {
	return start_height * (1 / (1 - shrink_factor));
}
// Calculate the initial height of a tree based on the height of the view it
// lives in.
function init_height(view_height, shrink_factor) {
	return view_height * (1 - shrink_factor);
}
function moment() {
	let d = new Date();
	return Date.now();
	//return (+d)+d.getMilliseconds();
}
$(document).ready(() => {
	var canv = document.getElementById('canvas');
	canv.height = $(window).height();
	canv.width = $(window).width();
	var context = canv.getContext('2d');
	context.fillStyle = 'white';
	context.fillRect(0, 0, canv.width, canv.height);
	let strtangle = Math.PI/2;
	let shrink_factor = 1;
	let sx = canv.width/2;
	//let sy = 650;
	let sy = canv.height /2;
	//let height = 150;
	let height = 1.15*init_height(canv.height, shrink_factor);
	console.log(max_height(height, shrink_factor));
	let draw = create_draw(context);
	function tree(start, len, angle, delta, depth) {
		//console.log(start, len, angle, delta, depth);
		let end = polar2cart(start, len, angle)
		draw.line(start, end);
		//draw.circle(start, 5);
		draw.circle(end, 7);
		if (depth) {
			tree(end, len*shrink_factor, angle+(delta/2), delta*shrink_factor, depth-1);
			tree(end, len*shrink_factor, angle-(delta/2), delta*shrink_factor, depth-1);
		}
	}
	///////////////////////////
	let c = 50;
	let start_time = moment();
	console.log(start_time);
	function do_the_frame() {
		context.clearRect(0, 0, canv.width, canv.height);
		// Adjust over a period of 10 seconds
		//console.log(moment());
		let now = (moment() % 5000) / 5000;
		let cmod = Math.sin(Math.PI*2*now);
		//console.log(cmod);
		//
		console.log(moment(), (cmod*c));
		tree([sx, sy], height+(cmod*c), -strtangle, cmod, 9);
		window.requestAnimationFrame(do_the_frame);
	}
	do_the_frame();
	//tree([sx, canv.height-sy], height, strtangle, strtangle, 9);
});
