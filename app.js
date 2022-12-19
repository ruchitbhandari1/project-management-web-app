const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/authRoutes.js')
const errorHandler = require('./controllers/errorController.js')
const organizationRouter = require('./routes/organizationRoutes.js')
const projectRouter = require('./routes/projectRoutes.js')
const userRouter = require('./routes/userRoutes.js')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter)
app.use('/api/org', organizationRouter)
app.use('/api/project', projectRouter)
app.use('/api/user', userRouter)

app.all("*", (req, res, next) => {
    res.send("Invalid route");
    console.log("Invalid route");
})


app.use(errorHandler);

module.exports = app;