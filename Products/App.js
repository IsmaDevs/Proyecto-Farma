
Id = 0;

document.getElementById("btnModificar").style.display = "none";



const showProductos = () => {

    axios.get('http://localhost:3001/productos')
    .then(resp => {
        
        console.log(resp)

        resp.data.map(
            (producto) => (document.getElementById("productos").innerHTML += `
        
            <tr class="table-light">
            <th scope="row">${producto.id}</th>
            <td><strong>${producto.Nombre}</td>
            <td><strong>${producto.Precio}</td>
            <td><strong>${producto.Tipo}</td>
            <td>
            <i class="fa-solid fa-trash"></i> <button type="button" class="btn btn-danger" onclick="deleteProduct(${producto.id})">Eliminar</button>
            <i class="fa-solid fa-pen-to-square"></i> <button type="button" class="btn btn-warning" onclick="editProduct(${producto.id},'${producto.Nombre}',${producto.Precio},'${producto.Tipo}')">Editar</button>
            <i class="fa-solid fa-eye"></i> <button type="button" class="btn btn-success" onclick="viewProduct(${producto.id},'${producto.Nombre}','${producto.Precio}','${producto.Tipo}')">Ver</button>
            </td>
          </tr>
        
        
        `)
        );
    }).catch(err => console.log(err));
}

showProductos();

// FUNCION QUE AGREGA UN PRODUCTO

const addProduct = () => {
    
    let producto = document.getElementById("producto").value
    let precio = document.getElementById("precio").value
    let tipo = document.getElementById("tipo").value

    axios.post('http://localhost:3001/productos/',{

        Nombre: producto,
        Precio: precio,
        Tipo: tipo
    }).then(resp => {
        console.log(resp);
        alert("Nuevo producto añadido con éxito!")
        showProductos();

    }).catch(err => (console.log(err)));
    
}

document.getElementById("btnAgregar").addEventListener("click", addProduct)

const deleteProduct = (id) => {

    Id = id;

   // console.log("El producto con el id "+Id+ "fue eliminado!");
    axios.delete('http://localhost:3001/productos/'+Id).then(resp=>{
        showProductos()
        alert("Producto eliminado con éxito!")
    }).catch(err => console.log(err));
}

const editProduct = (id, producto, precio, tipo) => {

    Id = id;

document.getElementById("producto").value = producto 
document.getElementById("precio").value = precio
document.getElementById("tipo").value = tipo


document.getElementById("btnAgregar").style.display = "none"
document.getElementById("btnModificar").style.display = "inline-block"

}

const updateProduct = () => {


    let producto = document.getElementById("producto").value
    let precio = document.getElementById("precio").value
    let tipo = document.getElementById("tipo").value

    if(producto === "" || precio === 0 || tipo === "")
    {
        alert("Por favor llena todos los campos faltantes!")
    } else {
        axios.put('http://localhost:3001/productos/'+Id,{

        Nombre: producto,
        Precio: precio,
        Tipo: tipo
        
    }).then(resp => {
        showProductos()
        alert("Producto actualizado con éxito!");
    })
}


}


const viewProduct = (id, producto, precio, tipo) => {

    document.getElementById("productos").innerHTML = `

    <tr class="table-light">
    <th scope="row">${id}</th>
    <td><strong>${producto}</td>
    <td><strong>${precio}</td>
    <td><strong>${tipo}</td>    
    <td>
    <i class="fa-solid fa-eye-slash"></i> <button type="button" class="btn btn-danger text-white" onclick="location.reload()">Dejar de ver</button>
    </td>
  </tr>
    
    `


}

document.getElementById("btnModificar").addEventListener("click",updateProduct)



const getProducto = async () => {
    let response = await axios.get('http://localhost:3001/productos/')
    console.log(response.data);
}

getProducto();


