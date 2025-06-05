// import { setupServer } from './server.js';

// setupServer();

import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const bootstrap = async () => {
    try {
        await initMongoConnection();
        await setupServer();
    } catch (e) {
        console.error('Error during app bootstrap:', e.message);
    process.exit(1);
  }
};
bootstrap();

// або
// import { initMongoConnection } from './db/initMongoConnection.js';
// import { setupServer } from './server.js';

// const startApp = async () => {
//   await initMongoConnection();
//   setupServer(); // запускаємо тільки після встановлення зʼєднання з БД
// };

// startApp();