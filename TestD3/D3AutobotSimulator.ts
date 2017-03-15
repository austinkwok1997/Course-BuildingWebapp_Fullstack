/**
 * Created by jacke on 3/8/2017.
 */



import {expect} from "chai";
import {InsightResponse} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";
var fs = require("fs");

describe("D3 AutoBot Sim", function() {
    this.timeout(5000);

    let facade: any = null;
    let zipContentr: any,zipContentc:any;
    before(function() {
        facade = new InsightFacade();
        zipContentc = fs.readFileSync("courses.zip").toString("base64");
        zipContentr = fs.readFileSync("rooms.zip").toString("base64");

    });

    it("Revolution+ Ritchie: Should be able to sort using D3 syntax. + Royal: Apply: MAX should be supported => QUERY A FROM SPEC" , function() {
        return facade.addDataset("rooms", zipContentr).then(function () {
            return facade.performQuery(
                {
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
                }
            ).then(function (InF: InsightResponse) {
//                 console.log(InF.code + ": " + JSON.stringify(InF.body));
//                 let bd:any=InF.body;
//                 expect(bd.result).to.eql([{"rooms_shortname": "OSBO", "maxSeats": 442}, {
//                         "rooms_shortname": "HEBB",
//                         "maxSeats": 375
//                     }, {"rooms_shortname": "LSC", "maxSeats": 350}]
//                 );
                expect(InF['code']).to.eql(200);
            })
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });
    it("Quicksilver: Should be able to get all courses data", function() {
        return facade.addDataset("courses", zipContentc).then(function () {
            return facade.performQuery(
                {
                    "WHERE": {},
                    "OPTIONS": {
                        "COLUMNS": [
                            "courses_dept",
                            "courses_id",
                            "maxAvg"
                        ],
                        "ORDER": {
                            "dir": "DOWN",
                            "keys": ["maxAvg"]
                        },
                        "FORM": "TABLE"
                    },
                    "TRANSFORMATIONS": {
                        "GROUP": ["courses_dept", "courses_id"],
                        "APPLY": [{
                            "maxAvg": {
                                "MAX": "courses_avg"
                            }
                        }]
                    }
                }
            ).then(function (InF: InsightResponse) {
                //console.log(InF.code + ": " + JSON.stringify(InF.body));

                expect(InF['code']).to.eql(200);

            })
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });
    it("Radium: Should be able to get all rooms data", function() {
        return facade.addDataset("rooms", zipContentr).then(function () {
            return facade.performQuery({
                "WHERE": {
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
            }).then(function (InF: InsightResponse) {
//                 console.log(InF.code+": "+JSON.stringify(InF.body));
//                 let bd:any=InF.body;
//                 expect(bd.result).to.eql([{"rooms_shortname":"WOOD","maxSeats":503},{"rooms_shortname":"OSBO","maxSeats":442},{"rooms_shortname":"CIRS","maxSeats":426},{"rooms_shortname":"HEBB","maxSeats":375},{"rooms_shortname":"ESB","maxSeats":350},{"rooms_shortname":"LSC","maxSeats":350},{"rooms_shortname":"WESB","maxSeats":325},{"rooms_shortname":"SRC","maxSeats":299},{"rooms_shortname":"SCRF","maxSeats":280},{"rooms_shortname":"BUCH","maxSeats":275},{"rooms_shortname":"CHEM","maxSeats":265},{"rooms_shortname":"ANGU","maxSeats":260},{"rooms_shortname":"HENN","maxSeats":257},{"rooms_shortname":"FSC","maxSeats":250},{"rooms_shortname":"PHRM","maxSeats":236},{"rooms_shortname":"BIOL","maxSeats":228},{"rooms_shortname":"GEOG","maxSeats":225},{"rooms_shortname":"MATH","maxSeats":224},{"rooms_shortname":"LSK","maxSeats":205},{"rooms_shortname":"MCML","maxSeats":200},{"rooms_shortname":"CHBE","maxSeats":200},{"rooms_shortname":"SWNG","maxSeats":190},{"rooms_shortname":"FRDM","maxSeats":160},{"rooms_shortname":"DMP","maxSeats":160},{"rooms_shortname":"IBLC","maxSeats":154},{"rooms_shortname":"AERL","maxSeats":144},{"rooms_shortname":"MCLD","maxSeats":136},{"rooms_shortname":"MATX","maxSeats":106},{"rooms_shortname":"CEME","maxSeats":100},{"rooms_shortname":"IONA","maxSeats":100},{"rooms_shortname":"FNH","maxSeats":99},{"rooms_shortname":"LASR","maxSeats":94},{"rooms_shortname":"ALRD","maxSeats":94},{"rooms_shortname":"ANSO","maxSeats":90},{"rooms_shortname":"ORCH","maxSeats":72},{"rooms_shortname":"BRKX","maxSeats":70},{"rooms_shortname":"SOWK","maxSeats":68},{"rooms_shortname":"SPPH","maxSeats":66},{"rooms_shortname":"FORW","maxSeats":63},{"rooms_shortname":"UCLL","maxSeats":55},{"rooms_shortname":"EOSM","maxSeats":50},{"rooms_shortname":"MGYM","maxSeats":40},{"rooms_shortname":"PCOH","maxSeats":40},{"rooms_shortname":"AUDX","maxSeats":21}]);
//                 expect(InF['code']).to.eql(200);
            })
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });
    it("Revolution+ Ritchie: Should be able to sort using D3 syntax. + Royal: Apply: MAX should be supported => QUERY A FROM SPEC" , function() {
        return facade.addDataset("rooms", zipContentr).then(function () {
            return facade.performQuery(
                {
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
                }
            ).then(function (InF: InsightResponse) {
//             console.log(InF.code+": "+JSON.stringify(InF.body));
//             let bd:any=InF.body;
//             expect(bd.result).to.eql([{"rooms_shortname":"OSBO","maxSeats":442},{"rooms_shortname":"HEBB","maxSeats":375},{"rooms_shortname":"LSC","maxSeats":350}]);
//             expect(InF['code']).to.eql(200);})
            }).catch(function (err: any) {
                console.log(err);
                expect.fail();
            });
        });
    });
    it("Riviera: Should be able to sort on multiple keys. + Romeo: Should be able to sort on multiple keys in reverse order.+Snacktacular: Empty APPLY should be valid and supported.", function() {
        return facade.addDataset("rooms", zipContentr).then(function () {
            return facade.performQuery(
                {
                    "WHERE": {
                        "AND": [{
                            "IS": {
                                "rooms_furniture": "*Tables*"
                            }
                        }, {
                            "GT": {
                                "rooms_seats": 100
                            }
                        }]
                    },
                    "OPTIONS": {
                        "COLUMNS": [
                            "rooms_shortname",
                            "rooms_furniture",
                            "rooms_seats"
                        ],
                        "ORDER": {
                            "dir": "DOWN",
                            "keys": ["rooms_seats","rooms_shortname"]
                        },
                        "FORM": "TABLE"
                    },
                    "TRANSFORMATIONS": {
                        "GROUP": ["rooms_shortname",
                            "rooms_furniture",
                            "rooms_seats"],
                        "APPLY": []
                    }
                }
            ).then(function (InF: InsightResponse) {
//                 console.log(InF.code+": "+JSON.stringify(InF.body));
//                 let bd:any=InF.body;
//                 expect(bd.result).to.eql([{"rooms_shortname":"OSBO","rooms_furniture":"Classroom-Movable Tables & Chairs","rooms_seats":442},{"rooms_shortname":"HEBB","rooms_furniture":"Classroom-Fixed Tables/Fixed Chairs","rooms_seats":375},{"rooms_shortname":"LSC","rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_seats":350},{"rooms_shortname":"SRC","rooms_furniture":"Classroom-Movable Tables & Chairs","rooms_seats":299},{"rooms_shortname":"ANGU","rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_seats":260},{"rooms_shortname":"PHRM","rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_seats":236},{"rooms_shortname":"LSK","rooms_furniture":"Classroom-Fixed Tables/Fixed Chairs","rooms_seats":205},{"rooms_shortname":"CHBE","rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_seats":200},{"rooms_shortname":"SWNG","rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_seats":190},{"rooms_shortname":"SWNG","rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_seats":188},{"rooms_shortname":"SWNG","rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_seats":187},{"rooms_shortname":"LSK","rooms_furniture":"Classroom-Fixed Tables/Fixed Chairs","rooms_seats":183},{"rooms_shortname":"PHRM","rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_seats":167},{"rooms_shortname":"FRDM","rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_seats":160},{"rooms_shortname":"DMP","rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_seats":160},{"rooms_shortname":"IBLC","rooms_furniture":"Classroom-Fixed Tables/Fixed Chairs","rooms_seats":154},{"rooms_shortname":"MCLD","rooms_furniture":"Classroom-Fixed Tables/Fixed Chairs","rooms_seats":136},{"rooms_shortname":"LSC","rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_seats":125},{"rooms_shortname":"MCLD","rooms_furniture":"Classroom-Fixed Tables/Fixed Chairs","rooms_seats":123},{"rooms_shortname":"WOOD","rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_seats":120},{"rooms_shortname":"DMP","rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_seats":120},{"rooms_shortname":"IBLC","rooms_furniture":"Classroom-Movable Tables & Chairs","rooms_seats":112},{"rooms_shortname":"BUCH","rooms_furniture":"Classroom-Fixed Tables/Fixed Chairs","rooms_seats":108}]);
//                 expect(InF['code']).to.eql(200);
            })
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });
    it("Rutabaga: Apply: MIN should be supported", function() {
        return facade.addDataset("rooms", zipContentr).then(function () {
            return facade.performQuery(
                {
                    "WHERE": {
                        "AND": [{
                            "IS": {
                                "rooms_furniture": "*Tables*"
                            }
                        }, {
                            "GT": {
                                "rooms_seats": 100
                            }
                        }]
                    },
                        "OPTIONS": {
                            "COLUMNS": [
                                "rooms_shortname",
                                "minSeats"
                            ],
                            "ORDER": {
                                "dir": "DOWN",
                                "keys": ["minSeats"]
                            },
                            "FORM": "TABLE"
                        },
                        "TRANSFORMATIONS": {
                            "GROUP": ["rooms_shortname"],
                            "APPLY": [{
                                "minSeats": {
                                    "MIN": "rooms_seats"
                                }
                            }]
                        }
                    }
                ).then(function (InF: InsightResponse) {
//                 console.log(InF.code + ": " + JSON.stringify(InF.body));
//                 let bd:any=InF.body;
//                 expect(bd.result).to.eql([{"rooms_shortname": "OSBO", "minSeats": 442}, {
//                         "rooms_shortname": "HEBB",
//                         "minSeats": 375
//                     }, {"rooms_shortname": "SRC", "minSeats": 299}, {
//                         "rooms_shortname": "ANGU",
//                         "minSeats": 260
//                     }, {"rooms_shortname": "CHBE", "minSeats": 200}, {
//                         "rooms_shortname": "SWNG",
//                         "minSeats": 187
//                     }, {"rooms_shortname": "LSK", "minSeats": 183}, {
//                         "rooms_shortname": "PHRM",
//                         "minSeats": 167
//                     }, {"rooms_shortname": "FRDM", "minSeats": 160}, {
//                         "rooms_shortname": "LSC",
//                         "minSeats": 125
//                     }, {"rooms_shortname": "MCLD", "minSeats": 123}, {
//                         "rooms_shortname": "WOOD",
//                         "minSeats": 120
//                     }, {"rooms_shortname": "DMP", "minSeats": 120}, {
//                         "rooms_shortname": "IBLC",
//                         "minSeats": 112
//                     }, {"rooms_shortname": "BUCH", "minSeats": 108}]
//                 );
                    expect(InF['code']).to.eql(200);
                })
            }).catch(function (err: any) {
                console.log(err);
                expect.fail();
            });
        });
        it("Sahara: Apply: AVG should be supported", function() {
            return facade.addDataset("rooms", zipContentr).then(function () {
                return facade.performQuery(
                    {
                        "WHERE": {
                            "AND": [{
                                "IS": {
                                    "rooms_furniture": "*Tables*"
                                }
                            }, {
                                "GT": {
                                    "rooms_seats": 100
                                }
                            }]
                        },
                        "OPTIONS": {
                            "COLUMNS": [
                                "rooms_shortname",
                                "avgSeats"
                            ],
                            "ORDER": {
                                "dir": "DOWN",
                                "keys": ["avgSeats"]
                            },
                            "FORM": "TABLE"
                        },
                        "TRANSFORMATIONS": {
                            "GROUP": ["rooms_shortname"],
                            "APPLY": [{
                                "avgSeats": {
                                    "AVG": "rooms_seats"
                                }
                            }]
                        }
                    }
                ).then(function (InF: InsightResponse) {
//                 console.log(InF.code + ": " + JSON.stringify(InF.body));
//                 let bd:any=InF.body;
//                 expect(bd.result).to.eql([{"rooms_shortname": "OSBO", "avgSeats": 442}, {
//                         "rooms_shortname": "HEBB",
//                         "avgSeats": 375
//                     }, {"rooms_shortname": "SRC", "avgSeats": 299}, {
//                         "rooms_shortname": "LSC",
//                         "avgSeats": 275
//                     }, {"rooms_shortname": "ANGU", "avgSeats": 260}, {
//                         "rooms_shortname": "PHRM",
//                         "avgSeats": 201.5
//                     }, {"rooms_shortname": "CHBE", "avgSeats": 200}, {
//                         "rooms_shortname": "LSK",
//                         "avgSeats": 194
//                     }, {"rooms_shortname": "SWNG", "avgSeats": 188.75}, {
//                         "rooms_shortname": "FRDM",
//                         "avgSeats": 160
//                     }, {"rooms_shortname": "DMP", "avgSeats": 140}, {
//                         "rooms_shortname": "IBLC",
//                         "avgSeats": 133
//                     }, {"rooms_shortname": "MCLD", "avgSeats": 129.5}, {
//                         "rooms_shortname": "WOOD",
//                         "avgSeats": 120
//                     }, {"rooms_shortname": "BUCH", "avgSeats": 108}]
//                 );
//                 expect(InF['code']).to.eql(200);

                })
            }).catch(function (err: any) {
                console.log(err);
                expect.fail();
            });
        });
        it("Sacrilicious: Apply: SUM should be supported", function() {
            return facade.addDataset("rooms", zipContentr).then(function () {
                return facade.performQuery(
                    {
                        "WHERE": {
                            "AND": [{
                                "IS": {
                                    "rooms_furniture": "*Tables*"
                                }
                            }, {
                                "GT": {
                                    "rooms_seats": 100
                                }
                            }]
                        },
                        "OPTIONS": {
                            "COLUMNS": [
                                "rooms_shortname",
                                "sumSeats"
                            ],
                            "ORDER": {
                                "dir": "DOWN",
                                "keys": ["sumSeats"]
                            },
                            "FORM": "TABLE"
                        },
                        "TRANSFORMATIONS": {
                            "GROUP": ["rooms_shortname"],
                            "APPLY": [{
                                "sumSeats": {
                                    "SUM": "rooms_seats"
                                }
                            }]
                        }
                    }
                ).then(function (InF: InsightResponse) {
//                 console.log(InF.code + ": " + JSON.stringify(InF.body));
//                 let bd:any=InF.body;
//                 expect(bd.result).to.eql([{"rooms_shortname": "SRC", "sumSeats": 897}, {
//                         "rooms_shortname": "LSC",
//                         "sumSeats": 825
//                     }, {"rooms_shortname": "SWNG", "sumSeats": 755}, {
//                         "rooms_shortname": "OSBO",
//                         "sumSeats": 442
//                     }, {"rooms_shortname": "PHRM", "sumSeats": 403}, {
//                         "rooms_shortname": "LSK",
//                         "sumSeats": 388
//                     }, {"rooms_shortname": "HEBB", "sumSeats": 375}, {
//                         "rooms_shortname": "WOOD",
//                         "sumSeats": 360
//                     }, {"rooms_shortname": "DMP", "sumSeats": 280}, {
//                         "rooms_shortname": "IBLC",
//                         "sumSeats": 266
//                     }, {"rooms_shortname": "ANGU", "sumSeats": 260}, {
//                         "rooms_shortname": "MCLD",
//                         "sumSeats": 259
//                     }, {"rooms_shortname": "BUCH", "sumSeats": 216}, {
//                         "rooms_shortname": "CHBE",
//                         "sumSeats": 200
//                     }, {"rooms_shortname": "FRDM", "sumSeats": 160}]
//                 );
                    expect(InF['code']).to.eql(200);
                })
            }).catch(function (err: any) {
                console.log(err);
                expect.fail();
            });
        });
        it("Sagittarius: Apply: COUNT should be supported", function() {
            return facade.addDataset("rooms", zipContentr).then(function () {
                return facade.performQuery(
                    {
                        "WHERE": {
                            "AND": [{
                                "IS": {
                                    "rooms_furniture": "*Tables*"
                                }
                            }, {
                                "GT": {
                                    "rooms_seats": 100
                                }
                            }]
                        },
                        "OPTIONS": {
                            "COLUMNS": [
                                "rooms_shortname",
                                "countSeats"
                            ],
                            "ORDER": {
                                "dir": "DOWN",
                                "keys": ["countSeats"]
                            },
                            "FORM": "TABLE"
                        },
                        "TRANSFORMATIONS": {
                            "GROUP": ["rooms_shortname"],
                            "APPLY": [{
                                "countSeats": {
                                    "COUNT": "rooms_seats"
                                }
                            }]
                        }
                    }
                ).then(function (InF: InsightResponse) {
//                 console.log(InF.code + ": " + JSON.stringify(InF.body));
//                 let bd:any=InF.body;
//                 expect(bd.result).to.eql([{"rooms_shortname": "SWNG", "countSeats": 3}, {
//                         "rooms_shortname": "LSK",
//                         "countSeats": 2
//                     }, {"rooms_shortname": "PHRM", "countSeats": 2}, {
//                         "rooms_shortname": "MCLD",
//                         "countSeats": 2
//                     }, {"rooms_shortname": "LSC", "countSeats": 2}, {
//                         "rooms_shortname": "DMP",
//                         "countSeats": 2
//                     }, {"rooms_shortname": "IBLC", "countSeats": 2}, {
//                         "rooms_shortname": "ANGU",
//                         "countSeats": 1
//                     }, {"rooms_shortname": "HEBB", "countSeats": 1}, {
//                         "rooms_shortname": "FRDM",
//                         "countSeats": 1
//                     }, {"rooms_shortname": "CHBE", "countSeats": 1}, {
//                         "rooms_shortname": "OSBO",
//                         "countSeats": 1
//                     }, {"rooms_shortname": "SRC", "countSeats": 1}, {
//                         "rooms_shortname": "BUCH",
//                         "countSeats": 1
//                     }, {"rooms_shortname": "WOOD", "countSeats": 1}]
//                 );
                    expect(InF['code']).to.eql(200);
                })
            }).catch(function (err: any) {
                console.log(err);
                expect.fail();
            });
        });
        //RUN TEST SUIT d1 and d2
        //Sirius: D1/D2 style sorting should be supported.
        it("deliverable 1st test", function () {

            var thisIsIt = facade;

            return facade.addDataset("rooms", zipContentr).then(function () {
                return facade.performQuery({
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
                }).then(function (InF: InsightResponse) {
                    //var t=JSON.parse(JSON.stringify(InF.body));
                    //console.log(JSON.stringify(InF.body));
                })
            }).catch(function (err: any) {
                console.log(err);
                expect.fail();
            });
            //return;
        });
        it("deliverable 2nd test", function () {
            var thisIsIt = facade;

            return facade.addDataset("rooms", zipContentr).then(function () {
                return facade.performQuery({
                    "WHERE": {
                        "IS": {
                            "rooms_address": "*Agrono*"
                        }
                    },
                    "OPTIONS": {
                        "COLUMNS": [
                            "rooms_address", "rooms_name"
                        ],
                        "FORM": "TABLE"
                    }
                }).then(function (InF: InsightResponse) {
                    //var t=JSON.parse(JSON.stringify(InF.body));
                    // console.log(JSON.stringify(InF.body));
                })
            }).catch(function (err: any) {
                console.log(err);
                expect.fail();
            });
            //return;
        });


        it("Stringer: Should be able to query with many APPLY keys and sort over them.+Stratos: Should be able to query with many APPLY keys.+SteamedHam: Should be able to query with more than one APPLY key.", function() {
            return facade.addDataset("rooms", zipContentr).then(function () {
                return facade.performQuery(
                    {
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
                                "maxSeats",
                                "minSeats",
                                "avgSeats"
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
                                }},
                                {"minSeats": {
                                    "MIN": "rooms_seats"
                                }},
                                {"avgSeats": {
                                    "AVG": "rooms_seats"
                                }}
                            ]
                        }
                    }
                ).then(function (InF: InsightResponse) {
                    // console.log(InF.code + ": " + JSON.stringify(InF.body));

                    expect(InF['code']).to.eql(200);
                })
            }).catch(function (err: any) {
                console.log(err);
                expect.fail();
            });
        });
        it("Taurus: Should be able to find the average of all courses within a department", function() {
            return facade.addDataset("courses", zipContentc).then(function () {
                return facade.performQuery(
                    {
                        "WHERE": {
                        },
                        "OPTIONS": {
                            "COLUMNS": [
                                "courses_dept",
                                "avgGrade"
                            ],
                            "ORDER": "courses_dept",
                            "FORM": "TABLE"
                        },
                        "TRANSFORMATIONS": {
                            "GROUP": ["courses_dept"],
                            "APPLY": [{
                                "avgGrade": {
                                    "AVG": "courses_avg"
                                }
                            }]
                        }
                    }
                ).then(function (InF: InsightResponse) {
//                 console.log(InF.code + ": " + JSON.stringify(InF.body));
//                 let bd:any=InF.body;
//                 expect(bd.result).to.eql([{"courses_dept": "aanb", "avgGrade": 91.1}, {
//                         "courses_dept": "adhe",
//                         "avgGrade": 82.94
//                     }, {"courses_dept": "anat", "avgGrade": 84.9}, {
//                         "courses_dept": "anth",
//                         "avgGrade": 77.56
//                     }, {"courses_dept": "apbi", "avgGrade": 77.62}, {
//                         "courses_dept": "appp",
//                         "avgGrade": 80.7
//                     }, {"courses_dept": "apsc", "avgGrade": 76.63}, {
//                         "courses_dept": "arbc",
//                         "avgGrade": 80.09
//                     }, {"courses_dept": "arch", "avgGrade": 81.24}, {
//                         "courses_dept": "arcl",
//                         "avgGrade": 73.32
//                     }, {"courses_dept": "arst", "avgGrade": 84.49}, {
//                         "courses_dept": "arth",
//                         "avgGrade": 77.87
//                     }, {"courses_dept": "asia", "avgGrade": 74.54}, {
//                         "courses_dept": "asic",
//                         "avgGrade": 76.94
//                     }, {"courses_dept": "astr", "avgGrade": 76.37}, {
//                         "courses_dept": "astu",
//                         "avgGrade": 72.27
//                     }, {"courses_dept": "atsc", "avgGrade": 81.27}, {
//                         "courses_dept": "audi",
//                         "avgGrade": 86.35
//                     }, {"courses_dept": "ba", "avgGrade": 82.02}, {
//                         "courses_dept": "baac",
//                         "avgGrade": 80.27
//                     }, {"courses_dept": "babs", "avgGrade": 82.46}, {
//                         "courses_dept": "baen",
//                         "avgGrade": 82.55
//                     }, {"courses_dept": "bafi", "avgGrade": 82.79}, {
//                         "courses_dept": "bahr",
//                         "avgGrade": 81.35
//                     }, {"courses_dept": "bait", "avgGrade": 83.04}, {
//                         "courses_dept": "bala",
//                         "avgGrade": 77.05
//                     }, {"courses_dept": "bama", "avgGrade": 81.92}, {
//                         "courses_dept": "bams",
//                         "avgGrade": 82.78
//                     }, {"courses_dept": "bapa", "avgGrade": 81.41}, {
//                         "courses_dept": "basc",
//                         "avgGrade": 81.25
//                     }, {"courses_dept": "basm", "avgGrade": 82.55}, {
//                         "courses_dept": "baul",
//                         "avgGrade": 82.68
//                     }, {"courses_dept": "bioc", "avgGrade": 77.9}, {
//                         "courses_dept": "biof",
//                         "avgGrade": 89.77
//                     }, {"courses_dept": "biol", "avgGrade": 76}, {
//                         "courses_dept": "bmeg",
//                         "avgGrade": 84.84
//                     }, {"courses_dept": "bota", "avgGrade": 87.41}, {
//                         "courses_dept": "busi",
//                         "avgGrade": 70.64
//                     }, {"courses_dept": "caps", "avgGrade": 81.16}, {
//                         "courses_dept": "ccst",
//                         "avgGrade": 85.77
//                     }, {"courses_dept": "ceen", "avgGrade": 84.25}, {
//                         "courses_dept": "cell",
//                         "avgGrade": 89.15
//                     }, {"courses_dept": "cens", "avgGrade": 79.49}, {
//                         "courses_dept": "chbe",
//                         "avgGrade": 79.06
//                     }, {"courses_dept": "chem", "avgGrade": 74.29}, {
//                         "courses_dept": "chil",
//                         "avgGrade": 88.93
//                     }, {"courses_dept": "chin", "avgGrade": 76.46}, {
//                         "courses_dept": "cics",
//                         "avgGrade": 82.56
//                     }, {"courses_dept": "civl", "avgGrade": 79.96}, {
//                         "courses_dept": "clch",
//                         "avgGrade": 75.84
//                     }, {"courses_dept": "clst", "avgGrade": 74.32}, {
//                         "courses_dept": "cnps",
//                         "avgGrade": 87.04
//                     }, {"courses_dept": "cnrs", "avgGrade": 78.68}, {
//                         "courses_dept": "cnto",
//                         "avgGrade": 86.54
//                     }, {"courses_dept": "coec", "avgGrade": 77.54}, {
//                         "courses_dept": "cogs",
//                         "avgGrade": 77.07
//                     }, {"courses_dept": "cohr", "avgGrade": 79.08}, {
//                         "courses_dept": "comm",
//                         "avgGrade": 76.36
//                     }, {"courses_dept": "cons", "avgGrade": 77.98}, {
//                         "courses_dept": "cpen",
//                         "avgGrade": 77.94
//                     }, {"courses_dept": "cpsc", "avgGrade": 77.58}, {
//                         "courses_dept": "crwr",
//                         "avgGrade": 83.1
//                     }, {"courses_dept": "dani", "avgGrade": 83.57}, {
//                         "courses_dept": "dent",
//                         "avgGrade": 84.32
//                     }, {"courses_dept": "dhyg", "avgGrade": 81.28}, {
//                         "courses_dept": "eced",
//                         "avgGrade": 84.88
//                     }, {"courses_dept": "econ", "avgGrade": 76.4}, {
//                         "courses_dept": "edcp",
//                         "avgGrade": 88.39
//                     }, {"courses_dept": "edst", "avgGrade": 87.62}, {
//                         "courses_dept": "educ",
//                         "avgGrade": 83.72
//                     }, {"courses_dept": "eece", "avgGrade": 85.4}, {
//                         "courses_dept": "elec",
//                         "avgGrade": 75.8
//                     }, {"courses_dept": "ends", "avgGrade": 80.61}, {
//                         "courses_dept": "engl",
//                         "avgGrade": 73.97
//                     }, {"courses_dept": "enph", "avgGrade": 78.99}, {
//                         "courses_dept": "envr",
//                         "avgGrade": 81.7
//                     }, {"courses_dept": "eosc", "avgGrade": 77.75}, {
//                         "courses_dept": "epse",
//                         "avgGrade": 89.94
//                     }, {"courses_dept": "etec", "avgGrade": 89.05}, {
//                         "courses_dept": "fhis",
//                         "avgGrade": 77.75
//                     }, {"courses_dept": "fipr", "avgGrade": 82.15}, {
//                         "courses_dept": "fish",
//                         "avgGrade": 87.65
//                     }, {"courses_dept": "fist", "avgGrade": 75.93}, {
//                         "courses_dept": "fmst",
//                         "avgGrade": 72.76
//                     }, {"courses_dept": "fnel", "avgGrade": 81.05}, {
//                         "courses_dept": "fnh",
//                         "avgGrade": 78.28
//                     }, {"courses_dept": "fnis", "avgGrade": 77.73}, {
//                         "courses_dept": "food",
//                         "avgGrade": 81.68
//                     }, {"courses_dept": "fopr", "avgGrade": 75.2}, {
//                         "courses_dept": "fre",
//                         "avgGrade": 77.27
//                     }, {"courses_dept": "fren", "avgGrade": 73.66}, {
//                         "courses_dept": "frst",
//                         "avgGrade": 78.13
//                     }, {"courses_dept": "gbpr", "avgGrade": 84.9}, {
//                         "courses_dept": "geob",
//                         "avgGrade": 73.56
//                     }, {"courses_dept": "geog", "avgGrade": 74.54}, {
//                         "courses_dept": "germ",
//                         "avgGrade": 79.7
//                     }, {"courses_dept": "gpp", "avgGrade": 84.89}, {
//                         "courses_dept": "grek",
//                         "avgGrade": 78.97
//                     }, {"courses_dept": "grsj", "avgGrade": 79.74}, {
//                         "courses_dept": "gsat",
//                         "avgGrade": 87.83
//                     }, {"courses_dept": "hebr", "avgGrade": 77.76}, {
//                         "courses_dept": "hgse",
//                         "avgGrade": 86.23
//                     }, {"courses_dept": "hinu", "avgGrade": 84.28}, {
//                         "courses_dept": "hist",
//                         "avgGrade": 74.06
//                     }, {"courses_dept": "hunu", "avgGrade": 86.47}, {
//                         "courses_dept": "iar",
//                         "avgGrade": 84.6
//                     }, {"courses_dept": "igen", "avgGrade": 79.87}, {
//                         "courses_dept": "info",
//                         "avgGrade": 85.4
//                     }, {"courses_dept": "isci", "avgGrade": 81.65}, {
//                         "courses_dept": "ital",
//                         "avgGrade": 74.71
//                     }, {"courses_dept": "itst", "avgGrade": 76.26}, {
//                         "courses_dept": "iwme",
//                         "avgGrade": 84
//                     }, {"courses_dept": "japn", "avgGrade": 73.19}, {
//                         "courses_dept": "jrnl",
//                         "avgGrade": 84.93
//                     }, {"courses_dept": "kin", "avgGrade": 79.33}, {
//                         "courses_dept": "korn",
//                         "avgGrade": 76.35
//                     }, {"courses_dept": "lais", "avgGrade": 86.5}, {
//                         "courses_dept": "larc",
//                         "avgGrade": 82.51
//                     }, {"courses_dept": "laso", "avgGrade": 73.51}, {
//                         "courses_dept": "last",
//                         "avgGrade": 75.47
//                     }, {"courses_dept": "latn", "avgGrade": 74.88}, {
//                         "courses_dept": "law",
//                         "avgGrade": 76.22
//                     }, {"courses_dept": "lfs", "avgGrade": 78.42}, {
//                         "courses_dept": "libe",
//                         "avgGrade": 85.08
//                     }, {"courses_dept": "libr", "avgGrade": 84.74}, {
//                         "courses_dept": "ling",
//                         "avgGrade": 78.84
//                     }, {"courses_dept": "lled", "avgGrade": 78.39}, {
//                         "courses_dept": "math",
//                         "avgGrade": 72.03
//                     }, {"courses_dept": "mdvl", "avgGrade": 74.89}, {
//                         "courses_dept": "mech",
//                         "avgGrade": 79.01
//                     }, {"courses_dept": "medg", "avgGrade": 84.23}, {
//                         "courses_dept": "medi",
//                         "avgGrade": 87.41
//                     }, {"courses_dept": "micb", "avgGrade": 79.53}, {
//                         "courses_dept": "midw",
//                         "avgGrade": 86.93
//                     }, {"courses_dept": "mine", "avgGrade": 79.77}, {
//                         "courses_dept": "mrne",
//                         "avgGrade": 84.41
//                     }, {"courses_dept": "mtrl", "avgGrade": 75.94}, {
//                         "courses_dept": "musc",
//                         "avgGrade": 80
//                     }, {"courses_dept": "name", "avgGrade": 84.63}, {
//                         "courses_dept": "nest",
//                         "avgGrade": 74.19
//                     }, {"courses_dept": "nrsc", "avgGrade": 84.21}, {
//                         "courses_dept": "nurs",
//                         "avgGrade": 84.53
//                     }, {"courses_dept": "obst", "avgGrade": 85.36}, {
//                         "courses_dept": "onco",
//                         "avgGrade": 89.82
//                     }, {"courses_dept": "path", "avgGrade": 83.23}, {
//                         "courses_dept": "pcth",
//                         "avgGrade": 84.96
//                     }, {"courses_dept": "pers", "avgGrade": 82.01}, {
//                         "courses_dept": "phar",
//                         "avgGrade": 81.66
//                     }, {"courses_dept": "phil", "avgGrade": 72.58}, {
//                         "courses_dept": "phrm",
//                         "avgGrade": 84.25
//                     }, {"courses_dept": "phth", "avgGrade": 86.59}, {
//                         "courses_dept": "phys",
//                         "avgGrade": 78.21
//                     }, {"courses_dept": "plan", "avgGrade": 87.67}, {
//                         "courses_dept": "poli",
//                         "avgGrade": 74.32
//                     }, {"courses_dept": "pols", "avgGrade": 81.32}, {
//                         "courses_dept": "port",
//                         "avgGrade": 79.99
//                     }, {"courses_dept": "psyc", "avgGrade": 72.59}, {
//                         "courses_dept": "punj",
//                         "avgGrade": 81
//                     }, {"courses_dept": "relg", "avgGrade": 76.71}, {
//                         "courses_dept": "rgla",
//                         "avgGrade": 77.64
//                     }, {"courses_dept": "rhsc", "avgGrade": 85.99}, {
//                         "courses_dept": "rmes",
//                         "avgGrade": 83.86
//                     }, {"courses_dept": "rmst", "avgGrade": 69.92}, {
//                         "courses_dept": "rsot",
//                         "avgGrade": 85.28
//                     }, {"courses_dept": "russ", "avgGrade": 81.52}, {
//                         "courses_dept": "sans",
//                         "avgGrade": 84.92
//                     }, {"courses_dept": "scan", "avgGrade": 81.12}, {
//                         "courses_dept": "scie",
//                         "avgGrade": 75.19
//                     }, {"courses_dept": "soci", "avgGrade": 76.47}, {
//                         "courses_dept": "soil",
//                         "avgGrade": 82.38
//                     }, {"courses_dept": "sowk", "avgGrade": 84.77}, {
//                         "courses_dept": "span",
//                         "avgGrade": 74.35
//                     }, {"courses_dept": "spha", "avgGrade": 82.5}, {
//                         "courses_dept": "spph",
//                         "avgGrade": 86.36
//                     }, {"courses_dept": "stat", "avgGrade": 75.75}, {
//                         "courses_dept": "sts",
//                         "avgGrade": 87.25
//                     }, {"courses_dept": "surg", "avgGrade": 82.43}, {
//                         "courses_dept": "swed",
//                         "avgGrade": 81.58
//                     }, {"courses_dept": "test", "avgGrade": 60}, {
//                         "courses_dept": "thtr",
//                         "avgGrade": 82.81
//                     }, {"courses_dept": "udes", "avgGrade": 84.97}, {
//                         "courses_dept": "ufor",
//                         "avgGrade": 81.5
//                     }, {"courses_dept": "urst", "avgGrade": 78.09}, {
//                         "courses_dept": "ursy",
//                         "avgGrade": 80.35
//                     }, {"courses_dept": "vant", "avgGrade": 68.31}, {
//                         "courses_dept": "visa",
//                         "avgGrade": 76.93
//                     }, {"courses_dept": "wood", "avgGrade": 75.36}, {
//                         "courses_dept": "wrds",
//                         "avgGrade": 70.29
//                     }, {"courses_dept": "zool", "avgGrade": 89}]
//                 );
                    expect(InF['code']).to.eql(200);
                })
            }).catch(function (err: any) {
                console.log(err);
                expect.fail();
            });
        });
        //CAREFUL THERE IS A ROOMS-TYPE WITH NULLSTRING FOR Tin TEST
        it("Tin: Should be able to find the total seats of each different room type", function() {
            return facade.addDataset("rooms", zipContentr).then(function () {
                return facade.performQuery(
                    {
                        "WHERE": {
                        },
                        "OPTIONS": {
                            "COLUMNS": [
                                "rooms_type",
                                "totSeat"
                            ],
                            "ORDER": "totSeat",
                            "FORM": "TABLE"
                        },
                        "TRANSFORMATIONS": {
                            "GROUP": ["rooms_type"],
                            "APPLY": [{
                                "totSeat": {
                                    "SUM": "rooms_seats"
                                }
                            }]
                        }
                    }
                ).then(function (InF: InsightResponse) {
//                 console.log(InF.code + ": " + JSON.stringify(InF.body));
//                 let bd:any=InF.body;
//                 expect(bd.result).to.eql([{"rooms_type": "", "totSeat": 60}, {
//                         "rooms_type": "Studio Lab",
//                         "totSeat": 150
//                     }, {"rooms_type": "Active Learning", "totSeat": 272}, {
//                         "rooms_type": "TBD",
//                         "totSeat": 929
//                     }, {"rooms_type": "Case Style", "totSeat": 1525}, {
//                         "rooms_type": "Small Group",
//                         "totSeat": 3752
//                     }, {"rooms_type": "Open Design General Purpose", "totSeat": 4475}, {
//                         "rooms_type": "Tiered Large Group",
//                         "totSeat": 12306
//                     }]
//                 );
                    expect(InF['code']).to.eql(200);
                })
            }).catch(function (err: any) {
                console.log(err);
                expect.fail();
            });
        });
        it("Titanium: Should be able to find the number of unique instructors that have taught each course, sorted", function() {
            return facade.addDataset("courses", zipContentc).then(function () {
                return facade.performQuery(
                    {
                        "WHERE": {
                            "GT":{
                                "courses_avg":97
                            }
                        },
                        "OPTIONS": {
                            "COLUMNS": [
                                "courses_dept",
                                "courses_id",
                                "numUniqueTeachersThatTaughtTheCourse"
                            ],
                            "ORDER": "courses_dept",
                            "FORM": "TABLE"
                        },
                        "TRANSFORMATIONS": {
                            "GROUP": ["courses_dept","courses_id"],
                            "APPLY": [{
                                "numUniqueTeachersThatTaughtTheCourse": {
                                    "COUNT": "courses_instructor"
                                }
                            }]
                        }
                    }
                ).then(function (InF: InsightResponse) {
//                 console.log(InF.code + ": " + JSON.stringify(InF.body));
//                 let bd:any=InF.body;
//                 expect(bd.result).to.eql([{
//                         "courses_dept": "cnps",
//                         "courses_id": "574",
//                         "numUniqueTeachersThatTaughtTheCourse": 3
//                     }, {
//                         "courses_dept": "crwr",
//                         "courses_id": "599",
//                         "numUniqueTeachersThatTaughtTheCourse": 2
//                     }, {
//                         "courses_dept": "educ",
//                         "courses_id": "500",
//                         "numUniqueTeachersThatTaughtTheCourse": 1
//                     }, {
//                         "courses_dept": "eece",
//                         "courses_id": "541",
//                         "numUniqueTeachersThatTaughtTheCourse": 2
//                     }, {
//                         "courses_dept": "epse",
//                         "courses_id": "421",
//                         "numUniqueTeachersThatTaughtTheCourse": 2
//                     }, {
//                         "courses_dept": "epse",
//                         "courses_id": "449",
//                         "numUniqueTeachersThatTaughtTheCourse": 3
//                     }, {
//                         "courses_dept": "epse",
//                         "courses_id": "519",
//                         "numUniqueTeachersThatTaughtTheCourse": 2
//                     }, {
//                         "courses_dept": "epse",
//                         "courses_id": "534",
//                         "numUniqueTeachersThatTaughtTheCourse": 2
//                     }, {
//                         "courses_dept": "epse",
//                         "courses_id": "549",
//                         "numUniqueTeachersThatTaughtTheCourse": 1
//                     }, {
//                         "courses_dept": "epse",
//                         "courses_id": "596",
//                         "numUniqueTeachersThatTaughtTheCourse": 2
//                     }, {
//                         "courses_dept": "epse",
//                         "courses_id": "606",
//                         "numUniqueTeachersThatTaughtTheCourse": 1
//                     }, {
//                         "courses_dept": "math",
//                         "courses_id": "525",
//                         "numUniqueTeachersThatTaughtTheCourse": 2
//                     }, {
//                         "courses_dept": "math",
//                         "courses_id": "527",
//                         "numUniqueTeachersThatTaughtTheCourse": 2
//                     }, {
//                         "courses_dept": "math",
//                         "courses_id": "532",
//                         "numUniqueTeachersThatTaughtTheCourse": 2
//                     }, {
//                         "courses_dept": "math",
//                         "courses_id": "541",
//                         "numUniqueTeachersThatTaughtTheCourse": 2
//                     }, {
//                         "courses_dept": "nurs",
//                         "courses_id": "509",
//                         "numUniqueTeachersThatTaughtTheCourse": 3
//                     }, {
//                         "courses_dept": "nurs",
//                         "courses_id": "578",
//                         "numUniqueTeachersThatTaughtTheCourse": 2
//                     }, {
//                         "courses_dept": "nurs",
//                         "courses_id": "591",
//                         "numUniqueTeachersThatTaughtTheCourse": 2
//                     }, {"courses_dept": "spph", "courses_id": "300", "numUniqueTeachersThatTaughtTheCourse": 2}]
//                 );
                    expect(InF['code']).to.eql(200);
                })
            }).catch(function (err: any) {
                console.log(err);
                expect.fail();
            });
        });
        //TODO ??? "Tomacco: Should be able to perform a valid query, even if it makes no sense"
        //TODO ??? Virgo: Deeply nested query should be supported.
        //INHERINTLY TESTED TESTS
//     Tungsten: Valid query (keys) should result in 200.
//     Turing: Valid query (values) should result in 200.
//     Unpossible: APPLY should be supported.
//     Vanadium: Sorting should be supported.
//     Voyager: Should be able to query with group and apply.
//     Vulcan: Should be able to order with multiple keys.\
    });



