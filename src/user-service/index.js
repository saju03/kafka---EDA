import express from 'express'
import { Kafka } from 'kafkajs'
const app = express()
app.use(express.json())

const kafka = new Kafka({
    clientId: 'user-service',
    brokers: ['localhost:9092']
})


const producer = kafka.producer()

app.post('/api/register-user', async (req, res) => {
    const {user} = req.body

    await producer.send({
        topic: 'UserCreated',
        messages: [{ value: JSON.stringify(user) }]
    }).catch((err)=>{
        console.error(err)
    })

    res.status(201).send('user regestered')


})
producer.connect().then(() => {
    app.listen(3000, () => console.log('user service is started 3000'))
}).catch(err => console.error(err))






