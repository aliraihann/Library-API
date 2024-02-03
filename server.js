import express from "express";
import { json } from "express";
import dotenv from "dotenv";
dotenv.config();
import logbookRoutes from "./src/routes/librarylogbook_routes.js";
import bookRoutes from "./src/routes/book_routes.js";
import memberRoutes from "./src/routes/member_routes.js";
import { memberTable, bookTable, libraryLogBook, checkMemberTable, checkBookTable, checkLogbookTable } from "./src/utils/mySQL_utilities.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./src/docs/swaggerOptions.js";
import cors from "cors";

async function initializeDatabase() {
    try {
        const member = await checkMemberTable();
        const book = await checkBookTable();
        const logbook = await checkLogbookTable(); 

        if (!member) {
            await memberTable();
            console.log('members table created successfully.');
        }
        if (!book) {
            await bookTable();
            console.log('books table created successfully.');
        }
        if (!logbook) {
            await libraryLogBook();
            console.log('library_logbook table created successfully.');
        }
        console.log('Database tables created successfully.');
    } catch (err) {
        console.error(`Error checking/creating database tables: ${err}`);
    }
}

initializeDatabase();

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', // Specify the origin of your frontend application
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
app.use(cors(corsOptions));

const PORT = process.env.PORT;
app.use(json());
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/members', memberRoutes);

app.use('/books', bookRoutes);

app.use('/logbook', logbookRoutes);


app.listen(PORT, ()=> {
    console.log(`Server is running on PORT: ${PORT}`)
})

