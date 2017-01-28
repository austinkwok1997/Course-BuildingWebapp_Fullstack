/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";

import Log from "../Util";
var dataStructure: any = {};

export default class InsightFacade implements IInsightFacade {



    constructor() {
        Log.trace('InsightFacadeImpl::init()');
    }

    addDataset(id: string, content: string): Promise<InsightResponse> {
        return new Promise (function (fulfill, reject) {
            var JSZip = require("jszip");
            dataStructure[id]={};

            // TODO: figue out how to get to every file and read it's content
            // once you are able to figure it out, message me and I'll be able to put
            // the ontent in the dataStructure

            // loads the data
            JSZip.loadAsync(content, {base64: true}).then(function(zipFile: any){

                // grabbing the keys in zipFile.files
                console.log("in load Async");
                Object.keys(zipFile.files).forEach(function (key: any) {
                    // I believe the problem is here, because of the async

                    console.log("in the keys function");
                    zipFile.files[key].async('string').then(function (fileData : any) {
                        // this is supposed to grab the contenet in each file and turn it into a JSON file
                        // PLEASE HELP ME FIX THIS
                        console.log("inside the async fucntion");
                        var obj = JSON.parse(fileData);
                        console.log(obj);

                    });
                    console.log("outside async function");
                });
            });
            console.log("outside iterating through keys");
        });
    }

    removeDataset(id: string): Promise<InsightResponse> {
        return null;
    }

    performQuery(query: QueryRequest): Promise <InsightResponse> {
        
        return null;
    }
}
