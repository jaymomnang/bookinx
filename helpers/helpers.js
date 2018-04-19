var pesapal = require('pesapal')({
    consumerKey: 'v/KEjviYH1Srctruir2gqu0RuC69Zw2p',
    consumerSecret: 'Wu6TOk5ZgpxdY0G2rOG9svt8thg=',
    testing: false,
});



exports.processPayment = function (data) {
    // post a direct order
    
    var postParams = {
        'oauth_callback': urlpath + '/complete/'
    }
    var requestData = {
        'Amount': data.totalAmt,
        'Description': 'bookinx ferry booking ' + Date.now().toString(),
        'Type': 'MERCHANT',
        'Reference': 'BX0000000',
        'PhoneNumber&Email': data.email,
        'Email': data.email,
        'PhoneNumber': data.email,
        'Currency': data.currency,
        'FirstName': data.firstname,
        'LastName': data.lastname
    }
    var url = pesapal.postDirectOrder(postParams, requestData);

    console.log(url);
    return url;
}

exports.getPaymentStatus = function () {
    // get order status
    var postParams = {
        'pesapal_merchant_reference': '000',
        'pesapal_transaction_tracking_id': '000'
    };
    var url = pesapal.queryPaymentStatus(postParams);
    return url;
}

exports.getPaymentStatus = function (_ref) {
    // get order status by ref
    var postParams = {
        'pesapal_merchant_reference': _ref
    };
    var url = pesapal.queryPaymentStatusByMerchantRef(postParams);
    return url;
}


exports.getPaymentDetails = function () {
    // get detailed order status 
    var postParams = {
        'pesapal_merchant_reference': '000',
        'pesapal_transaction_tracking_id': '000'
    };
    var url = pesapal.queryPaymentDetails(postParams);
    return url;
}

//get objects from database
exports.getObjectFromDB = function (_url) {
    return new Promise(function (resolve, reject) {
        request(_url, function (error, response, body) {
            if (error) reject(error);
            resolve(parseData(body));
        });
    });
}

var parseData = function (data) {
    //console.log("--------------start data---------------");
    //console.log(data);
    //console.log("--------------end data---------------");
    return JSON.parse(data);
}

exports.shortDate = function (dateValue) {
    if (dateValue == undefined) {
        return "";
    }
    var d = dateValue.substring(0, 10);
    return d;
}

exports.createPassengerObj = function () {
    return { firstname: "", middlename: "", lastname: "", email: "", id_type: "", id_no: "", no: 0 };
}

exports.generate_oauth_nonce = function () {
    var data = "";
    return data;
}

exports.StringToNum = function (param) {
    return param === "" ? NaN : Number(param)
}

//add 1 hour to the current time frame
exports.addHour = function (value) {
    var endVal = value.substring(3, 5);
    var currentVal = parseInt(value.substring(0, 2)) + 1;
    var rVal = currentVal.toString();
    if (rVal.length == 1) {
        rVal = "0" + rVal + ":" + endVal;
    } else {
        rVal = rVal + ":" + endVal;
    }
    return rVal;
}

//get the travel routes of the vessels
exports.getRoutes = function (data) {
    var _sp = [];
    var i = 0;
    var index = 0;
    var count = 0;
    var limit = data.length;

    for (i == 0; i < limit; i++) {
        for (index == 0; index < limit; index++) {
            if (data[i].port_name != data[index].port_name) {
                _sp[count] = data[i].port_name + ' - ' + data[index].port_name;
                count = count + 1;
            }
        }
        index = 0;
    }
    return _sp;
};