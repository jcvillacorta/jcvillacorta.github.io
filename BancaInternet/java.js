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
  function obtenerLocalStorage(key='indexUser') {
    return localStorage.getItem(key);
  }
  function save_storage(i) {
    localStorage.setItem('indexUser', i)
  }
  var indexUser = obtenerLocalStorage();
  document.getElementById('name').innerHTML = `${users[indexUser].nombre}`;
  document.getElementById('saldo-actual').innerHTML = `${users[indexUser].amount}`;
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
      document.getElementById('wrong').innerHTML = "Ingrese usuario y contraseña válidos. Ej: Pedro123 / 1234";
       // alert ("Ingrese usuario y contraseña válidos");
    }
  }
  
  //Funciones de genero
  if (users[indexUser].genero == "hombre") {
    document.getElementById('genero').innerHTML = "o";
  } else {
    document.getElementById('genero').innerHTML = "a";
  }
  
  // Funciones para borrar la alerta de montos mínimos y máximos
  function appearingErrorDeposito(){
    setTimeout(function(){ 
      document.getElementById("wrong_deposito").innerHTML = "";
  }, 3000); 
  }
  
  function appearingErrorRetiro(){
    setTimeout(function(){ 
      document.getElementById("wrong_retiro").innerHTML = "";
  }, 3000); 
  }
  
  //Boton Depósito event handler
  const deposito_btn = document.getElementById('depositar');
  const saldo = document.getElementById("saldo-actual");
  deposito_btn.addEventListener('click', function(){
    const depositStringToInt = getInputNumb("monto-deposito");
    if (users[indexUser].amount + depositStringToInt <= 990) {
        updateSpanTest("saldo-actual", depositStringToInt);
        users[indexUser].amount += depositStringToInt;
    } else {
    document.getElementById("wrong_deposito").innerHTML = "El saldo total no puede superar los US$990.";  
     // alert("El saldo total no puede superar los US$990.");  
    //return appearingErrorDeposito();
    }
    //setting up the input field blank when clicked
    document.getElementById('monto-deposito').value = "";
    return appearingErrorDeposito();
  }) 
  //Boton Retiro event handler
  const retiro_btn = document.getElementById('retirar');
  retiro_btn.addEventListener('click', function(){
    const retiroNumb = getInputNumb("monto-retiro");
    console.log(retiroNumb)
    if (users[indexUser].amount - retiroNumb >= 10) {
        updateSpanTest("saldo-actual", -1 * retiroNumb);
        users[indexUser].amount -= retiroNumb;
    } else {
      document.getElementById("wrong_retiro").innerHTML = "El saldo total no puede ser inferior a US$10.";
       // alert("El saldo total no puede ser inferior a US$10.");
    }
    //setting up the input field blank when clicked
    document.getElementById('monto-retiro').value = "";
    return appearingErrorRetiro();
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