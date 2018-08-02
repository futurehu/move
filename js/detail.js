$(function () {
  // ajax动态渲染 对应id的页面数据
  let id = location.search.split("=")[1];
  $.ajax({
    url: "../json/detail.json",
    type: "get",
    dataType: "json",
    success: function (result) {
      // console.log(result);
      for (var i = 0; i < result.length; i++) {
        if (id == result[i].id) {
          // console.log(result[i]);
          var item = result[i];
          var tags = result[i].arr;
          var imgArr = result[i].imgArr;
          // console.log(tags)
          var str = `<img src="${result[i].bannerImg}" alt="">`
          $("#fishImg").html(str);
          var str1 = `<p>${result[i].title}</p>`
          $("#fishImg").after(str1);
          var str2 = `<strong>${result[i].price}</strong>`
          $(".buy .price").html(str2);
          var str3 = `<span>门市价:${result[i].doorPrice}</span>`
          $(".buy .doorPrice").html(str3);
          var str4 = `<span>
          已售${result[i].saled}
        </span>`
          $(".tui .icon-yishou").after(str4);
          var str5 = `<h3>${result[i].shopTitle}</h3>
        <p>${result[i].shopaddress}</p>`
          $(".shopInfo .shopInfo-bottom-l").prepend(str5);
          // 模板引擎渲染 反馈部分
          var html = template("feedbackTmp", item);
          $(".feedback").html(html);
          // 模板引擎渲染  标签部分
          var html1 = template("tagTmp", {
            tags: tags
          })
          $(".comment .comment-bottom").html(html1);
          // 模板引擎  渲染点击后的轮播图部分
          var html3 = template("picDetail", {
            imgArr: imgArr
          })
          $(".swiper-wrapper").html(html3);
          // 获取购买元素 offsetTop 的距离
          var offsetTop = Math.ceil($(".buy").offset().top);
          // console.log(offsetTop); //710
          // 当页面滚动到一定程度 将价格信息固定住
          // 滚动事件
          $(window).on("scroll", () => {
            // console.log(this)
            var scrollTop = Math.ceil($(window).scrollTop());
            // console.log(scrollTop)
            if (scrollTop >= offsetTop) {
              $(".buy").addClass("current-price");
              $(".reduce").css("margin-top", "1.826667rem")
            }
            if (scrollTop < offsetTop) {
              $(".buy").removeClass("current-price");
              $(".reduce").css("margin-top", "0")
            }
            // console.log(value) //1616  多加一个判断条件 让toTop在 遮罩层出现的时候 消失
            if (scrollTop >= 1000 && ($("#mask").attr("style") != "display: block;")) {
              $("#toTop").show();
            } else {
              $("#toTop").hide();
            }
          })
        }
      };

    }
  })

  FastClick.attach(document.body);
  var istap = true;
  $('#nav').on("click", function () {
    if (istap) {
      $(".down").show().animate({
        "height": "2.133333rem"
      }, 50, 'linear')
      istap = false;
    } else {
      $(".down").animate({
        "height": 0
      }, 50, 'linear')
      istap = true;
    }
  })
  // 点击收藏之后的js效果

  $("#collect").on("click", function () {
    $(".down").animate({
      "height": 0
    }, 50, 'linear')
    istap = true;
    if ($("#change").text() == "收藏") {
      $(".pic .tipMes").stop().fadeIn().text("收藏成功").delay(1000).fadeOut().text("收藏成功");
      $("#change").text("取消收藏").css('transform', 'translateX(.266667rem)');
      $(".icon-shoucang").css("color", "black");
    } else {
      $(".pic .tipMes").stop().fadeIn().text("收藏取消").delay(1000).fadeOut().text("收藏取消");
      $("#change").text("收藏").css('transform', 'translateX(0)');
      $(".icon-shoucang").css("color", "");
    }
  })
  // toTop 注册点击事件
  $("#toTop").on("click", function () {
    $(window).scrollTop(0);
  })
  // 为电话注册点击事件
  $("#phone").on("click", () => {
    $("#toTop").hide();
    $("#mask").show();

    $(".call").animate({
      "bottom": "1.333333rem"
    }, 500, "easeOutBack")
  })
  $(".call .cancel").on("click", () => {
    $("#mask").hide();
    $("#toTop").show();
    $(".call").animate({
      "bottom": "-100%"
    }, 500, "easeOutBack")
  })
  // 点击图片 可以进行滑动的黑色背景
  $(".pic").on("click", function () {
    $(".cover").show();
    // 轮播图的初始化
    var mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: false,
      // 如果需要分页器
      pagination: '.swiper-pagination',
      paginationType: "fraction",
      observer: true
      // //修改swiper自己或子元素时，自动初始化swiper
      // observeParents: true
    })
  })
  $(".cover").on("click", () => {
    $(".cover").hide();
  })

});