'use strict';
exports.loadDashboard = function (req, res) {
  //TODO: Get dashboard data
  var _url = mc_api + "schedule/";
  request(_url, function (error, response, body) {

    if (error) return error;
    var data = JSON.parse(body);
    var schedule = data;

    var ui_data = req.session;
    res.render("dashboard", { menus, ui_data, schedule });

  });

};

exports.getSchedules = function(req, res){
  //TODO: load all flight/travel schedules.

  res.render("dashboard");
};

function blankSchedule(){
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
}
