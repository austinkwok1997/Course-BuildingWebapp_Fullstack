displayTableOfArrayObj=function (objArray) {
    var table=document.getElementById('chart_div');
    table.innerHTML="";
    var attibute=Object.getOwnPropertyNames(objArray[0]);


    var rowNames=document.createElement('tr');
    for(var j=0;j<attibute.length;j++){
        var cell=document.createElement('td');
        cell.innerHTML=attibute[j];
        rowNames.appendChild(cell);
    }
    table.appendChild(rowNames);

    var maxPrintOut=function(){
        if(objArray.length>100){
            return 100;
        }
        return objArray.length;
    };

    for(var i=0;i<maxPrintOut();i++){
        var obj=objArray[i];
        var row=document.createElement('tr');
        for(var j=0;j<attibute.length;j++){
            var cell=document.createElement('td');
            cell.innerHTML=obj[attibute[j]];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
};
displaySchedule=function (objSchedule) {
    var table=document.getElementById('chart_schedule');
    table.innerHTML="";
    var rooms = Object.keys(objSchedule);
    for (var i=0;i<rooms.length;i++){
        if (rooms[i] != "Unscheduled Courses" &&  rooms[i] != "quality" ){

            // // Putting a spacer inbetween rooms
            // var spacer=document.createElement('tr');
            // var spaceInside=document.createElement('td');
            // spaceInside.innerHTML="_";
            // spacer.appendChild(spaceInside);
            // table.appendChild(spacer);

            // Putting room Name at the top
            var roomNameRow=document.createElement('tr');
            var roomName=document.createElement('td');
            roomName.innerHTML=rooms[i];
            roomNameRow.appendChild(roomName);

            // Getting the Room Schedule
            var roomSchedule = objSchedule[rooms[i]];
            var timeslots = Object.keys(roomSchedule);

            // Adding Room Capacity at the top
            var capacityString=document.createElement('td');
            capacityString.innerHTML=timeslots[0];
            roomNameRow.appendChild(capacityString);
            var capacityNumber =document.createElement('td');
            capacityNumber.innerHTML=roomSchedule[timeslots[0]];
            roomNameRow.appendChild(capacityNumber);
            table.appendChild(roomNameRow);

            // Creating Row for MWF
            var MWFRow=document.createElement('tr');
            for (var j=1; j<=9;j++){
                if (roomSchedule[timeslots[j]] != {}) {
                    var courseTime = document.createElement('td');
                    courseTime.innerHTML = timeslots[j];
                    MWFRow.appendChild(courseTime);
                    var course = document.createElement('td');
                    var courseObject = roomSchedule[timeslots[j]];
                    if (courseObject && courseObject["courses_dept"]) {
                        var courseString = courseObject["courses_dept"] + "_" + courseObject["courses_id"] + " Size:" + courseObject["maxSize"] + " Sections:" + courseObject["numOfSections"];
                        course.innerHTML = courseString;
                        MWFRow.appendChild(course);
                    }
                }
            }
            table.appendChild(MWFRow);

            // Creating Row for TT
            var TTRow=document.createElement('tr');
            for (var k=10; k<=15; k++){
                if (roomSchedule[timeslots[k]] != {}) {
                    var courseTime = document.createElement('td');
                    courseTime.innerHTML = timeslots[k];
                    TTRow.appendChild(courseTime);
                    var course = document.createElement('td');
                    var courseObject = roomSchedule[timeslots[k]];
                    if (courseObject && courseObject["courses_dept"]) {
                        var courseString = courseObject["courses_dept"] + "_" + courseObject["courses_id"] + " Size:" + courseObject["maxSize"] + " Sections:" + courseObject["numOfSections"];
                        course.innerHTML = courseString;
                        TTRow.appendChild(course);
                    }
                }
            }
            table.appendChild(TTRow);
        }else if(rooms[i] == "Unscheduled Courses"){
            // Putting in the Title
            var Ucourses=document.createElement('tr');
            var title=document.createElement('td');
            title.innerHTML=rooms[i];
            Ucourses.appendChild(title);

            // Inserting the rooms
            var UcourseArray = objSchedule[rooms[i]];
            for (var l=0; l<UcourseArray.length; l++){
                var course=document.createElement('td');
                var courseObject = UcourseArray[l];
                if (courseObject && courseObject != {}) {
                    var courseString = courseObject["courses_dept"] + "_" + courseObject["courses_id"] + " Size:" + courseObject["maxSize"] + " Sections:" + courseObject["numOfSections"];
                    course.innerHTML = courseString;
                    Ucourses.appendChild(course);
                }
            }
            table.appendChild(Ucourses);
        }else if (rooms[i] == "quality") {
            var qualityRow=document.createElement('tr');
            var qualityCell = document.createElement('td');
            var qualityString = "quality: " + objSchedule[rooms[i]];
            qualityCell.innerHTML=qualityString;
            qualityRow.appendChild(qualityCell);
            table.appendChild(qualityRow);

        }
    }
};

stringUIToFilter=function(queryToEdit,keyString, uiString,IS_expression){
    if(uiString==""){
        return;
    }

    switch(IS_expression) {
        case "Is":
            uiString=uiString;
            break;
        case "contains":
            uiString="*"+uiString+"*";
            break;
        case "begins_with":
            uiString=uiString+"*";
            break;
        case "ends_with":
            uiString="*"+uiString;
            break;
    }
    var filterObjToAdd={'IS': 0};
    var keyObj={};
    keyObj[keyString]=uiString;
    filterObjToAdd.IS=keyObj;

    if(queryToEdit['WHERE'].hasOwnProperty('AND')){
        queryToEdit['WHERE']['AND'].push(filterObjToAdd);
    }else if(Object.keys(queryToEdit['WHERE']).length==1 && !queryToEdit['WHERE'].hasOwnProperty('AND')){
        var andArr=[queryToEdit['WHERE']];
        queryToEdit['WHERE']={};
        queryToEdit['WHERE']['AND']=andArr;
        queryToEdit['WHERE']['AND'].push(filterObjToAdd);
    }
    else{
        queryToEdit['WHERE']['AND']=[];
        queryToEdit['WHERE']= filterObjToAdd;
    }
}// end of stringUIToFilter

numberUIToFilter=function(queryToEdit,keyString, uiNumberString,comparisonExpression){
    if(uiNumberString==""){
        return;
    }
    var uiNumber=Number(uiNumberString);
    var filterObjToAdd={};
    var keyObj={};
    keyObj[keyString]=uiNumber;
    switch(comparisonExpression) {
        case "EQ":
            var filterObjToAdd={'EQ': 0};
            filterObjToAdd.EQ=keyObj;
            break;
        case "GT":
            var filterObjToAdd={'GT': 0};
            filterObjToAdd.GT=keyObj;
            break;
        case "LT":
            var filterObjToAdd={'LT': 0};
            filterObjToAdd.LT=keyObj;
            break;
    }

    if(queryToEdit['WHERE'].hasOwnProperty('AND')){
        queryToEdit['WHERE']['AND'].push(filterObjToAdd);
    }else if(Object.keys(queryToEdit['WHERE']).length==1 && !queryToEdit['WHERE'].hasOwnProperty('AND')){
        var andArr=[queryToEdit['WHERE']];
        queryToEdit['WHERE']={};
        queryToEdit['WHERE']['AND']=andArr;
        queryToEdit['WHERE']['AND'].push(filterObjToAdd);
    }
    else{
        queryToEdit['WHERE']['AND']=[];
        queryToEdit['WHERE']= filterObjToAdd;
    }
}//end of numberUIToFilter
