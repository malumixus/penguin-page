/**
 * En este archivo solo definimos la clase Scene y la
 * funcionalidad que es igual para todas las esecenas.
 * 
 * Después vamos a crear un archivo para cada escena
 * que contenga, además de la subclase de Scene todas
 * las otras clases y objeto que sean exclusivos de
 * cada escena en particular.
 */


class Scene {
    constructor() {
        /**
         * Setup de la escena.
         * 
         * Todas los atributos del objeto actúan como
         * las variables globales en sketch.js pero
         * el alcance está acotado a la escena.
         */
    }

    draw() {

        /**
         * Todas las instrucciones de dibujo de la escena.
         * Este método actúa como la función draw de sketch.js
         * y se llama desde ahí cuando la escena está activa.
         * 
         * Como esta función siempre se llama desde la función
         * draw de p5.js el podemos usar las funciones de p5.js
         * y las primitivas de dibujo como hacemos siempre.
         * Lo mismo con todos los otros métodos homónimos a las
         * funciones de p5.js. Es una cuestión de organización
         * para simplificar conceptualmente las cosas. El diseño
         * se repite para cada escena.
         */
    }

    mouseClicked() {
        /**
         * Todas las interacciones al cliquear el mouse en la
         * escena, actúa de la misma manera que la función
         * mouseClicked de sketch.js, se llama desde ahí cuando
         * la escena está activa.
         */
        print('+++ mouse clicked desde Scene!');
    }

    keyTyped() {
        /**
         * Todas las interacciones al tipear con el teclado en
         * la escena, actúa de la misma manera que la función
         * keyTyped de sketch.js, se llama desde ahí cuando la
         * escena está activa.
         */
        print('+++ key typed desde Scene!');
    }
}
