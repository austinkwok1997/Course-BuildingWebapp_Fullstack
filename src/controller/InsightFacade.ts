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

var dataStructure: any = {};
var missingIdArr: any = [];


export default class InsightFacade implements IInsightFacade {

    constructor() {
        Log.trace('InsightFacadeImpl::init()');

    }

    addDataset(id: string, content: string): Promise<InsightResponse> {
//TODO: not add empty zip file
        let that = this;

        if (content == null || content == undefined || content == "") {//edge cases
            return new Promise(function (fulfill, reject) {
                let response: InsightResponse = {code: 400, body: {"error": "content isn't a zip file"}}
                reject(response);
                return;

            });
        } else {
            if (!dataStructure.hasOwnProperty(id)) {
                return new Promise(function (fulfill, reject) {
                    var JSZip = require("jszip");
                    var parse5 = require('parse5');
                    dataStructure[id] = {};

                    var arrayOfFilesInId: string[] = [];
                    var promises: Promise<String>[] = [];
                    var promisesForHttp: Promise<any>[] = [];

                    // loads the data
                    JSZip.loadAsync(content, {base64: true}).then(function (zipFile: any) {
                        //console.log("#1; in load Async of: " + id);
                        Object.keys(zipFile.files).forEach(function (file: any) {
                            //   console.log("#2...; in the keys function " + key);
                            arrayOfFilesInId.push(file);
                        });

                        return zipFile;

                    }).then(function (zipFile: any) {
                        arrayOfFilesInId.forEach(function (file: any) {
                            promises.push(zipFile.files[file].async('string'));
                        });

                        Promise.all(promises).then(function (arrayFileData: any) {
                            //console.log("#5...; in promiseAll with: "+arrayFileData);
                            var keyIndex = 0;
                            arrayFileData.forEach(function (fileData: any) {
                                if (fileData != null && fileData != '') {
                                    if (id == "rooms") { //TODO should be base64 of room.zip???
                                        //parsing through zip with html files
                                        var htmlObj = parse5.parse(fileData);
                                        try {
                                            let roomsObject = that.arrayOfRoomsInHtmlObject(htmlObj);
                                            promisesForHttp.push(roomsObject);
                                            dataStructure[id][arrayOfFilesInId[keyIndex]] = promisesForHttp[keyIndex];
                                        } catch (err) {
                                            // console.log("no room in this building or file"+keyIndex);
                                        }
                                    } else {                                         //TODO FOR COURSES - JSON FILES: should be strictly 'courses'
                                        //var obj = JSON.parse(fileData); //parses JSON string to Json object
                                        // dataStructure[id][keyArray[keyIndex]] = obj;
                                        try {
                                            var jsonObj = JSON.parse(fileData);
                                            if (Array.isArray(jsonObj)) {
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
                                        dataStructure[id][arrayOfFilesInId[keyIndex]] = jsonObj;
                                    }

                                }
                                keyIndex++;
                            });


                            let success: InsightResponse = {
                                code: 204,
                                body: {"text": "the operation was successful and the id was new (not added in this session or was previously cached)."}
                            };
                            if (id == 'rooms') {//for rooms zip files
                                Promise.all(promisesForHttp).then(function (arr) { //TODO should not need roundabout promise all method for http...

                                    dataStructure[id] = arr;

                                    fulfill(success);
                                    return;
                                })
                            } else {
                                //otherwise if its not room
                                fulfill(success);
                                return;
                            }

                        }).catch(function (error) {
                            console.log("JSON or HTML parse error: " + error);
                            reject({
                                code: 400,
                                body: {"text": "error" + "JSON or HTML parse error: " + error}
                            });
                            delete dataStructure[id];
                            return;
                        });

                    }).catch(function (err: any) {

                        let errorInsResp: InsightResponse = {
                            code: 400,
                            body: {"text": "error" + ": fs could not read file: " + err}
                        };
                        delete dataStructure[id];
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

    arrayOfRoomsInHtmlObject(htmlObj: any): Promise<Object> {
        //TODO: Clean up the calls:should not need to access htmlObj for every variable for every room
        // maybe return an array of objects if we need object for everyroom in a building
        const http = require('http');

        let returnObject = {result: <any>[]};
        let arrOfRoomAndText = htmlObj.childNodes[6].childNodes[3].childNodes[31].childNodes[10].childNodes[1].childNodes[3].childNodes[1].childNodes[5].childNodes[1].childNodes[3].childNodes[1].childNodes[3].childNodes;
        let arrOfParsedRoom: any = [];
        let arrOfRoom: any = [];
        for (let i = 1; i < arrOfRoomAndText.length; i = i + 2) {
            arrOfParsedRoom.push(arrOfRoomAndText[i]);
        }
        let address = htmlObj.childNodes[6].childNodes[3].childNodes[31].childNodes[10].childNodes[1].childNodes[3].childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[1].childNodes[3].childNodes[0].childNodes[0].value;
        let url = 'http://skaha.cs.ubc.ca:11316/api/v1/team154/' + encodeURIComponent(address.trim());

        return new Promise(function (fulfil, reject) {
            http.get(url, (res: any) => {
                //res should be an object with lat lon OR error
                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk: any) => {
                    rawData += chunk;
                });
                res.on('end', () => {
                    try {
                        let parsedData = JSON.parse(rawData);

                        if (parsedData.hasOwnProperty("message")) {
                            reject(parsedData.code + " " + parsedData.message);
                        }

                        for (let i = 0; i < arrOfParsedRoom.length; i++) {
                            let roomObj: any = {};
                            //find rooms_fullname: string; Full building name (e.g., "Hugh Dempster Pavilion").
                            roomObj.fullname = htmlObj.childNodes[6].childNodes[3].childNodes[31].childNodes[10].childNodes[1].childNodes[3].childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[0].value;
                            ;
                            //find rooms_shortname: string; Short building name (e.g., "DMP").
                            roomObj.shortname = htmlObj.childNodes[6].childNodes[1].childNodes[9].attrs[1].value;
                            //find rooms_number: string; The room number. Not always a number, so represented as a string.
                            roomObj.number = arrOfParsedRoom[i].childNodes[1].childNodes[1].childNodes[0].value;//is a string
                            //find rooms_name: string; The room id; should be rooms_shortname+"_"+rooms_number.
                            roomObj.name = roomObj.shortname + "_" + roomObj.number;
                            //find rooms_address: string; The building address. (e.g., "6245 Agronomy Road V6T 1Z4"). NEED ZIP CODE???
                            roomObj.address = address;
                            //find rooms_lat: number; The latitude of the building.
                            //find rooms_lon: number; The longitude of the building.
                            roomObj.lat = parsedData.lat;
                            roomObj.lon = parsedData.lon;
                            //find rooms_seats: number; The number of seats in the room.
                            roomObj.seats = Number(arrOfParsedRoom[i].childNodes[3].childNodes[0].value);
                            //find rooms_type: string; The room type (e.g., "Small Group")
                            roomObj.type = arrOfParsedRoom[i].childNodes[7].childNodes[0].value.trim();
                            //find rooms_furniture: string; The room type (e.g., "Classroom-Movable Tables & Chairs")
                            roomObj.furniture = arrOfParsedRoom[i].childNodes[5].childNodes[0].value.trim();
                            //find rooms_href: string; The link to full details online (e.g., "http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/DMP-201").
                            roomObj.href = arrOfParsedRoom[i].childNodes[1].childNodes[1].attrs[0].value;
                            arrOfRoom.push(roomObj);
                        }
                        returnObject['result'] = arrOfRoom;
                        fulfil(returnObject);
                        return;
                    } catch (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                });
            })
        })
    }

    removeDataset(id: string): Promise<InsightResponse> {


        if (id == null || id == undefined || id == "") {//edge cases
            return new Promise(function (fulfill, reject) {
                let response: InsightResponse = {code: 404, body: {"error": "id isn't a string"}}
                reject(response);
                return;
            });
        }

        return new Promise(function (fulfill, reject) {
            if (dataStructure.hasOwnProperty(id)) {
                delete dataStructure[id];
                let deleteDoneInsResp: InsightResponse = {
                    code: 204,
                    body: {"text": "the operation was successful."}
                };
                fulfill(deleteDoneInsResp);
                return;
            } else {
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


        let that = this;

        var uuidUniqueSet = new Set();
        var queryJson: any = query;//convert to a JS object (convert object to JSON String)????????
        var response: InsightResponse = {code: 777, body: {}};
        var responseObject = {render: 'TABLE', result: <any>[]};

        var sortingOrderKey: string;


        var mainPromise: Promise <InsightResponse> = new Promise(function (fulfill, reject) {


            if (!queryJson.hasOwnProperty('WHERE') || !queryJson.hasOwnProperty('OPTIONS')) { //checks for where and options
                console.log("invalid query");
                response.code = 400;
                response.body = {"error": "Missing WHERE or OPTIONS"};
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
            // let key = Object.keys(dataStructure);
            // if (key.length == 0){
            //     console.log("dataset is empty");
            //     response.code = 424;
            //     response.body = {"error": "nothing found in dataset"};
            //     reject(response);
            //     return;
            // }

            var keyArray = queryJsonOptions.COLUMNS;
            var courseRoomCheck = keyArray[0];
            if (that.underscoreManager(courseRoomCheck, 'id') == "rooms") {
                if (!dataStructure.hasOwnProperty('rooms')) {
                    console.log("no rooms found in dataset");
                    response.code = 424;
                    response.body = {"missing": ["rooms"]};
                    reject(response);
                    return;
                }
            } else if (that.underscoreManager(courseRoomCheck, 'id') == "courses") {
                if (!dataStructure.hasOwnProperty('courses')) {
                    console.log("no courses found in dataset");
                    response.code = 424;
                    response.body = {"missing": ["courses"]};
                }
            }
            if (!that.multipleKeysWhere(queryJson.WHERE, courseRoomCheck) || !that.multipleKeysColums(queryJson.OPTIONS.COLUMNS, courseRoomCheck)) {
                console.log("found different keys in query");
                response.code = 400;
                response.body = {"error": "invalid query with multiple keys"};
                reject(response);
                return;
            }

            sortingOrderKey = queryJsonOptions.ORDER;
            if(sortingOrderKey){
                try {
                    that.keyToJsonKey(that.underscoreManager(sortingOrderKey, 'key'))
                }
                catch (e){
                    reject(e);
                }
            }
            //if (!keyArray.includes(sortingOrderKey)) {
            //   response.code = 400;
            //    response.body = {"error": "Order key needs to be included in columns"};
            //     reject(response);
            //     return;
            //  }

            var queryWhereObject = JSON.parse(JSON.stringify(queryJson.WHERE));//should return where key??

            var idSet: any = new Set();
            if (queryWhereObject != {}) {
                that.filterManager(queryWhereObject, {}, true); //adds filter id to missing id list for 424
                for (let i = 0; i < keyArray.length; i++) {
                    let idToBeChecked = that.underscoreManager(keyArray[i], 'id');
                    if (!dataStructure.hasOwnProperty(idToBeChecked)) {
                        missingIdArr.push(idToBeChecked);
                    }
                }
            }
            if (queryWhereObject == {}){
                
            }
            if (that.underscoreManager(courseRoomCheck, 'id') == "rooms") {
                let setOfRooms = dataStructure['rooms'];
                for (let building of setOfRooms) {
                    let resultArray: any = [];
                    resultArray = building['result'];
                    for (let room of resultArray) {
                        let resultObject: any = {};
                        keyArray.forEach(function (k: any) {
                            resultObject[k] = null;
                        });
                        var filterResult = that.filterManager(queryWhereObject, room, false);

                        if (filterResult === true) {//if entry passes the where queries add to our resulting structure that will parse into InsightResponse body
                            //let missingIdArray:any=[];

                            for (var underscoreWord in resultObject) {
                                let curId = that.underscoreManager(underscoreWord, 'id');
                                idSet.add(curId);
                                let theKey = that.underscoreManager(underscoreWord, 'key');
                                resultObject[underscoreWord] = room[that.keyToJsonKey(theKey)];
                            }
                            responseObject['result'].push(resultObject);
                        }
                    }

                }
            } else if (that.underscoreManager(courseRoomCheck, 'id') == "courses") {
                let setOfCourses = dataStructure["courses"];

                for (var course in setOfCourses) {
                    let resultArray: any = [];
                    resultArray = setOfCourses[course.toString()]['result'];

                    for (let courseTermData of resultArray) {
                        let resultObject: any = {};
                        keyArray.forEach(function (k: any) {
                            resultObject[k] = null;
                        });
                        if (courseTermData["Section"] == "overall"){
                            courseTermData["Year"] = 1900;
                        }
                        courseTermData["Year"] = Number(courseTermData["Year"]);


                        var filterResult = that.filterManager(queryWhereObject, courseTermData, false);

                        if (filterResult === true) {//if entry passes the where queries add to our resulting structure that will parse into InsightResponse body
                            //let missingIdArray:any=[];

                            for (var underscoreWord in resultObject) {
                                let curId = that.underscoreManager(underscoreWord, 'id');
                                idSet.add(curId);
                                let theKey = that.underscoreManager(underscoreWord, 'key');
                                if (underscoreWord === 'id') {
                                    resultObject[underscoreWord] = courseTermData[that.keyToJsonKey(that.underscoreManager(underscoreWord, 'key'))].toString; //special case if keyArray element is id we need to turn the int into a string
                                } else {
                                    resultObject[underscoreWord] = courseTermData[that.keyToJsonKey(theKey)];
                                }
                            }
                            if (!uuidUniqueSet.has(courseTermData.id)) {//to account for repeating result objects bug TODO
                                uuidUniqueSet.add(courseTermData.id);
                                responseObject['result'].push(resultObject);
                            }
                        }

                    }

                }
            }


            for (let i = 0; i < missingIdArr.length; i++) {
                if (dataStructure.hasOwnProperty(missingIdArr[i])) {
                    missingIdArr.splice(i);
                }
            }
            if (missingIdArr.length > 0) {//for 424
                let missingIdArray = Array.from(missingIdArr);
                response.code = 424;
                response.body = {"Missing": missingIdArray};
                missingIdArr = [];
                reject(response);
                return;
            }

            response['code'] = 200;
            if (sortingOrderKey != null) {
                response['body'] = {render: 'TABLE', result: that.sortByKey(sortingOrderKey, responseObject, idSet)};
            } else {
                response['body'] = {render: 'TABLE', result: responseObject['result']};
            }
            console.log("# of items in result: " + responseObject['result'].length);
            missingIdArr = [];
            fulfill(response);
            return;

        }).catch(function (err) {
            return new Promise(function (resolve, reject) {
                missingIdArr = [];
                reject(err);
                return;
            });
        });
        return mainPromise;

    }

    underscoreManager(str: string, type: string): string {
        if (type == "id") {
            var keyArr = str.split('_');
            return keyArr[0];
        } else if (type == "key") {
            var keyArr = str.split('_');
            return keyArr[1];
        } else {
            console.log("wrong type for underscore manager");
            throw "wrong type for underscore manager";
        }
    }


    sortByKey(sortingOrder: string, responseObject: any, idSet: Set<any>): Array<Object> {
        let that = this;
        var sortingOrderKey = that.underscoreManager(sortingOrder, 'key');
        let arrayToSort = responseObject['result'];
        let idArr = Array.from(idSet);

        for (let id = 0; id < idArr.length; id++) {
            var objectCompare = function (ObjA: any, ObjB: any) {
                if (ObjA[idArr[id] + '_' + sortingOrderKey] < ObjB[idArr[id] + '_' + sortingOrderKey])
                    return -1;
                if (ObjA[idArr[id] + '_' + sortingOrderKey] > ObjB[idArr[id] + '_' + sortingOrderKey])
                    return 1;
                return 0;
            }
            arrayToSort.sort(objectCompare);
        }
        ;
        return arrayToSort;
    }


    getDataStructure(): Object {
        return dataStructure;
    }

    filterManager(filterObject: any, toCompare: Object, fourTwoFourChecker: boolean): boolean {
        let that = this;

        //LOGICCOMPARISON => recursive calls
        if (filterObject.hasOwnProperty('OR')) {
            let filterArray = filterObject['OR'];
            if (filterArray.length === 0) {
                throw {code: 400, body: {"error": "AND array is empty"}};
            }
            let resultBool: boolean = false;
            for (let filt = 0; filt < filterArray.length; filt++) {
                resultBool = that.filterManager(filterArray[filt], toCompare, fourTwoFourChecker);
                //console.log("OR loop: boolResult: "+resultBool +" for: " + JSON.stringify(filterArray[filt]));
                if (resultBool === true) {
                    break;
                }
            }
            return resultBool;
        } else if (filterObject.hasOwnProperty('AND')) {
            let filterArray = filterObject['AND'];
            if (filterArray.length === 0) {
                throw {code: 400, body: {"error": "AND array is empty"}};
            }
            let resultBool = true;
            for (let filt = 0; filt < filterArray.length; filt++) {
                resultBool = that.filterManager(filterArray[filt], toCompare, fourTwoFourChecker);
                //console.log("AND loop: boolResult: "+resultBool +" for: " + JSON.stringify(filterArray[filt]));
                if (resultBool === false) {
                    break;
                }
            }
            ;
            return resultBool;
        }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //MCOMPARISON =>terminal base cases
        else if (filterObject.hasOwnProperty('EQ')) {
            var toCompareObject = JSON.parse(JSON.stringify(toCompare));
            for (var underscore in filterObject.EQ) {
                if (fourTwoFourChecker) {
                    missingIdArr.push(that.underscoreManager(underscore, 'id'));
                }
                var prop = this.keyToJsonKey(that.underscoreManager(underscore, 'key'));
                if (toCompareObject.hasOwnProperty(prop)) {
                    let val = toCompareObject[prop.toString()];
                    if ((typeof filterObject.EQ[underscore] !== 'number') || !(that.isKeyWithNumType(that.underscoreManager(underscore, 'key')))) {
                        throw {code: 400, body: {"error": "EQ value should be a number"}};
                    //} else if (prop == "lat" || prop == "lon") {
                      //  if (!toCompareObject.hasO)
                        //if (!(filterObject.EQ[underscore] === val)) {
                          //  return false;
                        //}
                    } else {
                        let id = that.underscoreManager(underscore, 'id');
                        if (!(filterObject.EQ[underscore] === val)) {
                            return false;
                        }
                    }
                }else {
                    return false;
                }
            }
            return true; //all keys pass equality test at this point (can apply to strings too?)
        }
        else if (filterObject.hasOwnProperty('GT')) {
            var toCompareObject = JSON.parse(JSON.stringify(toCompare));
            for (var underscore in filterObject.GT) {
                if (fourTwoFourChecker) {
                    missingIdArr.push(that.underscoreManager(underscore, 'id'));
                }
                var prop = this.keyToJsonKey(that.underscoreManager(underscore, 'key'));
                if (toCompareObject.hasOwnProperty(prop)) {
                    let val = toCompareObject[prop.toString()];
                    if ((typeof filterObject.GT[underscore] === 'number') && (that.isKeyWithNumType(that.underscoreManager(underscore, 'key')))) {
                        if (filterObject.GT[underscore] >= val) { //if lower bound(greaterThan) is greater the val
                            return false;
                        }
                    //} else if (prop == "lat" || prop == "lon") {
                      //  if (!toCompareObject.hasOwnProperty(prop)){
                        //    return false;
                        //}
                        //if (filterObject.GT[underscore] >= val) { //if lower bound(greaterThan) is greater the val
                        //    return false;
                        //}
                    } else {
                        throw {code: 400, body: {"error": "GT value should be a number"}};
                    }
                }else {
                    return false;
                }
            }
            return true; //all keys pass comparison test at this point
        }
        else if (filterObject.hasOwnProperty('LT')) {
            var toCompareObject = JSON.parse(JSON.stringify(toCompare));
            for (var underscore in filterObject.LT) {
                if (fourTwoFourChecker) {
                    missingIdArr.push(that.underscoreManager(underscore, 'id'));
                }
                var prop = this.keyToJsonKey(that.underscoreManager(underscore, 'key'));
                if (toCompareObject.hasOwnProperty(prop)) {
                    let val = toCompareObject[prop.toString()];
                    if ((typeof filterObject.LT[underscore] === 'number') && (that.isKeyWithNumType(that.underscoreManager(underscore, 'key')))) {
                        if (filterObject.LT[underscore] <= val) { //if lower bound(greaterThan) is greater the val
                            return false;
                        }
                    //} else if (prop == "lat"|| prop == "lon") {
                      //  if (!toCompareObject.hasOwnProperty(prop)){
                        //    return false
                        //}
                        //if (filterObject.LT[underscore] <= val) { //if lower bound(greaterThan) is greater the val
                        //    return false;
                        //}
                    } else {
                        throw {code: 400, body: {"error": "LT value should be a number"}};
                    }
                }else {
                    return false;
                }
            }
            return true; //all keys pass comparison test at this point
        }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //SCOMPARISON =>terminal base cases
        else if (filterObject.hasOwnProperty('IS')) {

            var toCompareObject = JSON.parse(JSON.stringify(toCompare));
            for (var underscore in filterObject.IS) {
                if (fourTwoFourChecker) {
                    missingIdArr.push(that.underscoreManager(underscore, 'id'));
                }
                var prop = this.keyToJsonKey(that.underscoreManager(underscore, 'key'));
                if (toCompareObject.hasOwnProperty(prop)) {
                    let val = toCompareObject[prop.toString()];
                    var bool = that.isKeyWithNumType(that.underscoreManager(underscore, 'key'));
                    if ((typeof filterObject.IS[underscore] !== 'string') || (that.isKeyWithNumType(that.underscoreManager(underscore, 'key')))) {
                        throw {code: 400, body: {"error": "IS value should be a string"}};
                    }
                    if (that.sComparison(filterObject.IS[underscore], val) === false) {//checks for false Scomparison conditions
                        return false;
                    }
                }
            }
            return true;
        }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //NEGATION => recursive calls
        else if (filterObject.hasOwnProperty('NOT')) {
            return !that.filterManager(filterObject.NOT, toCompare, fourTwoFourChecker);
        }
        else {
            //console.log("no valid filter found");
            throw {code: 400, body: {"error": "no valid filter found"}};
        }
    }

    keyToJsonKey(key: string): string {
        switch (key) {
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
            case "year":
                return "Year";
            case "fullname":
                return "fullname";
            case "shortname":
                return "shortname";
            case "number":
                return "number";
            case "name":
                return "name";
            case "address":
                return "address";
            case "lat":
                return "lat";
            case "lon":
                return "lon";
            case "seats":
                return "seats";
            case "type":
                return "type";
            case "furniture":
                return "furniture";
            case "href":
                return "href";
            default:
                //console.log("not valid key query");
                throw {code: 400, body: {"error": "not valid key in query"}};
        }
    }

    isKeyWithNumType(key: String): boolean {
        switch (key) {
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
            case "year":
                return true;
            case "fullname":
                return false;
            case "shortname":
                return false;
            case "number":
                return false;
            case "name":
                return false;
            case "address":
                return false;
            case "lat":
                return true;
            case "lon":
                return true;
            case "seats":
                return true;
            case "type":
                return false;
            case "furniture":
                return false;
            case "href":
                return false;
            default:
                //console.log("not valid key query");
                throw "not valid key in query";
        }
    }

    hasValidOptions(opKey: any): Boolean {
        var qOption = JSON.parse(JSON.stringify(opKey));
        if (qOption.hasOwnProperty('COLUMNS') && qOption.hasOwnProperty('FORM')) {
            if (qOption.FORM == "TABLE") {
                return true;
            }
        }
        return false;
    }

    sComparison(queryKey: String, dataSetVal: String): Boolean {
        //key is query input; val is database value
        // case1:*qkey* -- contains
        if (typeof queryKey !== 'string') {
            throw "Invalid query: IS value should be a string";
        }
        if (queryKey.charAt(0) === '*' && queryKey.charAt(queryKey.length - 1) === '*') {
            let truncatedKey = queryKey.substring(1, queryKey.length - 1);
            var num = dataSetVal.indexOf(truncatedKey);
            if (dataSetVal.indexOf(truncatedKey) !== -1) {
                return true;
            }
            return false;
        }
        //case2:*qkey -- ends with
        else if (queryKey.charAt(0) === '*') {
            let truncatedKey = queryKey.substring(1, queryKey.length);
            if (dataSetVal.endsWith(truncatedKey)) {
                return true;
            }
            return false;
        }
        //case3:qkey* -- starts with
        else if (queryKey.charAt(queryKey.length - 1) === '*') {
            if (dataSetVal.startsWith(queryKey.substring(0, queryKey.length - 1))) {
                return true;
            }
            return false;
        }
        //case4:qKey -- same text as
        else {
            if (queryKey == dataSetVal) { //if uuid we will be comparing string to num do not use strict equal
                return true;
            }
            return false;
        }
    }

    multipleKeysWhere(query: any, id: string): boolean {
        let that = this;
        let key = Object.keys(query);
        if (key[0] == "IS" || key[0] == "LT" || key[0] == "GT" || key[0] == "EQ") {
            let innerKey = Object.keys(query[key[0]]);
            return (that.underscoreManager(innerKey[0], 'id') == that.underscoreManager(id, 'id'));
        }else if (key[0] == "AND" || key[0] == "OR"){
            let AndOrArray = query[key[0]];
            for (let element of AndOrArray){
                if (!that.multipleKeysWhere(element, id)){
                    return false;
                }
            }
            return true;
        }else if (key[0] == "NOT"){
            return this.multipleKeysWhere(query[key[0]], id);
        }
        return false;
    }
    multipleKeysColums(IDarray: any, id: string): boolean{
        let that = this;
        for (let element of IDarray){
            if (that.underscoreManager(element, 'id') != that.underscoreManager(id, 'id')){
                return false
            }
        }
        return true;
    }


}
