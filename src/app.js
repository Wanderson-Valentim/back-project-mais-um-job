const express = require('express')
const app = express()
const port = 3000
const usersRouter = require('./routes/users.js')
const authRouter = require('./routes/auth.js')
const imagesRouter = require('./routes/images.js')

// const sequelize = require('./db.js')

// sequelize.sync()
//   .then(() => {
//     console.log('Modelos sincronizados com o banco de dados.');
//   })
//   .catch(err => {
//     console.error('Erro ao sincronizar modelos com o banco de dados:', err);
//   });

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(authRouter);
app.use(imagesRouter);
app.use(usersRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})