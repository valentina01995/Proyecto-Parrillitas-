console.log("JavaScript de Parrillitas CR cargado correctamente.");

// Seleccionar elementos que existen en el HTML.
const tituloPrincipal = document.querySelector(".hero-texto h1");
const menuPrincipal = document.querySelector(".menu");
const formularioContacto = document.querySelector("#contacto form");

// Comprobar los selectores antes de trabajar con los elementos.
console.log("Título encontrado:", tituloPrincipal);
console.log("Menú encontrado:", menuPrincipal);
console.log("Formulario encontrado:", formularioContacto);

if (
  tituloPrincipal !== null &&
  menuPrincipal !== null &&
  formularioContacto !== null
) {
  console.log("Todos los elementos fueron encontrados correctamente.");
} else {
  console.error("No se encontró algún elemento. Revisa los selectores.");
}