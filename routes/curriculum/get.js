const express = require("express");
const router = express.Router();
const authMiddleware = require("../../auth.js");
const db = require("../../database/db.js");

router.get("/curriculum/get/:id", authMiddleware, (req, res) => {
    const id = req.params.id;
    const userKey = req.header("Authorization"); //KEY 

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
        // Si todo esta bien, devuelvo el curriculum
        res.json(row);
    });
});




const { getCurriculumIdsByKey } = require("./byid.js");
router.get("/curriculum/mios", authMiddleware, (req, res) => {
    const userKey = req.header("Authorization");

    getCurriculumIdsByKey(userKey, (err, ids) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ curriculumIds: ids });
    });
});

module.exports = router;

