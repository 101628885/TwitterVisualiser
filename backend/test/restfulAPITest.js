const app = require('../start');
const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest');
const expect = chai.expect;
const timeout = ms => new Promise(res => setTimeout(res, ms));
chai.use(chaiHttp);

describe('Test all routes', function(){

	it('should return 200 or another valid response code', async function()
	{

		chai.request(app).get('/').end((err, res) => {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
		})

		chai.request(app).get('/tweetMap').end((err, res) => {
			console.log(res);
			expect(res.statusCode).to.equal(200);
		});

		chai.request(app).get('/about').end((err, res) => {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
		});

		chai.request(app).get('/deckmap').end((err, res) => {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
		});

		chai.request(app).get('/lookup').end((err, res) => {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
		});

		chai.request(app).get('/lookup/api').end((err, res) => {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
		});

		chai.request(app).get('/lookup/db').end((err, res) => {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
		});

		chai.request(app).get('/auto').end((err, res) => {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
		});

		chai.request(app).get('/check').end((err, res) => {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
		});

		chai.request(app).get('/getCrimeWordCount').end((err, res) => {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
		});

		chai.request(app).get('/getPredictedData').end((err, res) => {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
		});

		chai.request(app).get('/tweetMap').end((err, res) => {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
		});

		chai.request(app).get('/list').end((err, res) => {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
		});

		chai.request(app).get('/chicago').end((err, res) => {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
		});

		chai.request(app).get('/seattle').end((err, res) => {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
		});

		chai.request(app).get('/baltimore').end((err, res) => {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
		});

		chai.request(app).get('/checkData').end((err, res) => {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
		});

		chai.request(app).get('/tweetsChicagoWithLocation').end((err, res) => {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
		});



		await timeout(2000);

































		
	})
})