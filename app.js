const Express = require('express');
const Hbs = require('express-handlebars');

const app = Express();

app.engine('handlebars', Hbs());
app.set('view engine', 'handlebars');

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.get('*', (req, res) => {
  res.render('home');
});

app.listen(3000, () => {
  console.log('running at http://localhost:3000');
});
