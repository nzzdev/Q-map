process.env.LAYER_CONFIGS =
  '{"terrain":{"label":"Terrain","url":"https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png","minimapLayerUrl":"https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png","config":{"attribution":"Map tiles by <a href=\\"http://stamen.com\\">Stamen Design</a>, under <a href=\\"http://creativecommons.org/licenses/by/3.0\\">CC BY 3.0</a>. Data by <a href=\\"http://openstreetmap.org\\">OpenStreetMap</a>, under <a href=\\"http://www.openstreetmap.org/copyright\\">ODbL</a>."},"containerClass":"with-base-layer-streets","maxZoom":18},"aerial":{"label":"Aerial","url":"https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png","minimapLayerUrl":"https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png","config":{"attribution":"Map tiles by <a href=\\"http://stamen.com\\">Stamen Design</a>, under <a href=\\"http://creativecommons.org/licenses/by/3.0\\">CC BY 3.0</a>. Data by <a href=\\"http://openstreetmap.org\\">OpenStreetMap</a>, under <a href=\\"http://www.openstreetmap.org/copyright\\">ODbL</a>."},"containerClass":"with-base-layer-streets","maxZoom":18},"streetsFewLabels":{"label":"StreetsFewLabels","url":"https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png","minimapLayerUrl":"https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png","config":{"attribution":"Map tiles by <a href=\\"http://stamen.com\\">Stamen Design</a>, under <a href=\\"http://creativecommons.org/licenses/by/3.0\\">CC BY 3.0</a>. Data by <a href=\\"http://openstreetmap.org\\">OpenStreetMap</a>, under <a href=\\"http://www.openstreetmap.org/copyright\\">ODbL</a>."},"containerClass":"with-base-layer-streets","maxZoom":18},"streetsNoLabels":{"label":"StreetsNoLabels","url":"https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png","minimapLayerUrl":"https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png","config":{"attribution":"Map tiles by <a href=\\"http://stamen.com\\">Stamen Design</a>, under <a href=\\"http://creativecommons.org/licenses/by/3.0\\">CC BY 3.0</a>. Data by <a href=\\"http://openstreetmap.org\\">OpenStreetMap</a>, under <a href=\\"http://www.openstreetmap.org/copyright\\">ODbL</a>."},"containerClass":"with-base-layer-streets","maxZoom":18},"streetsNoLabels":{"label":"StreetsNoLabels","url":"https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png","minimapLayerUrl":"https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png","config":{"attribution":"Map tiles by <a href=\\"http://stamen.com\\">Stamen Design</a>, under <a href=\\"http://creativecommons.org/licenses/by/3.0\\">CC BY 3.0</a>. Data by <a href=\\"http://openstreetmap.org\\">OpenStreetMap</a>, under <a href=\\"http://www.openstreetmap.org/copyright\\">ODbL</a>."},"containerClass":"with-base-layer-streets","maxZoom":18},"streets":{"label":"Streets","url":"https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png","minimapLayerUrl":"https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png","config":{"attribution":"Map tiles by <a href=\\"http://stamen.com\\">Stamen Design</a>, under <a href=\\"http://creativecommons.org/licenses/by/3.0\\">CC BY 3.0</a>. Data by <a href=\\"http://openstreetmap.org\\">OpenStreetMap</a>, under <a href=\\"http://www.openstreetmap.org/copyright\\">ODbL</a>."},"containerClass":"with-base-layer-streets","maxZoom":18},"toner":{"label":"Toner","url":{"full":"https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png","background":"https://stamen-tiles.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png","labels":"https://stamen-tiles.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}.png"},"minimapLayerUrl":"https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png","config":{"attribution":"Map tiles by <a href=\\"http://stamen.com\\">Stamen Design</a>, under <a href=\\"http://creativecommons.org/licenses/by/3.0\\">CC BY 3.0</a>. Data by <a href=\\"http://openstreetmap.org\\">OpenStreetMap</a>, under <a href=\\"http://www.openstreetmap.org/copyright\\">ODbL</a>."},"containerClass":"with-base-layer-streets","maxZoom":18},"toner-background":{"label":"Toner (background)","url":"https://stamen-tiles.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png","minimapLayerUrl":"https://stamen-tiles.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png","config":{"attribution":"Map tiles by <a href=\\"http://stamen.com\\">Stamen Design</a>, under <a href=\\"http://creativecommons.org/licenses/by/3.0\\">CC BY 3.0</a>. Data by <a href=\\"http://openstreetmap.org\\">OpenStreetMap</a>, under <a href=\\"http://www.openstreetmap.org/copyright\\">ODbL</a>."},"containerClass":"with-base-layer-streets","maxZoom":18}}';
const Lab = require("@hapi/lab");
const Code = require("@hapi/code");
const glob = require("glob");
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

// all the fixtures render
lab.experiment("all fixtures render", async () => {
  const fixtureFiles = glob.sync(
    `${__dirname}/../resources/fixtures/data/*.json`
  );
  for (let fixtureFile of fixtureFiles) {
    const fixture = require(fixtureFile);
    it(`doesnt fail in rendering fixture ${fixture.title}`, async () => {
      const request = {
        method: "POST",
        url: "/rendering-info/html-js",
        payload: {
          item: fixture,
          toolRuntimeConfig: {
            toolBaseUrl: "http://localhost:3000",
            displayOptions: {}
          }
        }
      };
      const response = await server.inject(request);
      expect(response.statusCode).to.be.equal(200);
    });
  }
});
