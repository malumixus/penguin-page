//BOMBAS
class Bomb {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vy = 0; // Velocidad vertical inicial
    this.gravity = 0.3; // Valor de la gravedad
    this.restitution = 0.7; // Coeficiente de restitución para el rebote

    this.bomb = createSprite(this.x, this.y, 50, 50);
    this.updateCollider();

    this.bomb.addAnimation('active', activeBomb);
    this.bomb.addAnimation('explode', explotionBomb);
    this.bomb.visible = false;
    this.active = false;
    this.exploded = false;
    this.bomb.scale = this.size;
    this.bomb.collider = 'static';
    this.explodeSoundPlayed = false; // Nuevo indicador para el sonido de explosión
    this.groundSoundPlayed = false; // Nuevo indicador para el sonido de choque con el suelo
    this.bounceSoundPlayed = false; // Nuevo indicador para el sonido de rebote
  }

  updateCollider() {
    // Actualiza el collider con el tamaño actual
    this.bomb.setCollider("circle", 0, 0, 25 * this.size);
  }

  activate() {
    this.bomb.x = this.x;
    this.bomb.y = this.y;
    this.bomb.visible = true;
    this.bomb.changeAnimation('active');
    this.active = true;

    // Verificar que el sonido está cargado
    if (popSound && popSound.isLoaded()) {
      popSound.play(); // Sonido de "pop" al aparecer
    } else {
      console.error('popSound is not loaded.');
    }

    // Programar la explosión después de 2-3 segundos
    setTimeout(() => {
      this.bomb.changeAnimation('explode');
      this.exploded = true;

      // Verificar que el sonido está cargado y que aún no se ha reproducido
      if (!this.explodeSoundPlayed && explodeSound && explodeSound.isLoaded()) {
        explodeSound.play(); // Sonido de explosión
        this.explodeSoundPlayed = true; // Marcar como reproducido
      } else if (!explodeSound.isLoaded()) {
        console.error('explodeSound is not loaded.');
      }

      // Eliminar la bomba después de 0.5 segundos de la explosión
      setTimeout(() => {
        this.bomb.remove();
      }, 500);
    }, random(2000, 3000));
  }

  actualizarGravedadB() {
    if (this.active && !this.exploded) {
      this.vy += this.gravity; // Aplicar gravedad
      this.y += this.vy; // Actualizar la posición vertical
      this.bomb.position.y = this.y; // Actualizar la posición del sprite

      // Detectar colisión con el borde inferior
      if (this.bomb.position.y >= height - (25 * this.size)) {
        this.bomb.position.y = height - (25 * this.size); // Asegurar que no pase del borde
        this.vy *= -this.restitution; // Invertir la velocidad y aplicar restitución

        // Verificar que el sonido está cargado y que aún no se ha reproducido
        if (!this.groundSoundPlayed && groundSound && groundSound.isLoaded()) {
          groundSound.play(); // Sonido al tocar el suelo
          this.groundSoundPlayed = true; // Marcar como reproducido
        } else if (!groundSound.isLoaded()) {
          console.error('groundSound is not loaded.');
        }
      } else {
        this.groundSoundPlayed = false; // Resetear indicador cuando no esté en el suelo
      }

      // Detectar colisión con el borde superior
      if (this.bomb.position.y <= 25 * this.size) {
        this.bomb.position.y = 25 * this.size; // Asegurar que no pase del borde
        this.vy *= -this.restitution; // Invertir la velocidad y aplicar restitución

        // Verificar que el sonido está cargado y que aún no se ha reproducido
        if (!this.bounceSoundPlayed && bounceSound && bounceSound.isLoaded()) {
          bounceSound.play(); // Sonido al rebotar
          this.bounceSoundPlayed = true; // Marcar como reproducido
        } else if (!bounceSound.isLoaded()) {
          console.error('bounceSound is not loaded.');
        }
      } else {
        this.bounceSoundPlayed = false; // Resetear indicador cuando no esté en el borde superior
      }
    }
  }

  update() {
    this.actualizarGravedadB();
  }

  getSpriteBomb() {
    return this.bomb;
  }
}//-----------------------------
