const app = require('./src/app');
const connectDB = require('./src/db/db');


connectDB();

app.listen(5000,()=>{
    console.log('the server is connected to 5000');
})