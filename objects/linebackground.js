//arte generativo de fondo background
class LineBackground {
  constructor(step, speed) {
    this.step = step;
    this.speed = speed;
    this.lines = [];
    this.angle = 0;

    // Inicializar las líneas
    for (let x = 0; x < width; x += this.step) {
      for (let y = 0; y < height; y += this.step) {
        this.lines.push({
          x: x,
          y: y,
          width: this.step,
          height: this.step,
          direction: Math.random() >= 0.5,
        });
      }
    }
  }

  update() {
    // Actualizar la posición de las líneas
    for (let i = 0; i < this.lines.length; i++) {
      let line = this.lines[i];

      // Cambiar la posición diagonalmente
      line.x += this.speed;
      line.y += this.speed;

      // Reubicar la línea si sale del lienzo
      if (line.x > width) {
        line.x = -this.step;
      }
      if (line.y > height) {
        line.y = -this.step;
      }
    }
  }

  draw() {
    // Dibujar el fondo
    background(0, 0, 0); // Azul

    for (let i = 0; i < this.lines.length; i++) {
      this.drawLine(this.lines[i]);
    }
  }

  drawLine(line) {
    stroke(255); // Color de la línea
    strokeWeight(2);
    noFill();

    beginShape();
    if (line.direction) {
      vertex(line.x, line.y);
      vertex(line.x + line.width, line.y + line.height);
    } else {
      vertex(line.x + line.width, line.y);
      vertex(line.x, line.y + line.height);
    }
    endShape();
  }
}

