class Interfaz {

  constructor() {
    this.init();
  }

  init() {
    this.construirSelect();
  }
  construirSelect(){
      cotizador.obtenerMonedasAPI()
        .then(monedas => {

          // crear un select de opciones
          const select = document.querySelector('#criptomoneda')
          for(const [key, value] of Object.entries(monedas.monedas.Data)) {
            // añadir el symbol y el nombre como opciones
            const opcion = document.createElement('option');
            opcion.value = value.Symbol;
            opcion.appendChild(document.createTextNode(value.CoinName));
            select.appendChild(opcion);
          }
          
        })
  }
  mostrarMensaje(mensaje, clases) {
    const div = document.createElement('div');
    div.className = clases;
    div.appendChild(document.createTextNode(mensaje));

   // seleccionar mensajes - mostrar contenido
   const divMensaje = document.querySelector('.mensajes');
   divMensaje.appendChild(div);

   setTimeout(() => {
    document.querySelector('.mensajes div').remove();
   },3000)

  }

  // imprime el resultado de la cotización
  mostrarResultado(resultado, moneda, crypto) {

    
    const datosMoneda = resultado[crypto][moneda];
    console.log(datosMoneda);
    // REcortar digitos de precio
    let precio = datosMoneda.PRICE.toFixed(2),
        porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2),
        actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString();
    // construir el template
    let templateHTML = `
      <div class="card bg-warning">
        <div class="card-body text-light">
          <h2 class="card-title">Resultado:</h2>
          <p>El precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: $ ${precio}</p>
          <p>Variacion ultimo dia: % ${porcentaje}</p>
          <p>Ultima variacion: ${actualizado}
        </div>
      </div>
    `;

    this.mostrarOcultarSpinner('block');

    setTimeout(() => {
      
      document.querySelector('#resultado').innerHTML = templateHTML;
      this.mostrarOcultarSpinner('none');
    },3000);
    

    // insertar el resultado
  }

  mostrarOcultarSpinner(vista) {
    const spinner = document.querySelector('.contenido-spinner');
    spinner.style.display = vista;
  }
}