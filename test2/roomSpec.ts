/**
 * Created by Austin on 2017-02-15.
 */
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";
var fs = require('fs');

describe("roomSpec", function () {
    this.timeout(15000);
    let facade: any = null;
    let zipContent: any;
    before(function () {
        //zipContent = fs.readFileSync("courses.zip").toString("base64");
        facade = new InsightFacade();
    });
    it("test with nothing in dataset", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;

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
        }).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(JSON.stringify(InF.body));
            expect.fail();
        })
            .catch(function (err: any) {
                console.log(err);
            });
        //return;
    });

    it("testing room zip", function () {
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        return facade.addDataset("rooms", zipContent).then(function (InF: InsightResponse) {
            var t = JSON.stringify(InF.body);
            console.log(InF.code + t);
            console.log(" this is what dataStructure looks like right now: " + JSON.stringify(facade.getDataStructure()));
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });
    it("testing remove room zip", function () {
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        return facade.removeDataset("rooms", zipContent).then(function (InF: InsightResponse) {
            var t = JSON.stringify(InF.body);
            console.log(InF.code + t);
            console.log(" this is what dataStructure looks like right now: " + JSON.stringify(facade.getDataStructure()));
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
    });
    it("test after removing dataset", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;

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
        }).then(function (InF: InsightResponse) {
            //var t=JSON.parse(JSON.stringify(InF.body));
            console.log(JSON.stringify(InF.body));
            expect.fail();
        })
            .catch(function (err: any) {
                console.log(err);
            });
        //return;
    });
    it("deliverable 1st test", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("rooms", zipContent).then(function () {
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
                console.log(JSON.stringify(InF.body));
            })
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
        //return;
    });
    it("deliverable 2nd test", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("rooms", zipContent).then(function () {
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
                console.log(JSON.stringify(InF.body));
            })
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
        //return;
    });
    it("AND and OR", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("rooms", zipContent).then(function () {
            return facade.performQuery({
                "WHERE": {
                    "AND": [{
                        "GT": {"rooms_seats": 15}
                    },
                        {
                            "OR": [
                                {"IS": {"rooms_name": "DMP_*"}},
                                {"IS": {"rooms_name": "ORCH_*"}}
                            ]
                        }
                    ]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_name",
                        "rooms_seats"
                    ],
                    "ORDER": "rooms_name",
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
    it("lat lon get address", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("rooms", zipContent).then(function () {
            return facade.performQuery({
                "WHERE": {
                    "AND": [
                        {
                            "EQ": {
                                "rooms_lat": 49.26125
                            }
                        },
                        {
                            "EQ": {
                                "rooms_lon": -123.24807
                            }
                        }
                    ]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_address"
                    ],
                    "ORDER": "rooms_address",
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
    it("address get lat lon", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("rooms", zipContent).then(function () {
            return facade.performQuery({
                "WHERE": {
                    "IS": {"rooms_address": "6245 Agronomy Road V6T 1Z4"}
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_lat",
                        "rooms_lon"
                    ],
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
    it("testing courses year", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("courses.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("courses", zipContent).then(function () {
            return facade.performQuery({
                "WHERE": {
                    "EQ": {
                        "courses_year": 2012
                    }
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_dept"
                    ],
                    "ORDER": "courses_dept",
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
    it("testing tables", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("rooms", zipContent).then(function () {
            return facade.performQuery({
                "WHERE": {
                    "IS": {
                        "rooms_furniture": "*Tables*"
                    }
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_name",
                        "rooms_furniture"
                    ],
                    "ORDER": "rooms_name",
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
    it("testing full name", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("rooms", zipContent).then(function () {
            return facade.performQuery({
                "WHERE": {
                    "IS": {
                        "rooms_fullname": "Hugh Dempster Pavilion"
                    }
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_name",
                    ],
                    "ORDER": "rooms_name",
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
    it("testing searching for partial href", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("rooms", zipContent).then(function () {
            return facade.performQuery({
                "WHERE": {
                    "IS": {
                        "rooms_href": "*DMP-101"
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
                console.log(JSON.stringify(InF.body));
            })
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
        //return;
    });
    it("testing listing href", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("rooms", zipContent).then(function () {
            return facade.performQuery({
                "WHERE": {
                    "IS": {
                        "rooms_name": "DMP_*"
                    }
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_href"
                    ],
                    "ORDER": "rooms_href",
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
    it("testing with type", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("rooms", zipContent).then(function () {
            return facade.performQuery({
                "WHERE": {
                    "AND": [
                        {
                            "IS": {
                                "rooms_type": "*Group*"
                            }

                        },
                        {
                            "GT": {
                                "rooms_seats": 20
                            }
                        }
                    ]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_name",
                        "rooms_type"
                    ],
                    "ORDER": "rooms_name",
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
    it("test with multiple keys", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("rooms", zipContent).then(function () {
            return facade.performQuery({
                "WHERE": {
                    "IS": {
                        "rooms_name": "DMP_*"
                    }
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_name",
                        "courses_year"
                    ],
                    "ORDER": "rooms_name",
                    "FORM": "TABLE"
                }
            }).then(function (InF: InsightResponse) {
                //var t=JSON.parse(JSON.stringify(InF.body));
                console.log(JSON.stringify(InF.body));
                expect.fail();
            })
        }).catch(function (err: any) {
            console.log(err);
        });
        //return;
    });
    it("Finding room types that don't have Tables", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("rooms", zipContent).then(function () {
            return facade.performQuery({
                "WHERE": {
                    "NOT": {
                        "IS": {
                            "rooms_furniture": "Classroom-Movable Tables & Chairs"
                        }
                    }
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_type"
                    ],
                    "ORDER": "rooms_type",
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
    it("testing with type", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("rooms", zipContent).then(function () {
            return facade.performQuery({
                "WHERE": {
                    "AND": [
                        {
                            "IS": {
                                "rooms_type": "*Group*"
                            }

                        },
                        {
                            "NOT": {
                                "IS": {
                                    "rooms_furniture": "Classroom-Fixed Tables/Movable Chairs"
                                }
                            }
                        }
                    ]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_name",
                        "rooms_type"
                    ],
                    "ORDER": "rooms_name",
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
});