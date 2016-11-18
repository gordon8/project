// 切换搜索框功能
var search = {
    init: function () {
        this.attachEl();
        this.bind();
    },
    attachEl: function () {
        this.$tags = $('#menu li');
        this.$input = $('#search .search-text');
        this.arrText = [
            '例如：荷棠鱼坊烧鱼 或 樱花日本料理',
            '例如：昌平区育新站龙旗广场2号楼609室',
            '例如：万达影院双人情侣券',
            '例如：东莞出事了，大老虎是谁？',
            '例如：北京初春降雪，天气变幻莫测'
        ];
        this.isNow = 0;
    },
    bind: function () {
        var me = this;
        this.$input.val(this.arrText[this.isNow]);
        this.$tags.each(function (index) {
            $(this).on('click', function () {
                me.$tags.removeClass('active');
                $(this).addClass('active');
                me.isNow = index;
                me.$input.val(me.arrText[me.isNow]);
            });
        });
        this.$input.on('focus', function () {
            if ($(this).val() == me.arrText[me.isNow]) {
                $(this).val('');
            }
        });
        this.$input.on('blur', function () {
            if ($(this).val() === '') {
                $(this).val(me.arrText[me.isNow]);
            }
        });
    },
};

// update轮播功能
var update = {
    init: function () {
        this.attachEl();
        this.bind();
        this.autoplay();
    },
    attachEl: function () {
        this.$oDiv = $('.update');
        this.$oUl = this.$oDiv.find('ul');
        this.$oBtnUp = $('#update-up');
        this.$oBtnDown = $('#update-down');
        this.num = 0;
        this.timer = null;
    },
    bind: function () {
        var me = this;
        this.inner();
        this.$oLi = this.$oUl.find('li');
        this.$oBtnUp.on('click', function () {
            me.move(-1);
        });
        this.$oBtnDown.on('click', function () {
            me.move(1);
        });
        this.$oDiv.hover(function (){
            me.stop();
        }, function (){
            me.autoplay();
        });
    },
    inner: function () {
        var arrText = [
        {"name": "畅畅", "time": 4, "url":"https://gordon8.github.io/", "title": "那些灿烂华美的瞬间"},
        {"name": "萱萱", "time": 5, "url":"https://gordon8.github.io/", "title": "广东3天抓获涉黄疑犯"},
        {"name": "畅畅", "time": 6, "url":"https://gordon8.github.io/", "title": "那些灿烂华美的瞬间"},
        {"name": "萱萱", "time": 7, "url":"https://gordon8.github.io/", "title": "广东3天抓获涉黄疑犯"},
        {"name": "畅畅", "time": 8, "url":"https://gordon8.github.io/", "title": "那些灿烂华美的瞬间"},
        {"name": "萱萱", "time": 9, "url":"https://gordon8.github.io/", "title": "广东3天抓获涉黄疑犯"},
        ];
        var str = '';
        for (var i = 0; i < arrText.length; i++) {
            str += '<li><a href="' + arrText[i].url + '"><strong>' + arrText[i].name + '</strong>&nbsp;<span>' + arrText[i].time + '分钟前</span>&nbsp;写了一篇新文章：' +arrText[i].title + '</a></li>';
        }
        this.$oUl.html(str);
    },
    move: function (i) {
        this.num += i;
        if (this.num < 0) {
            this.num = this.$oLi.length - 1;
        }
        if (this.num == this.$oLi.length) {
            this.num = 0;
        }
        var iH = this.$oLi.height();
        this.$oUl.animate({'top':-iH*this.num}, 500);
    },
    autoplay: function () {
        var me = this;
        this.timer = setInterval(function () {
            me.move(1);
        }, 3000);
    },
    stop: function () {
        clearInterval(this.timer);
    }
};

//选项卡切换功能
function tabSwitch() {
    fnTab('.tab-nav1', '.tab-con1' , 'click');
    fnTab('.tab-nav2', '.tab-con2' , 'click');
    fnTab('.tab-nav3', '.tab-con3' , 'mouseover');
    fnTab('.tab-nav4', '.tab-con4' , 'mouseover');
    function fnTab(sNav, sCon, sEvent) {
        var oNav = $(sNav);
        var aCon = $(sCon);
        var aElem = oNav.children();
        aCon.hide().eq(0).show();
        aElem.each(function (index) {
            $(this).on(sEvent, function () {
                aElem.removeClass('active').addClass('gradient');
                $(this).addClass('active').removeClass('gradient');

                aElem.find('a').attr('class', 'triangle-down-grey');
                $(this).find('a').attr('class', 'triangle-down');

                aCon.hide().eq(index).show();
            });
        });
    }
}

//自动播放焦点图片
function fadePic() {
    var $oDiv = $('#fade');
    var $aBigLi = $oDiv.find('ul li');
    var $aImg = $aBigLi.find('img');
    var $aSmallLi = $oDiv.find('ol li');
    var $oP = $oDiv.find('p');
    var arr = [];
    var iNow = 0;
    var timer = null;
    fnFade();
    autoplay();
    
    for (var i = 0; i < $aImg.length; i++) {
        arr.push($aImg.eq(i).attr('alt'));
    }

    $aSmallLi.on('click', function () {
        iNow = $(this).index();
        fnFade();
    });

    $oDiv.on('mouseover', function () {
        clearInterval(timer);
    });
    $oDiv.on('mouseout', function () {
        autoplay();
    });

    function autoplay() {
        timer = setInterval(function () {
            iNow++;
            iNow %= $aBigLi.length;
            fnFade();
        }, 3000);
    }

    function fnFade() {
        $aSmallLi.each(function (i) {
            if (i !== iNow) {
                $aSmallLi.eq(i).removeClass('active');
                $aBigLi.eq(i).fadeOut().css('z-index',1);
            } else {
                $aSmallLi.eq(i).addClass('active');
                $aBigLi.eq(i).fadeIn().css('z-index',2);
            }
        });
        $oP.text(arr[iNow]);
    }
}

//日历提醒信息
function calendarInfo() {
    var $oCalender = $('.calendar');
    var $aSpan = $oCalender.find('h3 span');
    var $aImg = $oCalender.find('.img');
    var $oInfo = $oCalender.find('.today-info');
    var $oImg = $oInfo.find('img');
    var $oStrong = $oInfo.find('strong');
    var $oEm = $oInfo.find('em');
    var $oP = $oInfo.find('p');

    $aImg.hover(function () {
        var iTop = $(this).parent().position().top  - 35;
        var iLeft = $(this).parent().position().left + 48;
        var index = $(this).parent().index()%$aSpan.length;
        $oImg.attr('src', $(this).attr('src'));
        $oStrong.text($aSpan.eq(index).text());
        $oEm.text($(this).attr('alt'));
        $oP.text($(this).attr('info'));
        $oInfo.show().css({'top': iTop, 'left': iLeft});
    }, function (argument) {
        $oInfo.hide();
    });
}

//BBS高亮显示
function bbsHighlight() {
    var $aLi = $('.bbs li');
    $aLi.on('mouseover', function () {
        $aLi.removeClass('active');
        $(this).addClass('active');
    });
}

//HOT鼠标提示效果
function hotReminder() {
    var $aHotUsers = $('.hot-users li');
    var arr = [
    '',
    '用户1<br />人气1',
    '用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
    '用户3<br />人气3',
    '用户4<br />人气4',
    '用户5<br />人气5',
    '用户6<br />人气6',
    '用户7<br />人气7',
    '用户8<br />人气8',
    '用户9<br />人气9',
    '用户10<br />人气10'
    ];
    $aHotUsers.on('mouseover', function () {
        if ($(this).index() === 0) {
            return false;
        }
        $aHotUsers.find('p').remove();
        $(this).append('<p style="width:' + ($(this).width()-24) + 'px; height:' + ($(this).height()-24) + 'px;">' + arr[$(this).index()] + '</p>');
    });
}

//加载事件
$(function () {
    search.init();
    update.init();
    tabSwitch();
    fadePic();
    calendarInfo();
    bbsHighlight();
    hotReminder();
});