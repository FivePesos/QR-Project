const app = require("express")();
const PORT = 8080;

app.listen(
    PORT, () => console.log(`The port is alive at http://localhost:${PORT}`)
)