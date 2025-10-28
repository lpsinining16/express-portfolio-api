import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio REST API',
      version: '1.0.0',
      description: 'API documentation for the Angular portfolio backend',
      contact: {
        name: 'Larry Sinining',
        email: 'larry.sinining@gmail.com',
        url: 'https://github.com/lpsinining16',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}/api/${process.env.API_VERSION || 'v1'}`,
        description: 'Local development server',
      },
    ],
  },
  // Path to the API docs (routes files)
  apis: ['./src/routes/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
