import express from 'express';
import bodyparser from 'body-parser';
import config from '../config/config';
import userRoute from './routes/user';

const app = express();
const port = process.env.PORT;

app.use(bodyparser.json());
app.use('/', userRoute);

app.listen(port, () => {
  console.log(`App is running at ${port}`);
});

export default app;
