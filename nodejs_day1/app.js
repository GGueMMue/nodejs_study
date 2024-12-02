const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => 
    {
        res.send('Welcome to My NodeJS Sevrer!!!')
    }
);

app.get('/welcome', (req, res) => 
    {
        res.send('Welcome to welcome page')
    }
);

app.listen(app.get('port'), () => 
    {
        console.log(app.get('port'), 'Wait at this port')
    }
);