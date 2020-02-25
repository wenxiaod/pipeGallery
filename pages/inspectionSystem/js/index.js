 /***************************
  *********1.多页面**********
  *********2.收起菜单按钮******
  ***************************/
 new Vue({
     el: "#leftNav",
     data() {
         return {
             imgSwitchStore: true,
             listPopupStore: false
         }
     },
     methods: {
         imgSwitch() {
             this.imgSwitchStore = !this.imgSwitchStore;
         },
         imgSwitch2() {
             this.listPopupStore = !this.listPopupStore;
         },
     },
 })

 /***************************
  *********1.隐患上报页面**********
  *********2.选择经纬度按钮*********
  ***************************/
 //弹出一个iframe层
 $('#mapChoose').on('click', function() {
     layui.use('layer', function() {
         var layer = layui.layer;
         layer.open({
             title: '点击选择经纬度',
             type: 2,
             area: ['700px', '500px'],
             fixed: false, //不固定
             maxmin: false, //禁用最大最小化按钮
             closeBtn: 2,
             shadeClose: true, //点击遮罩关闭层
             content: ['././pages/jwdMap.html', 'no']
         });
     });
 });

 /***************************
  *********1.新增巡检点页面**********
  *********2.选择经纬度按钮*********
  ***************************/
 //弹出一个iframe层
 $('#mapChooseXZXJD').on('click', function() {
     layui.use('layer', function() {
         var layer = layui.layer;
         layer.open({
             title: '点击选择经纬度',
             type: 2,
             area: ['700px', '500px'],
             fixed: false, //不固定
             maxmin: false,
             closeBtn: 2,
             shadeClose: true, //点击遮罩关闭层
             content: ['././pages/jwdMap.html', 'no']
         });
     });
 });

 /***************************
  *********1.隐患上报页面**********
  *********2.图片上传*********
  *********3.视频上传*********
  ***************************/
 layui.use('upload', function() {
     var $ = layui.jquery,
         upload = layui.upload;

     //普通图片上传
     var uploadInst = upload.render({
         elem: '#pictureYHSB',
         url: 'http://www.rst.com:8000/api/v1/inspection/hidden/addHidden' //改成您自己的上传接口
             ,
         before: function(obj) {
             //预读本地文件示例，不支持ie8
             obj.preview(function(index, file, result) {
                 $('#demo1').attr('src', result); //图片链接（base64）
             });
         },
         done: function(res) {
             //如果上传失败
             if (res.code > 0) {
                 return layer.msg('上传失败');
             }
             //上传成功
         },
         error: function() {
             //演示失败状态，并实现重传
             var demoText = $('#demoText');
             demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
             demoText.find('.demo-reload').on('click', function() {
                 uploadInst.upload();
             });
         }
     });
     upload.render({
         elem: '#videoYHSB',
         url: 'https://httpbin.org/post' //改成您自己的上传接口
             ,
         accept: 'video' //视频
             ,
         done: function(res) {
             layer.msg('上传成功');
             console.log(res)
         }
     });
 });
 /***************************
  *********1.新增巡检点页面**********
  *********2.图片上传*********
  ***************************/
 layui.use('upload', function() {
     var $ = layui.jquery,
         upload = layui.upload;

     //普通图片上传
     var uploadInst = upload.render({
         elem: '#pictureFZ',
         url: 'https://httpbin.org/post' //改成您自己的上传接口
             ,
         before: function(obj) {
             //预读本地文件示例，不支持ie8
             obj.preview(function(index, file, result) {
                 $('#demo1').attr('src', result); //图片链接（base64）
             });
         },
         done: function(res) {
             //如果上传失败
             if (res.code > 0) {
                 return layer.msg('上传失败');
             }
             //上传成功
         },
         error: function() {
             //演示失败状态，并实现重传
             var demoText = $('#demoText');
             demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
             demoText.find('.demo-reload').on('click', function() {
                 uploadInst.upload();
             });
         }
     });
 });

 /***************************
  *********1.所有页面**********
  *********2.Tab选项卡*********
  ***************************/
 layui.use('element', function() {
     var $ = layui.jquery,
         element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块
     //触发事件
     var active = {
         tabChange00: function() {
             element.tabChange('demo', '00'); //切换到：系统首页
         },
         tabChange11: function() {
             element.tabChange('demo', '11'); //切换到：隐患上报
         },
         tabChange12: function() {
             element.tabChange('demo', '12'); //切换到：隐患查询
         },
         tabChange13: function() {
             element.tabChange('demo', '13'); //切换到：责任区域
         },
         tabChange14: function() {
             element.tabChange('demo', '14'); //切换到：隐患类型
         },
         tabChange21: function() {
             element.tabChange('demo', '21'); //切换到：添加分组
         },
         tabChange22: function() {
             element.tabChange('demo', '22'); //切换到：班组管理
         },
         tabChange31: function() {
             element.tabChange('demo', '31'); //切换到：新增巡检点
         },
         tabChange32: function() {
             element.tabChange('demo', '32'); //切换到：巡检点查询
         },
         tabChange41: function() {
             element.tabChange('demo', '41'); //切换到：班组日志
         },
         tabChange42: function() {
             element.tabChange('demo', '42'); //切换到：填写工作日志
         },
         tabChange43: function() {
             element.tabChange('demo', '43'); //切换到：工作日志
         },
         tabChange51: function() {
             element.tabChange('demo', '51'); //切换到：任务指派
         },
         tabChange52: function() {
             element.tabChange('demo', '52'); //切换到：任务查询
         },
         tabChange61: function() {
             element.tabChange('demo', '61'); //切换到：指标管理
         },
         tabChange62: function() {
             element.tabChange('demo', '62'); //切换到：类型管理
         },
         tabChange71: function() {
             element.tabChange('demo', '71'); //切换到：线路管理
         },
         tabChange72: function() {
             element.tabChange('demo', '72'); //切换到：线路新增
         },
         tabChange81: function() {
             element.tabChange('demo', '81'); //切换到：巡检考核评估
         },
         tabChange82: function() {
             element.tabChange('demo', '82'); //切换到：巡检日历报表
         },
         tabChange83: function() {
             element.tabChange('demo', '83'); //切换到：隐患类型分析
         },
         tabChange84: function() {
             element.tabChange('demo', '84'); //切换到：隐患数量分析
         },
         tabChange85: function() {
             element.tabChange('demo', '85'); //切换到：隐患区域
         },
     };
     $('.site-demo-active').on('click', function() {
         var othis = $(this),
             type = othis.data('type');
         active[type] ? active[type].call(this, othis) : '';
     });
     //Hash地址的定位
     var layid = location.hash.replace(/^#test=/, '');
     element.tabChange('test', layid);
     element.on('tab(test)', function(elem) {
         location.hash = 'test=' + $(this).attr('lay-id');
     });

 });

 // Tab切换时移除默认项（首页）
 var btn11 = document.getElementById("btn11");
 var btn1 = document.getElementById("btn1");
 var btn2 = document.getElementById("btn2");
 var btn3 = document.getElementById("btn3");
 var btn4 = document.getElementById("btn4");
 var btn5 = document.getElementById("btn5");
 var btn6 = document.getElementById("btn6");
 var btn7 = document.getElementById("btn7");
 var btn8 = document.getElementById("btn8");
 //通过点击事件
 btn1.onclick = function() { $("#mainPage").addClass("mainPage"); }
 btn2.onclick = function() { $("#mainPage").addClass("mainPage"); }
 btn3.onclick = function() { $("#mainPage").addClass("mainPage"); }
 btn4.onclick = function() { $("#mainPage").addClass("mainPage"); }
 btn5.onclick = function() { $("#mainPage").addClass("mainPage"); }
 btn6.onclick = function() { $("#mainPage").addClass("mainPage"); }
 btn7.onclick = function() { $("#mainPage").addClass("mainPage"); }
 btn8.onclick = function() { $("#mainPage").addClass("mainPage"); }
 btn11.onclick = function() { $("btn11").addClass("active"); }


 //  var listPopupSel = document.getElementById("listPopupSel");
 //  listPopupSel.onclick = function() { $("#listPopup").addClass("listPopupSel"); }


 $(function() {
     //关闭弹窗
     $(document).on('click', '#closeBtn',
         function() {
             var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
             parent.location.reload(); //刷新父页面，注意一定要在关闭当前iframe层之前执行刷新
             parent.layer.close(index); //再执行关闭
         });
 });

 //  弹框区域
 layui.use('layer', function() { //独立版的layer无需执行这一句
     var $ = layui.jquery,
         layer = layui.layer; //独立版的layer无需执行这一句

     //触发事件
     var active = {
         setTop: function() {
             var that = this;
             //多窗口模式，层叠置顶
             layer.open({
                 type: 2, //此处以iframe举例
                 title: '添加类型',
                 area: ['1000px', '700px'],
                 shade: 0,
                 maxmin: false,
                 content: ['././pages/addClass.html', 'no'],
                 btn: ['确定', '取消'],
                 yes: function() {
                     layer.closeAll();
                 },
                 btn2: function() {
                     layer.closeAll();
                 },
                 zIndex: layer.zIndex, //重点1
                 success: function(layero) {
                     layer.setTop(layero); //重点2
                 }
             });
         },



     };

     $('#addClass').on('click', function() {
         var othis = $(this),
             method = othis.data('method');
         active[method] ? active[method].call(this, othis) : '';
     });

 });
 layui.use('layer', function() { //独立版的layer无需执行这一句
     var $ = layui.jquery,
         layer = layui.layer; //独立版的layer无需执行这一句

     //触发事件
     var active = {
         setTop: function() {
             var that = this;
             //多窗口模式，层叠置顶
             layer.open({
                 type: 2, //此处以iframe举例
                 title: '添加指标',
                 area: ['800px', '500px'],
                 shade: 0,
                 maxmin: false,
                 content: ['././pages/addIndex.html', 'no'],
                 btn: ['确定', '取消'],
                 yes: function() {
                     layer.closeAll();
                 },
                 btn2: function() {
                     layer.closeAll();
                 },
                 zIndex: layer.zIndex, //重点1
                 success: function(layero) {
                     layer.setTop(layero); //重点2
                 }
             });
         },



     };

     $('#addIndex').on('click', function() {
         var othis = $(this),
             method = othis.data('method');
         active[method] ? active[method].call(this, othis) : '';
     });

 });