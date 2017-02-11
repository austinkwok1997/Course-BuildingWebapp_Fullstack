import {expect} from "chai";
import {InsightResponse} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";
var fs = require("fs");

describe("PreformQuery AutoBot Simulator:Preload dataStructure", function() {
    this.timeout(5000);

    let facade: any = null;
    let zipContent: any;
    before(function() {
        facade = new InsightFacade();
        console.time("dbsave");
        zipContent = fs.readFileSync("courses.zip").toString("base64");
        facade.addDataset("courses", zipContent).then(function(InF:InsightResponse){
            console.log(InF.code+": "+JSON.stringify(InF.body));
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
    it("Apollo: Should be able to find all sections for a dept.", function() {
        console.log("+++TEST: simple query from spec");
        return facade.performQuery({
            "WHERE": {
            "IS"
        :
            {
                "courses_dept": "chem"
            }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_dept",
                    "courses_avg",
                    "courses_id",
                ],
                "ORDER": "courses_avg",
                "FORM": "TABLE"
            }
        }).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });

    it("Astro: Should be able to find sections taught by a specific person.", function() {
        console.log("+++TEST: MY query 1");
        return facade.performQuery(
            {
                "WHERE": {
                        "IS": {
                            "courses_instructor": "b*"
                        }
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
            console.log(InF['body']);
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });

    it("TODO Aurora: performQuery 424.", function() {
        console.log("+++TEST: MY query 1 from spec");
        return facade.performQuery(
            {
                "WHERE": {
                    "IS": {
                        "foo_instructor": "b*"
                    }
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
            console.log("Aurora: performQuery 424.");
            console.log(InF['body']);
            expect.fail();
        }).catch(function (err: any) {
            console.log(err);
            console.log("Aurora: performQuery 424.");
        });
    });

/*
    it("Revolution: performQuery 400.", function() {
        console.log("+++TEST: simple query from spec");
        return facade.performQuery(
            {
                "WHERE": {

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
            console.log("Revolution: performQuery 400.");
        }).catch(function (err: any) {
            console.log(err);
            console.log("Revolution: performQuery 400.");
            expect.fail();
        });
    });

    it("Barcelona: Invalid query should result in 400.", function() {
        console.log("+++TEST: simple query from spec");
        return facade.performQuery(
            {
                "WHERE":{

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
            console.log("Barcelona: Invalid query should result in 400.");
        }).catch(function (err: any) {
            console.log(err);
            console.log("Barcelona: Invalid query should result in 400.");
            expect.fail();
        });
    });

    it("Barracuda: Invalid query should result in 400.", function() {
        console.log("+++TEST: simple query from spec");
        return facade.performQuery(
            {
                "WHERE":{

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
            console.log("Barracuda: Invalid query should result in 400.");
        }).catch(function (err: any) {
            console.log(err);
            console.log("Barracuda: Invalid query should result in 400.");
            expect.fail();
        });
    });
*/
    it("Bongo: Should be able to find sections with lots of auditors. ", function() {
            console.log("+++TEST: complex query from spec");
            return facade.performQuery(
                {
                    "WHERE": {
                        "GT": {
                            "courses_audit": 5
                        }
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
            console.log(InF['body']);
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });

    it("Colusa: Should be able to find sections with high averages.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {
                "WHERE": {
                    "GT": {
                        "courses_avg": 98
                    }
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
            console.log(InF['body']);
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });

    it("Camelot: Should be able to find course average for a course.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {
                "WHERE": {
                    "EQ": {
                        "courses_avg": 90
                    }
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_dept",
                        "courses_id",
                        "courses_avg"
                    ],
                    "ORDER": "courses_dept",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });

    it("Darwin: Should be able to find course title for courses in a dept.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {
                "WHERE": {
                    "AND":[
                        {"IS": {
                        "courses_title": "int cell bio lab"
                    }},{"IS": {
                            "courses_dept": "biol"
                        }}
                    ]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_dept",
                        "courses_id",
                        "courses_avg"
                    ],
                    "ORDER": "courses_dept",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });

    it("Deepmind: Should be able to find sections ind a dept with average between 70 and 80.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {
                "WHERE": {
                    "AND":[
                        {"GT": {
                            "courses_avg": 70
                        }},{"IS": {
                            "courses_dept": "biol"
                        }},{"LT": {
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
            console.log(InF['body']);
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });

    it("Elixir: Should be able to find sections with an or query on different keys.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {
                "WHERE": {
                    "OR":[
                        {"EQ": {
                            "courses_avg": 70
                        }},{"IS": {
                            "courses_dept": "biol"
                        }},{"LT": {
                            "courses_avg": 20
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
            console.log(InF['body']);
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });

    it("Excalibur: Should be able to find all sections of specific courses from different departments.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {
                "WHERE": {
                    "OR":[
                        {"IS": {
                            "courses_dept": "biol"
                        }},{"IS": {
                            "courses_dept": "chem"
                        }}
                    ]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_dept",
                        "courses_uuid",
                    ],
                    "ORDER": "courses_uuid",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });

    it("Fester: Should be able to find all instructors with the same partial name.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {
                "WHERE": {
                    "IS": {
                            "courses_instructor": "b*"
                        }
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
            console.log(InF['body']);
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });


    it("Fireball: Should be able to find all courses in a dept with a partial name.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {
                "WHERE": {
                    "IS": {
                        "courses_dept": "bi*"
                    }
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_dept",
                        "courses_id",
                        "courses_title"
                    ],
                    "ORDER": "courses_title",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });
    it("Firefly: Should be able to find all instructurs in a dept with a partial name.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {
                "WHERE": {
                    "IS": {
                        "courses_dept": "bi*"
                    }
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_dept",
                        "courses_id",
                        "courses_instructor"
                    ],
                    "ORDER": "courses_instructor",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });

    it("Firestorm: Should be able to find all sections in a dept not taught by a specific person.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {"WHERE":{
                "AND":[
                    {"NOT": {
                        "IS": {
                            "courses_instructor": "zeiler, kathryn"
                        }
                    }},{
                        "IS": {
                            "courses_dept": "biol"
                        }
                    }
                ]}
                ,
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_dept",
                        "courses_uuid",
                        "courses_instructor"
                    ],
                    "ORDER": "courses_uuid",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });

    it("Firetruck: Should be able to find all courses in a dept except some specific examples.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {"WHERE":{
                "AND":[
                    {"NOT": {
                        "IS": {
                            "courses_uuid": "20622"
                        }
                    }},{
                        "IS": {
                            "courses_dept": "biol"
                        }
                    }
                ]}
                ,
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_dept",
                        "courses_uuid",
                        "courses_instructor"
                    ],
                    "ORDER": "courses_uuid",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });

    it("Flamingo: Should be able to find all courses taught by a set of instructors.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {"WHERE":{
                "OR":[
                    {
                        "IS": {
                            "courses_instructor": "*bi*"
                        }
                    },{
                        "IS": {
                            "courses_instructor": "*kat*"
                        }
                    }
                ]}
                ,
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_id",
                        "courses_title",
                        "courses_instructor"
                    ],
                    "ORDER": "courses_instructor",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });

    it("Fusion: Should be able to find all courses in multiple deptartments with a set of instructors.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {"WHERE":{
                "OR":[
                    {
                        "IS": {
                            "courses_dept": "chem"
                        }
                    },{
                        "IS": {
                            "courses_dept": "biol"
                        }
                    }
                ]}
                ,
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_id",
                        "courses_title",
                        "courses_instructor",
                        "courses_dept"
                    ],
                    "ORDER": "courses_title",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });
//******************************************************************************************************************
    it("Galactica: Handle complex AND queries.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {"WHERE":{
                "AND": [{
                    "AND": [{
                        "AND": [{
                            "AND": [{
                                "AND": [{
                                    "GT": {
                                        "courses_avg": 97
                                    }
                                },{
                                    "LT": {
                                        "courses_avg": 98
                                    }
                                }]
                            }]
                        }]
                    }]
                }]
            },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_id",
                        "courses_title",
                        "courses_instructor",
                        "courses_dept"
                    ],
                    "ORDER": "courses_title",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });
    it("Gemini: Handle complex OR queries.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {"WHERE":{
                "OR": [{
                    "OR": [{
                        "OR": [{
                            "OR": [{
                                "OR": [{
                                    "GT": {
                                        "courses_avg": 97
                                    }
                                },{
                                    "LT": {
                                        "courses_avg": 10
                                    }
                                }
                                ]
                            }]
                        }]
                    }]
                }]
            },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_id",
                        "courses_title",
                        "courses_instructor",
                        "courses_dept"
                    ],
                    "ORDER": "courses_title",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });
    //TODO:Glavin: Check that non-integer numbers work.
    //TODO:Hades: Check EQ.
//**************************************************************TESTING FAIL CASES**************************************
    it("Honeycomb: Empty columns result in invalid query 400.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {"WHERE":{
                "OR":[
                    {
                        "IS": {
                            "courses_dept": "chem"
                        }
                    },{
                        "IS": {
                            "courses_dept": "biol"
                        }
                    }
                ]}
                ,
                "OPTIONS": {
                    "COLUMNS": [
                    ],
                    "ORDER": "courses_title",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
            expect.fail();
        }).catch(function (err: any) {
            console.log(err);
        });
    });

    it("Hydra: Missing FORM results in invalid query with 400.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {"WHERE":{
                "OR":[
                    {
                        "IS": {
                            "courses_dept": "chem"
                        }
                    },{
                        "IS": {
                            "courses_dept": "biol"
                        }
                    }
                ]}
                ,
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_id",
                        "courses_title",
                        "courses_instructor",
                        "courses_dept"
                    ],
                    "ORDER": "courses_title",
                    //"FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
            expect.fail();
        }).catch(function (err: any) {
            console.log(err);
        });
    });

    it("Indigo: Handle double negation.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {"WHERE":{
                "NOT": {
                    "NOT": {
                        "GT": {
                            "courses_avg": 97
                        }
                    }
                }
            },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_id",
                        "courses_title",
                        "courses_instructor",
                        "courses_dept"
                    ],
                    "ORDER": "courses_title",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);

        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });
    //TODO JUST A TYPICAL GT???
    it("Irongate: Check GT on number field.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {"WHERE":{
                    "GT": {
                        "courses_avg": ""
                    }
            },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_id",
                        "courses_title",
                        "courses_instructor",
                        "courses_dept"
                    ],
                    "ORDER": "courses_title",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
            expect.fail();
        }).catch(function (err: any) {
            console.log(err);
        });
    });
    //TODO WHAT DOE CHECK MATH OPERATIONS MEAN??
    it("Ivory: Gheck math operations with OR.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {"WHERE":{
                "OR":[
                    {
                        "GT": {
                            "courses_avg": 98
                        }
                    },{
                        "LT": {
                            "courses_avg": 10
                        }
                    }
                ]
            },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_id",
                        "courses_title",
                        "courses_instructor",
                        "courses_dept"
                    ],
                    "ORDER": "courses_id",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);

        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });
//TODO Jade: Complex query with AND, EQ, and GT. (in other query spec tests)


    it("Jaguar: Invalid query should result in 400.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_id",
                        "courses_title",
                        "courses_instructor",
                        "courses_dept"
                    ],
                    "ORDER": "courses_avg",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
            expect.fail();
        }).catch(function (err: any) {
            console.log(err);

        });
    });
    it("Jiro: Invalid ORDER should result in 400.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {"WHERE":{
                "OR":[
                    {
                        "GT": {
                            "courses_avg": 98
                        }
                    },{
                        "LT": {
                            "courses_avg": 10
                        }
                    }
                ]
            },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_id",
                        "courses_title",
                        "courses_instructor",
                        "courses_dept"
                    ],
                    "ORDER": "thstrdshrdhtrdtrdhtrdhrd",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
            expect.fail();
        }).catch(function (err: any) {
            console.log(err);

        });
    });
    it("Jonah: Invalid FORM should result in 400.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {"WHERE":{
                "OR":[
                    {
                        "GT": {
                            "courses_avg": 98
                        }
                    },{
                        "LT": {
                            "courses_avg": 10
                        }
                    }
                ]
            },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_id",
                        "courses_title",
                        "courses_instructor",
                        "courses_dept"
                    ],
                    "ORDER":  "courses_id",
                    "FORM": "WAT"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
            expect.fail();
        }).catch(function (err: any) {
            console.log(err);

        });
    });

    it("Kanga: Invalid key should result in 400.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {"WHERE":{
                "OR":[
                    {
                        "GT": {
                            "tyrdyudrhd": 98
                        }
                    },{
                        "LT": {
                            "fdhggfhgfhf": 10
                        }
                    }
                ]
            },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_id",
                        "courses_title",
                        "courses_instructor",
                        "courses_dept"
                    ],
                    "ORDER":  "courses_id",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
            expect.fail();
        }).catch(function (err: any) {
            console.log(err);

        });
    });
    it("Kodiak: Invalid nested key should result in 400.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {"WHERE":
                    {
                        "GT": {
                            "courses_avg": {"courses_avg": 10}
                        }
                    }
            ,
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_id",
                        "courses_title",
                        "courses_instructor",
                        "courses_dept"
                    ],
                    "ORDER": "courses_id",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
            expect.fail();
        }).catch(function (err: any) {
            console.log(err);

        });
    });

    it("Kryptonite: Invalid EQ should result in 400.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {"WHERE":{
                        "EQ": {
                            "courses_dept": "chem"
                        }
            },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_id",
                        "courses_title",
                        "courses_instructor",
                        "courses_dept"
                    ],
                    "ORDER": "courses_id",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
            expect.fail();
        }).catch(function (err: any) {
            console.log(err);

        });
    });
    it("Kwyjibo: Invalid LT should result in 400.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {"WHERE":
                    {
                        "LT": {
                            "courses_dept": "chem"
                        }
                    }
                ,
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_id",
                        "courses_title",
                        "courses_instructor",
                        "courses_dept"
                    ],
                    "ORDER": "courses_id",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
            expect.fail();
        }).catch(function (err: any) {
            console.log(err);

        });
    });
    it("Laguna: Invalid GT should result in 400.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {"WHERE":
                {
                    "GT": {
                        "courses_dept": "chem"
                    }

                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_id",
                        "courses_title",
                        "courses_instructor",
                        "courses_dept"
                    ],
                    "ORDER": "courses_id",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
            expect.fail();
        }).catch(function (err: any) {
            console.log(err);

        });
    });
    it("Liberation: Invalid IS should result in 400.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {"WHERE":{
                        "IS": {
                            "courses_avg": 98
                        }
            },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_id",
                        "courses_title",
                        "courses_instructor",
                        "courses_dept"
                    ],
                    "ORDER": "courses_id",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
            expect.fail();
        }).catch(function (err: any) {
            console.log(err);

        });
    });
    it("Lorax: Empty AND should result in 400.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {"WHERE":{
                "AND":[
                ]
            },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_id",
                        "courses_title",
                        "courses_instructor",
                        "courses_dept"
                    ],
                    "ORDER": "courses_id",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
            expect.fail();
        }).catch(function (err: any) {
            console.log(err);

        });
    });
    it("Malibu: Empty OR should result in 400.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {"WHERE":{
                "OR":[
                ]
            },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_id",
                        "courses_title",
                        "courses_instructor",
                        "courses_dept"
                    ],
                    "ORDER": "courses_id",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
            expect.fail();
        }).catch(function (err: any) {
            console.log(err);

        });
    });
    it("Mango: Contradictory query should be valid.", function() {
        console.log("+++TEST: complex query from spec");
        return facade.performQuery(
            {"WHERE":{
                "AND":[
                    {
                        "GT": {
                            "courses_avg": 60
                        }
                    },{
                        "LT": {
                            "courses_avg": 40
                        }
                    }
                ]
            },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_id",
                        "courses_title",
                        "courses_instructor",
                        "courses_dept"
                    ],
                    "ORDER": "courses_id",
                    "FORM": "TABLE"
                }
            }
        ).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(InF['body']);
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });

});
