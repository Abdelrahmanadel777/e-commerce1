import express from 'express'
import { bootstrap } from './src/modules/bootstrap.js'
import { globalError } from './src/middleware/globalError.js'
import cors from 'cors'
import 'dotenv/config'
import { dbConnection } from './database/dbConnection.js'
import Stripe from 'stripe'
import { catchError } from './src/middleware/catchError.js'


const stripe = new Stripe('sk_test_51Q2FEaRoJUsLmlasRrs3M60kZyzZ3zNVjZcReFrnCro2qSDdrbkBmHhygACtBWaE1EPDmcXpEQ5nqJ6mBphhc5J500sts9pfeI');


const app = express()

app.post('webhook', express.raw({ type: 'application/json' }), catchError((req, res) => {

    const signature = req.headers['stripe-signature'].toString();

    let event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        " whsec_bpOwdyhQ3ry6nmQ0vVFmcbWsN4WdAGox"
    )
    let checkout

    if (event.type == "checkout.session.completed") {
        checkout = event.data.object
    }

    res.json({ message: "success", checkout })

}

)
)
dbConnection()
app.use('/uploads', express.static('uploads'))

const port = process.env.Port || 3000
app.use(cors())


app.use(express.json())
bootstrap(app)
app.use(globalError)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))