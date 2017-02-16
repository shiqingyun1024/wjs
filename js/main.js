/* 
 * @authors Your Name (you@example.org)
 * @date    2016-12-26 10:41:18
 * @version $Id$
 */
 $(function(){
 	// 入口函数 当文档加载完成之后才会执行
 	function resize(){//这个函数整体的作用就是根据屏幕宽度的变化决定展示什么样的轮播图
 		// 1.先获取屏幕宽度
 	    var windowWidth = $(window).width();
 	    // 2.判断屏幕属于大还是小
 	    var isSmallScreen = windowWidth < 768;
 	    // 3.根据屏幕大小为每一个轮播图设置合适的背景
 	    $('#main-id > .carousel-inner > .item').each(function(i, item){//获取dom元素，然后遍历
 	    	var imgSrc = $(this).data(isSmallScreen?'image-xs':'image-lg');
 	    	// $(this).data()是一个函数，专门取元素上的自定义属性(data-image-xs，即data-xxxx),函数的参数是我们要取得属性名称(image-xs即xxx)
 	    	// console.log(1111);
 	    	// 设置背景图片
            $(this).css('background-image','url("'+ imgSrc +'")');
            // 我们需要小图时 ，尺寸能够等比例变化，所以小图时我们使用img的方式，大图使用背景图片的方式
            if(isSmallScreen){
            	$(this).html('<img src="'+imgSrc+'" alt="" />');
            	// 在这里之所以用html()，而不用append(),主要是两者的区别，html()是替换原来的内容，而append()
            	// 是添加追加，而屏幕的尺寸resize一直在变化，使用append会在里面添加很多张图片，而html只是一直替换而已，始终只有一张图片
            }
            else{
            	$(this).empty();
            }
 	       });
        // 控制产品推荐 所有选项卡的标题的宽度，让它出现滚动条,而且要放在function resize(){事件中，这样才会随着屏幕的变化而变化，不至于切换到手机屏幕上还得刷新
        var ulwidth = 30;//因为原来的ul中有padding-left的值
        $(".nav-tabs").children().each(function(i,ele){
             // 用js方式和jquery方式都一样，js方式：liwidth=ele.clientWidth
             // jquery方式：liwidth=$(ele).width();
             // 通过这两种方式让我认识到jquery只是js的一个库，在jquery中照样可以用js，不用转化
             ulwidth += ele.clientWidth;
        });
        // 首先判断ul的宽度是否大于屏幕的宽度，如果大于的话就立即出现滚动条
        if(ulwidth > $(window).width()){
           $(".nav-tabs")
              .css('width',ulwidth)
              .parent().css('overflow-x','scroll');     
        }       
        // 1.获取元素.
      $('#news .nav-stacked li a').on('click',function(){
       // 2 操作元素
       var title = $(this).data('title');
       $('.news-title').text(title);
      });     
 	    }
 	    $(window).on('resize',resize).trigger('resize');
 	    // trigger('resize')绑定响应事件，触发响应事件，让事件立刻触发一次
        $('[data-toggle="tooltip"]').tooltip();

      // 下面这段代码有点复杂，首先先理清思路，我想想思路该怎么写，好吧，开始
      // 这个有两种方法 这段代码的功能是让轮播图在移动端能够滑动，分两步
      // 第一步 先判断在屏幕上是往哪滑动
      // 第二步 然后设定轮播图的滑动方向
//     第一种方法 利用touch()函数包括touchstart，touchend，touchmove等等
      // 第一步
      // 获取界面上的轮播图容器
      var $carousels = $('.carousel');
      var startX, endX;
      var offset = 50;
      // 开始滑动事件
      $carousels.on('touchstart',function(e){
      //在开始滑动的时候先记录一个位置，不过记录位置有点复杂我还得验证一下
      // console.log(e);
         startX = e.originalEvent.touches[0].clientX;
         // 说实话这个e.originalEvent.touches[0].clientX;可不好想
      });
      $carousels.on('touchmove',function(e){
        //在结束滑动的时候记录一个位置，在touchmove中位置是一直在变的，所以这个值也一直在变，不过当离开的时候，取最后一个值
        endX = e.originalEvent.touches[0].clientX;
        // 所以凡是touch()函数获取位置，都可以用这种方式e.originalEvent.touches[0].clientX;
      });
      // 然后比较startX和endX值来确定往哪个方向滑动了
      // 第二步  滑动结束时 设定轮播图的滑动方向
      $carousels.on('touchend',function(e){
        // 指尖离开屏幕时为touchend
      var distance = Math.abs(endX - startX);
      if(distance > offset){
        // 根据获得到的方向选择上一张或者下一张
        // carousel()这个方法carousel(next)上一张，carousel(prev)下一张
         $(this).carousel(startX > endX ? 'next':'prev');
      }
      });

      // 第二钟方法
    // var OFFSET = 50;
    //   $('.carousel').each(function(i, item) {
    // var startX, endX;
    // item.addEventListener('touchstart', function(e) {
      // addEventListener 监听者事件
    //   startX = e.touches[0].clientX;
    //   e.preventDefault();
    // });
    // item.addEventListener('touchmove', function(e) {
    //   endX = e.touches[0].clientX;
    //   e.preventDefault();
    // });
    // item.addEventListener('touchend', function(e) {
    //   var offsetX = endX - startX;
    //   if (offsetX > OFFSET) {
        // 上一张
      //   $(this).carousel('prev');
      // } else if (offsetX < -OFFSET) {
        // 上一张
    //     $(this).carousel('next');
    //   }
    //   e.preventDefault();
    // });
  });



