import "dotenv/config";
import {expect} from "chai";
import mongoose from 'mongoose'
import supertest from 'supertest'

const requester = supertest("http://localhost:4000/api");

await mongoose.connect(process.env.MONGO_URL);
let cookie = {};

describe("Test de carritos en la ruta api/carts", function () {
    this.timeout(5000);

  it("Ruta: api/sessions/login con metodo POST", async function () {
        const user = {
            email: "gogo@gmail.com",
            password: "sarassa"
        }

    const { _body, ok } = await requester.post("/sessions/login").send(user);
    cookie = _body.cookie;
    expect(ok).to.be.ok;
  });

describe("Pruebas para la ruta /api/carts/:cid/products/:pid", () => {
  it("Ruta: api/carts metodo Post", async () => {
    
    const cartId = "65036104a64cefd4eca177a1";
    const productId = "650223e3bf2ac75bb9178382";
    const cantidad = {
      quantity: 5,
    };

    const response = await requester
      .post(`/api/carts/${cartId}/products/${productId}`)
      .send(cantidad);
    
    console.log("Mensaje!");
    console.log(response.body);
    
    expect(response.status).to.equal(200);
  });
})

after(async () => {
  await mongoose.disconnect();
});

});