class pinguino {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.vy = 0;
    this.pinguino = createSprite(x, y);
    this.pinguino.scale = size;

    // Definir animaciones para el estilo normal
    this.pinguino.addAnimation('idleNormal', idle);
    this.pinguino.addAnimation('walkRightNormal', walkRight);
    this.pinguino.addAnimation('walkLeftNormal', walkLeft);
    this.pinguino.addAnimation('jumpNormal', jump);
    this.pinguino.addAnimation('hurtNormal', hurt);
    this.pinguino.addAnimation('deathNormal', death);

    // Definir animaciones para el estilo rojo
    this.pinguino.addAnimation('idleRed', idleRed);
    this.pinguino.addAnimation('walkRightRed', walkRightRed);
    this.pinguino.addAnimation('walkLeftRed', walkLeftRed);
    this.pinguino.addAnimation('jumpRed', jumpRed);
    this.pinguino.addAnimation('hurtRed', hurtRed);

    // Definir animaciones para el estilo sepia
    this.pinguino.addAnimation('idleSepia', idleSepia);
    this.pinguino.addAnimation('walkRightSepia', walkRightSepia);
    this.pinguino.addAnimation('walkLeftSepia', walkLeftSepia);
    this.pinguino.addAnimation('jumpSepia', jumpSepia);
    this.pinguino.addAnimation('hurtSepia', hurtSepia);




    // Estilo por defecto
    this.currentStyle = 'Normal';

    this.updateCollider();
  }

  updateCollider() {
    this.pinguino.setCollider("rectangle", 0, 0, 50 * this.pinguino.scale, 50 * this.pinguino.scale);
  }

  cambiarSize(nuevoSize) {
    this.pinguino.scale = nuevoSize;
    this.updateCollider();
  }

  cambiarAnimacion(animacion) {
    const animacionActual = animacion + this.currentStyle;
    this.pinguino.changeAnimation(animacionActual);
    if (animacion === 'idle') {
      this.pinguino.velocity.x = 0;
      this.pinguino.velocity.y = 0;
    } else if (animacion === 'walkRight') {
      this.pinguino.velocity.x = 3;
      this.x += 3;
    } else if (animacion === 'walkLeft') {
      this.pinguino.velocity.x = -3;
      this.x -= 3;
    } else if (animacion === 'jump') {
      this.pinguino.velocity.y = -5;
      this.y -= 5;
    }
    drawSprites();
  }

  cambiarColorRojo() {
    this.currentStyle = 'Red';
    this.cambiarAnimacion('idle'); // Cambia a la animación idle en estilo rojo
  }

  cambiarColorSepia() {
    this.currentStyle = 'Sepia';
    this.cambiarAnimacion('idle'); // Cambia a la animación idle en estilo normal
  }
  cambiarColorNormal() {
    this.currentStyle = 'Normal';
    this.cambiarAnimacion('idle'); // Cambia a la animación idle en estilo normal
  }

  dibujarPinguino() {
    this.pinguino.position.x = this.x;
    this.pinguino.position.y = this.y;
    drawSprites();
  }

  colisionesPinguino(objeto) {
    if (this.pinguino.collide(objeto)) {
      console.log('Colisión detectada');
      objeto.velocity.x = 10;
    }
  }

  getSpritePinguino() {
    return this.pinguino;
  }

  actualizarGravedad(gravity) {
    this.vy += gravity;
    this.y += this.vy;
    this.pinguino.position.y = this.y;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.pinguino.position.x = x;
    this.pinguino.position.y = y;
  }

  lanzarBolaDeNieve(target) {
    if (target instanceof Helicoptero) {
      let snowball = new Snowball(this.x, this.y, target);
      arrayBolasDeNieve.push(snowball);
    } else {
      console.error("El objetivo no es una instancia de Helicoptero:", target);
    }
  }


}
