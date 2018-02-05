const Lab = require("lab");
const Code = require("code");
const Hapi = require("hapi");
const lab = (exports.lab = Lab.script());

const expect = Code.expect;
const before = lab.before;
const after = lab.after;
const it = lab.it;

let server = require("../server.js");
const plugins = require("../server-plugins.js");
const routes = require("../routes/routes.js");

before(async () => {
  await server.register(plugins);
  server.route(routes);
  await server.start();
});

after(async () => {
  await server.stop({ timeout: 2000 });
  server = null;
  return;
});

lab.experiment("basic routes", () => {
  it("starts the server", () => {
    expect(server.info.created).to.be.a.number();
  });

  it("is healthy", async () => {
    const response = await server.inject("/health");
    expect(response.payload).to.be.equal("ok");
  });
});

lab.experiment("schema route", () => {
  it("returns existing schema", async () => {
    const response = await server.inject(`/schema.json`);
    expect(response.statusCode).to.be.equal(200);
  });

  it("returns Not Found when requesting an inexisting schema", async () => {
    const response = await server.inject("/inexisting.json");
    expect(response.statusCode).to.be.equal(404);
  });
});

lab.experiment("stylesheets route", () => {
  it(
    "returns existing stylesheet with right cache control header",
    { plan: 2 },
    async () => {
      const filename = require("../styles/hashMap.json").default;
      const response = await server.inject(`/stylesheet/${filename}`);
      expect(response.statusCode).to.be.equal(200);
      expect(response.headers["cache-control"]).to.be.equal(
        "max-age=31536000, immutable"
      );
    }
  );

  it("returns Not Found when requesting an inexisting stylesheet", async () => {
    const response = await server.inject("/stylesheet/inexisting.123.css");
    expect(response.statusCode).to.be.equal(404);
  });
});

lab.experiment("scripts route", () => {
  it(
    "returns existing script with right cache control header",
    { plan: 2 },
    async () => {
      const filename = require("../scripts/hashMap.json")["slippy-map"];
      const response = await server.inject(`/script/${filename}`);
      expect(response.statusCode).to.be.equal(200);
      expect(response.headers["cache-control"]).to.be.equal(
        "max-age=31536000, immutable"
      );
    }
  );

  it("returns Not Found when requesting an inexisting script", async () => {
    const response = await server.inject("/script/inexisting.123.css");
    expect(response.statusCode).to.be.equal(404);
  });
});

lab.experiment("locales route", () => {
  it("returns existing english translation", async () => {
    const response = await server.inject(`/locales/en/translation.json`);
    expect(response.statusCode).to.be.equal(200);
  });

  it("returns Not Found when requesting an inexisting translation", async () => {
    const response = await server.inject(
      "/locales/inexisting/translation.json"
    );
    expect(response.statusCode).to.be.equal(404);
  });
});

const mockData = require("./resources/mock-data.js");

lab.experiment("rendering-info route", () => {
  it("returns 400 for /rendering-info/html-js with missing toolBaseUrl in toolRuntimeConfig", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/rendering-info/html-js",
      payload: JSON.stringify({
        item: mockData,
        toolRuntimeConfig: {
          displayOptions: {}
        }
      })
    });
    expect(response.statusCode).to.be.equal(400);
  });

  it("renders a map /rendering-info/html-js", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/rendering-info/html-js",
      payload: JSON.stringify({
        item: mockData,
        toolRuntimeConfig: {
          toolBaseUrl: "http://localhost:3000",
          displayOptions: {}
        }
      })
    });
    expect(response.statusCode).to.be.equal(200);
  });
});
