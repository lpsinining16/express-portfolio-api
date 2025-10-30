import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import globalErrorHandler from "./middleware/errorHandler.js";
import apiRoutes from "./routes/index.js";

// --- INITIALIZE EXPRESS APP ---
const app = express();

// --- CORE MIDDLEWARE ---

// 1. Helmet: Adds various HTTP headers for security
app.use(helmet());

// 2. CORS: Enable Cross-Origin Resource Sharing

const allowedOrigins = [
  "https://lpsinining16.github.io",
  "https://lpsinining16.github.io/angular-ui-portfolio",
  "http://localhost:4200"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`🛑 Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// 3. Morgan: HTTP request logger
app.use(morgan("dev"));

// 4. Express JSON Parser: Parse incoming JSON requests
app.use(express.json());

// 5. Express URL-Encoded Parser: Parse incoming URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// --- API ROUTES ---
const apiPrefix = `/api/${process.env.API_VERSION || "v1"}`;
app.use(apiPrefix, apiRoutes);

// --- SWAGGER API DOCUMENTATION ---
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- HEALTH CHECK ROUTE ---
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: `Portfolio API is healthy. API version: ${
      process.env.API_VERSION || "v1"
    }`,
  });
});

// --- GLOBAL ERROR HANDLER ---
// This handles all errors passed to next()
app.use(globalErrorHandler);

// --- 404 NOT FOUND HANDLER ---
// This catches all unhandled routes
app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Cannot find ${req.originalUrl} on this server.`,
  });
});

export default app;
