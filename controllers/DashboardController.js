'use strict';
exports.loadDashboard = function (req, res) {
  //TODO: Get dashboard data
  var _url = mc_api + "schedule/";
  request(_url, function (error, response, body) {

    if (error) return error;
    var data = JSON.parse(body);

    var ui_data = req.session;
    res.render("dashboard", { menus, ui_data, data });

  });

};

exports.getSchedules = function(req, res){
  //TODO: load all flight/travel schedules.

  res.render("dashboard");
};
