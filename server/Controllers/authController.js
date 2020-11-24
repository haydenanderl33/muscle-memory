const bcrypt = require('bcrypt');

module.exports = {
    register: async (req,res) => {
        const db = req.app.get('db');
        const { email,username,password } = req.body;
        const foundUser = await db.check_user(email);
        if(foundUser[0]){
            return res.status(400).send("Email already registered")
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await db.add_user([email, username, hash]);
        req.session.user = {
            userId: newUser.mm_id,
            email: newUser.email,
            username: newUser.username
        }
        res.status(200).send(req.session.user)
    },
    login: async (req,res) => {
        const db = req.app.get('db');
        const { email, password } = req.body
        const foundUser = await db.check_user(email)
        if(!foundUser[0]){
            return res.status(401).send("Incorrect Login Info")
        }
        const authenticated = bcrypt.compareSync(password, foundUser[0].password);
        // console.log(authenticated)
        if(authenticated){
            req.session.user = {
                userId: foundUser.mm_id,
                email: foundUser.email,
                username: foundUser.username
            }
            res.status(200).send(req.session.user)
        } else {
            res.status(401).send("Yeah Incorrect Login Info")
        }
        
    }

}