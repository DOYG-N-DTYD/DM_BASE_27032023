$("#img_balka").click(function () {
    var url = "http://drewmetpoland.com/pages/EN/page1.html";
    $(location).attr('href',url);
});
$("#img_brusok").click(function () {
    var url = "http://drewmetpoland.com/pages/EN/page1.html";
    $(location).attr('href',url);
});
$("#img_rdoska").click(function () {
    var url = "http://drewmetpoland.com/pages/EN/page1.html";
    $(location).attr('href',url);
});
$("#img_drova").click(function () {
    var url = "http://drewmetpoland.com/pages/EN/page4.html";
    $(location).attr('href',url);
});
$("#img_gorbil").click(function () {
    var url = "http://drewmetpoland.com/pages/EN/page5.html";
    $(location).attr('href',url);
});
$("#img_opilki").click(function () {
    var url = "http://drewmetpoland.com/pages/EN/page5.html";
    $(location).attr('href',url);
});
$("#img_palet").click(function () {
    var url = "http://drewmetpoland.com/pages/EN/page3.html";
    $(location).attr('href',url);
});
$("#img_nerdoska").click(function () {
    var url = "http://drewmetpoland.com/pages/EN/page2.html";
    $(location).attr('href',url);
});
                                       
//automat gallery

    setInterval(function(){
        $("#carouselLeft").click();
    }, 6000);
  
//change language
$(document).on('click','.switchEnglish',function(){
    var url = "http://drewmetpoland.com/EN/index_en.html";
    $(location).attr('href',url);
});
$(document).on('click','.switchRussian',function(){
    var url = "http://drewmetpoland.com/EN/index_ru.html";
    $(location).attr('href',url); 
});
