const express = require('express');
const sequelize = require('./sequelize');
const User = require('./models/User');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando ✅');
});

app.post('/users', async (req, res) => {
  const { name } = req.body;
  const user = await User.create({ name });
  res.json(user);
});

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Inicializar
(async () => {
  await sequelize.sync(); // Crea tablas si no existen
  const port = 3000;
  console.log('Puerto en uso:', port);
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
})();
