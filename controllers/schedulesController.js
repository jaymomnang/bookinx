'use strict';

//load page defaults
exports.list_all_schedules = function (req, res) {

  var auth_url = mc_api + "schedule/";
  request(auth_url, function (error, response, body) {

    if (error) return error;
    var data = JSON.parse(body);
    var schedules = data;

    var ui_data = req.session;
    res.render("schedules", { menus, ui_data, schedules });

  });

};

//post page data
exports.add_schedule = function (req, res) {

  if (req.session.email == undefined) {
    res.render("login");
  } else {
    var url_partial = "schedule/";
    var auth_url = mc_api + url_partial;
    request.post({ headers: { 'content-type': 'application/x-www-form-urlencoded' }, url: auth_url, form: req.body }, function (error, response, body) {
      req.session.schedule = JSON.parse(body);
      var msg = 'Error creating schedule, Please contact your administrator';
      var failed = true;
      if (!error) {
        failed = false;
        msg = 'schedule successfully created';
        var ui_data = req.session;
        res.render('schedule', { menus, ui_data, failed, msg });
      }
    });
  }
};


exports.get_schedule = function (req, res) {

  var url_partial = "schedule/" + req.params.schedule_id;
  var auth_url = mc_api + url_partial;

  request(auth_url, function (error, response, body) {
    var data = JSON.parse(body);
    //prepare display data
    //TODO: load the data needed here.
    res.render(url_partial, { menus, data });
  });


};

exports.update_schedule = function (req, res) {

  if (req.session.email == undefined) {
    res.render("login");
  } else {
    var url_partial = "schedule/" + req.params.taskId;
    var auth_url = mc_api + url_partial;
    req.body.isActive = false;
    request.put({ headers: { 'content-type': 'application/x-www-form-urlencoded' }, url: auth_url, form: req.body }, function (error, response, body) {
      var data = JSON.parse(body);
      //prepare display data
      res.render(url_partial, data);
    });
  }
};

exports.delete_schedule = function (req, res) {
  //TODO: write a process for deleting a task
  if (req.session.email == undefined) {
    res.render("login");
  } else {

  }

};
