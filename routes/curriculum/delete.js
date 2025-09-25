const express = require("express");
const router = express.Router();
const db = require("../../database/db");
const authMiddleware = require("../../auth.js");


router.delete("/curriculum/delete/:id", authMiddleware, (req, res) => {
    const id = req.params.id;
    const userKey = req.header("Authorization");

    if (!userKey) {
        return res.status(400).json({ error: "Falta la API key en el header" });
    }

    db.get("SELECT * FROM curriculum WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Curriculum no encontrado" });

        if (row.key !== userKey) {
            return res.status(403).json({
                error: "Key inválida, no puedes eliminar este curriculum"
            });
        }
        if (!row.Nombre && !row.Apellido) {
            return res.json({ message: "Curriculum no encontrado" });
        }

        db.run(
            `UPDATE curriculum SET 
                Nombre = NULL,
                Apellido = NULL,
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
             WHERE id = ?`,
            [id],
            function (err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: "Curriculum eliminado correctamente", id });
            }
        );
    });
});
module.exports = router;