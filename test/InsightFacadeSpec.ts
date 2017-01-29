/**
 * Created by Austin on 2017-01-24.
 */
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";
var fs = require("fs");

describe("InsightFacadeSpec", function() {
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



    it("addDataset test FEW json file in zip", function() {

        zipContent = fs.readFileSync("coursesFewJson.zip").toString("base64");
        return facade.addDataset("coursesFewJson", zipContent).then(function(InF:InsightResponse){
            //var t=JSON.parse(InF.body.toString());
            console.log(InF.code);
        }).catch(function(err:any){
            console.log(err);
            expect.fail();
        });
    });

    it("addDataset test 1 json file in zip", function() {
        zipContent = fs.readFileSync("oneJsonTest.zip").toString("base64");
        facade.addDataset("oneJsonTest", zipContent).then(function(InF:InsightResponse){
            console.log(InF.code+": "+InF.body);
        }).catch(function(err:any){
            console.log(err);
            expect.fail();
        });

        //   zipContent = fs.readFileSync("courses.zip").toString("base64");
        //   facade.addDataset("courses",zipContent);

    });
 //   it("addDataset test", function() {
 //       zipContent = fs.readFileSync("courses.zip").toString("base64");
 //       facade.addDataset("courses",zipContent);
 //   });

});