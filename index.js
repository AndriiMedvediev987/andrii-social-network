// Require all necessary frameworks and modules, including date-fns
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
// const {parse} = require('./utils/helpres');
//const {parse, format, formatDistance, formatRelative, subDays} = require('./utils/helpres');
//const fns = require('date-fns');
// import { format, compareAsc } from "date-fns";
//const cwd = process.cwd();
//const fns = require('date-fns');
// import { parse } from 'date-fns';

//  const dateString = '2023-06-10';
//  const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());

// console.log(parsedDate); 
// const fns = require('./utils/helpres');
// console.log(fns.format(new Date(), "'Today is a' eeee"));
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});