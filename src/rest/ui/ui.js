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
