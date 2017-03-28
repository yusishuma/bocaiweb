$.ajax({
    url:"http://www.vrserver.applinzi.com/aixianfeng/apihome.php",
    type:"GET",
    dataType:"json",
    success:function (res) {
        var data1 = res.data.slide;
        for (var i = 0; i < data1.length; i++) {
            var pp = data1[i].activity.img;
            var div  = $('<div class="swiper-slide" />');
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

