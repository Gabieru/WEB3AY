// Actualización parcial: PATCH
const express = require("express");
const router = express.Router();
const authMiddleware = require("../../auth.js");
const db = require("../../database/db.js");
const fields = [
    "Nombre", "Apellido", "Image", "Titulo", "Celular", "Email",
    "Ubicacion", "Perfil", "Lugar_trabajo", "Trabajo_1", "Trabajo_2",
    "Lugar_de_Estudios", "Estudios_1", "Estudios_2", "Idioma_1", "Idioma_2"
];

router.patch("/curriculum/patch/:id", authMiddleware, (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const key = req.header("Authorization");

    // Filtramos solo los campos enviados
    const updates = fields.filter(f => data[f] !== undefined);
    if (updates.length === 0) {
        return res.status(400).json({ error: "No se proporcionaron campos para actualizar" });
    }

    const setClause = updates.map(f => `${f}=?`).join(", ");
    const params = updates.map(f => data[f]);

    // Agregamos id y key al final
    params.push(id, key);

    const sql = `
        UPDATE curriculum SET ${setClause}
        WHERE id=? AND key=?
    `;

    db.run(sql, params, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) {
            return res.status(404).json({ error: "Curriculum no encontrado o no autorizado" });
        }
        res.json({
            message: "Curriculum actualizado parcialmente con éxito (PATCH)",
            key,
            id,
            curriculum: data
        });
    });
});

module.exports = router;
