import 'dotenv/config';
import express, { json } from 'express';
import * as authMiddlware from './src/middleware/auth.js';
import * as healthController from './src/controller/health.js';
import * as signController from './src/controller/sign.js';
import * as dataController from './src/controller/data.js';

import { loadPackageDefinition, Server, ServerCredentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import * as userServiceImpl from './src/protoService/userService.js';
import path from 'path';
import { fileURLToPath } from 'url';



const port = process.env.PORT || 3000;
const grpcPort = process.env.GRPC_PORT || 50051;


const app = express();
app.use(json());

app.get("/health", healthController.healthCheck);
app.post("/signup", signController.signUp);
app.post("/login", signController.login);
app.get("/refreshToken", authMiddlware.refreshAccessToken);
app.get("/holdings", authMiddlware.isAuthenticated, dataController.getHoldings);
app.get("/orderbook", authMiddlware.isAuthenticated, dataController.getOrderBook);
app.get("/positions", authMiddlware.isAuthenticated, dataController.getPositions);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// gRPC server setup
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageDef = loadSync(
  path.join(__dirname, 'protos/user.proto'),
  { keepCase: true, defaults: true, oneofs: true }
);
const userProto = loadPackageDefinition(packageDef).user;

const grpcServer = new Server();
grpcServer.addService(userProto.UserService.service, userServiceImpl);

grpcServer.bindAsync(
  `0.0.0.0:${grpcPort}`,
  ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error('gRPC server error:', err);
      return;
    }
    console.log(`gRPC server listening on ${grpcPort}`);
  }
);

export default app;