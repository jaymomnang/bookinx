'use strict';

//load page defaults
exports.list_all_quotes = function(req, res) {

  console.log(req.session.email);
  if (req.session.email == undefined){
    res.render("login");
  }
  else{

    var auth_url = mc_api + "quote/";
    request(auth_url, function (error, response, body) {

      if (error) return error;
      var data = JSON.parse(body);
      req.session.quotes = data;

      var ui_data = req.session;
      res.render("quotes", {menus, ui_data});

    });
  }
};

//post page data
exports.add_quote = function(req, res) {

  if (req.session.email == undefined){
    res.render("login");
  }else{
    var url_partial = "quote/";
    var auth_url = mc_api + url_partial;
    request.post({headers: {'content-type': 'application/x-www-form-urlencoded'}, url: auth_url, form:req.body }, function(error, response, body){
        req.session.quote = JSON.parse(body);
        var msg = 'Error creating quote, Please contact your administrator';
        var failed = true;
        if (!error){
            failed = false;
            msg = 'quote successfully created';
            var ui_data = req.session;
            res.render('quote', {menus, ui_data, failed, msg});
        }
    });
  }
};


exports.get_quote = function(req, res) {

  if (req.session.email == undefined){
    res.render("login");
  }else{
    var url_partial = "quote/" + req.params.quote_id;
    var auth_url = mc_api + url_partial;

    request(auth_url, function (error, response, body) {
      var data = JSON.parse(body);
      //prepare display data
      //TODO: load the data needed here.
      res.render(url_partial, {menus, data});
    });
  }

};

exports.update_quote = function(req, res) {

  if (req.session.email == undefined){
    res.render("login");
  }else{
    var url_partial = "quote/" + req.params.taskId;
    var auth_url = mc_api + url_partial;
    req.body.isActive = false;
    request.put({headers: {'content-type': 'application/x-www-form-urlencoded'}, url: auth_url, form:req.body }, function (error, response, body) {
      var data = JSON.parse(body);
      //prepare display data
      res.render(url_partial, data);
    });
  }
};

exports.delete_quote = function(req, res) {
  //TODO: write a process for deleting a task
  if (req.session.email == undefined){
    res.render("login");
  }else{

  }

};
