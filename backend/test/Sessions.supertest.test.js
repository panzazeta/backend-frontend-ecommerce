import "dotenv/config";
import {expect} from "chai";
import mongoose from 'mongoose'
import supertest from 'supertest'

const requester = supertest('http://localhost:4000')

await mongoose.connect(process.env.MONGO_URL)

describe('Test Users Session api/sessions', function () {
    let cookie = {};
    this.timeout(5000);

    it("Ruta: api/sessions/register con metodo POST", async () => {
        const newUser = {
            first_name: "Gogol",
            last_name: "Perezori",
            age: 26,
            email: "gogo@gmail.com",
            password: "sarassa"
        }

        const { statusCode, _body } = await requester
        .post("/api/sessions/register")
        .send(newUser);
  
      expect(statusCode).to.equal(201);
      expect(_body.mensaje).to.equal("Usuario registrado");
    });
       
    // it("Ruta: api/sessions/login con metodo POST", async () => {
    //     const user = {
    //         email: "san@san.com",
    //         password: "sa@sa.com"
    //     }

    //     const resultado = await requester.post('/api/sessions/login').send(user)
    //     const cookieResult = resultado.headers['set-cookie'][0]

    //     expect(cookieResult).to.be.ok

    //     cookie = {
    //         name: cookieResult.split("=")[0],
    //         value: cookieResult.split("=")[1]
    //     }

    //     expect(cookie.name).to.be.ok.and.equal('coderCookie')
    //     expect(cookie.value).to.be.ok
    // })

    // it("Ruta: api/session/current con metodo GET", async () => {

    //     const { _body } = await requester.get('/api/sessions/current')
    //         .set('Cookie', [`${cookie.name} = ${cookie.value}`])

    //     console.log(_body.payload)

    //     expect(_body.payload.email).to.be.equal('san@san.com')
    // })

})