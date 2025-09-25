function authMiddleware(req, res, next) {
    const apiKey = req.header("Authorization");

    if (!apiKey) {
        return res.status(401).json({
            error: {
                code: 401,
                message: "Falta la API key",
            }
        });
    }

    const AUTH_KEYS = require("./keys.json");

    // Verificar que la API key exista en keys.json
    const valid = Object.values(AUTH_KEYS).includes(apiKey);
    if (!valid) {
        return res.status(403).json({
            error: {
                code: 403,
                message: "API key inválida"
            }
        });
    }
    next();
}

module.exports = authMiddleware;