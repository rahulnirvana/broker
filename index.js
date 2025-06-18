import 'dotenv/config';
import express, { json } from 'express';
import bodyParser from 'body-parser';
import * as authMiddlware from './src/middleware/auth.js';
import * as healthController from './src/controller/health.js';
import * as signController from './src/controller/sign.js';
import * as dataController from './src/controller/data.js';
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

export default app;