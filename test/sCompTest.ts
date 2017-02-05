/**
 * Created by jacke on 2/3/2017.
 */

import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";
var fs = require("fs");

describe("sCompTest", function() {
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

    it("testing valid sComp true cases", function () {
        expect(facade.sComparison('*end','weouifan--end')).to.equal(true);
        expect(facade.sComparison('beg*','beg--weouifan')).to.equal(true);
        expect(facade.sComparison('*contains*','weou--contains--ifan')).to.equal(true);
        expect(facade.sComparison('matches','matches')).to.equal(true);
        return;
    });
    it("testing valid sComp false cases", function () {
        expect(facade.sComparison('*end','endweouifan')).to.equal(false);
        expect(facade.sComparison('beg*','weobeguifan')).to.equal(false);
        expect(facade.sComparison('*contains*','weou--conifan')).to.equal(false);
        expect(facade.sComparison('matches','doesnotmatch')).to.equal(false);
        return;
    });
})