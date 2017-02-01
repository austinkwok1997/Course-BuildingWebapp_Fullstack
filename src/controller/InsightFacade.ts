/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";
import Log from "../Util";
import {courses} from "./courses";


var dataStructure: any = []
export default class InsightFacade implements IInsightFacade {



    constructor() {
        Log.trace('InsightFacadeImpl::init()');
    }

    addDataset(id: string, content: string): Promise<InsightResponse> {

        //****INTENDED ORDER OF EXECUTION IN ACCORDANCE TO NUMBERS IN CONSOLE LOG**********

        return new Promise (function (fulfill, reject) {
            var JSZip = require("jszip");
            dataStructure[id]={};

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
                    arrayFileData.forEach(function(fileData:any){
                        if(fileData!=null && fileData != '') {
                            var obj = JSON.parse(fileData);

                            for (var course of obj["result"]){
                                // creates new course for each course in Array
                                // and puts it in dataStructure
                                console.log("adding new course");
                                var newCourse = new courses(id);
                                let key = Object.keys(course);
                                if (key.includes("Subject")){
                                    newCourse.setDept(course["Subject"]);
                                }
                                if (key.includes("Course")){
                                    newCourse.setCourseId(course["Course"]);
                                }
                                if (key.includes("Avg")){
                                    newCourse.setAvg(course["Avg"]);
                                }
                                if (key.includes("Professor")){
                                    newCourse.setInstructor(course["Instructor"]);
                                }
                                if (key.includes("Title")){
                                    newCourse.setTitle(course["Title"]);
                                }
                                if (key.includes("Pass")){
                                    newCourse.setPass(course["Pass"]);
                                }
                                if (key.includes("Fail")){
                                    newCourse.setFail(course["Fail"]);
                                }
                                if (key.includes("Audit")){
                                    newCourse.setAudit(course["Audit"]);
                                }
                                // TODO: I'm confused where to find uuid
                                dataStructure.push(newCourse);
                            }



                        }
                    });
                    for (let course of dataStructure){
                        console.log(course.getDept());
                    }
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
        
        return null;
    }
}
