/**
 * Created by jacke on 3/28/2017.
 */
queryTemplateRooms=function(operation) {
    if (operation == "schedule") {
        var queryObj = {
            "WHERE": {},
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_seats",
                    'rooms_name',
                    'rooms_lat',
                    'rooms_lon'
                ],
                "ORDER": {
                    "dir": "DOWN",
                    "keys": ["rooms_seats", "rooms_fullname"]
                },
                "FORM": "TABLE"
            },
            "TRANSFORMATIONS": {
                "GROUP": ["rooms_seats",
                    'rooms_name',
                    'rooms_lat',
                    'rooms_lon'],
                "APPLY": []
            }
        }
    }else{
        var queryObj = {
            "WHERE": {},
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_seats",
                    'rooms_name',
                    'rooms_fullname',
                    "rooms_furniture",
                    'rooms_number',
                    'rooms_type',
                    'rooms_lat',
                    'rooms_lon'
                ],
                "ORDER": {
                    "dir": "DOWN",
                    "keys": ["rooms_seats", "rooms_fullname"]
                },
                "FORM": "TABLE"
            },
            "TRANSFORMATIONS": {
                "GROUP": ["rooms_seats",
                    'rooms_fullname',
                    "rooms_furniture",
                    'rooms_number',
                    'rooms_type',
                    'rooms_lat',
                    'rooms_lon'],
                "APPLY": []
            }
        }
    }
    return queryObj;
}

compareAddressToFindLatAndLon=function(arrOfRooms,address){
    for(var room in arrOfRooms){
        if(arrOfRooms[room]['rooms_address']==address){
            return {lat:arrOfRooms[room]['rooms_lat'],
                lon:arrOfRooms[room]['rooms_lon']};
        }
    }
    return {lat:0,lon:0};//no address found
};

createDistance=function(arrOfRoom,address){
    var queryObject={
        "WHERE": {
        },
        "OPTIONS": {
            "COLUMNS": [
                "rooms_address",
                'rooms_lat',
                'rooms_lon'
            ],
            "ORDER": {
                "dir": "DOWN",
                "keys": ["rooms_address"]
            },
            "FORM": "TABLE"
        },
        "TRANSFORMATIONS": {
            "GROUP": ["rooms_address",
                'rooms_lat',
                'rooms_lon'],
            "APPLY": []
        }
    };
    var queryObjectStr=JSON.stringify(queryObject);
    var promise=$.ajax({
        type: 'POST',
        url: "http://localhost:4321/query",
        data: queryObjectStr,
        contentType: "application/json; charset=utf-8"
    }).done(function(Res){
        var LatAndLonObjOfOriginAddress= compareAddressToFindLatAndLon(Res.result,address);
        var originLat= LatAndLonObjOfOriginAddress.lat;
        var originLon=LatAndLonObjOfOriginAddress.lon;
        for (var i = 0; i < arrOfRoom.length; i++) {
            var room=arrOfRoom[i];
            var toCompLat=room['rooms_lat'];
            var toCompLon=room['rooms_lon'];
            arrOfRoom[i]['distance(m)']=calculateDistance(originLat,originLon,toCompLat,toCompLon);
        }
    }).fail(function(xhr,textstat,errorthrown){
        alert(xhr.status+": error");
        return {error:"ajax fail"};
    });
    return promise;
}

calculateDistance=function(lat1,lon1,lat2,lon2){
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a))*1000; // 2 * R; R = 6371000 m
}

filterByDistance=function(arrOfRooms,schedule_distance,schedule_lat,schedule_lon,schedule_distance_expression){
    if(schedule_distance=="" || schedule_lat==""||schedule_lon==''){
        console.log("note some empty distance filter");
        return;
    }
    var distance=Number(schedule_distance);
    var originLat=Number(schedule_lat);
    var originLon=Number(schedule_lon);
    var newArrOfRooms=[];

    switch(schedule_distance_expression){
        case 'GT':
            for(var index in arrOfRooms){
                var calDist=calculateDistance(originLat,originLon,arrOfRooms[index]['rooms_lat'],arrOfRooms[index]['rooms_lon'])
                arrOfRooms[index]['distance(m)']=calDist;
                if(calDist>distance){
                    newArrOfRooms.push(arrOfRooms[index]);
                }
            }
            arrOfRooms=newArrOfRooms;
            break;
        case 'LT':
            for(var index in arrOfRooms){
                var calDist=calculateDistance(originLat,originLon,arrOfRooms[index]['rooms_lat'],arrOfRooms[index]['rooms_lon'])
                arrOfRooms[index]['distance(m)']=calDist;
                if(calDist<distance){
                    newArrOfRooms.push(arrOfRooms[index])
                }
            }
            arrOfRooms=newArrOfRooms;
            break;
    }
};
