'use strict';

//load page defaults
exports.getCustomerInfo = function(req, res) {

  if (req.session.toPrice == undefined){
    return res.redirect("/");
  }  
  var uidata = req.session;
  res.render("complete", {menus, uidata});
};

//complete the booking process
exports.finishBooking = function(req, res) {

  if (req.session.toPrice == undefined){
    return res.redirect("/");
  } 

  if(req.body.isLogin == "true"){
    //authenticate
  }
  var uidata = req.session;
  res.render("complete", {menus, uidata});
};

var authenticate = function(data){

  var _url = mc_api + "login/" + data.userid + "/" + req.body.pwd;
  var usr;
  var obj = helpers.getObjectFromDB(_url);

  obj.then(function(result){

    if (result.length == 1) {

      //prepare user data      
      req.session.loggedIn = true;      
      res.session.firstname = result.firstname;
      res.session.lastname = result.lastname;
      req.session.email = result.email;
      res.session.id_type = result.id_type;
      res.session.id_no = result.id_no;
      var uidata = req.session;
      res.render("complete", {menus, uidata});
      
    } else {
      
      var uidata = req.session;
      res.render("complete", {msgTitle: 'Login Failed',msg : 'User authentication failed! Incorrect username or password', menus, uidata });
    }
  });
}

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
