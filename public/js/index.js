import * as device from "./device.js"
let hostname = bridge.hostname;
let info = bridge.getInfo;
let sysInfo = JSON.parse(localStorage.getItem("sysInfo"));
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

    $('.model').html(`${sysInfo.system.manufacturer}&nbsp;${sysInfo.system.model}`);
    $('.serialNumber').html(sysInfo.system.serial);
    $(".memory").html(device.formatBytes(sysInfo.mem.total));
    $('.cpu').html(`${sysInfo.cpu.manufacturer}&nbsp;${sysInfo.cpu.brand}&nbsp;${sysInfo.cpu.speed}GHZ`);
    $('.osBuild').html(sysInfo.osInfo.distro);
    console.log(device.formatBytes(sysInfo.diskLayout[0].size));
})