/**
 * Created by Austin on 2017-01-24.
 */
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";

var fs = require("fs");

describe("InsightFacadeSpec", function() {
    this.timeout(5000);

    let facade: any = null;
    let zipContent: any;
    before(function() {
        //zipContent = fs.readFileSync("courses.zip").toString("base64");
        facade = new InsightFacade();
    });
    beforeEach(function() {
        //facade = new InsightFacade();
        //facade.removeAllDataset();
    });
    afterEach(function() {
       //facade = null;
    });



    it("addDataset test FEW json file in zip", function() {
        zipContent = fs.readFileSync("coursesFewJson.zip").toString("base64");
        return facade.addDataset("coursesFewJson", zipContent).then(function(InF:InsightResponse){
            var t=JSON.stringify(InF.body);
            console.log(InF.code+t);
            console.log(" this is what dataStructure looks like right now: "+JSON.stringify(facade.getDataStructure()));
        }).catch(function(err:any){
            console.log(err);
            expect.fail();
        });
    });
    
    it("remove non existent dataset", function() {
        facade.removeDataset("doesn't exist").then(function(InF:InsightResponse){
            var t=JSON.stringify(InF.body);
            console.log(InF.code+t);
            expect.fail();
        }).catch(function(err:any){
            console.log(err);

        });
    });
    
    it("remove the first dataset", function() {
        facade.removeDataset("coursesFewJson").then(function(InF:InsightResponse){
            var t=JSON.stringify(InF.body);
            console.log(InF.code+t);
        }).catch(function(err:any){
            console.log(err);
            expect.fail();
        });
    });
    
    it("try to remove a dataset that has already been removed ", function() {
        facade.removeDataset("coursesFewJson").then(function(InF:InsightResponse){
            var t=JSON.stringify(InF.body);
            console.log(InF.code+t);
            expect.fail();
        }).catch(function(err:any){
            console.log(err);
        });
    });
    
     it("try to removing something from an empty dataset", function() {
        facade.removeDataset("nothing").then(function(InF:InsightResponse){
            var t=JSON.stringify(InF.body);
            console.log(InF.code+t);
            expect.fail();
        }).catch(function(err:any){
            console.log(err);
        });
    });

    it("addDataset test 1 json file in zip", function() {
        zipContent = fs.readFileSync("oneJsonTest.zip").toString("base64");
        return facade.addDataset("oneJsonTest", zipContent).then(function(InF:InsightResponse){

            console.log(InF.code+": "+JSON.stringify(InF.body));
        }).catch(function(err:any){
            console.log(err);
            expect.fail();
        });

        //   zipContent = fs.readFileSync("courses.zip").toString("base64");
        //   facade.addDataset("courses",zipContent);

    });
    
    it("adding coursesFewJson then removing it (testing removeDataSet with multiple datasets", function() {
        zipContent = fs.readFileSync("coursesFewJson.zip").toString("base64");
        facade.addDataset("coursesFewJson", zipContent);
        facade.removeDataset("coursesFewJson").then(function(InF:InsightResponse){
            var t=JSON.stringify(InF.body);
            console.log(InF.code+t);
            console.log(JSON.stringify(facade.getDataStructure()));
        }).catch(function(err:any){
            console.log(err);
            expect.fail();
        });
    });

    it("try to remove null", function() {
        facade.removeDataset(null).then(function(InF:InsightResponse){
            var t=JSON.stringify(InF.body);
            console.log(InF.code+t);
            expect.fail();
        }).catch(function(err:any){
            console.log(err);
        });
    });
    it("try to remove undefined", function() {
        facade.removeDataset(undefined).then(function(InF:InsightResponse){
            var t=JSON.stringify(InF.body);
            console.log(InF.code+t);
            expect.fail();
        }).catch(function(err:any){
            console.log(err);
        });
    });

    it("try to remove empty string", function() {
        facade.removeDataset("").then(function(InF:InsightResponse){
            var t=JSON.stringify(InF.body);
            console.log(InF.code+t);
            expect.fail();
        }).catch(function(err:any){
            console.log(err);
        });
    });

    it('The big load: courses', function(){

        console.time("dbsave");

        zipContent = fs.readFileSync("courses.zip").toString("base64");
        return facade.addDataset("courses", zipContent).then(function(InF:InsightResponse){

            console.log(InF.code+": "+JSON.stringify(InF.body));
            console.timeEnd("dbsave");
        }).catch(function(err:any){
            console.log(err);
            expect.fail();
        });
    })

    it ('empty zip file', function() {
        zipContent = fs.readFileSync("empty.zip").toString("base64");
        return facade.addDataset("empty", zipContent).then(function (InF: InsightResponse) {
            console.log(InF.code+": "+JSON.stringify(InF.body));
        }).catch(function(err:any) {
            console.log(err);
            expect.fail();
        });
    });

    it ('zipfile with empty JSON', function() {
        zipContent = fs.readFileSync("emptyJSON.zip").toString("base64");
        return facade.addDataset("emptyJSOM", zipContent).then(function (InF: InsightResponse) {
            console.log(InF.code+": "+JSON.stringify(InF.body));
        }).catch(function(err:any) {
            console.log(err);
            expect.fail();
        });
    });

    it ('zipfile with empty Array', function() {
        zipContent = fs.readFileSync("emptyArray.zip").toString("base64");
        return facade.addDataset("emptyArray", zipContent).then(function (InF: InsightResponse) {
            console.log(InF.code+": "+JSON.stringify(InF.body));
        }).catch(function(err:any) {
            console.log(err);
            expect.fail();
        });
    });

    it ('zipfile with picture', function() {
        zipContent = fs.readFileSync("Picture.zip").toString("base64");
        return facade.addDataset("Picture", zipContent).then(function (InF: InsightResponse) {
            console.log(InF.code+": "+JSON.stringify(InF.body));
            expect.fail();
        }).catch(function(err:any) {
            console.log(err);
        });
    });

    it ('Testing with null', function() {
        zipContent = fs.readFileSync("Picture.zip").toString("base64");
        return facade.addDataset("Picture", null).then(function (InF: InsightResponse) {
            console.log(InF.code+": "+JSON.stringify(InF.body));
            expect.fail();
        }).catch(function(err:any) {
            console.log(err);
        });
    });
    it ('Testing with undefined', function() {
        zipContent = fs.readFileSync("Picture.zip").toString("base64");
        return facade.addDataset("Picture", undefined).then(function (InF: InsightResponse) {
            console.log(InF.code+": "+JSON.stringify(InF.body));
            expect.fail();
        }).catch(function(err:any) {
            console.log(err);
        });
    });
    it ('Testing with empty string', function() {
        zipContent = fs.readFileSync("Picture.zip").toString("base64");
        return facade.addDataset("Picture", "").then(function (InF: InsightResponse) {
            console.log(InF.code+": "+JSON.stringify(InF.body));
            expect.fail();
        }).catch(function(err:any) {
            console.log(err);
        });
    });
});
