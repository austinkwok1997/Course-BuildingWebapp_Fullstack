"use strict";
var chai_1 = require("chai");
var InsightFacade_1 = require("../src/controller/InsightFacade");
var fs = require('fs');
describe("transformationSpec", function () {
    this.timeout(15000);
    var facade = null;
    var zipContent;
    before(function () {
        facade = new InsightFacade_1.default();
    });
    it("deliverable 1st test", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;
        return facade.addDataset("rooms", zipContent).then(function () {
            return facade.performQuery({
                "WHERE": {
                    "AND": [{
                            "IS": {
                                "rooms_furniture": "*Tables*"
                            }
                        }, {
                            "GT": {
                                "rooms_seats": 300
                            }
                        }]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_shortname",
                        "maxSeats"
                    ],
                    "ORDER": {
                        "dir": "DOWN",
                        "keys": ["maxSeats"]
                    },
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["rooms_shortname"],
                    "APPLY": [{
                            "maxSeats": {
                                "MAX": "rooms_seats"
                            }
                        }]
                }
            }).then(function (InF) {
                console.log(JSON.stringify(InF.body));
            });
        }).catch(function (err) {
            console.log(err);
            chai_1.expect.fail();
        });
    });
    it("deliverable 2nd test", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;
        return facade.addDataset("rooms", zipContent).then(function () {
            return facade.performQuery({
                "WHERE": {},
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_furniture"
                    ],
                    "ORDER": "rooms_furniture",
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["rooms_furniture"],
                    "APPLY": []
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
//# sourceMappingURL=transformationSpec.js.map