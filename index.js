const http      = require("http");
const app       = require("./app");
const { PORT }  = process.env;
const server    = http.createServer(app);
const port      = PORT || "3000";

server.listen(port, () => {
    console.log(`Server is running on port ${port}....`);
});