import express from 'express';
import bcrypt from 'bcrypt';
import session from 'express-session';
import { createUser, getAllUsers } from '../data/database.js';

const authRoutes = express.Router();


const saltRounds = 12; 

authRoutes.post('/signup', async (req, res) => {
    const newEntry = new Object();

    newEntry.username = req.body.username;
    newEntry.password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(newEntry.password, saltRounds); 
        newEntry.password = hashedPassword;

        const userId = await createUser(newEntry);
        res.redirect('/homeAdmin');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});


authRoutes.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const users = await getAllUsers();
        const user = users.find(user => user.username === username);

        if (!user) {
            return res.status(401).send('User not found or incorrect details provided');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).send('Wrong Password');
        }

        req.session.user = user;
        res.redirect('/allAppointments');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});

authRoutes.post('/login2', async (req, res) => {
    const { username, password } = req.body;

    try {
        const users = await getAllUsers();
        const user = users.find(user => user.username === username);

        if (!user) {
            return res.status(401).send('User not found or incorrect details provided');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).send('Wrong Password');
        }

        req.session.user = user;
        res.redirect('/servicesList');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});





export default authRoutes;