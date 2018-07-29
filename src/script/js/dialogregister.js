//登录注册
! function($) {
    //登录注册 效果
    var $dialog = $('.dialog');
    var $login = $('#login-area');
    var $register = $('#register-area');
    var $zhezhao = $('.zhezhao');
    $('.ico_close').click(function() {
        $dialog.fadeOut();
        $zhezhao.css("display", "none");

    });
    $('.login').click(function() {
        $zhezhao.css("display", "block");
        $dialog.fadeIn();

    })
    $('.login-tab a').click(function() {
        $(this).addClass('login-active').siblings().removeClass('login-active')
    })
    $('.login-tab a:first').click(function() {
        $login.css("display", "block").next().css("display", "none")
    })
    $('.login-tab a:last').click(function() {
        $register.css("display", "block").prev().css("display", "none")
    })
    $('.area-code-content').click(function() {
        $('.code-list').css("display", "block");
        return false;
    })
    $dialog.click(function() {
        $('.code-list').css("display", "none");
    })
}(jQuery)

//地区选择
;(function($){
    $('.code-list').on('click','li',function(){
        $(this).parent().prev().html($(this).data('name'))
        $('.code-list').css('display','none');
        return false
    })
})(jQuery)

//登录
! function($) {
    var $tips = $('#login-form .login-error-tips');
    $('#login-form .login-submit').click(function() {
        var $phone = $("#login-form .login-text-long:first").val();
        var $userpass = $('#login-form .login-text-long:last').val();
        var $logincheck = $('.login-auto input');
        $.ajax({
                url: 'php/login.php',
                type: 'POST',
                data: {
                    phone: $phone,
                    userpass: $userpass
                },
            })
            .done(function(arg) {
                if (arg == 0) {
                    $tips.html('用户名不存在');
                }
                if (arg == 2) {
                    $tips.html('密码不正确');
                }
                if (arg == 1) {
                    $tips.html('');
                    if ($logincheck.prop('checked') == true) {
                        $.cookie('user', $phone, {
                            expires: 1,
                        })
                        $.cookie('pass', $userpass, {
                            expires: 1,
                        })
                         location.reload()

                    } else {
                        $('.dialog').css('diplay','none');
                        $('.mine a:first').css('display', 'none');
                        var $hover = $('.user_hover');
                        $hover.css("display", 'block');
                        $hover.children().first().html($phone);
                        $hover.mouseenter(function() {
                            $('.info_box').css('display', 'block');
                        }).mouseleave(function() {
                            $('.info_box').css('display', 'none');
                        })
                        $('.info_box').on('mouseenter', '.ccc', function() {
                            $(this).children().css('color', '#ff2c72').parent().siblings().children().css('color', '#979798')
                        }).mouseleave(function() {
                            $('.ccc').children().css('color', '#979798')
                        })
                    }

                }
            })
            .fail(function() {
                console.log("error");
            });
        return false;
    })
}(jQuery)

//表单验证
// $().ready(function() {
//     $('#register-form').validate({
//         rules: {
//             mobile: {
//                 required: true,
//             },
//              pass: {
//                 required: true,
//                 rangelength: [6, 20]
//             },
//         },
//         messages: {
//             mobile: {
//                 required: '请输入正确的手机号'
//             },
//             pass: {
//                 required: '密码为6-20位字符支持大小写',
//                 rangelength: '密码为6-20位字符支持大小写'
//             }
//         },
//         debug: true,
//         errorPlacement: function(error, element) {
//             error.appendTo($('#register-form .login-error-tips'));
//             //$('.login-error-tips').children().first().css('display','block').siblings().css('display','none')
//         }
//     })
// })
! function($) {
    //

    var $tips = $('#register-form .login-error-tips');
    var $submit = $('#register-form .login-submit');
    $submit.click(function() {
        var judge = false;
        var $phone = $('#dialog-mobile').val();
        var $pass = $('#dialog-password').val();
        var $length = $phone.length;
        var $mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
        if ($length == 11 && $mobile.test($phone)) {
            var $password = /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+){6,20}$/;
            if ($password.test($pass)) {
                $tips.html('');
                if ($('.login-get-code').val() == $('.login-text-short').val()) {
                    judge = true;
                } else {
                    $tips.html('验证码错误');
                }
            } else {
                $tips.html('密码为6-20位字符支持大小写')
            }
        } else {
            $tips.html('请输入正确的手机号')
        }


        //注册 插数据
        if (judge) {
            $.ajax({
                    url: 'php/reg.php',
                    type: 'POST',
                    data: {
                        phone: $('#dialog-mobile').val(),
                        userpass: $('#dialog-password').val()
                    },
                })
                .done(function(arg) {
                    if (arg == 1) {
                        $tips.html('该手机号码已注册')
                    }
                    if (arg == 3) {
                        $('#login-area').css("display", "block").next().css("display", "none");
                        $('.login-tab a:first').addClass('login-active').siblings().removeClass('login-active');
                        $('#dialog-mobile').val('');
                        $('#dialog-password').val('');
                        $('.login-text-short').val('');
                        $('.login-get-code').click()
                    }
                })
                .fail(function() {
                    console.log("error");
                })

        }
    })
    //验证码
    $('.login-get-code').click(function() {
        function random() {
            return (Math.floor(Math.random() * 10)).toString()
        }
        $(this).val(random() + random() + random() + random())
    })

}(jQuery)

//登录后信息显示
! function($) {
    if ($.cookie('user') && $.cookie('user') != 'null') {
        $('.mine a:first').css('display', 'none');
        var $hover = $('.user_hover');
        $hover.css("display", 'block');
        $hover.children().first().html($.cookie('user'));
        $hover.mouseenter(function() {
            $('.info_box').css('display', 'block');
        }).mouseleave(function() {
            $('.info_box').css('display', 'none');
        })
        $('.info_box').on('mouseenter', '.ccc', function() {
            $(this).children().css('color', '#ff2c72').parent().siblings().children().css('color', '#979798')
        }).mouseleave(function() {
            $('.ccc').children().css('color', '#979798')
        })
    }
}(jQuery);

//退出键
(function($) {
    $('.exit').click(function() {
        $.cookie('user', null);
        $.cookie('pass', null);
        location.reload();
        return false
    })

}(jQuery))

//二维码显示效果
! function($) {
    var $sina = $('.head li:eq(0)');
    var $weixin = $('.head li:eq(1)');
    var $popsina = $('.popsina');
    var $popweixin = $('.popweixin');

    function enter(arg) {
        arg.css({
            'display': 'block',
            "top": "30px",
            "width": "135px",
            "padding": "0 10px",
            "background": "#fff",
            "zIndex": "2"
        });
    }

    function leave(arg) {
        arg.css('display', 'none');
    }
    $sina.mouseenter(function() {
        enter($popsina);
        $(this).css("background", "#fff")
    }).mouseleave(function() {
        $(this).css("background", "#1c1d1e");
        leave($popsina)
    })
    $weixin.mouseenter(function() {
        enter($popweixin);
        $(this).css("background", "#fff")
    }).mouseleave(function() {
        $(this).css("background", "#1c1d1e");
        leave($popweixin)
    })
}(jQuery);