const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const model = require('./../build/database/models/index.js');

chai.use(chaiHttp);

describe('Database models.', ()=>{
    describe('User related activities', ()=>{
        it('Creates a new user.', (done)=>{
            var testUser = {  
                first_name: 'One',
                last_name: 'Tester',
                username: 'testerOne',
                email: 'test@email.com',
                password: 'password2020'
            };
            model.user.register(testUser,(result)=>{
                expect(result.code).to.equal(400);
                done();
            });
        });
        it('Logins in as user.', (done)=>{
            var testLogin = {
                email: 'test@email.com',
                password: 'password2020'
            };
            model.user.login(testLogin,(result)=>{
                expect(result.code).to.equal(204);
                done();
            });
        });
    });
});