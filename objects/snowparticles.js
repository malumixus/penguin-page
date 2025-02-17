//CLASES
//PARTIUCLAS DE NIEVE
class Snowflake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(2, 5); // Tamaño aleatorio para cada copo de nieve
    this.speed = random(1, 3); // Velocidad de caída aleatoria
    this.wind = random(-0.5, 0.5); // Efecto del viento
  }

  // Actualiza la posición del copo de nieve
  update() {
    this.y += this.speed;
    this.x += this.wind;

    // Reposicionar el copo si se sale de la pantalla
    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }

  // Dibuja el copo de nieve en la pantalla
  display() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.size);
  }
}

// Clase para el sistema de partículas de nieve
class SnowSystem {
  constructor(numSnowflakes) {
    this.snowflakes = [];
    for (let i = 0; i < numSnowflakes; i++) {
      this.snowflakes.push(new Snowflake(random(width), random(height)));
    }
  }

  // Actualiza todas las partículas de nieve
  update() {
    for (let snowflake of this.snowflakes) {
      snowflake.update();
    }
  }

  // Dibuja todas las partículas de nieve
  display() {
    for (let snowflake of this.snowflakes) {
      snowflake.display();
    }
  }
}//-----------------------------
