import mongoose, { ConnectOptions } from 'mongoose';
import { dbName, dbPort } from '../configServer';

mongoose.connect(
                    `mongodb://localhost:${dbPort}/${dbName}`, 
                    {useNewUrlParser: true} as ConnectOptions,
                );

export default mongoose;
