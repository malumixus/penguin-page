/**
 * Esta clase contiene las escenas y el estado global
 * del mundo que es nuestro programa, el sketch de varias
 * pantallas.
 */


class World {
    constructor() {
        // Lista de escenas a ir agregando.
        this.scenes = [];
        // Escena que se está visualizando en el momento actual.
        this.currentScene = null;
        // Este es el índice de la escena actual en el array.
        this.currentIndex = null;
    }

    /**
     * Método para agregar escenas, se engarga de guardarlas
     * en el array.
     * @param {Scene} scene 
     */
    addScene(scene) {
        this.scenes.push(scene);
    }

    /**
     * Métodos de control para cambiar de escena.
     */

    /**
     * Este método se usa para cambiar la escena actual.
     * Es obligatorio llamarlo luego de agregar las escenas
     * y antes de usar nextScene o prevScene.
     * 
     * @param {number} i número de escena en la lista de escenas.
     */
    setScene(i) {
        // Compruebo posibles errores con mediante inversión de flujo.
        // Si no hay escenas en la lista tira error, retorna y no hace nada.
        if (this.scenes.length == 0) {
            print('Error, no hay escenas en la lista de escenas');
            return
        }

        // Si no es un índice válido, tira error, retorna y no hace nada.
        if (i >= this.scenes.length || i < 0) {
            print(`Error, la escena ${i} no existe`);
            return
        }

        // Está todo bien, pono la escena.
        this.currentScene = this.scenes[i];
        this.currentIndex = i;
    }

    /**
     * Mueve a la escena siguiente en la lista, si llegó
     * al final vuelve a comenzar desde la primera.
     */
    nextScene() {
        let i = (this.currentIndex + 1) % this.scenes.length;
        this.setScene(i);
    }

    /**
     * Mueve a la escena previa en la lista, si llegó
     * al principio vuelve a comenzar desde la última.
     */
    prevScene() {
        let i = this.currentIndex - 1;
        // Esto es necesario para que vaya al final en vez de dar
        // índice -1, vuelve a empezar desde el final, inversa de módulo.
        if (i < 0) { i = this.scenes.length - 1; }
        this.setScene(i);
    }
}
