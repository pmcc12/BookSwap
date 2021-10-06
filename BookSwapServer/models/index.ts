import mongoose from 'mongoose';
const { DBNAME, DBPORT } = require('dotenv');

async function connectDb (url: string) {
  await mongoose.connect(url)
    .then(() => {
        console.log('📍 Database is connected!')
    })
    .catch((e) => console.log(e));
}

if(process.env.NODE_ENV === '') {
  connectDb(`mongodb://localhost:${DBPORT}/${DBNAME}`)
}

export default mongoose;