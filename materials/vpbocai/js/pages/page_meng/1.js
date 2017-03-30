$.ajax({
    url:"http://www.vrserver.applinzi.com/aixianfeng/apihome.php",
    type:"GET",
    dataType:"json",
    success:function (res) {
        var data1 = res.data.slide;
        for (var i = 0; i < data1.length; i++) {
            var pp = data1[i].activity.img;
            var div  = $('<div class="swiper-slide"/>');
            var img = $('<img/>').attr({src:pp}).appendTo(div).css({"width":"740px","height":"320px"});
            div.appendTo($('.swiper-wrapper'));
        }
        var mySwiper = new Swiper('.swiper-container',{
            pagination : '.swiper-pagination',
            autoplay: 3000,//可选选项，自动滑动
            loop:true,
            autoplayDisableOnInteraction:false,
            paginationClickable: true
        })
        var menu1 = res.data.menu;
        for (var j = 0; j < menu1.length; j++) {
            var name = menu1[j].activity.name;
            var img = menu1[j].activity.img;
            var dl = $('<dl/>').append($('<dt/>').append($('<img/>').attr({src:img})));
            var dd = $('<dd/>').html(name).appendTo(dl);
            var menu = $(".menu").append(dl);
        }
    }
})

        // 返回顶部按钮
        $(function(){
         // 当滚动条滚动大于200时出现，未大于，消失
         $(window).scroll(function(){
           if($(document).scrollTop()<300){
            
             $(".gotop").stop().animate({
                
                 opacity: 0
                  
             },500)
           }
           else{
             $(".gotop").show().stop().animate({
                  
                 opacity: 1
                  
             },500)
           }
        })
       // 返回顶部
       $(".gotop").on("click",function(){
          $("html body").animate({
             scrollTop:0
          },1000)
       })
    })

