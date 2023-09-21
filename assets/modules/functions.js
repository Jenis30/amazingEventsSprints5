function nuevasTarjetas(objetoTarjeta) {
    return `
      <div class="card" style="width: 16rem ">
      <img src="${objetoTarjeta.image}" class="card-img-top" alt="food_fair">
      <div class="card-body">
        <h5 class="card-title">${objetoTarjeta.name}</h5>  
        <p class="card-text">${objetoTarjeta.description}</p>
        <div class="contain-detailes">
          <h3>$ ${objetoTarjeta.price}</h3>
          <a href="./assets/pages/details.html?serch=${objetoTarjeta._id}" class="btn btn-dark">details</a>
        </div>
      </div>
      </div>`
}

export function totalTarjetas(tarjetasData , contenedor) {
    let template = ""  
    for (let tarjeta of tarjetasData) {
      template +=  nuevasTarjetas(tarjeta)
    }
   contenedor.innerHTML=template
}

function estructuraCheckbox(categorias) {
  return `<div class="form-check">
  <input class="form-check-input" type="checkbox" value="${categorias}" id="${categorias.replace(" ", "-")}">
  <label class="form-check-label" for="${categorias.replace(" ", "-")}"> 
    ${categorias}
  </label>
</div>`
}
// referente a la linea 39 el input tiene que estar relacionado con el label por medio del ID y el for

export function totalCheckbox(dataCheckbox , contenedor) {
  let totalCheckbox = ""
  for (let checkbox of dataCheckbox) {
    totalCheckbox = totalCheckbox + estructuraCheckbox(checkbox)
  }
 contenedor.innerHTML = totalCheckbox
}

function primerFiltro(array , inputValue){ 
  return array.filter(evento => evento.name.toLowerCase().includes(inputValue.toLowerCase())) 
}

function segundoFiltro(array , category)  { 
  return array.filter(evento=>(category.includes(evento.category)|| category.length==0))
}

export function tercerFiltro(eventos , input , container){
  let checkValue = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(elemento => elemento.value)
  let primeraVuelta = primerFiltro(eventos , input.value)
  let segundoVuelta = segundoFiltro(primeraVuelta , checkValue)
  totalTarjetas(segundoVuelta , container)
}

export function tercerFiltroUpPast(eventos , input , container){
  let checkValue = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(elemento => elemento.value)
  let primeraVuelta = primerFiltro(eventos , input.value)
  let segundoVuelta = segundoFiltro(primeraVuelta , checkValue)
  totalTarjetasUpPas(segundoVuelta , container)
}

export function filtrar (listaTarjeta ,fecha){ 
  let upcoming= []
  for (let tarjeta of listaTarjeta) {
   if (tarjeta.date >= fecha){
      upcoming.push(tarjeta)
   }
  }
  return upcoming
}

export function filtrarPast (listaTarjeta ,fecha){ 
  let upcoming= []
  for (let tarjeta of listaTarjeta) {
   if (tarjeta.date < fecha){
      upcoming.push(tarjeta)
   }
  }
  return upcoming
}

function nuevasTarjetasUpPas(objetoTarjeta) {
  return `
    <div class="card" style="width: 16rem ">
    <img src="${objetoTarjeta.image}" class="card-img-top" alt="food_fair">
    <div class="card-body">
      <h5 class="card-title">${objetoTarjeta.name}</h5>  
      <p class="card-text">${objetoTarjeta.description}</p>
      <div class="contain-detailes">
        <h3>$ ${objetoTarjeta.price}</h3>
        <a href="./details.html?serch=${objetoTarjeta._id}" class="btn btn-dark">details</a>
      </div>
    </div>
    </div>`
}

export function totalTarjetasUpPas(tarjetasData , contenedor) {
  let template = ""  
  for (let tarjeta of tarjetasData) {
    template +=  nuevasTarjetasUpPas(tarjeta)
  }
 contenedor.innerHTML=template
}

export function crearTargeta(tarjeta){
  return `  <div class="card" id="targeta-detalle">
  <img  id="imagen-detalle" src="${tarjeta.image}" class="card-img-top" alt="food_fair">
  <div class="card-body">
    <h5 class="card-title">${tarjeta.name}</h5>
    <p class="card-text">${tarjeta.description} </p>
    <p class="card-text"><strong>${tarjeta.date}</strong> </p>
    <p class="card-text"><strong>${tarjeta.category}</strong> </p>
    <p class="card-text"><strong>${tarjeta.place}</strong></p>
    <p class="card-text"><strong>${tarjeta.capacity}</strong></p>
    <p class="card-text"><strong>${tarjeta.assistance || tarjeta.estimate}</strong></p>
    <p class="card-text"><strong>${tarjeta.price}</strong></p> 
  </div>
</div>`
}

export function maximaAsistencia(eventos){
  let porcentajeMayor = 1
  let eventoMayor
  eventos.forEach(evento => {
    let calculo = (evento.assistance * 100)/ evento.capacity
    if (calculo > porcentajeMayor){
      porcentajeMayor = calculo
      eventoMayor = evento
    }
  })
  return `${eventoMayor.name} ${porcentajeMayor.toFixed(1)}%`
}

export function menorAsistencia(eventos){
  let porcentajeMenor = 100
  let eventoMenor
  eventos.forEach(evento => {
    let calculo = (evento.assistance * 100)/ evento.capacity
    if (calculo < porcentajeMenor){
      porcentajeMenor = calculo
      eventoMenor = evento
    }
  })
  return `${eventoMenor.name} ${porcentajeMenor.toFixed(1)}%`
}

export function maxCapacidad(eventos){
  let maxCapacidad = 1;
  let eventoMaxCapacidad;
  eventos.forEach( evento => {
      if(evento.capacity > maxCapacidad){
          maxCapacidad = evento.capacity;
          eventoMaxCapacidad = evento;
      }
  });
  return `${eventoMaxCapacidad.name} ${maxCapacidad}`
};

export function segundaTabla(categorias, eventos){
  let tabla = `
      <tr>
          <td>Categories</td>
          <td>Revenues</td>
          <td>Percentage of assistance</td>
      </tr>`;
  categorias.forEach(categoria => {
      let eventoPorCat = eventos.filter(evento => evento.category == categoria)
      let ganancia = 0;
      let porcentaje = 0;
      eventoPorCat.forEach(e => {
              ganancia += (e.estimate * e.price)
              porcentaje += (e.estimate * 100 / e.capacity)/(eventoPorCat.length)
      })
      tabla += `
      <tr>
          <td>${categoria}</td>
          <td>$${ganancia.toLocaleString()}</td>
          <td>${porcentaje.toFixed(2)}%</td>
      </tr>`
  });
  return tabla;
}

export function tercerTabla(categorias, eventos){
  let tabla = `
      <tr>
          <td>Categories</td>
          <td>Revenues</td>
          <td>Percentage of assistance</td>
      </tr>`;
  //
  categorias.forEach(categoria => {
      let eventoPorCat = eventos.filter(evento => evento.category == categoria)
      let ganancia = 0;
      let porcentaje = 0;
      eventoPorCat.forEach(e => {
          ganancia += (e.assistance * e.price)
          porcentaje += (e.assistance * 100 / e.capacity)/(eventoPorCat.length)
      })
      tabla += `
      <tr>
          <td>${categoria}</td>
          <td>$${ganancia.toLocaleString()}</td>
          <td>${porcentaje.toFixed(2)}%</td>
      </tr>`
  });
  return tabla;
}