import {expect} from "chai";
import {InsightResponse} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";
import {App} from "../src/App";
import Log from "../src/Util";
import Server from "../src/rest/Server";


var fs = require("fs");
var chai=require("chai") , chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe("REST_Test", function() {
    this.timeout(5000);

    let s:Server;
    //let facade: any = null;
    let zipContent: any;
    before(function() {
        //facade = new InsightFacade();
        s = new Server(4321);
        s.start().then(function (val: boolean) {
            Log.info("App::initServer() - started: " + val);
        }).catch(function (err: Error) {
            Log.error("App::initServer() - ERROR: " + err.message);
        });

    });

    beforeEach(function() {
        //facade = new InsightFacade();
    });
    afterEach(function() {
        //facade = null;
    });
    after(function() {
        s.stop().then(function (val: boolean) {
            Log.info("App::initServer() - started: " + val);
        }).catch(function (err: Error) {
            Log.error("App::initServer() - ERROR: " + err.message);
        });
    });

    it("PUT 204 new courses description", function () {
        return chai.request('http://localhost:4321/')
            .put('/dataset/courses')
            .attach("body", fs.readFileSync("./courses.zip"), "courses.zip")
            .then(function (res: any) {
                Log.trace('then:');
                // some assertions
                expect(res.status).to.be.eq(204);
                //console.log(res);
            })
            .catch(function (err:any) {
                Log.trace('catch:');
                // some assertions
                //console.log("wtf did u do: "+err);
                expect.fail();
            });
    });
    it("PUT 204 new rooms description", function () {
        return chai.request('http://localhost:4321/')
            .put('/dataset/rooms')
            .attach("body", fs.readFileSync("./rooms.zip"), "rooms.zip")
            .then(function (res: any) {
                Log.trace('then:');
                // some assertions
                expect(res.status).to.be.eq(204);
                //console.log(res);
            })
            .catch(function (err:any) {
                Log.trace('catch:');
                // some assertions
                console.log("wtf did u do: "+err);
                expect.fail();
            });
    });
    it("PUT 201 already has room description", function () {
        return chai.request('http://localhost:4321/')
            .put('/dataset/rooms')
            .attach("body", fs.readFileSync("./rooms.zip"), "rooms.zip")
            .then(function (res: any) {
                Log.trace('then:');
                // some assertions
                expect(res.status).to.be.eq(201);
                //console.log(res);
            })
            .catch(function (err:any) {
                Log.trace('catch:');
                // some assertions
                console.log("wtf did u do: "+err);
                expect.fail();
            });
    });
    it("PUT 201 already has room description", function () {
        return chai.request('http://localhost:4321/')
            .put('/dataset/courses')
            .attach("body", fs.readFileSync("./courses.zip"), "courses.zip")
            .then(function (res: any) {
                Log.trace('then:');
                // some assertions
                expect(res.status).to.be.eq(201);
                //console.log(res);
            })
            .catch(function (err:any) {
                Log.trace('catch:');
                // some assertions
                console.log("wtf did u do: "+err);
                expect.fail();
            });
    });

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++POST TESTS
    it("POST description", function () {
        let queryJSONObject=  {
            "WHERE":{
                "AND":[
                    {"GT" : {"courses_avg":90}},
                    {"GT" : {"courses_avg":90}}
                ]

            },
            "OPTIONS":{
                "COLUMNS":[
                    "courses_dept",
                    "courses_avg"
                ],
                "ORDER":"courses_avg",
                "FORM":"TABLE"
            }
        };

        return chai.request('http://localhost:4321/')
            .post('/query')
            .send(queryJSONObject)
            .then(function (res:any) {
                Log.trace('then:');
                expect(res.status).to.be.eq(200);
                // some assertions
                //console.log(res.body);
                //console.log(res);
            })
            .catch(function (err:any) {
                Log.trace('catch:');
                // some assertions
                //console.log(err);
                expect.fail();
            });
    });

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++DEL TESTS
    it("DEL description", function () {

        return chai.request('http://localhost:4321/')
            .del('/dataset/rooms')
            .then(function (res:any) {
                Log.trace('then:');
                expect(res.status).to.be.eq(204);
                // some assertions
                console.log(res.body);
                console.log(res);
            })
            .catch(function (err:any) {
                Log.trace('catch:');
                // some assertions
                console.log(err);
                expect.fail();
            });
    });

    it("DEL description", function () {

        return chai.request('http://localhost:4321/')
            .del('/dataset/rooms')
            .then(function (res:any) {
                Log.trace('then:');
                // some assertions
                //console.log(res.body);
                console.log(res);
                expect.fail();
            })
            .catch(function (err:any) {
                Log.trace('catch:');
                expect(err.status).to.be.eq(404);
                // some assertions
                //console.log(err);

            });
    });

});