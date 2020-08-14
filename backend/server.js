const http = require('http');
const app = require('./app');



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server run at port ${PORT}`));