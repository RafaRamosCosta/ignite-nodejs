import { hash } from "bcrypt";
import Request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
          values('${id}','eduardo', 'admin@rentalx.com.br', '${password}', 'true', 'now()', 'ABCD-1234' )`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new Category", async () => {
    const responseToken = await Request(app).post("/sessions").send({
      email: "admin@rentalx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await Request(app)
      .post("/categories")
      .send({
        name: "Category SuperTest",
        description: "Description SuperTest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(response.status).toBe(201);
  });

  it("Should not be able to create a new Category with name exists ", async () => {
    const responseToken = await Request(app).post("/sessions").send({
      email: "admin@rentalx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await Request(app)
      .post("/categories")
      .send({
        name: "Category SuperTest",
        description: "Description SuperTest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(response.status).toBe(400);
  });
});
