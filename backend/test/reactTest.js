const expect = require('chai').expect;
const react = require('../controllers/reactController');
const resultLimit = 50;

describe('queryDB()', function(){

	it('should return only documents matching query criteria', async() =>
	{
		//SETUP
		let testCheckedTrue = []; //Check that it correctly returns checked tweets
		let testCheckedFalse = []; //Check that it correctly returns unchecked tweets
		let testCrimeTrue = []; //Correctly returns crime tweets
		let testCrimeFalse = []; //Correctly returns non-crime tweets


		//ACTION
		await react.queryDB({checked: true}, resultLimit).then(function(res){testCheckedTrue = res});
		await react.queryDB({checked: false}, resultLimit).then(function(res){testCheckedFalse = res});
		await react.queryDB({crime: true}, resultLimit).then(function(res){testCrimeTrue = res});
		await react.queryDB({crime: false}, resultLimit).then(function(res){testCrimeFalse = res});


		//ASSERT
		expect(testCheckedTrue.length).to.be.equal(resultLimit);
		expect(testCheckedFalse.length).to.be.equal(resultLimit);
		expect(testCrimeTrue.length).to.be.equal(resultLimit);
		expect(testCrimeFalse.length).to.be.equal(resultLimit);

		for (let i in testCheckedTrue)
		{
			expect(testCheckedTrue[i].checked).to.be.equal(true);
		}

		for (let i in testCheckedFalse)
		{
			expect(testCheckedFalse[i].checked).to.be.equal(false);
		}

		for (let i in testCrimeTrue)
		{
			expect(testCrimeTrue[i].crime).to.be.equal(true);
		}

		for (let i in testCrimeFalse)
		{
			expect(testCrimeFalse[i].crime).to.be.equal(false);
		}

	})
});