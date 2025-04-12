import "dotenv/config";
import app from "./app";
import { env } from "./config/env";

const PORT = env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});