'use strict';
exports.loadDashboard = function (req, res) {
    //TODO: Get dashboard data
    var _url = mc_api + "ports/";
    request(_url, function (error, response, body) {

        if (error) return error;
        var _ports = JSON.parse(body);
        var _p = getRoutes(_ports);

        var ui_data = req.session;
        res.render("index", { menus, ui_data, _p });

    });

};

exports.getSchedules = function (req, res) {
    //TODO: load all flight/travel schedules.
    var _data = req.body._route.split(" - ")
    req.body.departure_port = _data[0];
    req.body.destination = _data[1];
    var isReturn = req.body.return_;
    var trips = [];

    var _url = mc_api + "schedule/getTrips/single";
    request.post({ headers: { 'content-type': 'application/x-www-form-urlencoded' }, url: _url, form: req.body }, function (error, response, body) {

        if (error) return error;
        var data = JSON.parse(body);
        data.arrivalTime = addHour(data.departure_time);
        trips.push(data);



        if (isReturn == "true") {
            request(_url, function (err, resp, p) {
                if (err) return err;
                var data1 = JSON.parse(p);
                data1.arrivalTime = addHour(data1.departure_time);
                trips.push(data1);
            })
        }
        
        

        var ui_data = req.session;
        res.render("trips", { menus, ui_data, trips });
    });

};

function blankSchedule() {
    var schedule = {};
    schedule.schedule_id = 'BX-0000000';
    schedule.flight = '';
    schedule.price = 0.00;
    schedule.departure_port = '';
    schedule.departure_date = Date.now();
    schedule.departure_time = '0:00';
    schedule.destination = '';
    schedule.available_seats = 0;
    schedule.booked_seats = 0;
    schedule.total_seats = 0;
    schedule.Created_date = Date.now();
    schedule.status = "pending";

    return schedule;
};

//add 1 hour to the current time frame
var addHour = function(value) {
    var endVal = value.substring(3, 5);
    var currentVal = parseInt(value.substring(0, 2)) + 1;
    var rVal = currentVal.toString();

    if (rVal.length == 1){
        rVal = "0" + rVal + ":" + endVal;
    }else{
        rVal = rVal + ":" + endVal;
    }    
    return rVal;    
}


//get the travel routes of the vessels
function getRoutes(data) {
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