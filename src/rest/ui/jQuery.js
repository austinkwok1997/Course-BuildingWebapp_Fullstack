$(function(){
    $('#postCourses').click(function(){
        var Section_size=$('#Section_size').val();
        var Section_size_expression=$('#Section_size_expression').val();

        var Department=$('#Department').val();
        var Department_expression=$('#Department_expression').val();

        var Course_number=$('#Course_number').val();
        var Course_number_expression=$('#Course_number_expression').val();

        var Instructor=$('#Instructor').val();
        var Instructor_expression=$('#Instructor_expression').val();

        var Title=$('#Title').val();
        var Title_expression=$('#Title_expression').val();

        var orderBy=$('#courses_order_by').val();
        var query=queryTemplateCourses(orderBy);
        //TODO Section Size
        numberUIToFilter(query,"courses_Size",Section_size,Section_size_expression);
        stringUIToFilter(query,"courses_dept",Department,Department_expression);
        stringUIToFilter(query, 'courses_id',Course_number,Course_number_expression);
        stringUIToFilter(query,'courses_instructor',Instructor,Instructor_expression);
        stringUIToFilter(query,'courses_title',Title,Title_expression);

        var queryObjectStr=JSON.stringify(query);
        console.log(queryObjectStr);
        $.ajax({
            type: 'POST',
            url: "http://localhost:4321/query",
            data: queryObjectStr,
            contentType: "application/json; charset=utf-8"
        }).done(function(Res){
            if(Res.result.length==0){
                alert("nothing found");
                return;
            }
            displayTableOfArrayObj(Res.result);
            console.table(Res.result);
        }).fail(function(xhr,textstat,errorthrown){
            alert(xhr.status+": error");
        });
        return false;
    })//end of click postCourses

    $('#postRooms').click(function(){
        var Building_name=$('#Building_name').val();
        var Building_name_expression=$('#Building_name_expression').val();

        var Room_number=$('#Room_number').val();
        var Room_number_expression=$('#Room_number_expression').val();

        var Room_size=$('#Room_size').val();
        var Room_size_expression=$('#Room_size_expression').val();

        var Room_type=$('#Room_type').val();
        var Room_type_expression=$('#Room_type_expression').val();

        var Furniture_type=$('#Furniture_type').val();
        var Furniture_type_expression=$('#Furniture_type_expression').val();

        var Location=$('#Location').val();

        var query=queryTemplateRooms(" ");
        //TODO Locations
        stringUIToFilter(query,"rooms_fullname",Building_name,Building_name_expression);
        stringUIToFilter(query, 'rooms_number',Room_number,Room_number_expression);
        numberUIToFilter(query,'rooms_seats',Room_size,Room_size_expression);
        stringUIToFilter(query,'rooms_type',Room_type,Room_type_expression);
        stringUIToFilter(query,'rooms_furniture',Furniture_type,Furniture_type_expression);

        var queryObjectStr=JSON.stringify(query);
        console.log(queryObjectStr);
        $.ajax({
            type: 'POST',
            url: "http://localhost:4321/query",
            data: queryObjectStr,
            contentType: "application/json; charset=utf-8"
        }).done(function(Res){
            if(Location!=""){
                createDistance(Res.result,Location).then(function(){
                    if(Res.result.length==0){
                        alert("nothing found");
                        return;
                    }
                    displayTableOfArrayObj(Res.result);
                    console.table(Res.result);
                    return;
                }).catch(function(e){
                    console.log("finding distance error: "+e);
                    return;
                })
            }
            displayTableOfArrayObj(Res.result);
            console.table(Res.result);
        }).fail(function(xhr,textstat,errorthrown){
            alert(xhr.status+": error");
        });
        return false;
    })//end of click postCourses

    $('#postSchedule').click(function(){

        var schedule_Building_name=$('#schedule_Building_name').val();
        var schedule_Building_name_expression=$('#schedule_Building_name_expression').val();

        var schedule_lat=$('#schedule_lat').val();
        var schedule_lon=$('#schedule_lon').val();
        var schedule_distance=$('#schedule_distance').val();
        var schedule_distance_expression=$('#schedule_distance_expression').val();

        var schedule_Department=$('#schedule_Department').val();
        var schedule_Department_expression=$('#schedule_Department_expression').val();

        var schedule_Course_number=$('#schedule_Course_number').val();
        var schedule_Course_number_expression=$('#schedule_Course_number_expression').val();

        var queryRooms=queryTemplateRooms('schedule');
        var queryCourses=queryTemplateCourses('schedule');
        //TODO Locations
        stringUIToFilter(queryRooms, 'rooms_fullname',schedule_Building_name,schedule_Building_name_expression);

        stringUIToFilter(queryCourses, 'courses_dept',schedule_Department,schedule_Department_expression);
        stringUIToFilter(queryCourses, 'courses_id',schedule_Course_number,schedule_Course_number_expression);

        var queryRoomObjectStr=JSON.stringify(queryRooms);
        var queryCourseObjectStr=JSON.stringify(queryCourses);
        $.ajax({
            type: 'POST',
            url: "http://localhost:4321/query",
            data: queryRoomObjectStr,
            contentType: "application/json; charset=utf-8"
        }).done(function(ResRoom){
            $.ajax({
                type: 'POST',
                url: "http://localhost:4321/query",
                data: queryCourseObjectStr,
                contentType: "application/json; charset=utf-8"
            }).done(function(ResCourses){
                var arrOfCourses=ResCourses.result;
                var arrOfRooms=ResRoom.result;
                if(arrOfCourses==0||arrOfRooms==0){
                    alert("no rooms or courses by those filters");
                    return;
                }
                filterByDistance(arrOfRooms,schedule_distance,schedule_lat,schedule_lon,schedule_distance_expression);
                var courseAndRoomObject={courses:arrOfCourses,rooms:arrOfRooms};
                console.table(courseAndRoomObject);
                Schedule(arrOfCourses,arrOfRooms);
            }).fail(function(xhr,textstat,errorthrown){
                alert(xhr.status+": error");
            });
        }).fail(function(xhr,textstat,errorthrown){
            reject(xhr.status+": error");
        });
        return false;
    })//end of click postSchedule

    $('#postCalories').click(function(){
        var distance=0;
        var query_rooms_string=$('#rooms_field').val();
        caloriesFeature(query_rooms_string).then(function(distance){
            displayCaloriesObjectArr(makeCaloriesObjectArr(distance));
        });
    })//end of click postCalories
});
