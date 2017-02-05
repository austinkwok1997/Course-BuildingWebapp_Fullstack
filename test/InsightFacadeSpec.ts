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
    it("remove the first dataset", function() {
        facade.removeDataset("coursesFewJson").then(function(InF:InsightResponse){
            var t=JSON.stringify(InF.body);
            console.log(InF.code+t);
        }).catch(function(err:any){
            console.log(err);
            expect.fail();
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

    /*
    it("addDataset test", function() {
        zipContent = fs.readFileSync("courses.zip").toString("base64");
        return facade.addDataset("courses", zipContent).then(function(InF:InsightResponse){

            console.log(InF.code+": "+JSON.stringify(InF.body));
        }).catch(function(err:any){
            console.log(err);
            expect.fail();
        });

    });
*/
});
