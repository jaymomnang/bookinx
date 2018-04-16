
//get objects from database
exports.getObjectFromDB = function (_url) {
    return new Promise(function (resolve, reject) {
        request(_url, function (error, response, body) {
            if (error) reject(error);
            resolve(parseData(body));
        });
    });
}

var parseData = function(data){
    //console.log("--------------start data---------------");
    //console.log(data);
    //console.log("--------------end data---------------");
    return JSON.parse(data);
}

exports.shortDate = function(dateValue){
    if(dateValue == undefined){
        return "";
    }
    var d = dateValue.substring(0, 10);
    return d;
}

//add 1 hour to the current time frame
exports.addHour = function (value) {
    var endVal = value.substring(3, 5);
    var currentVal = parseInt(value.substring(0, 2)) + 1;
    var rVal = currentVal.toString();
    if (rVal.length == 1) {
        rVal = "0" + rVal + ":" + endVal;
    } else {
        rVal = rVal + ":" + endVal;
    }
    return rVal;
}

//get the travel routes of the vessels
exports.getRoutes = function(data) {
    var _sp = [];
    var i = 0;
    var index = 0;
    var count = 0;
    var limit = data.length;

    for (i == 0; i < limit; i++) {
        for (index == 0; index < limit; index++) {
            if (data[i].port_name != data[index].port_name) {
                _sp[count] = data[i].port_name + ' - ' + data[index].port_name;
                count = count + 1;
            }
        }
        index = 0;
    }
    return _sp;
};