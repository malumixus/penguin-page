//Tutorial juego
class SceneFour extends Scene {
    constructor() {
        super();
        // Array de imágenes para el carrusel
        this.images = [img1, img2, img3, img4]; // Asegúrate de cargar estas imágenes en preload()
        this.currentImageIndex = 0; // Índice de la imagen actual
    }

    draw() {
        // Frenar todos los sonidos de bombas
        sounds.forEach(sound => sound.stop());

        background(10, 10, 100);

        // Dibujar la flecha de retorno
        image(arrowReturnImg, 30, 30, 50, 50);

        // Dibujar el título "TUTORIAL"
        textSize(32);
        fill("white");
        text('TUTORIAL', 290, 60);

        // Dibujar las flechas izquierda y derecha
        image(arrowLeftImg, 110, 330, 80, 80);
        image(arrowRightImg, 610, 330, 80, 80);

        // Dibujar la imagen actual del carrusel con un tamaño reducido
        let img = this.images[this.currentImageIndex];
        let imgWidth = 400; // Ancho deseado de la imagen
        let imgHeight = 350; // Altura deseada de la imagen
        let centroX = (width - imgWidth) / 2;
        image(img, centroX, 150, imgWidth, imgHeight); // Ajusta la posición Y según sea necesario
    }

    mouseClicked() {
        // Determinar si el mouse está sobre la flecha de retorno
        if (mouseX >= 30 && mouseX <= 80 && mouseY >= 30 && mouseY <= 80) {
            world.setScene(0);
        }

        // Detectar clics en las flechas del carrusel
        if (mouseX >= 110 && mouseX <= 190 && mouseY >= 330 && mouseY <= 410) {
            // Flecha izquierda
            this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
            clickSoundButton.play();
        } else if (mouseX >= 610 && mouseX <= 690 && mouseY >= 330 && mouseY <= 410) {
            // Flecha derecha
            this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
            clickSoundButton.play();
        }

    }
}