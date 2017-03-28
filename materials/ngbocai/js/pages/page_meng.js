/**
 * --------------- 高同檩负责的 page.js ---------------
 */

 /*--- 拖动区域 ---*/

 /* 拖动排序 */
function pageMoveSort(){
	var pageSpan = jQuery('span[data-role="page"]');
		pageSpan.each(function(i){
			$(this).html(i + 1);
			$(this).attr('data-page', i + 1);
		});
}

function contentMoveSort(){
	var contentDiv = jQuery('div[data-role="content"]');
		contentDiv.each(function(i){
			$(this).attr('data-page', i + 1);
		});
}

/* 拖动效果 */
function dragable(obj){
	$(obj).draggable();
}

/* 改变大小效果 */
function resize(obj){
	$(obj).resizable();
}

/* 删除图片--制作中心页面 */
function deleElement(obj, ele, tar, callback){
  var sTip;

  switch (ele){
    case "img" :
      sTip = "请先选中一张图片！"
      break;
    case "txt" :
      sTip = "请先选中一个文本！"
      break;
    default :
      "请先选中一个元素";
  }

  $(obj).click(function(){
    if($(tar).length > 0){
      layer.confirm("确定删除吗？",{
        skin: "layer-ext-bao",
        icon: 1,
        area: ["300px"],
        yes: function(idx){
          $(tar).remove();
          if(callback){
            callback();
          }
          layer.close(idx);
        }
      })
    }
    else{
      layer.alert(sTip, {
        skin: "layer-ext-bao",
        icon: 3,
        area: ["300px"]
      });
    }
  });
  
}


/**
 * [placeholder placeholder样式]
 * @param  {[string]} obj [data-role 的属性值]
 * @param  {[string]} inp [input 的class名]
 * @param  {[string]} txt [span 的class名]
 * @return {[null]}       [null]
 */
function placeholder (obj, inp, txt) {
   var oPlace = $("[data-role='"+ obj +"']");
   var oIput  = oPlace.find("[data-role='"+ inp +"']");
   var oTxt   = oPlace.find("[data-role='"+ txt +"']");
   var sStr;

   oTxt.click(function(){
       var oSibling = $(this).siblings("[data-role='"+ inp +"']");
       oSibling.focus();
   });

   function loadCheck(){ //一加载判断函数
     oIput.each(function() {
       var oSibling = $(this).siblings("[data-role='"+ txt +"']");
       sStr = $(this).val();
       if(sStr){
         oSibling.css("display", "none");
       }
       else{
         oSibling.css("display", "block");
       }
     });
       
   }

   loadCheck();

   function pressCheck(obj){ //输入内容判断函数
     var oSibling = $(obj).siblings("[data-role='"+ txt +"']");
     sStr = $(obj).val();
     if(sStr){
       oSibling.css("display", "none");
     }
     else{
       oSibling.css("display", "block");
     }
   }

   oIput.keyup(function() {
       pressCheck(this);
   });
   oIput.keydown(function() {
       pressCheck(this);
   });
}

/**
 * [changePro 改变元素的属性值]
 * @param  {[string]} obj     [目标元素]
 * @param  {[string]} proName [目标属性名]
 * @param  {[string]} proVal  [目标属性值]
 * @return {[type]}         [description]
 */
function changePro (obj, proName, proVal) {
    $(obj).attr(proName, proVal);
}

/**
 * [wordsLimit 发布渠道--字数限制]
 * @param  {[string]} oInp [输入框对象]
 * @param  {[string]} oCur [当前字数对象]
 * @param  {[string]} oTo  [总字数对象]
 * @param  {[number]} iNum [总字数]
 * @param  {[string]} oTip [提示框]
 * @return {[null]}      [description]
 */
function wordsLimit(oInp, oCur, oTo, iNum, oTip){
    var oInp = $(oInp);
    var oCur = $(oCur);
    var oTo = $(oTo);
    var iLen = oInp.val().length;
    var oTip = $(oTip);

    oCur.html(iLen);
    oTo.html(iNum);
    oInp.keyup(function() {
        var sStr = $(this).val();
        iLen = sStr.length;
        if(iLen > iNum){
            $(this).val(sStr.substring(0, iNum));
            oCur.html(iNum);
            oTip.show();
        }else{
            oCur.html(iLen);
            oTip.hide();
        }
    });
    oInp.blur(function(){
        oTip.hide();
    });
}
/**
 * [wordsLimit 发布渠道--字数限制]
 * @param  {[string]} oInp [输入框对象]
 * @param  {[string]} oCur [当前字数对象]
 * @param  {[string]} oTo  [总字数对象]
 * @param  {[number]} iNum [总字数]
 * @param  {[string]} oChao [超出的字数]
 * @return {[null]}      [description]
 */
function wordsLimitMore(oInp, oCur, iNum, oChao){
    var oInp = $(oInp);
    var oCur = $(oCur);
    var iLen = oInp.val().length;
    var oChaoWord = $(oChao);

    oCur.html(iNum);
    oInp.keyup(function() {
        var sStr = $(this).val();
        iLen = sStr.length;
        if(iLen > iNum){
            oChaoWord.html(iLen - iNum);
            oChaoWord.parent().show();
            oCur.parent().hide();
        }else{
            oCur.html(iNum - iLen);
            oCur.parent().show();
            oChaoWord.parent().hide();
        }
    });
}
/**
 * [导航滑块效果]
 * @param  {[type]} $ [依赖于jquery]
 * @return {[type]}   [description]
 */
(function($){
    $.fn.movebg=function(options){
        var defaults={
            width:120,/*移动块的大小*/
            extra:50,/*反弹的距离*/
            speed:300,/*块移动的速度*/
            rebound_speed:300/*块反弹的速度*/
        };
    var defaultser=$.extend(defaults,options);
    return this.each(function(){
        var _this=$(this);
        var _item=_this.children("a");/*找到触发滑块滑动的元素   */
        var origin=_this.children("a.on").index();/*获得当前导航的索引*/
        var _mover=_this.find(".move_bgc");/*找到滑块*/
        var hidden;/*设置一个变量当html中没有规定cur时在鼠标移出导航后消失*/
        if (origin==-1){origin=0;hidden="1";} else{_mover.show()};/*如果没有定义cur,则默认从第一个滑动出来*/
        var cur=prev=origin;/*初始化当前的索引值等于上一个及初始值;*/
        var extra=defaultser.extra;/*声明一个变量表示额外滑动的距离*/
        _mover.css({left:""+defaultser.width*origin+"px"});/*设置滑块当前显示的位置*/
        
        //设置鼠标经过事件
        _item.each(function(index,it){
            $(it).mouseover(function(){
                cur=index;/*对当前滑块值进行赋值*/
                if(hidden==1){
                    _mover.stop(true, true).fadeIn();
                    move();
                }else{
                    // cur=index;/*对当前滑块值进行赋值*/
                    move();
                    prev=cur;/*滑动完成对上个滑块值进行赋值*/
                }
                
            });
        });
        _this.mouseleave(function(){
            if(hidden==1){
                _mover.stop(true, true).fadeOut();/*当html中没有规定cur时在鼠标移出导航后消失*/
            }else{
                cur=origin;/*鼠标离开导航时当前滑动值等于最初滑块值*/
                move();
            }
        });
        
        //滑动方法
        function move(){
            _mover.clearQueue();
            if(cur<prev){extra=-Math.abs(defaultser.extra);} /*当当前值小于上个滑块值时，额外滑动值为负数*/
            else{extra=Math.abs(defaultser.extra)};/*当当前值大于上个滑块值时，滑动值为正数*/
            _mover.queue(
                function(){
                    $(this).show().stop(true,true).animate({left:""+Number(cur*defaultser.width+extra)+""},defaultser.speed),
                    function(){$(this).dequeue()}
                }
            );
            _mover.queue(
                function(){
                    $(this).stop(true,true).animate({left:""+cur*defaultser.width+""},defaultser.rebound_speed),
                    function(){$(this).dequeue()}
                }
            );
        };
    })
    }
})(jQuery);



















