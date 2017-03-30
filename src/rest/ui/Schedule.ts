  {
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
                }
