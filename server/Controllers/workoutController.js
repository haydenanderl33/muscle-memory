module.exports = {
  getWorkouts: async (req, res) => {
    const db = req.app.get("db");
    const { mm_id } = req.params;
    const workouts = await db.get_workouts(+mm_id);
    if (workouts[0]) {
      // console.log(workouts)
      return res.status(200).send(workouts);
    }
  },
  addWorkout: async (req, res) => {
    const db = req.app.get("db");
    const { mm_id } = req.params;
    const { workout_name, set, rep, weight } = req.body;
    // console.log(mm_id);
    try {
    const newWorkout = await db.add_workout([+mm_id, workout_name, set, rep, weight ]);
      res.status(200).send(newWorkout[0]);
    }
    catch {
        res.status(500).send("No workout added")
    }
  },
  deleteWorkout: async (req, res) => {
    const db = req.app.get("db");
    const { ws_id } = req.params;
    try {
     const workout = await db.delete_workout(+ws_id);
      res.status(200).send(workout);
    } catch (err) {
      res.status(500).send("Did not delete", err);
    }
  },
};
