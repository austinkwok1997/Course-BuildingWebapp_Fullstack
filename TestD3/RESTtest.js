"use strict";
var chai_1 = require("chai");
var Util_1 = require("../src/Util");
var Server_1 = require("../src/rest/Server");
var fs = require("fs");
var chai = require("chai"), chaiHttp = require('chai-http');
chai.use(chaiHttp);
describe("REST_Test", function () {
    this.timeout(5000);
    var s;
    var zipContent;
    before(function () {
        s = new Server_1.default(4321);
        s.start().then(function (val) {
            Util_1.default.info("App::initServer() - started: " + val);
        }).catch(function (err) {
            Util_1.default.error("App::initServer() - ERROR: " + err.message);
        });
    });
    beforeEach(function () {
    });
    afterEach(function () {
    });
    after(function () {
        s.stop().then(function (val) {
            Util_1.default.info("App::initServer() - started: " + val);
        }).catch(function (err) {
            Util_1.default.error("App::initServer() - ERROR: " + err.message);
        });
    });
    it("PUT 204 new courses description", function () {
        return chai.request('http://localhost:4321/')
            .put('/dataset/courses')
            .attach("body", fs.readFileSync("./courses.zip"), "courses.zip")
            .then(function (res) {
            Util_1.default.trace('then:');
            chai_1.expect(res.status).to.be.eq(204);
            console.log(res);
        })
            .catch(function (err) {
            Util_1.default.trace('catch:');
            console.log("wtf did u do: " + err);
            chai_1.expect.fail();
        });
    });
    it("PUT 204 new rooms description", function () {
        return chai.request('http://localhost:4321/')
            .put('/dataset/rooms')
            .attach("body", fs.readFileSync("./rooms.zip"), "rooms.zip")
            .then(function (res) {
            Util_1.default.trace('then:');
            chai_1.expect(res.status).to.be.eq(204);
            console.log(res);
        })
            .catch(function (err) {
            Util_1.default.trace('catch:');
            console.log("wtf did u do: " + err);
            chai_1.expect.fail();
        });
    });
    it("PUT 201 already has room description", function () {
        return chai.request('http://localhost:4321/')
            .put('/dataset/rooms')
            .attach("body", fs.readFileSync("./rooms.zip"), "rooms.zip")
            .then(function (res) {
            Util_1.default.trace('then:');
            chai_1.expect(res.status).to.be.eq(201);
            console.log(res);
        })
            .catch(function (err) {
            Util_1.default.trace('catch:');
            console.log("wtf did u do: " + err);
            chai_1.expect.fail();
        });
    });
    it("PUT 201 already has room description", function () {
        return chai.request('http://localhost:4321/')
            .put('/dataset/courses')
            .attach("body", fs.readFileSync("./courses.zip"), "courses.zip")
            .then(function (res) {
            Util_1.default.trace('then:');
            chai_1.expect(res.status).to.be.eq(201);
            console.log(res);
        })
            .catch(function (err) {
            Util_1.default.trace('catch:');
            console.log("wtf did u do: " + err);
            chai_1.expect.fail();
        });
    });
    it("POST description", function () {
        var queryJSONObject = {
            "WHERE": {
                "AND": [
                    { "GT": { "courses_avg": 90 } },
                    { "GT": { "courses_avg": 90 } }
                ]
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_dept",
                    "courses_avg"
                ],
                "ORDER": "courses_avg",
                "FORM": "TABLE"
            }
        };
        return chai.request('http://localhost:4321/')
            .post('/query')
            .send(queryJSONObject)
            .then(function (res) {
            Util_1.default.trace('then:');
            chai_1.expect(res.status).to.be.eq(200);
            console.log(res.body);
            console.log(res);
        })
            .catch(function (err) {
            Util_1.default.trace('catch:');
            console.log(err);
            chai_1.expect.fail();
        });
    });
    it("DEL description", function () {
        return chai.request('http://localhost:4321/')
            .del('/dataset/rooms')
            .then(function (res) {
            Util_1.default.trace('then:');
            chai_1.expect(res.status).to.be.eq(204);
            console.log(res.body);
            console.log(res);
        })
            .catch(function (err) {
            Util_1.default.trace('catch:');
            console.log(err);
            chai_1.expect.fail();
        });
    });
    it("DEL description", function () {
        return chai.request('http://localhost:4321/')
            .del('/dataset/rooms')
            .then(function (res) {
            Util_1.default.trace('then:');
            console.log(res.body);
            console.log(res);
            chai_1.expect.fail();
        })
            .catch(function (err) {
            Util_1.default.trace('catch:');
            chai_1.expect(err.status).to.be.eq(404);
            console.log(err);
        });
    });
});
//# sourceMappingURL=RESTtest.js.map