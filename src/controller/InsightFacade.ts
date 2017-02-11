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

var dataStructure:any ={};
var missingIdSet=new Set();

export default class InsightFacade implements IInsightFacade {

    constructor() {
        Log.trace('InsightFacadeImpl::init()');

    }

    addDataset(id: string, content: string): Promise<InsightResponse> {
//TODO: not add datadet that is not a zip file;
        //TODO: not add empty zip file
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
                            promises.push(zipFile.files[key].async('string'));
                        });

                        Promise.all(promises).then(function (arrayFileData: any) {
                            //console.log("#5...; in promiseAll with: "+arrayFileData);
                            var keyIndex = 0;

                            arrayFileData.forEach(function (fileData: any) {
                                if (fileData != null && fileData != '') {
                                    //var obj = JSON.parse(fileData); //parses JSON string to Json object
                                    // dataStructure[id][keyArray[keyIndex]] = obj;
                                    try {
                                        var obj = JSON.parse(fileData);
                                        if(Array.isArray(obj)){
                                            throw "error JSON file is Array";
                                        }
                                         //parses JSON string to Json object


                                    } catch (e) {
                                        let response: InsightResponse = {
                                            code: 400,
                                            body: {"error": "zip contains non JSON files"}
                                        };
                                        delete dataStructure[id];
                                        reject(response);
                                        return;
                                    }
                                    dataStructure[id][keyArray[keyIndex]] = obj;

                                }
                                keyIndex++;
                            });
                            let success: InsightResponse = {
                                code: 204,
                                body: {"text": "the operation was successful and the id was new (not added in this session or was previously cached)."}
                            };
                            fulfill(success);
                            return;

                        }).catch(function (error) {
                            console.log("JSON parse error: " + error);
                            reject({
                                code: 400,
                                body: {"text": "error" +"JSON parse error: " + error}
                            });
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


                });
            } else {
                let alreadyHasInsResp: InsightResponse = {
                    code: 201,
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
                    code: 204,
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

        });


    }

    performQuery(query: QueryRequest): Promise <InsightResponse> {


        let that=this;

        var queryJson:any=query;//convert to a JS object (convert object to JSON String)????????
        var response:InsightResponse={code:777,body:{}};
        var responseObject= {render:'TABLE',result:<any>[]};

        var sortingOrderKey:string;


        var mainPromise:Promise <InsightResponse>=new Promise(function(fulfill,reject) {


            if (!queryJson.hasOwnProperty('WHERE') || !queryJson.hasOwnProperty('OPTIONS')) { //checks for where and options
                console.log("invalid query");
                response.code = 400;
                response.body = {"error":  "Missing WHERE or OPTIONS"};
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
            }
            var queryWhereObject = JSON.parse(JSON.stringify(queryJson.WHERE));//should return where key??

            var promisesForEachTermInCourse:Promise<Boolean>[]=[];
            var promisesForEachCourse:Promise<Boolean>[]=[];
            var idSet:any=new Set();

            for (var id in dataStructure) {

                let setOfCourses = dataStructure[id];
                for (var course in setOfCourses) {
                    let resultArray: any = [];
                    resultArray = setOfCourses[course.toString()]['result'];

                    for(let courseTermData of resultArray) {
                        let resultObject: any = {};
                        keyArray.forEach(function (k: any) {
                            resultObject[k] = null;
                        });

                        var filterResult = that.filterManager(queryWhereObject, courseTermData);

                        if (filterResult === true) {//if entry passes the where queries add to our resulting structure that will parse into InsightResponse body
                            let missingIdArray:any=[];

                            for (var underscoreWord in resultObject) {

                                let curId=that.underscoreManager(underscoreWord,'id');
                                if(dataStructure.hasOwnProperty(curId)) {

                                    idSet.add(curId);
                                    let key = that.underscoreManager(underscoreWord, 'key');
                                    
                                   // if (underscoreWord === 'id') {
                                  //      resultObject[underscoreWord] = courseTermData[that.keyToJsonKey(key).toString()].toString; //special case if keyArray element is id we need to turn the int into a string
                                  //  } else {
                                        resultObject[underscoreWord] = courseTermData[that.keyToJsonKey(key).toString()];//take desired keys from result object and fill them with the values in valid courseTermData
                                  //  }
                                    

                                }else{
                                    missingIdArray.push(curId);
                                }

                            }
                            if(missingIdArray.length!== 0){
                                response.code = 424;
                                response.body = {"Missing":  missingIdArray};
                                reject(response);
                                return;
                            }
                            responseObject['result'].push(resultObject);
                        }

                    }

                }

            }
            let missingIdArray=Array.from(missingIdSet);
            for(let i=0;i<missingIdArray.length;i++){
                if(dataStructure.hasOwnProperty(missingIdArray[i])){
                    missingIdSet.delete(missingIdArray[i]);
                }
            }
            if(missingIdSet.size>0){
                let missingIdArray=Array.from(missingIdSet);
                missingIdSet.clear();
                response.code = 424;
                response.body = {"Missing":  missingIdArray};
                reject(response);
                return;
            }

            response['code'] = 200;
            response['body'] = {render:'TABLE',result:that.sortByKey(sortingOrderKey,responseObject,idSet)};
            console.log("# of items in result: " +responseObject['result'].length);
            fulfill(response);
            return;

        }).catch(function(err){
            return new Promise(function(resolve, reject){
                reject(err);
                return;
            });
        });
        return mainPromise;

    }

    underscoreManager(str:string,type:string):string{
        if(type == "id") {
            var keyArr = str.split('_');
            return keyArr[0];
        }else if(type=="key"){
            var keyArr=str.split('_');
            return keyArr[1];
        }else{
            console.log("wrong type for underscore manager");
            throw "wrong type for underscore manager";
        }
    }


    sortByKey(sortingOrder:string,responseObject:any, idSet:Set<any>):Array<Object>{
        let that=this;
        var sortingOrderKey=that.underscoreManager(sortingOrder,'key');
        let arrayToSort=responseObject['result'];
        let idArr=Array.from(idSet);

        for(var id in idArr){
            if (that.isKeyWithNumType(sortingOrderKey)) { //SORTING BY NUMBER

                arrayToSort = that.bubbleSort(responseObject['result'], sortingOrderKey, id);
            } else { //SORTING BY ALPHABETS
                var alphaSorting = function (ObjA: any, ObjB: any) {
                    if (ObjA[id + '_' + sortingOrderKey] < ObjB[id + '_' + sortingOrderKey])
                        return -1;
                    if (ObjA[id + '_' + sortingOrderKey] > ObjB[id + '_' + sortingOrderKey])
                        return 1;
                    return 0;
                }
                arrayToSort.sort(alphaSorting);
            }
        };
        return arrayToSort;
    }

    bubbleSort(array:Array<any>,sortingOrder:string,id:string):Array<Object> {
        for(let i=0;i<array.length;i++){
            for(var j=0;j<array.length-1-i;j++){
                if(array[j][id+'_'+sortingOrder]>array[j+1][id+'_'+sortingOrder]){
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

    filterManager(filterObject:any,toCompare: Object):boolean{
        let that=this;

        //LOGICCOMPARISON => recursive calls
        if(filterObject.hasOwnProperty('OR')){
            let filterArray=filterObject['OR'];
            if(filterArray.length===0){
                throw {code:400,body:{"error":"AND array is empty"}};
            }
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
            if(filterArray.length===0){
                throw {code:400,body:{"error":"AND array is empty"}};
            }
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
            for(var underscore in filterObject.EQ){
                var prop=this.keyToJsonKey(that.underscoreManager(underscore, 'key'));
                if(toCompareObject.hasOwnProperty(prop)) {
                    let val = toCompareObject[prop.toString()];
                    if((typeof filterObject.EQ[underscore] !== 'number') || !(that.isKeyWithNumType(that.underscoreManager(underscore, 'key')))){
                        throw {code:400,body:{"error":"EQ value should be a number"}};
                    }
                    let id=that.underscoreManager(underscore,'id')
                    missingIdSet.add(id);
                    if (!(filterObject.EQ[underscore] === val)) {
                        return false;
                    }
                }
            }return true; //all keys pass equality test at this point (can apply to strings too?)
        }
        else if(filterObject.hasOwnProperty('GT')){
            var toCompareObject=JSON.parse(JSON.stringify(toCompare));
            for(var underscore in filterObject.GT){
                var prop=this.keyToJsonKey(that.underscoreManager(underscore, 'key'));
                if(toCompareObject.hasOwnProperty(prop)) {
                    let val = toCompareObject[prop.toString()];
                    if((typeof filterObject.GT[underscore]==='number') && (that.isKeyWithNumType(that.underscoreManager(underscore, 'key')))) {
                        missingIdSet.add(that.underscoreManager(underscore,'id'));
                        if (filterObject.GT[underscore] >= val) { //if lower bound(greaterThan) is greater the val
                            return false;
                        }
                    }else{
                        throw {code:400,body:{"error":"GT value should be a number"}};
                    }
                }
            }return true; //all keys pass comparison test at this point
        }
        else if(filterObject.hasOwnProperty('LT')){
            var toCompareObject=JSON.parse(JSON.stringify(toCompare));
            for(var underscore in filterObject.LT){
                var prop=this.keyToJsonKey(that.underscoreManager(underscore, 'key'));
                if(toCompareObject.hasOwnProperty(prop)) {
                    let val = toCompareObject[prop.toString()];
                    missingIdSet.add(that.underscoreManager(underscore,'id'));
                    if((typeof filterObject.LT[underscore]==='number') && (that.isKeyWithNumType(that.underscoreManager(underscore, 'key')))){
                        if (filterObject.LT[underscore] <= val) { //if lower bound(greaterThan) is greater the val
                            return false;
                        }
                    }else{
                        throw {code:400,body:{"error":"LT value should be a number"}};
                    }
                }
            }return true; //all keys pass comparison test at this point
        }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //SCOMPARISON =>terminal base cases
        else if(filterObject.hasOwnProperty('IS')){

            var toCompareObject=JSON.parse(JSON.stringify(toCompare));
            for(var underscore in filterObject.IS){
                var prop=this.keyToJsonKey(that.underscoreManager(underscore, 'key'));
                if(toCompareObject.hasOwnProperty(prop)) {
                    let val = toCompareObject[prop.toString()];
                    var bool=that.isKeyWithNumType(that.underscoreManager(underscore, 'key'));
                    if((typeof filterObject.IS[underscore] !== 'string') || (that.isKeyWithNumType(that.underscoreManager(underscore, 'key')))){
                        throw {code:400,body:{"error":"IS value should be a string"}};
                    }
                    missingIdSet.add(that.underscoreManager(underscore,'id'));
                    if(that.sComparison(filterObject.IS[underscore],val)===false) {//checks for false Scomparison conditions
                        return false;
                    }
                }
            }return true;
        }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //NEGATION => recursive calls
        else if(filterObject.hasOwnProperty('NOT')){
            return !that.filterManager(filterObject.NOT,toCompare);
        }
        else{
            //console.log("no valid filter found");
            throw {code:400,body:{"error":"no valid filter found"}};
        }
    }

    keyToJsonKey(key: String): String{
        switch(key){
            case "dept":
                return "Subject";
            case "id":
                return "Course";
            case "avg":
                return "Avg";
            case "instructor":
                return "Professor";
            case "title":
                return "Title";
            case "pass":
                return "Pass";
            case "fail":
                return "Fail";
            case "audit":
                return "Audit";
            case "uuid":
                return "id";
            default:
                //console.log("not valid key query");
                throw {code:400,body:{"error":"not valid key in query"}};
        }
    }

    isKeyWithNumType(key: String):boolean{
        switch(key){
            case "dept":
                return false;
            case "id":
                return false;
            case "avg":
                return true;
            case "instructor":
                return false;
            case "title":
                return false;
            case "pass":
                return true;
            case "fail":
                return true;
            case "audit":
                return true;
            case "uuid":
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
