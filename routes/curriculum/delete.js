const express = require("express");
const router = express.Router();
const db = require("../../database/db");
const authMiddleware = require("../../auth.js");


router.delete("/curriculum/:name", authMiddleware, (req, res) => {
    const name = req.params.name;
    const userKey = req.header("Authorization");

    if (!userKey) {
        return res.status(400).json({ error: "Falta la API key en el header" });
    }

    // Buscamos curriculum por Nombre + key
    db.get("SELECT * FROM curriculum WHERE key = ? AND Nombre = ?", [userKey, name], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Curriculum no encontrado para este nombre y key" });

        if (!row.Nombre && !row.Apellido) {
            return res.json({ message: "Curriculum ya estaba eliminado :(" });
        }

        db.run(
            `UPDATE curriculum SET 
                Nombre = NULL,
                Apellido = NULL,
                Image = NULL,
                Titulo = NULL,
                Celular = NULL,
                Email = NULL,
                Ubicacion = NULL,
                Perfil = NULL,
                Lugar_trabajo = NULL,
                Trabajo_1 = NULL,
                Trabajo_2 = NULL,
                Lugar_de_Estudios = NULL,
                Estudios_1 = NULL,
                Estudios_2 = NULL,
                Idioma_1 = NULL,
                Idioma_2 = NULL
             WHERE key = ? AND Nombre = ?`,
            [userKey, name],
            function (err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: "Curriculum eliminado correctamente", name });
            }
        );
    });
});

module.exports = router;
