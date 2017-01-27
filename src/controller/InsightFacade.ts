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

            JSZip.loadAsync(content, {base64: true}).then(function(zipFile: any){
                console.log(zipFile.files);
                Object.keys(zipFile.files).forEach(function (key: any) {
                    //console.log(key);
                });
            })
        });
    }

    removeDataset(id: string): Promise<InsightResponse> {
        return null;
    }

    performQuery(query: QueryRequest): Promise <InsightResponse> {
        
        return null;
    }
}
