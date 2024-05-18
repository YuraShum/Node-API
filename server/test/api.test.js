import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import { createServer } from '../src/createServer.js'
import nock from 'nock'
import subscribeModel from '../src/models/subscribeModels.js';

const chai = use(chaiHttp)
const port = process.env.TEST_PORT
const server = createServer(process.env.MONGO_URL_TEST, port)


describe("API TEST", () => {

    

    after((done) => {
        mongoose.connection.close();
        done();
    });

    describe('GET current rate', () => {
        it('should get a current rate', (done) => {
            const mockResponse = 39.43

            nock(`http://localhost:${port}`)
                .get('/rate')
                .reply(200, mockResponse)

            chai.request(server)
                .get('/rate')
                .end((err, response) => {
                    expect(response).to.have.status(200)
                    expect(response.body).to.equal(mockResponse)
                    done()
                })
        })
    })
    describe("POST subscription", () => {
        before(async () => {
            try {
                await subscribeModel.findOneAndDelete({ email: 'yura1999test@gmail.com' });
            } catch (err) {
                throw err;
            }
        });
        it("should create a new subscription that does not exist in the database", (done) => {
            const mockRequestData = { email: 'yura1999test@gmail.com' }
            const mockResponseData = { email: 'yura1999test@gmail.com' }

            nock(`http://localhost:${port}`)
                .post('/subscribe')
                .reply(200, mockResponseData)

            chai.request(server)
                .post('/subscribe')
                .send(mockRequestData)
                .end((err, response) => {
                    expect(response).to.have.status(200)
                    expect(response.body).to.deep.equal(mockResponseData)
                    done()
                })
        })
    })

    describe("POST email that is already signed", () => {
        it("should not create a new subscription as it is already issued", (done) => {
            const mockRequestData = { email: "roma2002test@gmail.com" }
            const mockResponseData = { status: 409, message: 'Unfortunately, the email is already taken' }

            nock(`http://localhost:${port}`)
                .post('/subscribe')
                .reply(409, mockResponseData)

            chai.request(server)
                .post('/subscribe')
                .send(mockRequestData)
                .end((err, response) => {
                    expect(response).to.have.status(409)
                    expect(response.body).to.deep.equal(mockResponseData)
                    done()
                })
        })
    })

    describe("POST send message", () => {
        it("should message must be sent to all emails", async () => {
            const emails = await subscribeModel.find()
            const mockResponseData = `Send messages to ${[...emails].length} emails`

            nock(`http://localhost:${port}`)
                .post('/sendEmails')
                .reply(200, mockResponseData)

            return chai.request(server)
                .post('/sendEmails')
                .then((response) => {
                    expect(response).to.have.status(200)
                    expect(response.body).to.deep.equal(mockResponseData)
                });
        })
    })
}
)