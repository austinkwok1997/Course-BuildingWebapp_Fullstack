/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";

import Log from "../Util";
import {queryParser} from "restify";
import {stringify} from "querystring";
import {type} from "os";
import {isUndefined} from "util";
//import reduceEachTrailingCommentRange = ts.reduceEachTrailingCommentRange;

class dStructure {
    [propName:string]:any;
};
class rObject{
    [propName:string]:any;
}
var dataStructure=new dStructure();

export default class InsightFacade implements IInsightFacade {

    constructor() {
        Log.trace('InsightFacadeImpl::init()');

    }

    addDataset(id: string, content: string): Promise<InsightResponse> {

        if(content == null || content == undefined || content == "") {//edge cases
            return new Promise(function (fulfill, reject) {
                let response:InsightResponse = {code: 400, body: {"error": "content isn't a zip file"}}
                reject(response);
                return;

            });
        }else {
            if (!dataStructure.hasOwnProperty(id)) {
                return new Promise(function (fulfill, reject) {
                    var JSZip = require("jszip");
                    dataStructure[id] = {};

                    var keyArray: string[] = [];
                    var promises: Promise<String>[] = [];

                    // loads the data
                    JSZip.loadAsync(content, {base64: true}).then(function (zipFile: any) {

                        //console.log("#1; in load Async of: " + id);
                        Object.keys(zipFile.files).forEach(function (key: any) {

                            //   console.log("#2...; in the keys function " + key);
                            keyArray.push(key);
                        });

                        return zipFile;

                    }).then(function (zipFile: any) {
                        keyArray.forEach(function (key: any) {
                            //   console.log("#4...; inside array loop for key: " + key);
                            //need new promise each time so we can call promise all at the end:
                            var newPromise = new Promise(function (resolve) {
                                zipFile.files[key].async('string').then(function (fileData: any) {

                                    //          console.log("#4.1...; inside the async fucntion: "+ id+ " " + fileData);
                                    resolve(fileData);
                                    return;
                                });
                            });

                            promises.push(newPromise);
                        });

                        Promise.all(promises).then(function (arrayFileData: any) {
                            // console.log("#5...; in promiseAll with: "+arrayFileData);
                            var keyIndex = 0;
                            arrayFileData.forEach(function (fileData: any) {
                                if (fileData != null && fileData != '') {
                                    //var obj = JSON.parse(fileData); //parses JSON string to Json object
                                    // dataStructure[id][keyArray[keyIndex]] = obj;
                                    try {
                                        if(Array.isArray(JSON.parse(fileData))){
                                            throw "error JSON file not right";
                                        }
                                        var obj = JSON.parse(fileData); //parses JSON string to Json object

                                        dataStructure[id][keyArray[keyIndex]] = obj;
                                    } catch (e) {
                                        let response: InsightResponse = {
                                            code: 400,
                                            body: {"error": "zip contains non JSON files"}
                                        };
                                        delete dataStructure[id];
                                        reject(response);
                                        return;
                                    }

                                }
                                keyIndex++;
                            });
                            //console.log("this is the cached as an object right now: "+dataStructure);
                            // console.log("this is the cached as a in JSON stringify format: "+JSON.stringify(dataStructure));
                            //console.log(dataArray);
                            ///that.dataStructure=dataStructure;
                            let success: InsightResponse = {
                                code: 200,
                                body: {"text": "the operation was successful and the id was new (not added in this session or was previously cached)."}
                            };
                            fulfill(success);
                            return;

                        }).catch(function (error) {
                            console.log("JSON parse error: " + error);
                            reject(error);
                            return;
                        });

                    }).catch(function (err: any) {

                        let errorInsResp: InsightResponse = {
                            code: 400,
                            body: {"text": "error" + ": fs could not read file: " + err}
                        };
                        reject(errorInsResp);
                        return;
                    });

                    console.log("#0.1; outside iterating through id: " + id);
//TODO
reject(null);
return;
                });
            } else {
                let alreadyHasInsResp: InsightResponse = {
                    code: 204,
                    body: {"text": "the operation was successful and the id already existed (was added in this session or was previously cached)."}
                };
                return new Promise(function (resolve, reject) {
                    resolve(alreadyHasInsResp);
                    return;

                });
            }
        }
    }

    removeDataset(id: string): Promise<InsightResponse> {

        if(id == null || id == undefined || id == "") {//edge cases
            return new Promise(function (fulfill, reject) {
                let response:InsightResponse = {code: 404, body: {"error": "id isn't a string"}}
                reject(response);
                return;
            });
        }

        return new Promise (function (fulfill, reject) {
            if(dataStructure.hasOwnProperty(id)) {
                delete dataStructure[id];
                let deleteDoneInsResp: InsightResponse = {
                    code: 201,
                    body: {"text": "the operation was successful."}
                };
                fulfill(deleteDoneInsResp);
                return;
            }else{
                let deleteDoneInsResp: InsightResponse = {
                    code: 404,
                    body: {"text": "the operation was unsuccessful because the delete was for a resource that was not previously added."}
                };
                reject(deleteDoneInsResp);
                return;
            }

        }).catch(function(err){
            console.log(err);
            throw err;
        });
    }
/*
    removeAllDataset(){
        var promises:Promise<rObject>[]=[];

        return new Promise(function(fulfill,reject) {
            for (var key in dataStructure) {
                let newPromise=new Promise(function(fulfill){
                    this.removeDataset(key);
                });
                promises.push(newPromise);
            }
            Promise.all(promises).then(function(arrayObject:any){
                console.log("all dataset should be deleted");
                fulfill(true);
            })
        }).catch(function(err){
            console.log(err);
            throw err;
        })
    }
*/
    performQuery(query: QueryRequest): Promise <InsightResponse> {
        return new Promise((function(fulfill,reject){
            reject(null);}
            )
        );
      /*  
        let that=this;

        var q=query;
        var queryJson=JSON.parse(JSON.stringify(q));//convert to a JS object (convert object to JSON String)????????
        var response:InsightResponse={code:777,body:{}};
        var responseObject= {render:'TABLE',result:<any>[]};

        var sortingOrderKey:string;


        var mainPromise:Promise <InsightResponse>=new Promise(function(fulfill,reject) {
            if (!queryJson.hasOwnProperty('WHERE') || !queryJson.hasOwnProperty('OPTIONS')) { //checks for where and options
                console.log("invalid query");
                response.code = 424;
                response.body = {"missing": ["WHERE or OPTIONS"]};
                reject(response);
                return;
            }

            var queryJsonOptions = queryJson.OPTIONS;
            if (!that.hasValidOptions(queryJsonOptions)) {//checks for proper options format
                console.log("invalid query options");
                response.code = 400;
                response.body = {"error": "invalid query OPTIONS"};
                reject(response);
                return;
            }

            var keyArray = queryJsonOptions.COLUMNS;
            sortingOrderKey=queryJsonOptions.ORDER;
            if(!keyArray.includes(sortingOrderKey)){
                response.code = 400;
                response.body = {"error": "Order key needs to be included in columns"};
                reject(response);
                return;
                //TODO TEST THIS HANDLING:: PREVIOUS ERRORS LINKED TO THIS
            }
            var queryWhereObject = JSON.parse(JSON.stringify(queryJson.WHERE));//should return where key??

            var promisesForEachTermInCourse:Promise<Boolean>[]=[];
            var promisesForEachCourse:Promise<Boolean>[]=[];

            for (var id in dataStructure) {

                    let setOfCourses = dataStructure[id];
                    if(setOfCourses===undefined){
                        that.removeDataset(id);
                        reject({code:400,body:{"error": "undefined Object in dataStructure should now be removed" }});
                        return
                    }
                    for (var course in setOfCourses) {
                        if(setOfCourses[course]===undefined){
                            that.removeDataset(id);
                            reject({code:400,body:{"error": "undefined Object in dataStructure should now be removed" }});
                            return;
                        }
                        var newPromiseForEachCourse = new Promise(function (resolve) {
                            let resultArray: Array<Object> = [];
                            resultArray = setOfCourses[course.toString()]['result'];
                            resultArray.forEach(function (courseTermData: Object) {

                                let newPromiseForEachTerm=new Promise(function(resolve){
                                    //making a resultObject for each courseTermData
                                    let resultObject = new rObject();
                                    keyArray.forEach(function (k: any) {
                                        resultObject[k] = null;
                                    });

                                    var filterResult=that.filterManager(queryWhereObject, courseTermData);
                                    if (filterResult===true) {//if entry passes the where queries add to our resulting structure that will parse into InsightResponse body
                                        for (var key in resultObject) {
                                            if (key === 'id') {
                                                resultObject[key] = JSON.parse(JSON.stringify(courseTermData))[that.keyToJsonKey(key).toString()].toString; //special case if keyArray element is id we need to turn the int into a string
                                            } else {
                                                resultObject[key] = JSON.parse(JSON.stringify(courseTermData))[that.keyToJsonKey(key).toString()];//take desired keys from result object and fill them with the values in valid courseTermData
                                            }
                                        }
                                        responseObject['result'].push(resultObject);
                                    }
                                    resolve(true);
                                    return;

                                });
                                promisesForEachTermInCourse.push(newPromiseForEachTerm);
                            });
                            resolve(true);
                            return;
                        })
                        promisesForEachCourse.push(newPromiseForEachCourse);
                    }
            }
            Promise.all(promisesForEachTermInCourse).then(function () {
                Promise.all(promisesForEachCourse).then(function () {
                    response['code'] = 200;
                    response['body'] = {render:'TABLE',result:that.sortByKey(sortingOrderKey,responseObject)};
                    console.log("# of items in result: " +responseObject['result'].length);
                    fulfill(response);
                    return;
                }).catch(function (err) {
                    console.log("PromiseEachCourseError is: " + err);
                    response['code'] = 400;
                    response['body'] = {"error": err};
                    reject(response);
                    return;
                });
            }).catch(function (err) {
                console.log("PromiseEachTERMCourseError is: " + err);
                response['code'] = 400;
                response['body'] = {"error": err};
                reject(response);
                return;
            });
//TODO
reject(null);
return;

        }).catch(function(err){
            console.log("ERROR: "+JSON.stringify(err));
            return new Promise(function(resolve, reject){
                reject(err);
                return;
            });
        });
        return mainPromise;
        */

    }

    sortByKey(sortingOrderKey:string,responseObject:rObject):Array<rObject>{
        let that=this;

        let arrayToSort=responseObject['result'];
        let returnObject= {render:'TABLE',result:<any>[]};
        if(that.isKeyWithNumType(sortingOrderKey)) { //SORTING BY NUMBER

            arrayToSort=that.bubbleSort(responseObject['result'],sortingOrderKey);
        }else{ //SORTING BY ALPHABETS
            var alphaSorting=function(ObjA:rObject,ObjB:rObject){
                if (ObjA[sortingOrderKey] < ObjB[sortingOrderKey])
                    return -1;
                if (ObjA[sortingOrderKey] > ObjB[sortingOrderKey])
                    return 1;
                return 0;
            }
            arrayToSort.sort(alphaSorting);
        }
        return arrayToSort;
    }

    bubbleSort(array:Array<rObject>,sortingOrderKey:string):Array<Object> {
        for(let i=0;i<array.length;i++){
            for(var j=0;j<array.length-1-i;j++){
                if(array[j][sortingOrderKey]>array[j+1][sortingOrderKey]){
                    let temp=array[j];
                    array[j]=array[j+1];
                    array[j+1]=temp;
                }
            }
        }
        return array;
    }


    getDataStructure():Object{
        return dataStructure;
    }

    //takes in the filter and a course term returns if info shold be added or not
    filterManager(filter:Object,toCompare: Object):boolean{ //recursive function for "WHERE"; base case in
        let that=this;

        var filterObject=JSON.parse(JSON.stringify(filter));

        //LOGICCOMPARISON => recursive calls
        if(filterObject.hasOwnProperty('OR')){
            let filterArray=filterObject['OR'];
            let resultBool:boolean=false;
            for(let filt=0;filt<filterArray.length;filt++){
                resultBool=that.filterManager(filterArray[filt], toCompare);
                //console.log("OR loop: boolResult: "+resultBool +" for: " + JSON.stringify(filterArray[filt]));
                if (resultBool===true) {
                    break;
                }
            }
            return resultBool;
        }else if(filterObject.hasOwnProperty('AND')){
            let filterArray=filterObject['AND'];
            let resultBool=true;
            for(let filt=0;filt<filterArray.length;filt++){
                    resultBool=that.filterManager(filterArray[filt], toCompare);
                    //console.log("AND loop: boolResult: "+resultBool +" for: " + JSON.stringify(filterArray[filt]));
                    if (resultBool===false) {
                        break;
                    }
            };
            return resultBool;
        }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //MCOMPARISON =>terminal base cases
        else if(filterObject.hasOwnProperty('EQ')){
            var toCompareObject=JSON.parse(JSON.stringify(toCompare));
            for(var key in filterObject.EQ){
                if(toCompareObject.hasOwnProperty((this.keyToJsonKey(key)).toString())) {
                    let val = toCompareObject[(this.keyToJsonKey(key)).toString()];
                    if((typeof filterObject.EQ[key] !== 'number') || !(that.isKeyWithNumType(key))){
                        throw "EQ value should be a number";
                    }
                    if (!(filterObject.EQ[key] === val)) {
                        return false;
                    }
                }
            }return true; //all keys pass equality test at this point (can apply to strings too?)
        }
        else if(filterObject.hasOwnProperty('GT')){
            var toCompareObject=JSON.parse(JSON.stringify(toCompare));
            for(var key in filterObject.GT){

                if(toCompareObject.hasOwnProperty((this.keyToJsonKey(key)).toString())) {
                    let val = toCompareObject[(this.keyToJsonKey(key)).toString()];
                    if((typeof filterObject.GT[key]==='number') && (that.isKeyWithNumType(key))) {
                        if (filterObject.GT[key] >= val) { //if lower bound(greaterThan) is greater the val
                            return false;
                        }
                    }else{
                        throw "GT value should be a number";
                    }
                }
            }return true; //all keys pass comparison test at this point
        }
        else if(filterObject.hasOwnProperty('LT')){
            var toCompareObject=JSON.parse(JSON.stringify(toCompare));
            for(var key in filterObject.LT){

                if(toCompareObject.hasOwnProperty((this.keyToJsonKey(key)).toString())) {
                    let val = toCompareObject[(this.keyToJsonKey(key)).toString()];
                    if((typeof filterObject.LT[key]==='number') && (that.isKeyWithNumType(key))){
                        if (filterObject.LT[key] <= val) { //if lower bound(greaterThan) is greater the val
                            return false;
                        }
                    }else{
                        throw "LT value should be a number";
                    }
                }
            }return true; //all keys pass comparison test at this point
        }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //SCOMPARISON =>terminal base cases
        else if(filterObject.hasOwnProperty('IS')){

            var toCompareObject=JSON.parse(JSON.stringify(toCompare));
            for(var key in filterObject.IS){
                if(toCompareObject.hasOwnProperty((this.keyToJsonKey(key)).toString())) {
                    let val = toCompareObject[(this.keyToJsonKey(key)).toString()];
                    if((typeof filterObject.IS[key] !== 'string') || (that.isKeyWithNumType(key))){
                        throw "IS value should be a string";
                    }
                    if(that.sComparison(filterObject.IS[key],val)===false) {//checks for false Scomparison conditions
                        return false;
                    }
                }
            }return true;
        }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //NEGATION => recursive calls
        else if(filterObject.hasOwnProperty('NOT')){ return !that.filterManager(filterObject.NOT,toCompare);}
        else{
            //console.log("no valid filter found");
            throw "no valid filter found";
        }
    }

    keyToJsonKey(key: String): String{
        switch(key){
            case "courses_dept":
                return "Subject";
            case "courses_id":
                return "Course";
            case "courses_avg":
                return "Avg";
            case "courses_instructor":
                return "Professor";
            case "courses_title":
                return "Title";
            case "courses_pass":
                return "Pass";
            case "courses_fail":
                return "Fail";
            case "courses_audit":
                return "Audit";
            case "courses_uuid":
                return "id";
            default:
                //console.log("not valid key query");
                throw "not valid key in query";
        }
    }

    isKeyWithNumType(key: String):boolean{
        switch(key){
            case "courses_dept":
                return false;
            case "courses_id":
                return false;
            case "courses_avg":
                return true;
            case "courses_instructor":
                return false;
            case "courses_title":
                return false;
            case "courses_pass":
                return true;
            case "courses_fail":
                return true;
            case "courses_audit":
                return true;
            case "courses_uuid":
                return false;
            default:
                //console.log("not valid key query");
                throw "not valid key in query";
        }
    }

    hasValidOptions(opKey:any):Boolean{
        var qOption=JSON.parse(JSON.stringify(opKey));
        if(qOption.hasOwnProperty('ORDER')&& qOption.hasOwnProperty('FORM')){
           if(qOption.FORM == "TABLE"){
               return true;
           }
        }
        return false;
    }

    sComparison(qKey:String,val:String):Boolean{ //key is query input; val is database value
        // case1:*qkey* -- contains
        if(typeof qKey !== 'string'){
            throw "Invalid query: IS value should be a string";
        }
        if(qKey.charAt(0)==='*' && qKey.charAt(qKey.length-1)==='*'){
            let truncatedKey=qKey.substring(1,qKey.length-1);
            var num=val.indexOf(truncatedKey);
            if(val.indexOf(truncatedKey)!==-1){
                return true;
            }
            return false;
        }
        //case2:*qkey -- ends with
        else if(qKey.charAt(0)==='*'){
            let truncatedKey=qKey.substring(1,qKey.length);
            if(val.endsWith(truncatedKey)){
                return true;
            }
            return false;
        }
        //case3:qkey* -- starts with
        else if(qKey.charAt(qKey.length-1)==='*'){
            if(val.startsWith(qKey.substring(0,qKey.length-1))){
                return true;
            }
            return false;
        }
        //case4:qKey -- same text as
        else{
            if(qKey===val){
                return true;
            }
            return false;
        }
    }
}
