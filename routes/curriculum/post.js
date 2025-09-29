const express = require("express");
const router = express.Router();
const authMiddleware = require("../../auth.js");
const db = require("../../database/db.js");

router.post("/curriculum/post", authMiddleware, (req, res) => {
    const data = req.body;
    const key = req.header("Authorization"); //KEY 
    // Lista de campos obligatorios
    const requiredFields = [
        "Nombre", "Apellido", "Image", "Titulo", "Celular", "Email",
        "Ubicacion", "Perfil", "Lugar_trabajo", "Trabajo_1", "Trabajo_2",
        "Lugar_de_Estudios", "Estudios_1", "Estudios_2", "Idioma_1", "Idioma_2"
    ];

    // Verificar si falta algún campo
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
        return res.status(400).json({
            error: "Faltan campos obligatorios",
            missingFields
        });
    }

    // Insertar en la base de datos
    const stmt = db.prepare(`
        INSERT INTO curriculum 
        (key, Nombre, Apellido, Image, Titulo, Celular, Email, Ubicacion, Perfil,
         Lugar_trabajo, Trabajo_1, Trabajo_2, Lugar_de_Estudios, Estudios_1, Estudios_2,
         Idioma_1, Idioma_2)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
        key,
        data.Nombre,
        data.Apellido,
        data.Image,
        data.Titulo,
        data.Celular,
        data.Email,
        data.Ubicacion,
        data.Perfil,
        data.Lugar_trabajo,
        data.Trabajo_1,
        data.Trabajo_2,
        data.Lugar_de_Estudios,
        data.Estudios_1,
        data.Estudios_2,
        data.Idioma_1,
        data.Idioma_2,
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({
                message: "Curriculum agregado, está asociado a la key",
                key: key,
                id: this.lastID,
                curriculum: data
            });
        }
    );
});

module.exports = router;
