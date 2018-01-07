'use strict';

//load all invoices
exports.list_all_invoices = function (req, res) {

  console.log(req.session.email);


  var auth_url = mc_api + "invoice/";
  request(auth_url, function (error, response, body) {

    if (error) return error;
    var data = JSON.parse(body);
    req.session.invoices = data;

    var ui_data = req.session;
    res.render("tables", { menus, ui_data });

  });

};

//load blank invoice
exports.load_blank = function (req, res) {

  console.log(req.session);
  //if (req.session.email == undefined){
  //  res.render("login");
  //}
  //else{

  var ui_data = req.session;
  var hdr_label = "New Invoice";
  res.render("invoice", { menus, ui_data, hdr_label });
  //}
};


//post page data
exports.add_invoice = function (req, res) {

  if (req.session.email == undefined) {
    res.render("login");
  } else {
    var url_partial = "invoice/";
    var auth_url = mc_api + url_partial;
    request.post({ headers: { 'content-type': 'application/x-www-form-urlencoded' }, url: auth_url, form: req.body }, function (error, response, body) {
      req.session.invoice = JSON.parse(body);
      var msg = 'Error creating invoice, Please contact your administrator';
      var failed = true;
      if (!error) {
        failed = false;
        msg = 'invoice successfully created';
        var ui_data = req.session;
        res.render('invoice', { menus, ui_data, failed, msg });
      }
    });
  }
};


exports.get_invoice = function (req, res) {

  if (req.session.email == undefined) {
    res.render("login");
  } else {
    var url_partial = "invoice/" + req.params.invoice_id;
    var auth_url = mc_api + url_partial;

    request(auth_url, function (error, response, body) {
      var data = JSON.parse(body);
      //prepare display data
      //TODO: load the data needed here.
      var hdr_label = "Invoice Details";
      res.render(url_partial, { menus, data, hdr_label });
    });
  }

};

exports.update_invoice = function (req, res) {

  if (req.session.email == undefined) {
    res.render("login");
  } else {
    var url_partial = "invoice/" + req.params.taskId;
    var auth_url = mc_api + url_partial;
    req.body.isActive = false;
    request.put({ headers: { 'content-type': 'application/x-www-form-urlencoded' }, url: auth_url, form: req.body }, function (error, response, body) {
      var data = JSON.parse(body);
      //prepare display data
      res.render(url_partial, data);
    });
  }
};

exports.delete_invoice = function (req, res) {
  //TODO: write a process for deleting a task
  if (req.session.email == undefined) {
    res.render("login");
  } else {

  }

};
