/**
 * @swagger
 * /curriculum:
 *   post:
 *     summary: Crea un nuevo curriculum asociado a un usuario
 *     tags:
 *       - Curriculum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nombre_curriculum:
 *                 type: string
 *               Nombre:
 *                 type: string
 *               Apellido:
 *                 type: string
 *               Image:
 *                 type: string
 *               Titulo:
 *                 type: string
 *               Celular:
 *                 type: string
 *               Email:
 *                 type: string
 *               Ubicacion:
 *                 type: string
 *               Perfil:
 *                 type: string
 *               Lugar_trabajo:
 *                 type: string
 *               Trabajo_1:
 *                 type: string
 *               Trabajo_2:
 *                 type: string
 *               Lugar_de_Estudios:
 *                 type: string
 *               Estudios_1:
 *                 type: string
 *               Estudios_2:
 *                 type: string
 *               Idioma_1:
 *                 type: string
 *               Idioma_2:
 *                 type: string
 *     responses:
 *       201:
 *         description: Curriculum creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 key:
 *                   type: string
 *                 id:
 *                   type: integer
 *                 curriculum:
 *                   type: object
 *       400:
 *         description: Faltan campos obligatorios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 missingFields:
 *                   type: array
 *                   items:
 *                     type: string
 *       409:
 *         description: Ya existe un curriculum con ese Nombre_curriculum
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
const express = require("express");
const router = express.Router();
const authMiddleware = require("../../auth.js");
const db = require("../../database/db.js");
const { check_fields } = require("../check_fields.js");

router.post("/curriculum", authMiddleware, (req, res) => {
    const data = req.body;
    const key = req.header("Authorization");

    const missingFields = check_fields(data);
    if (missingFields.length > 0) {
        return res.status(400).json({
            error: "Faltan campos obligatorios",
            missingFields
        });
    }

    const checkSql = `SELECT id FROM curriculum WHERE Nombre_curriculum = ? AND key = ?`;
    db.get(checkSql, [data.Nombre_curriculum, key], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (row) {
            return res.status(409).json({
                error: `Ya existe un curriculum con el Nombre_curriculum '${data.Nombre_curriculum}' para esta key`
            });
        }

        const stmt = db.prepare(`
            INSERT INTO curriculum 
            (key, Nombre_curriculum, Nombre, Apellido, Image, Titulo, Celular, Email, Ubicacion, Perfil,
             Lugar_trabajo, Trabajo_1, Trabajo_2, Lugar_de_Estudios, Estudios_1, Estudios_2,
             Idioma_1, Idioma_2)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        stmt.run(
            key,
            data.Nombre_curriculum,
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
                res.status(201).json({
                    message: "Curriculum agregado, está asociado a la key",
                    key: key,
                    id: this.lastID,
                    curriculum: data
                });
            }
        );
    });
});



module.exports = router;
