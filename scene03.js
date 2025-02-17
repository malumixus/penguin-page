//Personalizar pinguino
class SceneThree extends Scene {
  constructor(lineaBackground) {
    super();
    this.lineaBackground = lineaBackground;
    this.penguinStyles = ["normal", "red", "sepia"];
    this.currentStyleIndex = 0;
    this.mouseOverRight = false;
    this.mouseOverLeft = false;
    this.isChangingStyle = false; // Flag para controlar el cambio de estilo
    this.changeDelay = 500; // Tiempo de espera en milisegundos
    this.lastChangeTime = 0; // Tiempo del último cambio de estilo
  }

  draw() {
    //frenar todos los sonidos de bombas y limpiar objetos
    sounds.forEach(sound => sound.stop());
    clearSceneObjects();

    background(0, 0, 255);

    this.lineaBackground.update();
    this.lineaBackground.draw();


    //return flecha imagen
    image(arrowReturnImg, 30, 30, 50, 50);


    let isMouseOverRight = mouseX >= 510 && mouseX <= 583 && mouseY <= 403 && mouseY >= 334;
    let isMouseOverLeft = mouseX >= 214 && mouseX <= 280 && mouseY <= 403 && mouseY >= 334;

    if (mouseIsPressed) {
      if (mouseX >= 9 && mouseX <= 30 && mouseY >= 30 && mouseY <= 30) {
        world.prevScene();

      }
      // Detecta si el mouse está sobre las áreas de cambio de estilo
      if (isMouseOverRight) {
        this.mouseOverRight = true;
      } else {
        this.mouseOverRight = false;
      }

      if (isMouseOverLeft) {
        this.mouseOverLeft = true;
      } else {
        this.mouseOverLeft = false;
      }

      // Cambia el estilo solo si el mouse está sobre un área de cambio y ha pasado el tiempo de espera
      let currentTime = millis();
      if ((this.mouseOverRight || this.mouseOverLeft) && !this.isChangingStyle && (currentTime - this.lastChangeTime > this.changeDelay)) {
        this.isChangingStyle = true;
        if (this.mouseOverRight) {
          this.currentStyleIndex = (this.currentStyleIndex + 1) % this.penguinStyles.length;
        } else if (this.mouseOverLeft) {
          this.currentStyleIndex = (this.currentStyleIndex - 1 + this.penguinStyles.length) % this.penguinStyles.length;
        }
        this.applyPenguinStyle();
        if (!hasPlayedClickSound) {
          clickSoundButton.play();
          hasPlayedClickSound = true;
        }
        this.lastChangeTime = currentTime;
      }
    } else {
      penguin.cambiarAnimacion("idle");
      hasPlayedClickSound = false;
      this.isChangingStyle = false; // Reinicia el flag cuando el mouse no está presionado
    }

    textSize(32);
    fill(255);



    image(arrowLeftImg, 210, 330, 80, 80);
    image(arrowRightImg, 510, 330, 80, 80);

    let centroX = (210 + 80 / 2 + 510 + 80 / 2) / 2;

    penguin.cambiarSize(0.5);
    penguin.setPosition(centroX, 430);
    penguin.dibujarPinguino();

    // Muestra el texto del estilo del pingüino
    let styleText = `Estilo: ${this.penguinStyles[this.currentStyleIndex]}`;
    textSize(24);
    fill("white"); // Color del texto (amarillo)
    textAlign(CENTER, CENTER);
    text(styleText, centroX, 500); // Ajusta la posición según sea necesario
  }

  applyPenguinStyle() {
    let style = this.penguinStyles[this.currentStyleIndex];

    if (style === "normal") {
      penguin.cambiarColorNormal();
    } else if (style === "red") {
      penguin.cambiarColorRojo();
    }
    else if (style = "sepia") {
      penguin.cambiarColorSepia();
    }
  }

  mouseClicked() {
    if (mouseX >= 9 && mouseX <= 67 && mouseY >= 8 && mouseY <= 67) {
      world.setScene(0);
    }

  }
}
