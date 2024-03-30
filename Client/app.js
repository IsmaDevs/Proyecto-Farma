
Id = 0;
document.getElementById("btnModificar").style.display = "none"

const showUsuarios = () => {

    axios.get('http://localhost:3001/usuarios').then(resp => {

        console.log(resp);

        resp.data.map((usuario) => (document.getElementById("usuarios").innerHTML += `
        
        <tr class="table-light">
        <th scope="row">${usuario.id}</th>
        <td><strong>${usuario.Nombre}</td>
        <td><strong>${usuario.Dni}</td>
        <td><strong>${usuario.Domicilio}</td>
        <td><strong>${usuario.Email}</td>
        <td>
        <i class="fa-solid fa-trash"></i> <button type="button" class="btn btn-danger" onclick="deleteUsuario(${usuario.id})">Eliminar</button>
        <i class="fa-solid fa-pen-to-square"></i> <button type="button" class="btn btn-warning" onclick="editUsuario(${usuario.id}, '${usuario.Nombre}','${usuario.Dni}','${usuario.Domicilio}','${usuario.Email}')">Editar</button>
        <i class="fa-solid fa-eye"></i> <button type="button" class="btn btn-success" onclick="viewUsuario(${usuario.id}, '${usuario.Nombre}','${usuario.Dni}','${usuario.Domicilio}','${usuario.Email}')">Ver</button>
        </td>
      </tr>
        
        
        `)
        )
    })
}

showUsuarios();


const agregarUsuario = () => {

    
    let nombre = document.getElementById("nombre").value
    let dni = document.getElementById("dni").value
    let domicilio = document.getElementById("domi").value
    let email = document.getElementById("mail").value

    axios.post('http://localhost:3001/usuarios/', {

        Nombre: nombre,
        Dni: dni,
        Domicilio: domicilio,
        Email: email

    }).then(resp => {
        console.log(resp);
        alert("Usuario añadido con éxito!")
        showUsuarios();
    }).catch(err => console.log(err));

}

document.getElementById("btnAgregar").addEventListener("click", agregarUsuario)


const deleteUsuario = (id) => {


Id = id;

axios.delete('http://localhost:3001/usuarios/'+Id).then(resp => {

    showUsuarios();
    alert("Usuario eliminado con éxito!")

}).catch(err => console.log(err));

}

const editUsuario = (id, nombre, dni, domicilio, mail) => {

    Id = id;
     
    document.getElementById("nombre").value = nombre
    document.getElementById("dni").value = dni
    document.getElementById("domi").value = domicilio
    document.getElementById("mail").value = mail

    document.getElementById("btnAgregar").style.display = "none"
    document.getElementById("btnModificar").style.display = "inline-block"

}

const updateUsuario = () => {

    let nombre = document.getElementById("nombre").value
    let dni = document.getElementById("dni").value
    let domicilio = document.getElementById("domi").value
    let email = document.getElementById("mail").value

if(nombre === "" || dni === 0 || domicilio === "" || email === "") {

    alert("Por favor complete los campos restantes!")
} else {

    axios.put('http://localhost:3001/usuarios/'+Id, {

        Nombre: nombre,
        Dni: dni,
        Domicilio: domicilio,
        Email: email

}).then(resp => {

    alert("Usuario modificado con éxito!")
    showUsuarios();

}).catch(err => console.log(err));

    }
}

document.getElementById("btnModificar").addEventListener("click",updateUsuario)


const viewUsuario = (id, nombre, dni, domicilio, email) => {

    document.getElementById("usuarios").innerHTML = `
    
    <tr class="table-light">
    <th scope="row">${id}</th>
    <td><strong>${nombre}</td>
    <td><strong>${dni}</td>
    <td><strong>${domicilio}</td>
    <td><strong>${email}</td>
    <td>
    <i class="fa-solid fa-eye-slash"></i> <button type="button" class="btn btn-danger text-white" onclick="location.reload()">Dejar de ver</button>
    </td>
  </tr>
    `

}