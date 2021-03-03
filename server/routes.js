const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");

//GET Method
router.get("/", async(req, res) => {
    const ideas = await loadIdeasCollection();
    res.send(await ideas.find({}).toArray());
});
//POST Method
router.post("/", async(req, res) => {
    const ideas = await loadIdeasCollection();
    const result = await ideas.insertOne({
        idea: req.body.idea,
        vote: 0,
    });
    res.status(201).send(result.ops[0]);
});
//PUT Method
router.put("/:id", async(req, res) => {
    const ideas = await loadIdeasCollection();
    await ideas.updateOne({ _id: new mongodb.ObjectID(req.params.id) }, { $set: { vote: req.body.vote } });
    const idea = await ideas.findOne({
        _id: new mongodb.ObjectID(req.params.id),
    });
    res.status(200).send(idea);
});
//DELETE Method
router.delete("/:id", async(req, res) => {
    const ideas = await loadIdeasCollection();
    await ideas.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
});
//Connect to mongoDb
async function loadIdeasCollection() {
    const client = await mongodb.MongoClient.connect(
        "mongodb+srv://admin:admin123@vueexpress01.5ngbp.mongodb.net/vue_express?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );
    return client.db("vue_express").collection("ideas");
}
module.exports = router;