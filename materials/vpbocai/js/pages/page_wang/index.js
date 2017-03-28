/**
 * 首页数据模块
 */
;
(function($){
    'use strict';
    // 获取赛事预报
    getAdvance();
    
    // 轮播图
    getBanner();
    
    // 比赛
    getAdvanceDetail();

    // 获取公告
    setInterval(getMarquee, 1000*60*10);

    function getMarquee(){
        // 获取公告 
        // test
        // 
    }

    // 比赛
    function getAdvanceDetail(){
        $.ajax({
            url: siteUrl+"/test/advance_detail.json",
            type: "GET",
            dataType: "json",
            data:{},
            success: function(json){
                if(json.code !=0){
                    $('.guess-list-box').html('<span class="nothing-data">'+json.msg+'</span>');
                    return false;
                }
                var list = json.data;

                $('.guess-list-box').html('');
                for(var i in list){
                    var thisData = list[i];
                    var guessClass = '';
                    if(thisData.is_guessing){
                        guessClass = 'on'
                    }
                    if(thisData.play_status == 'before'){
                        var play = thisData.type;
                    }else{
                        var play = thisData.score;
                    }
                    var guessList = '<div class="guess-list-div">\
                        <div class="guess-time">\
                            <div class="guess-time-title">\
                                <div></div>\
                                <h5>'+thisData.title+'</h5>\
                            </div>\
                            <p>'+thisData.time+'</p>\
                        </div>\
                        <div class="guess-team1">\
                            <p>'+thisData.team_1+'</p>\
                            <img src="'+thisData.team_1_logo+'">\
                        </div>\
                        <div class="guess-score">\
                            <p>'+play+'</p>\
                            <a href="'+thisData.guessing_url+'" class="'+guessClass+'">比赛竞猜</a>\
                        </div>\
                        <div class="guess-team2">\
                            <img src="'+thisData.team_2_logo+'">\
                            <p>'+thisData.team_2+'</p>\
                        </div>\
                    </div>';

                    $('.guess-list-box').append(guessList);
                }
            }
        });
    }

    // 轮播图 
    function getBanner() {
        $.ajax({
            url : siteUrl+"/test/bananer.json",
            type : "GET",
            dataType : "json",
            data:{},
            success : function(json){
                if(json.code != 0) {
                    $('.swiper-container').html('<span class="nothing-data">'+json.msg+'</span>')
                    return false;
                }

                for(var i in json.data){
                    var thisData = json.data[i];
                    var html = '<div class="swiper-slide"><a href="'+thisData.url+'"><img src="'+thisData.image+'"/></a></div>';
                    $('.swiper-wrapper').append(html);
                }

                  var mySwiper = new Swiper ('.swiper-container', {
                    autoplay : 20000,
                    direction: 'horizontal', // 水平滑动
                    loop: true,

                    // 如果需要分页器
                    pagination: '.swiper-pagination',
                    
                    // 如果需要前进后退按钮
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                  });
            }
        });
    }

    // 获取赛事预报
    function getAdvance(){
        $.ajax({
            url : "/test/advance.json",
            type : "GET",
            dataType : "json",
            data:{},
            success : function(json){
                if (json.code != 0) {
                    $('#allGameAdvance').html('<span class="nothing-data">当前没有赛事预报</span>');
                    return false;
                }

                var list = json.data;
                $("#allGameAdvance").html('<ul id="guess-match-list"></ul>');
                var htmlUl = $("#allGameAdvance > ul");
                for (var i in list) {
                    var thisData = list[i];
                    var timeColor = '';
                    if (i <= 2) {
                        timeColor = 'mm';
                    }
                    var li = '<li class="guess-match-li">\
                                <a href="'+thisData.url+'">\
                                    <div class="icon"></div>\
                                    <span class="pull-left1">'+thisData.title+'</span>\
                                    <span class="pull-left2">'+thisData.type+'</span>\
                                    <span class="pull-left3">'+thisData.team+'</span>\
                                    <span class="pull-left4 '+timeColor+'">'+thisData.time+'</span>\
                                </a>\
                            </li>';
                    htmlUl.append(li);
                }
            }
        });
    }
})(jQuery);
