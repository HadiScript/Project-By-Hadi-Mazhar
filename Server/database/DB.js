import mongoose from 'mongoose';

const connections = mongoose.connect('mongodb://localhost/DBMS',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
)
    .then(() => console.log("Connected"))
    .catch(err => {
        console.log(err);
        process.exit(1);
    });

export default connections