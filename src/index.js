// import { setupServer } from './server.js';

// setupServer();

import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';

const bootstrap = async () => {
    try {
        await initMongoConnection();
        await createDirIfNotExists(TEMP_UPLOAD_DIR);
        await createDirIfNotExists(UPLOAD_DIR);
        setupServer();
    } catch (e) {
        console.error('Error during app bootstrap:', e.message);
    process.exit(1);
  }
};
void bootstrap();
