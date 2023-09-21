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
    this.eventos = this.filtroUpcoming(events , currentDate)
    this.filtrados = this.eventos
    let categoriasMap = this.eventos.map( evento => evento.category)
    this.categorias = [...new Set(categoriasMap)]
  })
  .catch(error => console.log(error))
},
// el lugar donde se declaran las funciones
methods:{
 filtroUpcoming (listaTarjeta ,fecha){ 
  let upcoming= []
  for (let tarjeta of listaTarjeta) {
   if (tarjeta.date >= fecha){
      upcoming.push(tarjeta)
   }
  }
  return upcoming
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