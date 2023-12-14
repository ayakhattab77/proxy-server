const app = require('express')();
const logger = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const API_URL = `${process.env.API_BASE_URL}?q=Cairo&appid=${process.env.API_KEY_VALUE}`;

app.listen(process.env.PORT, () => {
    console.log(`Proxy is listening on ${process.env.PORT}`)
})

app.use(logger('dev'));

app.use('/weather', createProxyMiddleware({
    target: API_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/weather`]: '',
    }
}))


app.get('/', (req, res, next) => {
    console.log(req.headers.host)
    res.send("res")
})