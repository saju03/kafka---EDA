import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId:'notification-service',
    brokers:['localhost:9092']
})

const consumer = kafka.consumer({groupId:'notification-group'})

const start = async ()=>{
    await consumer.connect()
    await consumer.subscribe({topic:'UserCreated',fromBeginning:true})

    consumer.run({
        eachMessage:async({topic,partition,message})=>{
            const user = JSON.parse(message.value.toString())   
            console.log(`Received notification for user: ${user.name}`);
        }
    })
}

start().catch(console.error);
