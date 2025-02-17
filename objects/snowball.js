class Snowball {
  constructor(x, y, target) {
    if (!target || typeof target.x === 'undefined' || typeof target.y === 'undefined') {
      console.error("El objetivo es inválido:", target);
      return; // Salir del constructor si el objetivo es inválido
    }

    this.x = x;
    this.y = y;
    this.size = 10; // Tamaño de la bola de nieve
    this.speed = 5; // Velocidad de la bola de nieve
    this.target = target; // Coordenadas del objetivo (helicóptero)
    this.isActive = true; // Estado de la bola de nieve

    // Calcular ángulo y velocidad
    this.angle = atan2(this.target.y - this.y, this.target.x - this.x);
    this.vx = this.speed * cos(this.angle);
    this.vy = this.speed * sin(this.angle);
  }

  update() {
    if (this.isActive) {
      // Actualizar la posición
      this.x += this.vx;
      this.y += this.vy;

      // Verificar colisión con los helicópteros
      for (let i = helicopteros.length - 1; i >= 0; i--) {
        let helicoptero = helicopteros[i];
        let heliSprite = helicoptero.getSpriteHelicoptero();

        // Verificar colisión usando colisionadores de sprite
        if (heliSprite.overlapPoint(this.x, this.y)) {
          this.isActive = false;
          helicoptero.impactos += 1; // Incrementar el contador de impactos del helicóptero

          if (helicoptero.impactos >= 3) { // Por ejemplo, si el helicóptero recibe 3 impactos
            helicoptero.impactos = 0;
            heliSprite.remove(); // Eliminar el helicóptero
            helicopteros.splice(i, 1); // Eliminar la instancia del helicóptero del array
          }

          // Reproducir el sonido de impacto
          snowballHitSound.play();
          break; // Detener el bucle si la bola de nieve ya impactó
        }
      }

      // Si la bola de nieve no está activa, eliminarla del array
      if (!this.isActive) {
        let index = arrayBolasDeNieve.indexOf(this);
        if (index > -1) {
          arrayBolasDeNieve.splice(index, 1);
        }
      }
    }
  }

  display() {
    if (this.isActive) {
      fill(255, 255, 255); // Color blanco para la bola de nieve
      noStroke();
      ellipse(this.x, this.y, this.size, this.size);
    }
  }
}