(function ($) {
    $.HCarousel = function (opts) {
        var defaultOpts = {
            $wrap: $('body'),
            current: 0,
            autoPlay: true,
            interval: 3000
        };
        this.opts = $.extend(defaultOpts, opts);
        this.init(opts);
    };

    $.HCarousel.prototype = {
        init: function () {
            this.attachEl();

            this.switchItem(this.opts.current);

            this.bind();

            if (this.opts.autoPlay) {
                this.autoPlay();
            }
        },
        attachEl: function () {
            var data = this.opts.data;
            this.$carousel = $('<div class="carousel"></div>');
            this.$imgList = $('<div class="img-list"></div>');
            this.$switchList = $('<ol class="switch-list"></ol>');
            var imgListStr = '';
            var switchListStr = '';
            for (var i = 0; i < data.length; i++) {
                //<a class="img-item" href="data[i].url"><img src="data[i].img"><div class="img-modal"></div></a>
                //<li class="switch-item"></li>
                imgListStr += '<a class="img-item" href="' + data[i].url + '"><img src="' + data[i].img + '"><div class="img-modal"></div></a>';
                switchListStr += '<li class="switch-item"></li>';
            }

            this.$imgList.append($(imgListStr));
            this.$switchList.append($(switchListStr));
            this.$carousel.append(this.$imgList);
            this.$carousel.append(this.$switchList);
            this.opts.$wrap.append(this.$carousel);

            this.$imgItems = this.$carousel.find('.img-item');
            this.$switchItems = this.$carousel.find('.switch-item');
            this.listLength = this.$imgItems.length;

            this.$mainImgItem = null;
        },
        bind: function () {
            var me = this;
            this.$imgList.on('click', '.img-item', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var isMainImgItem = $(this).hasClass('main-img-item');
                if (isMainImgItem) {
                    window.location = $(e.target).parent().attr('href');
                } else {
                    var index = $(e.target).parent().index();
                    me.switchItem(index);
                }
            });
            this.$switchList.on('mouseover', '.switch-item', function (e) {
                e.stopPropagation();
                var index = $(e.target).index();
                me.switchItem(index);
            });
            if (this.opts.autoPlay) {
                this.$imgList.hover(function () {
                    me.stopAutoPlay();
                }, function () {
                    me.autoPlay();
                });
            }   
        },
        switchItem: function (index) {
            if (this.$mainImgItem) {
                this.clearStyle();
            }
            this.mainIndex = index;
            this.$mainImgItem = this.$imgItems.eq(index);
            this.$mainSwitchItem = this.$switchItems.eq(index);
            if (index === 0) {
                this.$prevImgItem = this.$imgItems.eq(this.listLength - 1);
                this.$leftImgItem = this.$imgItems.eq(this.listLength - 2);
            } else if (index === 1) {
                this.$prevImgItem = this.$imgItems.eq(index - 1);
                this.$leftImgItem = this.$imgItems.eq(this.listLength - 1);
            } else if (index > 1) {
                this.$prevImgItem = this.$imgItems.eq(index - 1);
                this.$leftImgItem = this.$imgItems.eq(index - 2);
            }

            if (index === this.listLength - 1) {
                this.$nextImgItem = this.$imgItems.eq(0);
                this.$rightImgItem = this.$imgItems.eq(1);
            } else if (index === this.listLength - 2) {
                this.$nextImgItem = this.$imgItems.eq(index + 1);
                this.$rightImgItem = this.$imgItems.eq(0);
            } else if (index < this.listLength - 2) {
                this.$nextImgItem = this.$imgItems.eq(index + 1);
                this.$rightImgItem = this.$imgItems.eq(index + 2);
            }

            this.addStyle();
        },
        autoPlay: function () {
            var me = this;

            this.timeId = setInterval(function () {
                me.mainIndex++;
                if (me.mainIndex === me.listLength) {
                    me.mainIndex = 0;
                }
                me.switchItem(me.mainIndex);
            }, this.opts.interval);
        },
        stopAutoPlay: function () {
            clearInterval(this.timeId);
        },
        addStyle: function () {
            this.$mainImgItem.addClass('main-img-item');
            this.$nextImgItem.addClass('next-img-item');
            this.$prevImgItem.addClass('prev-img-item');
            this.$leftImgItem.addClass('left-img-item');
            this.$rightImgItem.addClass('right-img-item');
            this.$mainSwitchItem.addClass('switch-item-active');
        },
        clearStyle: function () {
            this.$mainImgItem.removeClass('main-img-item');
            this.$nextImgItem.removeClass('next-img-item');
            this.$prevImgItem.removeClass('prev-img-item');
            this.$leftImgItem.removeClass('left-img-item');
            this.$rightImgItem.removeClass('right-img-item');
            this.$mainSwitchItem.removeClass('switch-item-active');
        }
    };
})(jQuery);