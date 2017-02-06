
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";
var fs = require("fs");

describe("querySpec", function() {
    this.timeout(5000);

    let facade: any = null;
    let zipContent: any;
    before(function() {
        facade = new InsightFacade();
    });
    beforeEach(function() {
        facade = new InsightFacade();
        try {
            //facade.removeAllDataset();
        }catch(err){
            console.log("remove datraset error: " +err);
        }
    });
    afterEach(function() {
       facade = null;
    });

    it("simple query from spec", function() {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("courses.zip").toString("base64");
        var thisIsIt=facade;

        thisIsIt.addDataset("courses", zipContent).then(function() {
           return thisIsIt.performQuery({
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
                console.log(JSON.stringify(InF.body));
            })
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
        //return;
    });

    it("query from piazza", function() {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("courses.zip").toString("base64");
        var thisIsIt=facade;

        thisIsIt.addDataset("courses", zipContent).then(function() {
            return thisIsIt.performQuery(
                {
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
                }
            ).then(function (InF: InsightResponse) {
                //var t=JSON.parse(JSON.stringify(InF.body));
                console.log(JSON.stringify(InF));
            })
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
        //return;
    });

    it("MY query TEST TERMINAL OPTION: IS", function() {
        console.log("+++TEST: MY query 1 from spec");
        facade = new InsightFacade();
        zipContent = fs.readFileSync("oneJsonTest.zip").toString("base64");
        facade.addDataset("oneJsonTest", zipContent).then(function() {
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
                console.log(JSON.stringify(InF));
            })
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });
//TODO ERROR...
    it("MY query TEST 1", function() {
        console.log("+++TEST: MY query 1 from spec");
        console.time("timer");
        zipContent = fs.readFileSync("coursesFewJson.zip").toString("base64");
        facade.addDataset("coursesFewJson", zipContent).then(function() {
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
                console.timeEnd("timer");
                console.time("dbsave");
                console.log(JSON.stringify(InF));
                console.timeEnd("dbsave");
            })
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });

    it("MY query TEST 2", function() {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("oneJsonTest.zip").toString("base64");
        var thisIsIt=facade;

        thisIsIt.addDataset("oneJsonTest", zipContent).then(function() {
            return thisIsIt.performQuery(
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
                    "ORDER": "courses_dept",
                    "FORM": "TABLE"
                }
            }
            ).then(function (InF: InsightResponse) {
                //var t=JSON.parse(JSON.stringify(InF.body));
                console.log(JSON.stringify(InF));
            })
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
        //return;
    });

    it("MY query TEST 3", function() {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("oneJsonTest.zip").toString("base64");
        var thisIsIt=facade;

        thisIsIt.addDataset("oneJsonTest", zipContent).then(function() {
            return thisIsIt.performQuery(
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
                console.log(JSON.stringify(InF));
            })
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
        //return;
    });

    it("complex query from spec", function() {
        console.log("+++TEST: complex query from spec");
        zipContent = fs.readFileSync("courses.zip").toString("base64");
        facade.addDataset("courses", zipContent).then(function() {
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
                            "courses_avg",
                            "courses_uuid"
                        ],
                        "ORDER":"courses_dept",
                        "FORM":"TABLE"
                    }
                }
        ).then(function (InF: InsightResponse) {
                //var t=JSON.parse(JSON.stringify(InF.body));
                console.log(JSON.stringify(InF));
            })
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });

});
