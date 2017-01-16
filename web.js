const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => res.sendfile('index'));

app.listen(app.get('port'), () => {
  console.log('\nExpress server up and running at http://localhost:%s.\n', app.get('port'));
});

