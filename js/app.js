const cotizador= new API('5d684e08f4837306759a634c6b3742650be63cbfa362414ae0cf5228252cdac3');
const ui = new Interfaz();

cotizador.obtenerMonedasAPI();

// leer el formulario

const formulario = document.querySelector('#formulario');

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // leer la moneda seleccionada
  const monedaSelect = document.querySelector('#moneda');
  const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;

  // leer la criptomoneda seleccionada
  const criptoMonedaSelect = document.querySelector('#criptomoneda');
  const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;
  
  // comprovar que ambos campos tengan algo seleccionado
  if(monedaSeleccionada === '' || criptoMonedaSeleccionada === ''){
    // arrojar una alerta de error
    ui.mostrarMensaje('Ambos Campos son Obligatorios', 'alert bg-danger text-center');
  } else {
    // todo bien, consultar la api
    cotizador.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)
      .then(data => {
        ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, criptoMonedaSeleccionada)
      })
  }
})