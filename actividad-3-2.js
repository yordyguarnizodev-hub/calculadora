let miCarrito = [];

function agregarProducto(carrito, producto) {
  // Retorna un nuevo arreglo esparciendo el viejo y añadiendo el nuevo al final
  return [...carrito, producto];
}

// Hacemos una prueba agregando el primer producto a nuestro carrito vacío
let carrito1 = agregarProducto(miCarrito, {
  id: 1,
  nombre: "Manzana",
  precio: 10,
  cantidad: 2,
});

//Segundo producto, otra variable ya que no podemos modificar los arreglos
let carrito2 = agregarProducto(carrito1, {
  id: 2,
  nombre: "Pera",
  precio: 20,
  cantidad: 5,
});

//Tercer producto, nuevamente otro arreglo
let carrito3 = agregarProducto(carrito2, {
  id: 3,
  nombre: "Limon",
  precio: 30,
  cantidad: 10,
});

//Imprimimos ultimo array
console.log(carrito3);

//Con filter, creamos un nuevo array, retornando todos los valores menos el id que se ponga
function eliminarProducto(carrito, id) {
  return carrito.filter((producto) => producto.id !== id);
}

//Guardamos en una nueva variable este filtro sin el id 2, es decir sin las peras
let carritoAfterDelete = eliminarProducto(carrito3, 2);
console.log(carritoAfterDelete);

//Calculamos el total del cesto, en este caso, ya que tenemos precio y cantidad, multiplicamos esos valores.
//No hay necesidad del return ya que la operacion es solo una linea. El 0 es el valor inicial
function totalCarrito(carrito) {
  return carrito.reduce(
    (inicial, producto) => inicial + producto.precio * producto.cantidad,
    0,
  );
}

console.log(totalCarrito(carritoAfterDelete));

function aplicarDescuento(carrito, porcentaje) {
  return totalCarrito(carrito) * porcentaje;
}

console.log(
  totalCarrito(carritoAfterDelete) - aplicarDescuento(carritoAfterDelete, 0.1),
);
