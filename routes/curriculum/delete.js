const express = require("express");
const router = express.Router();
const db = require("../../database/db");
const authMiddleware = require("../../auth.js");

/**
 * @swagger
 * /curriculum/{Nombre_curriculum}:
 *   delete:
 *     summary: Elimina un curriculum por Nombre_curriculum y API key del usuario
 *     tags:
 *       - Curriculum
 *     parameters:
 *       - in: path
 *         name: Nombre_curriculum
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del curriculum
 *     responses:
 *       200:
 *         description: Curriculum eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 Nombre_curriculum:
 *                   type: string
 *       400:
 *         description: Falta la API key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: Curriculum no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.delete("/curriculum/:Nombre_curriculum", authMiddleware, (req, res) => {
    const Nombre_curriculum = req.params.Nombre_curriculum;
    const userKey = req.header("Authorization");

    if (!userKey) {
        return res.status(400).json({ error: "Falta la API key en el header" });
    }

    db.get("SELECT * FROM curriculum WHERE key = ? AND Nombre_curriculum = ?", [userKey, Nombre_curriculum], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Curriculum no encontrado para este nombre y key" });

        if (!row.Nombre && !row.Apellido) {
            return res.json({ message: "Curriculum ya estaba eliminado :(" });
        }

        db.run(
            `UPDATE curriculum SET 
                Nombre_curriculum = NULL,
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
             WHERE key = ? AND Nombre = ?`,
            [userKey, Nombre_curriculum],
            function (err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: "Curriculum eliminado correctamente", Nombre_curriculum });
            }
        );
    });
});

module.exports = router;
