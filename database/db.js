const sqlite3 = require("sqlite3").verbose();

//Crear base de datos
const db = new sqlite3.Database("database/curriculums.db", (err) => {
  if (err) console.error("Error al abrir la base:", err.message);
  else console.log("Conectado a SQLite");
});

// Crear tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS curriculum (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT NOT NULL,
  Nombre TEXT,
  Apellido TEXT,
  Image TEXT,
  Titulo TEXT,
  Celular TEXT,
  Email TEXT,
  Ubicacion TEXT,
  Perfil TEXT,
  Lugar_trabajo TEXT,
  Trabajo_1 TEXT,
  Trabajo_2 TEXT,
  Lugar_de_Estudios TEXT,
  Estudios_1 TEXT,
  Estudios_2 TEXT,
  Idioma_1 TEXT,
  Idioma_2 TEXT
)`);

module.exports = db;