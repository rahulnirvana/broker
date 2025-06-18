import 'dotenv/config';
import express, { json } from 'express';
import { authenticate } from './middleware/auth.js';
import healthRoutes from './routes/health.js';
import signRoutes from './routes/sign.js';
import protectedRoutes from './routes/protected.js';
const app = express();
const port = process.env.PORT || 3000;

app.use(json());

app.use((req, res, next) => {
  const openPaths = ['/health', '/signup', '/login'];
  if (openPaths.includes(req.path)) {
    return next();
  }
  authenticate(req, res, next);
});

app.use(healthRoutes);
app.use(signRoutes);
app.use(protectedRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;