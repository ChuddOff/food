import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
const app = express();
const port = 3000;
import { MongoClient, ServerApiVersion } from  'mongodb';

app.use(express.static('public'))
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json());

import mongoose from 'mongoose';

const uri = "mongodb+srv://alexeychadov10:haB21vEJTQcATyCr@food.qp0ymcm.mongodb.net/food?retryWrites=true&w=majority";
// const client = new MongoClient(uri, );
// client.connect().then(() => {console.log("Pinged your deployment. You successfully connected to MongoDB!");});

mongoose.connect(
    uri,
    {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
    }
).then(()=>console.log('connected')).catch(e=>console.log(e));


const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    tel: {
        type: String,
        required: true,
        unique: false
    }
});

const food  = new mongoose.model('Users', Schema);

async function start(){

    await app.get('/', (req, res) => {
        res.sendFile('index.html')
    })

    await app.post('/api/user', async (req, res) => {
        try {
            const {name, phone} = req.body;

            const user = new food({
                name: name,
                tel: phone,
            })
            await user.save();
        } catch (e) {
            console.log(e)
        }
    })

    await app.listen(port);
}

start().catch(console.error);