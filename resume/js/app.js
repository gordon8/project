(function ($) {
    var $page = $('.page');

    //切换显示导航栏
    $page.on('click', '>nav>.toggle', function () {
        $(this).closest('nav').toggleClass('open');
    });
    //点击导航栏，将其隐藏
    $page.on('click', '>nav>ol', function () {
        $(this).closest('nav').removeClass('open');
    });

    //为导航栏添加click动画
    $page.on('click', '>nav a', function (e) {
        e.preventDefault();
        var $a = $(this);
        var target = $a.attr('href');
        var $target = $(target);
        scrollTo($target);
    });

    //获取导航栏清单
    var $navList = $page.find('>nav li');
    //获取section列表
    var $sections = $page.find('>main>section');
    var sectionTopList = [];
    setSectionTopList();

    $(window).on('resize', function () {
        setSectionTopList();
    });

    //定义函数为sectionTopList赋值

    function setSectionTopList() {
        $.each($sections, function (index, section) {
            var $section = $(section);
            var top = $section.offset().top;
            sectionTopList[index] = top;
        });
    }


    //执行checkNav&addAnimation
    $(window).on('scroll', function () {
        checkNav();
        addAnimation();
    });
    checkNav();
    addAnimation();

    //定义checkNav函数：检查$navList，为当前的页面对应的li的子节点a添加class:selected;并移除其他a链接的selected
    function checkNav() {
        var currentIndex = getCurrentIndex();
        $navList.eq(currentIndex)
        .children('a').addClass('selected').end()
        .siblings().children('a').removeClass('selected');
    }

    //定义addAnimation函数：为当前页面添加class:current，离开时移除class:current，并添加class:leave
    function addAnimation() {
        var currentIndex = getCurrentIndex();
        $sections.eq(currentIndex)
        .addClass('current').removeClass('leave')
        .siblings().removeClass('current').addClass('leave');
    }

    //定义getCurrentIndex函数：获取当前的scrollTop值，并与sectionTopList中的值对比，确定目前的index
    function getCurrentIndex() {
        var iTop = $(document).scrollTop();
        var eyePositon = iTop + $(window).height() / 2;
        var currentIndex = 0;
        for (var i = 0; i < sectionTopList.length; i++) {
            if (sectionTopList[i+1] === undefined) {
                currentIndex = i;
                break;
            }
            if (eyePositon >= sectionTopList[i] && eyePositon <= sectionTopList[i+1]) {
                currentIndex = i;
                break;
            }
        }
        return currentIndex;
    }

    //定义scrollTo函数：获取目标元素距页面顶部的高度，并让页面滚动到指定位置。
    function scrollTo($el) {
        var iTop = $el.offset().top;
        $('html, body').animate({
            scrollTop: iTop
        }, 500);
    }

})(jQuery);