import mongoose from 'mongoose';
require('dotenv').config();
/* tslint:disable-next-line */
console.log('here in index:', process.env.NODE_ENV)

async function connectDb (url: string) {
  await mongoose.connect(url)
    .then(() => {
            /* tslint:disable-next-line */
        console.log('📍 Database is connected!')
    })
    .catch((e) => {
        /* tslint:disable-next-line */
        console.log(e)});
}

if(process.env.NODE_ENV === 'prod') {
  connectDb(`mongodb://localhost:${process.env.DBPORT}/${process.env.DBNAME}`);
}

export default mongoose;