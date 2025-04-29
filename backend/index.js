import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors()); // Enable CORS

app.get('/', (req, res) => {
  res.send('Good game');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
