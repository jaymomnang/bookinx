'use strict';
module.exports = function(app) {
  var invoices = require('../controllers/InvoicesController');
  var user = require('../controllers/userController');
  var login = require('../controllers/LoginController');
  var customers = require('../controllers/CustomersController');
  var products = require('../controllers/ProductsController');
  var receipts = require('../controllers/ReceiptsController');
  var reports = require('../controllers/ReportsController');
  var quotes = require('../controllers/QuotesController');
  var dashboard = require('../controllers/DashboardController');

  global.monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
                    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

  global.menus = {
      'tasks_label': 'My Tasks',
      'courses_label':'My Courses',
      'performance_label': 'My Performance',
      'attendance_label': 'Attendance',
      'submissions_label': 'My Submissions',
      'manage_usr_label': 'Manage User',
      'reports_label':'Reports'
  };

  // Login Routes
  app.route('/')
    .get(login.getCurrentUser)
    .post(login.authenticate);

  // Invoices Routes
  app.route('/invoice')
    .get(invoices.load_blank)
    .post(invoices.add_invoice)
    .put(invoices.update_invoice)
    .delete(invoices.delete_invoice);

  app.route('/invoice/:invoice_id')
    .get(invoices.get_invoice);

   app.route('/invoicelist')
    .get(invoices.list_all_invoices)
    .delete(invoices.delete_invoice);

  app.route('/invoicelist/invoice_id')
    .post(invoices.get_invoice);

  // Quotes Routes
  app.route('/quotes')
    .get(quotes.list_all_quotes)
    .post(quotes.add_quote)
    .put(quotes.update_quote)
    .delete(quotes.delete_quote);
  app.route('/quotes/:quote_id')
    .get(quotes.get_quote);

  // Users Routes
  app.route('/manage_usr')
    .get(user.get_users)
    .post(user.add_new_user);

  app.route('/manage_usr/:email')
    .put(user.update_user_prof)
    .delete(user.delete_user);

  // Receipts Routes
  app.route('/receipts')
    .get(receipts.list_all_receipts)
    .post(receipts.add_receipt)
    .put(receipts.update_receipt)
    .delete(receipts.delete_receipt);

  app.route('/receipts/:receipt_id')
    .get(receipts.get_receipt);

  // Customers Routes
  app.route('/customers')
    .get(customers.list_all_customers)
    .post(customers.add_customer)
    .put(customers.update_customer)
    .delete(customers.delete_customer);

  app.route('/customers/:customer_id')
    .get(customers.get_customer);
  
  // Products Routes
  app.route('/products')
    .get(products.list_all_products)
    .post(products.add_product)
    .put(products.update_product)
    .delete(products.delete_product);

  app.route('/products/:product_id')
    .get(products.get_product);
  
    // Report Routes
  app.route('/reports')
    .get(reports.print_attendance);

     // Dashboard Routes
  app.route('/dashboard')
  .get(dashboard.loadDashboard);

  // Page Not Routes
  //app.route('/404')
    //.render("404", {'predef': arr});

};
