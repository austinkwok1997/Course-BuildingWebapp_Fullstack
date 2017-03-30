// import {QueryRequest} from "./IInsightFacade";
// import Log from "../Util";
// /**
//  * Created by Austin on 2017-02-03.
//  */
// interface IQueryChecker {
//     checkQuery(query: QueryRequest): Promise<string>;
// }
// function checkMComparison(obj: any): boolean{
//     let key = Object.keys(obj);
//     if(key.length > 1){
//         return false;
//     }
//     if (!containsValidKey(key[0])){
//         return false;
//     }
//     return (typeof obj[key[0]] == 'number');
// }
//
// function checkLogicComparison (elements: any): boolean {
//     if (elements instanceof Array){
//
//     }else {
//         return false;
//     }
//     for(let element of elements){
//         if (!checkComparison(element)){
//             return false;
//         }
//     }
//     return true;
// }
//
// function checkIs(obj: any): boolean {
//     let key = Object.keys(obj);
//     if (key.length > 1){
//         return false;
//     }
//     if (!containsValidKey(key[0])){
//         return false;
//     }
//     if (typeof obj[key[0]] == "string"){
//         return true;
//     }else{
//         return false;
//     }
// }
//
// function checkNot(obj: any): boolean {
//     let key = Object.keys(obj);
//     if (key.length > 1){
//         return false;
//     }else{
//         return checkComparison(obj[key[0]]);
//     }
// }
//
// function checkComparison(obj: any): boolean {
//     let key = Object.keys(obj);
//     if (key[0] == "AND"){
//         return checkLogicComparison(obj[key[0]]);
//     }
//     if (key[0] == "OR"){
//         return checkLogicComparison(obj[key[0]]);
//     }
//     if (key[0] == "LT"){
//         return checkMComparison(obj[key[0]]);
//     }
//     if (key[0] == "GT"){
//         return checkMComparison(obj[key[0]]);
//     }
//     if (key[0] == "EQ"){
//         return checkMComparison(obj[key[0]]);
//     }
//     if (key[0] == "IS"){
//         return checkIs(obj[key[0]]);
//     }
//     if (key[0] == "NOT"){
//         return checkNot(obj[key[0]]);
//     }
//     return false;
// }
//
// function checkWhereContainValidKey(obj: any): boolean{
//     let key = Object.keys(obj.WHERE);
//     if (key.length > 1){
//         return false;
//     }
//     let validEntries = ["AND", "OR", "LT", "GT", "EQ", "IS", "NOT"];
//     for (let entry of validEntries){
//         if (key[0] == entry){
//             return true;
//         }
//     }
//     return false;
// }
//
// function containsValidKey(key : string): boolean {
//     if (key == "courses_dept"){
//         return true;
//     }
//     if (key == "courses_id"){
//         return true;
//     }
//     if (key == "courses_avg"){
//         return true;
//     }
//     if (key == "courses_instructor"){
//         return true;
//     }
//     if (key == "courses_title"){
//         return true;
//     }
//     if (key == "courses_pass"){
//         return true;
//     }
//     if (key == "courses_fail"){
//         return true;
//     }
//     if (key == "courses_audit"){
//         return true;
//     }
//     if (key == "courses_uuid"){
//         return true;
//     }
//     return false;
// }
//
// function checkValidAttributes(attributes: string[]): boolean{
//     for (let a of attributes){
//         if(!containsValidKey(a)){
//             return false;
//         }
//     }
//     return true;
// }
//
// export default class QueryChecker implements IQueryChecker {
//     constructor() {
//         Log.trace('QueryChecker::init()');
//     }
//
//     checkQuery(query: QueryRequest): Promise <string> {
//         return new Promise(function(fulfill, reject) {
//             var q = query;
//             var queryJson=JSON.parse(JSON.stringify(q));
//
//             var key = Object.keys(queryJson);
//
//             // Checking whether QueryRequest contains both WHERE and OPTIONS
//             if (!key.includes("WHERE") || !key.includes("OPTIONS")){
//                 reject("Query is not valid");
//             }
//
//             // Checking OPTIONS
//             var optionKey = Object.keys(queryJson.OPTIONS);
//             if (!optionKey.includes("COLUMNS") || !optionKey.includes("FORM")){
//                 reject("Query is not valid");
//             }
//             if (queryJson.OPTIONS.COLUMNS instanceof Array) {
//                 var somethingIsNotString = false;
//                 if (queryJson.OPTIONS.COLUMNS.length == 0){
//                     reject("Cannot read property 'length' of undefined");
//                 }
//                 queryJson.OPTIONS.COLUMNS.forEach(function(item: any){
//                     if(typeof item !== 'string'){
//                         somethingIsNotString = true;
//                     }
//                 })
//                 if(somethingIsNotString){
//                     reject("Cannot read property 'length' of undefined");
//                 }
//             }else {
//                 reject("Cannot read property 'length' of undefined");
//             }
//
//             if(!checkValidAttributes(queryJson.OPTIONS.COLUMNS)){
//                 reject("Unexpected string in JSON");
//             }
//
//             if (queryJson.OPTIONS.FORM != "TABLE"){
//                 reject("Query is not valid");
//             }
//
//             if(!checkWhereContainValidKey(queryJson)){
//                 reject("Unexpected string in JSON");
//             }
//
//             if(!checkComparison(queryJson.WHERE)){
//                 reject("Query is not valid");
//             }
//
//
//             fulfill('good Query');
//         });
//     }
// }
