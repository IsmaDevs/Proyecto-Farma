Id = 0;

document.getElementById("btnModificar").style.display = "none"

const Clientes = () => {

    axios.get('http://localhost:3001/usuarios').then(resp => {

        console.log(resp);

        resp.data.map((client) => (document.getElementById("clientes").innerHTML += `
        
        
        <option value="${client.Nombre}">${client.Nombre}</option>
        
        
        `)
        
        )
    })

}

Clientes();

const Productos = () => {

    axios.get('http://localhost:3001/productos').then(resp => {

        console.log(resp);

        resp.data.map((producto) => (document.getElementById("productos").innerHTML += `
        
        
        <option value="${producto.Nombre}">${producto.Nombre}</option>
        
        
        `)
        
        )
    })

}

Productos();

const showSales = () => {

    axios.get('http://localhost:3001/ventas').then(resp => {

        console.log(resp);

        resp.data.map((venta) => (document.getElementById("ventas").innerHTML += `
        
        <tr class="table-light">
        <th scope="row">${venta.id}</th>
        <td><strong>${venta.Cliente}</td>
        <td><strong>${venta.Producto}</td>
        <td><strong>${venta.Precio}</td>
        <td><strong>${venta.Cantidad}</td>
        <td><strong>${venta.Total}</td>
        <td>
        <i class="fa-solid fa-trash"></i> <button type="button" class="btn btn-danger" onclick="deleteSales(${venta.id})">Eliminar</button>
        <i class="fa-solid fa-pen-to-square"></i> <button type="button" class="btn btn-warning" onclick="editSales(${venta.id}, '${venta.Cliente}','${venta.Producto}','${venta.Precio}','${venta.Cantidad}', '${venta.Total}')">Editar</button>
        <i class="fa-solid fa-eye"></i> <button type="button" class="btn btn-success" onclick="viewSales(${venta.id}, '${venta.Cliente}', '${venta.Producto}', '${venta.Precio}', '${venta.Cantidad}', '${venta.Total}', '')">Ver</button>
        </td>
      </tr>
        
        
        
        `))

    })

}

showSales();


const addSales = () => {

    let bandera = false;
    let bandera2 = false;

    let usuario = document.getElementById("clientes").value;
    let producto = document.getElementById("productos").value;

    let precio = document.getElementById("precio").value;
    let cantidad = document.getElementById("cantidad").value;

    let total = precio * cantidad

    axios.get('http://localhost:3001/usuarios/').then(resp => {
        console.log(resp);

        resp.data.forEach(user => {
           
            if(usuario === user.Nombre) {

                bandera = true
            }
            
        });

        if(bandera === true) {

            axios.get('http://localhost:3001/productos/').then(resp => {

                console.log(resp);

                resp.data.forEach(produc => {

                    if(producto === produc.Nombre) {

                        bandera2 = true
                    }

                })

                if (bandera2 === true) {
                    
                    axios.post('http://localhost:3001/ventas', {
                
                    
                        Cliente: usuario,
                        Producto: producto,
                        Precio: precio,
                        Cantidad: cantidad,
                        Total: total
                
                    }).then(resp => {
                        console.log(resp);
                        alert("Venta añadida con éxito!")
                        showSales();
                    }).catch(err => console.log(err))
                
                    } else {
                        alert("Producto no registrado!")
                    }

            }).catch(err => console.log(err)) // segundo get

        } else {
            alert("Cliente no registrado!")
        }

        
    }).catch(err => console.log(err)) // Primer get

}



const deleteSales = (id) => {

    Id = id

    axios.delete('http://localhost:3001/ventas/'+id).then(resp => {

        showSales();
        alert("Venta eliminada con éxito!")

    }).catch(err => console.log(err));


}



const editSales = (id, cliente, producto, precio, cantidad, total) => {

    Id = id
    total = total

    document.getElementById("clientes").value = cliente
    document.getElementById("productos").value = producto
    document.getElementById("precio").value = precio
    document.getElementById("cantidad").value = cantidad

    document.getElementById("btnAgregar").style.display = "none"
    document.getElementById("btnModificar").style.display = "inline-block"

}

const updateSales = () => {

    let bandera = false;
    let bandera2 = false;

    let usuario = document.getElementById("clientes").value;
    let producto = document.getElementById("productos").value;

    let precio = document.getElementById("precio").value;
    let cantidad = document.getElementById("cantidad").value;

    total = precio * cantidad

    axios.get('http://localhost:3001/usuarios/').then(resp => {
        console.log(resp);

        resp.data.forEach(user => {
           
            if(usuario === user.Nombre) {

                bandera = true
            }
            
        });

        if(bandera === true) {

            axios.get('http://localhost:3001/productos/').then(resp => {

                console.log(resp);

                resp.data.forEach(produc => {

                    if(producto === produc.Nombre) {

                        bandera2 = true
                    }

                })

                if (bandera2 === true) {
                    
                    axios.put('http://localhost:3001/ventas/'+Id, {
                
                    
                        Cliente: usuario, 
                        Producto: producto,
                        Precio: precio,
                        Cantidad: cantidad,
                        Total: total
                
                    }).then(resp => {
                        console.log(resp);

                        alert("Venta modificada con éxito!")

                        showSales();
                    }).catch(err => console.log(err))
                
                    } else {
                        alert("Producto no registrado!")
                    }

            }).catch(err => console.log(err)) // segundo get

        } else {
            alert("Cliente no registrado!")
        }

        
    }).catch(err => console.log(err)) // Primer get



}

document.getElementById("btnModificar").addEventListener("click",updateSales)

document.getElementById("btnAgregar").addEventListener("click",addSales);


const viewSales = (id, cliente, producto, precio, cantidad, total) => {

document.getElementById("ventas").innerHTML = `
<div class="card d-flex justify-content-center align-items-center" style="width: 18rem;">
<div class="card-body">
  <h5 class="card-title">#${id} - ${cliente}</h5>
  <p class="card-text">● PRODUCTO: ${producto}</p>
  <p class="card-text">● PRECIO: ${precio}</p>
  <p class="card-text">● CANTIDAD: ${cantidad}</p>
  <p class="card-text">● TOTAL PAGADO: ${total}</p>
  <i class="fa-solid fa-eye-slash"></i> <button type="button" class="btn btn-danger text-white" onclick="location.reload()">Dejar de ver</button>
</div>
</div>
</div>

`

document.getElementById("tabla").style.display = "none"

document.getElementById("inputCliente").style.display = "none"
document.getElementById("inputProducto").style.display = "none"
document.getElementById("inputPrecio").style.display = "none"
document.getElementById("inputCantidad").style.display = "none"

document.getElementById("btnAgregar").style.display = "none"
document.getElementById("titulo").style.display = "none"

}