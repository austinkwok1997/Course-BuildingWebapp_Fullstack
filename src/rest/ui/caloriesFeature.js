/**
 * Created by jacke on 3/30/2017.
 */

caloriesFeature=function(stringOfRooms){
    var arrOfRoomObjFromQuery=stringOfRooms.split(" ");

    var returnProm= new Promise(function(fulfil){
        getAllRooms(arrOfRoomObjFromQuery).then(function(arrOfAllRoomObj){
            if(stringOfRooms==''){
                fulfil(0);
            }
            var arrOfRoomObj=findRoomObj(arrOfRoomObjFromQuery,arrOfAllRoomObj);
            fulfil(distanceToTravel(arrOfRoomObj));
        })
    })
    return returnProm;
};

findRoomObj=function(arrOfProperRoomNames,Res){
    var arrOfRoomObj=[];
    for(var ind in arrOfProperRoomNames){
        for(var j in Res.result){
            if(arrOfProperRoomNames[ind]==Res.result[j]["rooms_name"]){
                arrOfRoomObj.push(Res.result[j]);
                break;
            }
        }
    }
    return arrOfRoomObj;
};

getAllRooms=function(arrOfRoomObjFromQuery){
    var query={
        "WHERE": {},
        "OPTIONS": {
            "COLUMNS": [
                'rooms_name',
                'rooms_lat',
                'rooms_lon'
            ],
            "ORDER": {
                "dir": "DOWN",
                "keys": ["rooms_name"]
            },
            "FORM": "TABLE"
        },
        "TRANSFORMATIONS": {
            "GROUP": [
                'rooms_name',
                'rooms_lat',
                'rooms_lon'],
            "APPLY": []
        }
    };
    var queryObjectStr=JSON.stringify(query);
    var promise=$.ajax({
        type: 'POST',
        url: "http://localhost:4321/query",
        data: queryObjectStr,
        contentType: "application/json; charset=utf-8"
    }).done(function(Res){
        var rooms=Res.result;
        var roomRefString="ALL ROOMS: ";
        for(var i in rooms){
            roomRefString+=rooms[i]["rooms_name"]+" ";
        }
        console.log(roomRefString);
        var arrOfRoomObj=findRoomObj(arrOfRoomObjFromQuery,Res);
        return distanceToTravel(arrOfRoomObj);
    }).fail(function(xhr,textstat,errorthrown){
        alert(xhr.status+": error");
    });
    return promise;
};

distanceToTravel=function(arrOfRoomObj){
    var totalDistance=0;
    var lat1=0;
    var lon1=0;
    var lat2=0;
    var lon2=0;

    for(var i=0;i<arrOfRoomObj.length-1;i++){
        lat1=arrOfRoomObj[i]["rooms_lat"];
        lon1=arrOfRoomObj[i]["rooms_lon"];
        lat2=arrOfRoomObj[i+1]["rooms_lat"];
        lon2=arrOfRoomObj[i+1]["rooms_lon"];
        totalDistance+=calculateDistance(lat1,lon1,lat2,lon2);
    }
    return totalDistance;
};

makeCaloriesObjectArr=function(distance){
    const WEIGHT_1=110;
    const WEIGHT_2=140;
    const WEIGHT_3=170;
    const WALKPACE1_CALPERHR_WEIGHT_1=173.64;
    const WALKPACE1_CALPERHR_WEIGHT_2=220.99;
    const WALKPACE1_CALPERHR_WEIGHT_3=268.35;
    const WALKPACE2_CALPERHR_WEIGHT_1=197.59;
    const WALKPACE2_CALPERHR_WEIGHT_2=251.48;
    const WALKPACE2_CALPERHR_WEIGHT_3=365.36;
    const RUN_CALPERHR_WEIGHT_1=673.6;
    const RUN_CALPERHR_WEIGHT_2=857.3;
    const RUN_CALPERHR_WEIGHT_3=1041.01;
    const BIKE_CALPERHR_WEIGHT_1=398;
    const BIKE_CALPERHR_WEIGHT_2=506.76;
    const BIKE_CALPERHR_WEIGHT_3=615.35;

    var distanceMile=distance/(1000*1.60934);

    var caloriesObjectArr=[{
        WEIGHT_LB:WEIGHT_1,
        WALKING_3MPH:distanceMile*WALKPACE1_CALPERHR_WEIGHT_1/3,
        WALKING_5MPH:distanceMile*WALKPACE2_CALPERHR_WEIGHT_1/3,
        RUNNING_8MPH:distanceMile*RUN_CALPERHR_WEIGHT_1/8,
        BIKING_12MPH:distanceMile*BIKE_CALPERHR_WEIGHT_1/12
    },
        {
            WEIGHT_LB:WEIGHT_2,
            WALKING_3MPH:distanceMile*WALKPACE1_CALPERHR_WEIGHT_2/3,
            WALKING_5MPH:distanceMile*WALKPACE2_CALPERHR_WEIGHT_2/3,
            RUNNING_8MPH:distanceMile*RUN_CALPERHR_WEIGHT_2/8,
            BIKING_12MPH:distanceMile*BIKE_CALPERHR_WEIGHT_2/12
        },
        {
            WEIGHT_LB:WEIGHT_3,
            WALKING_3MPH:distanceMile*WALKPACE1_CALPERHR_WEIGHT_3/3,
            WALKING_5MPH:distanceMile*WALKPACE2_CALPERHR_WEIGHT_3/3.5,
            RUNNING_8MPH:distanceMile*RUN_CALPERHR_WEIGHT_3/7,
            BIKING_12MPH:distanceMile*BIKE_CALPERHR_WEIGHT_3/12
        }
    ]
    return caloriesObjectArr;
}

displayCaloriesObjectArr=function (caloriesObjectArr) {
    var table=document.getElementById('chart_Calories');
    table.innerHTML="";
    var attibute=Object.getOwnPropertyNames(caloriesObjectArr[0]);


    var rowNames=document.createElement('tr');
    for(var j=0;j<attibute.length;j++){
        var cell=document.createElement('td');
        cell.innerHTML=attibute[j];
        rowNames.appendChild(cell);
    }
    table.appendChild(rowNames);

    for(var i=0;i<caloriesObjectArr.length;i++){
        var obj=caloriesObjectArr[i];
        var row=document.createElement('tr');
        for(var j=0;j<attibute.length;j++){
            var cell=document.createElement('td');
            cell.innerHTML=obj[attibute[j]];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
};