import app from './app';

const port = 3000;
app.listen(port, () => {
    console.log(`Banking app listening at http://localhost:${port}`);
});