const express = require("express");
const router = express.Router();
const authMiddleware = require("../../auth.js");
const db = require("../../database/db.js");

router.get("/curriculum/:Nombre_curriculum", authMiddleware, (req, res) => {
    const Nombre_curriculum = req.params.Nombre_curriculum; // ahora es Nombre_usuario
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




const { getCurriculumsByKey } = require("./byid.js");
router.get("/curriculums", authMiddleware, (req, res) => {
    const userKey = req.header("Authorization");

    getCurriculumsByKey(userKey, (err, curriculums) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ curriculums });
    });
});

module.exports = router;

