//获取当前地址
if (navigator.geolocation) {				
  navigator.geolocation.getCurrentPosition(showPosition);
 } else {
  alert('Geolocation is not supported in your browser');
 }

 function showPosition(position){
 // http://v.juhe.cn/weather/geo?format=2&key=94b2524c92f2d45191576fd17983f214&lon=116.39277&lat=39.933748
  var key = "94b2524c92f2d45191576fd17983f214";
  var api = "http://v.juhe.cn/weather/geo?format=2&key="+key+"&lon="+position.coords.longitude
  +"&lat="+position.coords.latitude;
  $.ajaxSetup({
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    }
  });
    $.ajax({ 
    type:'GET',
    url: api,
    dataType:"jsonp",
    error:function(XMLHttpRequest, textStatus, errorThrown){
    alert("异步请求出错...");
    },
    success:function(data){
      $("#city-name").html(data.result.today.city);
      $("#date").html(data.result.today.date_y+"  "+data.result.today.week);
      $(".cent").html(data.result.sk.temp+"°C");
      $(".yq").html(data.result.today.weather);
      $("#tem").html("温度: "+data.result.today.temperature);
      $("#wet").html("湿度: "+data.result.sk.humidity);
      $("#windy-dir").html("风向: "+data.result.sk.wind_direction);
      $("#windy").html("风力: "+data.result.sk.wind_strength);
      changeImage(data.result.today.weather_id.fa);
    }
  });

 }

function changeImage(yq){
  var yq_images = $(".right");
  if(yq == 00){
    //晴天
    yq_images.html("<i class='wi wi-day-sunny' style='font-size: 100px'></i>");   
  }else if(yq == 01){
    //多云
    yq_images.html("<i class='wi wi-day-cloudy' style='font-size: 100px'></i>"); 
  }else if(yq == 02){
    // 阴天
    yq_images.html("<i class='wi wi-cloud' style='font-size: 100px'></i>"); 
  }else if(yq == 03){
    // 雨
    yq_images.html("<i class='wi wi-day-rain' style='font-size: 100px'></i>"); 
  }
}
changeImage();

