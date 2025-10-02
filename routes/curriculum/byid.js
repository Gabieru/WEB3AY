const db = require("../../database/db"); // Ajusta según tu proyecto

function getCurriculumsByKey(userKey, callback) {
    if (!userKey) {
        return callback(new Error("Falta la API key"), null);
    }

    const query = `
        SELECT id, Nombre_curriculum
        FROM curriculum 
        WHERE key = ? AND Nombre_curriculum IS NOT NULL
    `;

    db.all(query, [userKey], (err, rows) => {
        if (err) return callback(err, null);
        callback(null, rows);
    });
}

module.exports = { getCurriculumsByKey };