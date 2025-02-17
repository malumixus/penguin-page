//Créditos
class SceneFive extends Scene {



  draw() {
    // Frenar todos los sonidos de bombas
    sounds.forEach(sound => sound.stop());

    background(10, 10, 100);

    // Mostrar la flecha de regreso
    image(arrowReturnImg, 30, 30, 50, 50);

    // Mostrar el texto de créditos
    textSize(32);
    fill("white");
    text('CRÉDITOS', 290, 60);

    // Mostrar tu nombre
    textSize(16);
    text('Desarollado por', 270, 430);

    textSize(36);
    text('Micaela Bertrán', 270, 500);

    // Mostrar la imagen de crédito
    image(creditImage, 230, 100, 340, 340);




  }

  mouseClicked() {

    function playRandomSound() {
      // Selecciona un sonido aleatorio del array sonidosGato
      let randomIndex = floor(random(sonidosGato.length));
      let selectedSound = sonidosGato[randomIndex];

      // Reproduce el sonido seleccionado si no está ya en reproducción
      if (!selectedSound.isPlaying()) {
        selectedSound.play();
      }
    }
    // Determinar si el mouse está sobre la imagen de crédito
    if (mouseX > 230 && mouseX < 230 + 340 &&
      mouseY > 100 && mouseY < 100 + 340) {
      // Acción cuando el mouse está sobre la imagen de crédito
      playRandomSound();

    }

    // Determinar si el mouse está sobre los botones
    if (mouseX >= 30 && mouseX <= 80 && mouseY >= 30 && mouseY <= 80) {
      world.setScene(0);
    }


  }
}