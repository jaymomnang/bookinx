'use strict';
exports.loadDashboard = function (req, res) {
    //TODO: Get dashboard data
    var _url = mc_api + "ports/";
    var p = helpers.getObjectFromDB(_url);
    p.then(function (result) {
        var _ports = result;
        var pn = [];
        var i = 0;
        for(i == 0; i < _ports.length; i++){
            pn[i] = _ports[i].port_name;
        }
        var _p = helpers.getRoutes(_ports);
        var uidata = req.session;
        res.render("index", { menus, uidata, _p, _ports, pn });
    },function (err) {
        console.log(err);
    })

};

exports.getSchedules = function (req, res) {

    if (req.body.resident_ == 'on') {
        req.session.currency = "TSh";
        req.session.currencySymbol = "TSh";
    } else {
        req.session.currency = "USD";
        req.session.currencySymbol = "$";
    }

    req.session.route = req.body._route;
    req.session.from_ = req.body._route1;
    req.session.to_ = req.body._route2;

    req.session.departure_date = new Date(req.body.departure_date);
    req.session.return = req.body.return_;
    req.session.resident = req.body.resident_;
    req.session.return_date = new Date(req.body.return_date);

    console.log(req.session);
    return res.redirect("/trips");

};

//queries database for available trips
exports.getTrips = function (req, res) {
    //TODO: load all flight/travel schedules.
    if (req.session.from_ == undefined && req.session.to_ == undefined) {
        return res.redirect("/");
    }

    var data = req.session;
    data.departure_port = data.from_;
    data.destination = data.to_;

    var trips = [];

    var b2 = [];
    b2.destination = data.from_;
    b2.departure_port = data.to_;
    b2.departure_date = data.return_date;

    var _url = mc_api + "schedule/" + data.departure_port + "/" + data.destination + "/" + data.departure_date;
    var firstleg = helpers.getObjectFromDB(_url);

    firstleg.then(function (result) {

        for (var i = 0; i < result.length; i++) {
            if (result[i].schedule_id != 'undefined') {
                result[i].arrivalTime = helpers.addHour(result[i].departure_time);
            }
        }
        trips.push(result);

        if (data.return == "true") {

            _url = mc_api + "schedule/" + b2.departure_port + "/" + b2.destination + "/" + b2.departure_date;
            var secondleg = helpers.getObjectFromDB(_url);

            secondleg.then(function (result_) {
                for (var i = 0; i < result_.length; i++) {
                    if (result_[i].schedule_id != 'undefined') {
                        result_[i].arrivalTime = helpers.addHour(result_[i].departure_time);
                    }
                }

                trips.push(result_);
                req.session.trips = trips
                var uidata = req.session;

                res.render("trips", { menus, uidata });
            }, function (err) {
                console.log(err);
            });
        }else{
            req.session.trips = trips
            var uidata = req.session;
            res.render("trips", { menus, uidata });
        }        

    }, function (err) {
        console.log(err);
    });
}

exports.getLoadSeats = function (req, res) {
    req.session.firstleg = req.body.firstleg;
    req.session.secondleg = req.body.secondleg;
    return res.redirect("/book");
};

//book selected trips
exports.getSeats = function (req, res) {

    if (req.session.firstleg == undefined && req.session.firstleg == undefined) {
        return res.redirect("/");
    }

    var firstleg = req.session.firstleg;
    var secondleg = req.session.secondleg;
    var trips = [];
    var prices, trip1, trip2;

    var _url = mc_api + "price/";
    var obj = helpers.getObjectFromDB(_url);
    obj.then(function (result) {
        prices = result;
    }, function (err) {
        console.log(err);
    }).then(function () {
        _url = mc_api + "schedule/" + firstleg;
        var obj1 = helpers.getObjectFromDB(_url);
        obj1.then(function (result) {
            trip1 = result;
        }, function (err) {
            console.log(err);
        }).then(function () {
            _url = mc_api + "schedule/" + secondleg;
            var obj2 = helpers.getObjectFromDB(_url);
            obj2.then(function (result) {
                trip2 = result;

                trips[0] = trip1;
                trips[1] = trip2;
                req.session.trips = trips;

                var uidata = req.session;
                res.render("book", { menus, uidata, trips, prices });

            }, function (err) {
                console.log(err);
            })
        })
    })
}

exports.completeBooking = function (req, res) {

    var toVal, fromVal;
    if (req.body._toPrice != undefined) {
        toVal = req.body._toPrice.split("-");
        req.session.toSeat = toVal[0];
        req.session.toPrice = toVal[1];
        req.session.total = toVal[1];
        req.session.totalAmt = toVal[1];
    }

    if (req.body._fromPrice != undefined) {
        fromVal = req.body._fromPrice.split("-");
        req.session.fromPrice = fromVal[1];
        req.session.fromSeat = fromVal[0];

        req.session.total = toVal[1] + fromVal[1];
        req.session.totalAmt = toVal[1] + fromVal[1];
    }

    return res.redirect("/complete");
};
