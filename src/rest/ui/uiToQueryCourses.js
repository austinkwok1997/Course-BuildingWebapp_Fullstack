queryTemplateCourses=function(byOrderOf){
	var queryObject={
		"WHERE": {

		},
		"OPTIONS": {
			"COLUMNS": [
			"courses_dept",
			"courses_id",
			"courses_instructor",
			"courses_title",
			"courses_avg",
                "courses_pass",
                "courses_fail",
                "courses_Size"
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
			"courses_avg",
                "courses_pass",
                "courses_fail",
                "courses_Size"
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
                        "courses_pass",
                        "courses_fail",
                        "courses_Size",
                        "MostFails"
                    ],
                    "ORDER":{
                        "dir": "DOWN",
                        "keys": ["MostFails"]
                    } ,
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["courses_dept","courses_id","courses_instructor","courses_avg","courses_pass","courses_fail",
                        "courses_Size"],
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
                        "courses_pass",
                        "courses_fail",
                        "courses_Size",
                        "MostPass"
                    ],
                    "ORDER":{
                        "dir": "DOWN",
                        "keys": ["MostPass"]
                    } ,
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["courses_dept","courses_id","courses_instructor","courses_avg","courses_pass","courses_fail",
                        "courses_Size"],
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
                        "courses_pass",
                        "courses_fail",
                        "courses_Size",
                        "maxAvg"
                    ],
                    "ORDER":{
                        "dir": "DOWN",
                        "keys": ["maxAvg"]
                    } ,
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["courses_dept","courses_id","courses_instructor","courses_title","courses_pass","courses_fail",
                        "courses_Size"],
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
                        "courses_pass",
                        "courses_fail",
                        "courses_Size",
                        "minAvg"
                    ],
                    "ORDER":{
                        "dir": "DOWN",
                        "keys": ["minAvg"]
                    } ,
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["courses_dept","courses_id","courses_instructor","courses_title","courses_pass","courses_fail",
                        "courses_Size"],
                    "APPLY": [{
                        "minAvg": {
                            "MIN": "courses_avg"
                        }
                    }]
                }
            };
            break;
        case "OrderMostSections":
            queryObject=
                {
                    "WHERE": {},
                    "OPTIONS": {
                        "COLUMNS": [
                            "courses_dept",
                            "courses_id",
                            "courses_uuid",
                            "courses_pass",
                            "courses_fail",
                            "numOfSections",
                            "maxPasses",
                            "maxFails",
                            "courses_Size"
                        ],
                        "ORDER": {
                            "dir": "DOWN",
                            "keys": ["numOfSections"]
                        },
                        "FORM": "TABLE"
                    },
                    "TRANSFORMATIONS": {
                        "GROUP": ["courses_dept", "courses_id"],
                        "APPLY": [{
                            "numOfSections": {
                                "COUNT": "courses_uuid"
                            }
                        },
                            {
                                "maxPasses": {
                                    "MAX": "courses_pass"
                                }
                            }, {
                                "maxFails": {
                                    "MIN": "courses_fail"
                                }
                            }]
                    }
                }
            break;
        case "schedule":
            queryObject=  {
                "WHERE": {
                    "EQ":{"courses_year":2014}
                },
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_dept",
                        "courses_id",
                        "numOfSections",
                        "courses_year",
                        "maxSize"
                    ],
                    "ORDER": "courses_dept",
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": [
                        "courses_dept",
                        "courses_id","courses_year"
                    ],
                    "APPLY": [{
                        "numOfSections": {
                            "COUNT": "courses_uuid"
                        }
                    }, {
                        "maxSize": {
                            "MAX": "courses_Size"
                        }
                    }]
                }
            };
            break;
        default:

    }

    return queryObject;
}//end of queryTemplateCourses
