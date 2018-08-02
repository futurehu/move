// 发送ajax请求 动态创建标签
$(function () {
  function render(result) {
    $.each(result, function (index, value) {
      str =
        `<li>
              <a href="">
                  <span class="${value.bgc}">
                      <i class="iconfont ${value.class}"></i>
                  </span>
                  <span>${value.title}</span>
              </a>
          </li>`
      if (value.id == 1) {
        $(str).appendTo($('.swiper-slide>.first'));
      } else {
        $(str).appendTo($('.swiper-slide>.second'));
      }
      // console.log(value)
    })
  }
  $.ajax({
    type: 'get',
    url: '../api/readData.php',
    dataType: 'json',
    success: function (res) {
      // console.log(res);
      var result = res.data;
      render(result);
    }
  })
  //请求items数据
  $.ajax({
    type: 'get',
    url: '../json/items.json',
    dataType: 'json',
    success: function (result) {
      console.log(result);
      // 循环遍历动态添加
      $.each(result, function (index, val) {
        // console.log(val.id)
        str1 =
          ` <div class="items">
  <a href="detail.html?id=${val.id}" class="clearfix">
      <div class="item-l">
          <img src="${val.img_src}" alt="">
      </div>
      <div class="item-r">
          <div class="top">
              <h3>${val.h3}</h3>
              <span>${val.span}</span>
          </div>
          <div class="bottom">
              <strong>${val.strong}</strong>
              <sub>新客减10</sub>
              <span class="f-r">${val.sale}</span>
          </div>

      </div>
  </a>
</div>`
        $('.like').after($(str1));
      })
    }
  })
  // 轮播图初始化
  var mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: false,
    // 如果需要分页器
    pagination: '.swiper-pagination',
    speed: 200
    // observer: true, //修改swiper自己或子元素时，自动初始化swiper
    // observeParents: true,
  })
})