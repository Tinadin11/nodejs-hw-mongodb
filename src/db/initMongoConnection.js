import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoConnection = async () => {
  try {
    const user = getEnvVar('MONGODB_USER');
    const pwd = getEnvVar('MONGODB_PASSWORD');
    const url = getEnvVar('MONGODB_URL');
    const db = getEnvVar('MONGODB_DB');

    await mongoose.connect(
      //mongodb+srv://pitynia8717:Faz5QCf1uAQeLapW@cluster0.nikunai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
    );
    console.log('✅Mongo connection successfully established!');
  } catch (e) {
    console.log('❌Error while setting up mongo connection', e);
    throw e;
  }
};

//     // зупинка серверу
//     process.exit(1);
