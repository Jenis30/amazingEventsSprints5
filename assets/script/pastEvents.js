const { createApp } = Vue; // destructurin

createApp({
  data(){
    return{
      eventos:[],
      categorias:[],
      usuarioInput:"",
      checkSeleccionados:[],
      filtrados:[],
    }
  },
created(){
  fetch( "https://mindhub-xj03.onrender.com/api/amazing")
  .then(respuesta => respuesta.json())
  .then(({events , currentDate})=>{
    this.eventos = this.filtroPast(events , currentDate)
    this.filtrados = this.eventos
    let categoriasMap = this.eventos.map( evento => evento.category)
    this.categorias = [...new Set(categoriasMap)]
  })
  .catch(error => console.log(error))
},
// el lugar donde se declaran las funciones
methods:{
 filtroPast (listaTarjeta ,fecha){ 
  let past = []
  for (let tarjeta of listaTarjeta) {
   if (tarjeta.date <fecha){
      past.push(tarjeta)
   }
  }
  return past
},
  filtroSearch(array , inputValue){ 
    return array.filter(evento => evento.name.toLowerCase().includes(inputValue.toLowerCase())) 
  },

   filtroCheck(array , category)  { 
    return array.filter(evento=>(category.includes(evento.category)|| category.length==0))
  },
   filtroCruzado(){
    let primeraVuelta = this.filtroSearch(this.eventos , this.usuarioInput)
    this.filtrados = this.filtroCheck(primeraVuelta , this.checkSeleccionados)
  }
}
}).mount('#app')

// import { filtrarPast , totalTarjetasUpPas , totalCheckbox , tercerFiltroUpPast} from "../modules/functions.js"
// let URL_API = "https://mindhub-xj03.onrender.com/api/amazing"

// let containerTarjeta = document.getElementById("container-tarjetas")
// let containerSearch = document.getElementById("inputSearch")
// let containerCheckbox = document.getElementById("container-check")
// let eventos

// fetch(URL_API)
// .then(Response => Response.json())
// .then(({events , currentDate}) =>{
// eventos = events
//   let listaPasado = filtrarPast(events , currentDate) 
//   totalTarjetasUpPas(listaPasado , containerTarjeta)
//   let categoriasMap = events.map(evento => evento.category)
//   let categorias = [...new Set(categoriasMap)]
//   totalCheckbox(categorias ,containerCheckbox)

// })
// .catch(err => console.log(err))
  
// // escuchadores de eventos

// containerSearch.addEventListener("input" ,()=>{
//   tercerFiltroUpPast(eventos , containerSearch  , containerTarjeta)
// })

// containerCheckbox.addEventListener("change",() =>{
//   tercerFiltroUpPast( eventos , containerSearch  , containerTarjeta)
// })


