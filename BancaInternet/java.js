const users = [
  {   
      name: "Fatima123",
      nombre: "Fátima",
      password: "1234",
      amount: 300,
      genero: "mujer",
  },
  {
      name: "Diego123",
      nombre: "Diego",
      password: '1234',
      amount: 400,
      genero: "hombre",
  },
  {
      name: "Juan123",
      nombre: "Juan Carlos",
      password: '1234',
      amount: 500,
      genero: "hombre",
  },
  {
      name: "Pedro123",
      nombre: "Pedro",
      password: '1234',
      amount: 450,
      genero: "hombre",
  }
]

function save_storage(i) {
  localStorage.setItem('indexUser', i)
}

function obtenerLocalStorage(key='indexUser') {
  return localStorage.getItem(key);
}

var indexUser = obtenerLocalStorage();
document.getElementById('name').innerHTML = users[indexUser].nombre;
document.getElementById('saldo-actual').innerHTML = users[indexUser].amount;
function getNameAndPass (username, key) {
  for (let i = 0; i < users.length; i++) {
      if (users[i].name == username && users[i].password == key) {
          save_storage(i);
          return true;
      }
  } return false;
}
function validacion() {
  var usuario = document.getElementById("exampleInputUser").value
  var contraseña = document.getElementById("exampleInputPassword").value
  if (getNameAndPass(usuario, contraseña)) {
    document.getElementById('good').innerHTML = "Inicio exitoso";
      //window.alert ("Inicio exitoso");
      window.location = "usuario1.html";
      console.log(obtenerLocalStorage(key='indexUser'));
  } else { 
    document.getElementById("wrong").innerHTML = "Ingrese usuario y contraseña válidos.";
     // alert ("Ingrese usuario y contraseña válidos");
  }
}

//Funciones de genero
if (users[indexUser].genero == "hombre") {
  document.getElementById('genero').innerHTML = "o";
} else {
  document.getElementById('genero').innerHTML = "a";
}

//Prueba de animación error
const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });

//Boton Depósito event handler
const deposito_btn = document.getElementById('depositar');
const saldo = document.getElementById("saldo-actual");
deposito_btn.addEventListener('click', function(){
  const depositStringToInt = getInputNumb("monto-deposito");
  if (users[indexUser].amount + depositStringToInt <= 990) {
      updateSpanTest("saldo-actual", depositStringToInt);
      users[indexUser].amount += depositStringToInt;
      document.getElementById('monto-deposito').placeholder = "Ingresa la cantidad a depositar";
  } else {
    animateCSS('#monto-deposito', 'shakeX').then((message) => {
      // Do something after the animation
    });  
    document.getElementById("monto-deposito").placeholder = "El saldo total no puede superar los US$990.";
   // alert("El saldo total no puede superar los US$990.");  
  }
  //setting up the input field blank when clicked
  document.getElementById('monto-deposito').value = "Ingresa la cantidad a depositar";
}) 
//Boton Retiro event handler
const retiro_btn = document.getElementById('retirar');
retiro_btn.addEventListener('click', function(){
  const retiroNumb = getInputNumb("monto-retiro");
  console.log(retiroNumb)
  if (users[indexUser].amount - retiroNumb >= 10) {
      updateSpanTest("saldo-actual", -1 * retiroNumb);
      users[indexUser].amount -= retiroNumb;
      document.getElementById('monto-retiro').placeholder = "Ingresa la cantidad a depositar";
  } else {
    animateCSS('#monto-retiro', 'shakeX').then((message) => {
      // Do something after the animation
    }); 
    document.getElementById("monto-retiro").placeholder = "El saldo total no puede ser inferior a US$10.";
     // alert("El saldo total no puede ser inferior a US$10.");
  }
  //setting up the input field blank when clicked
  document.getElementById('monto-retiro').value = "";
})
//function to parse string input to int
function getInputNumb(idName){
  const amount = document.getElementById(idName).value;
  const amountNumber = parseFloat(amount);
  return amountNumber;
}
function updateSpanTest(idName, addedNumber){
  //x1.1 updating balance the same way
  const current = document.getElementById(idName).innerText;
  const currentStringToInt = parseFloat(current);
  const total = currentStringToInt + addedNumber;
  //x1.2 setting this value in balance
  document.getElementById(idName).innerText = total;
}