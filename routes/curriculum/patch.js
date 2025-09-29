// Actualización parcial: patch
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

    const params = fields.map(f => data[f] !== undefined ? data[f] : null);

    const sql = `
        UPDATE curriculum SET
        Nombre=?, Apellido=?, Image=?, Titulo=?, Celular=?, Email=?, 
        Ubicacion=?, Perfil=?, Lugar_trabajo=?, Trabajo_1=?, Trabajo_2=?, 
        Lugar_de_Estudios=?, Estudios_1=?, Estudios_2=?, Idioma_1=?, Idioma_2=?
        WHERE id=? AND key=?
    `;

    // Agregamos id y key al final
    params.push(id, key);

    db.run(sql, params, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) {
            return res.status(404).json({ error: "Curriculum no encontrado o no autorizado" });
        }
        res.json({
            message: "Curriculum actualizado parcialmente con éxito (PATCH)",
            key: key,
            id: id,
            curriculum: data
        });
    });
});

module.exports = router;