// warningForm.js 

$(document).ready(function () {
    var app1 = {
        initialize: function () {
            this.setUpListeners();
        },

        setUpListeners: function() {
            $('#btn_to_main').on('click', function () {
                window.location.href = '/';
            });
            $('#btn_to_register').on('click', function () {
                $('#mess_new_nick').modal('hide');
                $('#register').modal('show');
                $('#btnRegister').removeClass('disabled');
            });
            console.log('init check');
        },

        submitForm: function(e) {
            e.preventDefault();

            var form = $(this),
                submitBtn = form.find('button[type="submit"]');
            //console.log(JSON.stringify(submitBtn));

            if(submitBtn.val() === 'cancel') {
                window.location.href = '/';
            } else if ( submitBtn.val() ===  'nextAttempt') {
                $('#register').modal('show');
            }

            $('#mess_new_nick').modal('hide');
        }
    };

    app1.initialize();
});