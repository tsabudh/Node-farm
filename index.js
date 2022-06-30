const fs = require("fs");
const url = require("url");
const http = require("http");
const path = require("path");

//Modules import

const replaceTemplate = require('./modules/replaceTemplate');


//Server



const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(
  `${__dirname}/dev-data/data.json`,
  "utf-8",
  (err, data) => {
    console.log("sup dataobj");
  }
);
const dataObj = JSON.parse(data);

// console.log(dataObj);

const server = http.createServer(function (req, res) {
  // const { query, pathname } = url.parse(req.url, true);
  // console.log(url.parse(req.url));
  // console.log(pathname);
  // console.log(query);

  const query = url.parse(req.url, true).query;
  const pathname = url.parse(req.url, true).pathname;
  // console.log(url.parse(req.url, true).query);
  // console.log(typeof url.parse(pathname, true));

  //Overview page
  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    const cardHtml = dataObj.map(function (el) {
      return replaceTemplate(tempCard, el);
    });

    // console.log(cardHtml);
    // console.log(tempCard);
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardHtml);
    // console.log(output);
    res.end(output);

    //Product page
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    const product = dataObj[query.id];

    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //API page
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "content-type": "application/JSON",
    });
    res.end(data); // res.end must have string as passed argument

    //404 Not Found page
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      myownheader: "hello-buddy",
    });
    res.end("<h1>Page not found.</h1>");
  }
});

server.listen(8000, "127.0.0.1", function () {
  console.log("Listening to request on port 8000.");
});
