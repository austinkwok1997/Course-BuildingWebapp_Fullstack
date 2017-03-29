/**
 * Created by jacke on 3/28/2017.
 */
queryTemplateRooms=function(){
    var queryObj= {
        "WHERE": {
        },
        "OPTIONS": {
            "COLUMNS": [
                "rooms_seats",
                'rooms_name',
                'rooms_fullname',
                "rooms_furniture",
                'rooms_number',
                'rooms_type'
            ],
            "ORDER": {
                "dir": "DOWN",
                "keys": ["rooms_seats","rooms_fullname"]
            },
            "FORM": "TABLE"
        },
        "TRANSFORMATIONS": {
            "GROUP": ["rooms_seats",
                'rooms_fullname',
                "rooms_furniture",
                'rooms_number',
                'rooms_type'],
            "APPLY": []
        }
    }
    return queryObj;
}