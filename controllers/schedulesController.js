'use strict';
//load page defaults
exports.list_all_schedules = function(req, res) {

    var _url = mc_api + "schedule";
    request(_url, function(error, response, body) {

        if (error) return error;
        var schedules = JSON.parse(body);
        var _cl;
        var _vs;
        var limit;

        _url = mc_api + "Vessel";
        request(_url, function(err, resp, b) {
            if (err) return err;
            _vs = JSON.parse(b);

            _url = mc_api + "ports"
            request(_url, function(err, resp, p) {
                if (err) return err;
                var _ports = JSON.parse(p);

                _url = mc_api + "price"
                request(_url, function(err, resp, p) {
                    if (err) return err;
                    var _prices = JSON.parse(p);
                    var ui_data = req.session;

                    res.render("schedules", { menus, ui_data, schedules, _vs, _ports, _prices });

                })

            })
        })

    });

};

//post page data
exports.add_schedule = function(req, res) {

    getPrices(req.body);

    var url_partial = "schedule";
    var auth_url = mc_api + url_partial;
    request.post({ headers: { 'content-type': 'application/x-www-form-urlencoded' }, url: auth_url, form: req.body }, function(error, response, body) {
        var schedules = JSON.parse(body);

        var msg = 'Error creating schedule, Please contact your administrator';
        var failed = true;
        if (!error) {
            failed = false;
            var _cl;
            var _vs;

            var _url2 = mc_api + "class";
            request(_url2, function(err, resp, b) {
                if (err) return err;
                _cl = JSON.parse(b);

                var _url3 = mc_api + "Vessel";
                request(_url3, function(err, resp, b) {
                    if (err) return err;
                    _vs = JSON.parse(b);

                    var ui_data = req.session;
                    res.render("schedules", { menus, ui_data, schedules, _vs, _cl });
                })
            })
        }
    });

};


exports.get_schedule = function(req, res) {

    var url_partial = "schedule/" + req.params.schedule_id;
    var auth_url = mc_api + url_partial;

    request(auth_url, function(error, response, body) {
        var data = JSON.parse(body);
        //prepare display data
        //TODO: load the data needed here.
        res.render(url_partial, { menus, data });
    });


};

exports.update_schedule = function(req, res) {

    if (req.session.email == undefined) {
        res.render("login");
    } else {
        var url_partial = "schedule/" + req.params.taskId;
        var auth_url = mc_api + url_partial;
        req.body.isActive = false;
        request.put({ headers: { 'content-type': 'application/x-www-form-urlencoded' }, url: auth_url, form: req.body }, function(error, response, body) {
            var data = JSON.parse(body);
            //prepare display data
            res.render(url_partial, data);
        });
    }
};

exports.delete_schedule = function(req, res) {
    //TODO: write a process for deleting a task
    if (req.session.email == undefined) {
        res.render("login");
    } else {

    }

};

function getPrices(data) {
    var _sp = [];
    var i;
    var limit = data.limit;
    console.log(data);

    for (i == 0; i < limit; i++) {
        //_sp[i] = data.
    }
};