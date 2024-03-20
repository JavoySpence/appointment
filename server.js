import ejs from 'ejs';
import express from 'express';
import morgan from 'morgan';
import paginate from 'express-paginate';
import path from 'path';

const app = express();
const PORT = 3014;

app.set('view engine', 'ejs');

import pageRoutes from './routes/pagesRoutes.js';


app.use(express.json({limit: '1kb'}))
app.use(express.urlencoded({extended: true, limit: '1kb'}));
app.use('/public', express.static('public'))


app.use(morgan('dev'));

app.use('/', pageRoutes);

;


app.use('/', express.static('public'));
app.use('/uploads', express.static('uploads'))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});