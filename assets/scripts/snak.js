var snak = {

	state: {},
	_el_container: null,
	_el_target: null,
	_el_segments: [],
	size: 10, // Size in pixel of Snake & Block
	speed: 500, // Speed of Snake in miliseconds; higher number = slower
	speedup: 1.1, // Speed increase after munching a Block; higher number = more speed gain
	snak_color: "#E17E7E", // Snake color
	target_color: "#ff8000", // Blocks color
	body_bg: "#eeeeee", // Main background color
	fail_bg: "#990000", // Background color on collision (game fail)


	init_draw: function () {
		snak._el_container = document.createElement('div');
		document.body.appendChild(snak._el_container);
		document.body.style.overflow = "hidden";
	},

	draw_state: function () {
		if (snak._el_target === null) {
			snak._el_target = document.createElement('div');
			snak._el_target.style.position = "absolute";
			snak._el_target.style.height = snak.size+"px";
			snak._el_target.style.width = snak.size+"px";
			snak._el_target.style.background = snak.target_color;
			snak._el_container.appendChild(snak._el_target);
		}
		snak._el_target.style.left = snak.state.target[0]+"px";
		snak._el_target.style.top = snak.state.target[1]+"px";

		while (snak._el_segments.length > snak.state.segments.length) {
			var el = snak._el_segments.shift();
			snak._el_container.removeChild(el);
		}
		while (snak.state.segments.length > snak._el_segments.length) {
			var i = snak._el_segments.length;
			var el_seg = document.createElement('div');
			el_seg.style.position = "absolute";
			el_seg.style.height = snak.size+"px";
			el_seg.style.width = snak.size+"px";
			el_seg.style.background = snak.snak_color;
			el_seg.style.left = snak.state.segments[i][0]+"px";
			el_seg.style.top = snak.state.segments[i][1]+"px";
			snak._el_segments.push(el_seg);
			snak._el_container.appendChild(el_seg);
		}
		for (var j = 0; j < snak.state.segments.length; j++) {
			snak._el_segments[j].style.left = snak.state.segments[j][0]+"px";
			snak._el_segments[j].style.top = snak.state.segments[j][1]+"px";
		}
	},

	iterate: function () {
		// Cut the tail
		var tail = snak.state.segments.shift();

		// Create the new head
		var newseg = (
			snak.state.segments.length > 0
			? snak.state.segments[snak.state.segments.length - 1].slice(0)
			: tail
		);
		newseg[0] = (newseg[0] + snak.state.direction[0] * snak.size) % window.innerWidth;
		if (newseg[0] < 0) {
			newseg[0] += window.innerWidth;
		}
		newseg[0] -= newseg[0] % snak.size;
		newseg[1] = (newseg[1] + snak.state.direction[1] * snak.size) % window.innerHeight;
		if (newseg[1] < 0) {
			newseg[1] += window.innerHeight;
		}
		newseg[1] -= newseg[1] % snak.size;
		snak.state.segments.push(newseg);

		if (newseg[0] === snak.state.target[0] && newseg[1] === snak.state.target[1]) {
			snak.add_segment();
			snak.state.target = snak.random_position();
			snak.state.speed *= snak.speedup;
		}

		if (snak.has_collision()) {
			snak.lose();
			//snak.clear_state();
		}
		snak.draw_state();
		snak.save_state();
		window.setTimeout(snak.iterate, snak.speed / snak.state.speed);
	},

	_bg_red: function () {
		document.body.style.background = snak.fail_bg;
	},

	_bg_white: function () {
		document.body.style.background = snak.body_bg;
	},

	lose: function () {
		window.setTimeout(snak._bg_red, 0);
		window.setTimeout(snak._bg_white, 150);
		window.setTimeout(snak._bg_red, 300);
		window.setTimeout(snak._bg_white, 450);
		window.setTimeout(snak._bg_red, 600);
		window.setTimeout(snak._bg_white, 750);
	},

	has_collision: function () {
		for (var i = 0; i < snak.state.segments.length; i++) {
			for (var j = 0; j < snak.state.segments.length; j++) {
				if (i === j) continue;
				if ((snak.state.segments[i][0] === snak.state.segments[j][0]) && (snak.state.segments[i][1] === snak.state.segments[j][1]))
					return true;
			}
		}
		return false;
	},

	add_segment: function () {
		var newseg = snak.state.segments[snak.state.segments.length - 1].slice(0);
		newseg[0] = (newseg[0] + snak.state.direction[0] * snak.size) % window.innerWidth;
		if (newseg[0] < 0) {
			newseg[0] += window.innerWidth;
		}
		newseg[0] -= newseg[0] % snak.size;
		newseg[1] = (newseg[1] + snak.state.direction[1] * snak.size) % window.innerHeight;
		if (newseg[1] < 0) {
			newseg[1] += window.innerHeight;
		}
		newseg[1] -= newseg[1] % snak.size;
		snak.state.segments.push(newseg);
	},

	random_position: function () {
		var h = window.innerHeight - 220 - 20,
			w = window.innerWidth - 20;
		var basex = Math.round(Math.random() * w),
			basey = Math.round(Math.random() * h);
		return [10 + basex - (basex % snak.size), 230 + basey - (basey % snak.size)];
	},

	start_state: function () {
		return {
			target: snak.random_position(),
			segments: [[0, Math.min(310, (window.innerHeight - (window.innerHeight % snak.size)) - 20)]],
			speed: 5,
			direction: [1, 0]
		};
	},

	load_state: function () {
		var raw = window.sessionStorage.getItem('snak_state');
		if (raw === null) {
			snak.state = snak.start_state();
		} else {
			snak.state = JSON.parse(raw);
		}
	},

	save_state: function () {
		window.sessionStorage.setItem('snak_state', JSON.stringify(snak.state));
	},

	clear_state: function () {
		window.sessionStorage.removeItem('snak_state');
		snak.state = snak.start_state();
		snak.draw_state();
	},

	keydown: function (event) {
		var keyCode = event.which || event.keyCode;
		if (keyCode === 40) {
			// down
			snak.state.direction = [0, 1];
		} else if (keyCode === 38) {
			// up
			snak.state.direction = [0, -1];
		} else if (keyCode === 37) {
			// left
			snak.state.direction = [-1, 0];
		} else if (keyCode === 39) {
			// right
			snak.state.direction = [1, 0];
		} else if (keyCode === 27) {
            // escape
            snak.clear_state(); // Reset the game
        }
	},

	_touch_start: null,

	touch_start: function (event) {
		var touches = event.changedTouches;
		snak._touch_start = [touches[0].pageX, touches[0].pageY];
	},

	touch_end: function (event) {
		var touches = event.changedTouches;
		var end_pos = [touches[0].pageX, touches[0].pageY];
		var dX = end_pos[0] - snak._touch_start[0],
			dY = end_pos[1] - snak._touch_start[1],
			c = Math.sqrt(dX*dX + dY*dY),
			alpha = Math.acos(dX/c);

		if (alpha < Math.PI * 1/4) {
			snak.state.direction = [1, 0];
		} else if (alpha > Math.PI * 3/4) {
			snak.state.direction = [-1, 0];
		} else if (dY > 0) {
			snak.state.direction = [0, 1];
		} else {
			snak.state.direction = [0, -1];
		}
	},

	init: function () {
		snak.load_state();
		snak.init_draw();
		snak.draw_state();

		window.onkeydown = snak.keydown;

		document.body.addEventListener("touchstart", snak.touch_start, false);
		document.body.addEventListener("touchend", snak.touch_end, false);

		window.setTimeout(snak.iterate, 500);
	}
};
window.onload = snak.init();

//taken from
//https://github.com/raphaelm/snakelet
