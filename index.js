import 'dotenv/config';
import express from 'express';
import routes from './routes/routes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
