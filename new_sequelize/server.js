import express from "express"
import sequelize from "./src/database/db.database.js"
import Customer from "./src/model/customer.model.js"


const app = express()
const port = 9000


// Sequelize Sync
sequelize.sync({ force: true }).then((result) => {
    console.log("Database connected")
}).catch(err => console.log("error", err))


//apis
// Create a new user
app.post('/users', async (req, res) => {
    try {
        console.log(req.body, "11")
        const user = await Customer.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Retrieve all users
app.get('/users', async (req, res) => {
    try {
        const users = await Customer.findAll();
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Retrieve a single user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await Customer.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a user
app.put('/users/:id', async (req, res) => {
    try {
        const user = await Customer.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await Customer.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});








app.listen(port, (req, res) => {
    console.log(`Server is running on ${port}`)
})