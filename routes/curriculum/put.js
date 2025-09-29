// Put: actualización Parcial.
const express = require("express");
const router = express.Router();
const authMiddleware = require("../../auth.js");
const db = require("../../database/db.js");
const fields = [
    "Nombre", "Apellido", "Image", "Titulo", "Celular", "Email",
    "Ubicacion", "Perfil", "Lugar_trabajo", "Trabajo_1", "Trabajo_2",
    "Lugar_de_Estudios", "Estudios_1", "Estudios_2", "Idioma_1", "Idioma_2"
];
const { check_fields } = require("../check_fields.js");

router.put("/curriculum/put/:id", authMiddleware, (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const userKey = req.header("Authorization");

    if (!userKey) {
        return res.status(400).json({ error: "Falta la API key en el header" });
    }

    db.get("SELECT * FROM curriculum WHERE id = ?", [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: "Curriculum no encontrado" });
        }

        if (row.key !== userKey) {
            return res.status(403).json({
                error: "Key inválida, el curriculum no está asociado a tu auth-key"
            });
        }
        if (!row.Nombre && !row.Apellido) {
            return res.json({ message: "Este curriculum fue eliminado :(" });
        }
        // Si todo esta bien, hago la logica del put
        const sql = `
        UPDATE curriculum SET
        Nombre=?, Apellido=?, Image=?, Titulo=?, Celular=?, Email=?, 
        Ubicacion=?, Perfil=?, Lugar_trabajo=?, Trabajo_1=?, Trabajo_2=?, 
        Lugar_de_Estudios=?, Estudios_1=?, Estudios_2=?, Idioma_1=?, Idioma_2=?
        WHERE id=? AND key=?
    `;

        const params = [...fields.map(f => data[f]), id, userKey];

        db.run(sql, params, function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) {
                return res.status(404).json({ error: "Curriculum no encontrado o no autorizado" });
            }
            res.json({ message: "Items del curriculum reemplazados con éxito (PUT)" });
        });
    });
});

module.exports = router;