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
        zipContent = fs.readFileSync("courses.zip").toString("base64");
    });
    beforeEach(function() {
        facade = null;
        facade = new InsightFacade();
    });
    afterEach(function() {
       facade = null;
    });

    it("addDataset", function() {
        facade.addDataset("courses",zipContent);
    });

});