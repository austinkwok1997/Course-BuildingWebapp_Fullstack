import {expect} from "chai";
import {InsightResponse} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";
var fs = require("fs");

describe("querySpec2:Preload dataStructure", function() {
    this.timeout(10000);

    let facade: any = null;
    let zipContent: any;
    before(function() {
        facade = new InsightFacade();
        console.time("dbsave");
        zipContent = fs.readFileSync("courses.zip").toString("base64");
        facade.addDataset("courses", zipContent).then(function(InF:InsightResponse){
            //console.log(InF.code+": "+JSON.stringify(InF.body));
            console.timeEnd("dbsave");
        }).catch(function(err:any){
            console.log(err);
            expect.fail();
        });
    });
    beforeEach(function() {
        facade = new InsightFacade();
    });
    afterEach(function() {
       facade = null;
    });
    it("simple query from spec", function() {
        console.log("+++TEST: simple query from spec");
        return facade.performQuery({
            "WHERE": {
                "GT": {
                    "courses_avg": 97
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_dept",
                    "courses_avg",
                    "courses_id",
                    "courses_uuid"

                ],
                "ORDER": "courses_avg",
                "FORM": "TABLE"
            }
        }).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            //console.log(JSON.stringify(InF));
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });

    it("MY query TEST TERMINAL OPTION: IS", function() {
        console.log("+++TEST: MY query 1");
        return facade.performQuery(
            {
                "WHERE": {
                    "AND":[{
                        "IS": {
                            "courses_dept": "b*"
                        }
                    },{"LT":{
                        "courses_avg": 80
                    }}
                    ]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_dept",
                        "courses_id",
                        "courses_avg"
                    ],
                    "ORDER": "courses_avg",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            //console.log(JSON.stringify(InF));
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });

    it("MY query TEST 1", function() {
        console.log("+++TEST: MY query 1 from spec");
        return facade.performQuery(
            {
                "WHERE": {
                    "OR": [
                        {
                            "AND": [
                                {
                                    "GT": {
                                        "courses_avg": 76
                                    }
                                },
                                {
                                    "IS": {
                                        "courses_dept": "a*"
                                    }
                                }
                            ]
                        },
                        {
                            "EQ": {
                                "courses_avg": 95
                            }
                        }
                    ]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_dept",
                        "courses_id",
                        "courses_avg"
                    ],
                    "ORDER": "courses_avg",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            //console.log(JSON.stringify(InF));
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });

    it("MY query TEST 2", function() {
        console.log("+++TEST: simple query from spec");
            return facade.performQuery(
                {
                "WHERE": {
                    "AND": [
                        {
                            "GT": {
                                "courses_avg": 80.5
                            }
                        },
                        {
                            "IS": {
                                "courses_dept": "b*"
                            }
                        }
                    ]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_dept",
                        "courses_avg",
                        "courses_uuid"
                    ],
                    "ORDER": "courses_avg",
                    "FORM": "TABLE"
                }
            }
            ).then(function (InF: InsightResponse) {
                //var t=JSON.parse(JSON.stringify(InF.body));
                //console.log(JSON.stringify(InF));
            }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });

    it("MY query TEST 3", function() {
        console.log("+++TEST: simple query from spec");
        return facade.performQuery(
            {
                "WHERE":{
                    "OR":[
                        {
                            "AND":[
                                {
                                    "GT":{
                                        "courses_avg":80.5
                                    }
                                },
                                {
                                    "IS":{
                                        "courses_dept":"biol"
                                    }
                                }
                            ]
                        },
                        {
                            "EQ":{
                                "courses_avg":78
                            }
                        }
                    ]
                },
                "OPTIONS":{
                    "COLUMNS":[
                        "courses_dept",
                        "courses_id",
                        "courses_avg"
                    ],
                    "ORDER":"courses_avg",
                    "FORM":"TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            //console.log(JSON.stringify(InF));
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });

    it("complex query from spec", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {
                "WHERE":{
                    "OR":[
                        {
                            "AND":[
                                {
                                    "GT":{
                                        "courses_avg":90
                                    }
                                },
                                {
                                    "IS":{
                                        "courses_dept":"adhe"
                                    }
                                }
                            ]
                        },
                        {
                            "EQ":{
                                "courses_avg":95
                            }
                        }
                    ]
                },
                "OPTIONS":{
                    "COLUMNS":[
                        "courses_dept",
                        "courses_id",
                        "courses_avg"
                    ],
                    "ORDER":"courses_avg",
                    "FORM":"TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            //console.log(JSON.stringify(InF));
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });

});