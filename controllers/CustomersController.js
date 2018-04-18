'use strict';

//load page defaults
exports.getCustomerInfo = function (req, res) {

  if (req.session.toPrice == undefined) {
    return res.redirect("/");
  }
  var uidata = req.session;
  res.render("complete", { menus, uidata });
};

//complete the booking process
exports.finishBooking = function (req, res) {

  if (req.session.toPrice == undefined) {
    return res.redirect("/");
  }
  if (req.body.isLogin == "true") {
    req.body.isLogin = "false";
    authenticate(req, res);
  }
  if (req.body.addpass == "true") {
    req.body.addpass = "false";
    addpassenger(req, res);
  }

  if (req.body.addpass == "false" && req.body.isLogin == "false") {
    //makePayment(req, res);

  }
};

var addpassenger = function (req, res) {
  var p1 = req.session.addpass;
  var p = [];
  var data = req.body;

  persistData(req);

  if (p1 != undefined) {
    p = p1;
  }
  var index = p.length + 1;
  p[index - 1] = helpers.createPassengerObj();
  p[index - 1].firstname = data.firstname1
  p[index - 1].lastname = data.lastname1
  p[index - 1].middlename = data.middlename1
  p[index - 1].id_type = data.id_type1
  p[index - 1].id_no = data.id_no1
  p[index - 1].email = data.email1
  p[index - 1].no = index;

  req.session.addpass = p;

  var total = helpers.StringToNum(req.session.total);
  total = total + (total * p.length);
  req.session.totalAmt = total;

  var uidata = req.session;
  console.log(uidata);
  res.render("complete", { menus, uidata });
}

var authenticate = function (req, res) {

  var data = req.body;
  var _url = mc_api + "login/" + data.userid + "/" + data.pwd;
  var usr;
  var obj = helpers.getObjectFromDB(_url);

  obj.then(function (result) {

    if (result != undefined) {
      //prepare user data      
      req.session.loggedIn = true;
      req.session.firstname = result.firstname;
      req.session.lastname = result.lastname;
      req.session.middlename = result.middlename;
      req.session.email = result.email;
      req.session.id_type = result.id_type;
      req.session.id_no = result.id_no;
      var uidata = req.session;
      res.render("complete", { menus, uidata });

    } else {

      var uidata = req.session;
      res.render("complete", { msgTitle: 'Login Failed', msg: 'User authentication failed! Incorrect username or password', menus, uidata });
    }
  });
}

//make the final payment of the trip.
var makePayment = function (req, res) {

  var _url = helpers.processPayment(req.session);
  var obj = helpers.getObjectFromDB(_url);

  obj.then(function (result) {
    console.log(result);
  }, function (err) {
    console.log(err);
  });

}

//post page data
exports.add_customer = function (req, res) {

  if (req.session.email == undefined) {
    res.render("login");
  } else {
    var url_partial = "customer/";
    var auth_url = mc_api + url_partial;
    request.post({ headers: { 'content-type': 'application/x-www-form-urlencoded' }, url: auth_url, form: req.body }, function (error, response, body) {
      req.session.customer = JSON.parse(body);
      var msg = 'Error creating customer, Please contact your administrator';
      var failed = true;
      if (!error) {
        failed = false;
        msg = 'customer successfully created';
        var token = req.session.customer;
        var ui_data = req.session;
        res.render('customer', { menus, ui_data, failed, msg });
      }
    });
  }
};

var persistData = function(req){
  var data = req.body;
  req.session.firstname = data.firstname;
  req.session.lastname = data.lastname;
  req.session.middlename = data.middlename;
  req.session.email = data.email;
  req.session.id_type = data.id_type;
  req.session.id_no = data.id_no;

}

exports.get_customer = function (req, res) {

  if (req.session.email == undefined) {
    res.render("login");
  } else {
    var url_partial = "customer/" + req.params.customer_id;
    var auth_url = mc_api + url_partial;

    request(auth_url, function (error, response, body) {
      var data = JSON.parse(body);
      //prepare display data
      //TODO: load the data needed here.
      res.render(url_partial, { menus, data });
    });
  }

};

exports.update_customer = function (req, res) {

  if (req.session.email == undefined) {
    res.render("login");
  } else {
    var url_partial = "customer/" + req.params.taskId;
    var auth_url = mc_api + url_partial;
    req.body.isActive = false;
    request.put({ headers: { 'content-type': 'application/x-www-form-urlencoded' }, url: auth_url, form: req.body }, function (error, response, body) {
      var data = JSON.parse(body);
      //prepare display data
      res.render(url_partial, data);
    });
  }
};

exports.delete_customer = function (req, res) {
  //TODO: write a process for deleting a task
  if (req.session.email == undefined) {
    res.render("login");
  } else {

  }

};
