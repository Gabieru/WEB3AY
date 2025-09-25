const express = require("express");
const app = express();
const loginRouter = require("./routes/login.js");
const getRouter = require("./routes/curriculum/get.js");
const postRouter = require("./routes/curriculum/post.js");
//const patchRouter = require("./routes/curriculum/patch.js");
//const putRouter = require("./routes/curriculum/put.js");
const deleteRouter = require("./routes/curriculum/delete.js");
app.use(express.json());


// RATE LIMIT ZONE

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message: {
        error: "Demasiadas solicitudes desde esta IP, intenta más tarde"
    }
});

app.use(limiter);


// ROUTER ZONE

app.use(limiter, loginRouter);
app.use(limiter, getRouter);
app.use(limiter, postRouter);
//app.use(limiter, patchRouter);
//app.use(limiter, putRouter);
app.use(limiter, deleteRouter);



app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});