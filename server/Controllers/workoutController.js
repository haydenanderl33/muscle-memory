module.exports = {
    getWorkouts: async (req,res) => {
        const db = req.app.get('db')
        const {mm_id} = req.params
        const workouts = await db.get_workouts(+mm_id)
        if(workouts[0]){
            console.log(workouts)
            return res.status(200).send(workouts)
        }
    }
}