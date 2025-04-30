import { Server } from 'http';
import app from './app';
import config from './config';
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.database_url as string, {
      dbName: 'assignment6', // Make sure this matches your actual DB name
      serverSelectionTimeoutMS: 10000, // Wait 10s for server to respond
      socketTimeoutMS: 45000,          // Give more time for socket
    });

    console.log(`🛢 Database is connected successfully`);

    const server: Server = app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
    });

    const exitHandler = () => {
      if (server) {
        server.close(() => {
          console.log('Server closed');
        });
      }
      process.exit(1);
    };

    const unexpectedErrorHandler = (error: unknown) => {
      console.error('❌ Unexpected error:', error);
      exitHandler();
    };

    process.on('uncaughtException', unexpectedErrorHandler);
    process.on('unhandledRejection', unexpectedErrorHandler);

    process.on('SIGTERM', () => {
      console.log('SIGTERM received');
      if (server) {
        server.close();
      }
    });

  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
}

main();




// import { Server } from 'http';
// import app from './app';
// import config from './config';
// import mongoose from 'mongoose';

// async function main() {
//   await mongoose.connect(config.database_url as string);
//   console.log(`🛢 Database is connected successfully`);

//   const server: Server = app.listen(config.port, () => {
//     console.log(`Server running on port ${config.port}`);
//   });

//   const exitHandler = () => {
//     if (server) {
//       server.close(() => {
//         console.log('Server closed');
//       });
//     }
//     process.exit(1);
//   };

//   const unexpectedErrorHandler = (error: unknown) => {
//     console.log(error);
//     exitHandler();
//   };

//   process.on('uncaughtException', unexpectedErrorHandler);
//   process.on('unhandledRejection', unexpectedErrorHandler);

//   process.on('SIGTERM', () => {
//     console.log('SIGTERM received');
//     if (server) {
//       server.close();
//     }
//   });
// }

// main();
