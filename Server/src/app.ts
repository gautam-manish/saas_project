import express from 'express';
const app = express();
import authRoute from "./routes/globals/auth/auth.route"
import instituteRoute from "./routes/institute/isntitute.route"


app.use(express.json());
app.use("/api",authRoute)
app.use("/api/institute",instituteRoute)

export default app;