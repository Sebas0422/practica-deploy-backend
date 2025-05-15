import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './config/db.config.js';
import routes from './routes/index.route.js';
import cors from 'cors';
import fileupload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT;
if (!PORT) {
  console.error('❌ process.env.PORT no está definido. Abortando.');
  process.exit(1);
}
app.use(
  '/images',
  cors({
    origin: ['*'],
    optionsSuccessStatus: 200,
  }),
  express.static(path.join(__dirname, '../public/images')),
);
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(fileupload());

app.get('/', (req, res) => {
  res.send('¡Backend desplegado correctamente!');
});

routes(app);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Base de datos sincronizada correctamente');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });
