const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const model = require('./../build/database/models/index.js');
const address = 'http://localhost:8080';

chai.use(chaiHttp);

describe('Authentication, database models check.', ()=>{
    describe('User authentication, logging in check.', ()=>{
        it('No email provided.', (done)=>{
            model.user.login({},(result)=>{
                expect(result.code).to.equal(400);
                done();
            });
        });
        it('Email is not in database, status code.', (done)=>{
            model.user.login({email: 'nobody@nosite.com'},(result)=>{
                expect(result.code).to.equal(204);
                done();
            });
        });
    });
    describe('Protected routes check, not logged in check.', ()=>{
        it('Posting to messages.', (done)=>{
            chai.request(address)
            .post('/api/messages', {content: 'message'})
            .end((err, res)=>{
                expect(res.status).to.equal(401);
                done();
            });
         });
         it('Posting to events.', (done)=>{
            chai.request(address)
            .post('/api/events', {content: 'message'})
            .end((err, res)=>{
                expect(res.status).to.equal(401);
                done();
            });
         });
         it('Posting to rooms.', (done)=>{
            chai.request(address)
            .post('/api/rooms', {content: 'message'})
            .end((err, res)=>{
                expect(res.status).to.equal(401);
                done();
            });
         });
         it('Posting to thread.', (done)=>{
            chai.request(address)
            .post('/api/thread', {content: 'message'})
            .end((err, res)=>{
                expect(res.status).to.equal(401);
                done();
            });
         });
    });
});
