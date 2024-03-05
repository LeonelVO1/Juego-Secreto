let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = parseInt(prompt("Digita el número máximo para iniciar el juego"));

//Función que sirve para Modificar el texto del HTML
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}


//Función que verifica si el número ingresado es el número secreto
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        //Si el usuario acierta el número secreto, desactivar el boton de Intentar
        document.querySelector('#intentar').setAttribute('disabled','true');        
        //Desactivar el boton de reiniciar al comenzar un nuevo juego
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acertó.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}


//Función que limpia el contenido de la caja donde el usuario ingresa un número
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}


//Función que genera un número secreto y alamcena los números en una lista
function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;

    //Si el numero generado está incluido en la lista 
    if (listaNumerosSorteados.includes(numeroGenerado)) {
        return generarNumeroSecreto();
    } else {
        listaNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
    }

}

//Función que muestra las condiciones iniciales en la panatalla
function condicionesIniciales() {
    //Texto mostrado en la pantalla inicial
    asignarTextoElemento('h1','¡Juego del número secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    //Inicialiazar el numero de intentos
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','JUEGO TERMINADO. ¡Ya se sortearon todos los números posibles!. Para un nuevo juego reinicia la página');
        limpiarCaja();
        //Deshabilitar el botón de nuevo juego
        document.querySelector('#reiniciar').setAttribute('disabled','true');
        //Deshabilitar el botón de Intentar
        document.querySelector('#intentar').setAttribute('disabled','true');
        
    } else {
        //Primero se debe limpiar caja
        limpiarCaja();
        //Indicar mensaje de intervalo de números 
        //Generar el número aleatorio
        //Inicializar el número intentos
        condicionesIniciales();
        //Deshabilitar el botón de nuevo juego
        document.querySelector('#reiniciar').setAttribute('disabled','true');
        //Volver a habilitar el boton de intentos
        document.getElementById('intentar').removeAttribute('disabled');    
    }
    
}


//Mandamos a llamar las condiciones iniciales para que se muentren de primera intencion en la pantalla
condicionesIniciales();