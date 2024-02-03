import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            description: "Library API to access information regarding library's book",
            version: '1.0.0',
        },
        servers: [
            {
                url:'http://localhost:3000',
            }
        ]
        },
    apis: ['./src//routes/*.js'] // Define the path to your route files
};
  
export {swaggerOptions};
  