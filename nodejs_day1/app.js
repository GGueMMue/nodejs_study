const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => //주소 값과 익명함수 두 개의 파라메터
    {
        res.send('Welcome to My NodeJS Sevrer!!!')
    }
);

app.get('/welcome', (req, res) => 
    {
        res.send('Welcome to welcome page')
    }
);

app.post('/testPost', (req, res) => 
    {
        console.log(req.body.userID);
        res.send(req.body.userID);
    }
);

app.listen(app.get('port'), () => 
    {
        console.log(app.get('port'), 'Wait at this port')
    }
);