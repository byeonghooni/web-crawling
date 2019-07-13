const Path = require('path');
const Express = require('express');
const Hbs = require('express-handlebars');

const { getQuotientAndRemainder } = require('./app.service');

const app = Express();

app.set('views', Path.join(__dirname, '/views'));
app.engine('handlebars', Hbs());
app.set('view engine', 'handlebars');

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.get('*', (req, res) => {
  res.render('home');
});

app.post('/api/v1/crawling', async (req, res) => {
  const { urlInput, typeInput, outputBundleUnit } = req.body;
  try {
    const result = await getQuotientAndRemainder(urlInput, typeInput, outputBundleUnit);
    res.render('home', result);
  } catch (e) {
    res.render('home', { isError: true, errorMessage: '존재하지 않는 URL입니다.' });
  }
});

app.listen(3000, () => {
  console.log('running at http://localhost:3000');
});
