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
        app.locals.votes = mongoClient.db("tulgu").collection("Votes");
        app.locals.users = mongoClient.db("tulgu").collection("users");
        app.locals.userVotes = mongoClient.db("tulgu").collection("user_votes");
        app.listen(3000);
        console.log('Server connecting...');
    } catch (err) {
        return console.log(err);
    }
})();

app.get('/', async (req, res) => {
    res.send(`app listening on port ${port}`);
});

app.get('/persons', async (req, res) => {
    const collection = req.app.locals.persons;
    try {
        const persons = await collection.find({}).toArray();
        res.send(persons);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.get('/votes', async (req, res) => {
    const collection = req.app.locals.votes;
    try {
        const votes = await collection.find({}).toArray();
        res.send(votes);
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

app.post('/reg', async (req, res) => {
    const collection = req.app.locals.users;
    const users = await collection.find({}).toArray();
    try {
        let lastId = undefined;
        if (users.length > 0) {
            lastId = users[users.length - 1].id;
        }
        if (req.body.login.length > 4 && req.body.password.length > 6) {
            let user = {
                login: req.body.login,
                password: req.body.password,
                id: users.length === 0 ? 0 : lastId + 1,
                token: ((lastId ? lastId + 1 : 1) * Date.now() % 100000).toString() + makeString(36)
            };
            collection.insertOne(user);
            res.send({
                message: "ok"
            });
        } else {
            res.send({
                message: "Login length < 4 or password length < 6"
            });
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.post('/userVote', async (req, res) => {
    const collection = req.app.locals.userVotes;
    const collectionUsers = req.app.locals.users;
    const collectionVotes = req.app.locals.votes;
    const users = await collectionUsers.find({}).toArray();
    let currentUser = users.find(x => x.login == req.body.login && x.token == req.body.token);
    const userVotes = await collection.find({}).toArray();
    try {
        if (!userVotes.find(x => x.userId == currentUser.id)) {
            let userVote = {
                userId: currentUser.id,
                name: req.body.name,
                vote: true
            }
            collection.insertOne(userVote);

            try {
                await collectionVotes.findOneAndUpdate({countVotes: req.body.previousVote}, {
                    $set: {
                        countVotes: req.body.votes
                    }
                });
                const votesNew = await collectionVotes.find({}).toArray();
                res.send(votesNew);
            } catch (err) {
                console.log(err);
                res.sendStatus(500);
            }
        } else {
            res.send({
                message: "Error"
            });
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.post('/checkUserVote', async (req, res) => {
    const collection = req.app.locals.userVotes;
    const collectionUsers = req.app.locals.users;
    const users = await collectionUsers.find({}).toArray();
    let currentUser = users.find(x => x.login == req.body.login && x.token == req.body.token);
    const userVotes = await collection.find({}).toArray();
    try {
        if (!userVotes.find(x => x.userId == currentUser.id)) {
            res.send(true);
        } else {
            res.send(false);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});
app.post('/auth', async (req, res) => {
    const collection = req.app.locals.users;
    const users = await collection.find({}).toArray();
    try {
        let searchUser = users.find(x => x.login == req.body.login);
        if (searchUser) {
            if (searchUser.password === req.body.password)
                res.send({message: "ok", token: searchUser.token, login: req.body.login});
            else {
                res.send({message: "Password is incorrect"})
            }
        } else {
            res.send("User with login {", req.body.login, "} not found!");
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.post('/checkToken', async (req, res) => {
    const collection = req.app.locals.users;
    const users = await collection.find({}).toArray();
    try {
        if (users.find(x => x.login == req.body.login && x.token == req.body.token) && req.body.login && req.body.token) {
            res.send(true);
        } else {
            res.send(false);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

process.on("SIGINT", async () => {
    await mongoClient.close();
    console.log("Приложение завершило работу");
    process.exit();
});

function makeString(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}