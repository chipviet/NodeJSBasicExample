const express = require('express');
const app = express();
var cors = require('cors');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const port = 3000;

app.use(cors());
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true });

const Schema = mongoose.Schema;

var MyModel = mongoose.model('Test', new Schema({ name: String, _id: String }));

const courses = [];

app.get('/', async (req, res) => {
  const data = await MyModel.find({ name: 'XuanSang' });
  res.send(data);
});

app.post('/', (req, res) => {
  const course = {
    _id: courses.length + 1,
    name: req.body.name,
  };

  console.log('name', course);
  MyModel.create(course)
    .then(() => {
      res.status(200);
      res.send('create success');
      console.log('Successfully');
    })
    .catch((err) => {
      res.status(404);
      res.send({ err });
    });
  courses.push(course);
  console.log(courses);
});

// app.delete('/:id', (req, res) => {
//   const course = courses.find((c) => c.id === parseInt(req.params.id));
//   if (!course)
//     return res.status(404).send('The course with the given ID was not found');

//   const index = courses.indexOf(course);
//   //indexOf tim kiem phan tu trong mang theo gia tri cua phan tu
//   courses.splice(index, 1);
//   // splice la ham xoa
//   res.send(courses);
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
