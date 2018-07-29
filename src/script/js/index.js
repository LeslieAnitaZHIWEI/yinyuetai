//头部效果


// input效果
! function($) {
    var $search = $('.search input');
    var $searchpic = $('.search').find('a');
    var $searchcontent = $('.searchcontent');
    $search.blur(function() {
        if ($(this).val() == '') {
            $(this).val('搜索偶像、商品');
        }
        $(this).parent().css("background", "url(images/search_icon.png) no-repeat -1px -44px");
        $(this).siblings().not($searchcontent).css("background", "url(images/search_icon.png) -461px 0px no-repeat");
        $searchcontent.html('');
    }).focus(function() {
        if ($(this).val() == '搜索偶像、商品') {
            $(this).val("")
        };
        console.log($(this).parent())
        $(this).parent().css("background", "url(images/search_icon.png) no-repeat -1px -1px");
        $(this).siblings().not($searchcontent).css("background", "url(images/search_icon.png) -461px -43px no-repeat");
        // $searchcontnet.append(``)
        //http://shop.yinyuetai.com/search/keyword/relatedHot.json?hotsize=8&callback=jQuery110209820523789902578_1532088693450&latsize=6&hotsize=6&_=1532088693453
        //http://shop.yinyuetai.com/search/suggest.json?keyword=a
        //http://shop.yinyuetai.com/search.action?keyword=apink
        if ($(this).val() == '') {
            $searchcontent.html('');
            $.ajax({
                url: 'http://shop.yinyuetai.com/search/keyword/relatedHot.json?hotsize=8',
                dataType: 'jsonp'
            }).done(function(arg) {
                console.log(arg.data.HOT);
                $data = arg.data.HOT;
                var str = '<ul><p>热门搜索</p>';
                $.each($data, function(i, v) {
                    str += `<li><a href='http://shop.yinyuetai.com${v.link}'>${v.name}</a></li>`;
                })
                str += '</ul>';
                $searchcontent.append(str)
            })
        }
    })
    $search.on('input', function() {
        $.ajax({
            url: 'http://shop.yinyuetai.com/search/suggest.json?keyword=' + $search.val()

        }).done(function(e) {
            console.log(e);
            var str = '<ul>';

            $.each(e.data, function(i, v) {
                str += '<li><a href="#">' + v + '</a></li>';

            })
            str += '</ul>';
            $searchcontent.html(str)
        })
    })
    $searchpic.click(function() {
        if ($search.val() != '') {
            location.href = 'http://shop.yinyuetai.com/search.action?keyword=' + $search.val()
        }
    })
}(jQuery)

//lunbo效果
! function($) {
    function Carousel(picnum, width, ul, btnul, btnright, btnleft, classname) {
        this.num = 0;
        this.time=null;
        this.picnum = picnum;
        this.width = width;
        this.ul = ul;
        this.btnul = btnul;
        this.btnright = btnright;
        this.btnleft = btnleft;
        this.classname = classname;
    }
    Carousel.prototype.init = function(argument) {
        var that = this;
        var judge = true;
        this.clone();
        this.ul.width(this.ul.children().length * this.width).css('left', '-' + this.width + 'px');
        this.btnul.children().click(function() {
            if (judge) {
                judge = false;
                that.num = $(this).index();
                that.togglepic();
            }
        })
        this.btnright.click(function() {
            if (judge) {
                judge = false;
                that.num++;
                that.togglepic();
            }
        });
        this.btnleft.click(function() {
            if (judge) {
                judge = false;
                that.num--;
                that.togglepic();
            }
        });
        Carousel.prototype.togglepic = function() {
            this.btnul.children().removeClass(that.classname);
            this.ul.animate({
                left: -that.width * (that.num + 1) + 'px'
            }, 200, function() {
                if ((that.num) == that.picnum) {
                    that.ul.css('left', '-' + that.width + 'px');
                    that.num = 0;
                }
                if (that.num == -1) {
                    that.ul.css('left', -that.width * that.picnum + 'px');
                    that.num = that.picnum - 1;
                }
                that.btnul.children().eq(that.num).addClass(that.classname);
                judge = true;
            })
        }
        this.time = setInterval(function() {
            that.btnright.click();
        }, 3000);
        this.ul.mouseenter(function() {
            clearInterval(that.time)
        }).mouseleave(function() {
            that.time= setInterval(function() {
                that.btnright.click();
            }, 3000)
        })
    };
    Carousel.prototype.clone = function(argument) {
        this.ul.children().first().clone(true).appendTo(this.ul);
        this.ul.children().last().clone(true).prependTo(this.ul);
    };
    var $picnum = $('.piclist').children().length;
    var $width = $('.carousel').width();
    var c=new Carousel($picnum, $width, $('.piclist'),$('.btnlist'), $('#right'), $('#left'), 'active')
    c.init()
}(jQuery);

//滑动效果
! function($) {

    var $left = $('.necessary').find('button:first');
    var $right = $('.necessary').find('button:last');
    var $movesec = $('.smalltoggle').find('section');
    var $num = 0;
    var judge = true;
    $('.smalltoggle').find('a').clone().appendTo($movesec);
    $('.smalltoggle').find('a').clone().prependTo($movesec);
    $movesec.css("left", "-1090px");
    $right.click(function() {
        if (judge) {
            if ($num % 2 == 0) {
                $movesec.animate({
                    left: "-1308px",

                }, 500);
                $num++;
                $('.yuan s:last').addClass('pink').siblings().removeClass('pink')
            } else {
                judge = false;
                $movesec.animate({
                    left: "-2180px",
                }, 500, function() {
                    $movesec.css("left", "-1090px");
                    judge = true
                })
                $('.yuan s:first').addClass('pink').siblings().removeClass('pink')

                $num++;
            }
        }

    })
    $left.click(function() {
        if (judge) {
            if ($num % 2 != 0) {
                $movesec.animate({
                    left: "-872px",
                }, 500);
                $num++;
                $('.yuan s:first').addClass('pink').siblings().removeClass('pink')

            } else {
                judge = false;
                $movesec.animate({
                    left: "-0px",
                }, 500, function() {
                    $movesec.css("left", "-1090px");
                    judge = true
                })
                $('.yuan s:last').addClass('pink').siblings().removeClass('pink')
                $num++;
            }
        }

    })
    $('.yuan s:first').click(function() {
        if ($(this).attr('class') != 'pink') {
            $l = parseInt($movesec.css("left")) + 218;
            $movesec.animate({
                left: $l
            }, 500);
            $(this).attr('class', "pink").siblings().attr('class', "")

        }
    })
    $('.yuan s:last').click(function() {
        if ($(this).attr('class') != 'pink') {
            $r = parseInt($movesec.css("left")) - 218;
            $movesec.animate({
                left: $r
            }, 500);
            $(this).attr('class', "pink").siblings().attr('class', "")
        }

    })
}(jQuery);

//tab切换小效果
! function($) {

    var $mx = $('.top>h3>span').eq(0);
    var $sp = $('.top>h3>span').eq(1);
    $mx.click(function() {
        $('.mx').css("display", "block");
        $('.sp').css("display", "none");
        $(this).addClass("selectspan").siblings().removeClass("selectspan")
    })
    $sp.click(function() {
        $('.mx').css("display", "none");
        $('.sp').css("display", "block")
        $(this).addClass("selectspan").siblings().removeClass("selectspan")

    })
}(jQuery);

//album效果
! function($) {

    var $box = $('.albumRankBox');
    var $localBtn = $('.albumSale:first');
    var $outBtn = $('.albumSale:last');
    var $list = $('.mlablumList');
    var $rank = $('.goodsList_rank');
    $localBtn.mouseenter(function() {
        $(this).addClass('albumActive').siblings().removeClass('albumActive')
        $list.css("display", "block");
        $rank.css("display", "none")
    })
    $outBtn.mouseenter(function() {
        $(this).addClass('albumActive').siblings().removeClass('albumActive')
        $list.css("display", "none");
        $rank.css("display", "block")
    })
    $box.on("mouseenter", "li", function() {
        $(this).addClass('movein').siblings().removeClass('movein')
    })
}(jQuery)

//return Top
! function($) {

    $(window).scroll(function() {
        if ($(window).scrollTop() > 1000) {
            $('.menu_return').css("display", "inline-block")
        } else {
            $('.menu_return').css("display", "none")

        }
    })
    $('.menu_return').click(function() {
        $(this).animate(function() {
            $(window).scrollTop() = 0
        })

    })
}(jQuery)


! function() {
    $('nav').find('li').eq(0).addClass('active');
}(jQuery)

//喜欢
!function($){
    $('#main').on('click','.J_like',function() {
            var $num=$(this).next().html();
        if($(this).data('love')==''||$(this).data('love')==undefined){
            $num++;
            $(this).next().html($num);
            $(this).data('love','true');
            $(this).css('background','url(images/ico.png) -13px -72px no-repeat')
            return false;
        }else{
            $num--;
            $(this).next().html($num);
            $(this).css('background','url(images/ico.png) 0px -72px no-repeat')
            $(this).data('love','');

            judge=true;
            return false;
        }
    })
    
}(jQuery)


////////////////////////数据

! function($) {
    //top 数据
    $.ajax({
            url: 'php/data.php',
            dataType: 'json',
        })
        .done(function(arg) {
            arg = arg.startop;
            $mx = $(".mx");
            $.each(arg, function(i, v) {
                $mx.append(`<li><a href="/details.html?id=${v.proid}">
                        <span>${v.id}</span><img src="${v.url}" alt=""><div class="info"><h4>${v.name}</h4><p><i>销量:${v.salevolume}</i></p></div></a>
                    </li>`)
            })
        })
        .done(function(arg) {
            arg = arg.goodstop;
            $sp = $('.sp');
            $.each(arg, function(i, v) {
                $sp.append(`<li><a href="/details.html?id=${v.proid}">
                        <span>${v.id}</span><img src="${v.url}" alt=""><div class="info"><h4>${v.name}</h4></div></a>
                    </li>`)
            })
        })
        .done(function() {
            //销量前三
            $san = $('.mx').find('span:lt(3)');
            $san.addClass('san');
            $three = $('.sp').find('span:lt(3)');
            $s = $('.sp').find('li:lt(3)');
            $three.addClass('three');
            $s.addClass('s');
        })
        .fail(function() {
            console.log("error");
        })

}(jQuery)

! function($) {
    //新品
    $.ajax({
            url: 'php/data.php',
            dataType: 'json',
        })
        .done(function(arg) {
            arg = arg.newcd;
            $cd = $('.newcd').find('ul');
            $.each(arg, function(i, v) {
                $cd.append(`<li><a href="/yinyuestore/src/details.html?id=${v.proid}"><img src="${v.url}" alt=""><div class="info">
                        <p class="name">${v.name}</p>
                        <p class="price">¥${v.price}</p>
                        <p class="like">
                            <span class='J_like'></span>
                            <i class="like_num">${v.aixin}</i>
                        </p>
                    </div></a></li>`)
            })
        })
        .fail(function() {
            console.log("error");
        })
}(jQuery)

! function($) {
    //大家喜欢
    $.ajax({
            url: 'php/data.php',
            dataType: 'json',
        })
        .done(function(arg) {
            arg = arg.mostlove;
            $most = $('.mostlove').find('ul');
            $.each(arg, function(index, val) {
                $most.append(`<li>
                        <a href="/yinyuestore/src/details.html?id=${val.proid}"><img src="${val.url}" alt=""><p class="goodsList_name">${val.name}</p><div class="goodsList_info"><p class="goodsList_price">¥${val.price}</p><p class="like"><span class="J_like"></span><i class="like_num">${val.aixin}</i></p></div></a>
                    </li>`)
            });
        })
        .fail(function() {
            console.log("error");
        })

}(jQuery)

! function($) {
    //推荐
    $.ajax({
            url: 'php/data.php',
            dataType: 'json',
        })
        .done(function(arg) {
            arg = arg.recommend;
            $reco = $('.goodsList_album');
            $.each(arg, function(index, val) {
                $reco.append(`<li><a href="/yinyuestore/src/details.html?id=${val.proid}"><img src="${val.url}"><p class="goodsName">${val.name}</p><p class="like"><span class="J_like"></span><i class="like_num">${val.aixin}</i></p></a></li>`)
            });
        })
        .done(function() {
            $reco.find('li:lt(1)').addClass('album_first')
        })
        .fail(function() {
            console.log("error");
        })

}(jQuery)

! function($) {
    //内地进口销量
    $.ajax({
            url: 'php/data.php',
            dataType: 'json',
        })
        .done(function(arg) {
            arg = arg.neidisale;
            $neidi = $('.mlablumList');
            $.each(arg, function(index, val) {
                $neidi.append(` <li class="clearfix"><span class="rankNum">${val.id}</span><a href="/yinyuestore/src/details.html?id=${val.proid}" target="_blank"><img src="${val.url}" alt=""><p class="goodsName">${val.name}</p></a></li>`)
            });
        })
        .done(function(arg) {
            $rank = $('.goodsList_rank');
            arg = arg.jinkousale;
            $.each(arg, function(index, val) {
                $rank.append(`<li class="clearfix"><span class="rankNum">${val.id}</span><a href="/yinyuestore/src/details.html?id=${val.proid}"><img src="${val.url}" alt=""><p class="goodsName">${val.name}</p></a></li>`)
            });
        })
        .done(function() {
            $neidi.find('li:lt(1)').addClass('movein');
            $rank.find('li:lt(1)').addClass('movein');
        })
        .fail(function() {
            console.log("error");
        })

}(jQuery)

! function($) {
    //周边
    $.ajax({
            url: 'php/data.php',
            dataType: 'json',
        })
        .done(function(arg) {
            arg = arg.surrounding;
            $sur = $('.surrounding').find('ul');
            $.each(arg, function(index, val) {
                $sur.append(`<li><a href="/yinyuestore/src/details.html?id=${val.proid}"><img src="${val.url}" ><p class="artistName">${val.name}</p><p class="goodsList_name">${val.proname}</p><div class="goodsList_info"><p class="goodsList_price">¥${val.price}</p><p class="like"><span class="J_like" ></span><i class="like_num" >${val.aixin}</i></p></div></a></li>`)
            });
        })
        .fail(function() {
            console.log("error");
        })

}(jQuery)

! function($) {
    $.ajax({
            url: 'php/data.php',
            dataType: 'json',
        })
        .done(function(arg) {
            arg = arg.activity;
            $act = $('.activity').find('ul');
            $.each(arg, function(index, val) {
                $act.append(`<li><a href="/yinyuestore/src/details.html?id=${val.proid}" target="_blank"><p class="artistName">${val.name}</p><p class="goodsList_name">${val.proname}</p><div class="goodsList_info"><p class="goodsList_price">¥${val.price}</p><p class="like"><span class="J_like"></span><i class="like_num" data-num="184">${val.aixin}</i></p></div><img src="${val.url}"></a></li>`)
            });
        })
        .fail(function() {
            console.log("error");
        })

}(jQuery)

! function($) {
    //热卖
    $.ajax({
            url: 'php/data.php',
            dataType: 'json',
        })
        .done(function(arg) {
            arg = arg.hotsale;
            $hot = $('.hotsale').find('ul');
            $.each(arg, function(index, val) {
                $hot.append(`<li><a href="/yinyuestore/src/details.html?id=${val.proid}"><img src="${val.url}" ><p class="goodsList_name">${val.name}</p><div class="goodsList_info"><p class="goodsList_price">¥${val.price}</p><p class="like"><span class="J_like" ></span><i class="like_num" >${val.aixin}</i></p></div></a></li>`)
            });
        })
        .fail(function() {
            console.log("error");
        })

}(jQuery)

! function($) {
    //华语商品
    $.ajax({
            url: 'php/data.php',
            dataType: 'json',
        })
        .done(function(arg) {
            arg = arg.chinese;
            $chi = $('.chinese').find('ul');
            $.each(arg, function(index, val) {
                $chi.append(`<li><a href="/yinyuestore/src/details.html?id=${val.proid}"><img src="${val.url}" ><p class="artistName">BigBang</p><p class="goodsList_name">${val.name}</p><div class="goodsList_info"><p class="goodsList_price">¥${val.price}</p><p class="like"><span class="J_like" ></span><i class="like_num" >${val.aixin}</i></p></div></a></li>`)
            });
        })
        .fail(function() {
            console.log("error");
        })

}(jQuery)