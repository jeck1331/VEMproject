const express = require('express');
const app = express();
const port = 3000;
const history = require('connect-history-api-fallback');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017");

app.use(bodyParser.json());
app.use(history());
app.use(cors());

app.use(express.urlencoded({extended: true}));

(async () => {
    try {
        await mongoClient.connect();
        app.locals.tulgu_web = mongoClient.db("tulgu").collection("tulgu_web");
        app.locals.persons = mongoClient.db("tulgu").collection("persons");
        app.locals.charter = mongoClient.db("tulgu").collection("charter");
        app.locals.news = mongoClient.db("tulgu").collection("news");
        app.listen(3000);
        console.log('Server connecting...');
    }catch (err) {
        return console.log(err);
    }
})();

app.get('/', async (req, res) => {
    res.send(`app listening on port ${port}`);
});

let datatable = [
    {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
    },
    {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        phone: '010-692-6593 x09125',
        website: 'anastasia.net',
    },
    {
        id: 3,
        name: 'Clementine Bauch',
        username: 'Samantha',
        email: 'Nathan@yesenia.net',
        phone: '1-463-123-4447',
        website: 'ramiro.info',
    },
    {
        id: 4,
        name: 'Patricia Lebsack',
        username: 'Karianne',
        email: 'Julianne.OConner@kory.org',
        phone: '493-170-9623 x156',
        website: 'kale.biz',
    },
    {
        id: 5,
        name: 'Chelsey Dietrich',
        username: 'Kamren',
        email: 'Lucio_Hettinger@annie.ca',
        phone: '(254)954-1289',
        website: 'demarco.info',
    },
]

app.get('/about/datatable', async (req, res) => {
    res.send(datatable);
});

app.get('/persons', async (req, res) => {
    const collection = req.app.locals.persons;
    console.log(collection)
    try {
        const persons = await collection.find({}).toArray();
        res.send(persons);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.get('/charter', async (req, res) => {
    const collection = req.app.locals.charter;
    console.log(collection)
    try {
        const charter = await collection.find({}).toArray();
        res.send(charter);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.get('/news', async (req, res) => {
    const collection = req.app.locals.news;
    console.log(collection)
    try {
        const news = await collection.find({}).toArray();
        res.send(news);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.get('/about/datatable/:id', (req, res) => {
    res.send(datatable[req.params.id-1]);
});

process.on("SIGINT", async() => {
    await mongoClient.close();
    console.log("Приложение завершило работу");
    process.exit();
});