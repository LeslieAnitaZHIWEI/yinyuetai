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


//购物车
! function($) {
    if ($.cookie('proid') && $.cookie('pronum')) {
        var $idarr = $.cookie('proid').split(',');
        console.log($idarr);
        var $numarr = $.cookie('pronum').split(',');
        console.log($numarr)

        $('.cart-empty').css('display', 'none');
        $('.info').css('display', 'block');
        $.each($idarr, function(i, val) {
            $.ajax({
                    url: 'php/details.php',
                    data: {
                        id: val
                    },
                    dataType: 'json'
                })
                .done(function(arg) {
                    arg = arg.data;
                    $('.pay_cart_list table').append(`<tr class="J_cart_goods" data-id='${arg.id}'>
                    <td><div class="pos"><a href="/yinyuestore/src/details.html?id=${arg.id}" class="pic shadow" target="_blank"><img src="${arg.bigHeadImg}">
                    </a><a href="/yinyuestore/src/details.html?id=${arg.id}" class="c_6" target="_blank">${arg.title}</a><a href="javascript:;" class="ico_close J_confirm_remove" title="删除">删除</a></div></td>
                    <td align="center"><a href="javascript:;" class="pay_cart_plus J_delete">-</a>
                        <input class="input_text pay_cart_num" type="text" value=""><a href="javascript:;" class="pay_cart_minus J_add">+</a></td>
                    <td id='price' align="center">
                        <p>${arg.price}元</p>
                    </td>
                    <td width="120" align="center"><span class="f18 c_f63 J_subTotal"></span>元</td>
                </tr>`);
                }).done(function(arg) {
                    arg = arg.data;
                    //$.inArray($proid, $idarr)
                    $.each($('.input_text'), function(index, val) {
                        /* iterate through array or object */
                        var $ii = $(val).parent().parent().data('id').toString();
                        // console.log($numarr);
                        // console.log(typeof($ii))
                        // console.log($numarr[$.inArray($ii, $idarr)])
                        $(val).val($numarr[$.inArray($ii, $idarr)]);
                    });
                    $.each($('.pay_cart_list .J_subTotal'), function(index, val) {
                        /* iterate through array or object */
                        var $dj = parseInt($(val).parent().prev().children().html());
                        var $num = $(val).parent().prev().prev().children('input').val();
                        $(val).html(($dj * parseInt($num)).toFixed(1))
                    });
                    finallytotal();
                })
        })
    } else {
        $('.cart-empty').css('display', 'block');
        $('.info').css('display', 'none');
    }
}(jQuery)

//修改数量
! function($) {
    $('.info').on('click', '.J_add', function() {
        var $num = $(this).prev();
        var $proid = $(this).parent().parent().data('id').toString();
        $zhi = $num.val(); // console.log(typeof($proid))// console.log(typeof($zhi))
        $num.val(++$zhi);
        reinsert($proid, $zhi);
        // console.log($zhi);
        // console.log($(this).parent().next().children().html())
        $(this).parent().next().next().children().html(parseInt($(this).parent().next().children().html()) * parseInt($zhi));
        finallytotal();
    }).on('click', '.J_delete', function() {
        var $num = $(this).next();
        var $proid = $(this).parent().parent().data('id').toString();
        if ($num.val() > 1) {
            $zhi = $num.val();
            $num.val(--$zhi);
            reinsert($proid, $zhi);
            $(this).parent().next().next().children().html(parseInt($(this).parent().next().children().html()) * parseInt($zhi));
            finallytotal()
        } else {
            $num.val(1);
        }
    })
}(jQuery)

//删除
! function($) {
    $('.info').on('mouseenter', '.pos', function() {
        $(this).children().last().css('display', 'block')
    }).on('mouseleave', '.pos', function() {
        $(this).children().last().css('display', 'none')
    })
    $('.info').on('click', '.ico_close', function() {
        var $idarr = $.cookie('proid').split(',');
        var $numarr = $.cookie('pronum').split(',');
        $(this).parent().parent().parent().remove();
        finallytotal();
        var $proid = $(this).parent().parent().parent().data('id').toString()
        var $index = $.inArray($proid, $idarr);
        $idarr.splice($index, 1);
        $numarr.splice($index, 1);
        $.cookie('proid', $idarr);
        $.cookie('pronum', $numarr);
    })
}(jQuery)

//修改数字
! function($) {
    $('.info').on('input','.pay_cart_num', function() {
        var $reg = /^\d+$/g; //只能输入数字
        var $value = parseInt($(this).val());
        if ($reg.test($value)) {
            if ($value <= 0) {
                $(this).val(1);
            }
        } else {
            $(this).val(1);
        }
        $(this).parent().next().next().children().html(parseInt($(this).parent().next().children().html()) * parseInt($(this).val()));
        finallytotal();
        reinsert($(this).parent().parent().data('id').toString(), parseInt($(this).val()))
    })
}(jQuery)

//加cookie
function reinsert($proid, $zhi) {
    var $idarr = $.cookie('proid').split(',');
    var $numarr = $.cookie('pronum').split(',');
    console.log($idarr);
    console.log($numarr);
    console.log(typeof($proid))
    console.log($.inArray($proid, $idarr));
    $numarr[$.inArray($proid, $idarr)] = parseInt($zhi);
    console.log($numarr);

    $.cookie('pronum', $numarr, { expires: 7 });
}
//总和
function finallytotal() {
    var $total = 0;
    $('.J_subTotal').each(function() {
        $total += parseInt($(this).html())
    })
    console.log($total)
    $('.J_totalMoney').html(parseFloat($total).toFixed(1))
}