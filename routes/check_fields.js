// Función que revisa los campos obligatorios de los curriculum
function check_fields(data) {

    const requiredFields = [
        "Nombre", "Apellido", "Titulo", "Celular", "Email",
        "Ubicacion", "Perfil", "Lugar_trabajo", "Trabajo_1", "Trabajo_2",
        "Lugar_de_Estudios", "Estudios_1", "Estudios_2", "Idioma_1", "Idioma_2"
    ];
    // Retorno filtro de datos
    return requiredFields.filter(field => !data[field]);
}

module.exports = { check_fields }