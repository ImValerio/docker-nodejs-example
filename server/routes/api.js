const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();

const Dog = mongoose.model('Dog', { name: String });

router.get("/", (req, res) => {
    res.send("Server is working!")
})

router.get("/dog/all", async (req, res) => {

    const dogs = await Dog.find()

    res.status(200).json(dogs)
})

router.get("/dog/:id/remove", async (req, res) => {
    const { id } = req.params;

    try {

        const dog = await Dog.findByIdAndRemove(id)
        res.status(200).json({ msg: `Removed dog: ${dog.name}` })

    } catch (error) {
        res.status(400).json({ msg: `Invalid id` })

    }

})

router.get("/dog/:name", async (req, res) => {
    const name = req.params.name;

    const newDog = new Dog({ name });
    await newDog.save()

    res.status(200).redirect("/dog/all")
})



module.exports = router;