const express = require('express')
const app = express()
const port = 3000
const usersRouter = require('./routes/users.js')
const authRouter = require('./routes/auth.js')

app.use(express.json())
app.use(authRouter);
app.use(usersRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})