const db = require("../../database/db"); // Ajusta según tu proyecto

function getCurriculumIdsByKey(userKey, callback) {
    if (!userKey) {
        return callback(new Error("Falta la API key"), null);
    }

    const query = `
        SELECT id 
        FROM curriculum 
        WHERE key = ? AND Nombre IS NOT NULL AND Apellido IS NOT NULL
    `;

    db.all(query, [userKey], (err, rows) => {
        if (err) return callback(err, null);

        const ids = rows.map(row => row.id);
        callback(null, ids);
    });
}

module.exports = { getCurriculumIdsByKey };