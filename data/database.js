import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME, // Corrected from DB_USER
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).promise();

// ===================================================================================================================
// Appointment Feature
// ===================================================================================================================

export const getAlltime = async () => {
    const result = await pool.query('SELECT * FROM appointment_time');

    console.log(result);
    return result[0]; 
};

export const getAllAppointments = async () => {
    const result = await pool.query('SELECT * FROM appointment');
    return result[0];
};

export const deleteAppointment = async (id) => {
    const result = await pool.query('DELETE FROM appointment WHERE id = ?', [id]);
    return result[0];
};

export const deleteService = async (id) => {
    const result = await pool.query('DELETE FROM services_offered WHERE id = ?', [id]);
    return result[0];
};

export const newAppointment = async (oAppointment) => {
    const result = await pool.query(
        'INSERT INTO appointment (firstname, lastname, reason_for_visit, phone, email, date, time) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [oAppointment.firstname, oAppointment.lastname, oAppointment.reason_for_visit, oAppointment.phone, oAppointment.email, oAppointment.date, oAppointment.time]
    );
    return result[0];
};

export const getAllServices = async () => {
    const result = await pool.query('SELECT * FROM services_offered');
    return result[0];
};


export const newService = async (oService) => {
    const result = await pool.query('INSERT INTO services_offered (reason_for_visit)   VALUES(?)', [oService.reason_for_visit])
    return result[0];
};

// =================================================================================================================================
// ADMINS
// =================================================================================================================================

export const getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result[0];
}


export const createUser = async (oUser) => {
    const result = await pool.query('INSERT INTO users (username, password) VALUES(?, ?)', [oUser.username, oUser.password])
    return result[0];
};