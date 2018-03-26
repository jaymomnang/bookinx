(function($) {    
    $(function() {

        $('.button-collapse').sideNav();
        $('select').material_select();
        $('.modal').modal();
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year,
            today: 'Today',
            clear: 'Clear',
            close: 'Ok',
            closeOnSelect: true // Close upon selecting a date,
        });

        $('.timepicker').pickatime({
            default: 'now', // Set default time: 'now', '1:30AM', '16:30'
            fromnow: 0, // set default time to * milliseconds from now (using with default = 'now')
            twelvehour: false, // Use AM/PM or 24-hour format
            donetext: 'OK', // text for done-button
            cleartext: 'Clear', // text for clear-button
            canceltext: 'Cancel', // Text for cancel-button
            autoclose: false, // automatic close timepicker
            ampmclickable: true, // make AM PM clickable
            aftershow: function() {} //Function for after opening timepicker
        });
        $('.carousel.carousel-slider').carousel({fullWidth: true});
        $('.tabs').tabs();

    }); // end of document ready    
})(jQuery); // end of jQuery name space

var numberSpinner = (function() {
    $('.number-spinner>.ns-btn>a').click(function() {
      var btn = $(this),
        oldValue = btn.closest('.number-spinner').find('input').val().trim(),
        newVal = 0;
  
      if (btn.attr('data-dir') === 'up') {
        newVal = parseInt(oldValue) + 1;
      } else {
        if (oldValue > 1) {
          newVal = parseInt(oldValue) - 1;
        } else {
          newVal = 1;
        }
      }
      btn.closest('.number-spinner').find('input').val(newVal);
    });
    $('.number-spinner>input').keypress(function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    });
  })();