
//数据
;!function($){
	var $dizhi=window.location.search;
	var $reg=/\d/g;
	$proid=$dizhi.match($reg).join('');
	// $.ajax({
	// 	url:'http://shop.yinyuetai.com/goods/detail.json?goodsId='+$proid,
	// 	type:'jsonp'
	// }).done(function(arg){
	// 	console.log(arg)
	// })
	$.ajax({
		url:'php/details.php',
		data:{
			id:$proid
		},
		dataType:'json'
	}).done(function(arg){
		var arg=arg.data;
		// console.log(arg);
		// console.log(arg.title);
		// console.log(arg.price);
		// console.log(arg.originalPrice);
		// console.log(arg.weight);
		// console.log(arg.bigHeadImg);
		// console.log(arg.goodsCategory);
		// console.log(arg.goodsList);
		// console.log(arg.descImages)
	}).done(function(arg){
		var arg=arg.data;
		document.title=arg.title;
		$('.detail_tittle').html(`<a href="#" target="_blank">首页&nbsp;&gt;&nbsp;</a><a href="/digit" target="_blank">${arg.goodsCategory}&nbsp;&gt;&nbsp;</a><span>${arg.title}</span>`)
		$('.pic').prepend(`<img src="${arg.bigHeadImg}" alt="">`)
		$('.img').html(`<img src="${arg.bigHeadImg}" alt="">`);
		$.each(arg.descImages, function(index, val) {
			$('.slide').append(`<li><img src="${val.headImg}" alt="" data-bigimg='${val.thumbUrl}'></li>`)
		});
		$('.goodsTitle').html(arg.title);
		$('.price_cur').html(arg.price);
		$('.pre').html(arg.originalPrice);
		$('.c_weight').html(arg.weight);
		$.each(arg.goodsList, function(index, val) {
			$('.ralatedList').append(`<li id="${arg.id}" data-img="${val.bigHeadImg}" data-title="${val.title}" data-ori="${val.originalPrice}" data-price="${val.price}" data-fa="${val.favNum}" data-lv="${val.love}" style="height: 77px;"><a href="/yinyuestore/src/details.html?id=${val.id}" target="_blank"><img src="${val.bigHeadImg}"></a></li>`)
			 
		});
	}).done(function(){
		//右侧导航上下滑动

	var $hei=$('.tempWrap').height();
	// console.log($('.ralatedList li'));
	var $ulheight=$('.ralatedList').height()+35;
	var $beishu=$('.ralatedList').height()/$hei;
	var $num=0;
	$('.prev').click(function(){
		if($num==0){
			$('.ralatedList').stop().animate({
			top:-($ulheight-$hei),
			},700,function(){
			$num=2;
			})
		}else{
			$num--;
			$('.ralatedList').stop().animate({
			top:-$num*$hei,
			},700,function(){
			})
		}
	})
	$('.next').click(function(){
		if($num<($beishu-1)){
			$num++;
			$('.ralatedList').stop().animate({
			top:-$num*$hei,
		},700,function(){
		// $('.ralatedList').css("top",-$hei);
		})
		}else{
			$('.ralatedList').stop().animate({
			top:0
		},800,function(){
				$num=0;
			})
		}
	})

	})
	.done(function(){
		var $left=$('.pic_pre');
	var $right=$('.pic_next');
	var $len=$('.slide').children('li').length;
	var $wid=$('.slide').children('li').width();
	var $li=$('.slide').find('li');
	var $judge=true;
	 var $num=4;
	$right.click(function(){
		if($num<$len){
			// $('.slide').css("left","-94px");
			$('.slide').stop().animate({
				left:-$wid*($len-$num)
			}, 800,function(){
				$num++;
			})
			console.log(-$wid*($len-$num));	
		}
	})
	$left.click(function(){
		if($num>=$len){
			$('.slide').stop().animate({
				left:-0
			}, 800,function(){
				$num--
			})
		}
		console.log($num)
	})
	// $li.on("mouseenter",function(){
	// 	$('.pic').find('img').attr('src',($(this).children('img').attr('src').replace('46x46','418x418')))
	// })
	 $('.slide').on("mouseenter",'li',function(){
	 	$('.pic').find('img').attr('src',($(this).children('img').data('bigimg')));
	 	$('.img').html(`<img src='${$(this).children('img').data('bigimg')}'>`)
	 })
	})
}(jQuery)






// input效果
!function($){
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

//放大镜
!function($){	
	console.log($('.pic').offset());
	var $move=$('.move');
	var $scale=$('.fangda').width()/$('.fangda').find('.img').width();
	$('.pic').on("mouseenter",function(){
		$move.css({
			width:$scale*$('.pic').width(),
			height:$scale*$('.pic').height(),
			display:'block'
		})
		$sc=$('.pic').width()/$move.width();
		$('.fangda').css({
			display:'block',
			zIndex:22
		})
		.find('.img').css({
			display:'block',

		})
		$obj=$('.pic').offset();
	})
	.mousemove(function(event) {
		$x=event.pageX-$obj.left-$move.width()/2;
		$y=event.pageY-$obj.top-$move.height()/2;
		$x=$x<0?0:$x;
		$y=$y<0?0:$y;
		$x=$x>$('.pic').width()-$move.width()?$('.pic').width()-$move.width():$x;
		$y=$y>$('.pic').height()-$move.height()?$('.pic').height()-$move.height():$y;
		$move.css({
			left:$x,
			top:$y
		})
		$('.fangda').find('.img').css({
			left:-$x*$sc,
			top:-$y*$sc
		})
	})
	.mouseleave(function(){
		$move.css({
			display:'none'
		})
		$('.fangda').css({
			display:'none',
			zIndex:-1
		})
	});
}(jQuery);

//点击添加样式及数量增减
!function($){
	
	// $('.typeUl').on("click",'li',function(){
	// 	$(this).addClass('selectLi').siblings().removeClass('selectLi');
	// 	$(this).find('.selimg').css("display","block");
	// 	$(this).siblings().find('.selimg').css("display","none");

	// })
	$('.c_sub').click(function(){
		$num=$('.count').find('input').val();
		if($num==1){
			$('.quantitylimit').css("display","block");
			$('.quantitylimit').delay(1500).fadeOut();
			$('.tishi').html('<i></i>商品数量不能小于1');
			$('.tishi').find('i').css('background-position','-1px -1px')

		}else{
			$num--;
			$('.count').find('input').val($num);
		}
	})
	$('.c_add').click(function(){
		$num=$('.count').find('input').val();
		$num++;
		$('.count').find('input').val($num);
	})
}(jQuery);

//购物车小提示
!function(){
	$('.addToCart').click(function(){
		$('.tishi').html('<i></i>成功加入购物车');
		$('.tishi').find('i').css('background-position','-1px -38px')
		$('.quantitylimit').css("display","block");
		$('.quantitylimit').fadeOut()
	})
}(jQuery);

!function(){
	$('nav').find('li').eq(1).addClass('active');
}(jQuery)

//悬浮显示中图
!function(){
	// $('.hoverlook').css("display","block")
	$('.goods_assoc').on("mouseenter","li",function(){
		var $top=$(this).offset().top;
		$yaojian=$('.goods_assoc').offset().top+40;
		console.log($top);
		$('.hoverlook').css({
			display:"block",
			top:$top-$yaojian
		})
		$('.hoverlook .lp_title').html($(this).data('title'));
		$('.now_p').html('￥'+$(this).data('price'))
		$('.pre_p').html($(this).data('ori')+'元')
		$('.favNum').html($(this).data('fa'))
		$('.rightpart img').attr('src',$(this).data("img"));
		$('.rightpart a').attr('href',$(this).children('a').attr('href'))
	})
	.on("mouseleave",function(){
		$('.hoverlook').css({
			display:"none",
		});
	})
}()


//购物车
!function($){
    var $idarr=[];
    var $numarr=[];

    $('.addToCart').click(function(){
    	var $zhi=$('#goodsnum').val();
    	console.log(typeof($zhi))
        if($.cookie('proid')){					// $.cookie('pro',[5,6])  //5,6
            $idarr=$.cookie('proid').split(',') 	// console.log($.cookie('pro').split(','))  //[5,6]
        }
        if($.cookie('pronum')){
        	$numarr=$.cookie('pronum').split(',')
        }
        var $dizhi=window.location.search;
		var $reg=/\d/g;
		$proid=$dizhi.match($reg).join('');
		if($.inArray($proid,$idarr)!=-1){
			if($.cookie('pronum')==null){
				$numarr[$.inArray($proid,$idarr)]=$zhi;
				$.cookie('pronum',$numarr,{expires:7});
				$idarr[$.inArray($proid,$idarr)]=$proid;
				$.cookie('proid',$idarr,{expires:7});
			}else{
				$numarr[$.inArray($proid,$idarr)]=parseInt($numarr[$.inArray($proid,$idarr)])+parseInt($zhi);
				console.log($numarr)
    			$.cookie('pronum',$numarr,{expires:7});
    			console.log('重复了 ')
			}
		}else{
			$idarr.push(parseInt($proid));
			console.log($idarr);

			$.cookie('proid',$idarr,{expires:7});
			$numarr.push(parseInt($zhi));
			console.log($numarr)
			$.cookie('pronum',$numarr,{expires:7})
		}
    })

    
}(jQuery)