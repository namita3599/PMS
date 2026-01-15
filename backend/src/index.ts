import express, { type Request } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clerkAuth } from './middleware/clerkAuth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

type AuthenticatedRequest = Request & {
  auth?: {
    clerkId?: string;
  };
};

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Sentinel PMS Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/api/protected", clerkAuth, (req: AuthenticatedRequest, res) => {
  res.json({
    message: "Backend connected successfully",
    clerkId: req.auth?.clerkId,
  });
});
