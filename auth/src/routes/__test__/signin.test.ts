import request from "supertest";
import { app } from "../../app";

const data = {
  email: "test@test.com",
  password: "pass1234",
};

it("fails when an email that does not exist is supplied", async () => {
  await request(app).post("/api/users/signin").send(data).expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await request(app).post("/api/users/signup").send(data);

  await request(app)
    .post("/api/users/signin")
    .send({ ...data, password: "test" })
    .expect(400);
});

it("responds with a cookie when given valid credentials", async () => {
  await request(app).post("/api/users/signup").send(data);
  const response = await request(app).post("/api/users/signin").send(data);
  expect(response.get("Set-Cookie")).toBeDefined();
});
