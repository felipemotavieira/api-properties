import "reflect-metadata"
import express from "express"
import "express-async-errors"
import usersRoutes from "./router/users.routes"
import sessionRoutes from "./router/session.routes"
import categoriesRoutes from "./router/categories.routes"
import schedulesRoutes from "./router/schedules.routes"
import propertyRoutes from "./router/property.routes"
import handleErrorMiddleware from "./middlewares/handleError.middleware"

const app = express()

app.use(express.json())
app.use("/users", usersRoutes)
app.use("/login", sessionRoutes)
app.use("/categories", categoriesRoutes)
app.use("/properties", propertyRoutes)
app.use("/schedules", schedulesRoutes)
app.use(handleErrorMiddleware)

export default app