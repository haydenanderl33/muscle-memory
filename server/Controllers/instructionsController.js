module.exports = {
    getInstructions: async (req,res) => {
        const db = req.app.get("db");
        const [instructions] = await db.get_instructions()
        if(instructions){
            return res.status(200).send(instructions)
        }
    },
    updateInstructions: async (req, res) => {
        const db = req.app.get("db");
        const {workout_id} = req.params
        const {instructions} = req.body
        try {
            const updatedInstructions = await db.update_instructions([+workout_id, instructions])
            res.status(200).send(updatedInstructions)
        }
        catch (err) {
            console.log("Did not edit")
            res.sendStatus(500)
        }
    }
}