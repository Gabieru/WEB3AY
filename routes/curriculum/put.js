// PUT: Reemplazo TOTAL del recurso
const express = require("express");
const router = express.Router();
const authMiddleware = require("../../auth.js");
const db = require("../../database/db.js");

const FIELDS = [
    "Nombre", "Apellido", "Image", "Titulo", "Celular", "Email",
    "Ubicacion", "Perfil", "Lugar_trabajo", "Trabajo_1", "Trabajo_2",
    "Lugar_de_Estudios", "Estudios_1", "Estudios_2", "Idioma_1", "Idioma_2"
];

function normalizeValue(v) {
    if (v === null) return null;
    if (v === undefined) return undefined;
    if (typeof v === "string") return v.trim();
    return v;
}

router.put("/curriculum/:id", authMiddleware, (req, res) => {
    const id = req.params.id;
    const userKey = req.header("Authorization");
    const data = req.body || {};

    // 1. Validar presencia de TODOS los campos (PUT = reemplazo completo)
    const missing = FIELDS.filter(f => !(f in data));
    if (missing.length > 0) {
        return res.status(400).json({
            error: {
                code: "MISSING_FIELDS",
                message: "Faltan campos obligatorios para reemplazo total",
                missing
            }
        });
    }

    // 2. Normalizar valores y prevenir undefined (undefined provocaría NULL en SQLite implícito)
    const sanitized = {};
    for (const f of FIELDS) {
        const val = normalizeValue(data[f]);
        if (val === undefined) {
            return res.status(400).json({
                error: {
                    code: "UNDEFINED_FIELD",
                    message: `El campo '${f}' viene como undefined. Envíalo explícitamente o elimínalo del body (pero PUT requiere todos).`
                }
            });
        }
        sanitized[f] = val;
    }

    // 3. Obtener el curriculum para validar propiedad y estado
    db.get("SELECT * FROM curriculum WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: { code: "DB_READ_ERROR", message: err.message } });
        if (!row) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Curriculum no encontrado" } });

        if (row.key !== userKey) {
            return res.status(403).json({
                error: {
                    code: "FORBIDDEN",
                    message: "Key inválida: el curriculum no pertenece a tu API-Key"
                }
            });
        }

        if (!row.Nombre && !row.Apellido) {
            return res.status(410).json({
                error: {
                    code: "DELETED",
                    message: "Este curriculum fue eliminado"
                }
            });
        }

        // 4. Construir UPDATE
        const setClause = FIELDS.map(f => `${f}=?`).join(", ");
        const sql = `UPDATE curriculum SET ${setClause} WHERE id=? AND key=?`;
        const params = [...FIELDS.map(f => sanitized[f]), id, userKey];

        db.run(sql, params, function (uErr) {
            if (uErr) return res.status(500).json({ error: { code: "DB_WRITE_ERROR", message: uErr.message } });
            if (this.changes === 0) {
                return res.status(404).json({ error: { code: "NOT_FOUND_OR_UNAUTHORIZED", message: "Curriculum no actualizado" } });
            }

            // 5. Obtener versión final (opcional pero útil)
            db.get("SELECT id, key, " + FIELDS.join(",") + " FROM curriculum WHERE id=? AND key=?", [id, userKey], (gErr, updated) => {
                if (gErr) return res.status(500).json({ error: { code: "DB_READ_AFTER_UPDATE_ERROR", message: gErr.message } });

                res.json({
                    message: "Curriculum reemplazado con éxito (PUT)",
                    id,
                    updated
                });
            });
        });
    });
});

module.exports = router;