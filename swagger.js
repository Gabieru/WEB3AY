const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Curriculum API',
            version: '1.0.0',
            description: 'API para gestión de curriculums',
        },
        servers: [
            { url: 'http://localhost:3000' }
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: 'API key para autenticar solicitudes',
                }
            }
        },
        security: [
            { ApiKeyAuth: [] }
        ]
    },
    apis: ['./routes/**/*.js'], // Documenta todos los archivos de rutas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };