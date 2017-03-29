queryTemplateCourses=function(byOrderOf){
// courses keys:
// 			"courses_dept",
// 			"courses_id",
// 			"courses_instructor",
// 			"courses_title",
// 			"courses_avg",
// 			"courses_pass",
// 			"courses_fail",
// 			"courses_audit",
// 			"courses_uuid"


	var queryObject={
		"WHERE": {

		},
		"OPTIONS": {
			"COLUMNS": [
			"courses_dept",
			"courses_id",
			"courses_instructor",
			"courses_title",
			"courses_avg"
			],
			"ORDER": "courses_dept",
			"FORM": "TABLE"
		},
		"TRANSFORMATIONS": {
			"GROUP": [
			"courses_dept",
			"courses_id",
			"courses_instructor",
			"courses_title",
			"courses_avg"
			],
			"APPLY": []
		}
	}//end of queryObject

    switch(byOrderOf){
        case "OrderFail":
            queryObject={
                "WHERE": {

                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_dept",
                        "courses_id",
                        "courses_instructor",
                        "courses_title",
                        "courses_avg",
                        "MostFails"
                    ],
                    "ORDER":{
                        "dir": "DOWN",
                        "keys": ["MostFails"]
                    } ,
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["courses_dept","courses_id","courses_instructor","courses_avg"],
                    "APPLY": [{
                        "MostFails": {
                            "MAX": "courses_fail"
                        }
                    }]
                }
            };
            break;
        case "OrderPassing":
            queryObject={
                "WHERE": {

                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_dept",
                        "courses_id",
                        "courses_instructor",
                        "courses_title",
                        "courses_avg",
                        "MostPass"
                    ],
                    "ORDER":{
                        "dir": "DOWN",
                        "keys": ["MostPass"]
                    } ,
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["courses_dept","courses_id","courses_instructor","courses_avg"],
                    "APPLY": [{
                        "MostPasses": {
                            "MAX": "courses_pass"
                        }
                    }]
                }
            };
            break;
        case "OrderHighestGrade":
            queryObject={
                "WHERE": {

                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_dept",
                        "courses_id",
                        "courses_instructor",
                        "courses_title",
                        "maxAvg"
                    ],
                    "ORDER":{
                        "dir": "DOWN",
                        "keys": ["maxAvg"]
                    } ,
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["courses_dept","courses_id","courses_instructor","courses_title"],
                    "APPLY": [{
                        "maxAvg": {
                            "MAX": "courses_avg"
                        }
                    }]
                }
            };
            break;
        case "OrderLowestGrade":
            queryObject={
                "WHERE": {

                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_dept",
                        "courses_id",
                        "courses_instructor",
                        "courses_title",
                        "minAvg"
                    ],
                    "ORDER":{
                        "dir": "DOWN",
                        "keys": ["minAvg"]
                    } ,
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["courses_dept","courses_id","courses_instructor","courses_title"],
                    "APPLY": [{
                        "minAvg": {
                            "MIN": "courses_avg"
                        }
                    }]
                }
            };
            break;
        case "OrderMostSections":
            queryObject={
                "WHERE": {

                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_dept",
                        "courses_id",
                        "courses_instructor",
                        "courses_title",
                        "courses_avg",
                        "courses_uuid",
                        "numOfSections"
                    ],
                    "ORDER":{
                        "dir": "DOWN",
                        "keys": ["numOfSections"]
                    } ,
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["courses_title","courses_dept","courses_id","courses_instructor","courses_avg"],
                    "APPLY": [{
                        "numOfSections": {
                            "COUNT": "courses_uuid"
                        }
                    }]
                }
            };
            break;
        default:

    }

	return queryObject;
}//end of queryTemplateCourses

