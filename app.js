const express = require("express");
const app = express();
const loginRouter = require("./routes/login.js");
const getRouter = require("./routes/curriculum/get.js");
const postRouter = require("./routes/curriculum/post.js");
const patchRouter = require("./routes/curriculum/patch.js");
const putRouter = require("./routes/curriculum/put.js");
const deleteRouter = require("./routes/curriculum/delete.js");
const { swaggerUi, swaggerSpec } = require("./swagger.js");

// SWAGGER DOCS ZONE
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

// CORS ZONE

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

// RATE LIMIT ZONE

const { rateLimit, ipKeyGenerator } = require("express-rate-limit"); // importar helper

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    limit: 50,
    message: {
        error: "Demasiadas solicitudes con esta API-Key, intenta más tarde",
    },
    keyGenerator: (req, res) => {
        const apikey = req.header("Authorization");
        if (apikey) {
            return String(apikey);
        }

        return ipKeyGenerator(req);
    },
});
app.use(limiter);

// ROUTER ZONE

app.use(limiter, loginRouter);
app.use(limiter, getRouter);
app.use(limiter, postRouter);
app.use(limiter, patchRouter);
app.use(limiter, putRouter);
app.use(limiter, deleteRouter);

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
