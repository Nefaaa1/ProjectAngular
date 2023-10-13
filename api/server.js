
import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from 'cors';
import { faker } from '@faker-js/faker'

// Connexion à la base de données
mongoose
    .connect("mongodb://localhost:27017/gettested", {
        useNewUrlParser: true,
        useUnifiedTopology: true, // options qui évitent des warnings inutiles
    })
    .then(init); // Toutes les méthodes de mongoose renvoient des promesses

async function init() {
    // Création d'un schéma


    const UsersSchema = new mongoose.Schema({
        user_id: Number,
        username: String,
        password: String,
        email: String,
        role: String,
    });

    const LevelsSchema = new mongoose.Schema({
        label: String
    });
    const TestsSchema = new mongoose.Schema({
        label: String,
        level: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'levels',
            }],
            default: []
        },
    });
    const InstitutsSchema = new mongoose.Schema({
        label: String,
    });

    const ExamsSchema = new mongoose.Schema({
        label: String,
        description: String,
        price: Number,
        test: {
            type: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'tests',
            }
        },
        level: {
            type: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'levels',
            }
        },
    });

    const SessionsSchema = new mongoose.Schema({
        label: String,
        description: String,
        date: { type: Date, default: Date.now },
        nbPlaces: Number,
        institut: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'instituts',
        },
        exams: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'exams',
            }],
            default: []
        },
        level:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'levels',
        }
        ,
        test: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tests',
        },
        inscrit: [String],
        nbInscrit: Number
    });

    // Création d'un objet Modèle basé sur le schéma
    const UserModel = mongoose.model("users", UsersSchema);
    const SessionModel = mongoose.model("sessions", SessionsSchema);
    const TestModel = mongoose.model("tests", TestsSchema);
    const LevelModel = mongoose.model("levels", LevelsSchema);
    const InstitutModel = mongoose.model("instituts", InstitutsSchema);
    const ExamModel = mongoose.model("exams", ExamsSchema);

    // function generateFakeSession() {
    //     const institutsIds = [
    //         "6526ad9e165353223e2d7c33",
    //         "6526adb3165353223e2d7c34",
    //         "6526adc1165353223e2d7c35",
    //     ];

    //     const levelIds = [
    //         "6526ab83165353223e2d7c25",
    //         "6526ad14165353223e2d7c26",
    //         "6526ad30165353223e2d7c27",
    //         "6526ad37165353223e2d7c28",
    //         "6526ad3e165353223e2d7c29",
    //         "6526ad48165353223e2d7c2a"
    //     ];

    //     const testIds = [
    //         "6526b2182bdbc1428d342eb7",
    //         "6526b388e8d54b3eb82b8641",
    //         "6526b76398c486c63352c6d3"
    //     ];


    //     return new SessionModel({
    //         label: faker.lorem.word(),
    //         description: faker.lorem.sentence(),
    //         date: faker.date.future(),
    //         nbPlaces: faker.number.int({ min: 10, max: 50 }),
    //         institut: faker.helpers.arrayElement(institutsIds, 1), // Vous devrez remplacer ceci par une véritable référence d'institut
    //         exams: [],
    //         level: faker.helpers.arrayElement(levelIds, 1), // Remplacez par une véritable référence de niveau
    //         test: faker.helpers.arrayElement(testIds, 1), // Remplacez par une véritable référence de test
    //         inscrit: [],
    //         nbInscrit: 0,
    //     });
    // }

    // // Générez et insérez des données factices dans la base de données
    // const numberOfSessionsToGenerate = 30; // Changez le nombre de sessions à générer si nécessaire
    // const fakeSessions = [];
    // for (let i = 0; i < numberOfSessionsToGenerate; i++) {
    //     const fakeSession = generateFakeSession();
    //     fakeSessions.push(fakeSession);
    // }
    // SessionModel.create(fakeSessions)
    //     .then(sessions => {
    //         console.log("Sessions insérées avec succès.");
    //     })
    //     .catch(err => {
    //         console.error("Erreur lors de l'insertion des sessions : ", err);
    //     });


    // Initialisation de l'app Express
    const app = express();
    const jsonParser = bodyParser.json();
    app.use(jsonParser);
    app.use(cors({ origin: 'http://localhost:4200' }));


    // ========================== GET SESSIONS
    app.get("/sessions", async (req, res) => {
        try {
            const docs = await SessionModel.find({})
                .populate('institut')
                .populate('exams')
                .populate('level')
                .populate('test');
            res.json(docs);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    // ========================== GET USERS
    app.get("/users", async (req, res) => {
        try {
            const docs = await UserModel.find({});
            res.json(docs);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    // ========================== GET INSTITUTS
    app.get("/instituts", async (req, res) => {
        try {
            const docs = await InstitutModel.find({});
            res.json(docs);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    // ========================== GET EXAMS
    app.get("/exams", async (req, res) => {
        try {
            const docs = await ExamModel.find({});
            res.json(docs);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });


    // ========================== GET TESTS
    app.get("/tests", async (req, res) => {
        try {
            const docs = await TestModel.find({});
            res.json(docs);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });


    // ========================== GET LEVELS
    app.get("/levels", async (req, res) => {
        try {
            const docs = await LevelModel.find({});
            res.json(docs);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });




    // ========================== GET ONE SESSION
    app.get("/sessions/:id", async (req, res) => {
        try {
            const session = await SessionModel.findById(req.params.id)
                .populate('institut')
                .populate('exams')
                .populate('level')
                .populate('test');
            if (!session) {
                return res.status(404).json({ message: 'Session non trouvée' });
            }
            res.json(session);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    // ========================== GET ONE USER
    app.get("/users/:id", async (req, res) => {
        try {
            const session = await UserModel.findById(req.params.id);
            if (!session) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            res.json(session);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });
    // ========================== UPDATE SESSION
    app.put("/sessions/update/:id", async (req, res) => {
        try {
            const sessionId = req.params.id;
            const updatedSession = await SessionModel.findByIdAndUpdate(sessionId, req.body, { new: true });
            if (!updatedSession) {
                return res.status(404).send("Session not found");
            }
            res.json(updatedSession);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });
    // ========================== DELETE SESSION
    app.delete("/sessions/delete/:id", async (req, res) => {
        try {
            const sessionId = req.params.id;
            const deleteSession = await SessionModel.findByIdAndDelete(sessionId);
            if (!deleteSession) {
                return res.status(404).send("Session not found");
            }
            res.json(deleteSession);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });
    // ========================== CREATE SESSION
    app.post("/sessions/create", async (req, res) => {
        try {
            const newSessionData = req.body;
            const newSessionId = new mongoose.Types.ObjectId();
            newSessionData._id = newSessionId;
            const newSession = new SessionModel(newSessionData);
            const savedSession = await newSession.save();

            res.json(savedSession);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });
    // ========================== UPDATE USER
    app.put("/users/update/:id", async (req, res) => {
        try {
            const userId = req.params.id;
            const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).send("User not found");
            }
            res.json(updatedUser);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });
    // ========================== DELETE USER
    app.delete("/users/delete/:id", async (req, res) => {
        try {
            const userId = req.params.id;
            const deleteUser = await UserModel.findByIdAndDelete(userId);
            if (!deleteUser) {
                return res.status(404).send("User not found");
            }
            res.json(deleteUser);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    // ========================== CREATE USER
    app.post("/users/create", async (req, res) => {
        try {
            const newUserData = req.body;
            const newUserId = new mongoose.Types.ObjectId();
            newUserData._id = newUserId;
            const newUser = new UserModel(newUserData);
            const savedUser = await newUser.save();

            res.json(savedUser);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    // Démarrage de l'app Express
    app.listen(8000, () =>
        console.log(`Server running at http://localhost:8000/`)
    );
}