const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { DBConnect } = require("./database");

const { getLocationData, setLocationData } = require("./util/getLocation");
const simulateLocationUpdates = require("./util/simulateLocation");

const routes = require("./routes");

const validate = require("./middlewares/validations/validation.middleware");
const middleware = require("./middlewares/auth.middleware");

// Swagger API Documentation
const swaggerUi = require("swagger-ui-express");
const swaggerDocumentation = require("./swagger");

// Load environment variables
dotenv.config();

DBConnect();

// Create an express app
const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());

routes.map((route) =>
  app.use(
    "/api/v1" + route.path,
    route.router(express.Router(), validate, middleware)
  )
);

app.use(
  "/api/v1/documentation",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocumentation)
);

// Simulate location updates every 60 seconds
setInterval(() => {
  const updatedData = simulateLocationUpdates(getLocationData());
  setLocationData(updatedData);
}, 60 * 1000);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(process.env.PORT || 5000, () => {
  console.log(`app listening at ${process.env.PORT || 5000}`);
});
