// import QueryChecker from "../src/controller/QueryChecker";
// import Log from "../src/Util";
// import {QueryRequest} from "../src/controller/IInsightFacade";
// import {expect} from 'chai';
// /**
//  * Created by Austin on 2017-02-03.
//  */
//
// describe("InsightFacadeSpec", function() {
//     let checker: QueryChecker;
//     let query: QueryRequest;
//     before(function () {
//
//     });
//     beforeEach(function() {
//         checker = new QueryChecker();
//     });
//     afterEach(function() {
//         checker = null;
//     });
//
//     it("Testing QueryChecker with nothing", function() {
//         query = {};
//         return checker.checkQuery(query).then(function (value: string) {
//             Log.test('Value: ' + value);
//             expect.fail();
//         }).catch(function (err) {
//             Log.test('Error: ' + err);
//             expect(err).to.equal("Query is not valid");
//         });
//     });
//
//     it("Testing QueryChecker with one of the elements", function() {
//         query = {"WHERE": {}};
//         return checker.checkQuery(query).then(function (value: string) {
//             Log.test('Value: ' + value);
//             expect.fail();
//         }).catch(function (err) {
//             Log.test('Error: ' + err);
//             expect(err).to.equal("Query is not valid");
//         });
//     });
//
//     it("Testing QueryChecker with both elements but empty", function() {
//         query = {"WHERE": {}, "OPTIONS" : {}};
//         return checker.checkQuery(query).then(function (value: string) {
//             Log.test('Value: ' + value);
//             expect.fail();
//         }).catch(function (err) {
//             Log.test('Error: ' + err);
//             expect(err).to.equal("Query is not valid");
//         });
//     });
//
//     it("Testing QueryChecker with just Columns", function() {
//         query = {"WHERE": {}, "OPTIONS" : {"COLUMNS": []}};
//         return checker.checkQuery(query).then(function (value: string) {
//             Log.test('Value: ' + value);
//             expect.fail();
//         }).catch(function (err) {
//             Log.test('Error: ' + err);
//             expect(err).to.equal("Query is not valid");
//         });
//     });
//
//     it("Testing QueryChecker with columns and form", function() {
//         query = {"WHERE": {}, "OPTIONS" : {"COLUMNS": [], "FORM" : "TABLE"}};
//         return checker.checkQuery(query).then(function (value: string) {
//             Log.test('Value: ' + value);
//             expect.fail();
//         }).catch(function (err) {
//             Log.test('Error: ' + err);
//             expect(err).to.equal("Cannot read property 'length' of undefined");
//         });
//     });
//
//     it("Testing QueryChecker with column not an array", function() {
//         query = {"WHERE": {}, "OPTIONS" : {"COLUMNS": {}, "FORM" : "TABLE"}};
//         return checker.checkQuery(query).then(function (value: string) {
//             Log.test('Value: ' + value);
//             expect.fail();
//         }).catch(function (err) {
//             Log.test('Error: ' + err);
//             expect(err).to.equal("Cannot read property 'length' of undefined");
//         });
//     });
//
//     it("Testing QueryChecker with column not an array", function() {
//         query = {"WHERE": {}, "OPTIONS" : {"COLUMNS": {}, "FORM" : "TABLE"}};
//         return checker.checkQuery(query).then(function (value: string) {
//             Log.test('Value: ' + value);
//             expect.fail();
//         }).catch(function (err) {
//             Log.test('Error: ' + err);
//             expect(err).to.equal("Cannot read property 'length' of undefined");
//         });
//     });
//
//     it("Testing QueryChecker with invalid stirng in columns", function() {
//         query = {"WHERE": {}, "OPTIONS" : {"COLUMNS": ["courses_avg", "e"], "FORM" : "TABLE"}};
//         return checker.checkQuery(query).then(function (value: string) {
//             Log.test('Value: ' + value);
//             expect.fail();
//         }).catch(function (err) {
//             Log.test('Error: ' + err);
//             expect(err).to.equal("Unexpected string in JSON");
//         });
//     });
//
//     it("Testing QueryChecker with invalid stirng in Form", function() {
//         query = {"WHERE": {}, "OPTIONS" : {"COLUMNS": ["courses_avg"], "FORM" : "TABL"}};
//         return checker.checkQuery(query).then(function (value: string) {
//             Log.test('Value: ' + value);
//             expect.fail();
//         }).catch(function (err) {
//             Log.test('Error: ' + err);
//             expect(err).to.equal("Query is not valid");
//         });
//     });
//
//
//     it("Testing QueryChecker with more than one item in where", function() {
//         query = {"WHERE": {"GT": {}, "AND": {}}, "OPTIONS" : {"COLUMNS": ["courses_avg"], "FORM" : "TABLE"}};
//         return checker.checkQuery(query).then(function (value: string) {
//             Log.test('Value: ' + value);
//             expect.fail();
//         }).catch(function (err) {
//             Log.test('Error: ' + err);
//             expect(err).to.equal("Unexpected string in JSON");
//         });
//     });
//
//     it("Testing QueryChecker with invalid key in WHERE", function() {
//         query = {"WHERE": {"GoT": {}}, "OPTIONS" : {"COLUMNS": ["courses_avg"], "FORM" : "TABLE"}};
//         return checker.checkQuery(query).then(function (value: string) {
//             Log.test('Value: ' + value);
//             expect.fail();
//         }).catch(function (err) {
//             Log.test('Error: ' + err);
//             expect(err).to.equal("Unexpected string in JSON");
//         });
//     });
//
//     it("Testing Querry with minor errors", function() {
//         query = {
//             "WHERE":{
//                 "GT":{
//                     "courses_avg":"d"
//                 }
//             },
//             "OPTIONS":{
//                 "COLUMNS":[
//                     "courses_dept",
//                     "courses_avg"
//                 ],
//                 "ORDER":"courses_avg",
//                 "FORM":"TABLE"
//             }
//         };
//         return checker.checkQuery(query).then(function (value: string) {
//             Log.test('Value: ' + value);
//             expect.fail
//         }).catch(function (err) {
//             Log.test('Error: ' + err);
//             expect(err).to.equal("Query is not valid");
//         });
//     });
//
//     it("Testing good Querry", function() {
//         query = {
//             "WHERE":{
//                 "GT":{
//                     "courses_avg":97
//                 }
//             },
//             "OPTIONS":{
//                 "COLUMNS":[
//                     "courses_dept",
//                     "courses_avg"
//                 ],
//                 "ORDER":"courses_avg",
//                 "FORM":"TABLE"
//             }
//         };
//         return checker.checkQuery(query).then(function (value: string) {
//             Log.test('Value: ' + value);
//             expect(value).to.equal("good Query");
//         }).catch(function (err) {
//             Log.test('Error: ' + err);
//             expect.fail();
//         });
//     });
//
//     it("Testing another good Query", function() {
//         query = {
//             "WHERE":{
//                 "OR":[
//                     {
//                         "AND":[
//                             {
//                                 "GT":{
//                                     "courses_avg":97
//                                 }
//                             },
//                             {
//                                 "IS":{
//                                     "courses_dept":"adhe"
//                                 }
//                             }
//                         ]
//                     },
//                     {
//                         "EQ":{
//                             "courses_avg":95
//                         }
//                     }
//                 ]
//             },
//             "OPTIONS":{
//                 "COLUMNS":[
//                     "courses_dept",
//                     "courses_id",
//                     "courses_avg"
//                 ],
//                 "ORDER":"courses_avg",
//                 "FORM":"TABLE"
//             }
//         };
//         return checker.checkQuery(query).then(function (value: string) {
//             Log.test('Value: ' + value);
//             expect(value).to.equal("good Query");
//         }).catch(function (err) {
//             Log.test('Error: ' + err);
//             expect.fail();
//         });
//     });
// });
