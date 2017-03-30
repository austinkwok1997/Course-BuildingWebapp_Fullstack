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
                    "rooms_address": "1895 Lower Mall BC V6T 1Z4*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name",
                    "rooms_lat",
                    "rooms_lon"
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
                        "rooms_fullname",
                        "rooms_shortname",
                        "rooms_number",
                        "rooms_name",
                        "rooms_address",
                        "rooms_lat",
                        "rooms_lon",
                        "rooms_seats",
                        "rooms_type",
                        "rooms_furniture",
                        "rooms_href"
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
                        "rooms_fullname",
                        "rooms_shortname",
                        "rooms_number",
                        "rooms_name",
                        "rooms_address",
                        "rooms_lat",
                        "rooms_lon",
                        "rooms_seats",
                        "rooms_type",
                        "rooms_furniture",
                        "rooms_href"
                    ],
                    "ORDER" : "rooms_name",
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
               // console.log(JSON.stringify(InF.body));
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
                                "rooms_lat": 49.26048
                            }
                        },
                        {
                            "EQ": {
                                "rooms_lon": -123.24944
                            }
                        }
                    ]
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_address",
                        "rooms_lat",
                        "rooms_lon"

                    ],
                    "ORDER": "rooms_address",
                    "FORM": "TABLE"
                }
            }).then(function (InF: InsightResponse) {
                //var t=JSON.parse(JSON.stringify(InF.body));
              //  console.log(JSON.stringify(InF.body));
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
               // console.log(JSON.stringify(InF.body));
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
                //console.log(JSON.stringify(InF.body));
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
               // console.log(JSON.stringify(InF.body));
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
               // console.log(JSON.stringify(InF.body));
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
               // console.log(JSON.stringify(InF.body));
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
                //console.log(JSON.stringify(InF.body));
            })
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
        //return;
    });
    it("testing with type", function () {
        //console.log("+++TEST: simple query from spec");
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
                //console.log(JSON.stringify(InF.body));
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
             //   console.log(JSON.stringify(InF.body));
            })
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
        //return;
    });
    it("testing with type", function () {
        //console.log("+++TEST: simple query from spec");
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
                //console.log(JSON.stringify(InF.body));
            })
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
        //return;
    });
    it("testing with studio", function () {
        //console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("rooms", zipContent).then(function () {
            return facade.performQuery({
                "WHERE": {
                    "AND": [
                        {
                            "IS": {
                                "rooms_type": "*Studio*"
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
                //console.log(JSON.stringify(InF.body));
            })
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
        //return;
    });

    it("deliverable sort url test", function () {
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
                        "rooms_href"
                    ],
                    "ORDER": "rooms_href",
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
    it("testing seats", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("rooms", zipContent).then(function () {
            return facade.performQuery({
                "WHERE": {
                    "GT": {
                        "rooms_seats": 100
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
               // console.log(JSON.stringify(InF.body));
            })
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
        //return;
    });
    it("testing specific furniture", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("rooms", zipContent).then(function () {
            return facade.performQuery({
                "WHERE": {
                    "IS": {
                        "rooms_furniture": "Classroom-Fixed Tables/Movable Chairs"
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
               // console.log(JSON.stringify(InF.body));
            })
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
        //return;
    });
    it("testing leslie", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("rooms", zipContent).then(function () {
            return facade.performQuery({
                "WHERE": {

                    "IS": {
                        "rooms_address": "6331 Crescent Road*"
                    }

                },
                "OPTIONS": {
                    "COLUMNS": [
                        "rooms_address","rooms_lon","rooms_lat"
                    ],
                    "ORDER": "rooms_address",
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
    it("testing returning courses year", function () {
        //console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("courses.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("courses", zipContent).then(function () {
            return facade.performQuery({
                "WHERE": {
                    "IS": {
                        "courses_dept": "biol"
                    }
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_year"
                    ],
                    "ORDER": "courses_year",
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
    it("testing bounding box", function () {
        //console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("rooms", zipContent).then(function () {
            return facade.performQuery({
                "WHERE": {

                    "AND": [{
                        "GT": {
                            "rooms_lat": 49.2612
                        }
                    },
                        {
                            "LT": {
                                "rooms_lat": 49.26129
                            }
                        },
                        {
                            "LT": {
                                "rooms_lon": -123.2480
                            }
                        },
                        {
                            "GT": {
                                "rooms_lon": -123.24809
                            }
                        }
                    ]

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
    it("testing big courses", function () {
        //console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("courses.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("courses", zipContent).then(function () {
            return facade.performQuery({
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
    it("testing rooms", function () {
        //console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("rooms.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("rooms", zipContent).then(function () {
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
                //var t=JSON.parse(JSON.stringify(InF.body));
          //      console.log(JSON.stringify(InF.body));
            })
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
        //return;
    });
    it("3rd deliverable 1st query", function () {
        //console.log("+++TEST: simple query from spec");
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
    it("3rd deliverable 2nd query", function () {
        //console.log("+++TEST: simple query from spec");
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
    it("testing with underscore in apply", function () {
        //console.log("+++TEST: simple query from spec");
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
                        "max_Seats": {
                            "MAX": "rooms_seats"
                        }
                    }]
                }
            }).then(function (InF: InsightResponse) {
                //var t=JSON.parse(JSON.stringify(InF.body));
                console.log(JSON.stringify(InF.body));
                expect.fail()
            })
        }).catch(function (err: any) {
          //  console.log(err);
        });
        //return;
    });
    it("testing with no apply", function () {
        //console.log("+++TEST: simple query from spec");
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
                    "GROUP": ["rooms_furniture"]

                }
            }).then(function (InF: InsightResponse) {
                //var t=JSON.parse(JSON.stringify(InF.body));
                console.log(JSON.stringify(InF.body));
                expect.fail();
            })
        }).catch(function (err: any) {
           // console.log(err);
        });
        //return;
    });
    it("testing with no group", function () {
        //console.log("+++TEST: simple query from spec");
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
                    "APPLY": [{
                        "maxSeats": {
                            "MAX": "rooms_seats"
                        }
                    }]
                }
            }).then(function (InF: InsightResponse) {
                //var t=JSON.parse(JSON.stringify(InF.body));
                console.log(JSON.stringify(InF.body));
                expect.fail();
            })
        }).catch(function (err: any) {
            //console.log(err);
        });
        //return;
    });
    it("testing with things in Group that is not in columns", function () {
        //console.log("+++TEST: simple query from spec");
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
                //var t=JSON.parse(JSON.stringify(InF.body));
                console.log(JSON.stringify(InF.body));
                expect.fail();
            })
        }).catch(function (err: any) {
            //console.log(err);
        });
        //return;
    });
    it("testing with things in Apply that aren't in columns", function () {
        //console.log("+++TEST: simple query from spec");
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
                        "rooms_shortname"
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
                //var t=JSON.parse(JSON.stringify(InF.body));
                //console.log(JSON.stringify(InF.body));
                expect.fail();
            })
        }).catch(function (err: any) {
            console.log(err);
        });
        //return;
    });
    it("testing non number value in apply max", function () {
        //console.log("+++TEST: simple query from spec");
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
                            "MAX": "rooms_furniture"
                        }
                    }]
                }
            }).then(function (InF: InsightResponse) {
                //var t=JSON.parse(JSON.stringify(InF.body));
                console.log(JSON.stringify(InF.body));
                expect.fail();
            })
        }).catch(function (err: any) {
            //console.log(err);
        });
        //return;
    });
    it("testing good query", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("courses.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("courses", zipContent).then(function () {
            return facade.performQuery( {
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
            }).then(function (InF: InsightResponse) {
                //var t=JSON.parse(JSON.stringify(InF.body));
                console.log(JSON.stringify(InF.body));
                expect(InF['body']).to.eql({"render":"TABLE","result":[{"courses_dept":"math","courses_id":"527","maxAvg":99.78},{"courses_dept":"cnps","courses_id":"574","maxAvg":99.19},{"courses_dept":"spph","courses_id":"300","maxAvg":98.98},{"courses_dept":"epse","courses_id":"449","maxAvg":98.8},{"courses_dept":"eece","courses_id":"541","maxAvg":98.75},{"courses_dept":"nurs","courses_id":"509","maxAvg":98.71},{"courses_dept":"epse","courses_id":"421","maxAvg":98.7},{"courses_dept":"nurs","courses_id":"578","maxAvg":98.58},{"courses_dept":"epse","courses_id":"519","maxAvg":98.45},{"courses_dept":"crwr","courses_id":"599","maxAvg":98},{"courses_dept":"epse","courses_id":"534","maxAvg":97.78},{"courses_dept":"epse","courses_id":"549","maxAvg":97.69},{"courses_dept":"epse","courses_id":"606","maxAvg":97.67},{"courses_dept":"educ","courses_id":"500","maxAvg":97.5},{"courses_dept":"math","courses_id":"532","maxAvg":97.48},{"courses_dept":"nurs","courses_id":"591","maxAvg":97.33},{"courses_dept":"math","courses_id":"525","maxAvg":97.25},{"courses_dept":"epse","courses_id":"596","maxAvg":97.09},{"courses_dept":"math","courses_id":"541","maxAvg":97.09},{"courses_dept":"psyc","courses_id":"549","maxAvg":97},{"courses_dept":"spph","courses_id":"200","maxAvg":96.96},{"courses_dept":"arst","courses_id":"550","maxAvg":96.94},{"courses_dept":"audi","courses_id":"568","maxAvg":96.9},{"courses_dept":"epse","courses_id":"312","maxAvg":96.9},{"courses_dept":"math","courses_id":"545","maxAvg":96.83},{"courses_dept":"spph","courses_id":"515","maxAvg":96.8},{"courses_dept":"mine","courses_id":"393","maxAvg":96.59},{"courses_dept":"midw","courses_id":"101","maxAvg":96.5},{"courses_dept":"musc","courses_id":"559","maxAvg":96.5},{"courses_dept":"etec","courses_id":"521","maxAvg":96.47},{"courses_dept":"plan","courses_id":"595","maxAvg":96.47},{"courses_dept":"edst","courses_id":"520","maxAvg":96.46},{"courses_dept":"math","courses_id":"502","maxAvg":96.44},{"courses_dept":"fipr","courses_id":"333","maxAvg":96.4},{"courses_dept":"frst","courses_id":"562","maxAvg":96.36},{"courses_dept":"epse","courses_id":"526","maxAvg":96.33},{"courses_dept":"cnps","courses_id":"584","maxAvg":96.33},{"courses_dept":"math","courses_id":"589","maxAvg":96.33},{"courses_dept":"civl","courses_id":"508","maxAvg":96.27},{"courses_dept":"math","courses_id":"516","maxAvg":96.25},{"courses_dept":"mtrl","courses_id":"564","maxAvg":96.25},{"courses_dept":"epse","courses_id":"505","maxAvg":96.23},{"courses_dept":"epse","courses_id":"432","maxAvg":96.21},{"courses_dept":"sowk","courses_id":"505","maxAvg":96.15},{"courses_dept":"adhe","courses_id":"329","maxAvg":96.11},{"courses_dept":"libr","courses_id":"575","maxAvg":96.1},{"courses_dept":"sowk","courses_id":"551","maxAvg":96.09},{"courses_dept":"kin","courses_id":"565","maxAvg":96.06},{"courses_dept":"psyc","courses_id":"501","maxAvg":96},{"courses_dept":"phil","courses_id":"120","maxAvg":96},{"courses_dept":"apsc","courses_id":"279","maxAvg":96},{"courses_dept":"kin","courses_id":"499","maxAvg":96},{"courses_dept":"pcth","courses_id":"549","maxAvg":96},{"courses_dept":"epse","courses_id":"528","maxAvg":96},{"courses_dept":"epse","courses_id":"303","maxAvg":96},{"courses_dept":"etec","courses_id":"533","maxAvg":95.96},{"courses_dept":"epse","courses_id":"592","maxAvg":95.9},{"courses_dept":"epse","courses_id":"520","maxAvg":95.83},{"courses_dept":"edst","courses_id":"505","maxAvg":95.78},{"courses_dept":"cnps","courses_id":"504","maxAvg":95.78},{"courses_dept":"psyc","courses_id":"537","maxAvg":95.75},{"courses_dept":"spph","courses_id":"518","maxAvg":95.75},{"courses_dept":"crwr","courses_id":"530","maxAvg":95.7},{"courses_dept":"math","courses_id":"510","maxAvg":95.67},{"courses_dept":"musc","courses_id":"506","maxAvg":95.67},{"courses_dept":"epse","courses_id":"415","maxAvg":95.67},{"courses_dept":"etec","courses_id":"531","maxAvg":95.63},{"courses_dept":"mine","courses_id":"553","maxAvg":95.6},{"courses_dept":"edcp","courses_id":"377","maxAvg":95.58},{"courses_dept":"math","courses_id":"534","maxAvg":95.56},{"courses_dept":"chbe","courses_id":"551","maxAvg":95.54},{"courses_dept":"epse","courses_id":"411","maxAvg":95.5},{"courses_dept":"epse","courses_id":"436","maxAvg":95.47},{"courses_dept":"phys","courses_id":"508","maxAvg":95.43},{"courses_dept":"epse","courses_id":"516","maxAvg":95.41},{"courses_dept":"phth","courses_id":"566","maxAvg":95.37},{"courses_dept":"cnps","courses_id":"514","maxAvg":95.36},{"courses_dept":"cnps","courses_id":"586","maxAvg":95.36},{"courses_dept":"epse","courses_id":"553","maxAvg":95.31},{"courses_dept":"chbe","courses_id":"553","maxAvg":95.31},{"courses_dept":"hgse","courses_id":"357","maxAvg":95.29},{"courses_dept":"epse","courses_id":"320","maxAvg":95.27},{"courses_dept":"psyc","courses_id":"541","maxAvg":95.25},{"courses_dept":"epse","courses_id":"408","maxAvg":95.22},{"courses_dept":"thtr","courses_id":"350","maxAvg":95.2},{"courses_dept":"epse","courses_id":"568","maxAvg":95.17},{"courses_dept":"bmeg","courses_id":"501","maxAvg":95.15},{"courses_dept":"spph","courses_id":"500","maxAvg":95.11},{"courses_dept":"epse","courses_id":"482","maxAvg":95.11},{"courses_dept":"spph","courses_id":"545","maxAvg":95.09},{"courses_dept":"phar","courses_id":"403","maxAvg":95.07},{"courses_dept":"cnps","courses_id":"535","maxAvg":95},{"courses_dept":"rhsc","courses_id":"501","maxAvg":95},{"courses_dept":"bmeg","courses_id":"597","maxAvg":95},{"courses_dept":"sowk","courses_id":"570","maxAvg":95},{"courses_dept":"nurs","courses_id":"424","maxAvg":95},{"courses_dept":"cpsc","courses_id":"589","maxAvg":95},{"courses_dept":"kin","courses_id":"500","maxAvg":95},{"courses_dept":"mtrl","courses_id":"599","maxAvg":95},{"courses_dept":"obst","courses_id":"549","maxAvg":95},{"courses_dept":"musc","courses_id":"553","maxAvg":95},{"courses_dept":"econ","courses_id":"516","maxAvg":95},{"courses_dept":"edcp","courses_id":"473","maxAvg":95},{"courses_dept":"epse","courses_id":"682","maxAvg":95},{"courses_dept":"kin","courses_id":"586","maxAvg":94.92},{"courses_dept":"etec","courses_id":"500","maxAvg":94.88},{"courses_dept":"edcp","courses_id":"564","maxAvg":94.86},{"courses_dept":"epse","courses_id":"431","maxAvg":94.86},{"courses_dept":"comm","courses_id":"581","maxAvg":94.75},{"courses_dept":"epse","courses_id":"594","maxAvg":94.75},{"courses_dept":"chbe","courses_id":"495","maxAvg":94.75},{"courses_dept":"eece","courses_id":"554","maxAvg":94.71},{"courses_dept":"medg","courses_id":"530","maxAvg":94.7},{"courses_dept":"stat","courses_id":"560","maxAvg":94.7},{"courses_dept":"epse","courses_id":"683","maxAvg":94.69},{"courses_dept":"epse","courses_id":"545","maxAvg":94.67},{"courses_dept":"math","courses_id":"544","maxAvg":94.67},{"courses_dept":"sowk","courses_id":"525","maxAvg":94.56},{"courses_dept":"epse","courses_id":"531","maxAvg":94.56},{"courses_dept":"phys","courses_id":"536","maxAvg":94.5},{"courses_dept":"cpsc","courses_id":"503","maxAvg":94.5},{"courses_dept":"hgse","courses_id":"352","maxAvg":94.5},{"courses_dept":"epse","courses_id":"316","maxAvg":94.48},{"courses_dept":"aanb","courses_id":"504","maxAvg":94.44},{"courses_dept":"kin","courses_id":"461","maxAvg":94.42},{"courses_dept":"etec","courses_id":"530","maxAvg":94.42},{"courses_dept":"cell","courses_id":"505","maxAvg":94.4},{"courses_dept":"spph","courses_id":"550","maxAvg":94.36},{"courses_dept":"biol","courses_id":"462","maxAvg":94.33},{"courses_dept":"math","courses_id":"552","maxAvg":94.33},{"courses_dept":"dent","courses_id":"524","maxAvg":94.33},{"courses_dept":"etec","courses_id":"511","maxAvg":94.29},{"courses_dept":"ceen","courses_id":"596","maxAvg":94.27},{"courses_dept":"surg","courses_id":"500","maxAvg":94.25},{"courses_dept":"epse","courses_id":"574","maxAvg":94.25},{"courses_dept":"musc","courses_id":"103","maxAvg":94.25},{"courses_dept":"phrm","courses_id":"141","maxAvg":94.23},{"courses_dept":"epse","courses_id":"406","maxAvg":94.23},{"courses_dept":"nurs","courses_id":"510","maxAvg":94.21},{"courses_dept":"epse","courses_id":"512","maxAvg":94.2},{"courses_dept":"cnps","courses_id":"632","maxAvg":94.2},{"courses_dept":"edcp","courses_id":"568","maxAvg":94.17},{"courses_dept":"micb","courses_id":"449","maxAvg":94.17},{"courses_dept":"nurs","courses_id":"306","maxAvg":94.15},{"courses_dept":"epse","courses_id":"403","maxAvg":94.08},{"courses_dept":"epse","courses_id":"437","maxAvg":94.08},{"courses_dept":"crwr","courses_id":"430","maxAvg":94.08},{"courses_dept":"midw","courses_id":"103","maxAvg":94.08},{"courses_dept":"edst","courses_id":"597","maxAvg":94.06},{"courses_dept":"musc","courses_id":"563","maxAvg":94},{"courses_dept":"cpsc","courses_id":"501","maxAvg":94},{"courses_dept":"audi","courses_id":"515","maxAvg":94},{"courses_dept":"rhsc","courses_id":"509","maxAvg":94},{"courses_dept":"nurs","courses_id":"595","maxAvg":94},{"courses_dept":"etec","courses_id":"532","maxAvg":94},{"courses_dept":"edst","courses_id":"501","maxAvg":94},{"courses_dept":"nurs","courses_id":"423","maxAvg":94},{"courses_dept":"fish","courses_id":"500","maxAvg":94},{"courses_dept":"arst","courses_id":"500","maxAvg":94},{"courses_dept":"elec","courses_id":"205","maxAvg":93.93},{"courses_dept":"audi","courses_id":"522","maxAvg":93.91},{"courses_dept":"epse","courses_id":"501","maxAvg":93.88},{"courses_dept":"epse","courses_id":"529","maxAvg":93.86},{"courses_dept":"sowk","courses_id":"559","maxAvg":93.82},{"courses_dept":"math","courses_id":"501","maxAvg":93.8},{"courses_dept":"eece","courses_id":"531","maxAvg":93.8},{"courses_dept":"cell","courses_id":"506","maxAvg":93.8},{"courses_dept":"audi","courses_id":"558","maxAvg":93.79},{"courses_dept":"edst","courses_id":"570","maxAvg":93.78},{"courses_dept":"midw","courses_id":"110","maxAvg":93.75},{"courses_dept":"audi","courses_id":"577","maxAvg":93.75},{"courses_dept":"audi","courses_id":"567","maxAvg":93.75},{"courses_dept":"spph","courses_id":"516","maxAvg":93.73},{"courses_dept":"dhyg","courses_id":"412","maxAvg":93.72},{"courses_dept":"eced","courses_id":"416","maxAvg":93.72},{"courses_dept":"eced","courses_id":"439","maxAvg":93.71},{"courses_dept":"cnps","courses_id":"594","maxAvg":93.7},{"courses_dept":"epse","courses_id":"550","maxAvg":93.67},{"courses_dept":"ccst","courses_id":"503","maxAvg":93.67},{"courses_dept":"educ","courses_id":"504","maxAvg":93.6},{"courses_dept":"micb","courses_id":"502","maxAvg":93.6},{"courses_dept":"epse","courses_id":"593","maxAvg":93.59},{"courses_dept":"eece","courses_id":"583","maxAvg":93.58},{"courses_dept":"edcp","courses_id":"508","maxAvg":93.56},{"courses_dept":"audi","courses_id":"562","maxAvg":93.54},{"courses_dept":"econ","courses_id":"526","maxAvg":93.52},{"courses_dept":"path","courses_id":"549","maxAvg":93.5},{"courses_dept":"mech","courses_id":"506","maxAvg":93.5},{"courses_dept":"math","courses_id":"508","maxAvg":93.5},{"courses_dept":"medi","courses_id":"549","maxAvg":93.5},{"courses_dept":"cpsc","courses_id":"449","maxAvg":93.5},{"courses_dept":"nurs","courses_id":"572","maxAvg":93.5},{"courses_dept":"eosc","courses_id":"529","maxAvg":93.47},{"courses_dept":"econ","courses_id":"580","maxAvg":93.47},{"courses_dept":"musc","courses_id":"323","maxAvg":93.45},{"courses_dept":"biof","courses_id":"520","maxAvg":93.45},{"courses_dept":"edst","courses_id":"511","maxAvg":93.44},{"courses_dept":"nurs","courses_id":"343","maxAvg":93.41},{"courses_dept":"sowk","courses_id":"510","maxAvg":93.4},{"courses_dept":"edst","courses_id":"514","maxAvg":93.4},{"courses_dept":"kin","courses_id":"400","maxAvg":93.37},{"courses_dept":"musc","courses_id":"163","maxAvg":93.35},{"courses_dept":"spph","courses_id":"510","maxAvg":93.33},{"courses_dept":"econ","courses_id":"560","maxAvg":93.33},{"courses_dept":"phys","courses_id":"501","maxAvg":93.31},{"courses_dept":"edcp","courses_id":"491","maxAvg":93.3},{"courses_dept":"medi","courses_id":"560","maxAvg":93.29},{"courses_dept":"medg","courses_id":"505","maxAvg":93.25},{"courses_dept":"span","courses_id":"402","maxAvg":93.25},{"courses_dept":"edcp","courses_id":"562","maxAvg":93.25},{"courses_dept":"epse","courses_id":"684","maxAvg":93.25},{"courses_dept":"epse","courses_id":"525","maxAvg":93.23},{"courses_dept":"hinu","courses_id":"102","maxAvg":93.22},{"courses_dept":"edcp","courses_id":"555","maxAvg":93.2},{"courses_dept":"lled","courses_id":"601","maxAvg":93.2},{"courses_dept":"spph","courses_id":"543","maxAvg":93.2},{"courses_dept":"audi","courses_id":"585","maxAvg":93.2},{"courses_dept":"frst","courses_id":"544","maxAvg":93.17},{"courses_dept":"plan","courses_id":"561","maxAvg":93.12},{"courses_dept":"math","courses_id":"523","maxAvg":93.11},{"courses_dept":"etec","courses_id":"510","maxAvg":93.11},{"courses_dept":"medi","courses_id":"502","maxAvg":93.08},{"courses_dept":"epse","courses_id":"535","maxAvg":93.08},{"courses_dept":"onco","courses_id":"502","maxAvg":93.07},{"courses_dept":"hgse","courses_id":"359","maxAvg":93.07},{"courses_dept":"fnh","courses_id":"341","maxAvg":93.05},{"courses_dept":"thtr","courses_id":"308","maxAvg":93.05},{"courses_dept":"gpp","courses_id":"591","maxAvg":93.04},{"courses_dept":"obst","courses_id":"507","maxAvg":93},{"courses_dept":"eece","courses_id":"576","maxAvg":93},{"courses_dept":"frst","courses_id":"545","maxAvg":93},{"courses_dept":"hist","courses_id":"549","maxAvg":93},{"courses_dept":"stat","courses_id":"589","maxAvg":93},{"courses_dept":"edcp","courses_id":"556","maxAvg":93},{"courses_dept":"frst","courses_id":"413","maxAvg":93},{"courses_dept":"arth","courses_id":"599","maxAvg":93},{"courses_dept":"arst","courses_id":"620","maxAvg":93},{"courses_dept":"econ","courses_id":"523","maxAvg":93},{"courses_dept":"itst","courses_id":"419","maxAvg":93},{"courses_dept":"mech","courses_id":"592","maxAvg":93},{"courses_dept":"mine","courses_id":"698","maxAvg":93},{"courses_dept":"path","courses_id":"535","maxAvg":93},{"courses_dept":"phar","courses_id":"548","maxAvg":93},{"courses_dept":"edcp","courses_id":"343","maxAvg":92.96},{"courses_dept":"epse","courses_id":"569","maxAvg":92.92},{"courses_dept":"cnps","courses_id":"363","maxAvg":92.91},{"courses_dept":"mtrl","courses_id":"515","maxAvg":92.89},{"courses_dept":"sowk","courses_id":"550","maxAvg":92.88},{"courses_dept":"eced","courses_id":"438","maxAvg":92.87},{"courses_dept":"edst","courses_id":"588","maxAvg":92.83},{"courses_dept":"spph","courses_id":"517","maxAvg":92.83},{"courses_dept":"larc","courses_id":"551","maxAvg":92.8},{"courses_dept":"spph","courses_id":"519","maxAvg":92.78},{"courses_dept":"eosc","courses_id":"522","maxAvg":92.75},{"courses_dept":"chbe","courses_id":"599","maxAvg":92.75},{"courses_dept":"edst","courses_id":"521","maxAvg":92.73},{"courses_dept":"zool","courses_id":"503","maxAvg":92.71},{"courses_dept":"epse","courses_id":"502","maxAvg":92.7},{"courses_dept":"civl","courses_id":"505","maxAvg":92.67},{"courses_dept":"musc","courses_id":"441","maxAvg":92.67},{"courses_dept":"musc","courses_id":"305","maxAvg":92.63},{"courses_dept":"math","courses_id":"507","maxAvg":92.63},{"courses_dept":"epse","courses_id":"591","maxAvg":92.63},{"courses_dept":"nurs","courses_id":"338","maxAvg":92.62},{"courses_dept":"eece","courses_id":"527","maxAvg":92.6},{"courses_dept":"mech","courses_id":"529","maxAvg":92.59},{"courses_dept":"phys","courses_id":"503","maxAvg":92.58},{"courses_dept":"path","courses_id":"502","maxAvg":92.58},{"courses_dept":"chem","courses_id":"514","maxAvg":92.57},{"courses_dept":"econ","courses_id":"565","maxAvg":92.5},{"courses_dept":"chem","courses_id":"534","maxAvg":92.5},{"courses_dept":"sans","courses_id":"102","maxAvg":92.5},{"courses_dept":"kin","courses_id":"568","maxAvg":92.5},{"courses_dept":"lled","courses_id":"501","maxAvg":92.5},{"courses_dept":"eece","courses_id":"579","maxAvg":92.5},{"courses_dept":"eosc","courses_id":"543","maxAvg":92.5},{"courses_dept":"edcp","courses_id":"513","maxAvg":92.45},{"courses_dept":"audi","courses_id":"557","maxAvg":92.45},{"courses_dept":"mech","courses_id":"536","maxAvg":92.43},{"courses_dept":"thtr","courses_id":"356","maxAvg":92.41},{"courses_dept":"cnps","courses_id":"545","maxAvg":92.4},{"courses_dept":"math","courses_id":"503","maxAvg":92.4},{"courses_dept":"cpsc","courses_id":"490","maxAvg":92.4},{"courses_dept":"cell","courses_id":"512","maxAvg":92.4},{"courses_dept":"dent","courses_id":"540","maxAvg":92.4},{"courses_dept":"spph","courses_id":"540","maxAvg":92.39},{"courses_dept":"biol","courses_id":"464","maxAvg":92.36},{"courses_dept":"nurs","courses_id":"520","maxAvg":92.33},{"courses_dept":"math","courses_id":"550","maxAvg":92.3},{"courses_dept":"russ","courses_id":"300","maxAvg":92.3},{"courses_dept":"etec","courses_id":"512","maxAvg":92.3},{"courses_dept":"civl","courses_id":"586","maxAvg":92.3},{"courses_dept":"audi","courses_id":"526","maxAvg":92.29},{"courses_dept":"midw","courses_id":"405","maxAvg":92.29},{"courses_dept":"anth","courses_id":"519","maxAvg":92.29},{"courses_dept":"phar","courses_id":"406","maxAvg":92.28},{"courses_dept":"frst","courses_id":"560","maxAvg":92.27},{"courses_dept":"libe","courses_id":"467","maxAvg":92.26},{"courses_dept":"germ","courses_id":"521","maxAvg":92.25},{"courses_dept":"ling","courses_id":"525","maxAvg":92.25},{"courses_dept":"cell","courses_id":"504","maxAvg":92.25},{"courses_dept":"sowk","courses_id":"316","maxAvg":92.23},{"courses_dept":"frst","courses_id":"522","maxAvg":92.22},{"courses_dept":"edst","courses_id":"577","maxAvg":92.2},{"courses_dept":"pcth","courses_id":"513","maxAvg":92.2},{"courses_dept":"biol","courses_id":"347","maxAvg":92.19},{"courses_dept":"dhyg","courses_id":"462","maxAvg":92.17},{"courses_dept":"thtr","courses_id":"150","maxAvg":92.15},{"courses_dept":"medg","courses_id":"535","maxAvg":92.14},{"courses_dept":"dhyg","courses_id":"400","maxAvg":92.13},{"courses_dept":"micb","courses_id":"425","maxAvg":92.12},{"courses_dept":"epse","courses_id":"507","maxAvg":92.11},{"courses_dept":"biol","courses_id":"449","maxAvg":92.1},{"courses_dept":"cnps","courses_id":"426","maxAvg":92.1},{"courses_dept":"math","courses_id":"546","maxAvg":92.08},{"courses_dept":"spph","courses_id":"410","maxAvg":92.08},{"courses_dept":"plan","courses_id":"517","maxAvg":92.07},{"courses_dept":"larc","courses_id":"541","maxAvg":92.07},{"courses_dept":"phrm","courses_id":"161","maxAvg":92.06},{"courses_dept":"phth","courses_id":"526","maxAvg":92.04},{"courses_dept":"spph","courses_id":"537","maxAvg":92},{"courses_dept":"mech","courses_id":"698","maxAvg":92},{"courses_dept":"anat","courses_id":"511","maxAvg":92},{"courses_dept":"mech","courses_id":"597","maxAvg":92},{"courses_dept":"kin","courses_id":"564","maxAvg":92},{"courses_dept":"kin","courses_id":"595","maxAvg":92},{"courses_dept":"math","courses_id":"515","maxAvg":92},{"courses_dept":"mech","courses_id":"584","maxAvg":92},{"courses_dept":"bota","courses_id":"528","maxAvg":92},{"courses_dept":"chil","courses_id":"599","maxAvg":92},{"courses_dept":"atsc","courses_id":"500","maxAvg":92},{"courses_dept":"zool","courses_id":"549","maxAvg":92},{"courses_dept":"civl","courses_id":"583","maxAvg":92},{"courses_dept":"eced","courses_id":"421","maxAvg":91.93},{"courses_dept":"epse","courses_id":"584","maxAvg":91.9},{"courses_dept":"phth","courses_id":"516","maxAvg":91.89},{"courses_dept":"phys","courses_id":"545","maxAvg":91.89},{"courses_dept":"kin","courses_id":"562","maxAvg":91.88},{"courses_dept":"phar","courses_id":"408","maxAvg":91.88},{"courses_dept":"econ","courses_id":"628","maxAvg":91.86},{"courses_dept":"eece","courses_id":"592","maxAvg":91.86},{"courses_dept":"apbi","courses_id":"490","maxAvg":91.86},{"courses_dept":"phys","courses_id":"526","maxAvg":91.85},{"courses_dept":"econ","courses_id":"627","maxAvg":91.84},{"courses_dept":"medg","courses_id":"520","maxAvg":91.83},{"courses_dept":"nurs","courses_id":"341","maxAvg":91.83},{"courses_dept":"elec","courses_id":"271","maxAvg":91.83},{"courses_dept":"dent","courses_id":"539","maxAvg":91.82},{"courses_dept":"sowk","courses_id":"405","maxAvg":91.82},{"courses_dept":"edst","courses_id":"532","maxAvg":91.81},{"courses_dept":"spph","courses_id":"526","maxAvg":91.81},{"courses_dept":"pcth","courses_id":"402","maxAvg":91.8},{"courses_dept":"eosc","courses_id":"531","maxAvg":91.8},{"courses_dept":"musc","courses_id":"249","maxAvg":91.8},{"courses_dept":"cnps","courses_id":"362","maxAvg":91.8},{"courses_dept":"chbe","courses_id":"563","maxAvg":91.8},{"courses_dept":"cpsc","courses_id":"507","maxAvg":91.79},{"courses_dept":"micb","courses_id":"421","maxAvg":91.79},{"courses_dept":"econ","courses_id":"603","maxAvg":91.79},{"courses_dept":"midw","courses_id":"221","maxAvg":91.79},{"courses_dept":"phys","courses_id":"504","maxAvg":91.75},{"courses_dept":"audi","courses_id":"551","maxAvg":91.75},{"courses_dept":"math","courses_id":"537","maxAvg":91.75},{"courses_dept":"audi","courses_id":"576","maxAvg":91.73},{"courses_dept":"stat","courses_id":"460","maxAvg":91.73},{"courses_dept":"cnps","courses_id":"564","maxAvg":91.71},{"courses_dept":"kin","courses_id":"367","maxAvg":91.7},{"courses_dept":"rsot","courses_id":"551","maxAvg":91.7},{"courses_dept":"lled","courses_id":"462","maxAvg":91.68},{"courses_dept":"eece","courses_id":"574","maxAvg":91.67},{"courses_dept":"anat","courses_id":"512","maxAvg":91.67},{"courses_dept":"libr","courses_id":"527","maxAvg":91.63},{"courses_dept":"phar","courses_id":"457","maxAvg":91.63},{"courses_dept":"eece","courses_id":"534","maxAvg":91.63},{"courses_dept":"chem","courses_id":"533","maxAvg":91.6},{"courses_dept":"econ","courses_id":"495","maxAvg":91.6},{"courses_dept":"libr","courses_id":"582","maxAvg":91.6},{"courses_dept":"eece","courses_id":"599","maxAvg":91.6},{"courses_dept":"psyc","courses_id":"560","maxAvg":91.6},{"courses_dept":"name","courses_id":"524","maxAvg":91.57},{"courses_dept":"mine","courses_id":"485","maxAvg":91.56},{"courses_dept":"civl","courses_id":"511","maxAvg":91.56},{"courses_dept":"math","courses_id":"521","maxAvg":91.56},{"courses_dept":"phar","courses_id":"502","maxAvg":91.56},{"courses_dept":"path","courses_id":"547","maxAvg":91.55},{"courses_dept":"eece","courses_id":"550","maxAvg":91.5},{"courses_dept":"econ","courses_id":"640","maxAvg":91.5},{"courses_dept":"psyc","courses_id":"531","maxAvg":91.5},{"courses_dept":"dent","courses_id":"504","maxAvg":91.5},{"courses_dept":"edcp","courses_id":"553","maxAvg":91.5},{"courses_dept":"rhsc","courses_id":"587","maxAvg":91.5},{"courses_dept":"thtr","courses_id":"505","maxAvg":91.5},{"courses_dept":"epse","courses_id":"575","maxAvg":91.5},{"courses_dept":"eosc","courses_id":"562","maxAvg":91.5},{"courses_dept":"math","courses_id":"539","maxAvg":91.5},{"courses_dept":"midw","courses_id":"215","maxAvg":91.5},{"courses_dept":"ital","courses_id":"403","maxAvg":91.5},{"courses_dept":"psyc","courses_id":"542","maxAvg":91.5},{"courses_dept":"rhsc","courses_id":"505","maxAvg":91.5},{"courses_dept":"cnps","courses_id":"524","maxAvg":91.5},{"courses_dept":"adhe","courses_id":"330","maxAvg":91.48},{"courses_dept":"edcp","courses_id":"410","maxAvg":91.48},{"courses_dept":"nurs","courses_id":"506","maxAvg":91.47},{"courses_dept":"bams","courses_id":"501","maxAvg":91.47},{"courses_dept":"civl","courses_id":"446","maxAvg":91.46},{"courses_dept":"edst","courses_id":"582","maxAvg":91.45},{"courses_dept":"rhsc","courses_id":"500","maxAvg":91.44},{"courses_dept":"soil","courses_id":"550","maxAvg":91.43},{"courses_dept":"astr","courses_id":"405","maxAvg":91.4},{"courses_dept":"audi","courses_id":"513","maxAvg":91.4},{"courses_dept":"math","courses_id":"421","maxAvg":91.38},{"courses_dept":"epse","courses_id":"595","maxAvg":91.38},{"courses_dept":"babs","courses_id":"502","maxAvg":91.38},{"courses_dept":"fnh","courses_id":"490","maxAvg":91.36},{"courses_dept":"etec","courses_id":"540","maxAvg":91.35},{"courses_dept":"math","courses_id":"425","maxAvg":91.33},{"courses_dept":"audi","courses_id":"593","maxAvg":91.33},{"courses_dept":"hunu","courses_id":"505","maxAvg":91.33},{"courses_dept":"eece","courses_id":"597","maxAvg":91.33},{"courses_dept":"civl","courses_id":"517","maxAvg":91.32},{"courses_dept":"mech","courses_id":"555","maxAvg":91.32},{"courses_dept":"dhyg","courses_id":"461","maxAvg":91.3},{"courses_dept":"kin","courses_id":"471","maxAvg":91.3},{"courses_dept":"eece","courses_id":"562","maxAvg":91.29},{"courses_dept":"rhsc","courses_id":"503","maxAvg":91.27},{"courses_dept":"edcp","courses_id":"510","maxAvg":91.27},{"courses_dept":"audi","courses_id":"570","maxAvg":91.27},{"courses_dept":"libe","courses_id":"463","maxAvg":91.26},{"courses_dept":"lled","courses_id":"469","maxAvg":91.26},{"courses_dept":"phys","courses_id":"506","maxAvg":91.25},{"courses_dept":"psyc","courses_id":"530","maxAvg":91.25},{"courses_dept":"spph","courses_id":"536","maxAvg":91.25},{"courses_dept":"dent","courses_id":"575","maxAvg":91.25},{"courses_dept":"astr","courses_id":"449","maxAvg":91.25},{"courses_dept":"dent","courses_id":"584","maxAvg":91.25},{"courses_dept":"cpsc","courses_id":"445","maxAvg":91.25},{"courses_dept":"libr","courses_id":"581","maxAvg":91.24},{"courses_dept":"libr","courses_id":"554","maxAvg":91.23},{"courses_dept":"cpsc","courses_id":"527","maxAvg":91.22},{"courses_dept":"cpsc","courses_id":"540","maxAvg":91.22},{"courses_dept":"pcth","courses_id":"512","maxAvg":91.22},{"courses_dept":"biol","courses_id":"440","maxAvg":91.21},{"courses_dept":"lled","courses_id":"526","maxAvg":91.2},{"courses_dept":"phar","courses_id":"440","maxAvg":91.2},{"courses_dept":"path","courses_id":"635","maxAvg":91.2},{"courses_dept":"epse","courses_id":"586","maxAvg":91.2},{"courses_dept":"sowk","courses_id":"400","maxAvg":91.2},{"courses_dept":"frst","courses_id":"590","maxAvg":91.17},{"courses_dept":"frst","courses_id":"351","maxAvg":91.17},{"courses_dept":"cnps","courses_id":"433","maxAvg":91.17},{"courses_dept":"phar","courses_id":"400","maxAvg":91.16},{"courses_dept":"fish","courses_id":"508","maxAvg":91.14},{"courses_dept":"math","courses_id":"551","maxAvg":91.14},{"courses_dept":"spph","courses_id":"524","maxAvg":91.14},{"courses_dept":"eece","courses_id":"560","maxAvg":91.13},{"courses_dept":"cnps","courses_id":"365","maxAvg":91.13},{"courses_dept":"thtr","courses_id":"330","maxAvg":91.1},{"courses_dept":"math","courses_id":"255","maxAvg":91.1},{"courses_dept":"econ","courses_id":"407","maxAvg":91.08},{"courses_dept":"audi","courses_id":"528","maxAvg":91.08},{"courses_dept":"kin","courses_id":"366","maxAvg":91.07},{"courses_dept":"civl","courses_id":"432","maxAvg":91.06},{"courses_dept":"phar","courses_id":"499","maxAvg":91.02},{"courses_dept":"bota","courses_id":"544","maxAvg":91},{"courses_dept":"bmeg","courses_id":"599","maxAvg":91},{"courses_dept":"fopr","courses_id":"262","maxAvg":91},{"courses_dept":"eosc","courses_id":"598","maxAvg":91},{"courses_dept":"chbe","courses_id":"575","maxAvg":91},{"courses_dept":"eosc","courses_id":"546","maxAvg":91},{"courses_dept":"eosc","courses_id":"542","maxAvg":91},{"courses_dept":"fish","courses_id":"510","maxAvg":91},{"courses_dept":"civl","courses_id":"555","maxAvg":91},{"courses_dept":"cell","courses_id":"507","maxAvg":91},{"courses_dept":"nurs","courses_id":"554","maxAvg":91},{"courses_dept":"path","courses_id":"531","maxAvg":91},{"courses_dept":"edst","courses_id":"518","maxAvg":91},{"courses_dept":"nurs","courses_id":"336","maxAvg":91},{"courses_dept":"audi","courses_id":"553","maxAvg":91},{"courses_dept":"phil","courses_id":"485","maxAvg":91},{"courses_dept":"audi","courses_id":"575","maxAvg":90.95},{"courses_dept":"pcth","courses_id":"300","maxAvg":90.93},{"courses_dept":"anth","courses_id":"500","maxAvg":90.92},{"courses_dept":"stat","courses_id":"540","maxAvg":90.9},{"courses_dept":"sowk","courses_id":"501","maxAvg":90.89},{"courses_dept":"nurs","courses_id":"507","maxAvg":90.88},{"courses_dept":"eece","courses_id":"509","maxAvg":90.88},{"courses_dept":"kin","courses_id":"598","maxAvg":90.88},{"courses_dept":"edst","courses_id":"527","maxAvg":90.87},{"courses_dept":"fish","courses_id":"504","maxAvg":90.86},{"courses_dept":"cell","courses_id":"503","maxAvg":90.86},{"courses_dept":"spph","courses_id":"525","maxAvg":90.84},{"courses_dept":"phys","courses_id":"539","maxAvg":90.83},{"courses_dept":"dent","courses_id":"544","maxAvg":90.83},{"courses_dept":"mtrl","courses_id":"562","maxAvg":90.83},{"courses_dept":"lfs","courses_id":"400","maxAvg":90.83},{"courses_dept":"nurs","courses_id":"571","maxAvg":90.81},{"courses_dept":"eced","courses_id":"442","maxAvg":90.81},{"courses_dept":"medi","courses_id":"535","maxAvg":90.8},{"courses_dept":"chem","courses_id":"501","maxAvg":90.75},{"courses_dept":"thtr","courses_id":"500","maxAvg":90.75},{"courses_dept":"medi","courses_id":"570","maxAvg":90.75},{"courses_dept":"eosc","courses_id":"513","maxAvg":90.75},{"courses_dept":"chbe","courses_id":"496","maxAvg":90.75},{"courses_dept":"lled","courses_id":"450","maxAvg":90.75},{"courses_dept":"fnh","courses_id":"460","maxAvg":90.75},{"courses_dept":"bota","courses_id":"501","maxAvg":90.71},{"courses_dept":"soil","courses_id":"510","maxAvg":90.71},{"courses_dept":"cpsc","courses_id":"522","maxAvg":90.71},{"courses_dept":"phys","courses_id":"535","maxAvg":90.7},{"courses_dept":"psyc","courses_id":"349","maxAvg":90.7},{"courses_dept":"mine","courses_id":"555","maxAvg":90.69},{"courses_dept":"medi","courses_id":"501","maxAvg":90.68},{"courses_dept":"econ","courses_id":"425","maxAvg":90.68},{"courses_dept":"kin","courses_id":"469","maxAvg":90.68},{"courses_dept":"food","courses_id":"512","maxAvg":90.68},{"courses_dept":"spph","courses_id":"527","maxAvg":90.67},{"courses_dept":"arst","courses_id":"570","maxAvg":90.67},{"courses_dept":"eosc","courses_id":"520","maxAvg":90.67},{"courses_dept":"lled","courses_id":"441","maxAvg":90.67},{"courses_dept":"cnps","courses_id":"579","maxAvg":90.67},{"courses_dept":"nrsc","courses_id":"549","maxAvg":90.67},{"courses_dept":"rhsc","courses_id":"502","maxAvg":90.67},{"courses_dept":"nurs","courses_id":"504","maxAvg":90.65},{"courses_dept":"edcp","courses_id":"559","maxAvg":90.64},{"courses_dept":"nurs","courses_id":"540","maxAvg":90.63},{"courses_dept":"sowk","courses_id":"425","maxAvg":90.62},{"courses_dept":"eosc","courses_id":"111","maxAvg":90.62},{"courses_dept":"phth","courses_id":"528","maxAvg":90.61},{"courses_dept":"edst","courses_id":"571","maxAvg":90.6},{"courses_dept":"eece","courses_id":"549","maxAvg":90.58},{"courses_dept":"plan","courses_id":"592","maxAvg":90.57},{"courses_dept":"bioc","courses_id":"521","maxAvg":90.57},{"courses_dept":"math","courses_id":"420","maxAvg":90.57},{"courses_dept":"spph","courses_id":"523","maxAvg":90.57},{"courses_dept":"edcp","courses_id":"551","maxAvg":90.56},{"courses_dept":"medg","courses_id":"521","maxAvg":90.52},{"courses_dept":"mine","courses_id":"554","maxAvg":90.52},{"courses_dept":"dent","courses_id":"722","maxAvg":90.5},{"courses_dept":"russ","courses_id":"102","maxAvg":90.5},{"courses_dept":"mech","courses_id":"598","maxAvg":90.5},{"courses_dept":"edst","courses_id":"581","maxAvg":90.5},{"courses_dept":"chbe","courses_id":"583","maxAvg":90.5},{"courses_dept":"hgse","courses_id":"355","maxAvg":90.48},{"courses_dept":"cohr","courses_id":"305","maxAvg":90.46},{"courses_dept":"thtr","courses_id":"352","maxAvg":90.46},{"courses_dept":"phar","courses_id":"321","maxAvg":90.45},{"courses_dept":"chbe","courses_id":"597","maxAvg":90.45},{"courses_dept":"isci","courses_id":"311","maxAvg":90.44},{"courses_dept":"fopr","courses_id":"459","maxAvg":90.44},{"courses_dept":"civl","courses_id":"407","maxAvg":90.44},{"courses_dept":"psyc","courses_id":"508","maxAvg":90.44},{"courses_dept":"math","courses_id":"440","maxAvg":90.43},{"courses_dept":"phar","courses_id":"518","maxAvg":90.43},{"courses_dept":"dent","courses_id":"555","maxAvg":90.42},{"courses_dept":"eosc","courses_id":"510","maxAvg":90.4},{"courses_dept":"thtr","courses_id":"456","maxAvg":90.39},{"courses_dept":"micb","courses_id":"407","maxAvg":90.39},{"courses_dept":"cons","courses_id":"101","maxAvg":90.39},{"courses_dept":"civl","courses_id":"441","maxAvg":90.39},{"courses_dept":"audi","courses_id":"524","maxAvg":90.38},{"courses_dept":"spph","courses_id":"531","maxAvg":90.38},{"courses_dept":"lled","courses_id":"602","maxAvg":90.33},{"courses_dept":"eosc","courses_id":"536","maxAvg":90.33},{"courses_dept":"psyc","courses_id":"449","maxAvg":90.33},{"courses_dept":"obst","courses_id":"506","maxAvg":90.33},{"courses_dept":"phil","courses_id":"487","maxAvg":90.33},{"courses_dept":"hgse","courses_id":"350","maxAvg":90.33},{"courses_dept":"eosc","courses_id":"511","maxAvg":90.33},{"courses_dept":"eece","courses_id":"565","maxAvg":90.33},{"courses_dept":"bioc","courses_id":"509","maxAvg":90.33},{"courses_dept":"epse","courses_id":"481","maxAvg":90.32},{"courses_dept":"kin","courses_id":"570","maxAvg":90.29},{"courses_dept":"gsat","courses_id":"502","maxAvg":90.29},{"courses_dept":"spph","courses_id":"520","maxAvg":90.29},{"courses_dept":"libe","courses_id":"465","maxAvg":90.29},{"courses_dept":"stat","courses_id":"550","maxAvg":90.29},{"courses_dept":"sans","courses_id":"200","maxAvg":90.29},{"courses_dept":"civl","courses_id":"440","maxAvg":90.26},{"courses_dept":"phar","courses_id":"315","maxAvg":90.26},{"courses_dept":"phys","courses_id":"109","maxAvg":90.25},{"courses_dept":"dent","courses_id":"578","maxAvg":90.25},{"courses_dept":"path","courses_id":"407","maxAvg":90.25},{"courses_dept":"pcth","courses_id":"502","maxAvg":90.25},{"courses_dept":"math","courses_id":"217","maxAvg":90.25},{"courses_dept":"math","courses_id":"559","maxAvg":90.24},{"courses_dept":"edcp","courses_id":"305","maxAvg":90.24},{"courses_dept":"bams","courses_id":"500","maxAvg":90.23},{"courses_dept":"civl","courses_id":"436","maxAvg":90.22},{"courses_dept":"cons","courses_id":"370","maxAvg":90.21},{"courses_dept":"econ","courses_id":"546","maxAvg":90.21},{"courses_dept":"eosc","courses_id":"526","maxAvg":90.2},{"courses_dept":"civl","courses_id":"526","maxAvg":90.2},{"courses_dept":"eosc","courses_id":"512","maxAvg":90.2},{"courses_dept":"kin","courses_id":"375","maxAvg":90.19},{"courses_dept":"musc","courses_id":"164","maxAvg":90.19},{"courses_dept":"frst","courses_id":"534","maxAvg":90.18},{"courses_dept":"adhe","courses_id":"412","maxAvg":90.18},{"courses_dept":"mech","courses_id":"545","maxAvg":90.17},{"courses_dept":"thtr","courses_id":"410","maxAvg":90.14},{"courses_dept":"mtrl","courses_id":"594","maxAvg":90.14},{"courses_dept":"sowk","courses_id":"416","maxAvg":90.13},{"courses_dept":"frst","courses_id":"411","maxAvg":90.13},{"courses_dept":"audi","courses_id":"583","maxAvg":90.12},{"courses_dept":"civl","courses_id":"301","maxAvg":90.11},{"courses_dept":"edst","courses_id":"575","maxAvg":90.11},{"courses_dept":"sowk","courses_id":"451","maxAvg":90.09},{"courses_dept":"dhyg","courses_id":"402","maxAvg":90.08},{"courses_dept":"musc","courses_id":"535","maxAvg":90.08},{"courses_dept":"plan","courses_id":"580","maxAvg":90.08},{"courses_dept":"civl","courses_id":"581","maxAvg":90.06},{"courses_dept":"nurs","courses_id":"505","maxAvg":90.06},{"courses_dept":"edst","courses_id":"503","maxAvg":90.06},{"courses_dept":"dent","courses_id":"527","maxAvg":90},{"courses_dept":"dent","courses_id":"525","maxAvg":90},{"courses_dept":"rhsc","courses_id":"507","maxAvg":90},{"courses_dept":"port","courses_id":"110","maxAvg":90},{"courses_dept":"sowk","courses_id":"601","maxAvg":90},{"courses_dept":"geog","courses_id":"599","maxAvg":90},{"courses_dept":"eece","courses_id":"584","maxAvg":90},{"courses_dept":"germ","courses_id":"313","maxAvg":90},{"courses_dept":"sts","courses_id":"597","maxAvg":90},{"courses_dept":"dent","courses_id":"565","maxAvg":90},{"courses_dept":"edcp","courses_id":"566","maxAvg":90},{"courses_dept":"civl","courses_id":"540","maxAvg":90},{"courses_dept":"grsj","courses_id":"502","maxAvg":90},{"courses_dept":"midw","courses_id":"430","maxAvg":90},{"courses_dept":"libr","courses_id":"597","maxAvg":90},{"courses_dept":"ling","courses_id":"532","maxAvg":90},{"courses_dept":"chem","courses_id":"407","maxAvg":90},{"courses_dept":"edst","courses_id":"548","maxAvg":90},{"courses_dept":"frst","courses_id":"503","maxAvg":90},{"courses_dept":"phar","courses_id":"404","maxAvg":90},{"courses_dept":"dent","courses_id":"599","maxAvg":90},{"courses_dept":"math","courses_id":"423","maxAvg":90},{"courses_dept":"plan","courses_id":"603","maxAvg":90},{"courses_dept":"dent","courses_id":"724","maxAvg":90},{"courses_dept":"path","courses_id":"451","maxAvg":90},{"courses_dept":"econ","courses_id":"531","maxAvg":90},{"courses_dept":"arst","courses_id":"591","maxAvg":90},{"courses_dept":"arch","courses_id":"598","maxAvg":90},{"courses_dept":"mine","courses_id":"597","maxAvg":90},{"courses_dept":"ital","courses_id":"401","maxAvg":90},{"courses_dept":"micb","courses_id":"406","maxAvg":89.95},{"courses_dept":"etec","courses_id":"520","maxAvg":89.93},{"courses_dept":"jrnl","courses_id":"533","maxAvg":89.93},{"courses_dept":"medg","courses_id":"545","maxAvg":89.92},{"courses_dept":"name","courses_id":"522","maxAvg":89.92},{"courses_dept":"edcp","courses_id":"303","maxAvg":89.9},{"courses_dept":"civl","courses_id":"504","maxAvg":89.89},{"courses_dept":"math","courses_id":"418","maxAvg":89.89},{"courses_dept":"biof","courses_id":"540","maxAvg":89.88},{"courses_dept":"frst","courses_id":"516","maxAvg":89.86},{"courses_dept":"audi","courses_id":"563","maxAvg":89.83},{"courses_dept":"thtr","courses_id":"407","maxAvg":89.83},{"courses_dept":"biol","courses_id":"437","maxAvg":89.82},{"courses_dept":"fipr","courses_id":"433","maxAvg":89.81},{"courses_dept":"cell","courses_id":"502","maxAvg":89.8},{"courses_dept":"caps","courses_id":"430","maxAvg":89.8},{"courses_dept":"nurs","courses_id":"549","maxAvg":89.78},{"courses_dept":"spha","courses_id":"502","maxAvg":89.76},{"courses_dept":"midw","courses_id":"102","maxAvg":89.76},{"courses_dept":"caps","courses_id":"449","maxAvg":89.75},{"courses_dept":"eosc","courses_id":"532","maxAvg":89.75},{"courses_dept":"stat","courses_id":"461","maxAvg":89.75},{"courses_dept":"cpsc","courses_id":"543","maxAvg":89.75},{"courses_dept":"civl","courses_id":"509","maxAvg":89.75},{"courses_dept":"port","courses_id":"308","maxAvg":89.75},{"courses_dept":"mine","courses_id":"598","maxAvg":89.75},{"courses_dept":"midw","courses_id":"205","maxAvg":89.75},{"courses_dept":"soil","courses_id":"516","maxAvg":89.75},{"courses_dept":"econ","courses_id":"626","maxAvg":89.74},{"courses_dept":"audi","courses_id":"572","maxAvg":89.74},{"courses_dept":"fnh","courses_id":"475","maxAvg":89.71},{"courses_dept":"mech","courses_id":"533","maxAvg":89.71},{"courses_dept":"spph","courses_id":"514","maxAvg":89.7},{"courses_dept":"cnps","courses_id":"427","maxAvg":89.7},{"courses_dept":"dent","courses_id":"542","maxAvg":89.69},{"courses_dept":"cics","courses_id":"530","maxAvg":89.68},{"courses_dept":"engl","courses_id":"321","maxAvg":89.68},{"courses_dept":"elec","courses_id":"292","maxAvg":89.68},{"courses_dept":"soil","courses_id":"503","maxAvg":89.67},{"courses_dept":"cell","courses_id":"501","maxAvg":89.67},{"courses_dept":"chem","courses_id":"503","maxAvg":89.67},{"courses_dept":"phys","courses_id":"210","maxAvg":89.65},{"courses_dept":"econ","courses_id":"307","maxAvg":89.64},{"courses_dept":"nurs","courses_id":"530","maxAvg":89.63},{"courses_dept":"musc","courses_id":"557","maxAvg":89.63},{"courses_dept":"biol","courses_id":"428","maxAvg":89.62},{"courses_dept":"audi","courses_id":"552","maxAvg":89.62},{"courses_dept":"biol","courses_id":"509","maxAvg":89.6},{"courses_dept":"nurs","courses_id":"508","maxAvg":89.6},{"courses_dept":"psyc","courses_id":"536","maxAvg":89.6},{"courses_dept":"anat","courses_id":"515","maxAvg":89.6},{"courses_dept":"math","courses_id":"427","maxAvg":89.6},{"courses_dept":"cell","courses_id":"510","maxAvg":89.6},{"courses_dept":"frst","courses_id":"546","maxAvg":89.57},{"courses_dept":"plan","courses_id":"542","maxAvg":89.57},{"courses_dept":"audi","courses_id":"518","maxAvg":89.56},{"courses_dept":"elec","courses_id":"494","maxAvg":89.54},{"courses_dept":"econ","courses_id":"499","maxAvg":89.54},{"courses_dept":"russ","courses_id":"400","maxAvg":89.54},{"courses_dept":"spph","courses_id":"411","maxAvg":89.53},{"courses_dept":"fipr","courses_id":"338","maxAvg":89.52},{"courses_dept":"adhe","courses_id":"327","maxAvg":89.51},{"courses_dept":"comm","courses_id":"466","maxAvg":89.5},{"courses_dept":"dent","courses_id":"574","maxAvg":89.5},{"courses_dept":"psyc","courses_id":"591","maxAvg":89.5},{"courses_dept":"bmeg","courses_id":"500","maxAvg":89.5},{"courses_dept":"medg","courses_id":"550","maxAvg":89.5},{"courses_dept":"chbe","courses_id":"561","maxAvg":89.5},{"courses_dept":"frst","courses_id":"529","maxAvg":89.5},{"courses_dept":"apbi","courses_id":"499","maxAvg":89.5},{"courses_dept":"eosc","courses_id":"454","maxAvg":89.5},{"courses_dept":"eosc","courses_id":"578","maxAvg":89.5},{"courses_dept":"udes","courses_id":"505","maxAvg":89.5},{"courses_dept":"eece","courses_id":"595","maxAvg":89.47},{"courses_dept":"midw","courses_id":"310","maxAvg":89.46},{"courses_dept":"libr","courses_id":"574","maxAvg":89.45},{"courses_dept":"nurs","courses_id":"570","maxAvg":89.43},{"courses_dept":"bafi","courses_id":"516","maxAvg":89.43},{"courses_dept":"cnto","courses_id":"303","maxAvg":89.42},{"courses_dept":"etec","courses_id":"522","maxAvg":89.41},{"courses_dept":"micb","courses_id":"412","maxAvg":89.4},{"courses_dept":"mrne","courses_id":"480","maxAvg":89.4},{"courses_dept":"audi","courses_id":"581","maxAvg":89.39},{"courses_dept":"caps","courses_id":"423","maxAvg":89.38},{"courses_dept":"spph","courses_id":"502","maxAvg":89.37},{"courses_dept":"arch","courses_id":"411","maxAvg":89.35},{"courses_dept":"cogs","courses_id":"402","maxAvg":89.33},{"courses_dept":"mech","courses_id":"514","maxAvg":89.33},{"courses_dept":"mech","courses_id":"439","maxAvg":89.33},{"courses_dept":"mech","courses_id":"502","maxAvg":89.33},{"courses_dept":"educ","courses_id":"140","maxAvg":89.33},{"courses_dept":"chbe","courses_id":"554","maxAvg":89.33},{"courses_dept":"fipr","courses_id":"339","maxAvg":89.33},{"courses_dept":"midw","courses_id":"104","maxAvg":89.33},{"courses_dept":"psyc","courses_id":"523","maxAvg":89.33},{"courses_dept":"ccst","courses_id":"500","maxAvg":89.31},{"courses_dept":"lfs","courses_id":"252","maxAvg":89.3},{"courses_dept":"ling","courses_id":"452","maxAvg":89.3},{"courses_dept":"apbi","courses_id":"265","maxAvg":89.29},{"courses_dept":"mine","courses_id":"582","maxAvg":89.29},{"courses_dept":"spph","courses_id":"563","maxAvg":89.29},{"courses_dept":"bafi","courses_id":"532","maxAvg":89.27},{"courses_dept":"frst","courses_id":"547","maxAvg":89.27},{"courses_dept":"dani","courses_id":"100","maxAvg":89.27},{"courses_dept":"phar","courses_id":"371","maxAvg":89.26},{"courses_dept":"eece","courses_id":"553","maxAvg":89.25},{"courses_dept":"pers","courses_id":"104","maxAvg":89.25},{"courses_dept":"econ","courses_id":"566","maxAvg":89.25},{"courses_dept":"psyc","courses_id":"594","maxAvg":89.25},{"courses_dept":"arch","courses_id":"540","maxAvg":89.25},{"courses_dept":"stat","courses_id":"450","maxAvg":89.25},{"courses_dept":"plan","courses_id":"602","maxAvg":89.25},{"courses_dept":"rmes","courses_id":"599","maxAvg":89.25},{"courses_dept":"educ","courses_id":"211","maxAvg":89.25},{"courses_dept":"cnps","courses_id":"364","maxAvg":89.25},{"courses_dept":"dent","courses_id":"531","maxAvg":89.25},{"courses_dept":"udes","courses_id":"502","maxAvg":89.23},{"courses_dept":"spph","courses_id":"513","maxAvg":89.23},{"courses_dept":"mech","courses_id":"459","maxAvg":89.22},{"courses_dept":"pers","courses_id":"300","maxAvg":89.2},{"courses_dept":"phth","courses_id":"544","maxAvg":89.2},{"courses_dept":"rmes","courses_id":"520","maxAvg":89.2},{"courses_dept":"lled","courses_id":"577","maxAvg":89.2},{"courses_dept":"micb","courses_id":"507","maxAvg":89.18},{"courses_dept":"epse","courses_id":"536","maxAvg":89.18},{"courses_dept":"eosc","courses_id":"550","maxAvg":89.17},{"courses_dept":"mrne","courses_id":"437","maxAvg":89.17},{"courses_dept":"nurs","courses_id":"596","maxAvg":89.17},{"courses_dept":"pcth","courses_id":"400","maxAvg":89.17},{"courses_dept":"envr","courses_id":"449","maxAvg":89.17},{"courses_dept":"midw","courses_id":"105","maxAvg":89.15},{"courses_dept":"obst","courses_id":"501","maxAvg":89.14},{"courses_dept":"bioc","courses_id":"420","maxAvg":89.14},{"courses_dept":"chem","courses_id":"573","maxAvg":89.14},{"courses_dept":"cnrs","courses_id":"500","maxAvg":89.13},{"courses_dept":"grsj","courses_id":"501","maxAvg":89.13},{"courses_dept":"frst","courses_id":"302","maxAvg":89.12},{"courses_dept":"edcp","courses_id":"210","maxAvg":89.11},{"courses_dept":"cpsc","courses_id":"513","maxAvg":89.09},{"courses_dept":"punj","courses_id":"102","maxAvg":89.08},{"courses_dept":"igen","courses_id":"430","maxAvg":89.06},{"courses_dept":"chbe","courses_id":"364","maxAvg":89.05},{"courses_dept":"eece","courses_id":"564","maxAvg":89},{"courses_dept":"edst","courses_id":"535","maxAvg":89},{"courses_dept":"visa","courses_id":"582","maxAvg":89},{"courses_dept":"phar","courses_id":"554","maxAvg":89},{"courses_dept":"grsj","courses_id":"500","maxAvg":89},{"courses_dept":"span","courses_id":"301","maxAvg":89},{"courses_dept":"civl","courses_id":"447","maxAvg":89},{"courses_dept":"dent","courses_id":"596","maxAvg":89},{"courses_dept":"ling","courses_id":"531","maxAvg":89},{"courses_dept":"wood","courses_id":"244","maxAvg":89},{"courses_dept":"arst","courses_id":"555","maxAvg":89},{"courses_dept":"chem","courses_id":"524","maxAvg":89},{"courses_dept":"atsc","courses_id":"406","maxAvg":89},{"courses_dept":"econ","courses_id":"567","maxAvg":89},{"courses_dept":"germ","courses_id":"110","maxAvg":89},{"courses_dept":"dani","courses_id":"200","maxAvg":89},{"courses_dept":"ling","courses_id":"518","maxAvg":89},{"courses_dept":"biol","courses_id":"530","maxAvg":89},{"courses_dept":"apsc","courses_id":"486","maxAvg":88.94},{"courses_dept":"sowk","courses_id":"335","maxAvg":88.94},{"courses_dept":"gpp","courses_id":"503","maxAvg":88.92},{"courses_dept":"biol","courses_id":"345","maxAvg":88.91},{"courses_dept":"phys","courses_id":"449","maxAvg":88.89},{"courses_dept":"musc","courses_id":"529","maxAvg":88.89},{"courses_dept":"fipr","courses_id":"233","maxAvg":88.89},{"courses_dept":"babs","courses_id":"540","maxAvg":88.88},{"courses_dept":"edcp","courses_id":"537","maxAvg":88.88},{"courses_dept":"phar","courses_id":"508","maxAvg":88.88},{"courses_dept":"busi","courses_id":"451","maxAvg":88.88},{"courses_dept":"audi","courses_id":"516","maxAvg":88.88},{"courses_dept":"mine","courses_id":"350","maxAvg":88.86},{"courses_dept":"caps","courses_id":"303","maxAvg":88.86},{"courses_dept":"spph","courses_id":"503","maxAvg":88.85},{"courses_dept":"spph","courses_id":"534","maxAvg":88.83},{"courses_dept":"ling","courses_id":"520","maxAvg":88.83},{"courses_dept":"stat","courses_id":"561","maxAvg":88.83},{"courses_dept":"biol","courses_id":"535","maxAvg":88.83},{"courses_dept":"civl","courses_id":"562","maxAvg":88.83},{"courses_dept":"educ","courses_id":"240","maxAvg":88.83},{"courses_dept":"epse","courses_id":"503","maxAvg":88.82},{"courses_dept":"arst","courses_id":"540","maxAvg":88.82},{"courses_dept":"path","courses_id":"402","maxAvg":88.81},{"courses_dept":"mine","courses_id":"493","maxAvg":88.81},{"courses_dept":"musc","courses_id":"149","maxAvg":88.8},{"courses_dept":"math","courses_id":"419","maxAvg":88.8},{"courses_dept":"chem","courses_id":"401","maxAvg":88.8},{"courses_dept":"ling","courses_id":"449","maxAvg":88.8},{"courses_dept":"econ","courses_id":"602","maxAvg":88.78},{"courses_dept":"rsot","courses_id":"553","maxAvg":88.78},{"courses_dept":"phth","courses_id":"511","maxAvg":88.76},{"courses_dept":"civl","courses_id":"445","maxAvg":88.76},{"courses_dept":"frst","courses_id":"519","maxAvg":88.75},{"courses_dept":"musc","courses_id":"235","maxAvg":88.75},{"courses_dept":"dent","courses_id":"528","maxAvg":88.75},{"courses_dept":"eosc","courses_id":"540","maxAvg":88.75},{"courses_dept":"eosc","courses_id":"514","maxAvg":88.75},{"courses_dept":"musc","courses_id":"436","maxAvg":88.73},{"courses_dept":"civl","courses_id":"522","maxAvg":88.73},{"courses_dept":"gsat","courses_id":"501","maxAvg":88.73},{"courses_dept":"soci","courses_id":"503","maxAvg":88.71},{"courses_dept":"nurs","courses_id":"599","maxAvg":88.71},{"courses_dept":"soci","courses_id":"501","maxAvg":88.7},{"courses_dept":"rsot","courses_id":"547","maxAvg":88.68},{"courses_dept":"phar","courses_id":"330","maxAvg":88.68},{"courses_dept":"musc","courses_id":"311","maxAvg":88.68},{"courses_dept":"cpsc","courses_id":"547","maxAvg":88.68},{"courses_dept":"anth","courses_id":"516","maxAvg":88.67},{"courses_dept":"rsot","courses_id":"519","maxAvg":88.67},{"courses_dept":"libr","courses_id":"594","maxAvg":88.67},{"courses_dept":"surg","courses_id":"512","maxAvg":88.67},{"courses_dept":"engl","courses_id":"225","maxAvg":88.65},{"courses_dept":"nurs","courses_id":"344","maxAvg":88.65},{"courses_dept":"chem","courses_id":"527","maxAvg":88.64},{"courses_dept":"bafi","courses_id":"502","maxAvg":88.64},{"courses_dept":"rsot","courses_id":"515","maxAvg":88.63},{"courses_dept":"cell","courses_id":"511","maxAvg":88.63},{"courses_dept":"arth","courses_id":"571","maxAvg":88.63},{"courses_dept":"edst","courses_id":"544","maxAvg":88.62},{"courses_dept":"frst","courses_id":"309","maxAvg":88.6},{"courses_dept":"pcth","courses_id":"404","maxAvg":88.6},{"courses_dept":"biol","courses_id":"501","maxAvg":88.6},{"courses_dept":"math","courses_id":"437","maxAvg":88.6},{"courses_dept":"comm","courses_id":"525","maxAvg":88.6},{"courses_dept":"bafi","courses_id":"520","maxAvg":88.58},{"courses_dept":"thtr","courses_id":"474","maxAvg":88.57},{"courses_dept":"thtr","courses_id":"472","maxAvg":88.57},{"courses_dept":"ling","courses_id":"432","maxAvg":88.57},{"courses_dept":"phar","courses_id":"461","maxAvg":88.54},{"courses_dept":"libe","courses_id":"461","maxAvg":88.52},{"courses_dept":"lfs","courses_id":"501","maxAvg":88.5},{"courses_dept":"port","courses_id":"301","maxAvg":88.5},{"courses_dept":"cons","courses_id":"498","maxAvg":88.5},{"courses_dept":"hist","courses_id":"699","maxAvg":88.5},{"courses_dept":"fren","courses_id":"215","maxAvg":88.5},{"courses_dept":"dent","courses_id":"567","maxAvg":88.5},{"courses_dept":"civl","courses_id":"570","maxAvg":88.5},{"courses_dept":"medi","courses_id":"530","maxAvg":88.5},{"courses_dept":"fish","courses_id":"520","maxAvg":88.5},{"courses_dept":"civl","courses_id":"537","maxAvg":88.48},{"courses_dept":"rmes","courses_id":"550","maxAvg":88.47},{"courses_dept":"spha","courses_id":"557","maxAvg":88.47},{"courses_dept":"fre","courses_id":"490","maxAvg":88.47},{"courses_dept":"libr","courses_id":"534","maxAvg":88.45},{"courses_dept":"russ","courses_id":"316","maxAvg":88.45},{"courses_dept":"visa","courses_id":"370","maxAvg":88.45},{"courses_dept":"nurs","courses_id":"304","maxAvg":88.44},{"courses_dept":"civl","courses_id":"523","maxAvg":88.44},{"courses_dept":"lled","courses_id":"557","maxAvg":88.44},{"courses_dept":"edcp","courses_id":"304","maxAvg":88.43},{"courses_dept":"mtrl","courses_id":"489","maxAvg":88.42},{"courses_dept":"audi","courses_id":"527","maxAvg":88.41},{"courses_dept":"edst","courses_id":"509","maxAvg":88.41},{"courses_dept":"plan","courses_id":"509","maxAvg":88.41},{"courses_dept":"econ","courses_id":"600","maxAvg":88.4},{"courses_dept":"sts","courses_id":"502","maxAvg":88.4},{"courses_dept":"spph","courses_id":"562","maxAvg":88.4},{"courses_dept":"kin","courses_id":"343","maxAvg":88.4},{"courses_dept":"clst","courses_id":"502","maxAvg":88.4},{"courses_dept":"mtrl","courses_id":"571","maxAvg":88.4},{"courses_dept":"bafi","courses_id":"500","maxAvg":88.39},{"courses_dept":"cpsc","courses_id":"319","maxAvg":88.39},{"courses_dept":"nurs","courses_id":"511","maxAvg":88.39},{"courses_dept":"anth","courses_id":"528","maxAvg":88.38},{"courses_dept":"mech","courses_id":"520","maxAvg":88.38},{"courses_dept":"nurs","courses_id":"339","maxAvg":88.36},{"courses_dept":"mtrl","courses_id":"359","maxAvg":88.36},{"courses_dept":"thtr","courses_id":"452","maxAvg":88.36},{"courses_dept":"biol","courses_id":"458","maxAvg":88.33},{"courses_dept":"econ","courses_id":"327","maxAvg":88.33},{"courses_dept":"visa","courses_id":"581","maxAvg":88.33},{"courses_dept":"mrne","courses_id":"425","maxAvg":88.33},{"courses_dept":"lled","courses_id":"552","maxAvg":88.33},{"courses_dept":"epse","courses_id":"348","maxAvg":88.32},{"courses_dept":"grsj","courses_id":"320","maxAvg":88.32},{"courses_dept":"caps","courses_id":"422","maxAvg":88.31},{"courses_dept":"pols","courses_id":"424","maxAvg":88.3},{"courses_dept":"food","courses_id":"521","maxAvg":88.29},{"courses_dept":"phil","courses_id":"585","maxAvg":88.29},{"courses_dept":"frst","courses_id":"512","maxAvg":88.29},{"courses_dept":"phth","courses_id":"527","maxAvg":88.28},{"courses_dept":"rsot","courses_id":"525","maxAvg":88.28},{"courses_dept":"econ","courses_id":"514","maxAvg":88.27},{"courses_dept":"name","courses_id":"591","maxAvg":88.27},{"courses_dept":"rmes","courses_id":"505","maxAvg":88.25},{"courses_dept":"port","courses_id":"210","maxAvg":88.25},{"courses_dept":"anth","courses_id":"517","maxAvg":88.25},{"courses_dept":"thtr","courses_id":"405","maxAvg":88.25},{"courses_dept":"germ","courses_id":"210","maxAvg":88.24},{"courses_dept":"spph","courses_id":"302","maxAvg":88.24},{"courses_dept":"chbe","courses_id":"492","maxAvg":88.22},{"courses_dept":"germ","courses_id":"100","maxAvg":88.21},{"courses_dept":"arst","courses_id":"554","maxAvg":88.2},{"courses_dept":"bioc","courses_id":"514","maxAvg":88.2},{"courses_dept":"bioc","courses_id":"460","maxAvg":88.19},{"courses_dept":"comm","courses_id":"693","maxAvg":88.18},{"courses_dept":"geob","courses_id":"501","maxAvg":88.17},{"courses_dept":"mech","courses_id":"572","maxAvg":88.17},{"courses_dept":"chem","courses_id":"563","maxAvg":88.17},{"courses_dept":"civl","courses_id":"493","maxAvg":88.15},{"courses_dept":"libr","courses_id":"580","maxAvg":88.14},{"courses_dept":"musc","courses_id":"167","maxAvg":88.13},{"courses_dept":"phar","courses_id":"501","maxAvg":88.13},{"courses_dept":"hunu","courses_id":"500","maxAvg":88.13},{"courses_dept":"fre","courses_id":"515","maxAvg":88.13},{"courses_dept":"sowk","courses_id":"320","maxAvg":88.11},{"courses_dept":"phys","courses_id":"229","maxAvg":88.05},{"courses_dept":"fipr","courses_id":"330","maxAvg":88.05},{"courses_dept":"germ","courses_id":"200","maxAvg":88.04},{"courses_dept":"bmeg","courses_id":"556","maxAvg":88.04},{"courses_dept":"libr","courses_id":"504","maxAvg":88.03},{"courses_dept":"rsot","courses_id":"511","maxAvg":88.02},{"courses_dept":"rmes","courses_id":"502","maxAvg":88},{"courses_dept":"dent","courses_id":"543","maxAvg":88},{"courses_dept":"sowk","courses_id":"531","maxAvg":88},{"courses_dept":"eosc","courses_id":"449","maxAvg":88},{"courses_dept":"cpsc","courses_id":"544","maxAvg":88},{"courses_dept":"eosc","courses_id":"547","maxAvg":88},{"courses_dept":"dent","courses_id":"570","maxAvg":88},{"courses_dept":"cpsc","courses_id":"509","maxAvg":88},{"courses_dept":"spph","courses_id":"533","maxAvg":88},{"courses_dept":"arch","courses_id":"501","maxAvg":88},{"courses_dept":"cpsc","courses_id":"301","maxAvg":88},{"courses_dept":"arch","courses_id":"549","maxAvg":88},{"courses_dept":"larc","courses_id":"505","maxAvg":88},{"courses_dept":"path","courses_id":"467","maxAvg":88},{"courses_dept":"eece","courses_id":"573","maxAvg":88},{"courses_dept":"mine","courses_id":"404","maxAvg":88},{"courses_dept":"thtr","courses_id":"473","maxAvg":88},{"courses_dept":"spph","courses_id":"547","maxAvg":88},{"courses_dept":"soci","courses_id":"500","maxAvg":88},{"courses_dept":"bams","courses_id":"521","maxAvg":88},{"courses_dept":"germ","courses_id":"548","maxAvg":88},{"courses_dept":"thtr","courses_id":"471","maxAvg":88},{"courses_dept":"thtr","courses_id":"445","maxAvg":88},{"courses_dept":"russ","courses_id":"101","maxAvg":88},{"courses_dept":"phth","courses_id":"548","maxAvg":87.99},{"courses_dept":"civl","courses_id":"507","maxAvg":87.97},{"courses_dept":"rhsc","courses_id":"420","maxAvg":87.92},{"courses_dept":"isci","courses_id":"360","maxAvg":87.92},{"courses_dept":"mech","courses_id":"510","maxAvg":87.92},{"courses_dept":"frst","courses_id":"270","maxAvg":87.91},{"courses_dept":"bioc","courses_id":"530","maxAvg":87.91},{"courses_dept":"phth","courses_id":"517","maxAvg":87.91},{"courses_dept":"spph","courses_id":"512","maxAvg":87.9},{"courses_dept":"larc","courses_id":"501","maxAvg":87.89},{"courses_dept":"econ","courses_id":"490","maxAvg":87.89},{"courses_dept":"cens","courses_id":"202","maxAvg":87.87},{"courses_dept":"eece","courses_id":"580","maxAvg":87.86},{"courses_dept":"phth","courses_id":"545","maxAvg":87.84},{"courses_dept":"chbe","courses_id":"474","maxAvg":87.84},{"courses_dept":"nurs","courses_id":"334","maxAvg":87.84},{"courses_dept":"aanb","courses_id":"551","maxAvg":87.83},{"courses_dept":"name","courses_id":"578","maxAvg":87.83},{"courses_dept":"frst","courses_id":"498","maxAvg":87.83},{"courses_dept":"span","courses_id":"504","maxAvg":87.83},{"courses_dept":"phys","courses_id":"543","maxAvg":87.83},{"courses_dept":"ccst","courses_id":"501","maxAvg":87.83},{"courses_dept":"fnh","courses_id":"470","maxAvg":87.82},{"courses_dept":"apsc","courses_id":"450","maxAvg":87.81},{"courses_dept":"path","courses_id":"375","maxAvg":87.81},{"courses_dept":"eced","courses_id":"406","maxAvg":87.81},{"courses_dept":"ccst","courses_id":"502","maxAvg":87.8},{"courses_dept":"math","courses_id":"450","maxAvg":87.8},{"courses_dept":"chem","courses_id":"402","maxAvg":87.8},{"courses_dept":"cell","courses_id":"509","maxAvg":87.78},{"courses_dept":"cpsc","courses_id":"521","maxAvg":87.78},{"courses_dept":"micb","courses_id":"447","maxAvg":87.77},{"courses_dept":"soil","courses_id":"502","maxAvg":87.75},{"courses_dept":"frst","courses_id":"508","maxAvg":87.75},{"courses_dept":"chbe","courses_id":"491","maxAvg":87.75},{"courses_dept":"civl","courses_id":"201","maxAvg":87.74},{"courses_dept":"spph","courses_id":"504","maxAvg":87.74},{"courses_dept":"audi","courses_id":"586","maxAvg":87.73},{"courses_dept":"plan","courses_id":"522","maxAvg":87.72},{"courses_dept":"mine","courses_id":"544","maxAvg":87.72},{"courses_dept":"phys","courses_id":"571","maxAvg":87.71},{"courses_dept":"bams","courses_id":"517","maxAvg":87.71},{"courses_dept":"math","courses_id":"227","maxAvg":87.71},{"courses_dept":"cens","courses_id":"307","maxAvg":87.7},{"courses_dept":"bama","courses_id":"506","maxAvg":87.7},{"courses_dept":"mech","courses_id":"467","maxAvg":87.7},{"courses_dept":"nurs","courses_id":"502","maxAvg":87.7},{"courses_dept":"bafi","courses_id":"541","maxAvg":87.69},{"courses_dept":"spha","courses_id":"556","maxAvg":87.69},{"courses_dept":"span","courses_id":"495","maxAvg":87.67},{"courses_dept":"lled","courses_id":"201","maxAvg":87.67},{"courses_dept":"rmes","courses_id":"507","maxAvg":87.67},{"courses_dept":"nurs","courses_id":"512","maxAvg":87.67},{"courses_dept":"ling","courses_id":"508","maxAvg":87.67},{"courses_dept":"mtrl","courses_id":"361","maxAvg":87.67},{"courses_dept":"eosc","courses_id":"534","maxAvg":87.67},{"courses_dept":"mine","courses_id":"491","maxAvg":87.67},{"courses_dept":"micb","courses_id":"404","maxAvg":87.65},{"courses_dept":"math","courses_id":"405","maxAvg":87.64},{"courses_dept":"bafi","courses_id":"513","maxAvg":87.64},{"courses_dept":"caps","courses_id":"424","maxAvg":87.63},{"courses_dept":"kin","courses_id":"465","maxAvg":87.62},{"courses_dept":"spph","courses_id":"505","maxAvg":87.6},{"courses_dept":"apbi","courses_id":"314","maxAvg":87.6},{"courses_dept":"engl","courses_id":"301","maxAvg":87.6},{"courses_dept":"fnh","courses_id":"425","maxAvg":87.6},{"courses_dept":"jrnl","courses_id":"534","maxAvg":87.59},{"courses_dept":"mech","courses_id":"522","maxAvg":87.58},{"courses_dept":"econ","courses_id":"541","maxAvg":87.58},{"courses_dept":"soci","courses_id":"502","maxAvg":87.57},{"courses_dept":"musc","courses_id":"320","maxAvg":87.57},{"courses_dept":"food","courses_id":"529","maxAvg":87.57},{"courses_dept":"eosc","courses_id":"453","maxAvg":87.57},{"courses_dept":"edcp","courses_id":"539","maxAvg":87.56},{"courses_dept":"basm","courses_id":"501","maxAvg":87.56},{"courses_dept":"larc","courses_id":"431","maxAvg":87.56},{"courses_dept":"basm","courses_id":"502","maxAvg":87.55},{"courses_dept":"spph","courses_id":"565","maxAvg":87.53},{"courses_dept":"eece","courses_id":"544","maxAvg":87.53},{"courses_dept":"comm","courses_id":"477","maxAvg":87.51},{"courses_dept":"spha","courses_id":"522","maxAvg":87.51},{"courses_dept":"dent","courses_id":"410","maxAvg":87.51},{"courses_dept":"phys","courses_id":"572","maxAvg":87.5},{"courses_dept":"arch","courses_id":"520","maxAvg":87.5},{"courses_dept":"rhsc","courses_id":"585","maxAvg":87.5},{"courses_dept":"frst","courses_id":"557","maxAvg":87.5},{"courses_dept":"mech","courses_id":"563","maxAvg":87.5},{"courses_dept":"iar","courses_id":"520","maxAvg":87.5},{"courses_dept":"nest","courses_id":"505","maxAvg":87.5},{"courses_dept":"fnel","courses_id":"201","maxAvg":87.5},{"courses_dept":"chbe","courses_id":"452","maxAvg":87.5},{"courses_dept":"medg","courses_id":"421","maxAvg":87.47},{"courses_dept":"lfs","courses_id":"450","maxAvg":87.46},{"courses_dept":"audi","courses_id":"569","maxAvg":87.45},{"courses_dept":"eced","courses_id":"440","maxAvg":87.45},{"courses_dept":"sowk","courses_id":"337","maxAvg":87.45},{"courses_dept":"germ","courses_id":"325","maxAvg":87.43},{"courses_dept":"spph","courses_id":"541","maxAvg":87.43},{"courses_dept":"musc","courses_id":"415","maxAvg":87.4},{"courses_dept":"ling","courses_id":"510","maxAvg":87.4},{"courses_dept":"lled","courses_id":"479","maxAvg":87.39},{"courses_dept":"spph","courses_id":"542","maxAvg":87.39},{"courses_dept":"civl","courses_id":"402","maxAvg":87.39},{"courses_dept":"engl","courses_id":"489","maxAvg":87.38},{"courses_dept":"rsot","courses_id":"549","maxAvg":87.38},{"courses_dept":"musc","courses_id":"312","maxAvg":87.36},{"courses_dept":"mech","courses_id":"479","maxAvg":87.35},{"courses_dept":"biof","courses_id":"599","maxAvg":87.33},{"courses_dept":"dent","courses_id":"573","maxAvg":87.33},{"courses_dept":"chbe","courses_id":"494","maxAvg":87.33},{"courses_dept":"mech","courses_id":"505","maxAvg":87.33},{"courses_dept":"geog","courses_id":"535","maxAvg":87.33},{"courses_dept":"fre","courses_id":"525","maxAvg":87.32},{"courses_dept":"elec","courses_id":"492","maxAvg":87.32},{"courses_dept":"fipr","courses_id":"437","maxAvg":87.31},{"courses_dept":"hist","courses_id":"560","maxAvg":87.29},{"courses_dept":"envr","courses_id":"400","maxAvg":87.29},{"courses_dept":"libr","courses_id":"535","maxAvg":87.29},{"courses_dept":"germ","courses_id":"411","maxAvg":87.27},{"courses_dept":"geog","courses_id":"520","maxAvg":87.27},{"courses_dept":"chbe","courses_id":"486","maxAvg":87.27},{"courses_dept":"micb","courses_id":"353","maxAvg":87.26},{"courses_dept":"biol","courses_id":"430","maxAvg":87.25},{"courses_dept":"obst","courses_id":"502","maxAvg":87.25},{"courses_dept":"ba","courses_id":"562","maxAvg":87.24},{"courses_dept":"phth","courses_id":"565","maxAvg":87.23},{"courses_dept":"civl","courses_id":"415","maxAvg":87.22},{"courses_dept":"epse","courses_id":"576","maxAvg":87.21},{"courses_dept":"chbe","courses_id":"362","maxAvg":87.2},{"courses_dept":"chbe","courses_id":"243","maxAvg":87.2},{"courses_dept":"pers","courses_id":"100","maxAvg":87.2},{"courses_dept":"sts","courses_id":"501","maxAvg":87.2},{"courses_dept":"mine","courses_id":"520","maxAvg":87.2},{"courses_dept":"pers","courses_id":"101","maxAvg":87.2},{"courses_dept":"sowk","courses_id":"571","maxAvg":87.2},{"courses_dept":"apbi","courses_id":"398","maxAvg":87.2},{"courses_dept":"eece","courses_id":"518","maxAvg":87.18},{"courses_dept":"ends","courses_id":"402","maxAvg":87.17},{"courses_dept":"cell","courses_id":"508","maxAvg":87.17},{"courses_dept":"lled","courses_id":"446","maxAvg":87.17},{"courses_dept":"phar","courses_id":"471","maxAvg":87.17},{"courses_dept":"chem","courses_id":"405","maxAvg":87.17},{"courses_dept":"sowk","courses_id":"516","maxAvg":87.17},{"courses_dept":"frst","courses_id":"558","maxAvg":87.14},{"courses_dept":"adhe","courses_id":"328","maxAvg":87.14},{"courses_dept":"thtr","courses_id":"373","maxAvg":87.13},{"courses_dept":"thtr","courses_id":"371","maxAvg":87.13},{"courses_dept":"baen","courses_id":"502","maxAvg":87.13},{"courses_dept":"audi","courses_id":"556","maxAvg":87.13},{"courses_dept":"libr","courses_id":"528","maxAvg":87.13},{"courses_dept":"crwr","courses_id":"206","maxAvg":87.12},{"courses_dept":"port","courses_id":"202","maxAvg":87.11},{"courses_dept":"comm","courses_id":"437","maxAvg":87.11},{"courses_dept":"biol","courses_id":"445","maxAvg":87.11},{"courses_dept":"stat","courses_id":"406","maxAvg":87.11},{"courses_dept":"dhyg","courses_id":"405","maxAvg":87.1},{"courses_dept":"food","courses_id":"520","maxAvg":87.09},{"courses_dept":"frst","courses_id":"559","maxAvg":87.09},{"courses_dept":"spha","courses_id":"510","maxAvg":87.08},{"courses_dept":"biol","courses_id":"450","maxAvg":87.07},{"courses_dept":"rmes","courses_id":"510","maxAvg":87.07},{"courses_dept":"sowk","courses_id":"503","maxAvg":87.06},{"courses_dept":"musc","courses_id":"131","maxAvg":87.06},{"courses_dept":"phys","courses_id":"319","maxAvg":87.06},{"courses_dept":"arst","courses_id":"545","maxAvg":87.06},{"courses_dept":"comm","courses_id":"371","maxAvg":87.05},{"courses_dept":"psyc","courses_id":"359","maxAvg":87.03},{"courses_dept":"nurs","courses_id":"302","maxAvg":87.02},{"courses_dept":"geob","courses_id":"500","maxAvg":87},{"courses_dept":"libr","courses_id":"557","maxAvg":87},{"courses_dept":"phys","courses_id":"540","maxAvg":87},{"courses_dept":"comm","courses_id":"660","maxAvg":87},{"courses_dept":"fopr","courses_id":"362","maxAvg":87},{"courses_dept":"econ","courses_id":"556","maxAvg":87},{"courses_dept":"mtrl","courses_id":"582","maxAvg":87},{"courses_dept":"comm","courses_id":"311","maxAvg":87},{"courses_dept":"musc","courses_id":"112","maxAvg":87},{"courses_dept":"musc","courses_id":"465","maxAvg":87},{"courses_dept":"larc","courses_id":"511","maxAvg":87},{"courses_dept":"comm","courses_id":"671","maxAvg":87},{"courses_dept":"soil","courses_id":"518","maxAvg":87},{"courses_dept":"dent","courses_id":"595","maxAvg":87},{"courses_dept":"frst","courses_id":"231","maxAvg":87},{"courses_dept":"mine","courses_id":"506","maxAvg":87},{"courses_dept":"mtrl","courses_id":"595","maxAvg":87},{"courses_dept":"econ","courses_id":"550","maxAvg":87},{"courses_dept":"comm","courses_id":"634","maxAvg":87},{"courses_dept":"sowk","courses_id":"450","maxAvg":87},{"courses_dept":"econ","courses_id":"305","maxAvg":87},{"courses_dept":"engl","courses_id":"490","maxAvg":87},{"courses_dept":"chbe","courses_id":"464","maxAvg":86.99},{"courses_dept":"japn","courses_id":"311","maxAvg":86.95},{"courses_dept":"apbi","courses_id":"200","maxAvg":86.95},{"courses_dept":"food","courses_id":"525","maxAvg":86.94},{"courses_dept":"pcth","courses_id":"302","maxAvg":86.93},{"courses_dept":"civl","courses_id":"516","maxAvg":86.92},{"courses_dept":"chbe","courses_id":"573","maxAvg":86.92},{"courses_dept":"sowk","courses_id":"521","maxAvg":86.92},{"courses_dept":"arst","courses_id":"510","maxAvg":86.92},{"courses_dept":"libr","courses_id":"532","maxAvg":86.91},{"courses_dept":"chem","courses_id":"566","maxAvg":86.91},{"courses_dept":"cpen","courses_id":"333","maxAvg":86.9},{"courses_dept":"musc","courses_id":"135","maxAvg":86.9},{"courses_dept":"bafi","courses_id":"530","maxAvg":86.89},{"courses_dept":"bams","courses_id":"522","maxAvg":86.89},{"courses_dept":"fnh","courses_id":"415","maxAvg":86.89},{"courses_dept":"rsot","courses_id":"513","maxAvg":86.87},{"courses_dept":"frst","courses_id":"556","maxAvg":86.87},{"courses_dept":"ceen","courses_id":"523","maxAvg":86.86},{"courses_dept":"comm","courses_id":"389","maxAvg":86.86},{"courses_dept":"plan","courses_id":"508","maxAvg":86.85},{"courses_dept":"comm","courses_id":"695","maxAvg":86.84},{"courses_dept":"frst","courses_id":"551","maxAvg":86.83},{"courses_dept":"mine","courses_id":"552","maxAvg":86.83},{"courses_dept":"bait","courses_id":"527","maxAvg":86.83},{"courses_dept":"eosc","courses_id":"442","maxAvg":86.83},{"courses_dept":"elec","courses_id":"352","maxAvg":86.83},{"courses_dept":"chem","courses_id":"529","maxAvg":86.82},{"courses_dept":"bama","courses_id":"508","maxAvg":86.82},{"courses_dept":"germ","courses_id":"434","maxAvg":86.81},{"courses_dept":"baac","courses_id":"510","maxAvg":86.81},{"courses_dept":"scie","courses_id":"300","maxAvg":86.81},{"courses_dept":"elec","courses_id":"291","maxAvg":86.81},{"courses_dept":"bams","courses_id":"506","maxAvg":86.79},{"courses_dept":"larc","courses_id":"504","maxAvg":86.79},{"courses_dept":"arch","courses_id":"533","maxAvg":86.79},{"courses_dept":"soci","courses_id":"514","maxAvg":86.79},{"courses_dept":"edst","courses_id":"515","maxAvg":86.78},{"courses_dept":"libr","courses_id":"521","maxAvg":86.78},{"courses_dept":"chem","courses_id":"526","maxAvg":86.75},{"courses_dept":"apbi","courses_id":"498","maxAvg":86.75},{"courses_dept":"libr","courses_id":"592","maxAvg":86.75},{"courses_dept":"sowk","courses_id":"654","maxAvg":86.75},{"courses_dept":"frst","courses_id":"430","maxAvg":86.75},{"courses_dept":"phar","courses_id":"515","maxAvg":86.75},{"courses_dept":"math","courses_id":"414","maxAvg":86.73},{"courses_dept":"frst","courses_id":"319","maxAvg":86.73},{"courses_dept":"civl","courses_id":"426","maxAvg":86.73},{"courses_dept":"geog","courses_id":"495","maxAvg":86.72},{"courses_dept":"geog","courses_id":"525","maxAvg":86.71},{"courses_dept":"lais","courses_id":"607","maxAvg":86.71},{"courses_dept":"musc","courses_id":"170","maxAvg":86.7},{"courses_dept":"arst","courses_id":"516","maxAvg":86.7},{"courses_dept":"bahr","courses_id":"508","maxAvg":86.7},{"courses_dept":"arth","courses_id":"480","maxAvg":86.69},{"courses_dept":"larc","courses_id":"503","maxAvg":86.69},{"courses_dept":"germ","courses_id":"410","maxAvg":86.69},{"courses_dept":"libr","courses_id":"505","maxAvg":86.68},{"courses_dept":"libr","courses_id":"516","maxAvg":86.68},{"courses_dept":"civl","courses_id":"410","maxAvg":86.68},{"courses_dept":"math","courses_id":"562","maxAvg":86.67},{"courses_dept":"punj","courses_id":"401","maxAvg":86.67},{"courses_dept":"mech","courses_id":"582","maxAvg":86.67},{"courses_dept":"sowk","courses_id":"310","maxAvg":86.67},{"courses_dept":"bafi","courses_id":"507","maxAvg":86.67},{"courses_dept":"audi","courses_id":"571","maxAvg":86.67},{"courses_dept":"geog","courses_id":"412","maxAvg":86.67},{"courses_dept":"anth","courses_id":"541","maxAvg":86.67},{"courses_dept":"lled","courses_id":"570","maxAvg":86.64},{"courses_dept":"caps","courses_id":"426","maxAvg":86.63},{"courses_dept":"mtrl","courses_id":"557","maxAvg":86.63},{"courses_dept":"gsat","courses_id":"540","maxAvg":86.63},{"courses_dept":"spha","courses_id":"551","maxAvg":86.62},{"courses_dept":"port","courses_id":"101","maxAvg":86.61},{"courses_dept":"eosc","courses_id":"573","maxAvg":86.6},{"courses_dept":"nurs","courses_id":"422","maxAvg":86.6},{"courses_dept":"hist","courses_id":"599","maxAvg":86.6},{"courses_dept":"eosc","courses_id":"538","maxAvg":86.6},{"courses_dept":"bama","courses_id":"514","maxAvg":86.6},{"courses_dept":"law","courses_id":"509","maxAvg":86.6},{"courses_dept":"phar","courses_id":"401","maxAvg":86.6},{"courses_dept":"path","courses_id":"408","maxAvg":86.6},{"courses_dept":"spha","courses_id":"553","maxAvg":86.59},{"courses_dept":"plan","courses_id":"524","maxAvg":86.59},{"courses_dept":"econ","courses_id":"573","maxAvg":86.57},{"courses_dept":"fnh","courses_id":"200","maxAvg":86.57},{"courses_dept":"bioc","courses_id":"421","maxAvg":86.57},{"courses_dept":"phys","courses_id":"159","maxAvg":86.57},{"courses_dept":"spha","courses_id":"542","maxAvg":86.57},{"courses_dept":"caps","courses_id":"421","maxAvg":86.56},{"courses_dept":"plan","courses_id":"525","maxAvg":86.56},{"courses_dept":"elec","courses_id":"371","maxAvg":86.56},{"courses_dept":"arth","courses_id":"436","maxAvg":86.55},{"courses_dept":"fre","courses_id":"547","maxAvg":86.54},{"courses_dept":"libr","courses_id":"551","maxAvg":86.53},{"courses_dept":"chbe","courses_id":"453","maxAvg":86.53},{"courses_dept":"dent","courses_id":"591","maxAvg":86.5},{"courses_dept":"sowk","courses_id":"502","maxAvg":86.5},{"courses_dept":"bmeg","courses_id":"550","maxAvg":86.5},{"courses_dept":"chem","courses_id":"502","maxAvg":86.5},{"courses_dept":"arch","courses_id":"521","maxAvg":86.5},{"courses_dept":"mtrl","courses_id":"579","maxAvg":86.5},{"courses_dept":"bafi","courses_id":"503","maxAvg":86.5},{"courses_dept":"mech","courses_id":"493","maxAvg":86.5},{"courses_dept":"dhyg","courses_id":"433","maxAvg":86.5},{"courses_dept":"phar","courses_id":"462","maxAvg":86.49},{"courses_dept":"cpsc","courses_id":"221","maxAvg":86.47},{"courses_dept":"larc","courses_id":"531","maxAvg":86.47},{"courses_dept":"mech","courses_id":"431","maxAvg":86.47},{"courses_dept":"civl","courses_id":"304","maxAvg":86.45},{"courses_dept":"nurs","courses_id":"425","maxAvg":86.43},{"courses_dept":"rmes","courses_id":"501","maxAvg":86.43},{"courses_dept":"sans","courses_id":"100","maxAvg":86.43},{"courses_dept":"germ","courses_id":"302","maxAvg":86.42},{"courses_dept":"edst","courses_id":"541","maxAvg":86.42},{"courses_dept":"baac","courses_id":"501","maxAvg":86.41},{"courses_dept":"phar","courses_id":"303","maxAvg":86.41},{"courses_dept":"econ","courses_id":"561","maxAvg":86.4},{"courses_dept":"phys","courses_id":"541","maxAvg":86.4},{"courses_dept":"comm","courses_id":"497","maxAvg":86.39},{"courses_dept":"medi","courses_id":"590","maxAvg":86.38},{"courses_dept":"spph","courses_id":"406","maxAvg":86.38},{"courses_dept":"plan","courses_id":"521","maxAvg":86.37},{"courses_dept":"eosc","courses_id":"114","maxAvg":86.37},{"courses_dept":"bahr","courses_id":"505","maxAvg":86.36},{"courses_dept":"pcth","courses_id":"325","maxAvg":86.36},{"courses_dept":"scan","courses_id":"414","maxAvg":86.35},{"courses_dept":"mech","courses_id":"589","maxAvg":86.33},{"courses_dept":"cpsc","courses_id":"500","maxAvg":86.33},{"courses_dept":"biol","courses_id":"415","maxAvg":86.33},{"courses_dept":"medg","courses_id":"575","maxAvg":86.33},{"courses_dept":"eosc","courses_id":"561","maxAvg":86.33},{"courses_dept":"cpen","courses_id":"491","maxAvg":86.32},{"courses_dept":"spha","courses_id":"554","maxAvg":86.31},{"courses_dept":"elec","courses_id":"491","maxAvg":86.31},{"courses_dept":"biol","courses_id":"411","maxAvg":86.31},{"courses_dept":"plan","courses_id":"425","maxAvg":86.3},{"courses_dept":"phar","courses_id":"590","maxAvg":86.29},{"courses_dept":"food","courses_id":"523","maxAvg":86.29},{"courses_dept":"anat","courses_id":"392","maxAvg":86.29},{"courses_dept":"chbe","courses_id":"454","maxAvg":86.29},{"courses_dept":"biol","courses_id":"441","maxAvg":86.28},{"courses_dept":"engl","courses_id":"211","maxAvg":86.27},{"courses_dept":"mech","courses_id":"454","maxAvg":86.27},{"courses_dept":"rmes","courses_id":"530","maxAvg":86.27},{"courses_dept":"nrsc","courses_id":"501","maxAvg":86.26},{"courses_dept":"engl","courses_id":"210","maxAvg":86.26},{"courses_dept":"fren","courses_id":"499","maxAvg":86.25},{"courses_dept":"dent","courses_id":"529","maxAvg":86.25},{"courses_dept":"germ","courses_id":"400","maxAvg":86.25},{"courses_dept":"arch","courses_id":"539","maxAvg":86.25},{"courses_dept":"dent","courses_id":"530","maxAvg":86.25},{"courses_dept":"dent","courses_id":"594","maxAvg":86.25},{"courses_dept":"asia","courses_id":"370","maxAvg":86.24},{"courses_dept":"hgse","courses_id":"356","maxAvg":86.24},{"courses_dept":"edcp","courses_id":"498","maxAvg":86.24},{"courses_dept":"phar","courses_id":"361","maxAvg":86.22},{"courses_dept":"libr","courses_id":"511","maxAvg":86.21},{"courses_dept":"phys","courses_id":"500","maxAvg":86.21},{"courses_dept":"fnh","courses_id":"403","maxAvg":86.21},{"courses_dept":"biol","courses_id":"447","maxAvg":86.2},{"courses_dept":"cpsc","courses_id":"502","maxAvg":86.2},{"courses_dept":"econ","courses_id":"457","maxAvg":86.19},{"courses_dept":"frst","courses_id":"543","maxAvg":86.18},{"courses_dept":"kin","courses_id":"361","maxAvg":86.18},{"courses_dept":"eosc","courses_id":"535","maxAvg":86.18},{"courses_dept":"arch","courses_id":"568","maxAvg":86.17},{"courses_dept":"germ","courses_id":"314","maxAvg":86.17},{"courses_dept":"chbe","courses_id":"457","maxAvg":86.17},{"courses_dept":"larc","courses_id":"316","maxAvg":86.17},{"courses_dept":"nurs","courses_id":"552","maxAvg":86.17},{"courses_dept":"anth","courses_id":"472","maxAvg":86.17},{"courses_dept":"comm","courses_id":"662","maxAvg":86.17},{"courses_dept":"pcth","courses_id":"305","maxAvg":86.17},{"courses_dept":"cpsc","courses_id":"210","maxAvg":86.15},{"courses_dept":"chem","courses_id":"449","maxAvg":86.15},{"courses_dept":"phys","courses_id":"304","maxAvg":86.14},{"courses_dept":"apbi","courses_id":"440","maxAvg":86.14},{"courses_dept":"chin","courses_id":"411","maxAvg":86.13},{"courses_dept":"thtr","courses_id":"130","maxAvg":86.13},{"courses_dept":"musc","courses_id":"336","maxAvg":86.13},{"courses_dept":"dhyg","courses_id":"410","maxAvg":86.12},{"courses_dept":"biol","courses_id":"456","maxAvg":86.12},{"courses_dept":"asia","courses_id":"307","maxAvg":86.11},{"courses_dept":"fnh","courses_id":"355","maxAvg":86.11},{"courses_dept":"comm","courses_id":"408","maxAvg":86.1},{"courses_dept":"comm","courses_id":"388","maxAvg":86.1},{"courses_dept":"biol","courses_id":"404","maxAvg":86.1},{"courses_dept":"econ","courses_id":"502","maxAvg":86.1},{"courses_dept":"engl","courses_id":"112","maxAvg":86.09},{"courses_dept":"libr","courses_id":"531","maxAvg":86.09},{"courses_dept":"sowk","courses_id":"305","maxAvg":86.09},{"courses_dept":"arch","courses_id":"511","maxAvg":86.08},{"courses_dept":"biol","courses_id":"454","maxAvg":86.07},{"courses_dept":"micb","courses_id":"408","maxAvg":86.06},{"courses_dept":"nest","courses_id":"304","maxAvg":86.05},{"courses_dept":"arst","courses_id":"520","maxAvg":86.05},{"courses_dept":"thtr","courses_id":"306","maxAvg":86.05},{"courses_dept":"basc","courses_id":"524","maxAvg":86.04},{"courses_dept":"cpsc","courses_id":"418","maxAvg":86.04},{"courses_dept":"dent","courses_id":"420","maxAvg":86.04},{"courses_dept":"nrsc","courses_id":"500","maxAvg":86.03},{"courses_dept":"civl","courses_id":"518","maxAvg":86.03},{"courses_dept":"comm","courses_id":"474","maxAvg":86.02},{"courses_dept":"fmst","courses_id":"440","maxAvg":86},{"courses_dept":"atsc","courses_id":"212","maxAvg":86},{"courses_dept":"medg","courses_id":"570","maxAvg":86},{"courses_dept":"spph","courses_id":"530","maxAvg":86},{"courses_dept":"poli","courses_id":"492","maxAvg":86},{"courses_dept":"dent","courses_id":"572","maxAvg":86},{"courses_dept":"frst","courses_id":"490","maxAvg":86},{"courses_dept":"spph","courses_id":"511","maxAvg":86},{"courses_dept":"cpsc","courses_id":"411","maxAvg":86},{"courses_dept":"hist","courses_id":"561","maxAvg":86},{"courses_dept":"dent","courses_id":"517","maxAvg":86},{"courses_dept":"comm","courses_id":"672","maxAvg":86},{"courses_dept":"hist","courses_id":"102","maxAvg":86},{"courses_dept":"eece","courses_id":"532","maxAvg":86},{"courses_dept":"baac","courses_id":"500","maxAvg":86},{"courses_dept":"astr","courses_id":"514","maxAvg":86},{"courses_dept":"baen","courses_id":"505","maxAvg":86},{"courses_dept":"thtr","courses_id":"506","maxAvg":86},{"courses_dept":"rsot","courses_id":"545","maxAvg":85.98},{"courses_dept":"mine","courses_id":"432","maxAvg":85.98},{"courses_dept":"mine","courses_id":"224","maxAvg":85.98},{"courses_dept":"econ","courses_id":"374","maxAvg":85.98},{"courses_dept":"spha","courses_id":"563","maxAvg":85.97},{"courses_dept":"eosc","courses_id":"474","maxAvg":85.94},{"courses_dept":"civl","courses_id":"529","maxAvg":85.93},{"courses_dept":"chbe","courses_id":"483","maxAvg":85.93},{"courses_dept":"math","courses_id":"335","maxAvg":85.92},{"courses_dept":"cpen","courses_id":"492","maxAvg":85.92},{"courses_dept":"spha","courses_id":"552","maxAvg":85.92},{"courses_dept":"econ","courses_id":"527","maxAvg":85.91},{"courses_dept":"ceen","courses_id":"503","maxAvg":85.91},{"courses_dept":"arst","courses_id":"515","maxAvg":85.91},{"courses_dept":"spph","courses_id":"535","maxAvg":85.9},{"courses_dept":"nurs","courses_id":"420","maxAvg":85.9},{"courses_dept":"bait","courses_id":"511","maxAvg":85.9},{"courses_dept":"audi","courses_id":"403","maxAvg":85.9},{"courses_dept":"caps","courses_id":"200","maxAvg":85.89},{"courses_dept":"phth","courses_id":"514","maxAvg":85.89},{"courses_dept":"kin","courses_id":"330","maxAvg":85.89},{"courses_dept":"fipr","courses_id":"337","maxAvg":85.88},{"courses_dept":"name","courses_id":"501","maxAvg":85.87},{"courses_dept":"frst","courses_id":"523","maxAvg":85.87},{"courses_dept":"chem","courses_id":"412","maxAvg":85.87},{"courses_dept":"path","courses_id":"406","maxAvg":85.87},{"courses_dept":"comm","courses_id":"377","maxAvg":85.85},{"courses_dept":"eece","courses_id":"566","maxAvg":85.83},{"courses_dept":"geog","courses_id":"485","maxAvg":85.83},{"courses_dept":"phys","courses_id":"516","maxAvg":85.83},{"courses_dept":"phys","courses_id":"119","maxAvg":85.82},{"courses_dept":"chem","courses_id":"300","maxAvg":85.82},{"courses_dept":"mine","courses_id":"515","maxAvg":85.81},{"courses_dept":"envr","courses_id":"420","maxAvg":85.81},{"courses_dept":"ends","courses_id":"301","maxAvg":85.8},{"courses_dept":"frst","courses_id":"576","maxAvg":85.8},{"courses_dept":"eece","courses_id":"528","maxAvg":85.8},{"courses_dept":"germ","courses_id":"433","maxAvg":85.8},{"courses_dept":"phar","courses_id":"543","maxAvg":85.8},{"courses_dept":"frst","courses_id":"408","maxAvg":85.8},{"courses_dept":"mech","courses_id":"226","maxAvg":85.8},{"courses_dept":"bama","courses_id":"541","maxAvg":85.79},{"courses_dept":"civl","courses_id":"521","maxAvg":85.79},{"courses_dept":"comm","courses_id":"335","maxAvg":85.78},{"courses_dept":"econ","courses_id":"325","maxAvg":85.78},{"courses_dept":"phys","courses_id":"565","maxAvg":85.78},{"courses_dept":"edcp","courses_id":"492","maxAvg":85.77},{"courses_dept":"ba","courses_id":"563","maxAvg":85.77},{"courses_dept":"path","courses_id":"501","maxAvg":85.76},{"courses_dept":"busi","courses_id":"470","maxAvg":85.76},{"courses_dept":"chbe","courses_id":"564","maxAvg":85.75},{"courses_dept":"arst","courses_id":"600","maxAvg":85.75},{"courses_dept":"dent","courses_id":"721","maxAvg":85.75},{"courses_dept":"poli","courses_id":"390","maxAvg":85.75},{"courses_dept":"path","courses_id":"405","maxAvg":85.75},{"courses_dept":"atsc","courses_id":"201","maxAvg":85.75},{"courses_dept":"libr","courses_id":"512","maxAvg":85.75},{"courses_dept":"larc","courses_id":"542","maxAvg":85.75},{"courses_dept":"fnh","courses_id":"474","maxAvg":85.74},{"courses_dept":"bama","courses_id":"515","maxAvg":85.73},{"courses_dept":"geog","courses_id":"374","maxAvg":85.72},{"courses_dept":"phth","courses_id":"531","maxAvg":85.72},{"courses_dept":"biol","courses_id":"427","maxAvg":85.71},{"courses_dept":"civl","courses_id":"569","maxAvg":85.71},{"courses_dept":"arch","courses_id":"543","maxAvg":85.71},{"courses_dept":"bioc","courses_id":"404","maxAvg":85.7},{"courses_dept":"enph","courses_id":"479","maxAvg":85.69},{"courses_dept":"larc","courses_id":"595","maxAvg":85.69},{"courses_dept":"epse","courses_id":"577","maxAvg":85.68},{"courses_dept":"fnh","courses_id":"499","maxAvg":85.67},{"courses_dept":"hgse","courses_id":"353","maxAvg":85.67},{"courses_dept":"civl","courses_id":"417","maxAvg":85.67},{"courses_dept":"mech","courses_id":"458","maxAvg":85.66},{"courses_dept":"crwr","courses_id":"213","maxAvg":85.65},{"courses_dept":"ends","courses_id":"420","maxAvg":85.64},{"courses_dept":"phar","courses_id":"399","maxAvg":85.64},{"courses_dept":"phar","courses_id":"342","maxAvg":85.64},{"courses_dept":"punj","courses_id":"300","maxAvg":85.63},{"courses_dept":"arch","courses_id":"512","maxAvg":85.62},{"courses_dept":"bafi","courses_id":"511","maxAvg":85.62},{"courses_dept":"baul","courses_id":"501","maxAvg":85.62},{"courses_dept":"phar","courses_id":"454","maxAvg":85.62},{"courses_dept":"mech","courses_id":"220","maxAvg":85.6},{"courses_dept":"ital","courses_id":"430","maxAvg":85.6},{"courses_dept":"audi","courses_id":"580","maxAvg":85.6},{"courses_dept":"frst","courses_id":"588","maxAvg":85.6},{"courses_dept":"frst","courses_id":"530","maxAvg":85.6},{"courses_dept":"mrne","courses_id":"415","maxAvg":85.6},{"courses_dept":"gpp","courses_id":"504","maxAvg":85.6},{"courses_dept":"ling","courses_id":"405","maxAvg":85.6},{"courses_dept":"musc","courses_id":"141","maxAvg":85.6},{"courses_dept":"igen","courses_id":"452","maxAvg":85.6},{"courses_dept":"musc","courses_id":"349","maxAvg":85.6},{"courses_dept":"eosc","courses_id":"473","maxAvg":85.58},{"courses_dept":"enph","courses_id":"459","maxAvg":85.58},{"courses_dept":"frst","courses_id":"310","maxAvg":85.57},{"courses_dept":"mtrl","courses_id":"381","maxAvg":85.56},{"courses_dept":"path","courses_id":"327","maxAvg":85.54},{"courses_dept":"basc","courses_id":"500","maxAvg":85.53},{"courses_dept":"gpp","courses_id":"509","maxAvg":85.53},{"courses_dept":"basm","courses_id":"531","maxAvg":85.53},{"courses_dept":"law","courses_id":"336","maxAvg":85.53},{"courses_dept":"mech","courses_id":"392","maxAvg":85.51},{"courses_dept":"bama","courses_id":"513","maxAvg":85.5},{"courses_dept":"frst","courses_id":"524","maxAvg":85.5},{"courses_dept":"nurs","courses_id":"335","maxAvg":85.5},{"courses_dept":"chem","courses_id":"416","maxAvg":85.5},{"courses_dept":"ital","courses_id":"402","maxAvg":85.5},{"courses_dept":"cpsc","courses_id":"304","maxAvg":85.5},{"courses_dept":"thtr","courses_id":"520","maxAvg":85.5},{"courses_dept":"baen","courses_id":"510","maxAvg":85.5},{"courses_dept":"ba","courses_id":"511","maxAvg":85.49},{"courses_dept":"phys","courses_id":"117","maxAvg":85.48},{"courses_dept":"arch","courses_id":"548","maxAvg":85.47},{"courses_dept":"econ","courses_id":"601","maxAvg":85.47},{"courses_dept":"biol","courses_id":"413","maxAvg":85.47},{"courses_dept":"apsc","courses_id":"262","maxAvg":85.47},{"courses_dept":"cpsc","courses_id":"110","maxAvg":85.46},{"courses_dept":"musc","courses_id":"313","maxAvg":85.45},{"courses_dept":"lfs","courses_id":"350","maxAvg":85.44},{"courses_dept":"midw","courses_id":"305","maxAvg":85.44},{"courses_dept":"engl","courses_id":"310","maxAvg":85.41},{"courses_dept":"info","courses_id":"250","maxAvg":85.4},{"courses_dept":"dent","courses_id":"566","maxAvg":85.4},{"courses_dept":"law","courses_id":"549","maxAvg":85.4},{"courses_dept":"nurs","courses_id":"337","maxAvg":85.4},{"courses_dept":"bapa","courses_id":"550","maxAvg":85.4},{"courses_dept":"ends","courses_id":"401","maxAvg":85.39},{"courses_dept":"ling","courses_id":"333","maxAvg":85.39},{"courses_dept":"fist","courses_id":"300","maxAvg":85.38},{"courses_dept":"asia","courses_id":"457","maxAvg":85.38},{"courses_dept":"eosc","courses_id":"270","maxAvg":85.38},{"courses_dept":"arth","courses_id":"439","maxAvg":85.38},{"courses_dept":"japn","courses_id":"408","maxAvg":85.37},{"courses_dept":"phth","courses_id":"524","maxAvg":85.37},{"courses_dept":"baen","courses_id":"506","maxAvg":85.36},{"courses_dept":"cons","courses_id":"452","maxAvg":85.33},{"courses_dept":"nurs","courses_id":"333","maxAvg":85.33},{"courses_dept":"apbi","courses_id":"416","maxAvg":85.33},{"courses_dept":"asia","courses_id":"348","maxAvg":85.33},{"courses_dept":"econ","courses_id":"306","maxAvg":85.33},{"courses_dept":"musc","courses_id":"440","maxAvg":85.31},{"courses_dept":"frst","courses_id":"424","maxAvg":85.3},{"courses_dept":"bams","courses_id":"508","maxAvg":85.3},{"courses_dept":"arch","courses_id":"561","maxAvg":85.29},{"courses_dept":"kin","courses_id":"161","maxAvg":85.29},{"courses_dept":"biol","courses_id":"459","maxAvg":85.29},{"courses_dept":"phar","courses_id":"458","maxAvg":85.29},{"courses_dept":"fnh","courses_id":"370","maxAvg":85.29},{"courses_dept":"musc","courses_id":"122","maxAvg":85.28},{"courses_dept":"thtr","courses_id":"372","maxAvg":85.27},{"courses_dept":"thtr","courses_id":"374","maxAvg":85.27},{"courses_dept":"rsot","courses_id":"527","maxAvg":85.27},{"courses_dept":"hgse","courses_id":"358","maxAvg":85.26},{"courses_dept":"food","courses_id":"524","maxAvg":85.25},{"courses_dept":"biol","courses_id":"431","maxAvg":85.25},{"courses_dept":"udes","courses_id":"501","maxAvg":85.25},{"courses_dept":"phar","courses_id":"525","maxAvg":85.25},{"courses_dept":"eece","courses_id":"569","maxAvg":85.23},{"courses_dept":"econ","courses_id":"326","maxAvg":85.23},{"courses_dept":"civl","courses_id":"433","maxAvg":85.22},{"courses_dept":"thtr","courses_id":"320","maxAvg":85.22},{"courses_dept":"soil","courses_id":"501","maxAvg":85.2},{"courses_dept":"nurs","courses_id":"580","maxAvg":85.2},{"courses_dept":"anth","courses_id":"512","maxAvg":85.2},{"courses_dept":"mine","courses_id":"291","maxAvg":85.19},{"courses_dept":"libr","courses_id":"506","maxAvg":85.18},{"courses_dept":"ling","courses_id":"431","maxAvg":85.18},{"courses_dept":"econ","courses_id":"544","maxAvg":85.18},{"courses_dept":"japn","courses_id":"100","maxAvg":85.18},{"courses_dept":"phys","courses_id":"349","maxAvg":85.17},{"courses_dept":"atsc","courses_id":"405","maxAvg":85.17},{"courses_dept":"comm","courses_id":"439","maxAvg":85.17},{"courses_dept":"appp","courses_id":"501","maxAvg":85.16},{"courses_dept":"mech","courses_id":"464","maxAvg":85.15},{"courses_dept":"eosc","courses_id":"424","maxAvg":85.15},{"courses_dept":"apbi","courses_id":"402","maxAvg":85.15},{"courses_dept":"mech","courses_id":"457","maxAvg":85.14},{"courses_dept":"phth","courses_id":"521","maxAvg":85.14},{"courses_dept":"civl","courses_id":"311","maxAvg":85.14},{"courses_dept":"econ","courses_id":"557","maxAvg":85.14},{"courses_dept":"bahr","courses_id":"507","maxAvg":85.14},{"courses_dept":"libr","courses_id":"587","maxAvg":85.13},{"courses_dept":"cpsc","courses_id":"312","maxAvg":85.13},{"courses_dept":"fist","courses_id":"240","maxAvg":85.13},{"courses_dept":"mine","courses_id":"480","maxAvg":85.13},{"courses_dept":"mech","courses_id":"596","maxAvg":85.13},{"courses_dept":"phar","courses_id":"441","maxAvg":85.11},{"courses_dept":"mine","courses_id":"541","maxAvg":85.11},{"courses_dept":"hist","courses_id":"485","maxAvg":85.09},{"courses_dept":"hist","courses_id":"449","maxAvg":85.09},{"courses_dept":"mine","courses_id":"556","maxAvg":85.09},{"courses_dept":"biol","courses_id":"412","maxAvg":85.09},{"courses_dept":"arch","courses_id":"513","maxAvg":85.08},{"courses_dept":"busi","courses_id":"452","maxAvg":85.08},{"courses_dept":"clst","courses_id":"355","maxAvg":85.08},{"courses_dept":"phar","courses_id":"362","maxAvg":85.07},{"courses_dept":"arst","courses_id":"573","maxAvg":85.06},{"courses_dept":"dhyg","courses_id":"106","maxAvg":85.04},{"courses_dept":"mech","courses_id":"484","maxAvg":85.03},{"courses_dept":"nurs","courses_id":"303","maxAvg":85.02},{"courses_dept":"mech","courses_id":"535","maxAvg":85},{"courses_dept":"basm","courses_id":"530","maxAvg":85},{"courses_dept":"chbe","courses_id":"577","maxAvg":85},{"courses_dept":"cnrs","courses_id":"449","maxAvg":85},{"courses_dept":"lled","courses_id":"200","maxAvg":85},{"courses_dept":"gbpr","courses_id":"501","maxAvg":85},{"courses_dept":"econ","courses_id":"406","maxAvg":85},{"courses_dept":"civl","courses_id":"565","maxAvg":85},{"courses_dept":"chem","courses_id":"435","maxAvg":85},{"courses_dept":"dent","courses_id":"516","maxAvg":85},{"courses_dept":"civl","courses_id":"478","maxAvg":84.99},{"courses_dept":"babs","courses_id":"550","maxAvg":84.97},{"courses_dept":"arth","courses_id":"377","maxAvg":84.97},{"courses_dept":"grsj","courses_id":"422","maxAvg":84.95},{"courses_dept":"eece","courses_id":"513","maxAvg":84.95},{"courses_dept":"arch","courses_id":"531","maxAvg":84.94},{"courses_dept":"itst","courses_id":"110","maxAvg":84.94},{"courses_dept":"arth","courses_id":"464","maxAvg":84.92},{"courses_dept":"apbi","courses_id":"410","maxAvg":84.92},{"courses_dept":"swed","courses_id":"210","maxAvg":84.92},{"courses_dept":"spha","courses_id":"501","maxAvg":84.91},{"courses_dept":"frst","courses_id":"452","maxAvg":84.91},{"courses_dept":"basc","courses_id":"550","maxAvg":84.9},{"courses_dept":"apbi","courses_id":"428","maxAvg":84.9},{"courses_dept":"lled","courses_id":"452","maxAvg":84.9},{"courses_dept":"phar","courses_id":"460","maxAvg":84.89},{"courses_dept":"elec","courses_id":"493","maxAvg":84.88},{"courses_dept":"biol","courses_id":"344","maxAvg":84.88},{"courses_dept":"poli","courses_id":"461","maxAvg":84.87},{"courses_dept":"bams","courses_id":"502","maxAvg":84.86},{"courses_dept":"fist","courses_id":"445","maxAvg":84.86},{"courses_dept":"kin","courses_id":"571","maxAvg":84.86},{"courses_dept":"comm","courses_id":"471","maxAvg":84.86},{"courses_dept":"mech","courses_id":"433","maxAvg":84.86},{"courses_dept":"engl","courses_id":"221","maxAvg":84.86},{"courses_dept":"ba","courses_id":"507","maxAvg":84.85},{"courses_dept":"thtr","courses_id":"317","maxAvg":84.85},{"courses_dept":"comm","courses_id":"464","maxAvg":84.84},{"courses_dept":"russ","courses_id":"207","maxAvg":84.83},{"courses_dept":"chem","courses_id":"569","maxAvg":84.8},{"courses_dept":"math","courses_id":"444","maxAvg":84.8},{"courses_dept":"atsc","courses_id":"409","maxAvg":84.8},{"courses_dept":"soci","courses_id":"515","maxAvg":84.8},{"courses_dept":"gbpr","courses_id":"500","maxAvg":84.8},{"courses_dept":"path","courses_id":"477","maxAvg":84.8},{"courses_dept":"bait","courses_id":"510","maxAvg":84.79},{"courses_dept":"chbe","courses_id":"366","maxAvg":84.79},{"courses_dept":"fnis","courses_id":"400","maxAvg":84.78},{"courses_dept":"phrm","courses_id":"131","maxAvg":84.78},{"courses_dept":"path","courses_id":"415","maxAvg":84.78},{"courses_dept":"civl","courses_id":"418","maxAvg":84.78},{"courses_dept":"gpp","courses_id":"505","maxAvg":84.76},{"courses_dept":"cpen","courses_id":"391","maxAvg":84.76},{"courses_dept":"ital","courses_id":"301","maxAvg":84.75},{"courses_dept":"biol","courses_id":"337","maxAvg":84.73},{"courses_dept":"nurs","courses_id":"305","maxAvg":84.72},{"courses_dept":"rmes","courses_id":"516","maxAvg":84.71},{"courses_dept":"port","courses_id":"201","maxAvg":84.71},{"courses_dept":"food","courses_id":"515","maxAvg":84.71},{"courses_dept":"civl","courses_id":"564","maxAvg":84.71},{"courses_dept":"thtr","courses_id":"406","maxAvg":84.71},{"courses_dept":"food","courses_id":"522","maxAvg":84.71},{"courses_dept":"frst","courses_id":"303","maxAvg":84.7},{"courses_dept":"fnh","courses_id":"477","maxAvg":84.7},{"courses_dept":"apbi","courses_id":"418","maxAvg":84.69},{"courses_dept":"ba","courses_id":"560","maxAvg":84.69},{"courses_dept":"larc","courses_id":"532","maxAvg":84.69},{"courses_dept":"phil","courses_id":"378","maxAvg":84.69},{"courses_dept":"spha","courses_id":"521","maxAvg":84.68},{"courses_dept":"germ","courses_id":"303","maxAvg":84.68},{"courses_dept":"arth","courses_id":"443","maxAvg":84.67},{"courses_dept":"cnto","courses_id":"301","maxAvg":84.67},{"courses_dept":"spha","courses_id":"543","maxAvg":84.67},{"courses_dept":"anth","courses_id":"220","maxAvg":84.67},{"courses_dept":"law","courses_id":"303","maxAvg":84.67},{"courses_dept":"cons","courses_id":"127","maxAvg":84.66},{"courses_dept":"biol","courses_id":"331","maxAvg":84.65},{"courses_dept":"econ","courses_id":"562","maxAvg":84.65},{"courses_dept":"geog","courses_id":"450","maxAvg":84.63},{"courses_dept":"eece","courses_id":"563","maxAvg":84.63},{"courses_dept":"civl","courses_id":"202","maxAvg":84.63},{"courses_dept":"lled","courses_id":"459","maxAvg":84.61},{"courses_dept":"comm","courses_id":"436","maxAvg":84.6},{"courses_dept":"mech","courses_id":"578","maxAvg":84.6},{"courses_dept":"phys","courses_id":"534","maxAvg":84.6},{"courses_dept":"relg","courses_id":"415","maxAvg":84.6},{"courses_dept":"fnel","courses_id":"281","maxAvg":84.6},{"courses_dept":"cpsc","courses_id":"310","maxAvg":84.6},{"courses_dept":"last","courses_id":"201","maxAvg":84.58},{"courses_dept":"biol","courses_id":"326","maxAvg":84.57},{"courses_dept":"chbe","courses_id":"493","maxAvg":84.57},{"courses_dept":"eosc","courses_id":"450","maxAvg":84.57},{"courses_dept":"kin","courses_id":"275","maxAvg":84.57},{"courses_dept":"mine","courses_id":"438","maxAvg":84.56},{"courses_dept":"libr","courses_id":"555","maxAvg":84.56},{"courses_dept":"cpsc","courses_id":"121","maxAvg":84.56},{"courses_dept":"eosc","courses_id":"445","maxAvg":84.56},{"courses_dept":"spph","courses_id":"400","maxAvg":84.55},{"courses_dept":"basm","courses_id":"523","maxAvg":84.55},{"courses_dept":"mech","courses_id":"470","maxAvg":84.53},{"courses_dept":"frst","courses_id":"308","maxAvg":84.5},{"courses_dept":"chin","courses_id":"218","maxAvg":84.5},{"courses_dept":"asia","courses_id":"254","maxAvg":84.5},{"courses_dept":"civl","courses_id":"582","maxAvg":84.5},{"courses_dept":"spph","courses_id":"521","maxAvg":84.5},{"courses_dept":"asia","courses_id":"398","maxAvg":84.46},{"courses_dept":"spha","courses_id":"531","maxAvg":84.46},{"courses_dept":"basm","courses_id":"550","maxAvg":84.45},{"courses_dept":"grsj","courses_id":"307","maxAvg":84.45},{"courses_dept":"mine","courses_id":"402","maxAvg":84.45},{"courses_dept":"envr","courses_id":"430","maxAvg":84.44},{"courses_dept":"fnh","courses_id":"340","maxAvg":84.44},{"courses_dept":"engl","courses_id":"362","maxAvg":84.43},{"courses_dept":"cons","courses_id":"451","maxAvg":84.43},{"courses_dept":"grek","courses_id":"201","maxAvg":84.43},{"courses_dept":"eced","courses_id":"401","maxAvg":84.42},{"courses_dept":"cpsc","courses_id":"311","maxAvg":84.39},{"courses_dept":"food","courses_id":"528","maxAvg":84.38},{"courses_dept":"mech","courses_id":"423","maxAvg":84.38},{"courses_dept":"ba","courses_id":"564","maxAvg":84.38},{"courses_dept":"libr","courses_id":"523","maxAvg":84.38},{"courses_dept":"comm","courses_id":"363","maxAvg":84.37},{"courses_dept":"phys","courses_id":"402","maxAvg":84.37},{"courses_dept":"phys","courses_id":"505","maxAvg":84.36},{"courses_dept":"swed","courses_id":"100","maxAvg":84.35},{"courses_dept":"apsc","courses_id":"541","maxAvg":84.35},{"courses_dept":"bama","courses_id":"503","maxAvg":84.34},{"courses_dept":"apbi","courses_id":"414","maxAvg":84.33},{"courses_dept":"clst","courses_id":"320","maxAvg":84.33},{"courses_dept":"busi","courses_id":"493","maxAvg":84.33},{"courses_dept":"fre","courses_id":"420","maxAvg":84.33},{"courses_dept":"busi","courses_id":"499","maxAvg":84.33},{"courses_dept":"law","courses_id":"457","maxAvg":84.33},{"courses_dept":"engl","courses_id":"222","maxAvg":84.32},{"courses_dept":"phys","courses_id":"502","maxAvg":84.31},{"courses_dept":"scan","courses_id":"333","maxAvg":84.3},{"courses_dept":"micb","courses_id":"401","maxAvg":84.3},{"courses_dept":"punj","courses_id":"200","maxAvg":84.29},{"courses_dept":"apbi","courses_id":"260","maxAvg":84.29},{"courses_dept":"latn","courses_id":"101","maxAvg":84.29},{"courses_dept":"envr","courses_id":"300","maxAvg":84.29},{"courses_dept":"scie","courses_id":"113","maxAvg":84.29},{"courses_dept":"sowk","courses_id":"453","maxAvg":84.28},{"courses_dept":"fnh","courses_id":"440","maxAvg":84.28},{"courses_dept":"plan","courses_id":"510","maxAvg":84.26},{"courses_dept":"chbe","courses_id":"560","maxAvg":84.25},{"courses_dept":"dent","courses_id":"533","maxAvg":84.25},{"courses_dept":"geog","courses_id":"424","maxAvg":84.25},{"courses_dept":"germ","courses_id":"300","maxAvg":84.25},{"courses_dept":"frst","courses_id":"432","maxAvg":84.25},{"courses_dept":"apbi","courses_id":"444","maxAvg":84.25},{"courses_dept":"path","courses_id":"305","maxAvg":84.25},{"courses_dept":"chin","courses_id":"101","maxAvg":84.24},{"courses_dept":"libr","courses_id":"533","maxAvg":84.22},{"courses_dept":"micb","courses_id":"325","maxAvg":84.21},{"courses_dept":"arch","courses_id":"532","maxAvg":84.21},{"courses_dept":"law","courses_id":"430","maxAvg":84.21},{"courses_dept":"fren","courses_id":"122","maxAvg":84.2},{"courses_dept":"larc","courses_id":"540","maxAvg":84.2},{"courses_dept":"phth","courses_id":"564","maxAvg":84.2},{"courses_dept":"civl","courses_id":"439","maxAvg":84.19},{"courses_dept":"frst","courses_id":"553","maxAvg":84.18},{"courses_dept":"basc","courses_id":"523","maxAvg":84.18},{"courses_dept":"germ","courses_id":"380","maxAvg":84.18},{"courses_dept":"bait","courses_id":"513","maxAvg":84.18},{"courses_dept":"kin","courses_id":"585","maxAvg":84.17},{"courses_dept":"ital","courses_id":"302","maxAvg":84.17},{"courses_dept":"wood","courses_id":"330","maxAvg":84.17},{"courses_dept":"bams","courses_id":"550","maxAvg":84.17},{"courses_dept":"mtrl","courses_id":"585","maxAvg":84.17},{"courses_dept":"wood","courses_id":"494","maxAvg":84.17},{"courses_dept":"math","courses_id":"406","maxAvg":84.16},{"courses_dept":"grsj","courses_id":"235","maxAvg":84.14},{"courses_dept":"bahr","courses_id":"520","maxAvg":84.13},{"courses_dept":"germ","courses_id":"301","maxAvg":84.13},{"courses_dept":"apbi","courses_id":"315","maxAvg":84.11},{"courses_dept":"biol","courses_id":"361","maxAvg":84.11},{"courses_dept":"edst","courses_id":"543","maxAvg":84.11},{"courses_dept":"mech","courses_id":"420","maxAvg":84.1},{"courses_dept":"lfs","courses_id":"100","maxAvg":84.1},{"courses_dept":"ends","courses_id":"320","maxAvg":84.1},{"courses_dept":"bmeg","courses_id":"456","maxAvg":84.09},{"courses_dept":"chbe","courses_id":"376","maxAvg":84.09},{"courses_dept":"chbe","courses_id":"484","maxAvg":84.08},{"courses_dept":"math","courses_id":"422","maxAvg":84.08},{"courses_dept":"ufor","courses_id":"403","maxAvg":84.08},{"courses_dept":"arst","courses_id":"587","maxAvg":84.08},{"courses_dept":"fren","courses_id":"355","maxAvg":84.08},{"courses_dept":"mine","courses_id":"396","maxAvg":84.05},{"courses_dept":"chbe","courses_id":"230","maxAvg":84.05},{"courses_dept":"arth","courses_id":"376","maxAvg":84.04},{"courses_dept":"dhyg","courses_id":"110","maxAvg":84.04},{"courses_dept":"arch","courses_id":"437","maxAvg":84.03},{"courses_dept":"bama","courses_id":"504","maxAvg":84.03},{"courses_dept":"mech","courses_id":"421","maxAvg":84.03},{"courses_dept":"eece","courses_id":"535","maxAvg":84},{"courses_dept":"korn","courses_id":"200","maxAvg":84},{"courses_dept":"gpp","courses_id":"508","maxAvg":84},{"courses_dept":"chem","courses_id":"315","maxAvg":84},{"courses_dept":"dent","courses_id":"592","maxAvg":84},{"courses_dept":"dent","courses_id":"526","maxAvg":84},{"courses_dept":"iwme","courses_id":"503","maxAvg":84},{"courses_dept":"wood","courses_id":"440","maxAvg":84},{"courses_dept":"chem","courses_id":"410","maxAvg":84},{"courses_dept":"dhyg","courses_id":"325","maxAvg":84},{"courses_dept":"thtr","courses_id":"250","maxAvg":84},{"courses_dept":"spph","courses_id":"522","maxAvg":84},{"courses_dept":"mech","courses_id":"576","maxAvg":84},{"courses_dept":"grsj","courses_id":"328","maxAvg":84},{"courses_dept":"spph","courses_id":"567","maxAvg":84},{"courses_dept":"cohr","courses_id":"433","maxAvg":84},{"courses_dept":"isci","courses_id":"350","maxAvg":84},{"courses_dept":"rmes","courses_id":"517","maxAvg":84},{"courses_dept":"law","courses_id":"374","maxAvg":84},{"courses_dept":"cohr","courses_id":"301","maxAvg":84},{"courses_dept":"ends","courses_id":"440","maxAvg":84},{"courses_dept":"civl","courses_id":"435","maxAvg":83.97},{"courses_dept":"path","courses_id":"301","maxAvg":83.96},{"courses_dept":"eosc","courses_id":"333","maxAvg":83.95},{"courses_dept":"comm","courses_id":"390","maxAvg":83.95},{"courses_dept":"apsc","courses_id":"201","maxAvg":83.94},{"courses_dept":"kin","courses_id":"303","maxAvg":83.94},{"courses_dept":"envr","courses_id":"410","maxAvg":83.94},{"courses_dept":"eosc","courses_id":"212","maxAvg":83.93},{"courses_dept":"nurs","courses_id":"542","maxAvg":83.93},{"courses_dept":"frst","courses_id":"100","maxAvg":83.93},{"courses_dept":"igen","courses_id":"340","maxAvg":83.92},{"courses_dept":"civl","courses_id":"566","maxAvg":83.92},{"courses_dept":"hist","courses_id":"433","maxAvg":83.91},{"courses_dept":"bams","courses_id":"504","maxAvg":83.9},{"courses_dept":"dani","courses_id":"210","maxAvg":83.89},{"courses_dept":"envr","courses_id":"200","maxAvg":83.88},{"courses_dept":"libr","courses_id":"573","maxAvg":83.88},{"courses_dept":"obst","courses_id":"504","maxAvg":83.88},{"courses_dept":"civl","courses_id":"524","maxAvg":83.87},{"courses_dept":"mech","courses_id":"495","maxAvg":83.86},{"courses_dept":"chbe","courses_id":"365","maxAvg":83.86},{"courses_dept":"arch","courses_id":"517","maxAvg":83.85},{"courses_dept":"phar","courses_id":"430","maxAvg":83.84},{"courses_dept":"biol","courses_id":"301","maxAvg":83.84},{"courses_dept":"russ","courses_id":"200","maxAvg":83.83},{"courses_dept":"chin","courses_id":"115","maxAvg":83.83},{"courses_dept":"wood","courses_id":"464","maxAvg":83.83},{"courses_dept":"eosc","courses_id":"533","maxAvg":83.83},{"courses_dept":"bota","courses_id":"526","maxAvg":83.83},{"courses_dept":"larc","courses_id":"502","maxAvg":83.82},{"courses_dept":"mech","courses_id":"366","maxAvg":83.82},{"courses_dept":"geog","courses_id":"290","maxAvg":83.79},{"courses_dept":"ling","courses_id":"445","maxAvg":83.77},{"courses_dept":"libr","courses_id":"508","maxAvg":83.76},{"courses_dept":"spph","courses_id":"555","maxAvg":83.75},{"courses_dept":"phar","courses_id":"506","maxAvg":83.75},{"courses_dept":"math","courses_id":"120","maxAvg":83.75},{"courses_dept":"path","courses_id":"306","maxAvg":83.75},{"courses_dept":"thtr","courses_id":"310","maxAvg":83.75},{"courses_dept":"arst","courses_id":"560","maxAvg":83.75},{"courses_dept":"civl","courses_id":"437","maxAvg":83.75},{"courses_dept":"chin","courses_id":"413","maxAvg":83.75},{"courses_dept":"phar","courses_id":"448","maxAvg":83.74},{"courses_dept":"comm","courses_id":"467","maxAvg":83.74},{"courses_dept":"ba","courses_id":"561","maxAvg":83.74},{"courses_dept":"bait","courses_id":"550","maxAvg":83.74},{"courses_dept":"eece","courses_id":"514","maxAvg":83.74},{"courses_dept":"stat","courses_id":"404","maxAvg":83.73},{"courses_dept":"ba","courses_id":"513","maxAvg":83.73},{"courses_dept":"chem","courses_id":"427","maxAvg":83.73},{"courses_dept":"arch","courses_id":"500","maxAvg":83.71},{"courses_dept":"biol","courses_id":"434","maxAvg":83.71},{"courses_dept":"bahr","courses_id":"550","maxAvg":83.7},{"courses_dept":"path","courses_id":"300","maxAvg":83.7},{"courses_dept":"arch","courses_id":"504","maxAvg":83.7},{"courses_dept":"comm","courses_id":"453","maxAvg":83.7},{"courses_dept":"phar","courses_id":"442","maxAvg":83.69},{"courses_dept":"ba","courses_id":"541","maxAvg":83.69},{"courses_dept":"comm","courses_id":"412","maxAvg":83.69},{"courses_dept":"biol","courses_id":"112","maxAvg":83.68},{"courses_dept":"audi","courses_id":"402","maxAvg":83.67},{"courses_dept":"ital","courses_id":"409","maxAvg":83.67},{"courses_dept":"comm","courses_id":"447","maxAvg":83.67},{"courses_dept":"asia","courses_id":"475","maxAvg":83.67},{"courses_dept":"mech","courses_id":"489","maxAvg":83.67},{"courses_dept":"frst","courses_id":"495","maxAvg":83.66},{"courses_dept":"phys","courses_id":"333","maxAvg":83.65},{"courses_dept":"eosc","courses_id":"472","maxAvg":83.64},{"courses_dept":"grsj","courses_id":"310","maxAvg":83.64},{"courses_dept":"grsj","courses_id":"230","maxAvg":83.63},{"courses_dept":"baac","courses_id":"511","maxAvg":83.63},{"courses_dept":"eced","courses_id":"441","maxAvg":83.62},{"courses_dept":"asia","courses_id":"308","maxAvg":83.6},{"courses_dept":"kin","courses_id":"373","maxAvg":83.58},{"courses_dept":"hebr","courses_id":"202","maxAvg":83.57},{"courses_dept":"comm","courses_id":"320","maxAvg":83.57},{"courses_dept":"fist","courses_id":"331","maxAvg":83.56},{"courses_dept":"mech","courses_id":"368","maxAvg":83.56},{"courses_dept":"biol","courses_id":"346","maxAvg":83.56},{"courses_dept":"astr","courses_id":"404","maxAvg":83.56},{"courses_dept":"mech","courses_id":"328","maxAvg":83.55},{"courses_dept":"frst","courses_id":"201","maxAvg":83.54},{"courses_dept":"comm","courses_id":"431","maxAvg":83.54},{"courses_dept":"cics","courses_id":"520","maxAvg":83.54},{"courses_dept":"asia","courses_id":"304","maxAvg":83.53},{"courses_dept":"econ","courses_id":"304","maxAvg":83.53},{"courses_dept":"micb","courses_id":"306","maxAvg":83.53},{"courses_dept":"comm","courses_id":"298","maxAvg":83.52},{"courses_dept":"ling","courses_id":"100","maxAvg":83.51},{"courses_dept":"larc","courses_id":"522","maxAvg":83.5},{"courses_dept":"biol","courses_id":"432","maxAvg":83.5},{"courses_dept":"civl","courses_id":"556","maxAvg":83.5},{"courses_dept":"spph","courses_id":"544","maxAvg":83.5},{"courses_dept":"mech","courses_id":"445","maxAvg":83.5},{"courses_dept":"surg","courses_id":"514","maxAvg":83.5},{"courses_dept":"busi","courses_id":"335","maxAvg":83.49},{"courses_dept":"asia","courses_id":"376","maxAvg":83.47},{"courses_dept":"phys","courses_id":"348","maxAvg":83.46},{"courses_dept":"civl","courses_id":"420","maxAvg":83.46},{"courses_dept":"comm","courses_id":"459","maxAvg":83.46},{"courses_dept":"apbi","courses_id":"322","maxAvg":83.44},{"courses_dept":"eosc","courses_id":"315","maxAvg":83.44},{"courses_dept":"libr","courses_id":"520","maxAvg":83.43},{"courses_dept":"kin","courses_id":"481","maxAvg":83.43},{"courses_dept":"biol","courses_id":"436","maxAvg":83.43},{"courses_dept":"civl","courses_id":"574","maxAvg":83.42},{"courses_dept":"biol","courses_id":"340","maxAvg":83.42},{"courses_dept":"biol","courses_id":"425","maxAvg":83.42},{"courses_dept":"phys","courses_id":"170","maxAvg":83.41},{"courses_dept":"dhyg","courses_id":"206","maxAvg":83.41},{"courses_dept":"dhyg","courses_id":"210","maxAvg":83.41},{"courses_dept":"eosc","courses_id":"434","maxAvg":83.4},{"courses_dept":"spha","courses_id":"562","maxAvg":83.38},{"courses_dept":"spha","courses_id":"511","maxAvg":83.37},{"courses_dept":"kin","courses_id":"365","maxAvg":83.36},{"courses_dept":"spha","courses_id":"503","maxAvg":83.36},{"courses_dept":"cpsc","courses_id":"515","maxAvg":83.36},{"courses_dept":"bams","courses_id":"523","maxAvg":83.35},{"courses_dept":"biol","courses_id":"310","maxAvg":83.34},{"courses_dept":"korn","courses_id":"101","maxAvg":83.33},{"courses_dept":"dani","courses_id":"110","maxAvg":83.33},{"courses_dept":"cohr","courses_id":"411","maxAvg":83.33},{"courses_dept":"libr","courses_id":"509","maxAvg":83.33},{"courses_dept":"eosc","courses_id":"352","maxAvg":83.33},{"courses_dept":"mtrl","courses_id":"350","maxAvg":83.33},{"courses_dept":"chbe","courses_id":"373","maxAvg":83.31},{"courses_dept":"ceen","courses_id":"501","maxAvg":83.31},{"courses_dept":"spha","courses_id":"555","maxAvg":83.3},{"courses_dept":"eosc","courses_id":"332","maxAvg":83.29},{"courses_dept":"crwr","courses_id":"203","maxAvg":83.27},{"courses_dept":"cohr","courses_id":"402","maxAvg":83.26},{"courses_dept":"ital","courses_id":"303","maxAvg":83.25},{"courses_dept":"dent","courses_id":"532","maxAvg":83.25},{"courses_dept":"mech","courses_id":"460","maxAvg":83.25},{"courses_dept":"eosc","courses_id":"110","maxAvg":83.23},{"courses_dept":"arch","courses_id":"403","maxAvg":83.23},{"courses_dept":"astr","courses_id":"333","maxAvg":83.23},{"courses_dept":"name","courses_id":"502","maxAvg":83.23},{"courses_dept":"phys","courses_id":"407","maxAvg":83.22},{"courses_dept":"arch","courses_id":"541","maxAvg":83.2},{"courses_dept":"eosc","courses_id":"430","maxAvg":83.2},{"courses_dept":"bala","courses_id":"503","maxAvg":83.2},{"courses_dept":"grsj","courses_id":"101","maxAvg":83.19},{"courses_dept":"gpp","courses_id":"501","maxAvg":83.19},{"courses_dept":"math","courses_id":"215","maxAvg":83.19},{"courses_dept":"asia","courses_id":"488","maxAvg":83.18},{"courses_dept":"civl","courses_id":"422","maxAvg":83.17},{"courses_dept":"fre","courses_id":"460","maxAvg":83.17},{"courses_dept":"eosc","courses_id":"422","maxAvg":83.17},{"courses_dept":"civl","courses_id":"416","maxAvg":83.16},{"courses_dept":"elec","courses_id":"391","maxAvg":83.16},{"courses_dept":"hist","courses_id":"326","maxAvg":83.15},{"courses_dept":"baac","courses_id":"550","maxAvg":83.15},{"courses_dept":"soil","courses_id":"520","maxAvg":83.14},{"courses_dept":"fre","courses_id":"374","maxAvg":83.14},{"courses_dept":"libr","courses_id":"507","maxAvg":83.14},{"courses_dept":"dent","courses_id":"505","maxAvg":83.14},{"courses_dept":"astu","courses_id":"211","maxAvg":83.14},{"courses_dept":"obst","courses_id":"503","maxAvg":83.13},{"courses_dept":"arbc","courses_id":"201","maxAvg":83.13},{"courses_dept":"thtr","courses_id":"273","maxAvg":83.11},{"courses_dept":"hist","courses_id":"103","maxAvg":83.11},{"courses_dept":"thtr","courses_id":"271","maxAvg":83.11},{"courses_dept":"food","courses_id":"510","maxAvg":83.11},{"courses_dept":"econ","courses_id":"255","maxAvg":83.11},{"courses_dept":"eosc","courses_id":"470","maxAvg":83.1},{"courses_dept":"span","courses_id":"202","maxAvg":83.09},{"courses_dept":"law","courses_id":"439","maxAvg":83.09},{"courses_dept":"crwr","courses_id":"209","maxAvg":83.08},{"courses_dept":"comm","courses_id":"458","maxAvg":83.08},{"courses_dept":"medg","courses_id":"419","maxAvg":83.07},{"courses_dept":"lled","courses_id":"391","maxAvg":83.07},{"courses_dept":"thtr","courses_id":"272","maxAvg":83.06},{"courses_dept":"thtr","courses_id":"274","maxAvg":83.06},{"courses_dept":"visa","courses_id":"240","maxAvg":83.05},{"courses_dept":"visa","courses_id":"381","maxAvg":83.04},{"courses_dept":"kin","courses_id":"371","maxAvg":83.03},{"courses_dept":"mtrl","courses_id":"363","maxAvg":83.03},{"courses_dept":"grsj","courses_id":"325","maxAvg":83.03},{"courses_dept":"grsj","courses_id":"510","maxAvg":83},{"courses_dept":"path","courses_id":"427","maxAvg":83},{"courses_dept":"dhyg","courses_id":"310","maxAvg":83},{"courses_dept":"grek","courses_id":"352","maxAvg":83},{"courses_dept":"phys","courses_id":"410","maxAvg":83},{"courses_dept":"civl","courses_id":"513","maxAvg":83},{"courses_dept":"astr","courses_id":"502","maxAvg":83},{"courses_dept":"latn","courses_id":"351","maxAvg":83},{"courses_dept":"fren","courses_id":"342","maxAvg":83},{"courses_dept":"psyc","courses_id":"315","maxAvg":83},{"courses_dept":"bmeg","courses_id":"510","maxAvg":83},{"courses_dept":"fren","courses_id":"225","maxAvg":83},{"courses_dept":"pcth","courses_id":"201","maxAvg":82.98},{"courses_dept":"ba","courses_id":"504","maxAvg":82.98},{"courses_dept":"fre","courses_id":"340","maxAvg":82.98},{"courses_dept":"mine","courses_id":"304","maxAvg":82.97},{"courses_dept":"engl","courses_id":"100","maxAvg":82.96},{"courses_dept":"cens","courses_id":"201","maxAvg":82.96},{"courses_dept":"pols","courses_id":"300","maxAvg":82.95},{"courses_dept":"chin","courses_id":"323","maxAvg":82.95},{"courses_dept":"phar","courses_id":"341","maxAvg":82.93},{"courses_dept":"mech","courses_id":"463","maxAvg":82.93},{"courses_dept":"biol","courses_id":"406","maxAvg":82.92},{"courses_dept":"larc","courses_id":"525","maxAvg":82.91},{"courses_dept":"chin","courses_id":"321","maxAvg":82.9},{"courses_dept":"lfs","courses_id":"250","maxAvg":82.9},{"courses_dept":"crwr","courses_id":"208","maxAvg":82.88},{"courses_dept":"comm","courses_id":"202","maxAvg":82.88},{"courses_dept":"span","courses_id":"222","maxAvg":82.88},{"courses_dept":"mech","courses_id":"386","maxAvg":82.86},{"courses_dept":"comm","courses_id":"398","maxAvg":82.86},{"courses_dept":"spph","courses_id":"506","maxAvg":82.86},{"courses_dept":"comm","courses_id":"468","maxAvg":82.86},{"courses_dept":"biol","courses_id":"323","maxAvg":82.86},{"courses_dept":"hebr","courses_id":"201","maxAvg":82.86},{"courses_dept":"larc","courses_id":"440","maxAvg":82.84},{"courses_dept":"crwr","courses_id":"200","maxAvg":82.83},{"courses_dept":"ursy","courses_id":"520","maxAvg":82.83},{"courses_dept":"mech","courses_id":"478","maxAvg":82.83},{"courses_dept":"eosc","courses_id":"118","maxAvg":82.82},{"courses_dept":"clst","courses_id":"356","maxAvg":82.81},{"courses_dept":"musc","courses_id":"358","maxAvg":82.81},{"courses_dept":"igen","courses_id":"230","maxAvg":82.81},{"courses_dept":"chin","courses_id":"213","maxAvg":82.8},{"courses_dept":"apbi","courses_id":"361","maxAvg":82.79},{"courses_dept":"coec","courses_id":"298","maxAvg":82.77},{"courses_dept":"phys","courses_id":"219","maxAvg":82.76},{"courses_dept":"path","courses_id":"304","maxAvg":82.75},{"courses_dept":"germ","courses_id":"310","maxAvg":82.75},{"courses_dept":"arth","courses_id":"432","maxAvg":82.73},{"courses_dept":"biol","courses_id":"417","maxAvg":82.73},{"courses_dept":"kin","courses_id":"191","maxAvg":82.73},{"courses_dept":"biol","courses_id":"416","maxAvg":82.71},{"courses_dept":"fist","courses_id":"200","maxAvg":82.71},{"courses_dept":"phil","courses_id":"364","maxAvg":82.7},{"courses_dept":"baen","courses_id":"550","maxAvg":82.7},{"courses_dept":"geob","courses_id":"407","maxAvg":82.69},{"courses_dept":"edcp","courses_id":"530","maxAvg":82.68},{"courses_dept":"fnh","courses_id":"473","maxAvg":82.68},{"courses_dept":"astr","courses_id":"300","maxAvg":82.67},{"courses_dept":"biol","courses_id":"465","maxAvg":82.67},{"courses_dept":"engl","courses_id":"309","maxAvg":82.67},{"courses_dept":"comm","courses_id":"475","maxAvg":82.67},{"courses_dept":"itst","courses_id":"413","maxAvg":82.67},{"courses_dept":"cpsc","courses_id":"340","maxAvg":82.66},{"courses_dept":"ends","courses_id":"221","maxAvg":82.65},{"courses_dept":"comm","courses_id":"469","maxAvg":82.64},{"courses_dept":"comm","courses_id":"204","maxAvg":82.64},{"courses_dept":"math","courses_id":"226","maxAvg":82.63},{"courses_dept":"civl","courses_id":"331","maxAvg":82.61},{"courses_dept":"span","courses_id":"206","maxAvg":82.61},{"courses_dept":"japn","courses_id":"101","maxAvg":82.59},{"courses_dept":"cpsc","courses_id":"314","maxAvg":82.58},{"courses_dept":"hebr","courses_id":"101","maxAvg":82.58},{"courses_dept":"chin","courses_id":"103","maxAvg":82.58},{"courses_dept":"hist","courses_id":"596","maxAvg":82.57},{"courses_dept":"biol","courses_id":"300","maxAvg":82.57},{"courses_dept":"biol","courses_id":"140","maxAvg":82.57},{"courses_dept":"korn","courses_id":"102","maxAvg":82.56},{"courses_dept":"civl","courses_id":"409","maxAvg":82.56},{"courses_dept":"medg","courses_id":"420","maxAvg":82.54},{"courses_dept":"mtrl","courses_id":"466","maxAvg":82.53},{"courses_dept":"punj","courses_id":"100","maxAvg":82.53},{"courses_dept":"comm","courses_id":"290","maxAvg":82.52},{"courses_dept":"fnh","courses_id":"302","maxAvg":82.52},{"courses_dept":"astu","courses_id":"210","maxAvg":82.5},{"courses_dept":"law","courses_id":"395","maxAvg":82.5},{"courses_dept":"busi","courses_id":"465","maxAvg":82.5},{"courses_dept":"micb","courses_id":"322","maxAvg":82.5},{"courses_dept":"musc","courses_id":"410","maxAvg":82.5},{"courses_dept":"enph","courses_id":"481","maxAvg":82.5},{"courses_dept":"frst","courses_id":"439","maxAvg":82.5},{"courses_dept":"dent","courses_id":"430","maxAvg":82.49},{"courses_dept":"kin","courses_id":"383","maxAvg":82.49},{"courses_dept":"span","courses_id":"207","maxAvg":82.48},{"courses_dept":"cons","courses_id":"481","maxAvg":82.47},{"courses_dept":"arbc","courses_id":"102","maxAvg":82.47},{"courses_dept":"path","courses_id":"404","maxAvg":82.47},{"courses_dept":"thtr","courses_id":"354","maxAvg":82.46},{"courses_dept":"bama","courses_id":"550","maxAvg":82.45},{"courses_dept":"ends","courses_id":"302","maxAvg":82.45},{"courses_dept":"apbi","courses_id":"426","maxAvg":82.44},{"courses_dept":"mech","courses_id":"488","maxAvg":82.44},{"courses_dept":"fmst","courses_id":"442","maxAvg":82.44},{"courses_dept":"engl","courses_id":"220","maxAvg":82.44},{"courses_dept":"fnh","courses_id":"455","maxAvg":82.44},{"courses_dept":"musc","courses_id":"241","maxAvg":82.44},{"courses_dept":"cohr","courses_id":"304","maxAvg":82.43},{"courses_dept":"civl","courses_id":"413","maxAvg":82.43},{"courses_dept":"rmes","courses_id":"515","maxAvg":82.43},{"courses_dept":"engl","courses_id":"224","maxAvg":82.43},{"courses_dept":"mtrl","courses_id":"486","maxAvg":82.43},{"courses_dept":"eosc","courses_id":"420","maxAvg":82.42},{"courses_dept":"biol","courses_id":"341","maxAvg":82.41},{"courses_dept":"apbi","courses_id":"419","maxAvg":82.4},{"courses_dept":"ling","courses_id":"300","maxAvg":82.4},{"courses_dept":"pers","courses_id":"200","maxAvg":82.4},{"courses_dept":"phys","courses_id":"108","maxAvg":82.39},{"courses_dept":"wood","courses_id":"292","maxAvg":82.38},{"courses_dept":"eosc","courses_id":"310","maxAvg":82.38},{"courses_dept":"isci","courses_id":"320","maxAvg":82.38},{"courses_dept":"swed","courses_id":"110","maxAvg":82.37},{"courses_dept":"chbe","courses_id":"485","maxAvg":82.37},{"courses_dept":"law","courses_id":"334","maxAvg":82.36},{"courses_dept":"comm","courses_id":"307","maxAvg":82.35},{"courses_dept":"hist","courses_id":"483","maxAvg":82.35},{"courses_dept":"isci","courses_id":"433","maxAvg":82.33},{"courses_dept":"gpp","courses_id":"506","maxAvg":82.33},{"courses_dept":"chin","courses_id":"217","maxAvg":82.33},{"courses_dept":"arch","courses_id":"405","maxAvg":82.32},{"courses_dept":"geog","courses_id":"250","maxAvg":82.32},{"courses_dept":"ling","courses_id":"101","maxAvg":82.32},{"courses_dept":"asia","courses_id":"300","maxAvg":82.31},{"courses_dept":"mtrl","courses_id":"471","maxAvg":82.31},{"courses_dept":"asia","courses_id":"411","maxAvg":82.3},{"courses_dept":"cons","courses_id":"486","maxAvg":82.3},{"courses_dept":"comm","courses_id":"450","maxAvg":82.29},{"courses_dept":"visa","courses_id":"311","maxAvg":82.29},{"courses_dept":"mine","courses_id":"462","maxAvg":82.27},{"courses_dept":"cens","courses_id":"404","maxAvg":82.27},{"courses_dept":"cpsc","courses_id":"313","maxAvg":82.27},{"courses_dept":"fnh","courses_id":"342","maxAvg":82.27},{"courses_dept":"phys","courses_id":"309","maxAvg":82.25},{"courses_dept":"dhyg","courses_id":"435","maxAvg":82.25},{"courses_dept":"comm","courses_id":"487","maxAvg":82.25},{"courses_dept":"bams","courses_id":"503","maxAvg":82.25},{"courses_dept":"baen","courses_id":"541","maxAvg":82.25},{"courses_dept":"bmeg","courses_id":"410","maxAvg":82.23},{"courses_dept":"fren","courses_id":"224","maxAvg":82.23},{"courses_dept":"chin","courses_id":"117","maxAvg":82.22},{"courses_dept":"relg","courses_id":"317","maxAvg":82.22},{"courses_dept":"enph","courses_id":"259","maxAvg":82.21},{"courses_dept":"path","courses_id":"437","maxAvg":82.2},{"courses_dept":"itst","courses_id":"333","maxAvg":82.2},{"courses_dept":"econ","courses_id":"500","maxAvg":82.2},{"courses_dept":"fnel","courses_id":"282","maxAvg":82.2},{"courses_dept":"russ","courses_id":"412","maxAvg":82.18},{"courses_dept":"busi","courses_id":"441","maxAvg":82.17},{"courses_dept":"wood","courses_id":"485","maxAvg":82.17},{"courses_dept":"arth","courses_id":"300","maxAvg":82.17},{"courses_dept":"chin","courses_id":"303","maxAvg":82.17},{"courses_dept":"igen","courses_id":"330","maxAvg":82.16},{"courses_dept":"urst","courses_id":"400","maxAvg":82.16},{"courses_dept":"asia","courses_id":"309","maxAvg":82.15},{"courses_dept":"fnel","courses_id":"489","maxAvg":82.14},{"courses_dept":"bioc","courses_id":"450","maxAvg":82.14},{"courses_dept":"mtrl","courses_id":"472","maxAvg":82.13},{"courses_dept":"mtrl","courses_id":"494","maxAvg":82.13},{"courses_dept":"civl","courses_id":"411","maxAvg":82.13},{"courses_dept":"busi","courses_id":"446","maxAvg":82.13},{"courses_dept":"elec","courses_id":"204","maxAvg":82.12},{"courses_dept":"cohr","courses_id":"401","maxAvg":82.12},{"courses_dept":"russ","courses_id":"206","maxAvg":82.1},{"courses_dept":"mech","courses_id":"380","maxAvg":82.1},{"courses_dept":"phys","courses_id":"404","maxAvg":82.1},{"courses_dept":"wood","courses_id":"276","maxAvg":82.1},{"courses_dept":"phar","courses_id":"323","maxAvg":82.09},{"courses_dept":"gpp","courses_id":"507","maxAvg":82.09},{"courses_dept":"comm","courses_id":"321","maxAvg":82.09},{"courses_dept":"stat","courses_id":"203","maxAvg":82.08},{"courses_dept":"apsc","courses_id":"100","maxAvg":82.08},{"courses_dept":"law","courses_id":"466","maxAvg":82.08},{"courses_dept":"fipr","courses_id":"434","maxAvg":82.07},{"courses_dept":"clst","courses_id":"211","maxAvg":82.06},{"courses_dept":"germ","courses_id":"360","maxAvg":82.06},{"courses_dept":"chem","courses_id":"305","maxAvg":82.05},{"courses_dept":"phys","courses_id":"403","maxAvg":82.05},{"courses_dept":"micb","courses_id":"402","maxAvg":82.04},{"courses_dept":"phar","courses_id":"456","maxAvg":82.04},{"courses_dept":"mtrl","courses_id":"559","maxAvg":82},{"courses_dept":"econ","courses_id":"442","maxAvg":82},{"courses_dept":"mech","courses_id":"481","maxAvg":82},{"courses_dept":"civl","courses_id":"538","maxAvg":82},{"courses_dept":"hist","courses_id":"394","maxAvg":82},{"courses_dept":"biol","courses_id":"363","maxAvg":82},{"courses_dept":"astr","courses_id":"407","maxAvg":82},{"courses_dept":"atsc","courses_id":"506","maxAvg":82},{"courses_dept":"chem","courses_id":"335","maxAvg":82},{"courses_dept":"span","courses_id":"549","maxAvg":82},{"courses_dept":"comm","courses_id":"296","maxAvg":82},{"courses_dept":"fnh","courses_id":"451","maxAvg":82},{"courses_dept":"cogs","courses_id":"401","maxAvg":82},{"courses_dept":"dhyg","courses_id":"208","maxAvg":82},{"courses_dept":"mech","courses_id":"552","maxAvg":82},{"courses_dept":"cnrs","courses_id":"549","maxAvg":82},{"courses_dept":"civl","courses_id":"520","maxAvg":82},{"courses_dept":"anth","courses_id":"407","maxAvg":82},{"courses_dept":"sowk","courses_id":"621","maxAvg":82},{"courses_dept":"arst","courses_id":"580","maxAvg":82},{"courses_dept":"cogs","courses_id":"300","maxAvg":82},{"courses_dept":"phil","courses_id":"464","maxAvg":82},{"courses_dept":"rmes","courses_id":"518","maxAvg":82},{"courses_dept":"wood","courses_id":"461","maxAvg":81.97},{"courses_dept":"bapa","courses_id":"501","maxAvg":81.96},{"courses_dept":"ling","courses_id":"222","maxAvg":81.95},{"courses_dept":"arst","courses_id":"565","maxAvg":81.95},{"courses_dept":"math","courses_id":"257","maxAvg":81.94},{"courses_dept":"dhyg","courses_id":"401","maxAvg":81.92},{"courses_dept":"fre","courses_id":"585","maxAvg":81.92},{"courses_dept":"chin","courses_id":"305","maxAvg":81.91},{"courses_dept":"grsj","courses_id":"306","maxAvg":81.91},{"courses_dept":"comm","courses_id":"387","maxAvg":81.9},{"courses_dept":"law","courses_id":"473","maxAvg":81.9},{"courses_dept":"wood","courses_id":"491","maxAvg":81.9},{"courses_dept":"visa","courses_id":"220","maxAvg":81.9},{"courses_dept":"law","courses_id":"563","maxAvg":81.88},{"courses_dept":"phar","courses_id":"472","maxAvg":81.87},{"courses_dept":"phar","courses_id":"526","maxAvg":81.86},{"courses_dept":"sowk","courses_id":"522","maxAvg":81.86},{"courses_dept":"kin","courses_id":"382","maxAvg":81.86},{"courses_dept":"fist","courses_id":"436","maxAvg":81.85},{"courses_dept":"comm","courses_id":"455","maxAvg":81.85},{"courses_dept":"visa","courses_id":"320","maxAvg":81.84},{"courses_dept":"chem","courses_id":"345","maxAvg":81.83},{"courses_dept":"eosc","courses_id":"575","maxAvg":81.83},{"courses_dept":"comm","courses_id":"374","maxAvg":81.82},{"courses_dept":"cpsc","courses_id":"404","maxAvg":81.82},{"courses_dept":"biol","courses_id":"343","maxAvg":81.82},{"courses_dept":"ital","courses_id":"102","maxAvg":81.82},{"courses_dept":"asia","courses_id":"378","maxAvg":81.8},{"courses_dept":"fren","courses_id":"220","maxAvg":81.8},{"courses_dept":"grek","courses_id":"101","maxAvg":81.79},{"courses_dept":"larc","courses_id":"523","maxAvg":81.79},{"courses_dept":"coec","courses_id":"371","maxAvg":81.79},{"courses_dept":"visa","courses_id":"250","maxAvg":81.79},{"courses_dept":"fist","courses_id":"230","maxAvg":81.78},{"courses_dept":"eosc","courses_id":"326","maxAvg":81.78},{"courses_dept":"phys","courses_id":"306","maxAvg":81.77},{"courses_dept":"biol","courses_id":"260","maxAvg":81.76},{"courses_dept":"cpsc","courses_id":"213","maxAvg":81.76},{"courses_dept":"econ","courses_id":"480","maxAvg":81.75},{"courses_dept":"law","courses_id":"356","maxAvg":81.75},{"courses_dept":"chem","courses_id":"418","maxAvg":81.75},{"courses_dept":"law","courses_id":"560","maxAvg":81.75},{"courses_dept":"eosc","courses_id":"579","maxAvg":81.75},{"courses_dept":"law","courses_id":"567","maxAvg":81.75},{"courses_dept":"phar","courses_id":"351","maxAvg":81.74},{"courses_dept":"kin","courses_id":"464","maxAvg":81.74},{"courses_dept":"fipr","courses_id":"230","maxAvg":81.74},{"courses_dept":"arch","courses_id":"523","maxAvg":81.72},{"courses_dept":"itst","courses_id":"415","maxAvg":81.71},{"courses_dept":"educ","courses_id":"210","maxAvg":81.7},{"courses_dept":"frst","courses_id":"232","maxAvg":81.7},{"courses_dept":"phys","courses_id":"473","maxAvg":81.7},{"courses_dept":"phys","courses_id":"400","maxAvg":81.7},{"courses_dept":"eosc","courses_id":"330","maxAvg":81.69},{"courses_dept":"grsj","courses_id":"102","maxAvg":81.69},{"courses_dept":"baac","courses_id":"505","maxAvg":81.69},{"courses_dept":"clst","courses_id":"301","maxAvg":81.68},{"courses_dept":"eosc","courses_id":"425","maxAvg":81.67},{"courses_dept":"fre","courses_id":"503","maxAvg":81.67},{"courses_dept":"math","courses_id":"360","maxAvg":81.67},{"courses_dept":"midw","courses_id":"125","maxAvg":81.67},{"courses_dept":"sowk","courses_id":"201","maxAvg":81.67},{"courses_dept":"libr","courses_id":"529","maxAvg":81.67},{"courses_dept":"phrm","courses_id":"100","maxAvg":81.65},{"courses_dept":"phys","courses_id":"216","maxAvg":81.65},{"courses_dept":"hgse","courses_id":"351","maxAvg":81.65},{"courses_dept":"appp","courses_id":"502","maxAvg":81.64},{"courses_dept":"math","courses_id":"316","maxAvg":81.61},{"courses_dept":"busi","courses_id":"442","maxAvg":81.6},{"courses_dept":"thtr","courses_id":"120","maxAvg":81.6},{"courses_dept":"chin","courses_id":"463","maxAvg":81.6},{"courses_dept":"japn","courses_id":"312","maxAvg":81.58},{"courses_dept":"comm","courses_id":"205","maxAvg":81.58},{"courses_dept":"visa","courses_id":"321","maxAvg":81.57},{"courses_dept":"phil","courses_id":"125","maxAvg":81.56},{"courses_dept":"chbe","courses_id":"459","maxAvg":81.56},{"courses_dept":"visa","courses_id":"352","maxAvg":81.56},{"courses_dept":"gpp","courses_id":"502","maxAvg":81.56},{"courses_dept":"phil","courses_id":"388","maxAvg":81.56},{"courses_dept":"biol","courses_id":"457","maxAvg":81.56},{"courses_dept":"mine","courses_id":"486","maxAvg":81.56},{"courses_dept":"chem","courses_id":"411","maxAvg":81.56},{"courses_dept":"geog","courses_id":"395","maxAvg":81.55},{"courses_dept":"elec","courses_id":"471","maxAvg":81.53},{"courses_dept":"wood","courses_id":"249","maxAvg":81.53},{"courses_dept":"scan","courses_id":"336","maxAvg":81.53},{"courses_dept":"eosc","courses_id":"478","maxAvg":81.52},{"courses_dept":"relg","courses_id":"414","maxAvg":81.52},{"courses_dept":"chin","courses_id":"301","maxAvg":81.5},{"courses_dept":"phys","courses_id":"200","maxAvg":81.5},{"courses_dept":"comm","courses_id":"444","maxAvg":81.5},{"courses_dept":"dent","courses_id":"513","maxAvg":81.5},{"courses_dept":"comm","courses_id":"462","maxAvg":81.48},{"courses_dept":"apbi","courses_id":"401","maxAvg":81.47},{"courses_dept":"spha","courses_id":"532","maxAvg":81.45},{"courses_dept":"chin","courses_id":"307","maxAvg":81.45},{"courses_dept":"cpen","courses_id":"312","maxAvg":81.44},{"courses_dept":"fren","courses_id":"330","maxAvg":81.44},{"courses_dept":"enph","courses_id":"352","maxAvg":81.44},{"courses_dept":"civl","courses_id":"316","maxAvg":81.43},{"courses_dept":"engl","courses_id":"331","maxAvg":81.43},{"courses_dept":"kin","courses_id":"567","maxAvg":81.42},{"courses_dept":"port","courses_id":"102","maxAvg":81.42},{"courses_dept":"asia","courses_id":"372","maxAvg":81.42},{"courses_dept":"law","courses_id":"530","maxAvg":81.4},{"courses_dept":"engl","courses_id":"340","maxAvg":81.39},{"courses_dept":"name","courses_id":"566","maxAvg":81.38},{"courses_dept":"fnh","courses_id":"471","maxAvg":81.38},{"courses_dept":"busi","courses_id":"400","maxAvg":81.36},{"courses_dept":"math","courses_id":"104","maxAvg":81.36},{"courses_dept":"arch","courses_id":"515","maxAvg":81.36},{"courses_dept":"fnh","courses_id":"300","maxAvg":81.36},{"courses_dept":"poli","courses_id":"332","maxAvg":81.35},{"courses_dept":"chin","courses_id":"215","maxAvg":81.35},{"courses_dept":"kin","courses_id":"284","maxAvg":81.34},{"courses_dept":"mech","courses_id":"306","maxAvg":81.34},{"courses_dept":"econ","courses_id":"455","maxAvg":81.33},{"courses_dept":"fnh","courses_id":"250","maxAvg":81.33},{"courses_dept":"visa","courses_id":"331","maxAvg":81.33},{"courses_dept":"comm","courses_id":"449","maxAvg":81.32},{"courses_dept":"biol","courses_id":"463","maxAvg":81.32},{"courses_dept":"fre","courses_id":"528","maxAvg":81.32},{"courses_dept":"japn","courses_id":"406","maxAvg":81.31},{"courses_dept":"chbe","courses_id":"455","maxAvg":81.31},{"courses_dept":"chem","courses_id":"302","maxAvg":81.31},{"courses_dept":"swed","courses_id":"200","maxAvg":81.31},{"courses_dept":"cons","courses_id":"302","maxAvg":81.29},{"courses_dept":"math","courses_id":"121","maxAvg":81.29},{"courses_dept":"comm","courses_id":"394","maxAvg":81.29},{"courses_dept":"visa","courses_id":"180","maxAvg":81.28},{"courses_dept":"cpen","courses_id":"442","maxAvg":81.28},{"courses_dept":"soil","courses_id":"515","maxAvg":81.27},{"courses_dept":"apbi","courses_id":"311","maxAvg":81.27},{"courses_dept":"visa","courses_id":"351","maxAvg":81.26},{"courses_dept":"geog","courses_id":"446","maxAvg":81.25},{"courses_dept":"grek","courses_id":"351","maxAvg":81.25},{"courses_dept":"chem","courses_id":"123","maxAvg":81.25},{"courses_dept":"musc","courses_id":"300","maxAvg":81.24},{"courses_dept":"comm","courses_id":"393","maxAvg":81.24},{"courses_dept":"biol","courses_id":"420","maxAvg":81.24},{"courses_dept":"math","courses_id":"190","maxAvg":81.23},{"courses_dept":"civl","courses_id":"300","maxAvg":81.2},{"courses_dept":"asia","courses_id":"314","maxAvg":81.2},{"courses_dept":"eosc","courses_id":"328","maxAvg":81.19},{"courses_dept":"musc","courses_id":"309","maxAvg":81.19},{"courses_dept":"fnh","courses_id":"413","maxAvg":81.18},{"courses_dept":"cpsc","courses_id":"416","maxAvg":81.18},{"courses_dept":"mech","courses_id":"468","maxAvg":81.18},{"courses_dept":"cpsc","courses_id":"344","maxAvg":81.18},{"courses_dept":"frst","courses_id":"443","maxAvg":81.15},{"courses_dept":"musc","courses_id":"310","maxAvg":81.15},{"courses_dept":"bioc","courses_id":"440","maxAvg":81.15},{"courses_dept":"apbi","courses_id":"316","maxAvg":81.14},{"courses_dept":"phys","courses_id":"408","maxAvg":81.13},{"courses_dept":"biol","courses_id":"421","maxAvg":81.13},{"courses_dept":"japn","courses_id":"103","maxAvg":81.13},{"courses_dept":"comm","courses_id":"395","maxAvg":81.13},{"courses_dept":"span","courses_id":"280","maxAvg":81.13},{"courses_dept":"comm","courses_id":"441","maxAvg":81.11},{"courses_dept":"fipr","courses_id":"536","maxAvg":81.11},{"courses_dept":"phys","courses_id":"312","maxAvg":81.1},{"courses_dept":"relg","courses_id":"308","maxAvg":81.1},{"courses_dept":"arch","courses_id":"404","maxAvg":81.08},{"courses_dept":"sowk","courses_id":"200","maxAvg":81.08},{"courses_dept":"fren","courses_id":"111","maxAvg":81.07},{"courses_dept":"law","courses_id":"477","maxAvg":81.07},{"courses_dept":"geog","courses_id":"371","maxAvg":81.06},{"courses_dept":"anth","courses_id":"332","maxAvg":81.06},{"courses_dept":"relg","courses_id":"305","maxAvg":81.06},{"courses_dept":"law","courses_id":"444","maxAvg":81.06},{"courses_dept":"dent","courses_id":"440","maxAvg":81.05},{"courses_dept":"soci","courses_id":"382","maxAvg":81.04},{"courses_dept":"hist","courses_id":"260","maxAvg":81.03},{"courses_dept":"busi","courses_id":"455","maxAvg":81.03},{"courses_dept":"clst","courses_id":"105","maxAvg":81.02},{"courses_dept":"visa","courses_id":"360","maxAvg":81},{"courses_dept":"mtrl","courses_id":"578","maxAvg":81},{"courses_dept":"itst","courses_id":"234","maxAvg":81},{"courses_dept":"visa","courses_id":"330","maxAvg":81},{"courses_dept":"apbi","courses_id":"360","maxAvg":81},{"courses_dept":"law","courses_id":"565","maxAvg":81},{"courses_dept":"chin","courses_id":"317","maxAvg":81},{"courses_dept":"chin","courses_id":"211","maxAvg":81},{"courses_dept":"micb","courses_id":"323","maxAvg":80.98},{"courses_dept":"kin","courses_id":"360","maxAvg":80.98},{"courses_dept":"comm","courses_id":"362","maxAvg":80.97},{"courses_dept":"arth","courses_id":"340","maxAvg":80.97},{"courses_dept":"frst","courses_id":"318","maxAvg":80.97},{"courses_dept":"engl","courses_id":"328","maxAvg":80.97},{"courses_dept":"fnel","courses_id":"380","maxAvg":80.96},{"courses_dept":"mech","courses_id":"436","maxAvg":80.96},{"courses_dept":"grsj","courses_id":"401","maxAvg":80.96},{"courses_dept":"phys","courses_id":"405","maxAvg":80.95},{"courses_dept":"wood","courses_id":"492","maxAvg":80.95},{"courses_dept":"mine","courses_id":"482","maxAvg":80.95},{"courses_dept":"poli","courses_id":"351","maxAvg":80.95},{"courses_dept":"ling","courses_id":"451","maxAvg":80.95},{"courses_dept":"comm","courses_id":"407","maxAvg":80.94},{"courses_dept":"geog","courses_id":"281","maxAvg":80.94},{"courses_dept":"comm","courses_id":"461","maxAvg":80.93},{"courses_dept":"thtr","courses_id":"210","maxAvg":80.92},{"courses_dept":"comm","courses_id":"370","maxAvg":80.91},{"courses_dept":"apbi","courses_id":"413","maxAvg":80.9},{"courses_dept":"law","courses_id":"470","maxAvg":80.9},{"courses_dept":"law","courses_id":"353","maxAvg":80.89},{"courses_dept":"arth","courses_id":"226","maxAvg":80.89},{"courses_dept":"mtrl","courses_id":"460","maxAvg":80.89},{"courses_dept":"elec","courses_id":"431","maxAvg":80.88},{"courses_dept":"busi","courses_id":"329","maxAvg":80.88},{"courses_dept":"mtrl","courses_id":"392","maxAvg":80.88},{"courses_dept":"mtrl","courses_id":"455","maxAvg":80.88},{"courses_dept":"biol","courses_id":"328","maxAvg":80.88},{"courses_dept":"mtrl","courses_id":"467","maxAvg":80.87},{"courses_dept":"cpen","courses_id":"321","maxAvg":80.87},{"courses_dept":"span","courses_id":"364","maxAvg":80.87},{"courses_dept":"anth","courses_id":"451","maxAvg":80.86},{"courses_dept":"arbc","courses_id":"101","maxAvg":80.86},{"courses_dept":"apsc","courses_id":"160","maxAvg":80.86},{"courses_dept":"span","courses_id":"410","maxAvg":80.85},{"courses_dept":"hgse","courses_id":"354","maxAvg":80.84},{"courses_dept":"phys","courses_id":"401","maxAvg":80.84},{"courses_dept":"crwr","courses_id":"230","maxAvg":80.83},{"courses_dept":"eosc","courses_id":"240","maxAvg":80.82},{"courses_dept":"arcl","courses_id":"405","maxAvg":80.82},{"courses_dept":"musc","courses_id":"104","maxAvg":80.82},{"courses_dept":"eosc","courses_id":"350","maxAvg":80.8},{"courses_dept":"asic","courses_id":"200","maxAvg":80.79},{"courses_dept":"visa","courses_id":"380","maxAvg":80.79},{"courses_dept":"fre","courses_id":"501","maxAvg":80.79},{"courses_dept":"last","courses_id":"100","maxAvg":80.78},{"courses_dept":"poli","courses_id":"373","maxAvg":80.77},{"courses_dept":"eosc","courses_id":"250","maxAvg":80.76},{"courses_dept":"phil","courses_id":"599","maxAvg":80.75},{"courses_dept":"grek","courses_id":"202","maxAvg":80.75},{"courses_dept":"cohr","courses_id":"404","maxAvg":80.74},{"courses_dept":"ufor","courses_id":"200","maxAvg":80.74},{"courses_dept":"mtrl","courses_id":"358","maxAvg":80.74},{"courses_dept":"fist","courses_id":"210","maxAvg":80.73},{"courses_dept":"kin","courses_id":"515","maxAvg":80.73},{"courses_dept":"civl","courses_id":"228","maxAvg":80.73},{"courses_dept":"eosc","courses_id":"323","maxAvg":80.72},{"courses_dept":"bioc","courses_id":"301","maxAvg":80.72},{"courses_dept":"math","courses_id":"401","maxAvg":80.72},{"courses_dept":"comm","courses_id":"354","maxAvg":80.72},{"courses_dept":"fipr","courses_id":"234","maxAvg":80.71},{"courses_dept":"caps","courses_id":"390","maxAvg":80.71},{"courses_dept":"law","courses_id":"451","maxAvg":80.7},{"courses_dept":"poli","courses_id":"377","maxAvg":80.7},{"courses_dept":"surg","courses_id":"510","maxAvg":80.69},{"courses_dept":"phys","courses_id":"474","maxAvg":80.68},{"courses_dept":"busi","courses_id":"354","maxAvg":80.68},{"courses_dept":"apbi","courses_id":"415","maxAvg":80.67},{"courses_dept":"ital","courses_id":"101","maxAvg":80.67},{"courses_dept":"econ","courses_id":"460","maxAvg":80.66},{"courses_dept":"biol","courses_id":"327","maxAvg":80.65},{"courses_dept":"wood","courses_id":"499","maxAvg":80.64},{"courses_dept":"udes","courses_id":"504","maxAvg":80.63},{"courses_dept":"apbi","courses_id":"442","maxAvg":80.63},{"courses_dept":"kin","courses_id":"389","maxAvg":80.63},{"courses_dept":"cpsc","courses_id":"444","maxAvg":80.62},{"courses_dept":"apbi","courses_id":"460","maxAvg":80.62},{"courses_dept":"biol","courses_id":"342","maxAvg":80.62},{"courses_dept":"kin","courses_id":"381","maxAvg":80.61},{"courses_dept":"cohr","courses_id":"408","maxAvg":80.6},{"courses_dept":"comm","courses_id":"493","maxAvg":80.6},{"courses_dept":"civl","courses_id":"561","maxAvg":80.6},{"courses_dept":"comm","courses_id":"465","maxAvg":80.59},{"courses_dept":"asia","courses_id":"356","maxAvg":80.59},{"courses_dept":"rgla","courses_id":"371","maxAvg":80.58},{"courses_dept":"phys","courses_id":"560","maxAvg":80.57},{"courses_dept":"biol","courses_id":"325","maxAvg":80.57},{"courses_dept":"chin","courses_id":"204","maxAvg":80.56},{"courses_dept":"cpsc","courses_id":"430","maxAvg":80.55},{"courses_dept":"econ","courses_id":"335","maxAvg":80.53},{"courses_dept":"chin","courses_id":"214","maxAvg":80.53},{"courses_dept":"japn","courses_id":"102","maxAvg":80.53},{"courses_dept":"eosc","courses_id":"311","maxAvg":80.52},{"courses_dept":"geob","courses_id":"370","maxAvg":80.52},{"courses_dept":"fopr","courses_id":"261","maxAvg":80.51},{"courses_dept":"dent","courses_id":"568","maxAvg":80.5},{"courses_dept":"chin","courses_id":"208","maxAvg":80.5},{"courses_dept":"apsc","courses_id":"261","maxAvg":80.5},{"courses_dept":"arth","courses_id":"341","maxAvg":80.48},{"courses_dept":"fre","courses_id":"516","maxAvg":80.48},{"courses_dept":"civl","courses_id":"230","maxAvg":80.47},{"courses_dept":"fre","courses_id":"502","maxAvg":80.47},{"courses_dept":"fren","courses_id":"123","maxAvg":80.47},{"courses_dept":"comm","courses_id":"498","maxAvg":80.46},{"courses_dept":"civl","courses_id":"430","maxAvg":80.46},{"courses_dept":"geob","courses_id":"207","maxAvg":80.46},{"courses_dept":"busi","courses_id":"221","maxAvg":80.44},{"courses_dept":"lled","courses_id":"222","maxAvg":80.43},{"courses_dept":"biol","courses_id":"438","maxAvg":80.43},{"courses_dept":"grsj","courses_id":"300","maxAvg":80.43},{"courses_dept":"mech","courses_id":"305","maxAvg":80.41},{"courses_dept":"comm","courses_id":"491","maxAvg":80.4},{"courses_dept":"frst","courses_id":"497","maxAvg":80.4},{"courses_dept":"wood","courses_id":"386","maxAvg":80.4},{"courses_dept":"frst","courses_id":"320","maxAvg":80.39},{"courses_dept":"asia","courses_id":"355","maxAvg":80.39},{"courses_dept":"law","courses_id":"387","maxAvg":80.39},{"courses_dept":"lled","courses_id":"211","maxAvg":80.38},{"courses_dept":"apbi","courses_id":"342","maxAvg":80.38},{"courses_dept":"civl","courses_id":"404","maxAvg":80.38},{"courses_dept":"latn","courses_id":"102","maxAvg":80.38},{"courses_dept":"law","courses_id":"316","maxAvg":80.37},{"courses_dept":"relg","courses_id":"312","maxAvg":80.36},{"courses_dept":"mech","courses_id":"360","maxAvg":80.36},{"courses_dept":"comm","courses_id":"405","maxAvg":80.36},{"courses_dept":"micb","courses_id":"405","maxAvg":80.36},{"courses_dept":"engl","courses_id":"318","maxAvg":80.36},{"courses_dept":"elec","courses_id":"463","maxAvg":80.36},{"courses_dept":"comm","courses_id":"495","maxAvg":80.36},{"courses_dept":"comm","courses_id":"482","maxAvg":80.35},{"courses_dept":"elec","courses_id":"302","maxAvg":80.34},{"courses_dept":"biol","courses_id":"201","maxAvg":80.33},{"courses_dept":"soci","courses_id":"423","maxAvg":80.32},{"courses_dept":"visa","courses_id":"340","maxAvg":80.32},{"courses_dept":"mech","courses_id":"462","maxAvg":80.32},{"courses_dept":"comm","courses_id":"438","maxAvg":80.3},{"courses_dept":"fnis","courses_id":"451","maxAvg":80.28},{"courses_dept":"eosc","courses_id":"314","maxAvg":80.27},{"courses_dept":"cohr","courses_id":"405","maxAvg":80.26},{"courses_dept":"mech","courses_id":"469","maxAvg":80.25},{"courses_dept":"comm","courses_id":"446","maxAvg":80.25},{"courses_dept":"law","courses_id":"449","maxAvg":80.25},{"courses_dept":"kin","courses_id":"103","maxAvg":80.25},{"courses_dept":"chem","courses_id":"413","maxAvg":80.25},{"courses_dept":"clst","courses_id":"212","maxAvg":80.23},{"courses_dept":"biol","courses_id":"153","maxAvg":80.23},{"courses_dept":"engl","courses_id":"358","maxAvg":80.23},{"courses_dept":"apbi","courses_id":"312","maxAvg":80.22},{"courses_dept":"law","courses_id":"465","maxAvg":80.21},{"courses_dept":"engl","courses_id":"319","maxAvg":80.21},{"courses_dept":"thtr","courses_id":"323","maxAvg":80.21},{"courses_dept":"mine","courses_id":"331","maxAvg":80.21},{"courses_dept":"micb","courses_id":"424","maxAvg":80.2},{"courses_dept":"eece","courses_id":"512","maxAvg":80.2},{"courses_dept":"mech","courses_id":"435","maxAvg":80.19},{"courses_dept":"phys","courses_id":"102","maxAvg":80.18},{"courses_dept":"comm","courses_id":"295","maxAvg":80.18},{"courses_dept":"cpsc","courses_id":"410","maxAvg":80.18},{"courses_dept":"astr","courses_id":"102","maxAvg":80.17},{"courses_dept":"clst","courses_id":"333","maxAvg":80.17},{"courses_dept":"stat","courses_id":"300","maxAvg":80.17},{"courses_dept":"span","courses_id":"101","maxAvg":80.15},{"courses_dept":"path","courses_id":"303","maxAvg":80.14},{"courses_dept":"phys","courses_id":"101","maxAvg":80.14},{"courses_dept":"phil","courses_id":"101","maxAvg":80.14},{"courses_dept":"biol","courses_id":"446","maxAvg":80.14},{"courses_dept":"arth","courses_id":"347","maxAvg":80.13},{"courses_dept":"grsj","courses_id":"327","maxAvg":80.13},{"courses_dept":"econ","courses_id":"337","maxAvg":80.12},{"courses_dept":"astr","courses_id":"406","maxAvg":80.11},{"courses_dept":"cons","courses_id":"340","maxAvg":80.11},{"courses_dept":"visa","courses_id":"210","maxAvg":80.11},{"courses_dept":"fnis","courses_id":"100","maxAvg":80.1},{"courses_dept":"civl","courses_id":"408","maxAvg":80.1},{"courses_dept":"cohr","courses_id":"303","maxAvg":80.1},{"courses_dept":"itst","courses_id":"385","maxAvg":80.1},{"courses_dept":"chin","courses_id":"315","maxAvg":80.1},{"courses_dept":"math","courses_id":"256","maxAvg":80.08},{"courses_dept":"chin","courses_id":"431","maxAvg":80.08},{"courses_dept":"anth","courses_id":"302","maxAvg":80.07},{"courses_dept":"fist","courses_id":"338","maxAvg":80.06},{"courses_dept":"comm","courses_id":"203","maxAvg":80.05},{"courses_dept":"mtrl","courses_id":"451","maxAvg":80.04},{"courses_dept":"comm","courses_id":"454","maxAvg":80.03},{"courses_dept":"grsj","courses_id":"303","maxAvg":80.03},{"courses_dept":"clst","courses_id":"311","maxAvg":80.02},{"courses_dept":"visa","courses_id":"183","maxAvg":80},{"courses_dept":"mech","courses_id":"473","maxAvg":80},{"courses_dept":"visa","courses_id":"481","maxAvg":80},{"courses_dept":"math","courses_id":"100","maxAvg":80},{"courses_dept":"law","courses_id":"562","maxAvg":80},{"courses_dept":"ends","courses_id":"281","maxAvg":79.99},{"courses_dept":"econ","courses_id":"102","maxAvg":79.99},{"courses_dept":"eosc","courses_id":"320","maxAvg":79.98},{"courses_dept":"civl","courses_id":"200","maxAvg":79.95},{"courses_dept":"cons","courses_id":"210","maxAvg":79.94},{"courses_dept":"visa","courses_id":"260","maxAvg":79.94},{"courses_dept":"econ","courses_id":"390","maxAvg":79.94},{"courses_dept":"visa","courses_id":"480","maxAvg":79.94},{"courses_dept":"eosc","courses_id":"340","maxAvg":79.93},{"courses_dept":"isci","courses_id":"422","maxAvg":79.92},{"courses_dept":"stat","courses_id":"241","maxAvg":79.92},{"courses_dept":"fre","courses_id":"306","maxAvg":79.9},{"courses_dept":"arch","courses_id":"505","maxAvg":79.9},{"courses_dept":"fhis","courses_id":"333","maxAvg":79.89},{"courses_dept":"phys","courses_id":"107","maxAvg":79.89},{"courses_dept":"arbc","courses_id":"202","maxAvg":79.88},{"courses_dept":"cpsc","courses_id":"421","maxAvg":79.88},{"courses_dept":"law","courses_id":"305","maxAvg":79.86},{"courses_dept":"chin","courses_id":"483","maxAvg":79.86},{"courses_dept":"chin","courses_id":"205","maxAvg":79.86},{"courses_dept":"fren","courses_id":"221","maxAvg":79.85},{"courses_dept":"fre","courses_id":"385","maxAvg":79.85},{"courses_dept":"comm","courses_id":"445","maxAvg":79.85},{"courses_dept":"econ","courses_id":"317","maxAvg":79.85},{"courses_dept":"fren","courses_id":"112","maxAvg":79.84},{"courses_dept":"span","courses_id":"302","maxAvg":79.84},{"courses_dept":"fnis","courses_id":"310","maxAvg":79.82},{"courses_dept":"poli","courses_id":"366","maxAvg":79.82},{"courses_dept":"mine","courses_id":"302","maxAvg":79.82},{"courses_dept":"thtr","courses_id":"211","maxAvg":79.82},{"courses_dept":"atsc","courses_id":"404","maxAvg":79.81},{"courses_dept":"soci","courses_id":"220","maxAvg":79.8},{"courses_dept":"asia","courses_id":"250","maxAvg":79.79},{"courses_dept":"mtrl","courses_id":"495","maxAvg":79.77},{"courses_dept":"cohr","courses_id":"307","maxAvg":79.77},{"courses_dept":"ling","courses_id":"201","maxAvg":79.76},{"courses_dept":"stat","courses_id":"251","maxAvg":79.75},{"courses_dept":"lled","courses_id":"220","maxAvg":79.75},{"courses_dept":"dent","courses_id":"569","maxAvg":79.75},{"courses_dept":"frst","courses_id":"436","maxAvg":79.75},{"courses_dept":"wood","courses_id":"465","maxAvg":79.75},{"courses_dept":"eosc","courses_id":"353","maxAvg":79.75},{"courses_dept":"phys","courses_id":"438","maxAvg":79.74},{"courses_dept":"fist","courses_id":"100","maxAvg":79.74},{"courses_dept":"cogs","courses_id":"303","maxAvg":79.73},{"courses_dept":"arth","courses_id":"338","maxAvg":79.73},{"courses_dept":"arth","courses_id":"448","maxAvg":79.73},{"courses_dept":"geob","courses_id":"309","maxAvg":79.72},{"courses_dept":"span","courses_id":"201","maxAvg":79.72},{"courses_dept":"comm","courses_id":"336","maxAvg":79.71},{"courses_dept":"ital","courses_id":"201","maxAvg":79.71},{"courses_dept":"chbe","courses_id":"402","maxAvg":79.71},{"courses_dept":"engl","courses_id":"232","maxAvg":79.71},{"courses_dept":"ling","courses_id":"314","maxAvg":79.71},{"courses_dept":"apsc","courses_id":"377","maxAvg":79.7},{"courses_dept":"ufor","courses_id":"100","maxAvg":79.7},{"courses_dept":"ling","courses_id":"433","maxAvg":79.7},{"courses_dept":"japn","courses_id":"301","maxAvg":79.7},{"courses_dept":"germ","courses_id":"304","maxAvg":79.69},{"courses_dept":"micb","courses_id":"202","maxAvg":79.69},{"courses_dept":"grsj","courses_id":"305","maxAvg":79.68},{"courses_dept":"econ","courses_id":"466","maxAvg":79.67},{"courses_dept":"geob","courses_id":"406","maxAvg":79.67},{"courses_dept":"eosc","courses_id":"112","maxAvg":79.67},{"courses_dept":"relg","courses_id":"203","maxAvg":79.66},{"courses_dept":"biol","courses_id":"155","maxAvg":79.65},{"courses_dept":"fnh","courses_id":"313","maxAvg":79.64},{"courses_dept":"arth","courses_id":"322","maxAvg":79.63},{"courses_dept":"japn","courses_id":"210","maxAvg":79.63},{"courses_dept":"chin","courses_id":"481","maxAvg":79.6},{"courses_dept":"comm","courses_id":"353","maxAvg":79.6},{"courses_dept":"chem","courses_id":"205","maxAvg":79.6},{"courses_dept":"econ","courses_id":"456","maxAvg":79.59},{"courses_dept":"arcl","courses_id":"309","maxAvg":79.59},{"courses_dept":"arth","courses_id":"363","maxAvg":79.58},{"courses_dept":"fnh","courses_id":"398","maxAvg":79.58},{"courses_dept":"clst","courses_id":"353","maxAvg":79.58},{"courses_dept":"engl","courses_id":"231","maxAvg":79.57},{"courses_dept":"fmst","courses_id":"238","maxAvg":79.57},{"courses_dept":"clst","courses_id":"331","maxAvg":79.56},{"courses_dept":"span","courses_id":"357","maxAvg":79.56},{"courses_dept":"busi","courses_id":"370","maxAvg":79.56},{"courses_dept":"wood","courses_id":"493","maxAvg":79.55},{"courses_dept":"apbi","courses_id":"417","maxAvg":79.55},{"courses_dept":"fnh","courses_id":"350","maxAvg":79.54},{"courses_dept":"japn","courses_id":"211","maxAvg":79.53},{"courses_dept":"phar","courses_id":"452","maxAvg":79.52},{"courses_dept":"elec","courses_id":"474","maxAvg":79.5},{"courses_dept":"eced","courses_id":"400","maxAvg":79.5},{"courses_dept":"clch","courses_id":"389","maxAvg":79.5},{"courses_dept":"busi","courses_id":"291","maxAvg":79.5},{"courses_dept":"geog","courses_id":"362","maxAvg":79.49},{"courses_dept":"comm","courses_id":"473","maxAvg":79.48},{"courses_dept":"japn","courses_id":"212","maxAvg":79.48},{"courses_dept":"kin","courses_id":"362","maxAvg":79.48},{"courses_dept":"fren","courses_id":"101","maxAvg":79.47},{"courses_dept":"asia","courses_id":"341","maxAvg":79.46},{"courses_dept":"cpsc","courses_id":"302","maxAvg":79.46},{"courses_dept":"korn","courses_id":"302","maxAvg":79.45},{"courses_dept":"lled","courses_id":"212","maxAvg":79.44},{"courses_dept":"asia","courses_id":"498","maxAvg":79.44},{"courses_dept":"apbi","courses_id":"495","maxAvg":79.44},{"courses_dept":"asia","courses_id":"369","maxAvg":79.44},{"courses_dept":"apsc","courses_id":"440","maxAvg":79.43},{"courses_dept":"chin","courses_id":"113","maxAvg":79.43},{"courses_dept":"poli","courses_id":"380","maxAvg":79.42},{"courses_dept":"psyc","courses_id":"409","maxAvg":79.42},{"courses_dept":"anth","courses_id":"428","maxAvg":79.42},{"courses_dept":"span","courses_id":"365","maxAvg":79.42},{"courses_dept":"civl","courses_id":"231","maxAvg":79.41},{"courses_dept":"civl","courses_id":"403","maxAvg":79.41},{"courses_dept":"econ","courses_id":"301","maxAvg":79.41},{"courses_dept":"fren","courses_id":"102","maxAvg":79.41},{"courses_dept":"fnh","courses_id":"402","maxAvg":79.4},{"courses_dept":"law","courses_id":"505","maxAvg":79.4},{"courses_dept":"econ","courses_id":"336","maxAvg":79.4},{"courses_dept":"apsc","courses_id":"101","maxAvg":79.4},{"courses_dept":"lled","courses_id":"210","maxAvg":79.4},{"courses_dept":"poli","courses_id":"334","maxAvg":79.4},{"courses_dept":"comm","courses_id":"291","maxAvg":79.37},{"courses_dept":"arcl","courses_id":"424","maxAvg":79.36},{"courses_dept":"soci","courses_id":"444","maxAvg":79.36},{"courses_dept":"cpen","courses_id":"412","maxAvg":79.35},{"courses_dept":"comm","courses_id":"365","maxAvg":79.35},{"courses_dept":"visa","courses_id":"241","maxAvg":79.33},{"courses_dept":"clst","courses_id":"204","maxAvg":79.33},{"courses_dept":"econ","courses_id":"310","maxAvg":79.33},{"courses_dept":"elec","courses_id":"481","maxAvg":79.33},{"courses_dept":"wood","courses_id":"474","maxAvg":79.31},{"courses_dept":"visa","courses_id":"230","maxAvg":79.29},{"courses_dept":"mech","courses_id":"491","maxAvg":79.28},{"courses_dept":"lled","courses_id":"223","maxAvg":79.28},{"courses_dept":"eosc","courses_id":"331","maxAvg":79.27},{"courses_dept":"comm","courses_id":"460","maxAvg":79.27},{"courses_dept":"clst","courses_id":"111","maxAvg":79.27},{"courses_dept":"asia","courses_id":"377","maxAvg":79.27},{"courses_dept":"econ","courses_id":"441","maxAvg":79.26},{"courses_dept":"soci","courses_id":"380","maxAvg":79.26},{"courses_dept":"chem","courses_id":"235","maxAvg":79.25},{"courses_dept":"elec","courses_id":"432","maxAvg":79.25},{"courses_dept":"cons","courses_id":"495","maxAvg":79.25},{"courses_dept":"engl","courses_id":"343","maxAvg":79.24},{"courses_dept":"biol","courses_id":"418","maxAvg":79.22},{"courses_dept":"fre","courses_id":"295","maxAvg":79.2},{"courses_dept":"pers","courses_id":"201","maxAvg":79.2},{"courses_dept":"hist","courses_id":"382","maxAvg":79.19},{"courses_dept":"biol","courses_id":"234","maxAvg":79.18},{"courses_dept":"ital","courses_id":"202","maxAvg":79.18},{"courses_dept":"asia","courses_id":"337","maxAvg":79.18},{"courses_dept":"span","courses_id":"221","maxAvg":79.18},{"courses_dept":"psyc","courses_id":"365","maxAvg":79.17},{"courses_dept":"comm","courses_id":"306","maxAvg":79.17},{"courses_dept":"wood","courses_id":"282","maxAvg":79.17},{"courses_dept":"nest","courses_id":"101","maxAvg":79.16},{"courses_dept":"chin","courses_id":"471","maxAvg":79.16},{"courses_dept":"chbe","courses_id":"262","maxAvg":79.16},{"courses_dept":"fnel","courses_id":"180","maxAvg":79.15},{"courses_dept":"wrds","courses_id":"150","maxAvg":79.12},{"courses_dept":"poli","courses_id":"110","maxAvg":79.12},{"courses_dept":"ling","courses_id":"327","maxAvg":79.11},{"courses_dept":"geog","courses_id":"429","maxAvg":79.1},{"courses_dept":"comm","courses_id":"415","maxAvg":79.1},{"courses_dept":"japn","courses_id":"213","maxAvg":79.08},{"courses_dept":"geog","courses_id":"310","maxAvg":79.07},{"courses_dept":"geob","courses_id":"402","maxAvg":79.06},{"courses_dept":"eosc","courses_id":"428","maxAvg":79.06},{"courses_dept":"grek","courses_id":"102","maxAvg":79.05},{"courses_dept":"latn","courses_id":"350","maxAvg":79.05},{"courses_dept":"astr","courses_id":"101","maxAvg":79.05},{"courses_dept":"comm","courses_id":"329","maxAvg":79.04},{"courses_dept":"biol","courses_id":"321","maxAvg":79.04},{"courses_dept":"chin","courses_id":"484","maxAvg":79.03},{"courses_dept":"hist","courses_id":"432","maxAvg":79.02},{"courses_dept":"geob","courses_id":"372","maxAvg":79.02},{"courses_dept":"kin","courses_id":"151","maxAvg":79.01},{"courses_dept":"micb","courses_id":"301","maxAvg":79.01},{"courses_dept":"law","courses_id":"397","maxAvg":79},{"courses_dept":"anth","courses_id":"378","maxAvg":79},{"courses_dept":"law","courses_id":"408","maxAvg":79},{"courses_dept":"law","courses_id":"409","maxAvg":79},{"courses_dept":"chem","courses_id":"406","maxAvg":79},{"courses_dept":"law","courses_id":"412","maxAvg":79},{"courses_dept":"rmst","courses_id":"234","maxAvg":79},{"courses_dept":"law","courses_id":"489","maxAvg":79},{"courses_dept":"kin","courses_id":"369","maxAvg":79},{"courses_dept":"law","courses_id":"448","maxAvg":79},{"courses_dept":"comm","courses_id":"657","maxAvg":79},{"courses_dept":"econ","courses_id":"302","maxAvg":79},{"courses_dept":"soci","courses_id":"476","maxAvg":79},{"courses_dept":"law","courses_id":"410","maxAvg":79},{"courses_dept":"hist","courses_id":"379","maxAvg":78.98},{"courses_dept":"frst","courses_id":"386","maxAvg":78.98},{"courses_dept":"igen","courses_id":"450","maxAvg":78.97},{"courses_dept":"busi","courses_id":"401","maxAvg":78.96},{"courses_dept":"crwr","courses_id":"205","maxAvg":78.95},{"courses_dept":"law","courses_id":"468","maxAvg":78.94},{"courses_dept":"chin","courses_id":"111","maxAvg":78.94},{"courses_dept":"econ","courses_id":"221","maxAvg":78.93},{"courses_dept":"math","courses_id":"102","maxAvg":78.93},{"courses_dept":"law","courses_id":"372","maxAvg":78.93},{"courses_dept":"comm","courses_id":"355","maxAvg":78.93},{"courses_dept":"econ","courses_id":"356","maxAvg":78.93},{"courses_dept":"chem","courses_id":"251","maxAvg":78.92},{"courses_dept":"chbe","courses_id":"419","maxAvg":78.91},{"courses_dept":"mtrl","courses_id":"478","maxAvg":78.91},{"courses_dept":"fopr","courses_id":"464","maxAvg":78.91},{"courses_dept":"eosc","courses_id":"223","maxAvg":78.91},{"courses_dept":"asia","courses_id":"387","maxAvg":78.9},{"courses_dept":"geog","courses_id":"457","maxAvg":78.9},{"courses_dept":"chem","courses_id":"325","maxAvg":78.9},{"courses_dept":"asia","courses_id":"338","maxAvg":78.9},{"courses_dept":"relg","courses_id":"201","maxAvg":78.89},{"courses_dept":"wood","courses_id":"482","maxAvg":78.89},{"courses_dept":"hist","courses_id":"323","maxAvg":78.89},{"courses_dept":"poli","courses_id":"101","maxAvg":78.88},{"courses_dept":"engl","courses_id":"227","maxAvg":78.88},{"courses_dept":"lled","courses_id":"213","maxAvg":78.87},{"courses_dept":"anth","courses_id":"227","maxAvg":78.86},{"courses_dept":"law","courses_id":"340","maxAvg":78.83},{"courses_dept":"frst","courses_id":"305","maxAvg":78.82},{"courses_dept":"frst","courses_id":"399","maxAvg":78.82},{"courses_dept":"phys","courses_id":"100","maxAvg":78.82},{"courses_dept":"fren","courses_id":"370","maxAvg":78.81},{"courses_dept":"clst","courses_id":"334","maxAvg":78.81},{"courses_dept":"psyc","courses_id":"366","maxAvg":78.81},{"courses_dept":"biol","courses_id":"324","maxAvg":78.8},{"courses_dept":"law","courses_id":"382","maxAvg":78.8},{"courses_dept":"latn","courses_id":"201","maxAvg":78.77},{"courses_dept":"asia","courses_id":"315","maxAvg":78.77},{"courses_dept":"wood","courses_id":"290","maxAvg":78.76},{"courses_dept":"law","courses_id":"394","maxAvg":78.75},{"courses_dept":"comm","courses_id":"280","maxAvg":78.75},{"courses_dept":"micb","courses_id":"418","maxAvg":78.74},{"courses_dept":"fren","courses_id":"357","maxAvg":78.74},{"courses_dept":"hist","courses_id":"418","maxAvg":78.73},{"courses_dept":"fmst","courses_id":"210","maxAvg":78.73},{"courses_dept":"chin","courses_id":"473","maxAvg":78.73},{"courses_dept":"laso","courses_id":"204","maxAvg":78.72},{"courses_dept":"mtrl","courses_id":"458","maxAvg":78.72},{"courses_dept":"chin","courses_id":"107","maxAvg":78.71},{"courses_dept":"crwr","courses_id":"201","maxAvg":78.71},{"courses_dept":"relg","courses_id":"309","maxAvg":78.71},{"courses_dept":"japn","courses_id":"416","maxAvg":78.71},{"courses_dept":"astr","courses_id":"311","maxAvg":78.7},{"courses_dept":"comm","courses_id":"293","maxAvg":78.7},{"courses_dept":"math","courses_id":"323","maxAvg":78.69},{"courses_dept":"elec","courses_id":"421","maxAvg":78.69},{"courses_dept":"math","courses_id":"105","maxAvg":78.69},{"courses_dept":"arth","courses_id":"225","maxAvg":78.68},{"courses_dept":"elec","courses_id":"453","maxAvg":78.68},{"courses_dept":"ling","courses_id":"200","maxAvg":78.67},{"courses_dept":"fmst","courses_id":"312","maxAvg":78.67},{"courses_dept":"ling","courses_id":"319","maxAvg":78.64},{"courses_dept":"econ","courses_id":"421","maxAvg":78.64},{"courses_dept":"japn","courses_id":"251","maxAvg":78.63},{"courses_dept":"hist","courses_id":"363","maxAvg":78.63},{"courses_dept":"kin","courses_id":"462","maxAvg":78.63},{"courses_dept":"mine","courses_id":"310","maxAvg":78.62},{"courses_dept":"soci","courses_id":"342","maxAvg":78.61},{"courses_dept":"astr","courses_id":"310","maxAvg":78.61},{"courses_dept":"micb","courses_id":"203","maxAvg":78.6},{"courses_dept":"chin","courses_id":"207","maxAvg":78.6},{"courses_dept":"frst","courses_id":"421","maxAvg":78.6},{"courses_dept":"chem","courses_id":"121","maxAvg":78.59},{"courses_dept":"fnh","courses_id":"326","maxAvg":78.58},{"courses_dept":"asia","courses_id":"305","maxAvg":78.58},{"courses_dept":"geog","courses_id":"423","maxAvg":78.57},{"courses_dept":"law","courses_id":"461","maxAvg":78.56},{"courses_dept":"fnel","courses_id":"102","maxAvg":78.55},{"courses_dept":"grsj","courses_id":"326","maxAvg":78.55},{"courses_dept":"busi","courses_id":"453","maxAvg":78.53},{"courses_dept":"econ","courses_id":"370","maxAvg":78.53},{"courses_dept":"arth","courses_id":"361","maxAvg":78.52},{"courses_dept":"hist","courses_id":"455","maxAvg":78.52},{"courses_dept":"kin","courses_id":"261","maxAvg":78.51},{"courses_dept":"japn","courses_id":"410","maxAvg":78.5},{"courses_dept":"frst","courses_id":"304","maxAvg":78.5},{"courses_dept":"law","courses_id":"453","maxAvg":78.5},{"courses_dept":"asia","courses_id":"382","maxAvg":78.5},{"courses_dept":"mech","courses_id":"405","maxAvg":78.48},{"courses_dept":"chin","courses_id":"108","maxAvg":78.47},{"courses_dept":"comm","courses_id":"382","maxAvg":78.47},{"courses_dept":"phar","courses_id":"409","maxAvg":78.47},{"courses_dept":"urst","courses_id":"200","maxAvg":78.47},{"courses_dept":"arth","courses_id":"346","maxAvg":78.45},{"courses_dept":"frst","courses_id":"444","maxAvg":78.44},{"courses_dept":"law","courses_id":"506","maxAvg":78.43},{"courses_dept":"cpen","courses_id":"281","maxAvg":78.42},{"courses_dept":"hist","courses_id":"441","maxAvg":78.4},{"courses_dept":"astr","courses_id":"403","maxAvg":78.4},{"courses_dept":"biol","courses_id":"364","maxAvg":78.4},{"courses_dept":"frst","courses_id":"239","maxAvg":78.39},{"courses_dept":"hist","courses_id":"405","maxAvg":78.39},{"courses_dept":"law","courses_id":"386","maxAvg":78.38},{"courses_dept":"econ","courses_id":"309","maxAvg":78.35},{"courses_dept":"hist","courses_id":"425","maxAvg":78.34},{"courses_dept":"cpsc","courses_id":"322","maxAvg":78.34},{"courses_dept":"biol","courses_id":"433","maxAvg":78.33},{"courses_dept":"chin","courses_id":"203","maxAvg":78.33},{"courses_dept":"law","courses_id":"460","maxAvg":78.33},{"courses_dept":"clch","courses_id":"399","maxAvg":78.33},{"courses_dept":"busi","courses_id":"445","maxAvg":78.33},{"courses_dept":"elec","courses_id":"454","maxAvg":78.32},{"courses_dept":"chin","courses_id":"433","maxAvg":78.32},{"courses_dept":"dhyg","courses_id":"108","maxAvg":78.32},{"courses_dept":"cpsc","courses_id":"420","maxAvg":78.32},{"courses_dept":"comm","courses_id":"120","maxAvg":78.31},{"courses_dept":"ling","courses_id":"209","maxAvg":78.3},{"courses_dept":"cpsc","courses_id":"422","maxAvg":78.3},{"courses_dept":"econ","courses_id":"345","maxAvg":78.3},{"courses_dept":"visa","courses_id":"341","maxAvg":78.29},{"courses_dept":"asia","courses_id":"357","maxAvg":78.29},{"courses_dept":"relg","courses_id":"101","maxAvg":78.28},{"courses_dept":"lfs","courses_id":"150","maxAvg":78.28},{"courses_dept":"econ","courses_id":"355","maxAvg":78.28},{"courses_dept":"span","courses_id":"358","maxAvg":78.27},{"courses_dept":"arcl","courses_id":"305","maxAvg":78.27},{"courses_dept":"arth","courses_id":"323","maxAvg":78.26},{"courses_dept":"geog","courses_id":"419","maxAvg":78.25},{"courses_dept":"math","courses_id":"223","maxAvg":78.25},{"courses_dept":"japn","courses_id":"302","maxAvg":78.24},{"courses_dept":"comm","courses_id":"292","maxAvg":78.24},{"courses_dept":"cnrs","courses_id":"370","maxAvg":78.23},{"courses_dept":"civl","courses_id":"215","maxAvg":78.22},{"courses_dept":"clst","courses_id":"260","maxAvg":78.2},{"courses_dept":"poli","courses_id":"327","maxAvg":78.2},{"courses_dept":"apbi","courses_id":"324","maxAvg":78.2},{"courses_dept":"chin","courses_id":"201","maxAvg":78.2},{"courses_dept":"econ","courses_id":"365","maxAvg":78.19},{"courses_dept":"hist","courses_id":"319","maxAvg":78.19},{"courses_dept":"fren","courses_id":"360","maxAvg":78.18},{"courses_dept":"civl","courses_id":"320","maxAvg":78.18},{"courses_dept":"comm","courses_id":"434","maxAvg":78.17},{"courses_dept":"phys","courses_id":"301","maxAvg":78.16},{"courses_dept":"fren","courses_id":"334","maxAvg":78.15},{"courses_dept":"germ","courses_id":"402","maxAvg":78.14},{"courses_dept":"civl","courses_id":"315","maxAvg":78.13},{"courses_dept":"asia","courses_id":"365","maxAvg":78.12},{"courses_dept":"math","courses_id":"307","maxAvg":78.12},{"courses_dept":"geog","courses_id":"410","maxAvg":78.12},{"courses_dept":"math","courses_id":"302","maxAvg":78.11},{"courses_dept":"mtrl","courses_id":"456","maxAvg":78.11},{"courses_dept":"phil","courses_id":"150","maxAvg":78.09},{"courses_dept":"geog","courses_id":"312","maxAvg":78.09},{"courses_dept":"poli","courses_id":"100","maxAvg":78.09},{"courses_dept":"clst","courses_id":"319","maxAvg":78.09},{"courses_dept":"thtr","courses_id":"420","maxAvg":78.08},{"courses_dept":"elec","courses_id":"412","maxAvg":78.07},{"courses_dept":"law","courses_id":"440","maxAvg":78.06},{"courses_dept":"hist","courses_id":"273","maxAvg":78.05},{"courses_dept":"phar","courses_id":"498","maxAvg":78.05},{"courses_dept":"math","courses_id":"210","maxAvg":78.03},{"courses_dept":"arth","courses_id":"251","maxAvg":78},{"courses_dept":"astu","courses_id":"360","maxAvg":78},{"courses_dept":"fren","courses_id":"457","maxAvg":78},{"courses_dept":"law","courses_id":"564","maxAvg":78},{"courses_dept":"biol","courses_id":"121","maxAvg":78},{"courses_dept":"appp","courses_id":"505","maxAvg":78},{"courses_dept":"law","courses_id":"566","maxAvg":78},{"courses_dept":"appp","courses_id":"503","maxAvg":77.99},{"courses_dept":"econ","courses_id":"471","maxAvg":77.98},{"courses_dept":"biol","courses_id":"455","maxAvg":77.97},{"courses_dept":"mech","courses_id":"280","maxAvg":77.97},{"courses_dept":"mech","courses_id":"358","maxAvg":77.97},{"courses_dept":"kin","courses_id":"230","maxAvg":77.96},{"courses_dept":"econ","courses_id":"472","maxAvg":77.94},{"courses_dept":"soci","courses_id":"328","maxAvg":77.94},{"courses_dept":"hist","courses_id":"391","maxAvg":77.93},{"courses_dept":"asia","courses_id":"410","maxAvg":77.92},{"courses_dept":"chin","courses_id":"105","maxAvg":77.91},{"courses_dept":"phys","courses_id":"314","maxAvg":77.89},{"courses_dept":"mine","courses_id":"488","maxAvg":77.89},{"courses_dept":"ursy","courses_id":"510","maxAvg":77.89},{"courses_dept":"asia","courses_id":"385","maxAvg":77.88},{"courses_dept":"hist","courses_id":"364","maxAvg":77.88},{"courses_dept":"law","courses_id":"525","maxAvg":77.88},{"courses_dept":"hist","courses_id":"408","maxAvg":77.87},{"courses_dept":"comm","courses_id":"294","maxAvg":77.86},{"courses_dept":"law","courses_id":"452","maxAvg":77.86},{"courses_dept":"stat","courses_id":"443","maxAvg":77.84},{"courses_dept":"econ","courses_id":"234","maxAvg":77.83},{"courses_dept":"kin","courses_id":"231","maxAvg":77.82},{"courses_dept":"biol","courses_id":"336","maxAvg":77.81},{"courses_dept":"anth","courses_id":"301","maxAvg":77.81},{"courses_dept":"clst","courses_id":"312","maxAvg":77.79},{"courses_dept":"law","courses_id":"404","maxAvg":77.78},{"courses_dept":"chbe","courses_id":"351","maxAvg":77.78},{"courses_dept":"mtrl","courses_id":"442","maxAvg":77.77},{"courses_dept":"span","courses_id":"102","maxAvg":77.77},{"courses_dept":"japn","courses_id":"250","maxAvg":77.76},{"courses_dept":"phys","courses_id":"341","maxAvg":77.76},{"courses_dept":"civl","courses_id":"332","maxAvg":77.75},{"courses_dept":"poli","courses_id":"303","maxAvg":77.75},{"courses_dept":"chbe","courses_id":"345","maxAvg":77.75},{"courses_dept":"ling","courses_id":"345","maxAvg":77.75},{"courses_dept":"fist","courses_id":"332","maxAvg":77.75},{"courses_dept":"eosc","courses_id":"475","maxAvg":77.74},{"courses_dept":"chbe","courses_id":"356","maxAvg":77.74},{"courses_dept":"thtr","courses_id":"245","maxAvg":77.73},{"courses_dept":"geob","courses_id":"308","maxAvg":77.73},{"courses_dept":"biol","courses_id":"362","maxAvg":77.73},{"courses_dept":"fmst","courses_id":"314","maxAvg":77.72},{"courses_dept":"mine","courses_id":"292","maxAvg":77.71},{"courses_dept":"kin","courses_id":"473","maxAvg":77.7},{"courses_dept":"hist","courses_id":"313","maxAvg":77.69},{"courses_dept":"engl","courses_id":"110","maxAvg":77.68},{"courses_dept":"cpsc","courses_id":"425","maxAvg":77.68},{"courses_dept":"econ","courses_id":"371","maxAvg":77.67},{"courses_dept":"math","courses_id":"342","maxAvg":77.67},{"courses_dept":"poli","courses_id":"260","maxAvg":77.65},{"courses_dept":"econ","courses_id":"339","maxAvg":77.65},{"courses_dept":"musc","courses_id":"101","maxAvg":77.64},{"courses_dept":"law","courses_id":"476","maxAvg":77.64},{"courses_dept":"relg","courses_id":"321","maxAvg":77.63},{"courses_dept":"phar","courses_id":"451","maxAvg":77.63},{"courses_dept":"mech","courses_id":"260","maxAvg":77.63},{"courses_dept":"geob","courses_id":"472","maxAvg":77.63},{"courses_dept":"cpsc","courses_id":"303","maxAvg":77.62},{"courses_dept":"mech","courses_id":"466","maxAvg":77.61},{"courses_dept":"hist","courses_id":"409","maxAvg":77.6},{"courses_dept":"itst","courses_id":"345","maxAvg":77.58},{"courses_dept":"relg","courses_id":"306","maxAvg":77.55},{"courses_dept":"eosc","courses_id":"211","maxAvg":77.55},{"courses_dept":"chem","courses_id":"245","maxAvg":77.54},{"courses_dept":"cons","courses_id":"330","maxAvg":77.54},{"courses_dept":"geob","courses_id":"409","maxAvg":77.5},{"courses_dept":"chem","courses_id":"403","maxAvg":77.5},{"courses_dept":"phys","courses_id":"350","maxAvg":77.48},{"courses_dept":"asia","courses_id":"326","maxAvg":77.48},{"courses_dept":"japn","courses_id":"300","maxAvg":77.47},{"courses_dept":"mtrl","courses_id":"250","maxAvg":77.47},{"courses_dept":"japn","courses_id":"151","maxAvg":77.47},{"courses_dept":"math","courses_id":"253","maxAvg":77.46},{"courses_dept":"ling","courses_id":"311","maxAvg":77.46},{"courses_dept":"chbe","courses_id":"381","maxAvg":77.46},{"courses_dept":"fnh","courses_id":"330","maxAvg":77.45},{"courses_dept":"engl","courses_id":"223","maxAvg":77.45},{"courses_dept":"nest","courses_id":"301","maxAvg":77.45},{"courses_dept":"wood","courses_id":"373","maxAvg":77.45},{"courses_dept":"thtr","courses_id":"450","maxAvg":77.44},{"courses_dept":"elec","courses_id":"344","maxAvg":77.43},{"courses_dept":"eosc","courses_id":"433","maxAvg":77.43},{"courses_dept":"hist","courses_id":"392","maxAvg":77.43},{"courses_dept":"chbe","courses_id":"481","maxAvg":77.41},{"courses_dept":"musc","courses_id":"414","maxAvg":77.4},{"courses_dept":"mdvl","courses_id":"301","maxAvg":77.39},{"courses_dept":"hist","courses_id":"368","maxAvg":77.36},{"courses_dept":"anth","courses_id":"241","maxAvg":77.36},{"courses_dept":"fist","courses_id":"220","maxAvg":77.34},{"courses_dept":"asia","courses_id":"386","maxAvg":77.34},{"courses_dept":"wood","courses_id":"475","maxAvg":77.33},{"courses_dept":"mtrl","courses_id":"475","maxAvg":77.33},{"courses_dept":"kin","courses_id":"351","maxAvg":77.33},{"courses_dept":"micb","courses_id":"302","maxAvg":77.32},{"courses_dept":"cons","courses_id":"425","maxAvg":77.31},{"courses_dept":"chin","courses_id":"313","maxAvg":77.3},{"courses_dept":"bioc","courses_id":"403","maxAvg":77.3},{"courses_dept":"frst","courses_id":"339","maxAvg":77.3},{"courses_dept":"engl","courses_id":"311","maxAvg":77.29},{"courses_dept":"ling","courses_id":"140","maxAvg":77.28},{"courses_dept":"civl","courses_id":"406","maxAvg":77.28},{"courses_dept":"lled","courses_id":"221","maxAvg":77.27},{"courses_dept":"apbi","courses_id":"328","maxAvg":77.26},{"courses_dept":"fnh","courses_id":"309","maxAvg":77.25},{"courses_dept":"coec","courses_id":"394","maxAvg":77.25},{"courses_dept":"cpen","courses_id":"481","maxAvg":77.24},{"courses_dept":"civl","courses_id":"340","maxAvg":77.22},{"courses_dept":"musc","courses_id":"119","maxAvg":77.22},{"courses_dept":"japn","courses_id":"150","maxAvg":77.21},{"courses_dept":"apbi","courses_id":"403","maxAvg":77.2},{"courses_dept":"musc","courses_id":"200","maxAvg":77.19},{"courses_dept":"arth","courses_id":"227","maxAvg":77.18},{"courses_dept":"fnis","courses_id":"320","maxAvg":77.18},{"courses_dept":"chbe","courses_id":"201","maxAvg":77.17},{"courses_dept":"anth","courses_id":"312","maxAvg":77.17},{"courses_dept":"mdvl","courses_id":"210","maxAvg":77.17},{"courses_dept":"geog","courses_id":"426","maxAvg":77.16},{"courses_dept":"anth","courses_id":"414","maxAvg":77.14},{"courses_dept":"cpen","courses_id":"431","maxAvg":77.13},{"courses_dept":"law","courses_id":"422","maxAvg":77.12},{"courses_dept":"mech","courses_id":"224","maxAvg":77.11},{"courses_dept":"apbi","courses_id":"327","maxAvg":77.11},{"courses_dept":"hist","courses_id":"370","maxAvg":77.11},{"courses_dept":"biol","courses_id":"352","maxAvg":77.1},{"courses_dept":"eosc","courses_id":"432","maxAvg":77.1},{"courses_dept":"frst","courses_id":"415","maxAvg":77.09},{"courses_dept":"clst","courses_id":"232","maxAvg":77.05},{"courses_dept":"econ","courses_id":"447","maxAvg":77.04},{"courses_dept":"kin","courses_id":"190","maxAvg":77.04},{"courses_dept":"clst","courses_id":"332","maxAvg":77.03},{"courses_dept":"apsc","courses_id":"278","maxAvg":77.01},{"courses_dept":"poli","courses_id":"240","maxAvg":77.01},{"courses_dept":"scan","courses_id":"335","maxAvg":77.01},{"courses_dept":"geog","courses_id":"497","maxAvg":77},{"courses_dept":"medg","courses_id":"410","maxAvg":77},{"courses_dept":"japn","courses_id":"315","maxAvg":77},{"courses_dept":"fren","courses_id":"371","maxAvg":77},{"courses_dept":"arth","courses_id":"339","maxAvg":77},{"courses_dept":"grsj","courses_id":"301","maxAvg":76.97},{"courses_dept":"chem","courses_id":"301","maxAvg":76.97},{"courses_dept":"econ","courses_id":"334","maxAvg":76.96},{"courses_dept":"frst","courses_id":"385","maxAvg":76.96},{"courses_dept":"bioc","courses_id":"402","maxAvg":76.95},{"courses_dept":"biol","courses_id":"204","maxAvg":76.95},{"courses_dept":"fren","courses_id":"222","maxAvg":76.94},{"courses_dept":"geob","courses_id":"305","maxAvg":76.93},{"courses_dept":"math","courses_id":"313","maxAvg":76.93},{"courses_dept":"relg","courses_id":"209","maxAvg":76.92},{"courses_dept":"phys","courses_id":"305","maxAvg":76.91},{"courses_dept":"poli","courses_id":"345","maxAvg":76.89},{"courses_dept":"phil","courses_id":"316","maxAvg":76.89},{"courses_dept":"astr","courses_id":"200","maxAvg":76.89},{"courses_dept":"biol","courses_id":"320","maxAvg":76.88},{"courses_dept":"mech","courses_id":"485","maxAvg":76.88},{"courses_dept":"chem","courses_id":"333","maxAvg":76.88},{"courses_dept":"cpsc","courses_id":"317","maxAvg":76.87},{"courses_dept":"asia","courses_id":"332","maxAvg":76.85},{"courses_dept":"arth","courses_id":"345","maxAvg":76.85},{"courses_dept":"fnis","courses_id":"210","maxAvg":76.83},{"courses_dept":"hist","courses_id":"317","maxAvg":76.81},{"courses_dept":"chem","courses_id":"154","maxAvg":76.81},{"courses_dept":"busi","courses_id":"112","maxAvg":76.81},{"courses_dept":"stat","courses_id":"200","maxAvg":76.81},{"courses_dept":"japn","courses_id":"303","maxAvg":76.8},{"courses_dept":"stat","courses_id":"305","maxAvg":76.8},{"courses_dept":"econ","courses_id":"465","maxAvg":76.78},{"courses_dept":"geog","courses_id":"350","maxAvg":76.77},{"courses_dept":"visa","courses_id":"310","maxAvg":76.77},{"courses_dept":"engl","courses_id":"480","maxAvg":76.76},{"courses_dept":"geog","courses_id":"316","maxAvg":76.74},{"courses_dept":"econ","courses_id":"308","maxAvg":76.74},{"courses_dept":"civl","courses_id":"305","maxAvg":76.73},{"courses_dept":"hist","courses_id":"367","maxAvg":76.73},{"courses_dept":"math","courses_id":"301","maxAvg":76.73},{"courses_dept":"mech","courses_id":"325","maxAvg":76.73},{"courses_dept":"engl","courses_id":"111","maxAvg":76.7},{"courses_dept":"fopr","courses_id":"388","maxAvg":76.7},{"courses_dept":"busi","courses_id":"294","maxAvg":76.68},{"courses_dept":"econ","courses_id":"101","maxAvg":76.68},{"courses_dept":"clst","courses_id":"317","maxAvg":76.66},{"courses_dept":"nest","courses_id":"303","maxAvg":76.66},{"courses_dept":"mech","courses_id":"221","maxAvg":76.64},{"courses_dept":"mine","courses_id":"303","maxAvg":76.64},{"courses_dept":"wood","courses_id":"487","maxAvg":76.62},{"courses_dept":"visa","courses_id":"110","maxAvg":76.61},{"courses_dept":"law","courses_id":"462","maxAvg":76.6},{"courses_dept":"math","courses_id":"442","maxAvg":76.59},{"courses_dept":"hist","courses_id":"325","maxAvg":76.59},{"courses_dept":"math","courses_id":"317","maxAvg":76.58},{"courses_dept":"hist","courses_id":"393","maxAvg":76.58},{"courses_dept":"phil","courses_id":"100","maxAvg":76.57},{"courses_dept":"chin","courses_id":"311","maxAvg":76.57},{"courses_dept":"hist","courses_id":"106","maxAvg":76.56},{"courses_dept":"mech","courses_id":"327","maxAvg":76.56},{"courses_dept":"cpen","courses_id":"221","maxAvg":76.56},{"courses_dept":"econ","courses_id":"226","maxAvg":76.55},{"courses_dept":"mine","courses_id":"333","maxAvg":76.55},{"courses_dept":"busi","courses_id":"353","maxAvg":76.55},{"courses_dept":"soci","courses_id":"200","maxAvg":76.52},{"courses_dept":"frst","courses_id":"202","maxAvg":76.5},{"courses_dept":"asia","courses_id":"318","maxAvg":76.5},{"courses_dept":"clst","courses_id":"307","maxAvg":76.49},{"courses_dept":"hist","courses_id":"365","maxAvg":76.48},{"courses_dept":"hist","courses_id":"280","maxAvg":76.48},{"courses_dept":"elec","courses_id":"401","maxAvg":76.48},{"courses_dept":"biol","courses_id":"205","maxAvg":76.47},{"courses_dept":"eosc","courses_id":"322","maxAvg":76.46},{"courses_dept":"math","courses_id":"400","maxAvg":76.46},{"courses_dept":"chem","courses_id":"211","maxAvg":76.45},{"courses_dept":"comm","courses_id":"452","maxAvg":76.43},{"courses_dept":"fmst","courses_id":"316","maxAvg":76.41},{"courses_dept":"fnis","courses_id":"220","maxAvg":76.41},{"courses_dept":"hist","courses_id":"104","maxAvg":76.4},{"courses_dept":"law","courses_id":"463","maxAvg":76.39},{"courses_dept":"math","courses_id":"441","maxAvg":76.38},{"courses_dept":"hist","courses_id":"339","maxAvg":76.38},{"courses_dept":"geog","courses_id":"319","maxAvg":76.37},{"courses_dept":"elec","courses_id":"343","maxAvg":76.36},{"courses_dept":"kin","courses_id":"415","maxAvg":76.35},{"courses_dept":"asia","courses_id":"456","maxAvg":76.33},{"courses_dept":"fren","courses_id":"343","maxAvg":76.33},{"courses_dept":"cpen","courses_id":"311","maxAvg":76.32},{"courses_dept":"chem","courses_id":"417","maxAvg":76.29},{"courses_dept":"fren","courses_id":"329","maxAvg":76.27},{"courses_dept":"poli","courses_id":"220","maxAvg":76.26},{"courses_dept":"itst","courses_id":"231","maxAvg":76.25},{"courses_dept":"poli","courses_id":"309","maxAvg":76.25},{"courses_dept":"anth","courses_id":"210","maxAvg":76.25},{"courses_dept":"busi","courses_id":"393","maxAvg":76.24},{"courses_dept":"relg","courses_id":"316","maxAvg":76.24},{"courses_dept":"frst","courses_id":"307","maxAvg":76.24},{"courses_dept":"fren","courses_id":"349","maxAvg":76.23},{"courses_dept":"astr","courses_id":"205","maxAvg":76.23},{"courses_dept":"eosc","courses_id":"372","maxAvg":76.23},{"courses_dept":"latn","courses_id":"202","maxAvg":76.22},{"courses_dept":"phar","courses_id":"352","maxAvg":76.22},{"courses_dept":"fnel","courses_id":"101","maxAvg":76.21},{"courses_dept":"law","courses_id":"437","maxAvg":76.2},{"courses_dept":"geog","courses_id":"121","maxAvg":76.18},{"courses_dept":"math","courses_id":"322","maxAvg":76.18},{"courses_dept":"wood","courses_id":"384","maxAvg":76.18},{"courses_dept":"clst","courses_id":"231","maxAvg":76.17},{"courses_dept":"musc","courses_id":"220","maxAvg":76.16},{"courses_dept":"apsc","courses_id":"183","maxAvg":76.16},{"courses_dept":"arcl","courses_id":"326","maxAvg":76.15},{"courses_dept":"math","courses_id":"184","maxAvg":76.12},{"courses_dept":"hist","courses_id":"302","maxAvg":76.11},{"courses_dept":"stat","courses_id":"302","maxAvg":76.1},{"courses_dept":"musc","courses_id":"454","maxAvg":76.1},{"courses_dept":"soci","courses_id":"324","maxAvg":76.09},{"courses_dept":"econ","courses_id":"210","maxAvg":76.09},{"courses_dept":"geob","courses_id":"373","maxAvg":76.09},{"courses_dept":"frst","courses_id":"211","maxAvg":76.08},{"courses_dept":"hist","courses_id":"369","maxAvg":76.07},{"courses_dept":"chin","courses_id":"104","maxAvg":76.06},{"courses_dept":"kin","courses_id":"475","maxAvg":76.05},{"courses_dept":"fnh","courses_id":"303","maxAvg":76.04},{"courses_dept":"vant","courses_id":"150","maxAvg":76.03},{"courses_dept":"educ","courses_id":"275","maxAvg":76.01},{"courses_dept":"frst","courses_id":"311","maxAvg":76},{"courses_dept":"law","courses_id":"507","maxAvg":76},{"courses_dept":"busi","courses_id":"355","maxAvg":76},{"courses_dept":"fnh","courses_id":"351","maxAvg":76},{"courses_dept":"span","courses_id":"548","maxAvg":76},{"courses_dept":"asia","courses_id":"211","maxAvg":75.98},{"courses_dept":"fopr","courses_id":"264","maxAvg":75.98},{"courses_dept":"geog","courses_id":"318","maxAvg":75.97},{"courses_dept":"phrm","courses_id":"111","maxAvg":75.97},{"courses_dept":"chem","courses_id":"313","maxAvg":75.96},{"courses_dept":"fre","courses_id":"302","maxAvg":75.96},{"courses_dept":"law","courses_id":"443","maxAvg":75.96},{"courses_dept":"hist","courses_id":"105","maxAvg":75.95},{"courses_dept":"chbe","courses_id":"346","maxAvg":75.95},{"courses_dept":"eosc","courses_id":"222","maxAvg":75.95},{"courses_dept":"cpen","courses_id":"422","maxAvg":75.94},{"courses_dept":"geog","courses_id":"211","maxAvg":75.93},{"courses_dept":"arcl","courses_id":"318","maxAvg":75.92},{"courses_dept":"bioc","courses_id":"303","maxAvg":75.92},{"courses_dept":"mech","courses_id":"375","maxAvg":75.91},{"courses_dept":"law","courses_id":"436","maxAvg":75.89},{"courses_dept":"busi","courses_id":"101","maxAvg":75.88},{"courses_dept":"civl","courses_id":"210","maxAvg":75.88},{"courses_dept":"asia","courses_id":"354","maxAvg":75.88},{"courses_dept":"econ","courses_id":"367","maxAvg":75.87},{"courses_dept":"musc","courses_id":"120","maxAvg":75.86},{"courses_dept":"anth","courses_id":"217","maxAvg":75.86},{"courses_dept":"cpsc","courses_id":"259","maxAvg":75.82},{"courses_dept":"elec","courses_id":"403","maxAvg":75.82},{"courses_dept":"stat","courses_id":"344","maxAvg":75.81},{"courses_dept":"math","courses_id":"220","maxAvg":75.79},{"courses_dept":"math","courses_id":"312","maxAvg":75.78},{"courses_dept":"busi","courses_id":"293","maxAvg":75.78},{"courses_dept":"geob","courses_id":"307","maxAvg":75.78},{"courses_dept":"fren","courses_id":"348","maxAvg":75.77},{"courses_dept":"busi","courses_id":"450","maxAvg":75.76},{"courses_dept":"phys","courses_id":"203","maxAvg":75.76},{"courses_dept":"chem","courses_id":"312","maxAvg":75.75},{"courses_dept":"mech","courses_id":"326","maxAvg":75.75},{"courses_dept":"math","courses_id":"340","maxAvg":75.74},{"courses_dept":"econ","courses_id":"303","maxAvg":75.74},{"courses_dept":"hist","courses_id":"350","maxAvg":75.74},{"courses_dept":"elec","courses_id":"311","maxAvg":75.72},{"courses_dept":"fren","courses_id":"353","maxAvg":75.7},{"courses_dept":"anth","courses_id":"315","maxAvg":75.7},{"courses_dept":"hist","courses_id":"464","maxAvg":75.68},{"courses_dept":"chem","courses_id":"341","maxAvg":75.68},{"courses_dept":"busi","courses_id":"444","maxAvg":75.67},{"courses_dept":"psyc","courses_id":"320","maxAvg":75.67},{"courses_dept":"igen","courses_id":"451","maxAvg":75.67},{"courses_dept":"asia","courses_id":"200","maxAvg":75.66},{"courses_dept":"japn","courses_id":"314","maxAvg":75.65},{"courses_dept":"law","courses_id":"416","maxAvg":75.64},{"courses_dept":"law","courses_id":"377","maxAvg":75.63},{"courses_dept":"busi","courses_id":"111","maxAvg":75.63},{"courses_dept":"korn","courses_id":"301","maxAvg":75.61},{"courses_dept":"fnh","courses_id":"335","maxAvg":75.6},{"courses_dept":"coec","courses_id":"293","maxAvg":75.6},{"courses_dept":"law","courses_id":"211","maxAvg":75.58},{"courses_dept":"chbe","courses_id":"344","maxAvg":75.58},{"courses_dept":"hist","courses_id":"315","maxAvg":75.57},{"courses_dept":"chem","courses_id":"233","maxAvg":75.56},{"courses_dept":"mech","courses_id":"225","maxAvg":75.56},{"courses_dept":"biol","courses_id":"306","maxAvg":75.56},{"courses_dept":"frst","courses_id":"395","maxAvg":75.54},{"courses_dept":"hist","courses_id":"338","maxAvg":75.54},{"courses_dept":"math","courses_id":"320","maxAvg":75.54},{"courses_dept":"eosc","courses_id":"116","maxAvg":75.52},{"courses_dept":"law","courses_id":"241","maxAvg":75.52},{"courses_dept":"geog","courses_id":"311","maxAvg":75.52},{"courses_dept":"eosc","courses_id":"321","maxAvg":75.5},{"courses_dept":"chbe","courses_id":"456","maxAvg":75.49},{"courses_dept":"apsc","courses_id":"172","maxAvg":75.49},{"courses_dept":"law","courses_id":"231","maxAvg":75.48},{"courses_dept":"asia","courses_id":"340","maxAvg":75.48},{"courses_dept":"clst","courses_id":"110","maxAvg":75.45},{"courses_dept":"psyc","courses_id":"307","maxAvg":75.44},{"courses_dept":"asia","courses_id":"347","maxAvg":75.43},{"courses_dept":"geob","courses_id":"270","maxAvg":75.42},{"courses_dept":"rmst","courses_id":"222","maxAvg":75.41},{"courses_dept":"geog","courses_id":"327","maxAvg":75.41},{"courses_dept":"arcl","courses_id":"204","maxAvg":75.4},{"courses_dept":"asia","courses_id":"451","maxAvg":75.38},{"courses_dept":"micb","courses_id":"201","maxAvg":75.36},{"courses_dept":"igen","courses_id":"201","maxAvg":75.36},{"courses_dept":"mtrl","courses_id":"485","maxAvg":75.36},{"courses_dept":"anth","courses_id":"213","maxAvg":75.35},{"courses_dept":"mtrl","courses_id":"394","maxAvg":75.34},{"courses_dept":"mine","courses_id":"403","maxAvg":75.33},{"courses_dept":"law","courses_id":"221","maxAvg":75.32},{"courses_dept":"eosc","courses_id":"329","maxAvg":75.32},{"courses_dept":"elec","courses_id":"441","maxAvg":75.31},{"courses_dept":"elec","courses_id":"281","maxAvg":75.28},{"courses_dept":"hist","courses_id":"310","maxAvg":75.26},{"courses_dept":"musc","courses_id":"354","maxAvg":75.26},{"courses_dept":"hist","courses_id":"235","maxAvg":75.24},{"courses_dept":"law","courses_id":"325","maxAvg":75.21},{"courses_dept":"geog","courses_id":"122","maxAvg":75.19},{"courses_dept":"psyc","courses_id":"333","maxAvg":75.18},{"courses_dept":"biol","courses_id":"111","maxAvg":75.17},{"courses_dept":"musc","courses_id":"100","maxAvg":75.15},{"courses_dept":"mtrl","courses_id":"382","maxAvg":75.14},{"courses_dept":"musc","courses_id":"201","maxAvg":75.14},{"courses_dept":"geob","courses_id":"102","maxAvg":75.13},{"courses_dept":"eosc","courses_id":"220","maxAvg":75.13},{"courses_dept":"law","courses_id":"455","maxAvg":75.12},{"courses_dept":"asia","courses_id":"317","maxAvg":75.11},{"courses_dept":"geob","courses_id":"401","maxAvg":75.1},{"courses_dept":"soci","courses_id":"364","maxAvg":75.1},{"courses_dept":"psyc","courses_id":"360","maxAvg":75.1},{"courses_dept":"mtrl","courses_id":"340","maxAvg":75.09},{"courses_dept":"apsc","courses_id":"182","maxAvg":75.08},{"courses_dept":"psyc","courses_id":"302","maxAvg":75.07},{"courses_dept":"cons","courses_id":"200","maxAvg":75.06},{"courses_dept":"law","courses_id":"201","maxAvg":75.05},{"courses_dept":"arcl","courses_id":"232","maxAvg":75.05},{"courses_dept":"phys","courses_id":"157","maxAvg":75.04},{"courses_dept":"geob","courses_id":"204","maxAvg":75.03},{"courses_dept":"phys","courses_id":"118","maxAvg":75.03},{"courses_dept":"biol","courses_id":"203","maxAvg":75.03},{"courses_dept":"arth","courses_id":"101","maxAvg":75.02},{"courses_dept":"elec","courses_id":"203","maxAvg":75.02},{"courses_dept":"law","courses_id":"261","maxAvg":75},{"courses_dept":"elec","courses_id":"411","maxAvg":75},{"courses_dept":"math","courses_id":"180","maxAvg":75},{"courses_dept":"elec","courses_id":"451","maxAvg":75},{"courses_dept":"econ","courses_id":"451","maxAvg":75},{"courses_dept":"law","courses_id":"352","maxAvg":75},{"courses_dept":"psyc","courses_id":"462","maxAvg":75},{"courses_dept":"arth","courses_id":"312","maxAvg":75},{"courses_dept":"law","courses_id":"281","maxAvg":75},{"courses_dept":"phar","courses_id":"435","maxAvg":74.99},{"courses_dept":"stat","courses_id":"306","maxAvg":74.98},{"courses_dept":"geog","courses_id":"361","maxAvg":74.96},{"courses_dept":"eosc","courses_id":"210","maxAvg":74.95},{"courses_dept":"busi","courses_id":"443","maxAvg":74.94},{"courses_dept":"hist","courses_id":"378","maxAvg":74.94},{"courses_dept":"chem","courses_id":"311","maxAvg":74.92},{"courses_dept":"econ","courses_id":"211","maxAvg":74.92},{"courses_dept":"vant","courses_id":"148","maxAvg":74.92},{"courses_dept":"geog","courses_id":"329","maxAvg":74.91},{"courses_dept":"clst","courses_id":"318","maxAvg":74.9},{"courses_dept":"geog","courses_id":"364","maxAvg":74.9},{"courses_dept":"econ","courses_id":"311","maxAvg":74.9},{"courses_dept":"mech","courses_id":"222","maxAvg":74.89},{"courses_dept":"fnh","courses_id":"325","maxAvg":74.89},{"courses_dept":"cogs","courses_id":"200","maxAvg":74.88},{"courses_dept":"hist","courses_id":"327","maxAvg":74.87},{"courses_dept":"lfs","courses_id":"340","maxAvg":74.86},{"courses_dept":"math","courses_id":"101","maxAvg":74.85},{"courses_dept":"math","courses_id":"103","maxAvg":74.85},{"courses_dept":"asia","courses_id":"363","maxAvg":74.85},{"courses_dept":"law","courses_id":"251","maxAvg":74.84},{"courses_dept":"math","courses_id":"308","maxAvg":74.84},{"courses_dept":"law","courses_id":"438","maxAvg":74.81},{"courses_dept":"psyc","courses_id":"314","maxAvg":74.79},{"courses_dept":"arth","courses_id":"343","maxAvg":74.79},{"courses_dept":"biol","courses_id":"230","maxAvg":74.75},{"courses_dept":"math","courses_id":"345","maxAvg":74.74},{"courses_dept":"law","courses_id":"400","maxAvg":74.72},{"courses_dept":"ling","courses_id":"313","maxAvg":74.72},{"courses_dept":"psyc","courses_id":"461","maxAvg":74.69},{"courses_dept":"eosc","courses_id":"354","maxAvg":74.67},{"courses_dept":"asia","courses_id":"101","maxAvg":74.66},{"courses_dept":"biol","courses_id":"335","maxAvg":74.66},{"courses_dept":"hist","courses_id":"256","maxAvg":74.65},{"courses_dept":"poli","courses_id":"304","maxAvg":74.64},{"courses_dept":"law","courses_id":"504","maxAvg":74.64},{"courses_dept":"law","courses_id":"464","maxAvg":74.64},{"courses_dept":"asia","courses_id":"453","maxAvg":74.61},{"courses_dept":"mtrl","courses_id":"201","maxAvg":74.61},{"courses_dept":"relg","courses_id":"206","maxAvg":74.6},{"courses_dept":"apbi","courses_id":"244","maxAvg":74.6},{"courses_dept":"phil","courses_id":"334","maxAvg":74.58},{"courses_dept":"geob","courses_id":"206","maxAvg":74.56},{"courses_dept":"hist","courses_id":"328","maxAvg":74.55},{"courses_dept":"phil","courses_id":"102","maxAvg":74.53},{"courses_dept":"mech","courses_id":"543","maxAvg":74.5},{"courses_dept":"ital","courses_id":"404","maxAvg":74.5},{"courses_dept":"jrnl","courses_id":"535","maxAvg":74.5},{"courses_dept":"math","courses_id":"200","maxAvg":74.48},{"courses_dept":"asia","courses_id":"352","maxAvg":74.47},{"courses_dept":"psyc","courses_id":"368","maxAvg":74.46},{"courses_dept":"mech","courses_id":"223","maxAvg":74.46},{"courses_dept":"comm","courses_id":"101","maxAvg":74.44},{"courses_dept":"wood","courses_id":"356","maxAvg":74.43},{"courses_dept":"asia","courses_id":"351","maxAvg":74.39},{"courses_dept":"phys","courses_id":"318","maxAvg":74.38},{"courses_dept":"geog","courses_id":"328","maxAvg":74.38},{"courses_dept":"elec","courses_id":"455","maxAvg":74.38},{"courses_dept":"psyc","courses_id":"367","maxAvg":74.36},{"courses_dept":"psyc","courses_id":"218","maxAvg":74.33},{"courses_dept":"apsc","courses_id":"173","maxAvg":74.33},{"courses_dept":"geog","courses_id":"357","maxAvg":74.32},{"courses_dept":"econ","courses_id":"318","maxAvg":74.31},{"courses_dept":"psyc","courses_id":"404","maxAvg":74.3},{"courses_dept":"apbi","courses_id":"210","maxAvg":74.3},{"courses_dept":"bioc","courses_id":"304","maxAvg":74.3},{"courses_dept":"biol","courses_id":"210","maxAvg":74.3},{"courses_dept":"elec","courses_id":"202","maxAvg":74.27},{"courses_dept":"math","courses_id":"221","maxAvg":74.26},{"courses_dept":"asia","courses_id":"371","maxAvg":74.24},{"courses_dept":"micb","courses_id":"308","maxAvg":74.24},{"courses_dept":"mech","courses_id":"329","maxAvg":74.21},{"courses_dept":"soci","courses_id":"490","maxAvg":74.21},{"courses_dept":"fren","courses_id":"223","maxAvg":74.18},{"courses_dept":"law","courses_id":"407","maxAvg":74.15},{"courses_dept":"coec","courses_id":"126","maxAvg":74.15},{"courses_dept":"hist","courses_id":"476","maxAvg":74.1},{"courses_dept":"psyc","courses_id":"336","maxAvg":74.08},{"courses_dept":"law","courses_id":"469","maxAvg":74.07},{"courses_dept":"elec","courses_id":"331","maxAvg":74.07},{"courses_dept":"law","courses_id":"300","maxAvg":74.07},{"courses_dept":"elec","courses_id":"422","maxAvg":74.06},{"courses_dept":"econ","courses_id":"482","maxAvg":74.06},{"courses_dept":"hist","courses_id":"311","maxAvg":74.06},{"courses_dept":"chem","courses_id":"304","maxAvg":74.06},{"courses_dept":"geog","courses_id":"353","maxAvg":74.05},{"courses_dept":"law","courses_id":"359","maxAvg":74.04},{"courses_dept":"hist","courses_id":"358","maxAvg":74.04},{"courses_dept":"arcl","courses_id":"228","maxAvg":74.02},{"courses_dept":"hist","courses_id":"376","maxAvg":74.02},{"courses_dept":"math","courses_id":"303","maxAvg":74.01},{"courses_dept":"phil","courses_id":"371","maxAvg":74},{"courses_dept":"anth","courses_id":"418","maxAvg":74},{"courses_dept":"arth","courses_id":"368","maxAvg":74},{"courses_dept":"hist","courses_id":"305","maxAvg":74},{"courses_dept":"geog","courses_id":"352","maxAvg":73.99},{"courses_dept":"psyc","courses_id":"260","maxAvg":73.92},{"courses_dept":"comm","courses_id":"457","maxAvg":73.9},{"courses_dept":"geog","courses_id":"220","maxAvg":73.89},{"courses_dept":"fipr","courses_id":"101","maxAvg":73.85},{"courses_dept":"econ","courses_id":"328","maxAvg":73.84},{"courses_dept":"law","courses_id":"459","maxAvg":73.84},{"courses_dept":"cpen","courses_id":"211","maxAvg":73.81},{"courses_dept":"poli","courses_id":"310","maxAvg":73.76},{"courses_dept":"nest","courses_id":"401","maxAvg":73.75},{"courses_dept":"apbi","courses_id":"351","maxAvg":73.75},{"courses_dept":"biol","courses_id":"200","maxAvg":73.7},{"courses_dept":"eosc","courses_id":"429","maxAvg":73.66},{"courses_dept":"bioc","courses_id":"203","maxAvg":73.66},{"courses_dept":"psyc","courses_id":"361","maxAvg":73.62},{"courses_dept":"elec","courses_id":"456","maxAvg":73.62},{"courses_dept":"elec","courses_id":"341","maxAvg":73.59},{"courses_dept":"psyc","courses_id":"358","maxAvg":73.57},{"courses_dept":"eosc","courses_id":"221","maxAvg":73.57},{"courses_dept":"psyc","courses_id":"319","maxAvg":73.54},{"courses_dept":"astu","courses_id":"201","maxAvg":73.54},{"courses_dept":"biol","courses_id":"351","maxAvg":73.54},{"courses_dept":"asia","courses_id":"100","maxAvg":73.53},{"courses_dept":"math","courses_id":"318","maxAvg":73.53},{"courses_dept":"arcl","courses_id":"103","maxAvg":73.52},{"courses_dept":"geog","courses_id":"391","maxAvg":73.52},{"courses_dept":"bioc","courses_id":"302","maxAvg":73.51},{"courses_dept":"hist","courses_id":"259","maxAvg":73.47},{"courses_dept":"chem","courses_id":"250","maxAvg":73.47},{"courses_dept":"wood","courses_id":"241","maxAvg":73.44},{"courses_dept":"cpen","courses_id":"421","maxAvg":73.42},{"courses_dept":"geob","courses_id":"300","maxAvg":73.41},{"courses_dept":"arcl","courses_id":"203","maxAvg":73.4},{"courses_dept":"elec","courses_id":"413","maxAvg":73.38},{"courses_dept":"caps","courses_id":"391","maxAvg":73.38},{"courses_dept":"econ","courses_id":"351","maxAvg":73.38},{"courses_dept":"cpsc","courses_id":"320","maxAvg":73.38},{"courses_dept":"cpsc","courses_id":"415","maxAvg":73.37},{"courses_dept":"geob","courses_id":"200","maxAvg":73.36},{"courses_dept":"mtrl","courses_id":"252","maxAvg":73.36},{"courses_dept":"busi","courses_id":"344","maxAvg":73.32},{"courses_dept":"comm","courses_id":"100","maxAvg":73.3},{"courses_dept":"elec","courses_id":"201","maxAvg":73.28},{"courses_dept":"hist","courses_id":"318","maxAvg":73.25},{"courses_dept":"hist","courses_id":"324","maxAvg":73.23},{"courses_dept":"grsj","courses_id":"311","maxAvg":73.21},{"courses_dept":"mine","courses_id":"434","maxAvg":73.21},{"courses_dept":"psyc","courses_id":"460","maxAvg":73.13},{"courses_dept":"chem","courses_id":"330","maxAvg":73.11},{"courses_dept":"elec","courses_id":"473","maxAvg":73.11},{"courses_dept":"psyc","courses_id":"401","maxAvg":73.05},{"courses_dept":"psyc","courses_id":"101","maxAvg":73.05},{"courses_dept":"fnh","courses_id":"301","maxAvg":73},{"courses_dept":"clch","courses_id":"401","maxAvg":73},{"courses_dept":"fnel","courses_id":"202","maxAvg":73},{"courses_dept":"wood","courses_id":"120","maxAvg":72.94},{"courses_dept":"bioc","courses_id":"410","maxAvg":72.94},{"courses_dept":"econ","courses_id":"319","maxAvg":72.91},{"courses_dept":"arcl","courses_id":"419","maxAvg":72.89},{"courses_dept":"chbe","courses_id":"241","maxAvg":72.88},{"courses_dept":"elec","courses_id":"462","maxAvg":72.88},{"courses_dept":"chbe","courses_id":"251","maxAvg":72.87},{"courses_dept":"psyc","courses_id":"301","maxAvg":72.86},{"courses_dept":"frst","courses_id":"210","maxAvg":72.77},{"courses_dept":"apsc","courses_id":"178","maxAvg":72.76},{"courses_dept":"math","courses_id":"321","maxAvg":72.75},{"courses_dept":"biol","courses_id":"317","maxAvg":72.73},{"courses_dept":"geog","courses_id":"345","maxAvg":72.72},{"courses_dept":"geog","courses_id":"321","maxAvg":72.64},{"courses_dept":"asia","courses_id":"396","maxAvg":72.63},{"courses_dept":"musc","courses_id":"221","maxAvg":72.63},{"courses_dept":"psyc","courses_id":"207","maxAvg":72.6},{"courses_dept":"geog","courses_id":"380","maxAvg":72.55},{"courses_dept":"geob","courses_id":"103","maxAvg":72.54},{"courses_dept":"musc","courses_id":"121","maxAvg":72.53},{"courses_dept":"chem","courses_id":"111","maxAvg":72.49},{"courses_dept":"psyc","courses_id":"321","maxAvg":72.44},{"courses_dept":"biol","courses_id":"209","maxAvg":72.42},{"courses_dept":"busi","courses_id":"433","maxAvg":72.42},{"courses_dept":"elec","courses_id":"402","maxAvg":72.4},{"courses_dept":"mine","courses_id":"524","maxAvg":72.29},{"courses_dept":"psyc","courses_id":"102","maxAvg":72.26},{"courses_dept":"fnis","courses_id":"452","maxAvg":72.25},{"courses_dept":"anth","courses_id":"215","maxAvg":72.21},{"courses_dept":"arth","courses_id":"102","maxAvg":72.09},{"courses_dept":"psyc","courses_id":"217","maxAvg":72.05},{"courses_dept":"ital","courses_id":"408","maxAvg":72},{"courses_dept":"eosc","courses_id":"373","maxAvg":71.96},{"courses_dept":"chbe","courses_id":"244","maxAvg":71.96},{"courses_dept":"chbe","courses_id":"477","maxAvg":71.91},{"courses_dept":"hist","courses_id":"236","maxAvg":71.88},{"courses_dept":"asia","courses_id":"342","maxAvg":71.81},{"courses_dept":"psyc","courses_id":"304","maxAvg":71.77},{"courses_dept":"nest","courses_id":"318","maxAvg":71.68},{"courses_dept":"psyc","courses_id":"363","maxAvg":71.67},{"courses_dept":"wood","courses_id":"225","maxAvg":71.64},{"courses_dept":"econ","courses_id":"350","maxAvg":71.59},{"courses_dept":"hist","courses_id":"419","maxAvg":71.58},{"courses_dept":"wood","courses_id":"476","maxAvg":71.57},{"courses_dept":"math","courses_id":"300","maxAvg":71.5},{"courses_dept":"hebr","courses_id":"102","maxAvg":71.5},{"courses_dept":"biol","courses_id":"233","maxAvg":71.49},{"courses_dept":"psyc","courses_id":"311","maxAvg":71.47},{"courses_dept":"cpsc","courses_id":"261","maxAvg":71.45},{"courses_dept":"hist","courses_id":"356","maxAvg":71.35},{"courses_dept":"bioc","courses_id":"202","maxAvg":71.35},{"courses_dept":"asic","courses_id":"220","maxAvg":71.27},{"courses_dept":"caps","courses_id":"301","maxAvg":71.27},{"courses_dept":"psyc","courses_id":"331","maxAvg":71.24},{"courses_dept":"psyc","courses_id":"325","maxAvg":71.24},{"courses_dept":"mtrl","courses_id":"263","maxAvg":71.21},{"courses_dept":"asia","courses_id":"325","maxAvg":71.18},{"courses_dept":"cpen","courses_id":"411","maxAvg":71.13},{"courses_dept":"busi","courses_id":"100","maxAvg":71},{"courses_dept":"wood","courses_id":"280","maxAvg":70.87},{"courses_dept":"chem","courses_id":"218","maxAvg":70.7},{"courses_dept":"chem","courses_id":"310","maxAvg":70.68},{"courses_dept":"chin","courses_id":"461","maxAvg":70.61},{"courses_dept":"hist","courses_id":"101","maxAvg":70.55},{"courses_dept":"busi","courses_id":"300","maxAvg":70.53},{"courses_dept":"frst","courses_id":"200","maxAvg":70.46},{"courses_dept":"fipr","courses_id":"131","maxAvg":70.3},{"courses_dept":"chem","courses_id":"208","maxAvg":70.24},{"courses_dept":"busi","courses_id":"330","maxAvg":70.22},{"courses_dept":"elec","courses_id":"301","maxAvg":70.21},{"courses_dept":"psyc","courses_id":"208","maxAvg":70.2},{"courses_dept":"busi","courses_id":"331","maxAvg":70.15},{"courses_dept":"math","courses_id":"152","maxAvg":70},{"courses_dept":"educ","courses_id":"278","maxAvg":69.97},{"courses_dept":"math","courses_id":"110","maxAvg":69.94},{"courses_dept":"math","courses_id":"310","maxAvg":69.91},{"courses_dept":"arcl","courses_id":"140","maxAvg":69.88},{"courses_dept":"chem","courses_id":"213","maxAvg":69.85},{"courses_dept":"astu","courses_id":"202","maxAvg":69.77},{"courses_dept":"educ","courses_id":"276","maxAvg":69.69},{"courses_dept":"math","courses_id":"305","maxAvg":69.62},{"courses_dept":"chem","courses_id":"203","maxAvg":69.47},{"courses_dept":"cpen","courses_id":"331","maxAvg":69.41},{"courses_dept":"elec","courses_id":"457","maxAvg":69.39},{"courses_dept":"busi","courses_id":"398","maxAvg":69.38},{"courses_dept":"mtrl","courses_id":"280","maxAvg":69.34},{"courses_dept":"chem","courses_id":"309","maxAvg":69.34},{"courses_dept":"busi","courses_id":"121","maxAvg":69.27},{"courses_dept":"elec","courses_id":"461","maxAvg":69.11},{"courses_dept":"elec","courses_id":"315","maxAvg":69.01},{"courses_dept":"ital","courses_id":"405","maxAvg":69},{"courses_dept":"educ","courses_id":"172","maxAvg":69},{"courses_dept":"epse","courses_id":"171","maxAvg":68.86},{"courses_dept":"phys","courses_id":"158","maxAvg":68.41},{"courses_dept":"engl","courses_id":"140","maxAvg":68.33},{"courses_dept":"stat","courses_id":"357","maxAvg":68.24},{"courses_dept":"psyc","courses_id":"335","maxAvg":68.06},{"courses_dept":"mtrl","courses_id":"264","maxAvg":67.98},{"courses_dept":"busi","courses_id":"460","maxAvg":67.96},{"courses_dept":"chem","courses_id":"260","maxAvg":67.39},{"courses_dept":"soci","courses_id":"285","maxAvg":67.25},{"courses_dept":"fnh","courses_id":"430","maxAvg":67},{"courses_dept":"asia","courses_id":"375","maxAvg":66.79},{"courses_dept":"math","courses_id":"264","maxAvg":66.26},{"courses_dept":"elec","courses_id":"342","maxAvg":66.19},{"courses_dept":"mtrl","courses_id":"378","maxAvg":66.07},{"courses_dept":"elec","courses_id":"211","maxAvg":66.02},{"courses_dept":"elec","courses_id":"415","maxAvg":65.83},{"courses_dept":"mtrl","courses_id":"365","maxAvg":65.68},{"courses_dept":"educ","courses_id":"272","maxAvg":65.33},{"courses_dept":"elec","courses_id":"221","maxAvg":64.64},{"courses_dept":"elec","courses_id":"321","maxAvg":64.28},{"courses_dept":"test","courses_id":"100","maxAvg":60},{"courses_dept":"elec","courses_id":"465","maxAvg":52.67}]});
            })
        }).catch(function (err: any) {
            console.log(err);
            expect.fail();
        });
        //return;
    });
    it("using courses_uuid", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("courses.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("courses", zipContent).then(function () {
            return facade.performQuery({
                "WHERE": {},
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_uuid",
                        "maxAvg",
                        "minAvg",
                        "avgAvg"
                    ],
                    "ORDER": "courses_uuid",
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["courses_uuid"],
                    "APPLY": [{
                        "maxAvg": {
                            "MAX": "courses_avg"
                        }
                    },
                        {
                            "minAvg": {
                                "MIN": "courses_avg"
                            }
                        },
                        {"avgAvg": {
                            "AVG": "courses_avg"
                        }}]
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
    it("testing piazza post", function () {
        console.log("+++TEST: simple query from spec");
        zipContent = fs.readFileSync("courses.zip").toString("base64");
        var thisIsIt = facade;

        return facade.addDataset("courses", zipContent).then(function () {
            return facade.performQuery({
                "WHERE": {},
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_uuid", "minGrade"
                    ],
                    "ORDER": "minGrade",
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["courses_uuid"],
                    "APPLY": [
                        {
                            "minGrade": {
                                "SUM": "courses_avg"
                            }
                        }
                    ]
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
    // it("testing another piazza post", function () {
    //     console.log("+++TEST: simple query from spec");
    //     zipContent = fs.readFileSync("courses.zip").toString("base64");
    //     var thisIsIt = facade;
    //
    //     return facade.addDataset("courses", zipContent).then(function () {
    //         return facade.performQuery({
    //             "WHERE": {},
    //             "OPTIONS": {
    //                 "COLUMNS": [
    //                     "courses_dept", "courses_year", "courses_id", "courses_avg", "courses_instructor",
    //                     "courses_title", "minGrade"
    //                 ],
    //                 "ORDER": "courses_dept",
    //                 "FORM": "TABLE"
    //             },
    //             "TRANSFORMATIONS": {
    //                 "GROUP": ["courses_dept", "courses_year", "courses_id", "courses_avg", "courses_instructor", "courses_title"],
    //                 "APPLY": [
    //                     {
    //                         "minGrade": {
    //                             "MIN": "courses_avg"
    //                         }
    //                     }
    //                 ]
    //             }
    //         }).then(function (InF: InsightResponse) {
    //             //var t=JSON.parse(JSON.stringify(InF.body));
    //             console.log(JSON.stringify(InF.body));
    //         })
    //     }).catch(function (err: any) {
    //         console.log(err);
    //         expect.fail();
    //     });
    //     //return;
    // });
});
