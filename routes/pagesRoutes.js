// pagesRoutes.js
import express from 'express';
import morgan from 'morgan';
import { getAllAppointments, deleteAppointment, newAppointment, getAlltime, getAllServices, newService, deleteService } from '../data/database.js';
import { sendEmail } from '../utils/emailRoutes.js';

const pageRoutes = express.Router();

pageRoutes.get('/about', (req, res) => {
    res.render('basicPages/about');
});

pageRoutes.get('/aboutAdmin', (req, res) => {
    res.render('basicPages/aboutAdmin');
});


pageRoutes.get('/home', (req, res) => {
    res.render('basicPages/home');
});

pageRoutes.get('/servicesInputs', (req, res) => {
    res.render('basicPages/servicesInputs');
});

pageRoutes.get('/homeAdmin', (req, res) => {
    res.render('basicPages/homeAdmin');
});

pageRoutes.get('/services', (req, res) => {
    res.render('basicPages/services');
});

pageRoutes.get('/servicesAdmin', (req, res) => {
    res.render('basicPages/servicesAdmin');
});

pageRoutes.get('/contact', (req, res) => {
    res.render('basicPages/contact');
});

pageRoutes.get('/contactAdmin', (req, res) => {
    res.render('basicPages/contactAdmin');
});




pageRoutes.get('/allAppointments', async (req, res) => {
    const appointmentList = await getAllAppointments()
    res.render('basicPages/allAppointments', { data: appointmentList });
});

pageRoutes.get('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const appointmentList = await deleteAppointment(id);
   res.redirect('/allAppointments');
});

pageRoutes.get('/appointmentInputs', async (req, res) => {
    try {
        const timeList = await getAlltime();
        const serviceList = await getAllServices();

        console.log(serviceList);
        res.render('basicPages/appointmentInputs', { data: timeList, servicesData: serviceList });
    } catch (error) {
        console.error("Error fetching time list:", error);
        res.status(500).send('Error fetching time list. Please try again.');
    }
});



pageRoutes.post('/newAppointment', async (req, res) => {
    const newEntry = new Object();
    newEntry.firstname = req.body.firstname;
    newEntry.lastname = req.body.lastname;
    newEntry.reason_for_visit = req.body.reason_for_visit;
    newEntry.phone = req.body.phone;
    newEntry.email = req.body.email;
    newEntry.date = req.body.date;
    newEntry.time = req.body.time;

    const result = await newAppointment(newEntry);

    await sendEmail(newEntry);

    res.redirect('/allAppointments');

});


pageRoutes.post('/newService', async (req, res) => {
    const newEntry = new Object();
    newEntry.reason_for_visit = req.body.reason_for_visit;
 

    const result = await newService(newEntry);
    res.redirect('/servicesList');

});


pageRoutes.get('/servicesList', async (req, res) => {
    const serviceList = await getAllServices();
    console.log(serviceList);
    res.render('basicPages/servicesList', { data: serviceList });
});

pageRoutes.get('/deleteService/:id', async (req, res) => {
    const id = req.params.id;
    const result = await deleteService(id);
   res.redirect('/servicesList');
});








export default pageRoutes;
