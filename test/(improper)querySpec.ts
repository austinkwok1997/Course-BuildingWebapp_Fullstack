import {expect} from "chai";
import {InsightResponse} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";
var fs = require("fs");

describe("(IMPROPER)querySpec", function() {
    this.timeout(5000);

    let facade: any = null;
    let zipContent: any;
    before(function() {
        facade = new InsightFacade();
        console.time("dbsave");
        zipContent = fs.readFileSync("coursesFewJson.zip").toString("base64");
        return facade.addDataset("coursesFewJson", zipContent).then(function(InF:InsightResponse){
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
    it("Wrong key value query from spec", function() {
        console.log("+++TEST: IMPROPER query");
        return facade.performQuery({
            "WHERE": {
                "GT": {
                    "courses_avg": "nintyfive"  //ERROR HERE
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
            expect.fail();
        }).catch(function (err: any) {
            console.log("should have: error: GT requires a number key: WHAT IT IS :"+JSON.stringify(err));
        });
    });

    it("Wrong key query from spec", function() {
        console.log("+++TEST: IMPROPER query");
        return facade.performQuery({
            "WHERE": {
                "GT": {
                    "coursesavgerage": 95  //ERROR HERE wrong key name
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
            expect.fail();
        }).catch(function (err: any) {
            console.log("should have: error: not valid key in query: WHAT IT IS :"+JSON.stringify(err));
        });
    });

    it("Wrong key query from spec", function() {
        console.log("+++TEST: IMPROPER query");
        return facade.performQuery({
            "WHERE": {
                "GT": {
                    "coursesavgerage": 95  //ERROR HERE wrong key name
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
            expect.fail();
        }).catch(function (err: any) {
            console.log("should have: error: not valid key in query: WHAT IT IS :"+JSON.stringify(err));
        });
    });

    it("ORDER key not in OPTION COLUMN from spec", function() {
        console.log("+++TEST: IMPROPER query");
        return facade.performQuery({
            "WHERE": {
                "GT": {
                    "coursesavgerage": 95  //ERROR HERE wrong key name
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_dept",
                    "courses_avg",
                    "courses_id",
                    "courses_uuid"

                ],
                "ORDER": "courses_title",
                "FORM": "TABLE"
            }
        }).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            //console.log(JSON.stringify(InF));
            expect.fail();
        }).catch(function (err: any) {
            console.log("should have: error: not valid key in query: WHAT IT IS :"+JSON.stringify(err));
        });
    });

    it("wrong key in recursive query from spec", function() {
        //console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {
                "WHERE":{
                    "OR":[
                        {
                            "AND":[
                                {
                                    "GT":{
                                        "courses_dept":90 //wrong key here
                                    }
                                },
                                {
                                    "IS":{
                                        "courses_dept":"adhe"
                                    }
                                },{
                                    "OR":[
                                        {
                                            "AND":[
                                                {
                                                    "GT":{
                                                        "courses_dept":90 //wrong key here
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
                                }
                            ]
                        },
                        {
                            "EQ":{
                                "courses_avg":95
                            }
                        }
                    ]
                }
                ,
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
            expect.fail();
        }).catch(function (err: any) {
            console.log(err);
        });
    });

});