import { DataSource } from "typeorm"
import "dotenv/config"

const AppDataSource = new DataSource(
    process.env.NODE_ENV === "test" ?
    {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/**/*.entity{.ts,.js}"]
    } :
    {
        type: "postgres",
        host: process.env.DB_HOST,
        port: process.env.PGPORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        logging: true,
        synchronize: false,
        entities: ["src/**/*.entity{.ts,.js}"],
        migrations: ['src/migrations/*.ts']
    }
)

export default AppDataSource