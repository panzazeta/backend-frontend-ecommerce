import mongoose from "mongoose";
import "dotenv/config";
import {expect} from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:4000");

await mongoose.connect(process.env.MONGO_URL);

describe("Test CRUD del carrito en api/carts", function () {
  it("Ruta: api/carts metodo Post", async () => {
    const { ok } = await requester.post("/api/carts");

    expect(ok).to.be.ok;
  });
});

describe("Pruebas para la ruta /api/carts/:cid/products/:pid", () => {
  it("Ruta: api/catrs metodo Post", async () => {
    
    const carritoId = "6593ecd5c8a4d31e8816e417";
    const productoId = "65022390bf2ac75bb917837c";
    const cantidad = 34;

    const response = await requester
      .post(`/api/carts/${carritoId}/products/${productoId}`)
      .send({ quantity: cantidad });

    expect(response.status).to.equal(200);
  });
});