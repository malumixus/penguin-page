/*
  Proyecto: Penguin Scape
  Descripción: Videojuego sobre un pinguino que debe escapar de bombas y derribar helicopteros para salvar
  la antartida de los humanos que quieren explotar recursos del territorio.
  
  Programador: Micaela Bertrán
  Fecha: 24 de agosto de 2024
  
*/

const world = new World();

//--------------------------------
//VARIABLES ESCENAS GLOBALES
//-----------------------------------------------------------------------------------------------------
//MENU PRINCIPAL ESCENA UNO

//sonidos
let hoverButtonMenu, clickButtonMenu;

//booleanos sonidos 
//detectan que se reproduscan solo una ves!
let soundPlayedForButton1 = false;
let soundPlayedForButton2 = false;
let soundPlayedForButton3 = false;
let soundPlayedForButton4 = false;

//imagenes
let imagenMenuTitulo;

let imgBotonJugar;
let imgBotonPersonalizar;
let imgBotonCreditos;
let imgBotonTutorial;
//-----------------------------------------------------------------------------------------------------

//JUEGO ESCENA 2

//menu pausa
//btoones imagenes
let botonMenuNo;
let botonMenuSi;
//------------

//escena
let backgroundImg;
//congif
let gamePaused = false;
let showRestartPrompt = false;
//VARIABLES
//Penguin
let penguin;

let penguinX = 400;
let penguinY = 300;
//blue pinguin
let idle;
let walkRight;
let walkLeft;
let jump;
let hurt;
let death;


//Pinguin color variation
//color variation pingin
let idleRed;
let walkRightRed;
let walkLeftRed;
let jumpRed;
let hurtRed;
let deathRed;


//sepia
let idleSepia;
let walkRightSepia;
let walkLeftSepia;
let jumpSepia;
let hurtSepia;
let deathSepia;

//estados pinguino
let penguinState;

let penguinFalling = false;
let penguinJumping = false;

let pinguinFalling = false;
let penguinCollision = false;

// Función para dibujar la escena 2
let deathStartTime = 0; // Variable para almacenar el tiempo de inicio de la animación de muerte
const deathDuration = 2000; // Duración de la animación de muerte en milisegundos


//vidas
let vidas = 3; // Contador de vidas

//nievel jugador
let nivel = 1;



//----------------------------
//bomba
let bomb;
let bombas;

let arrayBombas = [];
let lastBombTime = 0;
let bombInterval = 2000;

//animaciones bomba
var activeBomb;
var explotionBomb;

//sonidos bombas
let groundSound, explodeSound, bounceSound, popSound;


//-----------------------------


//----------------------------
//helicoptero

let helicopteroIndividual;
let helicopteroFly;
let helicopteros = [];

//------------------------------
//bolas de nieve

let snowball;
let snowballImage;
let snowballs = []; // Array para almacenar las bolas de nieve

let snowballHitSound;
let arrayBolasDeNieve = [];


let snowballIsBeingThrown = false;

//------------------------------------------------------------------------



//PERSONALIZAR / ESCENA 3
//VARIABLES
//fondo generativo escena personalizacion
let lineaBackground;

//UI
//botones
let arrowLeftImg, arrowRightImg, arrowReturnImg, okButtonImg, cancelButtonImg;

//SONIDOS DE BOTONES
let clickSoundButton, hoverSoundButton;

let hasPlayedClickSound = false;
let hasPlayedHoverSoundRight = false;
let hasPlayedHoverSoundLeft = false;



let sounds = []; // Array para almacenar los sonidos

//--------------------------------------------------------------------------
//ESCENA 4 - TUTORIAL

let carouselImages = [];

let img1, img2, img3, img4;

//---------------------------------------------------------------------------
//ESCENA 5 CREDITOS
//imagen
let creditImage;

//sonidos
let meowUno;
let meowDos;
let prrr;

let sonidosGato = [];


function clearSceneObjects() {
  arrayBombas.forEach(bomb => bomb.getSpriteBomb().remove());
  arrayBombas.length = 0;

  helicopteros.forEach(helicoptero => helicoptero.getSpriteHelicoptero().remove());
  helicopteros.length = 0;
}


function preload() {
  // ...
  //MENU PRINCIPAL / ESCENA 1 
  //sonidos menu

  hoverButtonMenu = loadSound('assets/escenauno/sonidos/pophover.mp3');
  clickButtonMenu = loadSound('assets/escenauno/sonidos/ok.mp3');

  //imagenes menu
  imagenMenuTitulo = loadImage('assets/escenauno/imagenes/penguintitle.png');
  //botones 
  imgBotonJugar = loadImage('assets/escenauno/imagenes/botones/jugarbotonespng.png');
  imgBotonTutorial = loadImage('assets/escenauno/imagenes/botones/botontutorialpinguino2.png');
  imgBotonPersonalizar = loadImage('assets/escenauno/imagenes/botones/botondospersonalizar.png');


  imgBotonCreditos = loadImage('assets/escenauno/imagenes/botones/botoncreditos.png');


  backgroundVariation = loadImage('assets/escenauno/imagenes/fondo/fondovariacion.png');

  //--------------------------------------------------------------------------

  //JUEGO PINGUINO / ESCENA 2

  //menu pausa
  botonMenuNo = loadImage("assets/escenados/menupausa/no.png");
  botonMenuSi = loadImage("assets/escenados/menupausa/si.png");
  //---------
  backgroundImg = loadImage("assets/escenados/background/fondo.png");
  // Cargar el GIF como una imagen
  //pinguino animaciones
  idle = loadImage('assets/escenados/penguin/gif/idle.gif');
  walkRight = loadImage('assets/escenados/penguin/gif/walkright.gif');
  walkLeft = loadImage('assets/escenados/penguin/gif/walkleft.gif');
  jump = loadImage('assets/escenados/penguin/gif/jump.gif');

  hurt = loadImage('assets/escenados/penguin/gif/hurt.gif');
  death = loadImage('assets/escenados/penguin/gif/death.gif');


  //red penguin
  idleRed = loadImage('assets/escenados/penguin/colorsgif/red/idlered.gif');
  walkRightRed = loadImage('assets/escenados/penguin/colorsgif/red/walkredright.gif');
  walkLeftRed = loadImage('assets/escenados/penguin/colorsgif/red/walkredleft.gif');
  jumpRed = loadImage('assets/escenados/penguin/colorsgif/red/jumpred.gif');
  hurtRed = loadImage('assets/escenados/penguin/colorsgif/red/hurtred.gif');

  //sepia
  idleSepia = loadImage('assets/escenados/penguin/colorsgif/sepia/idlesepia.gif');
  walkRightSepia = loadImage('assets/escenados/penguin/colorsgif/sepia/walkrightsepia.gif');
  walkLeftSepia = loadImage('assets/escenados/penguin/colorsgif/sepia/walkleftsepia.gif');
  jumpSepia = loadImage('assets/escenados/penguin/colorsgif/sepia/jumpsepia.gif');
  hurtSepia = loadImage('assets/escenados/penguin/colorsgif/sepia/hurtsepia.gif');
  deathSepia = loadImage('assets/escenados/penguin/colorsgif/sepia/hurtsepia.gif');


  //snowball
  snowballImage = loadImage('assets/escenados/snowball/imagen/snowball.png');
  snowballHitSound = loadSound('assets/escenados/snowball/sonidos/snowballhit.wav');




  //bomba animaciones
  activeBomb = loadImage('assets/escenados/bomb/gifs/bomb.gif');
  explotionBomb = loadImage('assets/escenados/bomb/gifs/explotion.gif');
  //sonidos

  popSound = loadSound('assets/escenados/bomb/sonidos/pophover.mp3');
  groundSound = loadSound('assets/escenados/bomb/sonidos/blup.mp3');
  explodeSound = loadSound('assets/escenados/bomb/sonidos/explosion.wav');
  bounceSound = loadSound('assets/escenados/bomb/sonidos/bloop.mp3');
  sounds.push(groundSound, explodeSound, bounceSound);

  //helicoptero sprites
  helicopteroFly = loadImage('assets/escenados/helicoptero/gifs/helicoptero.gif');


  //volver menu
  arrowReturnImg = loadImage("assets/escenatres/botones/imagenes/return.png"); //--> ESTE VA EN TODAS LAS ESCENAS PERO LO CARGO ACA

  //-------------------------------------------------------
  //PERSONALIZACION PINGUINO / ESCENA 3

  //IMAGENES BOTONES
  okButtonImg = loadImage("assets/escenatres/botones/imagenes/ok.png");
  arrowLeftImg = loadImage("assets/escenatres/botones/imagenes/leftarrow.png");
  arrowRightImg = loadImage("assets/escenatres/botones/imagenes/rightarrow.png");
  cancelButtonImg = loadImage("assets/escenatres/botones/imagenes/close.png");

  //BOTONES SONIDO
  hoverButtonMenu = loadSound('assets/escenatres/botones/sonidos/uibutton.mp3');
  clickButtonMenu = loadSound('assets/escenatres/botones/sonidos/uibuttonpush.mp3');


  clickSoundButton = loadSound('assets/escenatres/botones/sonidos/uibutton.mp3');
  hoverSoundButton = loadSound('assets/escenatres/botones/sonidos/uibuttonpush.mp3');

  //------------------------------------------------------------------
  //ESCENA 4 - TUTORIAL
  img1 = loadImage('assets/escenacuatro/imagenes/tutorial/1.png');
  img2 = loadImage('assets/escenacuatro/imagenes/tutorial/2.png');
  img3 = loadImage('assets/escenacuatro/imagenes/tutorial/3.png');
  img4 = loadImage('assets/escenacuatro/imagenes/tutorial/4.png');

  //--------------------------------------------------------------------
  //ESCENA 5 - CREDITOS 
  //imagenes credito
  creditImage = loadImage("assets/escenacinco/imagenes/creditosimagen.jpg");

  //sonidos
  meowUno = loadSound('assets/escenacinco/sonidos/meowvariados/meow2.wav');
  meowDos = loadSound('assets/escenacinco/sonidos/meowvariados/meow3.wav');
  prrr = loadSound('assets/escenacinco/sonidos/meowvariados/prrrr1.wav');

  sonidosGato.push(meowUno, meowDos, prrr);

}

function setup() {
  createCanvas(800, 600);


  //objetos instancia de escenas

  //ESCENA 2 / JUEGO
  //copos de nieve
  snowSystem = new SnowSystem(100); // Crear el sistema de partículas con 100 copos de nieve

  //crear pinguino
  penguin = new pinguino(penguinX, penguinY, 0.16);
  bombas = new Group();

  // Crear entre 1 y 5 helicópteros
  let numHelicopters = int(random(1, 6)); // Genera un número entre 1 y 5
  helicopteros = []; // Asegúrate de que el array esté limpio antes de agregar nuevos helicópteros

  for (let i = 0; i < numHelicopters; i++) {
    let x = random(width);
    let y = random(50, 150); // Coloca los helicópteros en la parte superior
    let size = random(0.5, 1);
    let helicoptero = new Helicoptero(x, y, size);
    helicopteros.push(helicoptero);
  }


  //ESCENA 3 / PERSONALIZACION PINGUINO

  lineaBackground = new LineBackground(60, 0.8);

  //-------------------------------------------
  //MANEJO DE ESCENAS
  /**
   * Creamos la primera escena/pantalla y la agregamos
   * a la lista de escenas/pantallas.
   */
  const sceneOne = new SceneOne();
  world.addScene(sceneOne);
  /**
   * Vamos haciendo lo mismo con el resto de las escenas
   * o pantallas. Dentro de la lista quedan en el orden
   * que las agregamos acá.
   */
  const sceneTwo = new SceneTwo(penguin, arrayBombas, snowSystem);
  world.addScene(sceneTwo);

  const sceneThree = new SceneThree(lineaBackground);
  world.addScene(sceneThree);


  const sceneFour = new SceneFour();
  world.addScene(sceneFour);


  const sceneFive = new SceneFive();
  world.addScene(sceneFive);


  /**
   * Define a la escena 0, la primera de la lista, como
   * la inicial, lo primero que se ve en el sketch.
   */
  world.setScene(0);



  //-----------------------------------------------------------------------------------------

}

function draw() {
  /**
   * En cada función de p5.js se llama a currentScene
   * que va a contener distintas escenas según vamos
   * reasignando la variable. Puede parecer mucho tener
   * que escribir gObject.currentScene.draw() pero esto
   * se hace solo una vez en cada lugar que se necesita
   * y el resto anda solo con cambiar el valor de currentScene.
   */
  world.currentScene.draw();
}

function mouseClicked() {

  // Se puede controlar el cambio de escena según lo
  // que pase en ella, si la escena lo decide, llama
  // a world.nextScene en respuesta a algún evento.
  world.currentScene.mouseClicked();
}

function keyTyped() {

  world.currentScene.keyTyped();
  // Acá se está controlando el cambio de escena
  // independientemente de lo que pase en la misma,
  // desde el sketch de manera global. Hay que tener
  // cuidado con estos porque si keyTyped de la escena
  // cambia de escena la siguiente instrucción la
  // vuelve a cambiar, ojo.
  //world.prevScene();
}
