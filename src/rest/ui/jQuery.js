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

        var query=queryTemplateCourses($('#courses_order_by').val());
        //TODO Section Size
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

        var query=queryTemplateRooms();
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
            displayTableOfArrayObj(Res.result);
            console.table(Res.result);
        }).fail(function(xhr,textstat,errorthrown){
            alert(xhr.status+": error");
        });
        return false;
    })//end of click postCourses
});