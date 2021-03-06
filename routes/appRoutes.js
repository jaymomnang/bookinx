'use strict';
module.exports = function (app) {
    var invoices = require('../controllers/InvoicesController');
    var user = require('../controllers/userController');
    var login = require('../controllers/LoginController');
    var customers = require('../controllers/CustomersController');
    var products = require('../controllers/ProductsController');
    var flights = require('../controllers/flightsController');
    var payments = require('../controllers/PaymentsController');
    var schedules = require('../controllers/schedulesController');
    var dashboard = require('../controllers/DashboardController');

    global.monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];

    global.menus = {
        'tasks_label': 'My Tasks',
        'courses_label': 'My Courses',
        'performance_label': 'My Performance',
        'attendance_label': 'Attendance',
        'submissions_label': 'My Submissions',
        'manage_usr_label': 'Manage User',
        'payments_label': 'payments'
    };

    // Login Routes
    app.route('/')
        .get(dashboard.loadDashboard)
        .post(dashboard.getSchedules);

    // Trips Routes
    app.route('/trips')
        .get(dashboard.getTrips)
        .post(dashboard.getLoadSeats);

    // seat booking Routes
    app.route('/book')
        .get(dashboard.getSeats)
        .post(dashboard.completeBooking);

    //passenger details routes
    app.route('/complete')
        .get(customers.getCustomerInfo)
        .post(customers.finishBooking);

    app.route('/customers/:customer_id')
        .get(customers.get_customer);

    // schedules Routes
    app.route('/schedules')
        .get(schedules.list_all_schedules)
        .post(schedules.add_schedule)
        .put(schedules.update_schedule)
        .delete(schedules.delete_schedule);

    app.route('/schedules/:schedule_id')
        .get(schedules.get_schedule);

    // Users Routes
    app.route('/manage_usr')
        .get(user.get_users)
        .post(user.add_new_user);

    app.route('/manage_usr/:email')
        .put(user.update_user_prof)
        .delete(user.delete_user);

    // flights Routes
    app.route('/flights')
        .get(flights.list_all_flights)
        .post(flights.add_flight)
        .put(flights.update_flight)
        .delete(flights.delete_flight);

    app.route('/flights/:flight_id')
        .get(flights.get_flight);

    // Products Routes
    app.route('/products')
        .get(products.list_all_products)
        .post(products.add_product)
        .put(products.update_product)
        .delete(products.delete_product);

    app.route('/products/:product_id')
        .get(products.get_product);

    // payment Routes
    app.route('/payments')
        .get(payments.print_attendance);

    // Dashboard Routes
    app.route('/home')
        .get(dashboard.loadDashboard)
        .post(dashboard.getSchedules);

    // Page Not Routes
    //app.route('/404')
    //.render("404", {'predef': arr});

};