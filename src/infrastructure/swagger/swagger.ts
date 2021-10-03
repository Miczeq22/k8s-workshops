import jsdoc from 'swagger-jsdoc';

export const swaggerDocs = jsdoc({
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'BZDP - API',
      version: '0.0.1',
    },
    servers: [
      {
        url: '/',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'X-JWT',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        adminAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'X-ADMIN-AUTH-TOKEN',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
        adminAuth: [],
      },
    ],
  },
  apis: [
    'src/api/**/*.action.ts',
    'src/api/**/*.action.js',
    'src/modules/**/api/**/*.action.ts',
    'src/modules/**/api/**/*.action.js',
  ],
});
