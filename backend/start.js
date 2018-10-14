require('dotenv').config({ path: 'variables.env' });
const fs = require('fs');
const app = require('./app');
app.set('port', process.env.PORT || 3000);

var options = {
	fit:    'box',
	width:  40,
	height: 40
};

const server = app.listen(app.get('port'), "0.0.0.0", () => {
	console.log(
		" _    ___      ______     _\n" +              
		"| |  / (_)____/ ____/____(_)___ ___  ___\n"+ 
		"| | / / / ___/ /   / ___/ / __ `__ \\/ _ \\\n" + 
		"| |/ / (__  ) /___/ /  / / / / / / /  __/\n" + 
		"|___/_/____/\\____/_/  /_/_/ /_/ /_/\\___/\n");

	console.log("Starting Up...");

	if (!fs.existsSync(process.cwd() + "/.disable_developer_mode"))
	{
		console.log("\x1b[31m", "\x1b[1m", "\nVisCrime is running in Developer Mode. Some database features are unavailable.\n", "\x1b[0m");
	}
	else
	{
		process.env.DISABLE_DEVELOPER_MODE = true;
	}
	console.log("System output:");
	console.log(`\nVisCrime now running on port: ${server.address().port}`);
	//console.log(process.env.DEVELOPER_MODE);
	
});

module.exports = app;
