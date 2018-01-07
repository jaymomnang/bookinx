'use strict';

//load page defaults
exports.list_all_customers = function(req, res) {

  console.log(req.session.email);
  if (req.session.email == undefined){
    res.render("login");
  }
  else{

    var auth_url = mc_api + "customer/";
    request(auth_url, function (error, response, body) {

      if (error) return error;
      var data = JSON.parse(body);
      req.session.customers = data;
     
    });

  }


};

//post page data
exports.add_customer = function(req, res) {

  if (req.session.email == undefined){
    res.render("login");
  }else{
    var url_partial = "customer/";
    var auth_url = mc_api + url_partial;
    request.post({headers: {'content-type': 'application/x-www-form-urlencoded'}, url: auth_url, form:req.body }, function(error, response, body){
        req.session.customer = JSON.parse(body);
        var msg = 'Error creating customer, Please contact your administrator';
        var failed = true;
        if (!error){
            failed = false;
            msg = 'customer successfully created';
            var token = req.session.customer;
            var ui_data = req.session;
            res.render('customer', {menus, ui_data, failed, msg});
        }
    });
  }
};


exports.get_customer = function(req, res) {

  if (req.session.email == undefined){
    res.render("login");
  }else{
    var url_partial = "customer/" + req.params.customer_id;
    var auth_url = mc_api + url_partial;

    request(auth_url, function (error, response, body) {
      var data = JSON.parse(body);
      //prepare display data
      //TODO: load the data needed here.
      res.render(url_partial, {menus, data});
    });
  }

};

exports.update_customer = function(req, res) {

  if (req.session.email == undefined){
    res.render("login");
  }else{
    var url_partial = "customer/" + req.params.taskId;
    var auth_url = mc_api + url_partial;
    req.body.isActive = false;
    request.put({headers: {'content-type': 'application/x-www-form-urlencoded'}, url: auth_url, form:req.body }, function (error, response, body) {
      var data = JSON.parse(body);
      //prepare display data
      res.render(url_partial, data);
    });
  }
};

exports.delete_customer = function(req, res) {
  //TODO: write a process for deleting a task
  if (req.session.email == undefined){
    res.render("login");
  }else{

  }

};
