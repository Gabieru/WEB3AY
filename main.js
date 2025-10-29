async function getCV() {
    const apikey='HnXLwakDft4bRbg4';

    // Hacemos fetch desde la API
    const response = await fetch("http://iic1005api3.ing.uc.cl/curriculum/" + input_nombre_cv.value, {
        method: "GET",
        headers: {
            "Authorization": apikey
        }
    });
    const data = await response.json();
    console.log(data);

    // En data tienen un objeto de JavaScript, ahora simplemente necesitan cargarlo. Ya tienen
    // todas las funciones que permiten cambiar abajo, solo deben usarlas.
    // Aquí les podría ser de ayuda hacer console.log de la data, así podrán saber los campos,
    // aunque también están en la documentación.
    cambiar_nombre(data["Nombre"]);
    cambiar_apellido(data["Apellido"]);
    cambiar_titulo(data["Titulo"]);
    cambiar_celular(data["Celular"]);
    cambiar_email(data["Email"]);
    cambiar_ubicacion(data["Ubicacion"]);
    cambiar_perfil(data["Perfil"]);
    cambiar_trabajo_institucion(data["Lugar_trabajo"]);
    cambiar_trabajo_1(data["Trabajo_1"]);
    cambiar_trabajo_2(data["Trabajo_2"]);
    cambiar_estudios_institucion(data["Lugar_de_Estudios"]);
    cambiar_estudios_1(data["Estudios_1"]);
    cambiar_estudios_2(data["Estudios_2"]);
    cambiar_idioma_1(data["Idioma_1"]);
    cambiar_idioma_2(data["Idioma_2"]);
}

async function postCV() {
    // Creamos el objeto que después pasaremos a JSON
    const json = {
        "Nombre_curriculum": input_nombre_cv.value,
        "Nombre": input_nombre.value,
        "Apellido": input_apellido.value,
        "Titulo": input_titulo.value,
        "Celular": input_celular.value,
        "Email": input_email.value,
        "Ubicacion": input_ubicacion.value,
        "Perfil": input_perfil.value,
        "Lugar_trabajo": input_trabajo_institucion.value,
        "Trabajo_1": input_trabajo_1.value,
        "Trabajo_2": input_trabajo_2.value,
        "Lugar_de_Estudios": input_estudios_institucion.value,
        "Estudios_1": input_estudios_1.value,
        "Estudios_2": input_estudios_2.value,
        "Idioma_1": input_idioma_1.value,
        "Idioma_2": input_idioma_2.value
    }

    console.log(json);
    const response = await fetch("http://iic1005api3.ing.uc.cl/curriculum/", {
        method: "POST",
        headers: {
            "Authorization": input_api_key.value,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
    });
    const data = await response.json();
    console.log(data);
}

async function allCVS() {
    const response = await fetch("http://iic1005api3.ing.uc.cl/curriculums/", {
        method: "GET",
        headers: {
            "Authorization": 'HnXLwakDft4bRbg4'
        }
    });
    const data = await response.json();
    console.log(data);
}



// Todo el código de acá hacia arriba es la "pauta", y no viene implementado en el main.js base.
//*------------------------------- NO TOCAR (si leerlo) ------------------------------*//

// Función para previsualizar el CV con los valores de los inputs
function previsualizarCV() {
    cambiar_nombre(input_nombre.value);
    cambiar_apellido(input_apellido.value);
    cambiar_titulo(input_titulo.value);
    cambiar_celular(input_celular.value);
    cambiar_email(input_email.value);
    cambiar_ubicacion(input_ubicacion.value);
    cambiar_perfil(input_perfil.value);
    cambiar_trabajo_institucion(input_trabajo_institucion.value);
    cambiar_trabajo_1(input_trabajo_1.value);
    cambiar_trabajo_2(input_trabajo_2.value);
    cambiar_estudios_institucion(input_estudios_institucion.value);
    cambiar_estudios_1(input_estudios_1.value);
    cambiar_estudios_2(input_estudios_2.value);
    cambiar_idioma_1(input_idioma_1.value);
    cambiar_idioma_2(input_idioma_2.value);
}

// Funciones para cambiar el contenido en la vista previa con el valor recibido
function cambiar_nombre(nombre) {
    tag_nombre.innerHTML = nombre;
}

function cambiar_apellido(apellido) {
    tag_apellido.innerHTML = apellido;
}

function cambiar_titulo(titulo) {
    tag_titulo.innerHTML = titulo;
}

function cambiar_celular(celular) {
    tag_celular.innerHTML = celular;
}

function cambiar_email(email) {
    tag_email.innerHTML = email;
}

function cambiar_ubicacion(ubicacion) {
   tag_ubicacion.innerHTML = ubicacion;
}

function cambiar_perfil(perfil) {
   tag_perfil.innerHTML = perfil;
}

function cambiar_trabajo_institucion(trabajo_institucion) {
   tag_trabajo_institucion.innerHTML = trabajo_institucion;
}

function cambiar_trabajo_1(trabajo_1) {
   tag_trabajo_1.innerHTML = trabajo_1;
}

function cambiar_trabajo_2(trabajo_2) {
   tag_trabajo_2.innerHTML = trabajo_2;
}

function cambiar_estudios_institucion(estudios_institucion) {
   tag_estudios_institucion.innerHTML = estudios_institucion;
}

function cambiar_estudios_1(estudios_1) {
   tag_estudios_1.innerHTML = estudios_1;
}

function cambiar_estudios_2(estudios_2) {
   tag_estudios_2.innerHTML = estudios_2;
}

function cambiar_idioma_1(idioma_1) {
   tag_idioma_1.innerHTML = idioma_1;
}

function cambiar_idioma_2(idioma_2) {
   tag_idioma_2.innerHTML = idioma_2;
}

// Referencias a los inputs en el formulario
input_nombre = document.getElementById("input-nombre");
input_apellido = document.getElementById("input-apellido");
input_titulo = document.getElementById("input-titulo");
input_celular = document.getElementById("input-celular");
input_email = document.getElementById("input-email");
input_ubicacion = document.getElementById("input-ubicacion");
input_perfil = document.getElementById("input-perfil");
input_trabajo_institucion = document.getElementById("input-trabajo-institucion");
input_trabajo_1 = document.getElementById("input-trabajo-1");
input_trabajo_2 = document.getElementById("input-trabajo-2");
input_estudios_institucion = document.getElementById("input-estudios-institucion");
input_estudios_1 = document.getElementById("input-estudios-1");
input_estudios_2 = document.getElementById("input-estudios-2");
input_idioma_1 = document.getElementById("input-idioma-1");
input_idioma_2 = document.getElementById("input-idioma-2");
input_api_key = document.getElementById("input-api-key");
input_nombre_cv = document.getElementById("input-nombre-cv");

// Referencias a los tags en la vista previa
tag_nombre = document.getElementById("nombre");
tag_apellido = document.getElementById("apellido");
tag_titulo = document.getElementById("titulo");
tag_celular = document.getElementById("celular");
tag_email = document.getElementById("email");
tag_ubicacion = document.getElementById("ubicacion");
tag_perfil = document.getElementById("perfil");
tag_trabajo_institucion = document.getElementById("trabajo-institucion");
tag_trabajo_1 = document.getElementById("trabajo-1");
tag_trabajo_2 = document.getElementById("trabajo-2");
tag_estudios_institucion = document.getElementById("estudios-institucion");
tag_estudios_1 = document.getElementById("estudios-1");
tag_estudios_2 = document.getElementById("estudios-2");
tag_idioma_1 = document.getElementById("idioma-1");
tag_idioma_2 = document.getElementById("idioma-2");

// Referencias a los botones
boton_guardar_cv = document.getElementById("boton-guardar-CV");
boton_recuperar_cvs = document.getElementById("boton-recuperar-todos-CV");
boton_recuperar_cv_por_nombre = document.getElementById("boton-recuperar-CV");
boton_previsualizar_cv = document.getElementById("boton-previsualizar-CV");

boton_previsualizar_cv.addEventListener("click", previsualizarCV);

// Importante: Acordarse de conectar el botón:

boton_guardar_cv.addEventListener("click", postCV);
boton_recuperar_cv_por_nombre.addEventListener("click", getCV);
boton_recuperar_cvs.addEventListener("click", allCVS);
