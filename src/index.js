const app = require('./server');
require("./connectionDB");
app.listen(app.get('port'),()=>{
	console.log('Server on port', app.get('port'))
})
