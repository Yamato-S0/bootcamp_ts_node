import http from "node:http";
import * as fs from "node:fs";
import * as path from "node:path";
const server = http.createServer();

server.on("request", async (req, res) => {
  console.log("request url: ", req.url);
  // Content-Type is important for browsers.
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  // リクエストされたパスを取得
  const filePath = path.join(__dirname, "public", String(req.url));

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-type": "text/plain" });
      res.end();
    } else {
      // ファイルの拡張子に基づいて適切なContent-Typeを設定する
      let contentType = "text/plain";
      if (filePath.endsWith(".html")) {
        contentType = "text/html";
      } else if (filePath.endsWith(".jpg")) {
        contentType = "image/jpeg";
      } else if (filePath.endsWith(".json")) {
        contentType = "text/json";
      } else if (filePath.endsWith(".ico")) {
        contentType = "image/x-icon";
      }

      res.writeHead(200, { "Content-type": contentType });
      res.write(data);
      res.end();
    }
  });
  //res.writeHead(200, { "content-type": "text/plain" });
  //res.write("hello!\n");
  //res.end();
});

server.on("listening", () => {
  console.log("start listening!");
});

// Start listening 12345 port of localhost (127.0.0.1).
//server.listen(12345, () => {
//console.log("listening on http://localhost:12345/");
//});
const port = process.env.PORT || 12345;
server.listen(port, () => {
  console.log(`listening on http://localhost:${port}/`);
});
console.log("run server.js");
