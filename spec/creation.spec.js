const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const address = 'http://localhost:8080';
var testIds = {
    event: '',
    room: '',
    thread: '',
    message: ''
};
chai.use(chaiHttp);

describe('APIs to create objects.', ()=>{
    describe('User related activities', ()=>{
        it('Creates a new user.', (done)=>{
            var testUser = {  
                first_name: 'One',
                last_name: 'Tester',
                username: 'testerOne',
                email: 'test@email.com',
                password: 'password2020'
            };
            chai.request(address)
            .post('/api/user', testUser)
            .end((err, res)=>{
                expect(res.status).to.equal(201);
                done();
            });
        });
        it('Logins in as user.', (done)=>{
            var testLogin = {
                email: 'test@email.com',
                password: 'password2020'
            };
            chai.request(address)
            .post('/api/user', testLogin)
            .end((err, res)=>{
                expect(res.status).to.equal(201);
                done();
            });
        });
    });
    describe('Event related',()=>{
        it('Creates a new event.', (done)=>{
            var testParams = {
                name: 'Event Test Name',
                start_date: '1/1/2020',
                end_date: '1/1/2020',
                description: 'Test Description' 
            };
            chai.request(address)
            .post('/api/events', testParams)
            .end((err, res)=>{

                expect(res.status).to.equal(201);
                done();
            });
        });
        it('Creates a new event.', (done)=>{
            var testParams = {
            };
            chai.request(address)
            .post('/api/events', testParams)
            .end((err, res)=>{
                testIds.event= res.id;
                expect(res.status).to.equal(201);
                done();
            });
        });
    });
    describe('Rooms',()=>{
        //need to get the event id
        it('Creates a new room.', (done)=>{
            var testParams = {
            };
            chai.request(address)
            .post('/api/rooms', testParams)
            .end((err, res)=>{
                testIds.room = res.id;
                expect(res.status).to.equal(201);
                done();
            });
        });
    });
    describe('Threads',()=>{
        it('Creates a new thread.', (done)=>{
            var testParams = {
            };
            chai.request(address)
            .post('/api/rooms', testParams)
            .end((err, res)=>{
                testIds.thread = res.id;
                expect(res.status).to.equal(201);
                done();
            });
        });
    });
    describe('Messages',()=>{
        it('Creates a new message.', (done)=>{
            var testParams = {
            };
            chai.request(address)
            .post('/api/rooms', testParams)
            .end((err, res)=>{
                testIds.message = res.id;
                expect(res.status).to.equal(201);
                done();
            });
        });
    });
});