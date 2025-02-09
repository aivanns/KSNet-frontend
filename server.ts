import next from "next";
import https from "https";
import fs from "fs";
import path from "path";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync(path.join(process.cwd(), "certs", "private.key")),
  cert: fs.readFileSync(path.join(process.cwd(), "certs", "certificate.crt")),
};

app.prepare().then(() => {
  https
    .createServer(httpsOptions, (req, res) => {
      handle(req, res);
    })
    .listen(80, () => {
      console.log("> Ready on http://localhost:80");
    });
});

