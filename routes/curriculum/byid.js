const db = require("../../database/db"); // Ajusta según tu proyecto

function getCurriculumsByKey(userKey, callback) {
    if (!userKey) {
        return callback(new Error("Falta la API key"), null);
    }

    const query = `
        SELECT id, Nombre_usuario
        FROM curriculum 
        WHERE key = ? AND Nombre IS NOT NULL AND Apellido IS NOT NULL
    `;

    db.all(query, [userKey], (err, rows) => {
        if (err) return callback(err, null);
        callback(null, rows);
    });
}

module.exports = { getCurriculumsByKey };