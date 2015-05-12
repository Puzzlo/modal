// registrForm.js 

$(document).ready(function () {
   var app = {
       initialize: function() {
           this.setUpListeners();
           console.log('iniatialize');
       },

       setUpListeners: function() {
           $('#register').on('submit', app.submitForm);
           $('#register').on('keyup', 'input', app.removeError);
       },

       submitForm: function(e) {
           e.preventDefault();

           var form = $(this),
               submitBtn = form.find('button[type="submit"]');

           if( app.validateForm(form) === false ) return false;
           submitBtn.attr('disabled', 'disabled');
           console.log('go in ajax');
           $.ajax({
                url: "/registration",
                method: "POST",
                dataType: "json",
                data: {name: form.find('#inputRegister').val(), pass: form.find('#inputPasswordReg').val()},
                statusCode: {
                    200: function (message) {
                        //window.location.href = '/users/:' + id;
                        //console.log('registration success');
                        //window.location.href = '/#mess_new_nick';
                        //alert(message.message);
                        $('#mess_new_nick').modal('show');
                    },
                    403: function (jqXHR) {
                        var error = JSON.parse(jqXHR.responseText);
                        $('.error', form).html(error.message);
                        console.log('user is not available');
                    },
                    500: function (message) {
                        //window.location.href = '/users/:' + id;
                        console.log(JSON.stringify(message));
                        alert(message.message);
                    }
                }
               // success: function(data){
               //     console.log(data);
               //     if(data === '403') {
               //         console.log('user is not available');
               //     } else {
               //         console.log('user added');
               //     }
               //}
           });
           $("#register").modal('hide');
       },

       validateForm: function(form) {
           var valid = true,
               login = form.find('#inputRegister'),
               pass1 = form.find('#inputPasswordReg'),
               pass2 = form.find('#inputPasswordRegAgain'),
               loginValue = login.val(),
               pass1Value = pass1.val(),
               pass2Value = pass2.val(),
               formReg = login.parents('.form-group'),
               formPass1 = pass1.parents('.form-group'),
               formPass2 = pass2.parents('.form-group');
           if ( loginValue.length < 1 ) {
                valid = false;
               formReg.addClass('has-error').removeClass('has-success');
               login.tooltip({
                   trigger: 'manual',
                   placement: 'right',
                   title: 'min 5 letter'
               }).tooltip('show');
           } else {
               formReg.addClass('has-success').removeClass('has-error');
           }
           if ( pass1Value.length === 0 ) {
               formPass1.addClass('has-error').removeClass('has-success');
               valid = false;
               pass1.tooltip({
                   trigger: 'manual',
                   placement: 'right',
                   title: 'password minimum 1 letter'
               }).tooltip('show');
               return false;
           } else {
               formPass1.addClass('has-success').removeClass('has-error');
           }
           if ( pass1Value !== pass2Value ) {
               valid = false;
               formPass1.addClass('has-error').removeClass('has-success');
               formPass2.addClass('has-error').removeClass('has-success');
               pass1.tooltip({
                   trigger: 'manual',
                   placement: 'right',
                   title: 'passwords must match'
               }).tooltip('show');
               pass2.tooltip({
                   trigger: 'manual',
                   placement: 'right',
                   title: 'passwords must match'
               }).tooltip('show');
           } else {
               formPass1.addClass('has-success').removeClass('has-error');
               formPass2.addClass('has-success').removeClass('has-error');
           }


           return valid;
       },

       removeError: function() {
           $(this).tooltip('destroy').parents('form-group').removeClass('has-error');
       }
   };

    app.initialize();
});