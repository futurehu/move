$(function () {
  $('.search-bar>input').on('focus', function () {
    $('.content').hide();
  })
  var keyArr = [];
  // 判断有没有储存的搜索历史
  if(localStorage.getItem("keyWords")){
    keyArr=JSON.parse(localStorage.getItem("keyWords"));
    // 数组中存有 所有的搜索历史
    var html=template("historyTmp",{result:keyArr});
    $(html).prependTo($("#search-history"));
    console.log(keyArr)
  }
  // 搜索历史的js
  $("#searchBtn").on("click", () => {

    var keyWords = $("input[type=text]").val();
    if (keyWords) {
      // 每搜索一次 将搜索关键字放在数组里
      keyArr.push(keyWords);
      // console.log(keyArr);
      // 将数组形式的字符串存放在localStorage
      localStorage.setItem("keyWords", JSON.stringify(keyArr));
      location.href="detail.html?keyWords="+keyWords;

    } else {
      alert("请输入关键词");
    }

  })
  // 点击清除搜索历史
  $("#clearHis").on("click",()=>{
    // alert("message")
    // 进行 页面元素的清理  和本地存储的清理
    $("#search-history").html("");
    localStorage.removeItem("keyWords");

  })
})