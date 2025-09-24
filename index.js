const express = require("express");
const app = express();
const db = require("./db");

const KEYS = [
    "KEY001-ALFA",
    "KEY002-BETA",
    "KEY003-GAMMA",
    "KEY004-DELTA",
    "KEY005-EPSILON",
    "KEY006-ZETA",
    "KEY007-THETA",
    "KEY008-IOTA",
    "KEY009-KAPPA",
    "KEY010-LAMBDA",
    "KEY011-MU",
    "KEY012-NU",
    "KEY013-XI",
    "KEY014-OMICRON",
    "KEY015-PI"
];

app.use(express.json());

const database = {};
// Guardamos las keys que ya fueron entregadas
let usedKeys = [];

// Función para obtener una key distinta
function getNewKey() {
    // Si ya usamos todas, reiniciamos
    if (usedKeys.length === KEYS.length) {
        usedKeys = [];
    }

    // Filtrar las disponibles
    const available = KEYS.filter(k => !usedKeys.includes(k));

    // Elegir una al azar de las disponibles
    const randomKey = available[Math.floor(Math.random() * available.length)];

    // Guardar como usada
    usedKeys.push(randomKey);

    return randomKey;
}

// Login: entrega siempre una key distinta
app.get("/login/:idAlumno", (req, res) => {
    const idAlumno = req.params.idAlumno;
    const newKey = getNewKey();

    res.json({
        message: "Bienvenido!",
        idAlumno,
        key: newKey
    });
});

// Middleware que ahora busca la key dentro del body JSON
function checkKey(req, res, next) {
    const key = req.body.key; // 👈 ahora viene en el body
    if (!KEYS.includes(key)) {
        console.log("error");
        return res.status(401).json({ error: "No autorizado, key inválida" });

    }
    next();
}

// Rutas protegidas
app.post("/curriculum", checkKey, (req, res) => {
    const { key, ...curriculum } = req.body;

    const sql = `INSERT INTO Curriculum 
    (Nombre, Apellido, Titulo, Celular, Email, Ubicacion, Perfil, 
     Lugar_trabajo, Trabajo_1, Trabajo_2, Lugar_de_Estudios, 
     Estudios_1, Estudios_2, Idioma_1, Idioma_2)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
        curriculum.Nombre,
        curriculum.Apellido,
        curriculum.Titulo,
        curriculum.Celular,
        curriculum.Email,
        curriculum.Ubicacion,
        curriculum.Perfil,
        curriculum.Lugar_trabajo,
        curriculum.Trabajo_1,
        curriculum.Trabajo_2,
        curriculum.Lugar_de_Estudios,
        curriculum.Estudios_1,
        curriculum.Estudios_2,
        curriculum.Idioma_1,
        curriculum.Idioma_2
    ];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            message: "Curriculum guardado con éxito",
            id: this.lastID // 👈 SQLite entrega el id autoincremental generado
        });
    });
});

app.get("/curriculum/:id", (req, res) => {
    const { id } = req.params;


    const sql = `SELECT * FROM Curriculum WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: "Curriculum no encontrado" });
        }
        res.json(row);
    });
});

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get("/aleatorio", (req, res) => {
    db.all("SELECT id FROM Curriculum", [], (err, ids) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (ids.length === 0) {
            return res.status(404).json({ error: "No hay curriculums en la base de datos" });
        }

        // elegir un índice aleatorio dentro del array de IDs existentes
        const randomIndex = numeroAleatorio(0, ids.length - 1);
        const randomId = ids[randomIndex].id;

        db.get("SELECT * FROM Curriculum WHERE id = ?", [randomId], (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(row);
        });
    });
});


app.listen(3111, "0.0.0.0", () => {
    console.log("Servidor corriendo en http://0.0.0.0:3111");
});


console.log("AAA")
