/**
 * Created by jacke on 2/5/2017.
 */
/**
 * Created by jacke on 2/3/2017.
 */
/**
 * Created by Austin on 2017-01-24.
 */
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";
var fs = require("fs");

describe("FilterManagerTester", function() {
    let facade: any = null;
    let zipContent: any;
    before(function() {
        //zipContent = fs.readFileSync("courses.zip").toString("base64");
    });
    beforeEach(function() {
        facade = new InsightFacade();
    });
    afterEach(function() {
        facade = null;
    });

    it("LT test true", function () {
        expect(facade.filterManager(
            {"LT":{
                "courses_avg": 50
            }
            }
        ,{
            "Title":"intr orgnc chem",
            "id":31209,
            "Professor":"ciufolini, marco",
            "Course":"203",
            "Avg":69.47,
            "Subject":"chem"
        })).to.equal(false);
        return;
    });
    it("LT test false", function () {
        expect(facade.filterManager(
            {"LT":{
                "courses_avg": 90
            }
            }
            ,{
                "Title":"intr orgnc chem",
                "id":31209,
                "Professor":"ciufolini, marco",
                "Course":"203",
                "Avg":69.47,
                "Subject":"chem"
            })).to.equal(true);
        return;
    });

    it("GT test true", function () {
        expect(facade.filterManager(
            {"GT":{
                "courses_avg": 50
            }
            }
            ,{
                "Title":"intr orgnc chem",
                "id":31209,
                "Professor":"ciufolini, marco",
                "Course":"203",
                "Avg":69.47,
                "Subject":"chem"
            })).to.equal(true);
        return;
    });
    it("GT test false", function () {
        expect(facade.filterManager(
            {"GT":{
                "courses_avg": 90
            }
            }
            ,{
                "Title":"intr orgnc chem",
                "id":31209,
                "Professor":"ciufolini, marco",
                "Course":"203",
                "Avg":69.47,
                "Subject":"chem"
            })).to.equal(false);
        return;
    });

    it("IS test match(True)", function () {
        expect(facade.filterManager(
            {"IS":{
                "courses_dept":"chem"
            }
            }
            ,{
                "Title":"intr orgnc chem",
                "id":31209,
                "Professor":"ciufolini, marco",
                "Course":"203",
                "Avg":69.47,
                "Subject":"chem"
            })).to.equal(true);
        return;
    });
    it("IS test *match(True)", function () {
        expect(facade.filterManager(
            {"IS":{
                "courses_dept":"*m"
            }
            }
            ,{
                "Title":"intr orgnc chem",
                "id":31209,
                "Professor":"ciufolini, marco",
                "Course":"203",
                "Avg":69.47,
                "Subject":"chem"
            })).to.equal(true);
        return;
    });
    it("IS test match*(True)", function () {
        expect(facade.filterManager(
            {"IS":{
                "courses_dept":"c*"
            }
            }
            ,{
                "Title":"intr orgnc chem",
                "id":31209,
                "Professor":"ciufolini, marco",
                "Course":"203",
                "Avg":69.47,
                "Subject":"chem"
            })).to.equal(true);
        return;
    });
    it("IS test *match*(True)", function () {
        expect(facade.filterManager(
            {"IS":{
                "courses_dept":"*he*"
            }
            }
            ,{
                "Title":"intr orgnc chem",
                "id":31209,
                "Professor":"ciufolini, marco",
                "Course":"203",
                "Avg":69.47,
                "Subject":"chem"
            })).to.equal(true);
        return;
    });
    it("IS test match(false)", function () {
        expect(facade.filterManager(
            {"IS":{
                "courses_dept":"he"
            }
            }
            ,{
                "Title":"intr orgnc chem",
                "id":31209,
                "Professor":"ciufolini, marco",
                "Course":"203",
                "Avg":69.47,
                "Subject":"chem"
            })).to.equal(false);
        return;
    });
    it("IS test *match(True)", function () {
        expect(facade.filterManager(
            {"IS":{
                "courses_dept":"*yo"
            }
            }
            ,{
                "Title":"intr orgnc chem",
                "id":31209,
                "Professor":"ciufolini, marco",
                "Course":"203",
                "Avg":69.47,
                "Subject":"chem"
            })).to.equal(false);
        return;
    });
    it("IS test match*(false)", function () {
        expect(facade.filterManager(
            {"IS":{
                "courses_dept":"no*"
            }
            }
            ,{
                "Title":"intr orgnc chem",
                "id":31209,
                "Professor":"ciufolini, marco",
                "Course":"203",
                "Avg":69.47,
                "Subject":"chem"
            })).to.equal(false);
        return;
    });
    it("IS test *match*(false)", function () {
        expect(facade.filterManager(
            {"IS":{
                "courses_dept":"*hwweew*"
            }
            }
            ,{
                "Title":"intr orgnc chem",
                "id":31209,
                "Professor":"ciufolini, marco",
                "Course":"203",
                "Avg":69.47,
                "Subject":"chem"
            })).to.equal(false);
        return;
    });
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++AAAANNNNDDDD+++++++++++++++++++
    it("AND test", function () {
        expect(facade.filterManager({
            "AND":[{
                "IS": {
                    "courses_dept": "c*"
                }
            },{"LT":{
                "courses_avg": 80
            }}
            ]
        },{
            "Title":"intr orgnc chem",
            "id":31209,
            "Professor":"ciufolini, marco",
            "Course":"203",
            "Avg":69.47,
            "Subject":"chem"
        })).to.equal(true);
        return;
    });
    it("AND test with IS and GT", function () {
        expect(facade.filterManager({
            "AND":[{
                "IS": {
                    "courses_dept": "c*"
                }
            },{"LT":{
                "courses_avg": 80
            }}
            ]
        },{
            "Title":"intr orgnc chem",
            "id":31209,
            "Professor":"ciufolini, marco",
            "Course":"203",
            "Avg":68.47,
            "Subject":"chem"
        })).to.equal(true);
        return;
    });
    it("AND test with IS and EQ an LT", function () {
        expect(facade.filterManager({
            "AND":[{
                "IS": {
                    "courses_dept": "c*"
                }
            },{"EQ":{
                "courses_avg": 69.47
            }},{"LT":{
                "courses_avg": 80
            }}
            ]
        },{
            "Title":"intr orgnc chem",
            "id":31209,
            "Professor":"ciufolini, marco",
            "Course":"203",
            "Avg":69.47,
            "Subject":"chem"
        })).to.equal(true);
        return;
    });
    it("AND test with IS(True) and EQ(False)", function () {
        expect(facade.filterManager({
            "AND":[{
                "IS": {
                    "courses_dept": "c*"
                }
            },{"EQ":{
                "courses_avg": 80.47
            }}
            ]
        },{
            "Title":"intr orgnc chem",
            "id":31209,
            "Professor":"ciufolini, marco",
            "Course":"203",
            "Avg":69.47,
            "Subject":"chem"
        })).to.equal(false);
        return;
    });
    it("AND test single LT(false)", function () {
        expect(facade.filterManager({
            "AND":[{"EQ":{
                "courses_avg": 80
            }}
            ]
        },{
            "Title":"intr orgnc chem",
            "id":31209,
            "Professor":"ciufolini, marco",
            "Course":"203",
            "Avg":69.47,
            "Subject":"chem"
        })).to.equal(false);
        return;
    });
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++OOOORRRRRR+++++++++++++
    it("OR test single LT(true)", function () {
        expect(facade.filterManager({
            "OR":[{"LT":{
                "courses_avg": 80
            }}
            ]
        },{
            "Title":"intr orgnc chem",
            "id":31209,
            "Professor":"ciufolini, marco",
            "Course":"203",
            "Avg":69.47,
            "Subject":"chem"
        })).to.equal(true);
        return;
    });
    it("OR test single IS(false)", function () {
        expect(facade.filterManager({
            "OR":[ {
                "IS":{
                    "courses_dept":"adhe"
                }
            }
            ]
        },{
            "Title":"intr orgnc chem",
            "id":31209,
            "Professor":"ciufolini, marco",
            "Course":"203",
            "Avg":69.47,
            "Subject":"chem"
        })).to.equal(false);
        return;
    });
    it("OR test single GT(false)", function () {
        expect(facade.filterManager({
            "OR":[ {
                "GT":{
                    "courses_avg": 95
                }
            }
            ]
        },{
            "Title":"intr orgnc chem",
            "id":31209,
            "Professor":"ciufolini, marco",
            "Course":"203",
            "Avg":69.47,
            "Subject":"chem"
        })).to.equal(false);
        return;
    });

    it("OR test 2: LT(True), EQ(false) ", function () {
        expect(facade.filterManager({
            "OR":[{"EQ":{
                "courses_avg": 80
            }},{"LT":{
                "courses_avg": 80
            }}
            ]
        },{
            "Title":"intr orgnc chem",
            "id":31209,
            "Professor":"ciufolini, marco",
            "Course":"203",
            "Avg":69.47,
            "Subject":"chem"
        })).to.equal(true);
        return;
    });
    it("OR test 3: GT(False), IS(false) ", function () {
        expect(facade.filterManager({
            "OR":[{"GT":{
                "courses_avg": 60
            }},{"IS":{
                "courses_dept": "sfd"
            }}
            ]
        },{
            "Title":"intr orgnc chem",
            "id":31209,
            "Professor":"ciufolini, marco",
            "Course":"203",
            "Avg":69.47,
            "Subject":"chem"
        })).to.equal(true);
        return;
    });
    it("OR test single LT(false)", function () {
        expect(facade.filterManager({
            "OR":[{
                "LT":{
                    "courses_avg": 50
                }
            }
            ]
        },{
            "Title":"intr orgnc chem",
            "id":31209,
            "Professor":"ciufolini, marco",
            "Course":"203",
            "Avg":69.47,
            "Subject":"chem"
        })).to.equal(false);
        return;
    });

    it("OR test 2: LT(false), EQ(false) ", function () {
        expect(facade.filterManager({
            "OR":[{"EQ":{
                "courses_avg": 80
            }},{"LT":{
                "courses_avg": 50
            }}
            ]
        },{
            "Title":"intr orgnc chem",
            "id":31209,
            "Professor":"ciufolini, marco",
            "Course":"203",
            "Avg":69.47,
            "Subject":"chem"
        })).to.equal(false);
        return;
    });

    it("OR test 3: GT(True), IS(false) ", function () {
        expect(facade.filterManager( {
            "OR":[
                {
                    "GT":{
                        "courses_avg":50
                    }
                },
                {
                    "IS":{
                        "courses_dept":"adhe"
                    }
                }
            ]
        },{
            "Title":"intr orgnc chem",
            "id":31209,
            "Professor":"ciufolini, marco",
            "Course":"203",
            "Avg":69.47,
            "Subject":"chem"
        })).to.equal(true);
        return;
    });
    it("OR test 3: GT(False), IS(false), EQ(false) ", function () {
        expect(facade.filterManager( {
            "OR":[
                {
                    "GT":{
                        "courses_avg":90
                    }
                },
                {
                    "IS":{
                        "courses_dept":"adhe"
                    }
                },
                {
                    "EQ":{
                        "courses_avg":90
                    }
                }
            ]
        },{
            "Title":"intr orgnc chem",
            "id":31209,
            "Professor":"ciufolini, marco",
            "Course":"203",
            "Avg":69.47,
            "Subject":"chem"
        })).to.equal(false);
        return;
    });
//++++++++++++++++++++++++++++++++++++++++++++OR + AND+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    it("OR + AND: test(true)", function () {
        expect(facade.filterManager({
            "AND":[
                {
                    "OR":[
                        {
                            "GT":{
                                "courses_avg":50
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
                    "LT":{
                        "courses_avg":95
                    }
                }
            ]
        },{
            "Title":"intr orgnc chem",
            "id":31209,
            "Professor":"ciufolini, marco",
            "Course":"203",
            "Avg":69.47,
            "Subject":"chem"
        })).to.equal(true);
        return;
    });

    it("OR + AND: test(True)", function () {
        expect(facade.filterManager({
            "AND":[
                {
                    "OR":[
                        {
                            "GT":{
                                "courses_avg":90
                            }
                        },
                        {
                            "IS":{
                                "courses_dept":"*chem"
                            }
                        }
                    ]
                },
                {
                    "LT":{
                        "courses_avg":95
                    }
                }
            ]
        },{
            "Title":"intr orgnc chem",
            "id":31209,
            "Professor":"ciufolini, marco",
            "Course":"203",
            "Avg":69.47,
            "Subject":"chem"
        })).to.equal(true);
        return;
    });

    it("OR + OR: test2(false)", function () {
        expect(facade.filterManager({
            "OR":[
                {
                    "OR":[
                        {
                            "GT":{
                                "courses_avg":90
                            }
                        },
                        {
                            "IS":{
                                "courses_dept":"*oifds"
                            }
                        }
                    ]
                },
                {
                    "LT":{
                        "courses_avg":50
                    }
                }
            ]
        },{
            "Title":"intr orgnc chem",
            "id":31209,
            "Professor":"ciufolini, marco",
            "Course":"203",
            "Avg":69.47,
            "Subject":"chem"
        })).to.equal(false);
        return;
    });

    it("OR + AND: test2(false)", function () {
        expect(facade.filterManager({
            "OR":[
                {
                    "OR":[
                        {
                            "GT":{
                                "courses_avg":90
                            }
                        },
                        {
                            "IS":{
                                "courses_dept":"*che*"
                            }
                        }
                    ]
                },
                {
                    "LT":{
                        "courses_avg":60
                    }
                }
            ]
        },{
            "Title":"intr orgnc chem",
            "id":31209,
            "Professor":"ciufolini, marco",
            "Course":"203",
            "Avg":69.47,
            "Subject":"chem"
        })).to.equal(true);
        return;
    });
})