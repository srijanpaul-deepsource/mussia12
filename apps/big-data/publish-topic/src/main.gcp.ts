import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to your deployed app!' });
});

// export your express application as expressApp
export const expressApp = app;
