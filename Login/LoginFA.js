

const btnIngresar = () => {
    let usuario = document.getElementById("usuario").value;
    let password = document.getElementById("password").value;

    let bandera = false;

axios.get('http://localhost:3001/usuarios/')
.then(resp=>{
console.log(resp.data);
    
resp.data.forEach((user)=>{ 

if(usuario === user.Nombre && password === user.Pass) {
    
        bandera = true;

    } 

})

if(bandera === true) {

    window.location.href = "../Home/home.html"
    alert("Bienvenido!")
} else {
    alert("Usuario o contraseña incorrecta, intente nuevamente!")
    LimpiarInputs();
}


}).catch(err=>console.log(err));


}


const LimpiarInputs = () => {

    document.getElementById("usuario").value = "";
    document.getElementById("password").value = "";

}

document.getElementById("btnSign").addEventListener("click", btnIngresar);