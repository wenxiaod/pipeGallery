  //表单提交监听
  layui.use(['element', 'laydate', 'form', 'upload'], function() {
      var form = layui.form;
      form.on('submit(formDemo)', function(data) {
          layer.msg('提交中, 请稍后...', {
              icon: 16,
              shade: 0.01
          });
          subData.unitType = data.field.unittype;
          subData.industryProvince = data.field.industryProvince;
          //...
          //subData = {},先将表单其他内容存放在对象里
          if (isUpload) { //判断是否上传图片，触发图片的上传功能
              $("#hideupload1").trigger('click');
          } else { //没上传图片则顺序执行表单提交
              $.ajax({
                  type: "PUT",
                  url: "http://192.168.0.117:8000/api/v1/inspection/hidden/addHidden", //对应controller的URL
                  async: true,
                  contentType: 'application/json',
                  data: JSON.stringify(subData),
                  needToken: true,
                  success: function(result) {
                      layer.closeAll(); //关闭所有加载层
                      if (result.code == 200) {
                          layer.msg("提交审核成功", {
                              icon: 1
                          });
                          goBackCertificate();
                      } else if (result == '302') { //未登录或token过期
                          window.location.href = loginUrl;
                      }
                  },
                  error: function(result) {
                      layer.closeAll(); //关闭所有加载层
                      layer.msg("申请失败：" + result.responseJSON.message, {
                          icon: 10
                      });
                  }
              });
          }
          return false; //阻止表单跳转，非常必要！！！。
      })
  });
  //图片上传控件
  layui.use(['element', 'laydate', 'form', 'upload'], function() {
      form = layui.form;
      var upload = layui.upload;
      var uploadInst = upload.render({
          elem: '#upload1',
          url: "http://192.168.0.117:8000/api/v1/inspection/hidden/addHidden",
          acceptMime: 'image/*',
          field: "Filedata",
          auto: false, //不自动提交
          bindAction: "#hideupload1", //绑定真正提交的按钮
          size: 3072,
          // headers: {
          //     "Token": winStorage.token //验证用户token
          // },
          choose: function(obj) { //假上传，实际转为base64预览
              obj.preview(function(index, file, result) {
                  $('#imgPhoto').attr('src', result); //图片链接（base64）
              });
              isUpload = true; //判断是否已上传，用于表单提交中控制跳转
          },
          done: function(obj) {
              if (obj.success) {
                  subData.photoPath = obj.url;
                  $.ajax({
                      type: "PUT",
                      url: baseAjaxUrl + "/fmOperateDeclareRecords/front_login", //对应controller的URL
                      async: true,
                      contentType: 'application/json',
                      data: JSON.stringify(subData),
                      needToken: true,
                      success: function(result) {
                          layer.closeAll(); //关闭所有加载层
                          if (result.code == 200) {
                              layer.msg("提交审核成功", {
                                  icon: 1
                              });
                              goBackCertificate();
                          } else if (result == '302') { //未登录或token过期
                              window.location.href = loginUrl;
                          }
                      },
                      error: function(result) {
                          layer.closeAll(); //关闭所有加载层
                          layer.msg("申请失败：" + result.responseJSON.message, {
                              icon: 10
                          });
                      }
                  });
              } else {
                  layer.msg("上传失败", {
                      icon: 10
                  });
              }
          },
          error: function(obj) {
              layer.msg("上传失败", {
                  icon: 10
              });
          }
      });
  });