import request from "supertest";
import { app } from "../../app";

const data = {
  email: "test@test.com",
  password: "pass1234",
};

it("returns a 201 on successful signup", async () => {
  return request(app).post("/api/users/signup").send(data).expect(201);
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ ...data, email: "test@com" })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ ...data, password: "p" })
    .expect(400);
});

it("returns a 400 with missing email and password", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app).post("/api/users/signup").send(data);
  await request(app).post("/api/users/signup").send(data).expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send(data)
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
