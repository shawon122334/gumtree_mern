const app = require("./app");
const { serverPort } = require("./secret");

app.listen(serverPort,()=>{
    console.log(`server is listening on http://localhost:${serverPort}`);
})