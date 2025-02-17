//Juego Pinguino
class SceneTwo extends Scene {
    /**
     * Esta es una de las escenas. Como extiende la
     * clase Escena hereda todas las funciones y sus
     * valores por defecto.
     */

    constructor(penguin, bombs, snowSystem) {
        super();
        this.penguin = penguin;
        this.bombs = bombs;
        this.snowSystem = snowSystem;
    }
    draw() {



        //FUNCIONES NECESARIAS
        function updateAndDisplaySnowballs() {
            for (let i = snowballs.length - 1; i >= 0; i--) {
                let snowball = snowballs[i];
                snowball.move();
                if (snowball.checkCollision()) {
                    // Aquí puedes manejar la explosión del helicóptero o cualquier otra acción
                    snowballs.splice(i, 1);
                } else if (snowball.isOffScreen()) {
                    snowballs.splice(i, 1);
                }
            }
        }

        // Encuentra el helicóptero más cercano
        function findClosestHelicopter() {
            let closest = null;
            let minDist = Infinity;
            helicopteros.forEach(helicoptero => {
                let d = dist(penguin.x, penguin.y, helicoptero.x, helicoptero.y);
                if (d < minDist) {
                    minDist = d;
                    closest = helicoptero;
                }
            });
            return closest;
        }
        // Encuentra el helicóptero más cercano
        function findClosestHelicopter() {
            let closest = null;
            let minDist = Infinity;
            arrayHelicopteros.forEach(helicoptero => {
                let d = dist(miPinguino.x, miPinguino.y, helicoptero.x, helicoptero.y);
                if (d < minDist) {
                    minDist = d;
                    closest = helicoptero;
                }
            });
            return closest;
        }

        function createHelicopters(num, level) {
            // Limpiar helicópteros actuales
            helicopteros = [];

            for (let i = 0; i < num; i++) {
                let x = random(width);
                let y = random(50, 150); // Coloca los helicópteros en la parte superior

                // Asegurarse de que el helicóptero no sobrepase el canvas
                if (y > height) { // `helicopterHeight` es la altura del helicóptero
                    y = height - 100 // Ajusta la posición para que no salga del canvas
                }

                let size = random(0.5, 1);
                let helicoptero = new Helicoptero(x, y, size, level); // Pasar el nivel del jugador al constructor
                helicopteros.push(helicoptero);
            }
        }
        // Función para limpiar los objetos de la escena actual
        function clearSceneObjects() {
            // Vaciar el array de bombas
            arrayBombas.forEach(bomb => bomb.getSpriteBomb().remove());
            arrayBombas.length = 0;

            // Vaciar el array de helicópteros
            helicopteros.forEach(helicoptero => helicoptero.getSpriteHelicoptero().remove());
            helicopteros.length = 0;
        }
        function resetGame() {
            nivel = 1;
            vidas = 3; // Restablecer las vidas a 3
            helicopteros = []; // Limpiar los helicópteros

            createHelicopters(random(1, 4), nivel);

            arrayBombas = []; // Limpiar las bombas
            arrayBolasDeNieve = []; // Limpiar las bolas de nieve

            // Restablecer las variables del pingüino manualmente sin usar una función reset
            penguin.x = 100; // Posición inicial del pingüino en X
            penguin.y = 577; // Posición inicial del pingüino en Y
            penguin.cambiarAnimacion("idle"); // Restablecer la animación a "idle"
            penguinState = "idle"; // Restablecer el estado del pingüino a "idle"

            gamePaused = false; // Reiniciar el estado de pausa del juego
        }


        function aumentarNivel() {
            nivel++;

            createHelicopters(random(1, 4), nivel); // Crear nuevos helicópteros con la nueva dificultad
        }
        function checkHelicopters() {
            if (helicopteros.length === 0) {
                aumentarNivel();
            }
        }
        //--------------------------------------------------------------------------------
        //JUEGO


        //restaurar vidas
        if (vidas <= 0) {
            vidas = 3;
        }

        //crear helicopteros canidad random de 1 a 5 si no hay helicopteros
        if (helicopteros.length <= 0) {
            aumentarNivel();
        }

        //CONFIGURACION DEL JUEGO
        //PAUSA DEL JUEGO
        // Si el juego está pausado, mostrar mensaje y opciones de reinicio
        if (gamePaused) {
            nivel = 1;
            background(100, 100, 100);
            sounds.forEach(sound => sound.stop());
            clearSceneObjects();

            fill(0);
            textSize(32);
            textAlign(CENTER, CENTER);
            text("¡Has perdido! ¿Quieres repetir?", width / 2, height / 2 - 40);

            //imagenes botones
            //si
            image(botonMenuSi, 250, 370, 160, 100); // Coloca la imagen en la posición (x: 100, y: 100)

            //no
            image(botonMenuNo, 400, 370, 160, 100); // Coloca la imagen en la posición (x: 100, y: 100)

            // Verificar clic en los botones
            if (mouseIsPressed) {
                // Verificar si el mouse está sobre el botón "Sí"
                let mouseOverYes = mouseX >= 250 && mouseX <= 250 + 160 && mouseY >= 370 && mouseY <= 370 + 100;

                // Verificar si el mouse está sobre el botón "No"
                let mouseOverNo = mouseX >= 400 && mouseX <= 400 + 160 && mouseY >= 370 && mouseY <= 370 + 100;


                if (mouseOverYes) {

                    vidas = 3;
                    resetGame();
                    gamePaused = false;
                } else if (mouseOverNo) {

                    gamePaused = false;
                    clear();
                    world.setScene(0);
                }
            }

            return;
        }
        //---------------------------------------------


        background(100);
        background(backgroundImg);


        //return flecha imagen
        image(arrowReturnImg, 30, 30, 50, 50);
        //------------------------------------------

        //COPOS DE NIEVE PARTICULAS

        snowSystem.update();
        snowSystem.display();
        ;
        //------------------------------------------

        //PINGUINO
        // Actualizar y dibujar el pingüino

        penguin.cambiarSize(0.17);
        penguin.dibujarPinguino();

        // Manejo de la caída del pingüino gravedad y saltos
        if (penguin.y <= 577 && penguinState !== "jump") {
            penguinFalling = true;
        } else if (penguin.y >= 577) {
            penguinFalling = false;
        } else if (penguinState === "jump") {
            penguinFalling = false;
        }
        if (penguinFalling) {
            penguin.actualizarGravedad(0.02);
            penguin.dibujarPinguino();
        }


        //INTERACCIONES PINGUINO
        // Cambiar animaciones del pingüino basadas en la entrada del teclado
        if (keyIsDown(RIGHT_ARROW)) {
            penguin.cambiarAnimacion("walkRight");
            penguinState = "right";
        } else if (keyIsDown(UP_ARROW)) {
            penguinState = "jump";
            penguin.cambiarAnimacion("jump");
        } else if (keyIsDown(LEFT_ARROW)) {
            penguin.cambiarAnimacion("walkLeft");
            penguinState = "left";
        } else if (keyIsDown(DOWN_ARROW)) {
            penguin.cambiarAnimacion("walkDown");
            penguinState = "down";
        } else {
            penguin.cambiarAnimacion("idle");
            penguinState = "idle";
        }
        if (keyIsPressed && (key === 'd' || key === 'D')) {
            if (!snowballIsBeingThrown) {
                let targetHelicoptero = helicopteros.length > 0 ? helicopteros[0] : null;
                if (targetHelicoptero) {
                    penguin.lanzarBolaDeNieve(targetHelicoptero);
                    snowballIsBeingThrown = true;
                } else {
                    console.error("No hay helicópteros disponibles para atacar.");
                }
            }
        } else {
            snowballIsBeingThrown = false;
        }
        //--------------------------------------------------------------------------

        //MUERTE PINGUINO 
        // Si el pingüino está en la animación de muerte, mostrarla por unos segundos antes de pausar el juego
        if (gamePaused) {
            let elapsedTime = millis() - deathStartTime;
            if (elapsedTime < deathDuration) {
                penguin.cambiarAnimacion("death");
            } else {
                // Una vez transcurrido el tiempo, mostrar la ventana de reinicio
                gamePaused = true;
            }
        }
        //------------------------------------------


        //-----------------------------------------------
        //BOLAS DE NIEVE/
        // Actualizar y dibujar todas las bolas de nieve
        arrayBolasDeNieve.forEach(snowball => {
            snowball.update();
            snowball.display();
        });


        // HELICOPTEROS /
        // Actualizar y dibujar cada helicóptero
        helicopteros.forEach(helicoptero => {
            helicoptero.update(); // Actualiza la física y la animación del helicóptero
            drawSprite(helicoptero.getSpriteHelicoptero()); // Dibuja el helicóptero en el lienzo

            // Crear bombas desde el helicóptero en intervalos aleatorios
            let currentHeliTime = millis();
            if (currentHeliTime - helicoptero.lastBombTime > helicoptero.bombInterval) {
                helicoptero.lanzarBomba();
                helicoptero.lastBombTime = currentHeliTime;
                helicoptero.bombInterval = random(1000, 1500); // Nuevo intervalo aleatorio para la próxima bomba
            }
        });


        // BOMBAS /
        // Actualizar y dibujar cada bomba
        arrayBombas.forEach(bomb => {
            bomb.update(); // Actualiza la física y la animación de la bomba
            drawSprite(bomb.getSpriteBomb()); // Dibuja la bomba en el lienzo

            // Actualizar el collider de la bomba para reflejar su tamaño actual
            bomb.updateCollider();

            // Verificar colisión entre el pingüino y la bomba
            if (bomb.exploded && penguin.getSpritePinguino().overlap(bomb.getSpriteBomb())) {
                console.log("¡Colisión detectada!");
                if (vidas > 0) {
                    vidas--; // Reducir las vidas
                    penguin.cambiarAnimacion("hurt"); // Cambiar animación a "hurt"
                    bomb.exploded = false; // Asegurar que solo se reduzca una vez por explosión
                }

                // Verificar si el pingüino ha perdido todas las vidas
                if (vidas <= 0) {
                    penguin.cambiarAnimacion("death"); // Cambiar animación a "death"
                    deathStartTime = millis(); // Guardar el tiempo de inicio de la animación de muerte
                    gamePaused = true; // Pausar el juego después del tiempo de animación
                }
            }
        });


        //TEXTO EN PANTALLA
        // Mostrar las vidas en la pantalla

        textSize(32);
        push();
        fill("white");

        text("Vidas: " + vidas, 10, 30);

        pop();
        //ACTUALIZAR SPRITES GIFS
        // Dibujar todos los sprites en el lienzo
        drawSprites();

        //---------------------------------------------------
    }
    mouseClicked() {


        if (mouseX >= 9 && mouseX <= 67 && mouseY >= 8 && mouseY <= 67) {
            world.setScene(0);
        }


    }
}
