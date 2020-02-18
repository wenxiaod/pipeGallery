function ShowBoxTop(url, width, height) {
    layer.closeAll();
    $.layer({
        type: 2,
        shadeClose: true,
        title: false,
        closeBtn: [0, true],
        shade: [0.5, '#000'],
        fix: false,
        title: '',
        iframe: {
            src: url
        },
        area: [width + 'px', height + 'px']
    });
}
$(function() {

    $('#divCompany').hide();
    //SetUpdateHtml();//检测更新
    //ShowRecentPros();
    $(".select2").select2();
});
//定时扫描最近八小时是否有新的隐患上报(根据角色，系统管理员可以看全部，普通用户和燃气管理员可以看本公司)
function ShowRecentPros() {

    if ($.cookies.get("AlertNotice") != "0") {
        $.ajax({
            type: "post",
            url: "Pages/HttpRequest/Index.ashx",
            dataType: "text",
            data: {
                "Flag": "ShowCurPro"
            },
            error: function(xhr) {
                window.parent.common.layoutClose();
            },
            success: function(result) {
                if (result != "") {
                    ShowBoxTop('Pages/Domain/ShowCurPro.aspx', 980 * ($(window).width() / 1366), 550 * $(window).height() / 650);
                    setTimeout(function() {
                        ShowRecentPros()
                    }, 1000 * 60)
                }
            }
        });
    }
}

//设置系统更新提示
function SetUpdateHtml() {
    //$.ajax({
    //    type: "POST",
    //    data: "Flag=SetUpdateHtml",
    //    url: "Pages/HttpRequest/Index.ashx",
    //    dataType: "text",
    //    error: function (xhr) {
    //        $("#zhezhaoDefault").show();
    //    },
    //    success: function (data) {
    //        if (data == "true") {
    //            $("#zhezhaoDefault").hide();
    //        } else {
    //            $("#zhezhaoDefault").show();
    //        }
    //    }
    //});
}