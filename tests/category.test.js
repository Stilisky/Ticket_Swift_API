const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const expect = chai.expect;

chai.use(chaiHttp)

describe("Category endpoints Test", () => {
   // it('Test creation du user', (done) => {
   //    const user = {
   //       "username": "Paulo Coelho",
   //       "email": 'paulo@mail.com',
   //       "password": '123456',
   //       "age": 45
   //    };

   //    chai.request(app)
   //       .post("/register")
   //       .send(user)
   //       .end((err, res) => {
   //          expect(res).to.have.status(201);
   //          expect(res.body).to.have.property('username').to.equal('Paulo Coelho');
   //          done(err)
   //       })
   // })

   it('Test categories', (done) => {

      chai.request(app)
         .get("/categories")
         .end((err, res) => {
            expect(res).to.have.status(200);
            done(err)
         })
   })
})