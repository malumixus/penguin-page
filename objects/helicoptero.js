// Clase para los helicópteros
class Helicoptero {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vx = random(-2, 2); // Velocidad horizontal aleatoria
    this.helicoptero = createSprite(x, y);
    this.helicoptero.addAnimation('fly', helicopteroFly); // Cambia 'helicopteroAnim' por el nombre de tu animación
    this.helicoptero.scale = size;
    this.updateCollider();
    this.lastBombTime = millis();
    this.bombInterval = random(1000, 1500); // Intervalo aleatorio para lanzar bombas
    this.impactos = 0; // Añadir esta línea para contar los impactos
  }

  updateCollider() {
    this.helicoptero.setCollider("rectangle", 0, 0, 80 * this.helicoptero.scale, 40 * this.helicoptero.scale);
  }

  update() {
    this.helicoptero.position.x += this.vx;
    if (this.helicoptero.position.x < 0 || this.helicoptero.position.x > width) {
      this.vx *= -1; // Cambia la dirección cuando toca el borde
    }
    this.x = this.helicoptero.position.x; // Actualiza la posición
    this.y = this.helicoptero.position.y;
    this.updateCollider();
  }

  lanzarBomba() {
    let bombSize = random(0.5, 1);
    let bomb = new Bomb(this.helicoptero.position.x, this.helicoptero.position.y + 20, bombSize);
    bomb.activate();
    arrayBombas.push(bomb);
  }

  getSpriteHelicoptero() {
    return this.helicoptero;
  }
}//-----------------------------
