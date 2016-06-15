# delayer
图片延迟加载

使用方法
引入js
    var delayer = new delayer ({
      'target' : 'body',    // 要延迟加载的区域
     'source' : 'data-source', //获取原图片的属性
     'fixed' : 'data-fixed' //是否需要自适应的获取属性
  });
说明
  <img src="默认图片" data-source="要显示的图片" data-fixed="是否根据父级自适应图片" />
自适应说明
img标签必须有父级标签包裹，父级标签需要设置position:absoute; img标签必须设置position:absolute;
