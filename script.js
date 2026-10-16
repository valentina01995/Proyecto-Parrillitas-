/* =========================================
   DÍA 12
   CARGA DE JAVASCRIPT Y SELECCIÓN DEL DOM
========================================= */

console.log("JavaScript de Parrillitas CR cargado correctamente.");

const tituloPrincipal = document.querySelector(".hero-texto h1");
const menuPrincipal = document.querySelector(".menu");
const formularioContacto = document.querySelector("#contacto form");

// Mostrar únicamente si los elementos existen.
console.log("Título encontrado:", tituloPrincipal !== null);
console.log("Menú encontrado:", menuPrincipal !== null);
console.log("Formulario encontrado:", formularioContacto !== null);

if (tituloPrincipal && menuPrincipal && formularioContacto) {
  console.log("Todos los elementos fueron encontrados correctamente.");
} else {
  console.error("No se encontró algún elemento. Revisa los selectores.");
}

/* =========================================
   DÍA 13
   MENÚ ACCESIBLE CON APERTURA Y CIERRE
========================================= */

const botonMenu = document.querySelector(".menu-toggle");
const navegacionMenu = document.querySelector("#menu-principal");
const contenedorNavegacion = document.querySelector(".navbar");

console.log("Botón del menú encontrado:", botonMenu !== null);
console.log("Navegación encontrada:", navegacionMenu !== null);

if (botonMenu && navegacionMenu && contenedorNavegacion) {
  const pantallaMovil = window.matchMedia("(max-width: 768px)");

  function cambiarEstadoMenu(abierto) {
    navegacionMenu.classList.toggle("menu-abierto", abierto);
    botonMenu.setAttribute("aria-expanded", String(abierto));
    botonMenu.textContent = abierto ? "Cerrar menú" : "Menú";
  }

  // Un botón real también responde a Enter y espacio.
  botonMenu.addEventListener("click", function () {
    const estaAbierto =
      botonMenu.getAttribute("aria-expanded") === "true";

    cambiarEstadoMenu(!estaAbierto);
  });

  navegacionMenu.addEventListener("click", function (evento) {
    const enlaceSeleccionado = evento.target.closest("a");

    if (pantallaMovil.matches && enlaceSeleccionado) {
      botonMenu.focus();
      cambiarEstadoMenu(false);
    }
  });

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

  cambiarEstadoMenu(false);
  contenedorNavegacion.classList.add("menu-interactivo");
  botonMenu.hidden = false;

  console.log("Menú interactivo preparado correctamente.");
} else {
  console.error(
    "No se encontraron los elementos del menú. Revisa el HTML del día 13."
  );
}

/* =========================================
   DÍA 14
   VALIDACIÓN ACCESIBLE DEL FORMULARIO
========================================= */

const campoNombre = document.querySelector("#nombre");
const campoCorreo = document.querySelector("#correo");
const campoMensaje = document.querySelector("#mensaje");

const errorNombre = document.querySelector("#error-nombre");
const errorCorreo = document.querySelector("#error-correo");
const errorMensaje = document.querySelector("#error-mensaje");

const estadoFormulario = document.querySelector("#estado-formulario");

if (
  formularioContacto &&
  campoNombre &&
  campoCorreo &&
  campoMensaje &&
  errorNombre &&
  errorCorreo &&
  errorMensaje &&
  estadoFormulario
) {
  const camposFormulario = [
    { campo: campoNombre, error: errorNombre },
    { campo: campoCorreo, error: errorCorreo },
    { campo: campoMensaje, error: errorMensaje }
  ];

  // Validar usando las restricciones del HTML y revisar espacios.
  function validarCampo(campo, elementoError) {
    // Borrar cualquier error personalizado anterior.
    campo.setCustomValidity("");

    let mensajeError = "";

    if (campo.value.trim() === "") {
      if (campo === campoNombre) {
        mensajeError = "Escribe tu nombre. No uses solamente espacios.";
      } else if (campo === campoCorreo) {
        mensajeError = "Escribe tu correo electrónico.";
      } else {
        mensajeError = "Escribe tu mensaje. No uses solamente espacios.";
      }
    } else if (
      campo === campoCorreo &&
      campo.validity.typeMismatch
    ) {
      mensajeError =
        "Escribe un correo válido, por ejemplo: nombre@ejemplo.com.";
    } else if (!campo.validity.valid) {
      mensajeError = "Revisa este campo y completa un valor válido.";
    }

    campo.setCustomValidity(mensajeError);
    elementoError.textContent = mensajeError;

    if (mensajeError !== "") {
      campo.setAttribute("aria-invalid", "true");
      return false;
    }

    campo.removeAttribute("aria-invalid");
    return true;
  }

  camposFormulario.forEach(function (elemento) {
    // Revisar el campo al salir de él.
    elemento.campo.addEventListener("blur", function () {
      validarCampo(elemento.campo, elemento.error);
    });

    // Actualizar los errores mientras se corrige el campo.
    elemento.campo.addEventListener("input", function () {
      estadoFormulario.textContent = "";

      if (elemento.campo.getAttribute("aria-invalid") === "true") {
        validarCampo(elemento.campo, elemento.error);
      } else {
        elemento.campo.setCustomValidity("");
      }
    });
  });

  formularioContacto.addEventListener("submit", function (evento) {
    // Este formulario es de práctica y no envía información.
    evento.preventDefault();

    let primerCampoIncorrecto = null;

    camposFormulario.forEach(function (elemento) {
      const esValido = validarCampo(elemento.campo, elemento.error);

      if (!esValido && primerCampoIncorrecto === null) {
        primerCampoIncorrecto = elemento.campo;
      }
    });

    if (primerCampoIncorrecto) {
      estadoFormulario.textContent =
        "Revisa los campos indicados antes de continuar.";

      primerCampoIncorrecto.focus();
      return;
    }

    estadoFormulario.textContent =
      "Los datos son válidos. Esta es una prueba: el mensaje no se ha enviado.";
  });

  /*
  Desactivar solo los avisos emergentes automáticos para usar
  los mensajes junto a cada campo. required y type="email"
  se conservan y sus restricciones se consultan con validity.
  Sin JavaScript, el navegador mantiene su validación nativa.
  */
  formularioContacto.noValidate = true;

  console.log("Validación del formulario preparada correctamente.");
} else {
  // Evitar un envío accidental si falta algún elemento del formulario.
  if (formularioContacto) {
    formularioContacto.addEventListener("submit", function (evento) {
      evento.preventDefault();
    });
  }

  console.error(
    "Faltan elementos de validación. Revisa el HTML del día 14."
  );
}