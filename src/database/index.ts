import { createConnection, ConnectionOptions } from "typeorm";

const connect: ConnectionOptions = {
  type: "sqlite",
  database: "src/database/database.sqlite",
  entities: ["src/models/**/*.ts"],
  synchronize: true,
};

createConnection(connect);
