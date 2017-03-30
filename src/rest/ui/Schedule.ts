/**
 * Created by jacke on 3/29/2017.
 */
/**
 * Created by Austin on 2017-03-29.
 */
// rooms must have rooms_seats, rooms_name
// course must have courses size NumSec
var Schedule = function (courseLista: any, roomList: any): any {
    let that = this;
    var courseList = courseLista;
    let returnObject: any = {};
    var registeredSections = 0;
    while (true) {
        let currentRoom: any = getSmallestRoom(roomList);
        let roomSchedule: any = {
            "Capacity": currentRoom["rooms_seats"],
            "MWF 8-9": {},
            "MWF 9-10": {},
            "MWF 10-11": {},
            "MWF 11-12": {},
            "MWF 12-1": {},
            "MWF 1-2": {},
            "MWF 2-3": {},
            "MWF 3-4": {},
            "MWF 4-5": {},
            "TT 8-930": {},
            "TT 930-11": {},
            "TT 11-1230": {},
            "TT 1230-2": {},
            "TT 2-330": {},
            "TT 330-5": {},
        };
        var timeSlots = Object.keys(roomSchedule);
        var slotCounter = 1;

        var coursesThatNeedRooms: any = [];
        for (let course of courseList) {
            if (checkIfCourseFits(course, currentRoom) && checkIfEnoughSpaceinRoom(course, currentRoom, slotCounter)) {

                var num_of_slots = course["numOfSections"];
                for (var i = 0; i < num_of_slots; i++) {
                    roomSchedule[timeSlots[slotCounter]] = course;
                    slotCounter++;

                }
                registeredSections += num_of_slots;

            }else{
                coursesThatNeedRooms.push(course);
            }
        }
        console.log
        courseList = coursesThatNeedRooms;
        returnObject[currentRoom["rooms_name"]] = roomSchedule;
        var roomIndex = roomList.indexOf(currentRoom);
        if (roomIndex > -1) {
            roomList.splice(roomIndex, 1);
        }
        //console.log(roomList);
        if (courseList.length == 0 || roomList.length == 0) {
            break;
        }
    }
    if (courseList.length > 0) {
        returnObject["Unscheduled Courses"] = courseList;
    }
    var unregisteredSections = getNumUnregSec(courseList);
    returnObject["quality"] = unregisteredSections + "/" + (unregisteredSections+registeredSections);
    //console.log(returnObject);
    console.log(JSON.stringify(returnObject));
    return returnObject;
};
var getNumUnregSec = function(courseList:any): number{
    if (courseList.length == 0){
        return 0;
    }
    var sum = 0;
    for (var course of courseList){
        sum+= course["numOfSections"];
    }
    return sum;
}
var checkIfEnoughSpaceinRoom = function (course: any, currentRoom: any, slotCounter: number): boolean {
    var num_of_slots = 16 - slotCounter;
    return (course["numOfSections"] <= num_of_slots)
};
var checkIfCourseFits = function (course: any, currentRoom: any): boolean {
    return (course["maxSize"] <= currentRoom["rooms_seats"]);
};

var getSmallestRoom = function (roomList: any): any {
    var SmallestRoom = roomList[0];
    for (let room of roomList) {
        if (room["rooms_seats"] < SmallestRoom["rooms_seats"]) {
            SmallestRoom = room;
        }
    }
    return SmallestRoom;
};


var tObjectPerfectfit = Schedule([{
    "courses_dept": "cpsc",
    "courses_id": 110,
    "courses_Size": 218,
    "numOfSections": 3
}, {
    "courses_dept": "cpsc",
    "courses_id": 259,
    "courses_Size": 216,
    "numOfSections": 1
}, {
    "courses_dept": "cpsc",
    "courses_id": 312,
    "courses_Size": 159,
    "numOfSections": 1
}, {
    "courses_dept": "cpsc",
    "courses_id": 301,
    "courses_Size": 156,
    "numOfSections": 1
}, {
    "courses_dept": "cpsc",
    "courses_id": 121,
    "courses_Size": 156,
    "numOfSections": 2
}, {
    "courses_dept": "cpsc",
    "courses_id": 304,
    "courses_Size": 156,
    "numOfSections": 1
}, {
    "courses_dept": "cpsc",
    "courses_id": 310,
    "courses_Size": 156,
    "numOfSections": 1
}, {
    "courses_dept": "cpsc",
    "courses_id": 313,
    "courses_Size": 153,
    "numOfSections": 1
}, {
    "courses_dept": "cpsc",
    "courses_id": 210,
    "courses_Size": 148,
    "numOfSections": 2
}, {
    "courses_dept": "cpsc",
    "courses_id": 213,
    "courses_Size": 148,
    "numOfSections": 2
}], [{"rooms_name": "BIOL_2000", "rooms_seats": 228}]);
console.log(JSON.stringify(tObjectPerfectfit));

var tObject2rooms = Schedule([{
    "courses_dept": "cpsc",
    "courses_id": 110,
    "courses_Section_size": 218,
    "numOfSections": 3
}, {
    "courses_dept": "cpsc",
    "courses_id": 259,
    "courses_Section_size": 216,
    "numOfSections": 1
}, {
    "courses_dept": "cpsc",
    "courses_id": 312,
    "courses_Section_size": 159,
    "numOfSections": 1
}, {
    "courses_dept": "cpsc",
    "courses_id": 301,
    "courses_Section_size": 156,
    "numOfSections": 1
}, {
    "courses_dept": "cpsc",
    "courses_id": 121,
    "courses_Section_size": 156,
    "numOfSections": 2
}, {
    "courses_dept": "cpsc",
    "courses_id": 304,
    "courses_Section_size": 156,
    "numOfSections": 1
}, {
    "courses_dept": "cpsc",
    "courses_id": 310,
    "courses_Section_size": 156,
    "numOfSections": 1
}, {
    "courses_dept": "cpsc",
    "courses_id": 313,
    "courses_Section_size": 153,
    "numOfSections": 1
}, {
    "courses_dept": "cpsc",
    "courses_id": 210,
    "courses_Section_size": 148,
    "numOfSections": 2
}, {
    "courses_dept": "cpsc",
    "courses_id": 213,
    "courses_Section_size": 148,
    "numOfSections": 2
},{
    "courses_dept": "math",
    "courses_id": 110,
    "courses_Section_size": 218,
    "numOfSections": 3
}, {
    "courses_dept": "math",
    "courses_id": 259,
    "courses_Section_size": 216,
    "numOfSections": 1
}, {
    "courses_dept": "math",
    "courses_id": 312,
    "courses_Section_size": 159,
    "numOfSections": 1
}], [{"rooms_name": "BIOL_2000", "rooms_seats": 228}, {"rooms_name": "SWING_121", "rooms_seats": 228}]);
console.log(JSON.stringify(tObject2rooms));

var tObjectTooManyObjectstoFit = Schedule([{
    "courses_dept": "cpsc",
    "courses_id": 110,
    "courses_Section_size": 218,
    "numOfSections": 3
}, {
    "courses_dept": "cpsc",
    "courses_id": 259,
    "courses_Section_size": 216,
    "numOfSections": 1
}, {
    "courses_dept": "cpsc",
    "courses_id": 312,
    "courses_Section_size": 159,
    "numOfSections": 1
}, {
    "courses_dept": "cpsc",
    "courses_id": 301,
    "courses_Section_size": 156,
    "numOfSections": 1
}, {
    "courses_dept": "cpsc",
    "courses_id": 121,
    "courses_Section_size": 156,
    "numOfSections": 2
}, {
    "courses_dept": "cpsc",
    "courses_id": 304,
    "courses_Section_size": 156,
    "numOfSections": 1
}, {
    "courses_dept": "cpsc",
    "courses_id": 310,
    "courses_Section_size": 156,
    "numOfSections": 1
}, {
    "courses_dept": "cpsc",
    "courses_id": 313,
    "courses_Section_size": 153,
    "numOfSections": 1
}, {
    "courses_dept": "cpsc",
    "courses_id": 210,
    "courses_Section_size": 148,
    "numOfSections": 2
}, {
    "courses_dept": "cpsc",
    "courses_id": 213,
    "courses_Section_size": 148,
    "numOfSections": 2
}, {
    "courses_dept": "math",
    "courses_id": 313,
    "courses_Section_size": 153,
    "numOfSections": 1
}, {
    "courses_dept": "math",
    "courses_id": 210,
    "courses_Section_size": 148,
    "numOfSections": 2
}, {
    "courses_dept": "math",
    "courses_id": 213,
    "courses_Section_size": 148,
    "numOfSections": 2
}], [{"rooms_name": "BIOL_2000", "rooms_seats": 228}]);
console.log(JSON.stringify(tObjectTooManyObjectstoFit));
