/* =========================================
   DÍA 12
   CARGA DE JAVASCRIPT Y SELECCIÓN DEL DOM
========================================= */

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

/* =========================================
   DÍA 13
   MENÚ ACCESIBLE CON APERTURA Y CIERRE
========================================= */

// Seleccionar y comprobar los elementos del menú.
const botonMenu = document.querySelector(".menu-toggle");
const navegacionMenu = document.querySelector("#menu-principal");
const contenedorNavegacion = document.querySelector(".navbar");

console.log("Botón del menú encontrado:", botonMenu);
console.log("Navegación encontrada:", navegacionMenu);

if (botonMenu && navegacionMenu && contenedorNavegacion) {
  const pantallaMovil = window.matchMedia("(max-width: 768px)");

  // Actualizar la clase, el estado accesible y el texto del botón.
  function cambiarEstadoMenu(abierto) {
    navegacionMenu.classList.toggle("menu-abierto", abierto);
    botonMenu.setAttribute("aria-expanded", String(abierto));
    botonMenu.textContent = abierto ? "Cerrar menú" : "Menú";
  }

  // Abrir o cerrar al pulsar el botón.
  // Un button real también responde a Enter y espacio.
  botonMenu.addEventListener("click", function () {
    const estaAbierto =
      botonMenu.getAttribute("aria-expanded") === "true";

    cambiarEstadoMenu(!estaAbierto);
  });

  // Cerrar al seleccionar un enlace en una pantalla pequeña.
  navegacionMenu.addEventListener("click", function (evento) {
    const enlaceSeleccionado = evento.target.closest("a");

    if (pantallaMovil.matches && enlaceSeleccionado) {
      botonMenu.focus();
      cambiarEstadoMenu(false);
    }
  });

  // Cerrar con Escape y devolver el foco al botón.
  contenedorNavegacion.addEventListener("keydown", function (evento) {
    const estaAbierto =
      botonMenu.getAttribute("aria-expanded") === "true";

    if (
      evento.key === "Escape" &&
      pantallaMovil.matches &&
      estaAbierto
    ) {
      botonMenu.focus();
      cambiarEstadoMenu(false);
    }
  });

  // Reiniciar el menú al cambiar entre móvil y computadora.
  pantallaMovil.addEventListener("change", function () {
    if (
      pantallaMovil.matches &&
      navegacionMenu.contains(document.activeElement)
    ) {
      botonMenu.focus();
    }

    if (!pantallaMovil.matches && document.activeElement === botonMenu) {
      const primerEnlace = navegacionMenu.querySelector("a");

      if (primerEnlace) {
        primerEnlace.focus();
      }
    }

    cambiarEstadoMenu(false);
  });

  // Activar el control después de preparar los eventos.
  cambiarEstadoMenu(false);
  contenedorNavegacion.classList.add("menu-interactivo");
  botonMenu.hidden = false;

  console.log("Menú interactivo preparado correctamente.");
} else {
  console.error(
    "No se encontraron los elementos del menú. Revisa el HTML del día 13."
  );
}