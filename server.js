const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const {authRouter, detailsRouter, testRouter}    = require('./routers')
const {authMiddleware} = require('./middlewares');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/auth_api',authMiddleware.passcodeAuthentication,authRouter);
app.use('/details_api',detailsRouter);
app.use('/exam_api',testRouter);

app.use('/', (req, res) => {
    res.send(`Node server is running`);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
})