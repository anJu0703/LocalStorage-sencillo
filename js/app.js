//Variables del documento
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");

//Variables
let tweets = [];

//Even Listeners
eventListeners();

function eventListeners(){

    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded',() =>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    });

};

//Funciones

function agregarTweet(e) {
    e.preventDefault();

    //Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //Validacion

    if (tweet === '') {
        mostrarMensaje('Un mensaje no puede ir vacio');
        return; //Evita que se ejecuten mas lineas de codigo
    };

    const tweetObj = {
        id: Date.now(),
        tweet
    };

    //Añadir el arreglo de tweets
    tweets = [...tweets, tweetObj];
    
    //Creacion de HTML
    crearHTML();

    //Reiniciar formulario
    formulario.reset();
};

//Mostrar mensaje de error
function mostrarMensaje(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
};

//Muestra un listado de los tweets
function crearHTML() {

    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            //Agregar un boton de eliminar
            const btnELiminar = document.createElement('a');
            btnELiminar.classList.add('borrar-tweet');
            btnELiminar.textContent = 'X';

            //Añadir la funcion de eliminar
            btnELiminar.onclick = () =>{
                borrarTweet(tweet.id);
            };

            //Crear HTML
            const li = document.createElement('li');

            //Añadir el texto
            li.innerText = tweet.tweet;

            //Asignar el boton
            li.appendChild(btnELiminar);

            //Insertar en el HTML
            listaTweets.appendChild(li);
        });
    };

    sincronizarStorage();
};

//Agrega los tweets actuales al LocalStorage
function sincronizarStorage() {
    localStorage.setItem('tweets',JSON.stringify(tweets));
};

//Elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter (tweet => tweet.id !== id);
    
    crearHTML();
}

//Limpiar HTML
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    };
};