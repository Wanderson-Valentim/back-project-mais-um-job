const express = require('express')
const app = express()
const port = 3000
const usersRouter = require('./routes/users.js')
const authRouter = require('./routes/auth.js')
const imagesRouter = require('./routes/images.js')
const locationsRouter = require('./routes/locations.js')
const activitiesRouter = require('./routes/activities.js')

var cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(authRouter);
app.use(locationsRouter);
app.use(activitiesRouter);
app.use(imagesRouter);
app.use(usersRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})