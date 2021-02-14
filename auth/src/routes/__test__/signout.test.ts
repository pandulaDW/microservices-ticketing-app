import request from "supertest";
import { app } from "../../app";

const data = {
  email: "test@test.com",
  password: "pass1234",
};

it("clears the cookie after signing out", async () => {
  await request(app).post("/api/users/signup").send(data);

  const response = await request(app).get("/api/users/signout").expect(204);

  expect(response.get("Set-Cookie")[0]).toEqual(
    "express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
