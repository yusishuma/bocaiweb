var siteUrl = 'http://aifece.local:8000';

function strToNum(str) {
    return str - 0;
}

//设置头部选中 公用部分
function setChecked(headerClassName, navClassName){
    switch(headerClassName){
        case 'hero-pull':
            $('.hero-pull').css('background-position','0px -86px');
            $('.hero-pull').parent().find('span').css('color','#cfcfcf');
            switch(navClassName){
                case 'index-icon':
                    $('.index-icon').css('background-position','0px -32px');
                    $('.index-icon').parent().find('span').css('color','#00a6ff');
                    break;
                case 'spinach-icon':
                    $('.spinach-icon').css('background-position','-29px -32px');
                    $('.spinach-icon').parent().find('span').css('color','#00a6ff');
                    break;
                case 'market-icon':
                    $('.market-icon').css('background-position','-59px -32px');
                    $('.market-icon').parent().find('span').css('color','#00a6ff');
                    break;
                case 'news-icon':
                    $('.news-icon').css('background-position','-89px -32px');
                    $('.news-icon').parent().find('span').css('color','#00a6ff');
                    break;
                case 'roll-icon':
                    $('.roll-icon').css('background-position','-121px -32px');
                    $('.roll-icon').parent().find('span').css('color','#00a6ff');
                    break;
                case 'user-icon':
                    $('.user-icon').css('background-position','-149px -32px');
                    $('.user-icon').parent().find('span').css('color','#00a6ff');
                    break;
                default:
                    $('.index-icon').css('background-position','0px -32px');
                    $('.index-icon').parent().find('span').css('color','#00a6ff');
                    break;
            }
            break;
        case 'keep-pull':
            $('.keep-pull').css('background-position','-22px -86px');
            $('.keep-pull').parent().find('span').css('color','#cfcfcf');
            switch(navClassName)
            {

            }
            break;
        case 'dota-pull':
            $('.dota-pull').css('background-position','-44px -86px');
            $('.dota-pull').parent().find('span').css('color','#cfcfcf');
            switch(navClassName)
            {
                
            }
            break;
        default:
            $('.hero-pull').css('background-position','0px -86px');
            $('.hero-pull').parent().find('span').css('color','#cfcfcf');
            break;
    }
}