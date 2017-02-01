/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";

import Log from "../Util";
import {queryParser} from "restify";
import {stringify} from "querystring";
import {type} from "os";
//import reduceEachTrailingCommentRange = ts.reduceEachTrailingCommentRange;

var dataStructure: Object = {};

export default class InsightFacade implements IInsightFacade {



    constructor() {
        Log.trace('InsightFacadeImpl::init()');
    }

    addDataset(id: string, content: string): Promise<InsightResponse> {

        //****INTENDED ORDER OF EXECUTION IN ACCORDANCE TO NUMBERS IN CONSOLE LOG**********

        return new Promise (function (fulfill, reject) {
            var JSZip = require("jszip");
            dataStructure[id]={};
            //var dataArray:string[]=[];

            var keyArray: string[] = [];
            var promises: Promise<String>[]=[];

            // loads the data
            JSZip.loadAsync(content, {base64: true}).then(function(zipFile: any) {

                // grabbing the keys in zipFile.files
                console.log("#1; in load Async of: " + id);


                Object.keys(zipFile.files).forEach(function (key: any) {

                    console.log("#2...; in the keys function " + key);
                    keyArray.push(key);
                });

                return zipFile;

            }).then(function(zipFile:any){

                var testKeyArrayResult="";
                keyArray.forEach(function(key:any) {testKeyArrayResult+= " "+key;});
                console.log("#3; should have complete keyArray -- heres what it is right now: "+testKeyArrayResult);

                keyArray.forEach(function(key:any) {
                    console.log("#4...; inside array loop for key: " + key);

                    //need new promise each time so we can call promise all at the end:
                    var newPromise = new Promise( function(resolve) {
                        zipFile.files[key].async('string').then(function (fileData: any) {

                            console.log("#4.1...; inside the async fucntion: "+ id+ " " + fileData);
                            resolve(fileData);
                        });
                    });

                    promises.push(newPromise);
                });

                Promise.all(promises).then(function(arrayFileData:any){
                    console.log("#5...; in promiseAll with: "+arrayFileData);
                    var keyIndex = 0;
                    arrayFileData.forEach(function(fileData:any){
                        if(fileData!=null && fileData != '') {
                            var obj = JSON.parse(fileData); //parses JSON string to Json object

                            dataStructure[id][keyArray[keyIndex]] = obj;
                        }
                        keyIndex++;
                    });
                    console.log(dataStructure);

                    //console.log(dataArray);

                    let success:InsightResponse= {code:200,body:{"text":"the operation was successful and the id was new (not added in this session or was previously cached)."}};
                    fulfill(success);

                }).catch(function(error){console.log("JSON parse error: " +error)});

            }).catch(function(err:any){

                let errorInsResp:InsightResponse= {code:400,body:{"text": "error"+": fs could not read file: "+ err}};
                reject(errorInsResp);

                console.log("#-0; async fail: "+err);
            });

            console.log("#0.1; outside iterating through keys: "+id);

        });
    }

    removeDataset(id: string): Promise<InsightResponse> {
        // TODO: finish this to return InsightResponse
        return new Promise (function (fulfill, reject) {
            delete dataStructure[id];
        });
    }


    performQuery(query: QueryRequest): Promise <InsightResponse> {

        var q=query;
        var queryJson=JSON.parse(JSON.stringify(q));//convert to a JS object (convert object to JSON String)????????
        var response:InsightResponse={code:777,body:{}};
        var responseObject= {render:'TABLE',result:[new Object]};

        //return new Promise(function(fulfill,reject) {
            if (!queryJson.hasOwnProperty('WHERE') || !queryJson.hasOwnProperty('OPTIONS')) { //checks for where and options
                console.log("invalid query");
                response.code=424;
                response.body={"missing": ["WHERE or OPTIONS"]};
                //reject(response);       //TODO: sperate case for option and where?******************
            }

            var queryJsonOptions=queryJson.OPTIONS;
            if(!this.hasValidOptions(queryJsonOptions)){//checks for proper options format
                console.log("invalid query options");
                response.code=400;
                response.body={"error": "invalid query OPTIONS"};
                //reject(response); //TODO
            }

            var keyArray=queryJsonOptions.COLUMNS;
            var queryWhereObject=JSON.parse(JSON.stringify(queryJson.WHERE));//should return where key??

            for(var id in dataStructure){
                //let newDataSetObject=dataStructure[id];
                //let resultArray:Array<Object>=[];
                //resultArray=newDataSetObject['result'];
                //resultArray.forEach
                dataStructure[id]['result'].forEach(function(courseTermData:Object) {
                    //maaking a resultObject for each courseTermData
                    let resultObject={};
                    keyArray.forEach(function(k:any){
                        resultObject[this.keyToJsonKey(keyArray)]; //add property 'key' to the result object
                    }) //now we have an object of what we want in terms of json keys

                    if (this.filterManager(queryWhereObject, courseTermData)) {//if entry passes the where queries add to our resulting structure that will parse into InsightResponse body
                        //push keyToJsonKey(WHERE_value) into an array(maybe hashtable?) with same type of keys
                        for(var key in resultObject){
                            if(key==='id'){
                                key=courseTermData[key].toString; //special case if keyArray element is id we need to turn the int into a string
                            }else {
                                key = courseTermData[key];//take desired keys from result object and fill them with the values in valid courseTermData
                            }
                        }
                    }
                    responseObject['result'].push(resultObject);
                });

            }
            response['body']=responseObject;


        return new Promise(function(fulfill,reject) {fulfill(response)});
    }

    //takes in the filter and a course term returns if info shold be added or not
    filterManager(filter:JSON,toCompare: Object):Boolean{ //recursive function for "WHERE"; base case in
        var filterObject=JSON.parse(JSON.stringify(filter));
        var toCompareObject=JSON.parse(JSON.stringify(toCompare));

        //LOGICCOMPARISON => recursive calls
        if(filterObject.hasOwnProperty('OR')){
            let filterArray=filterObject['OR'];
            filterArray.foreach(function(filt:any){
                if(this.filterManager(filt,toCompare)){
                    return true;
                }
            })
            return false;
        }else if(filterObject.hasOwnProperty('AND')){
            let filterArray=filterObject['AND'];
            filterArray.forEach(function(filt:any){
                if(!this.filterManager(filt,toCompare)){
                    return false;
                }
            })
            return true;
        }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //MCOMPARISON =>terminal base cases
        else if(filterObject.hasOwnProperty('EQ')){
            var toCompareObject=JSON.parse(JSON.stringify(toCompare));
            for(var key in filterObject.EQ){
                if(toCompareObject.hasOwnProperty((this.keyToJsonKey(key)).toString())) {
                    let val = toCompare[(this.keyToJsonKey(key)).toString()];
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
                    let val = toCompare[(this.keyToJsonKey(key)).toString()];
                    if(typeof filterObject.GT[key]==='number' && typeof val==='number') {
                        if (filterObject.GT[key] > val) { //if lower bound(greaterThan) is greater the val
                            return false;
                        }
                    }
                }
            }return true; //all keys pass comparison test at this point
        }
        else if(filterObject.hasOwnProperty('LT')){
            var toCompareObject=JSON.parse(JSON.stringify(toCompare));
            for(var key in filterObject.GT){

                if(toCompareObject.hasOwnProperty((this.keyToJsonKey(key)).toString())) {
                    let val = toCompare[(this.keyToJsonKey(key)).toString()];
                    if(typeof filterObject.LT[key]==='number' && typeof val==='number') {
                        if (filterObject.LT[key] < val) { //if lower bound(greaterThan) is greater the val
                            return false;
                        }
                    }
                }
            }return true; //all keys pass comparison test at this point
        }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //SCOMPARISON =>terminal base cases
        else if(filterObject.hasOwnProperty('IS')){}//TODO:"wildcard functionality"
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //NEGATION => recursive calls
        else if(filterObject.hasOwnProperty('NOT')){ return !this.filterManager(filterObject.NOT,toCompare);}
        else{
            console.log("no valid filter found");
            throw "no valid filter found";
        }
    }

    keyToJsonKey(key: String): String{
        var returnVal='';
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
                console.log("not valid key query");
                throw "not valid key query";
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
}
