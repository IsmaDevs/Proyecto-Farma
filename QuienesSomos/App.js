let Id = 0;

document.getElementById("btnActualizar").style.display = "none"

const mostrarIntegrantes = () => {

    axios.get("http://localhost:3001/integrantes")
        .then(resp => {
            console.log(resp.data)
            resp.data.map((integrantes) => document.getElementById("Nosotros").innerHTML += `
        
        <tr>
          <th scope="row">${integrantes.id}</th>
          <td>${integrantes.Nombre}</td>
          <td>${integrantes.Edad}</td>
          <td><img src="${integrantes.Imagen}" alt=""style="width: 3rem;" ></td>
          <td>
          <button type= "button" class ="btn btn-secondary" onclick= "verIntegrante(${integrantes.id},'${integrantes.Nombre}','${integrantes.Edad}','${integrantes.Imagen}' )"> <i class="fa-sharp fa-solid fa-eye" style="color: #245ab7;"></i> </button>
          </td>
        </tr>
        
        `)
        })
        .catch(error => console.log(error))

}
  

mostrarIntegrantes();


const agregarIntegrante = () => {

    let Nombre = document.getElementById("nombre").value
    let Edad = document.getElementById("edad").value

    axios.post("http://localhost:3001/producto/",
        {
            Nombre,
            Edad,

        }).then(resp => {
            console.log(resp);
            alert("Se agrego correctamente")
            mostrarIntegrantes();

        }).catch(error => console.log(error))
}


document.getElementById("btnAgregar").addEventListener("click", agregarIntegrante)



const eliminarIntegrante = (id) => {

    console.log("el id es este" + id);
    axios.delete("http://localhost:3001/integrantes/" + id)
        .then(resp => {
            mostrarIntegrantes()
            alert("Se borro correctamente")

        }).catch(error => console.log(error))


}


const editarIntegrante = (id, nombre, edad) => {

    Id = id;
    document.getElementById("nombre").value = nombre;
    document.getElementById("edad").value = edad;

    document.getElementById("btnAgregar").style.display = "none"
    document.getElementById("btnActualizar").style.display = "inline-block"



}

const actualizarIntegrante = () => {
    let Nombre = document.getElementById("nombre").value
    let Edad = document.getElementById("edad").value

    if (nombre === "" || edad === "") {

        alert("Rellenar todo los campos")
    } else {
        axios.put("http://localhost:3001/integrantes/" + Id, {

            Nombre,
            Edad,


        }).then(resp => {

            alert("Integrante actualizado correctamente")

        })

    }



}

document.getElementById("btnActualizar").addEventListener("click", actualizarIntegrante)


const verIntegrante = (id, nombre, edad, imagen) => {

    document.getElementById("Nosotros2").innerHTML = `

<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${imagen}" alt="Card image cap">
  <div class="card-body">
    <h3 class="card-title">${nombre}</h3>
    <p class="card-text">Edad: ${edad}</p>
   
  </div>
</div>


`

}