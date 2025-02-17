//Menu Principal
class SceneOne extends Scene {
    //menu principal
    constructor() {
        super();
        this.canClick = false; // Controla si se pueden detectar clics
        this.clickDelay = 1500; // Tiempo en milisegundos para permitir clics después de entrar en la escena
        this.lastEnteredTime = 0; // Tiempo en que se entró en la escena
    }

    // Este método se llama cuando la escena se activa
    enter() {
        this.lastEnteredTime = millis(); // Registra el tiempo actual
        this.canClick = false; // Bloquea la detección de clics temporalmente
    }

    draw() {
        // Permitir clics después del retraso especificado
        if (millis() - this.lastEnteredTime > this.clickDelay) {
            this.canClick = true; // Permite la detección de clics después del retraso
        }

        // Frenar todos los sonidos de bombas
        sounds.forEach(sound => sound.stop());

        // Limpiar objetos de la escena anterior
        clearSceneObjects();

        // Fondo del menú principal
        background(backgroundVariation); // Color de fondo negro

        // Imagen del título
        image(imagenMenuTitulo, width / 2 - 160, height / 4, 330, 120);
        textSize(32);
        fill(255);

        // Botones del menú
        image(imgBotonJugar, 310, 290, 170, 80); // Botón Jugar
        image(imgBotonTutorial, 310, 355, 170, 80); // Botón Tutorial
        image(imgBotonPersonalizar, 310, 430, 170, 80); // Botón Personalizar
        image(imgBotonCreditos, 310, 500, 170, 80); // Botón Créditos

        // Determinar si el mouse está sobre los botones
        let mouseOverButton1 = mouseX >= 310 && mouseX <= 480 && mouseY >= 290 && mouseY <= 370;
        let mouseOverButton2 = mouseX >= 310 && mouseX <= 480 && mouseY >= 355 && mouseY <= 435;
        let mouseOverButton3 = mouseX >= 310 && mouseX <= 480 && mouseY >= 430 && mouseY <= 510;
        let mouseOverButton4 = mouseX >= 310 && mouseX <= 480 && mouseY >= 500 && mouseY <= 580;

        // Hover y sonido cuando el mouse pasa sobre los botones
        if (mouseOverButton1) {
            if (!soundPlayedForButton1) {
                hoverButtonMenu.play();
                soundPlayedForButton1 = true; // Marca que el sonido se ha reproducido para este botón
            }
        } else {
            soundPlayedForButton1 = false; // Restablece cuando el mouse sale del área del botón
        }

        if (mouseOverButton2) {
            if (!soundPlayedForButton2) {
                hoverButtonMenu.play();
                soundPlayedForButton2 = true;
            }
        } else {
            soundPlayedForButton2 = false;
        }

        if (mouseOverButton3) {
            if (!soundPlayedForButton3) {
                hoverButtonMenu.play();
                soundPlayedForButton3 = true;
            }
        } else {
            soundPlayedForButton3 = false;
        }

        if (mouseOverButton4) {
            if (!soundPlayedForButton4) {
                hoverButtonMenu.play();
                soundPlayedForButton4 = true;
            }
        } else {
            soundPlayedForButton4 = false;
        }
    }

    mouseClicked() {
        // Evitar que se detecten clics hasta que se haya permitido
        if (!this.canClick) return;

        // Determinar si el mouse está sobre los botones
        let mouseOverButton1 = mouseX >= 310 && mouseX <= 480 && mouseY >= 290 && mouseY <= 370;
        let mouseOverButton2 = mouseX >= 310 && mouseX <= 480 && mouseY >= 355 && mouseY <= 435;
        let mouseOverButton3 = mouseX >= 310 && mouseX <= 480 && mouseY >= 430 && mouseY <= 510;
        let mouseOverButton4 = mouseX >= 310 && mouseX <= 480 && mouseY >= 500 && mouseY <= 580;

        if (mouseOverButton1 || mouseOverButton2 || mouseOverButton3 || mouseOverButton4) {
            // Reproduce el sonido si se hace clic sobre cualquier botón
            if (!clickButtonMenu.isPlaying()) {
                clickButtonMenu.play();
            }
        }

        // Navegación entre escenas
        if (mouseOverButton1) {
            world.setScene(1); // Ir a la escena 1
        }
        if (mouseOverButton2) {
            world.setScene(3); // Ir a la escena 3
        }
        if (mouseOverButton3) {
            world.setScene(2); // Ir a la escena 2
        }
        if (mouseOverButton4) {
            world.setScene(4); // Ir a la escena 4
        }


    }
}