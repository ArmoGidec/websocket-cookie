import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import expressWs from 'express-ws';

const app = expressWs(
  express()
    .use(express.json())
    .use(cors((req, cb) => {
      cb(null, {
        origin: true,
        credentials: true,
      });
    }))
    .use(cookieParser())
).app;

app.post('/', (req, res) => {
  const { name, value } = req.body;
  res
    .cookie(name, value, {
      domain: 'f2dc-37-252-83-91.ngrok.io',
      sameSite: 'none',
      secure: true,
    })
    .end();
}).get('/', (req, res) => {
  res.send(JSON.stringify({
    cookies: req.cookies,
  }));
});

app.ws('/connect', (ws, req) => {
  ws.send(JSON.stringify({ cookies: req.cookies }));
});

app.listen(8080, () => {
  console.log('App started on http://localhost:8080');
});
