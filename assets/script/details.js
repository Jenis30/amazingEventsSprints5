const { createApp } = Vue;

createApp({
  data() {
    return {
      event: [],
    };
  },
  created(){
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(( {events} ) => {
      let idEvento = new URLSearchParams(location.search).get("serch");
      this.event = events.find( evento => evento._id == idEvento);
    })
    .catch( err => console.log(err) )
  },
}).mount("#app");


// import { crearTargeta } from "../modules/functions.js"
// let URL_API = "https://mindhub-xj03.onrender.com/api/amazing"

// let url = window.location.search
// let parametro = new URLSearchParams(url)
// let idEvento = parametro.get("serch")

// fetch(URL_API)
// .then(Response => Response.json())
// .then(({events}) =>{
//   let comparacion = events.find((card) => card._id == idEvento)
//   document.getElementById("targeta-detalle").innerHTML = crearTargeta(comparacion)
// })
// .catch(err => console.log(err))

