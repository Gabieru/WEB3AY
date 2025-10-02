const express = require("express");
const router = express.Router();

// Función para obtener la key del alumno
function getKey(numero_alumno) {
    const AUTH_KEYS = require("../keys.json");
    return AUTH_KEYS[numero_alumno];
}

/**
 * @swagger
 * /login/{numero_alumno}:
 *   get:
 *     summary: Obtiene la API key del alumno dado su número de alumno
 *     tags:
 *       - Login
 *     security: []
 *     parameters:
 *       - in: path
 *         name: numero_alumno
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de alumno
 *     responses:
 *       200:
 *         description: Key obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 key:
 *                   type: string
 *                 numero_alumno:
 *                   type: string
 *       400:
 *         description: Número de alumno inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                     message:
 *                       type: string
 *                     field:
 *                       type: string
 *                     value:
 *                       type: string
 */
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


router.get("/login/:numero_alumno", (req, res) => {
    const numero_alumno = req.params.numero_alumno;
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