module.exports = {
    getWorkouts: async (req,res) => {
        const db = req.app.get('db')
        const {mm_id} = req.params
        const workouts = await db.get_workouts(+mm_id)
        if(workouts[0]){
            console.log(workouts)
            return res.status(200).send(workouts)
        }
    },
    addWorkout: async (req,res) => {
        const db = req.app.get('db')
        const {mm_id} = req.params
        const {workout_name, set, rep} = req.body
        console.log(mm_id)
        const newWorkout = await db.add_workout([+mm_id, workout_name, set, rep])
        if(newWorkout[0]){
            console.log(newWorkout)
            return res.status(200).send(newWorkout)
        }
    }
}