const chai = require('chai');
const expect = chai.expect;
let chaiHttp = require('chai-http');
const model = require('./../database/models/index.js');

chai.use(chaiHttp);

describe('Database models.', ()=>{
    describe('User related activities', ()=>{
        it('Creates a new user.', (done)=>{
            model.user.register({},(result)=>{
                expect(result.code).to.equal(400);
                done();
            });
        });
        it('Logins in as user.', (done)=>{
            model.user.login({email: 'nobody@nosite.com'},(result)=>{
                expect(result.code).to.equal(204);
                done();
            });
        });
    });
    describe('Event related',()=>{
        it('Creates a new event.', (done)=>{
            expect().to.equal('fill me in');
            done();
        });
        it('Views particular event.', (done)=>{
            expect().to.equal('fill me in');
            done();
        });
    });
    describe('Rooms',()=>{
        it('Creates a new room.', (done)=>{
            expect().to.equal('fill me in');
            done();
        });
        it('Views a room.', (done)=>{
            expect().to.equal('fill me in');
            done();
        });
    });
    describe('Threads',()=>{
        it('Creates a new thread.', (done)=>{
            expect().to.equal('fill me in');
            done();
        });
    });
    describe('Messages',()=>{
        it('Adds a new message.', (done)=>{
            expect().to.equal('fill me in');
            done();
        });
    });
});