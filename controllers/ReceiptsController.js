'use strict';

//load page defaults
exports.list_all_receipts = function(req, res) {

  console.log(req.session.email);
  if (req.session.email == undefined){
    res.render("login");
  }
  else{

    var auth_url = mc_api + "receipt/";
    request(auth_url, function (error, response, body) {

      if (error) return error;
      var data = JSON.parse(body);
      req.session.receipts = data;

      //get invoices data
      var _url1 = mc_api + "invoice/";
      request(_url1, function (error, response, body) {
        var data1 = JSON.parse(body);
        if (error) return error;
        req.session.invoices = data1;

        var ui_data = req.session;
        res.render("receipts", {menus, ui_data});

      });

    });

  }


};

//post page data
exports.add_receipt = function(req, res) {

  if (req.session.email == undefined){
    res.render("login");
  }else{
    var url_partial = "receipt/";
    var auth_url = mc_api + url_partial;
    request.post({headers: {'content-type': 'application/x-www-form-urlencoded'}, url: auth_url, form:req.body }, function(error, response, body){
        req.session.receipt = JSON.parse(body);
        var msg = 'Error creating receipt, Please contact your administrator';
        var failed = true;
        if (!error){
            failed = false;
            msg = 'receipt successfully created';
            var token = req.session.receipt;
            var ui_data = req.session;
            res.render('receipt', {menus, ui_data, failed, msg});
        }
    });
  }
};


exports.get_receipt = function(req, res) {

  if (req.session.email == undefined){
    res.render("login");
  }else{
    var url_partial = "receipt/" + req.params.receipt_id;
    var auth_url = mc_api + url_partial;

    request(auth_url, function (error, response, body) {
      var data = JSON.parse(body);
      //prepare display data
      //TODO: load the data needed here.
      res.render(url_partial, {menus, data});
    });
  }

};

exports.update_receipt = function(req, res) {

  if (req.session.email == undefined){
    res.render("login");
  }else{
    var url_partial = "receipt/" + req.params.taskId;
    var auth_url = mc_api + url_partial;
    req.body.isActive = false;
    request.put({headers: {'content-type': 'application/x-www-form-urlencoded'}, url: auth_url, form:req.body }, function (error, response, body) {
      var data = JSON.parse(body);
      //prepare display data
      res.render(url_partial, data);
    });
  }
};

exports.delete_receipt = function(req, res) {
  //TODO: write a process for deleting a task
  if (req.session.email == undefined){
    res.render("login");
  }else{

  }

};
