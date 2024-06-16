import * as device from "./device.js"
let hostname = bridge.hostname;
let info = bridge.getInfo;
let sysInfo = JSON.parse(localStorage.getItem("sysInfo"));
let driveInfo = sysInfo.fsSize[0];
let driveUsage = device.percentage(driveInfo.used, driveInfo.size);
let networkStatus = sysInfo.networkStats[0];
$( document ).ready(function() {

  $('.compyItem').on('click', function(){
    let text = $(this).data('copy');
    // bridge.copyText(text);
    console.log(text);
  })

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

  $('.model').html(`Model: ${sysInfo.system.manufacturer}&nbsp;${sysInfo.system.model}&nbsp;<a href="#" class="copyItem" data-copy="${sysInfo.system.model}"><i class="bi bi-clipboard xsmall"></i></a>`);
  $('.serialNumber').html(`Serial Number: ${sysInfo.system.serial}&nbsp;<a href="#" id="copySN"><i class="bi bi-clipboard xsmall"></i></a`);
  $(".memory").html(device.formatBytes(sysInfo.mem.total));
  $('.cpu').html(`${sysInfo.cpu.manufacturer}&nbsp;${sysInfo.cpu.brand}&nbsp;${sysInfo.cpu.speed}GHZ`);

  if(sysInfo.osInfoplatform === "Windows"){
    $('.osImg').html('<i class="bi bi-windows"></i>');
  }
  $('.osBuild').html(sysInfo.osInfo.distro);

  if(sysInfo.battery.hasBattery === true){

    let chargingStatus = sysInfo.battery.isCharging;
    let chargeCapacity = sysInfo.battery.max.capacity;
    let currentCharge = sysInfo.battery.currentCapacity;
    let acConnected = sysInfo.battery.acConnected;
    let chargeStatus = sysInfo.battery.percent;

    $('.powerStatus').html(`<div class="progress"><div class="progress-bar" role="progressbar" style="width: ${chargeStatus}%;">${chargeStatus}%</div></div>`);

    if(chargingStatus === true){
      $('.systemImg').html('<i class="bi bi-laptop" style="font-size: 5em;"></i>')
      $('.powerImg').html('<i class="bi bi-battery-charging"></i>');
      $('.powerName').html('Charging');
    }else if(chargeStatus === false && acConnected === true){
      $('.powerImg').html('<i class="bi bi-battery-full"></i>');
      $('.powerName').html('Plugged in');
    }else{
      $('.powerImg').html('<i class="bi bi-battery-half"></i>');
      $('.powerName').html('In Use');
    }
  }else{
    $('.systemImg').html('<i class="bi bi-pc" style="font-size: 5em;"></i>')
    $('.powerImg').html('<i class="bi bi-plug-fill"></i>');
    $('.powerName').html('Plugged In');
    $('.powerStatus').html('&nbsp;');
  }

  if(driveUsage <= 15){
    $('.diskInfo').html(`<div class="progress"><div class="progress-bar bg-warning" role="progressbar" style="width: ${driveUsage}%;">${driveUsage}%</div></div>`);
  }else if(driveUsage <= 10){  
    $('.diskInfo').html(`<div class="progress"><div class="progress-bar bg-danger" role="progressbar" style="width: ${driveUsage}%;">${driveUsage}%</div></div>`);
  }else{
      $('.diskInfo').html(`<div class="progress"><div class="progress-bar" role="progressbar" style="width: ${driveUsage}%;">${driveUsage}%</div></div>`);
  }

  if(networkStatus.operstate === "up"){

  }
  console.log(device.formatBytes(sysInfo.diskLayout[0].size));
})