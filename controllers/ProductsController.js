'use strict';

//load page defaults
exports.list_all_products = function(req, res) {

  console.log(req.session.email);
  if (req.session.email == undefined){
    res.render("login");
  }
  else{

    var auth_url = mc_api + "product/";
    request(auth_url, function (error, response, body) {

      if (error) return error;
      var data = JSON.parse(body);
      req.session.products = data;

      var ui_data = req.session;
      res.render("products", {menus, ui_data});

    });
  }
};

//post page data
exports.add_product = function(req, res) {

  if (req.session.email == undefined){
    res.render("login");
  }else{
    var url_partial = "product/";
    var auth_url = mc_api + url_partial;
    request.post({headers: {'content-type': 'application/x-www-form-urlencoded'}, url: auth_url, form:req.body }, function(error, response, body){
        req.session.product = JSON.parse(body);
        var msg = 'Error creating product, Please contact your administrator';
        var failed = true;
        if (!error){
            failed = false;
            msg = 'product successfully created';
            var ui_data = req.session;
            res.render('product', {menus, ui_data, failed, msg});
        }
    });
  }
};


exports.get_product = function(req, res) {

  if (req.session.email == undefined){
    res.render("login");
  }else{
    var url_partial = "product/" + req.params.product_id;
    var auth_url = mc_api + url_partial;

    request(auth_url, function (error, response, body) {
      var data = JSON.parse(body);
      //prepare display data
      //TODO: load the data needed here.
      res.render(url_partial, {menus, data});
    });
  }

};

exports.update_product = function(req, res) {

  if (req.session.email == undefined){
    res.render("login");
  }else{
    var url_partial = "product/" + req.params.taskId;
    var auth_url = mc_api + url_partial;
    req.body.isActive = false;
    request.put({headers: {'content-type': 'application/x-www-form-urlencoded'}, url: auth_url, form:req.body }, function (error, response, body) {
      var data = JSON.parse(body);
      //prepare display data
      res.render(url_partial, data);
    });
  }
};

exports.delete_product = function(req, res) {
  //TODO: write a process for deleting a task
  if (req.session.email == undefined){
    res.render("login");
  }else{

  }

};
