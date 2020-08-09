
listeners();


function listeners(e) {

     //tomo el div que tiene todos los cursos
     document.querySelector('#lista-cursos').addEventListener('click', agregarCompra);

     document.querySelector('#lista-carrito').addEventListener('click', eliminarDeCarrito);

     document.addEventListener('DOMContentLoaded', mostrarEnListaDeCarritoDeComprasCursosRecuperadosDelLocalStorage);

     document.querySelector('#vaciar-carrito').addEventListener('click', vaciarCarritoConUnSoloBoton);

}

function agregarCompra(e) {

     e.preventDefault();

     //pregunto si el elemento donde hago click contiene la clase agregar-carrito
     if (e.target.classList.contains('agregar-carrito')) {

          const curso = e.target.parentElement.parentElement;



          //envio el curso seleccionado para leer sus datos
          leerDatosCurso(curso);
     }

}

function leerDatosCurso(curso) {

     cursoParaMostrarEncarrito = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id')
     }




     insertarEnCarrito(cursoParaMostrarEncarrito);

}

function insertarEnCarrito(curso) {

     listaCursos = document.querySelector('#lista-carrito tbody');

     const fila = document.createElement('tr');

     fila.innerHTML =

          `<td> <img src=" ${curso.imagen}" width="100"  </td>
    
     <td>  ${curso.titulo} </td>
    
     <td>   ${curso.precio} </td>

     <td>   <a href="#" class="borrar-curso" data-id="${curso.id}">X</a> </td>`




     listaCursos.appendChild(fila);

     agregarALocalStorageCursosSeleccionados(curso);




}

function agregarALocalStorageCursosSeleccionados(curso) {

     let todosLosCursos = recuperarArregloDeCursosDelLocalStorage();





     todosLosCursos.push(curso);


     localStorage.setItem('cursoEnCarrito', JSON.stringify(todosLosCursos));

}

function recuperarArregloDeCursosDelLocalStorage() {

     let arregloCursos = [];

     if (localStorage.getItem('cursoEnCarrito' === null)) {

          arregloCursos = [];
     } else {
          arregloCursos = JSON.parse(localStorage.getItem('cursoEnCarrito'));
     }

     return arregloCursos;

}

function mostrarEnListaDeCarritoDeComprasCursosRecuperadosDelLocalStorage() {


     listaCursos = document.querySelector('#lista-carrito tbody');

     recuperarArregloDeCursosDelLocalStorage().forEach(curso => {

          const fila = document.createElement('tr');

          fila.innerHTML =

               `<td> <img src=" ${curso.imagen}" width="100"  </td>
          
               <td>  ${curso.titulo} </td>
          
               <td>   ${curso.precio} </td>

               <td>   <a href="#" class="borrar-curso" data-id="${curso.id}">X</a> </td>`

          listaCursos.appendChild(fila);
     });



}

function eliminarDeCarrito(e) {

     e.preventDefault();

     if (e.target.classList.contains('borrar-curso')) {

          borrarCursoDelLocalStorage(e.target.parentElement.parentElement);
          e.target.parentElement.parentElement.remove();

     }

}

function borrarCursoDelLocalStorage(cursoAEliminar) {


     let idCurso = cursoAEliminar.querySelector('.borrar-curso').getAttribute('data-id');

     let copiaArregloLocalStorage = recuperarArregloDeCursosDelLocalStorage();

     copiaArregloLocalStorage.forEach(function (cursoCopiaLocalStorage, index) {

          if (idCurso === cursoCopiaLocalStorage.id) {
               copiaArregloLocalStorage.splice(index, 1);
          }
     })



     localStorage.setItem('cursoEnCarrito', JSON.stringify(copiaArregloLocalStorage));

}

function vaciarCarritoConUnSoloBoton(e) {

     e.preventDefault();

     let arregloVacio = [];




     document.querySelector('#lista-carrito tbody').remove();

     localStorage.setItem('cursoEnCarrito', JSON.stringify(arregloVacio));




}





