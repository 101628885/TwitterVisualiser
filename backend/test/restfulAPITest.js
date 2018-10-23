const app = require('../start');
const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest');
const expect = chai.expect;
const timeout = ms => new Promise(res => setTimeout(res, ms));
chai.use(require('chai-json'));
chai.use(chaiHttp);


describe('Test / route', function() {
    it("Should return 200", function(done) {
        request(app).get('/')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res.statusCode).to.equal(200);
                done();
            });
    });
});

describe('Test /tweetMap route', function() {
    it("Should return 200", function(done) {
        request(app).get('/tweetMap')
            .end(function(err, res) {

            	let testJSON = function(data){
            		try {
            			JSON.parse(JSON.stringify(data))
            		} catch(e) {
            			return false;
            		}

            		return true;
            	}

                expect(err).to.be.null;
                expect(res.statusCode).to.equal(200);
                expect(testJSON(res.body)).to.equal(true);
                done();
            });
    });
});

describe('Test /deckmap route', function() {
    it("Should return 200", function(done) {
        request(app).get('/deckmap')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res.statusCode).to.equal(200);
                done();
            });
    });
});

describe('Test /lookup route', function() {
    it("Should return 200", function(done) {
        request(app).get('/lookup')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res.statusCode).to.equal(200);
                done();
            });
    });
});

describe('Test /lookup/api route', function() {
    it("Should return 200", function(done) {
        request(app).get('/lookup/api')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res.statusCode).to.equal(200);
                done();
            });
    });
});

describe('Test /lookup/db route', function() {
    it("Should return 200", function(done) {
        request(app).get('/lookup/db')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res.statusCode).to.equal(200);
                done();
            });
    });
});

describe('Test /auto route', function() {
    it("Should return 200", function(done) {
        request(app).get('/auto')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res.statusCode).to.equal(200);
                done();
            });
    });
});

describe('Test /check route', function() {
    it("Should return 200", function(done) {
        request(app).get('/check')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res.statusCode).to.equal(200);
                done();
            });
    });
});
