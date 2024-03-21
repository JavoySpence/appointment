// pagesRoutes.js
import express from 'express';
import morgan from 'morgan';
import { getAllAppointments, deleteAppointment, newAppointment, getAlltime, getAllServices, newService, deleteService, } from '../data/database.js';
import { sendEmail } from '../utils/emailRoutes.js';
import bcrypt from 'bcrypt';
import session from 'express-session';


const pageRoutes = express.Router();



pageRoutes.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000 * 1,
    }
  }));

  
  const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        req.session.returnTo = req.originalUrl;
        try {
            return res.redirect('/loginforms');
        } catch (error) {
            console.error('Error redirecting to login page:', error);
            return res.status(500).send('Internal Server Error');
        }
    }
  };

  const isAuthenticated2 = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        req.session.returnTo = req.originalUrl;
        try {
            return res.redirect('/loginforms2');
        } catch (error) {
            console.error('Error redirecting to login page:', error);
            return res.status(500).send('Internal Server Error');
        }
    }
  };

pageRoutes.get('/about', async (req, res) => {
    res.render('basicPages/about');
});

pageRoutes.get('/aboutAdmin', async (req, res) => {
    res.render('basicPages/aboutAdmin');
});


pageRoutes.get('/home', async (req, res) => {
    res.render('basicPages/home');
});

pageRoutes.get('/servicesInputs', async (req, res) => {
    res.render('basicPages/servicesInputs');
});

pageRoutes.get('/homeAdmin', async (req, res) => {
    res.render('basicPages/homeAdmin');
});


pageRoutes.get('/signupForms', async (req, res) => {
    res.render('basicPages/signup');
});

pageRoutes.get('/loginForms', async (req, res) => {
    res.render('basicPages/login');
});

pageRoutes.get('/loginForms2', async (req, res) => {
    res.render('basicPages/login2');
});

pageRoutes.get('/servicesAdmin', async (req, res) => {
    res.render('basicPages/servicesAdmin');
});

pageRoutes.get('/services', async (req, res) => {
    res.render('basicPages/services');
});

pageRoutes.get('/contact', async (req, res) => {
    res.render('basicPages/contact');
});

pageRoutes.get('/contactAdmin', async (req, res) => {
    res.render('basicPages/contactAdmin');
});




pageRoutes.get('/allAppointments', isAuthenticated, async (req, res) => {
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



pageRoutes.post('/newAppointment', isAuthenticated2, async (req, res) => {
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


pageRoutes.get('/servicesList', isAuthenticated2, async (req, res) => {
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
