var canvas     = document.createElement('canvas'),
			ctx        = canvas.getContext('2d'),
			width      = canvas.width  = window.innerWidth,
			height     = canvas.height = window.innerHeight,
			PI2        = Math.PI * 2,
			max_len    = 160, // максимальная длина нити
			points_num = 50,  // кол-во точек
			koef       = 2.0, // константа для скоростей, подобрана экспериментально
			point      = [];  // массив точек, пока пустой
		
		document.body.appendChild(canvas);
		ctx.globalAlpha = 1; // можно поиграться
		ctx.fillStyle = 'rgb(255,255,255)'; // цвет заливки точек
	//	ctx.shadowColor = 'rgb(255, 255, 255)'; // цвет тени
		//ctx.shadowBlur = 10; // степень распространения тени

		// конструктор 'класса' точек
		function Point() {
			this.pos = { // позиция
				x: Math.random() * width,
				y: Math.random() * height
			};
			
			this.vel = { // проекции скоростей
				x: (Math.random() - 0.5) * koef,
				y: (Math.random() - 0.5) * koef 
			};
			
			this.radius = 3; // радиус
		};
		
		// метод 'класса', обновляет координаты
		Point.prototype.update = function() { // равномерное движение (по прямой)
			this.pos.x += this.vel.x;
			this.pos.y += this.vel.y;
		};
		
		// метод 'класса', проверяет столковения с границами,
		Point.prototype.collision = function() {
			if (this.pos.x + this.radius > width) {
				this.pos.x = width - this.radius;
				this.vel.x *= -1;
			} 
			else if (this.pos.x - this.radius < 0) {
				this.pos.x = this.radius;
				this.vel.x *= -1;
			};
			
			if (this.pos.y + this.radius > height) {
				this.pos.y = height - this.radius;
				this.vel.y *= -1;
			} 
			else if (this.pos.y - this.radius < 0) {
				this.pos.y = this.radius;
				this.vel.y *= -1;
			};
		};
		
		// еще один метод, прорисовка
		Point.prototype.draw = function() {
			ctx.beginPath();
			ctx.arc(this.pos.x, this.pos.y, this.radius, 0, PI2, false);
			ctx.fill();
		};
		
		// функция обновления линий между точками
		function updateLines() {
			var dist = 0, dx = 0, dy = 0;
			for (var i = 0; i < points_num - 1; ++i) {
				for (var j = i + 1; j < points_num; ++j) {
					dx = point[i].pos.x - point[j].pos.x;
					dy = point[i].pos.y - point[j].pos.y;
					dist = Math.sqrt(dx * dx + dy * dy); // расстояние между двумя точками на плоскости...
					if (dist < max_len) { 
						ctx.strokeStyle = 'rgba(255, 255, 255,' + (7 / dist) + ')'; // 7, подобрано экспериментально
						ctx.beginPath();
						ctx.moveTo(point[i].pos.x, point[i].pos.y); // к одной точке
						ctx.lineTo(point[j].pos.x, point[j].pos.y); // ко второй
						ctx.stroke();
					};
				};
			};
		};
		
		// создаем объекты
		for (var i = 0; i < points_num; ++i) {
			point[i] = new Point();
		};

		// функция отрисовки и обновления всего, в идеале вызывается с частотой, равной частоте обновления экрана.
		// фиг знает, как именно она работает
		requestAnimationFrame(frame);
		function frame() {
			requestAnimationFrame(frame);
			ctx.clearRect(0, 0, width, height); // очистить холст
			
			for (var i = 0; i < points_num; ++i) {
				point[i].update(); // обновить координаты
				point[i].collision(); // проверить столконовения
			};
			
			updateLines(); // отрисовать линии, где нужно
			
			for (var i = 0; i < points_num; ++i) {
				point[i].draw(); // отрисовать сами точки
			};
		};	

window.onresize = function() {
  width      = canvas.width  = window.innerWidth;
	height     = canvas.height = window.innerHeight;
  ctx.fillStyle = 'rgb(255,255,255)';
}