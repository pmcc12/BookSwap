import mongoose from 'mongoose';
import { dbName, dbPort } from '../configServer';

mongoose.connect(`mongodb://localhost:${dbPort}/${dbName}`, () => {
    /* tslint:disable-next-line */
    console.log('DB running')
});

export default mongoose;
