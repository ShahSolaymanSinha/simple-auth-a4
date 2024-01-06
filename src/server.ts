/* eslint-disable no-console */
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

const port = 5000;

async function main() {
  try {
    await mongoose.connect(config.db_url as string, {
      dbName: 'assignment4',
    });

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.log({
      message: 'Something wrong happened on starting the server',
      error: error,
    });
  }
}

main();
