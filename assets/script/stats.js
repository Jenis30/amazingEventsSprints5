// import { maximaAsistencia } from "../modules/functions";

// const { createApp } = Vue;

// createApp({
//   data() {
//     return {
//         events: [],
//        mayorAsistencia : "",
//        menorAsistencia : "",
//        mayorCapacidad : ""
//     };
//   },
//   created(){
//     fetch('https://mindhub-xj03.onrender.com/api/amazing')
//     .then(response => response.json())
//     .then(( {events, currentDate} ) => {
//       this.mayorAsistencia = maximaAsistencia(events, currentDate)
//     })
//     .catch( err => console.log(err) )
//   },

// methods:{
//     maximaAsistencia(eventos){
//         let porcentajeMayor = 1
//         let eventoMayor
//         eventos.forEach(evento => {
//           let calculo = (evento.assistance * 100)/ evento.capacity
//           if (calculo > porcentajeMayor){
//             porcentajeMayor = calculo
//             eventoMayor = evento
//           }
//         })
//         return `${eventoMayor.name} ${porcentajeMayor.toFixed(1)}%`
//       },
      
//        menorAsistencia(eventos){
//         let porcentajeMenor = 100
//         let eventoMenor
//         eventos.forEach(evento => {
//           let calculo = (evento.assistance * 100)/ evento.capacity
//           if (calculo < porcentajeMenor){
//             porcentajeMenor = calculo
//             eventoMenor = evento
//           }
//         })
//         return `${eventoMenor.name} ${porcentajeMenor.toFixed(1)}%`
//       },
      
//        maxCapacidad(eventos){
//         let maxCapacidad = 1;
//         let eventoMaxCapacidad;
//         eventos.forEach( evento => {
//             if(evento.capacity > maxCapacidad){
//                 maxCapacidad = evento.capacity;
//                 eventoMaxCapacidad = evento;
//             }
//         });
//         return `${eventoMaxCapacidad.name} ${maxCapacidad}`
//       }
// }

// })


const { createApp } = Vue;

createApp({
  data() {
    return {
        events: [],
        pastEvents: [],
        tablaDos: [],
        tablaTres: [],
        listaCheckUp: [],
        listaCheckPast:[],
    };
  },
  created(){
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(( {events, currentDate} ) => {
        this.events = events;
        this.pastEvents = events.filter( evento => evento.date < currentDate );
        console.log(this.pastEvents)
       let eventosUpcoming = events.filter( evento => evento.date >= currentDate );
        this.listaCheckUp = [...new Set( eventosUpcoming.map( event => event.category ) )]
        this.tablaDos = this.segundaTabla(this.listaCheckUp, eventosUpcoming)
        this.listaCheckPast = [...new Set( this.pastEvents.map( event => event.category ) )]
        this.tablaTres = this.tercerTabla(this.listaCheckPast, this.pastEvents);
    })
    .catch( err => console.log(err) )
  },
  methods:{
    porcentajeMayor(eventos){
        let porcentMayor = 1; 
        let eventoMayor; 
        eventos.forEach( evento => {
            let calculo = (evento.assistance*100)/evento.capacity
            if(calculo > porcentMayor){
                porcentMayor = calculo;
                eventoMayor = evento.name;
            }
        });
        return `${eventoMayor} ${porcentMayor.toFixed(1)}%`
    },
    porcentajeMenor(eventos){
        let porcentMayor = 100; 
        let eventoMayor; 
        eventos.forEach( evento => {
            let calculo = (evento.assistance*100)/evento.capacity
            if(calculo < porcentMayor){
                porcentMayor = calculo;
                eventoMayor = evento.name;
            }
        });
        return `${eventoMayor} ${porcentMayor.toFixed(1)}%`
    },
    capacidadMax(eventos){
        let maxCapacidad = 1;
        let eventoMaxCapacidad;
        eventos.forEach( evento => {
            if(evento.capacity > maxCapacidad){
                maxCapacidad = evento.capacity;
                eventoMaxCapacidad = evento.name;
            }
        });
        return `${eventoMaxCapacidad} ${maxCapacidad}`;
    },
    segundaTabla(categorias, eventos){
        let tabla = [];
        categorias.forEach(categoria => {
            let eventoPorCat = eventos.filter(evento => evento.category == categoria)
            let ganancia = 0;
            let porcentaje = 0;
            eventoPorCat.forEach(e => {
                    ganancia += (e.estimate * e.price)
                    porcentaje += (e.estimate * 100 / e.capacity)/(eventoPorCat.length)
            })
            if(ganancia !== 0 && porcentaje !== 0){
                tabla.push(
                    {
                        categoria: categoria,
                        ganancia: `$${ganancia.toLocaleString()}`,
                        porcentaje: `${porcentaje.toFixed(2)} %`
                    }
                ) 
            }
        });
        return tabla;
    },
    tercerTabla(categorias, eventos){
        let tabla = [];
        categorias.forEach(categoria => {
            let eventoPorCat = eventos.filter(evento => evento.category == categoria)
            let ganancia = 0;
            let porcentaje = 0;
            eventoPorCat.forEach(e => {
                    ganancia += (e.assistance * e.price)
                    porcentaje += (e.assistance * 100 / e.capacity)/(eventoPorCat.length)
            })
            if(ganancia !== 0 && porcentaje !== 0){
                tabla.push(
                    {
                        categoria: categoria,
                        ganancia: `$${ganancia.toLocaleString()}`,
                        porcentaje: `${porcentaje.toFixed(2)} %`
                    }
                ) 
            }
        });
        console.log(tabla)
        return tabla;
    },
  },
  computed:{
    
  }
}).mount("#app");

// import { maximaAsistencia , menorAsistencia , maxCapacidad , segundaTabla , filtrar , filtrarPast , tercerTabla} from "../modules/functions.js"
// let URL_API = "https://mindhub-xj03.onrender.com/api/amazing"


// let mayorPorcentaje = document.getElementById("mayorPorcentaje")
// let menorPorcenaje = document.getElementById("menorPorcentaje")
// let mayorCapacidad = document.getElementById("mayorCapacidad")
// let $segundaTabla = document.getElementById("segundaTabla")
// let $terceraTabla = document.getElementById("terceraTabla")

// fetch(URL_API)

// .then(Response => Response.json())
// .then(({events , currentDate}) =>{
// mayorPorcentaje.innerHTML = maximaAsistencia(events)
// menorPorcenaje.innerHTML = menorAsistencia(events)
// mayorCapacidad.innerHTML = maxCapacidad(events)
// let eventosUpcoming = filtrar (events , currentDate)
// let categoriasMap = events.map( evento => evento.category)
// let categorias = [...new Set(categoriasMap)]
// $segundaTabla.innerHTML = segundaTabla(categorias , eventosUpcoming)

// let eventosPast = filtrarPast(events , currentDate)
// console.log(eventosPast)
// $terceraTabla.innerHTML = tercerTabla(categorias , eventosPast)
// console.log(tercerTabla(categorias , eventosPast))
// })
// .catch(err => console.log(err))