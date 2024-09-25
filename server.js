import express from 'express'
import { dbConnection } from './database/dbconnection.js'
import { bootstrap } from './src/modules/bootstrap.js'
import { globalError } from './src/middleware/globalError.js'
import cors from 'cors'
import 'dotenv/config'


const app = express()

app.use('/uploads', express.static('uploads'))

const port = process.env.Port || 3000
app.use(cors())


app.use(express.json())
bootstrap(app)
app.use(globalError)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))