// 点击二级菜单
$(function () {
  // 为元素绑定fastclick
  FastClick.attach(document.body);
  var istap = true;
  $('.search-home').on("click", function () {
    if (istap) {
      $(".down").show().animate({
        "height": "3.2rem"
      }, 50, 'linear')
      istap = false;
    } else {
      $(".down").animate({
        "height": 0
      }, 50, 'linear')
      istap = true;
    }
  })

  function move(num) {
    // 边框跟着移动的动画效果
    $(".login-method .line").animate({
      left: num
    }, 100, "ease-in-out")
  }

  // 写登录时点击不同登录方式的js效果
  $('#login-r').on('click', function () {
    if (!istap) {
      $(".down").animate({
        "height": 0
      }, 50, 'linear')
      istap = true;
    }
    // console.log(1);
    $(".mobile-login").hide();
    $(".email-login").show();
    move("4.8rem");
    $('#login-r span').addClass("current");
    $('#login-l span').removeClass("current");
  })
  $('#login-l').on('click', function () {
    // console.log(2);
    if (!istap) {
      $(".down").animate({
        "height": 0
      }, 50, 'linear')
      istap = true;
    }
    $(".email-login").hide();
    $(".mobile-login").show();
    move("0");
    $('#login-l span').addClass("current");
    $('#login-r span').removeClass("current");
  })

  function confire() {
    // 进行手机短信用户输入合法性的验证
    var reg = /^\d{11}$/;
    var mobilePhone = $(".email-login .mobile");
    if (reg.test(mobilePhone.val())) {
      $("#top .confir").addClass("yanzheng");
      $('.lg').removeAttr("disabled");
      $('.lg').removeClass('lg');
    } else {
      $("#top .confir").removeClass("yanzheng");
      $('.email-login  .btn').addClass('lg');
      $('.email-login .btn').attr("disabled", "disabled");

    }
    console.log(mobilePhone.val());
  }
  // 当键盘抬起时获取用户输入的字符长度
  $("#top input").on("keyup", function () {
    confire();
  })
  // 为点击input框注册事件
  $(".mobile-login input").on("focus", function () {
    $(this).addClass('bgc');
  })
  $(".mobile-login input").on("blur", function () {
    $(this).removeClass('bgc');
  })
  $("#top input").on("focus", function () {
    $(this).addClass('bgc');
    // confire();
  })
  $("#top input").on("blur", function () {
    $(this).removeClass('bgc');
  })
  //分别设置div在x和y方向的的初速度
  var speedX = 0;
  var speedY = 3;
  //获取div标签
  var div = document.getElementById("div");
  //获取按钮
  var btn = document.getElementById("btn");
  var slider;
  //定义点击事件
  btn.onclick = function () {
    if ($("#top .confir").hasClass('yanzheng')) {
      slider.restore();
      $("#div").css("top", 0);
      //  插件的修正
      $('.container .ft-slider').show().css("line-height", "1.066667rem");
      $('.container .ft-slider-bar').css({
        width: "1.066667rem",
        height: '1.066667rem'
      });

      $('#mask').show();

      startMove();
    }
  };
  //定义一个空的定时器，防止上次事件定时器的返回值叠加
  var timer = null;
  //定义点击事件函数
  function startMove() {
    //内部清空计时器，防止上次返回值叠加
    clearInterval(timer);
    //设置计时器
    timer = setInterval(function () {
      //竖直方向上反向运动时速度为负值，为了达到反弹逐渐速度逐渐减小的效果，可以在向下碰撞后速度加上一个正值
      speedY += 6;
      //分别获取div距离左边距和上边距的动态距离
      var iH = div.offsetTop + speedY;
      //获取div垂直方向运动的最大距离
      var h = Math.floor((document.documentElement.clientHeight - div.offsetHeight) / 2);
      //当动态高度达到div最大运动高度范围时，立刻转向速度，同时将x方向速度乘以0.8，使之速度逐渐减小
      if (iH >= h || iH <= 0) {
        speedY = -speedY;
        iH = h;
      }
      //由于div.style.left和div.style.top还储存这上一次或第一次的计时后的值，此次计时后应把新的值储存起来，使div出现动态效果
      div.style.top = iH + "px";
    }, 30);
  }

  slider = new FtSlider({
    id: "slider",
    width: "5.333333rem", //5.333333rem
    height: "1.066667rem", //.8rem
    callback: function (res) {
      // res返回验证结果
      console.log(res);
      if (res == true) {
        setTimeout(function () {
          $('#mask').hide(500);
        }, 1050)
        var timerId = null;
        var second = 61;
        // 发送验证码的框发生改变 并 开始 倒计时
        timerId = setInterval(function () {
          second--;
          $("#msg").removeAttr("disabled");
          if (second == 0) {
            $("#top .confir").text("再次发送验证码").addClass("yanzheng").removeClass("second");
            clearInterval(timerId);
            //逻辑错误
            return; //后面代码不执行  防止被覆盖
          }
          $("#top .confir").text(second + "  " + "秒").addClass("second").removeClass("yanzheng");
        }, 1000)
      }
    }
  });

});