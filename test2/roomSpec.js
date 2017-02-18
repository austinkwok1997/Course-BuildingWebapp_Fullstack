"use strict";
var chai_1 = require("chai");
var InsightFacade_1 = require("../src/controller/InsightFacade");
var fs = require('fs');
describe("roomSpec", function () {
    this.timeout(5000);
    var facade = null;
    var zipContent;
    before(function () {
        facade = new InsightFacade_1.default();
    });
    it("testing room zip", function () {
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        return facade.addDataset("rooms", zipContent).then(function (InF) {
            var t = JSON.stringify(InF.body);
            console.log(InF.code + t);
            console.log(" this is what dataStructure looks like right now: " + JSON.stringify(facade.getDataStructure()));
        }).catch(function (err) {
            console.log(err);
            chai_1.expect.fail();
        });
    });
    it("simple query from spec", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;
        thisIsIt.addDataset("rooms", zipContent).then(function () {
            return thisIsIt.performQuery({
                "WHERE": {
                    "IS": {
                        "rooms_name": "DMP_*"
                    }
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_name"
                    ],
                    "ORDER": "rooms_name",
                    "FORM": "TABLE"
                }
            }).then(function (InF) {
                console.log(JSON.stringify(InF.body));
            });
        }).catch(function (err) {
            console.log(err);
            chai_1.expect.fail();
        });
    });
});
//# sourceMappingURL=roomSpec.js.map