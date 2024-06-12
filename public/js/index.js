import * as device from "./device.js"
device.sayHello();
hostname = bridge.hostname;
$( document ).ready(function() {

    $('.refresh').on('click', function(){
        location.reload();
    });

    $('.computerName').html(hostname);

    $('#copyComputer').on('click', function(){
        bridge.copyText(hostname);
        $('#copyComputer').html('<i class="bi bi-check text-success xsmall"></i>');
        window.setTimeout(function() {
          $('#copyComputer').html('<i class="bi bi-clipboard"></i>')
        }, 2000); 
      });
})