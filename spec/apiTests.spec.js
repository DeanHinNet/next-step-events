const chai = require('chai');
const expect = chai.expect;
let chaiHttp = require('chai-http');
const model = require('./../database/models/index.js');
const address = 'http://localhost:8080';
// const nock = require('nock');
// const ebResponse = require('./eventbriteApiTestData.js');
// const ebExpectedResults = require('./eventbriteExpectedResults.js');

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

   // before(done =>{

    // });

    // after(()=>{

    // });

    // it('returns a message', done =>{
    //     expect().to.equal();
    //     done();
    // })

   // describe('Get EventBrite events', () => {
        //     beforeEach(()=>{
        //         nock('https://www.eventbriteapi.com')
        //         .filteringPath(function(path){
        //             return '/v3/events/search/';
        //         })
        //         .get('/v3/events/search/')
        //         .reply(200, ebResponse);
        //     });
        //     it('Get all events', (done) => {
        //         model.eventBrite.get((result)=>{
        //             expect().to.equal();
        //             done();
        //         });
        //     });
        // // }); 

        // describe('Rooms list of rooms ', () => {
        //     it('Gets list of rooms', (done)=>{
        //        chai.request('http://localhost:8080')
        //        .get('/api/rooms')
        //        .end((err, res)=>{
        //            expect(res.status).to.equal(201);
        //            done();
        //        });
        //     });
        // }); 