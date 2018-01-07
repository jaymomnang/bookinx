'use strict';
exports.loadDashboard = function (req, res) {
  //TODO: Get dashboard data
  res.render("dashboard");
};

exports.getSchedules = function(req, res){
  //TODO: load all flight/travel schedules.

  res.render("dashboard");
};
