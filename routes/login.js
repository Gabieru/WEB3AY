const express = require("express");
const router = express.Router();

// Función para obtener la key del alumno
function getKey(numero_alumno) {
    const AUTH_KEYS = require("../keys.json");
    return AUTH_KEYS[numero_alumno];
}

// Ruta de login
router.get("/curriculum/login/", (req, res) => {
    const numero_alumno = req.header("Authorization");
    const key_alumno = getKey(numero_alumno);

    if (!key_alumno) {
        return res.status(400).json({
            error: {
                code: 400,
                message: "Ingresa un número de alumno válido",
                field: "numero_alumno",
                value: numero_alumno
            }
        });
    }

    return res.json({
        message: "Bienvenidx, tu key es la siguiente:",
        key: key_alumno,
        numero_alumno
    });
});

module.exports = router;