import express from 'express'
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// routes
import rootRouter from './routes/index.js'

app.use('/api/v1', rootRouter)

export {app}