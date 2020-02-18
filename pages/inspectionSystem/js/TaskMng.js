var TaskMng = {
    PageCount: 0,
    PageIndex: 0,
    PageSize: 10,
    IsFirst: true,
    Search: function() {
        if (!Validate.CheckBeginAndEndTime($("#BeginTime").val(), $("#EndTime").val())) {
            layer.msg("开始时间不能大于结束时间", {
                icon: 7,
                time: 1000
            });
            return;
        }
        $.ajax({
            type: 'post',
            url: '../../Pages/HttpRequest/TaskSearch.ashx',
            dataType: 'text',
            data: "flag=SearchTask&BeginTime=" + $("#BeginTime").val() + "&EndTime=" + $("#EndTime").val() + "&StartIndex=" + (TaskMng.PageSize * TaskMng.PageIndex + 1) + "&EndIndex=" + TaskMng.PageSize * (TaskMng.PageIndex + 1) + "&TaskTitle=" + $("#TaskTitle").val() + "&Worker=" + $("#Worker").val() + "&JustShowCircleTask=" + $("#JustShowCircleTask")[0].checked + "&companyId=" + $('#companySelect').val(),
            error: function() {},
            success: function(data) {
                if (data != "") {
                    var obj = eval('(' + data + ')');
                    if (obj.sum == 0) {
                        layer.msg("未找到数据", {
                            icon: 7,
                            time: 1000
                        });
                        $("#TaskTable tbody").html("");
                        $("#DivPager").hide();
                        return;
                    }
                    TaskMng.PageCount = Math.ceil(obj.sum / 10);
                    $("#TaskTable tbody").html(obj.data);
                    $("#DivPager").show();
                    $("#count").text(obj.sum);
                    if (TaskMng.IsFirst) {
                        TaskMng.SetPaginnation(TaskMng.PageCount);
                    }
                } else {
                    layer.msg("未找到数据", {
                        icon: 7,
                        time: 1000
                    });
                    $("#TaskTable tbody").html("");
                    $("#DivPager").hide();
                }
            }
        });
    },
    userHistorySet: function() {
        if ($("#Worker").val() == null || $("#Worker").val() == "0" || $("#Worker").val().length == 0) {
            $("#userHistorySet").html("");
            return;
        }
        $("#userHistorySet").html("<td><h3>加载中。。。</h3></td>");
        $.ajax({
            type: 'post',
            url: '../../Pages/HttpRequest/TaskSearch.ashx',
            dataType: 'text',
            data: "flag=userHistorySet&Worker=" + $("#Worker").val() + "&BeginTime=" + $("#BeginTime").val() + "&EndTime=" + $("#EndTime").val(),
            error: function() {
                layer.msg("请求错误", {
                    icon: 2,
                    time: 1000
                });
            },
            success: function(data) {
                $("#userHistorySet").html(data);
            }
        });
    },
    TransToHistory: function(obj) { //工单路径回放
        window.location.href = "APathPlayBack.aspx?taskcode=" + $(obj).parents("tr").children().first().text();
    },
    TransToRealTime: function(obj) { //工单实况查询
        window.location.href = "ARealTimePosition.aspx?taskcode=" + $(obj).parents("tr").children().first().text();
    },
    SetPaginnation: function(pageCount) {
        $("#DivPagination").pagination(pageCount, {
            callback: PageCallback,
            prev_text: '上一页', //上一页按钮里text
            next_text: '下一页', //下一页按钮里text
            items_per_page: TaskMng.PageIndex, //显示条数
            num_display_entries: 2, //连续分页主体部分分页条目数
            current_page: TaskMng.PageIndex, //当前页索引
            num_edge_entries: 2 //两侧首尾分页条目数
        });
        //翻页调用
        function PageCallback(index, jq) {
            TaskMng.PageIndex = index;
            if (!TaskMng.IsFirst) {
                TaskMng.Search();
            } else {
                TaskMng.IsFirst = false;
            }
        }
    },
    //查看详细
    ShowDetail: function(obj) {
        var Code = $(obj).parents("tr").children("td:first").text();
        window.sopTop.ShowBoxTop("Pages/Domain/PrintTask.aspx?code=" + Code, $(window).width() * 0.75, $(window).height() * 0.9);
    },
    //删除工单
    DeleteTask: function(obj) {
        layer.confirm("删除工单将删除该工单的所有数据，是否继续？？", function() {
            var Code = $(obj).parents("tr").children("td:first").text();
            $.ajax({
                type: 'post',
                url: '../../Pages/HttpRequest/TaskSearch.ashx',
                dataType: 'text',
                data: "flag=TaskDelete&Code=" + Code,
                error: function() {
                    layer.msg("请求失败，请稍后再试", {
                        icon: 2,
                        time: 1000
                    });
                },
                success: function(data) {
                    if (data.indexOf('成功') > -1) {
                        layer.msg(data, {
                            icon: 1,
                            time: 1000
                        });
                        TaskMng.Search();
                    } else {
                        layer.msg(data, {
                            icon: 2,
                            time: 1000
                        });
                    }
                }
            });
        })
    },
    FinishTask: function(obj) {
        layer.confirm("是否要手动完成工单？", function() {
            var Code = $(obj).parents("tr").children("td:first").text();
            $.ajax({
                type: 'post',
                url: '../../Pages/HttpRequest/TaskSearch.ashx',
                dataType: 'text',
                data: "flag=FinishTask&Code=" + Code,
                error: function() {
                    layer.msg("请求失败，请稍后再试", {
                        icon: 2,
                        time: 1000
                    });
                },
                success: function(data) {
                    if (data.indexOf('成功') > -1) {
                        layer.msg(data, {
                            icon: 1,
                            time: 1000
                        });
                        TaskMng.Search();
                    } else {
                        layer.msg(data, {
                            icon: 7,
                            time: 1000
                        });
                    }
                }
            });
        })
    },
    RestCircleTask: function(obj) {
        layer.confirm("是否要取消工单周期执行？", function() {
            var Code = $(obj).parents("tr").children("td:first").text();
            $.ajax({
                type: 'post',
                url: '../../Pages/HttpRequest/TaskSearch.ashx',
                dataType: 'text',
                data: "flag=RestCircleTask&Code=" + Code,
                error: function() {
                    layer.msg("请求失败，请稍后再试", {
                        icon: 2,
                        time: 1000
                    });
                },
                success: function(data) {
                    if (data.indexOf('成功') > -1) {
                        layer.msg(data, {
                            icon: 1,
                            time: 1000
                        });
                        TaskMng.Search();
                    } else {
                        layer.msg(data, {
                            icon: 7,
                            time: 1000
                        });
                    }
                }
            });
        })
    },
    //查看操作记录
    ShowOperRecord: function() {
        var Code = $("#TaskCode").text();
        $.ajax({
            type: 'post',
            url: '../../Pages/HttpRequest/Index.ashx',
            dataType: 'text',
            data: "flag=ShowRecord&TaskId=" + Code,
            error: function() {
                layer.msg("请求失败，请稍后再试！", {
                    icon: 2,
                    time: 1000
                });
            },
            success: function(data) {
                if (data != "") {
                    $("#popDiv .header").text("操作记录");
                    $("#popDiv").jqm({
                        modal: true,
                        overlay: 40,
                        onShow: function(h) {
                            h.w.fadeIn(500);
                        },
                        onHide: function(h) {
                            h.o.remove();
                            h.w.fadeOut(500)
                        }
                    }).jqmAddClose("#popClose");
                    $("#systemPrompts").html("<div  style='width:500px; height:350px; overflow:auto'>" + data + "</div>");
                    $("#popDiv").jqmShow();
                    $("#txtCacheTime").focus();
                } else {
                    layer.msg("无操作记录！", {
                        icon: 7,
                        time: 1000
                    });
                }
            }
        });
    },
    ShowRemarks: function() {
        var Code = $("#TaskCode").text();
        $.ajax({
            type: 'post',
            url: '../../Pages/HttpRequest/TaskSearch.ashx',
            dataType: 'text',
            data: "flag=ShowRemarks&TaskCode=" + Code,
            error: function() {
                layer.msg("请求失败，请稍后再试！", {
                    icon: 2,
                    time: 1000
                });
            },
            success: function(data) {
                if (data != "") {
                    $("#popDiv .header").text("操作记录");
                    $("#popDiv").jqm({
                        modal: true,
                        overlay: 40,
                        onShow: function(h) {
                            h.w.fadeIn(500);
                        },
                        onHide: function(h) {
                            h.o.remove();
                            h.w.fadeOut(500)
                        }
                    }).jqmAddClose("#popClose");
                    $("#systemPrompts").html("<div  style='width:500px; height:350px; overflow:auto'>" + data + "</div>");
                    $("#popDiv").jqmShow();
                    $("#txtCacheTime").focus();
                } else {
                    layer.msg("暂无备注！", {
                        icon: 7,
                        time: 1000
                    });
                }
            }
        });
    },
    NoramlSearch: function() {
        if ($("#BeginTime").val().length == 0 || $("#EndTime").val().length == 0) {
            layer.msg("时间不能为空", {
                icon: 7,
                time: 1000
            })
            return;
        }
        if ($("#SuperSearchDiv").css("display") == "none") {
            TaskMng.IsFirst = true;
            this.PageCount = 0;
            this.PageIndex = 0;
            TaskMng.Search();
        } else {
            if ($("#StartEndTime").val().length == 0 || $("#EndEndTime").val().length == 0) {
                layer.msg("时间不能为空", {
                    icon: 7,
                    time: 1000
                })
                return;
            }
            $("#SuperSearchDiv").removeClass("com_disnone");
            TaskMng.BeginSuperSearch();

        }
    },
    SuperSetPaginnation: function(pageCount) {
        $("#DivPagination").pagination(pageCount, {
            callback: PageCallback,
            prev_text: '上一页', //上一页按钮里text
            next_text: '下一页', //下一页按钮里text
            items_per_page: TaskMng.PageIndex, //显示条数
            num_display_entries: 2, //连续分页主体部分分页条目数
            current_page: TaskMng.PageIndex, //当前页索引
            num_edge_entries: 2 //两侧首尾分页条目数
        });
        //翻页调用
        function PageCallback(index, jq) {
            TaskMng.PageIndex = index;
            if (!TaskMng.IsFirst) {
                TaskMng.SuperSearch();
            } else {
                TaskMng.IsFirst = false;
            }
        }
    },
    ShowSuperSearch: function(obj) {
        if ($(obj).val() == "高级") {
            $("#SuperSearchDiv").show();

            $(obj).val("收起");
        } else {
            $("#SuperSearchDiv").hide();
            $(obj).val("高级");
        }
    },
    BeginSuperSearch: function() {
        this.PageCount = 0;
        this.PageIndex = 0;
        TaskMng.IsFirst = true;
        TaskMng.SuperSearch();
    },
    SuperSearch: function() {


        $.ajax({
            type: 'post',
            url: '../../Pages/HttpRequest/TaskSearch.ashx',
            dataType: 'text',
            data: "flag=SuperSearch&Worker=" + $("#Worker").val() + "&TaskType=" +
                $("#TaskType").val() + "&Begin=" + $("#BeginTime").val() + "&End=" +
                $("#EndTime").val() + "&StartIndex=" + (TaskMng.PageSize * TaskMng.PageIndex + 1) +
                "&EndIndex=" + TaskMng.PageSize * (TaskMng.PageIndex + 1) +
                "&TaskTitle=" + $("#TaskTitle").val() +
                "&Creator=" + $("#Creator").val() +
                "&StartEndTime=" + $("#StartEndTime").val() +
                "&EndEndTime=" + $("#EndEndTime").val() +
                "&JustShowCircleTask=" + $("#JustShowCircleTask")[0].checked +
                "&companyId=" + $('#companySelect').val(),
            error: function() {
                layer.msg("请求失败，请稍后再试！", {
                    icon: 2,
                    time: 1000
                });
            },
            success: function(data) {
                if (data != "") {
                    var obj = eval('(' + data + ')');
                    if (obj.sum == 0) {
                        layer.msg("未找到数据！", {
                            icon: 7,
                            time: 1000
                        });
                        $("#TaskTable tbody").html("");
                        $("#DivPager").hide();
                        var a = "onclick=''";
                        return;
                    }
                    TaskMng.PageCount = Math.ceil(obj.sum / 10);
                    $("#TaskTable tbody").html(obj.data);
                    $("#DivPager").show();
                    $("#count").text(obj.sum);
                    if (TaskMng.IsFirst) {
                        TaskMng.SuperSetPaginnation(TaskMng.PageCount);
                    }
                } else {
                    layer.msg("未找到数据！", {
                        icon: 7,
                        time: 1000
                    });
                    $("#TaskTable tbody").html("");
                    $("#DivPager").hide();
                }
            }
        });
    },
    Shenhe: function(taskCode) {
        //var html = "<div style='width:90%;height:100%;text-align:center;line-height:50px;margin:0px auto;'>";
        //html += "<div>审核意见</div><div><textarea id='workDesc' class='form-control' rows='5' cols=''></textarea></div>";
        //html += "<div>是否通过</div><div><input type='radio' value='0' name='yesOrno' checkbox>否 <input type='radio' value='1' name='yesOrno'>是 </div>";
        //html += "<div><input id='btnSearch' style='border-radius: 0px !important;' type='button' value='确定' class='btn btn-sm query btn-primary btn_query' onclick='javascript: alert('" + taskCode + "')' /></div>";
        //html += "</div>";
        var html = "<div style='margin:0px auto;'><div class='modal-header modalTitle' style='margin-bottom: 15px;'><button type='button' class='close popClose' onclick='closeall();' data-dismiss='modal' aria-hidden='true'>×</button> <h4 class='modal-title text-center'>审核</h4></div>";
        html += "<table class='table com_w100pen ' style='width:100%;'> ";
        html += "<tbody>";
        html += " <tr><td class='com_w15pen  ' style='height:50px;text-align:right;'>状态:</td> <td> <select id='Workstatus' class='form-control' style='width:20%;'> <option value='0'> 审核不通过</option> <option value='1'> 审核通过</option>    </select> </td>     </tr>   ";
        html += " <tr><td class='com_TextRight'>审核意见</td>  <td><textarea cols='52' class='form-control' rows='7' id='Workdesc' style='height: 240px; width: 800px; resize: none; font-size: 12px;' maxlength='100'></textarea></td></tr></tbody></table>";
        html += "<div style='width:100%;text-align:center;'><input style='float:center !imporant;' type='button' value='保存' class='btn btn-primary' onclick='TaskMng.UpdateWorkStatus(\"" + taskCode + "\");' style='height:35px;width:130px;'></div></div>";
        layer.open({
            type: 1,
            skin: 'layui-layer-rim b-r-10',
            title: false,
            area: ['980px', '446px'],
            shade: 0.8,
            closeBtn: 1,
            content: html
        });
    },
    UpdateWorkStatus: function(taskCode) {
        if ($("#Workstatus").val() == 0) {
            if ($("#Workdesc").val().length == 0) {
                layer.msg("审核未通过请说明理由", {
                    icon: 7,
                    time: 1000
                });
                return false;
            }
        }

        $.ajax({
            type: 'post',
            url: '../../Pages/HttpRequest/TaskSearch.ashx',
            dataType: 'text',
            data: { "flag": "UpWorkinfoStatus", "taskCode": taskCode, "workStatus": $("#Workstatus").val(), "workDesc": $("#Workdesc").val(), },
            error: function() {
                layer.msg("请求失败，请稍后再试！", {
                    icon: 2,
                    time: 1000
                });
            },
            success: function(data) {
                if (data == "True") {
                    layer.msg("提交成功", {
                        icon: 7,
                        time: 1000
                    });
                } else {
                    layer.msg("未找到数据！", {
                        icon: 7,
                        time: 1000
                    });
                }
                setTimeout(function() {
                    layer.closeAll();
                    TaskMng.Search();
                }, 1000);
            }
        });
    }
}

function closeall() {
    layer.closeAll();
}
//$(function () {
//    PlayBack.GetUserList(); //获取用户列表

//});