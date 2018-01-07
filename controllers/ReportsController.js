'use strict';

exports.print_attendance = function(req, res) {
  if (req.session.email == undefined){
    res.render("login");
  }else{
    var arr = req.session;
    res.render("reports", {menus, arr, monthNames});
  }
};
