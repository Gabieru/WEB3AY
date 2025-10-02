const express = require("express");
const router = express.Router();
const authMiddleware = require("../../auth.js");
const db = require("../../database/db.js");

/**
 * @swagger
 * /curriculum/{Nombre_curriculum}:
 *   get:
 *     summary: Obtiene un curriculum por Nombre_curriculum y API key del usuario
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
 *         description: Curriculum encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Falta la API key
 *       404:
 *         description: Curriculum no encontrado
 */
router.get("/curriculum/:Nombre_curriculum", authMiddleware, (req, res) => {
    const Nombre_curriculum = req.params.Nombre_curriculum;
    const userKey = req.header("Authorization");

    if (!userKey) {
        return res.status(400).json({ error: "Falta la API key en el header" });
    }

    const sql = "SELECT * FROM curriculum WHERE key = ? AND Nombre_curriculum = ?";
    db.get(sql, [userKey, Nombre_curriculum], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({
                error: "Curriculum no encontrado para este Nombre_curriculum y key"
            });
        }

        if (!row.Nombre_curriculum && !row.Nombre) {
            return res.json({ message: "Este curriculum fue eliminado :(" });
        }

        res.json(row);
    });
});



/**
 * @swagger
 * /curriculums:
 *   get:
 *     summary: Obtiene todos los curriculums asociados a un usuario
 *     tags:
 *       - Curriculum
 *     responses:
 *       200:
 *         description: Lista de curriculums
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 curriculums:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Falta la API key
 */
const { getCurriculumsByKey } = require("./byid.js");
router.get("/curriculums", authMiddleware, (req, res) => {
    const userKey = req.header("Authorization");

    getCurriculumsByKey(userKey, (err, curriculums) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ curriculums });
    });
});

module.exports = router;

