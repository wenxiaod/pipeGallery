layui.use(['form', 'layer', 'table'], function() {
    var table = layui.table;
    // var table1 = layui.table;
    // var table2 = layui.table;
    // var form = layui.form;
    var $ = layui.$;
    table.render({
        elem: '#demoYHCX', //绑定table id
        url: 'http://www.rst.com:8000/api/v1/inspection/hidden/getHiddenByItem', //数据请求路径，
        cellMinWidth: 80,
        cols: [
            [
                { field: 'hiddenTitle', title: '隐患标题' },
                { field: 'picture', title: '隐患快照' },
                { field: 'video', title: '隐患视频' },
                { field: 'reporter', title: '隐患上报人' },
                { field: 'hiddenType', title: '隐患类型' },
                { field: 'riskGrade', title: '隐患等级' },
                { field: 'description', title: '隐患描述' },
                { field: 'pipeGallery', title: '区域(管廊)' },
                { field: 'pipeAxle', title: '区域(管轴)' },
                { field: 'areaManager', title: '区域负责人' },
                { field: 'reportDate', title: '上报日期' },
                { field: 'auditToEmergency', title: '审核至应急' },
                { field: 'rectificationStatus', title: '整改状态' },
                { fixed: 'right', align: 'center', title: '操作', toolbar: '#handleButtons', width: 200 }
            ]
        ],
        id: 'testReload',
        page: true,
        limit: 10, //默认十条数据一页
        limits: [10, 20, 30, 50] //数据分页条
    });
    // 搜索-------------
    var $ = layui.$,
        active = {
            reload: function() {
                // 隐患标题：
                var hiddenTitle_SS = $('#hiddenTitle_SS');
                // 隐患类型：
                var YHCX_xiala = $('#YHCX_xiala');
                // 整改状态：
                var YHCX_ZT = $('#YHCX_ZT');
                // 应急审核：
                var YHCX_YJSH = $('#YHCX_YJSH');
                // 应急上报人：
                var YHSBR_xiala = $('#YHSBR_xiala');
                // 区域负责人：
                var YHCX_QYFZR = $('#YHCX_QYFZR');
                // 管廊：
                var YHCX_GL = $('#YHCX_GL');
                // 管轴：
                var YHCX_GZ = $('#YHCX_GZ');
                // 上报时间：
                var timeStartYHCX = $('#timeStartYHCX');


                //执行重载
                table.reload('testReload', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        hiddenTitle: hiddenTitle_SS.val(),
                        hiddenType: YHCX_xiala.val(),
                        rectificationStatus: YHCX_ZT.val(),
                        auditToEmergency: YHCX_YJSH.val(),
                        reporter: YHSBR_xiala.val(),
                        areaManager: YHCX_QYFZR.val(),

                        pipeGallery: YHCX_GL.val(),
                        pipeAxle: YHCX_GZ.val(),
                        reportDate: timeStartYHCX.val(),

                    }
                });
            }
        };

    $('#YHCXSSclick').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });





    table.render({
        elem: '#demoZRQY' //绑定table id
            ,
        url: '/Equipment/getEquipmentByItem' //数据请求路径，
            ,
        cellMinWidth: 80,
        cols: [
            [
                // 字段名根据实际情况更改
                { field: 'title', title: '管廊', width: 300, align: "center" },
                { field: 'picture', title: '管轴', width: 300, align: "center" },
                { field: 'video', title: '负责人', width: 300, align: "center" },
                { field: 'use', title: '账号', width: 300, align: "center" },
                { fixed: 'right', align: 'center', title: '操作', toolbar: '#handleButtons', align: "center" }
            ]
        ],
        id: 'testReload1',
        page: true,
        limit: 10 //默认十条数据一页
            ,
        limits: [10, 20, 30, 50] //数据分页条

    });


    // **隐患类型**//
    table.render({
        elem: '#demoYHLX' //绑定table id
            ,
        url: BASEURL + "/hiddenType/getHiddenTypeByItem" //数据请求路径，
            ,
        cellMinWidth: 80,
        cols: [
            [
                // 字段名根据实际情况更改
                { field: 'id', title: '序号', width: 300, align: "center" },
                { field: 'hiddenTypeName', title: '隐患类型名称', width: 500, align: "center" },
                { fixed: 'right', align: 'center', title: '操作', toolbar: '#handleButtons', }
            ]
        ],
        id: 'testReload2',
        page: true,
        limit: 10 //默认十条数据一页
            ,
        limits: [10, 20, 30, 50] //数据分页条

    });

    table.render({
        elem: '#demoBZRZ' //绑定table id
            ,
        url: '/Equipment/getEquipmentByItem' //数据请求路径，
            ,
        cellMinWidth: 80,
        cols: [
            [
                // 字段名根据实际情况更改
                { field: 'title', title: '序号', align: "center" },
                { field: 'picture', title: '班组名称', align: "center" },
                { fixed: 'right', align: 'center', title: '操作', toolbar: '#handleButtons', }
            ]
        ],
        id: 'testReload2',
        page: true,
        limit: 10 //默认十条数据一页
            ,
        limits: [10, 20, 30, 50] //数据分页条

    });

    // 班组管理
    table.render({
        elem: '#demoBZGL' //绑定table id
            ,
        url: BASEURL + "/crew/getCrewByItem" //数据请求路径，
            ,
        cellMinWidth: 80,
        cols: [
            [
                // 字段名根据实际情况更改
                { field: 'crewName', title: '班组名', align: "center" },
                { field: 'creator', title: '负责人', align: "center" },
                { field: 'crewDescription', title: '班组描述', align: "center" },
                { field: 'createDate', title: '创建时间', align: "center" },
                { fixed: 'right', align: 'center', title: '操作', toolbar: '#handleButtons', }
            ]
        ],
        id: 'testReload2',
        page: true,
        limit: 10 //默认十条数据一页
            ,
        limits: [10, 20, 30, 50] //数据分页条

    });
    table.render({
        elem: '#demoXJDCX' //绑定table id
            ,
        url: BASEURL + '/patrol/getPatrolByItem' //数据请求路径，
            ,
        cellMinWidth: 80,
        cols: [
            [
                // 字段名根据实际情况更改
                { field: 'id', title: '巡点编号', align: "center" },
                { field: 'patrolName', title: '巡点名称', align: "center" },
                { field: 'creator', title: '创建人', align: "center" },
                { field: 'areaBelongs', title: '所属区域', align: "center" },
                { field: 'createDate', title: '创建日期', align: "center" },
                { fixed: 'right', align: 'center', title: '操作', toolbar: '#handleButtons' }
            ]
        ],
        id: 'testReload2',
        page: true,
        limit: 10, //默认十条数据一页
        limits: [10, 20, 30, 50] //数据分页条
    });

    table.render({
        elem: '#demo7' //绑定table id
            ,
        url: '/Equipment/getEquipmentByItem' //数据请求路径，
            ,
        cellMinWidth: 80,
        cols: [
            [
                // 字段名根据实际情况更改
                { field: 'title', title: '班次开始时间', align: "center" },
                { field: 'picture', title: '接班', align: "center" },
                { field: 'title', title: '本次', align: "center" },
                { field: 'picture', title: '交班', align: "center" },
                { field: 'title', title: '其他', align: "center" },
                { field: 'picture', title: '状态', align: "center" },
                { fixed: 'right', align: 'center', title: '操作', toolbar: '#handleButtons', }
            ]
        ],
        id: 'testReload2',
        page: true,
        limit: 10 //默认十条数据一页
            ,
        limits: [10, 20, 30, 50] //数据分页条

    });
    table.render({
        elem: '#demo8' //绑定table id
            ,
        url: '/Equipment/getEquipmentByItem' //数据请求路径，
            ,
        cellMinWidth: 80,
        cols: [
            [
                // 字段名根据实际情况更改
                { field: 'title', title: '编号', align: "center" },
                { field: 'picture', title: '标题', align: "center" },
                { field: 'title', title: '创建人', align: "center" },
                { field: 'picture', title: '执行人', align: "center" },
                { field: 'title', title: '路线', align: "center" },
                { field: 'picture', title: '状态', align: "center" },
                { field: 'picture', title: '开始时间', align: "center" },
                { field: 'title', title: '结束时间', align: "center" },
                { field: 'picture', title: '审核意见', align: "center" },
                { fixed: 'right', align: 'center', title: '操作', toolbar: '#handleButtons', }
            ]
        ],
        id: 'testReload2',
        page: true,
        limit: 10 //默认十条数据一页
            ,
        limits: [10, 20, 30, 50] //数据分页条

    });

    // 指标管理
    table.render({
        elem: '#demoZBGL' //绑定table id
            ,
        url: BASEURL + '/indicator/getIndicatorByItem' //数据请求路径，
            ,
        cellMinWidth: 80,
        cols: [
            [
                // 字段名根据实际情况更改
                { field: 'indicatorName', title: '指标名称', align: "center" },
                { field: 'orderNumber', title: '序号', align: "center" },
                { field: 'creator', title: '创建人', align: "center" },
                { field: 'indicatorStatus', title: '状态', align: "center" },
                { field: 'operateDate', title: '操作日期', align: "center" },
                { fixed: 'right', align: 'center', title: '操作', toolbar: '#handleButtons', }
            ]
        ],
        id: 'testReload2',
        page: true,
        limit: 10 //默认十条数据一页
            ,
        limits: [10, 20, 30, 50] //数据分页条

    });
    // 类型管理
    table.render({
        elem: '#LXGL' //绑定table id
            ,
        url: 'http://www.rst.com:8000/api/v1/inspection/patrolType/getPatrolTypeByItem' //数据请求路径，
            ,
        cellMinWidth: 80,
        cols: [
            [
                // 字段名根据实际情况更改
                { field: 'id', title: '类型编号', align: "center" },
                { field: 'patrolTypeName', title: '类型名称', align: "center" },
                { field: 'associateIndicator', title: '类型关联指标', align: "center" },
                { fixed: 'right', align: 'center', title: '操作', toolbar: '#handleButtons', }
            ]
        ],
        id: 'testReload2',
        page: true,
        limit: 10 //默认十条数据一页
            ,
        limits: [10, 20, 30, 50] //数据分页条

    });
    // 路线管理
    table.render({
        elem: '#demoXLGL' //绑定table id
            ,
        url: BASEURL + '/itinerary/getItineraryByItem' //数据请求路径，
            ,
        cellMinWidth: 80,
        cols: [
            [
                // 字段名根据实际情况更改
                { field: 'itineraryName', title: '路线名称', align: "center" },
                { field: 'creator', title: '创建人', align: "center" },
                { field: 'itineraryDescription', title: '路线描述', align: "center" },
                { field: 'createDate', title: '创建时间', align: "center" },
                { fixed: 'right', align: 'center', title: '操作', toolbar: '#handleButtons', }
            ]
        ],
        id: 'testReload2',
        page: true,
        limit: 10 //默认十条数据一页
            ,
        limits: [10, 20, 30, 50] //数据分页条

    });
    // 隐患了类型分析统计表
    table.render({
        elem: '#YHLXFX' //绑定table id
            ,
        url: '/Equipment/getEquipmentByItem' //数据请求路径，
            ,
        cellMinWidth: 9.50,
        toolbar: true,
        totalRow: true,
        cols: [
            [
                // 字段名根据实际情况更改
                { field: 'title', title: '序号', width: '11.1%', align: "center" },
                { field: 'picture', title: '隐患类型', width: '11.1%', align: "center" },
                { field: 'title', title: '数量（个）', width: '11.1%', align: "center" },
                { field: 'picture', title: '比例', width: '11.1%', align: "center" },
            ]
        ],
        id: 'testReload2',
        page: true,
        limit: 10 //默认十条数据一页
            ,
        limits: [10, 20, 30, 50] //数据分页条

    });

    // 隐患重要程度分析表
    table.render({
        elem: '#YHCDFX' //绑定table id
            ,
        url: '/Equipment/getEquipmentByItem' //数据请求路径，
            ,
        cellMinWidth: 9.50,
        toolbar: true,
        totalRow: true,
        cols: [
            [
                // 字段名根据实际情况更改
                { field: 'title', title: '序号', width: '11.1%', align: "center" },
                { field: 'picture', title: '重要程度', width: '11.1%', align: "center" },
                { field: 'title', title: '数量（次）', width: '11.1%', align: "center" },
                { field: 'picture', title: '比例', width: '11.1%', align: "center" },
            ]
        ],
        id: 'testReload2',
        page: true,
        limit: 10 //默认十条数据一页
            ,
        limits: [10, 20, 30, 50] //数据分页条

    });

    // 区域(管廊)隐患数量分析统计表TOP10
    table.render({
        elem: '#GL' //绑定table id
            ,
        url: '/Equipment/getEquipmentByItem' //数据请求路径，
            ,
        cellMinWidth: 9.50,
        toolbar: true,
        totalRow: true,
        cols: [
            [
                // 字段名根据实际情况更改
                { field: 'title', title: '序号', width: '11.1%', align: "center" },
                { field: 'picture', title: '区域(管廊)', width: '11.1%', align: "center" },
                { field: 'title', title: '数量（个）', width: '11.1%', align: "center" },
                { field: 'picture', title: '比例', width: '11.1%', align: "center" },
            ]
        ],
        id: 'testReload2',
        page: true,
        limit: 10 //默认十条数据一页
            ,
        limits: [10, 20, 30, 50] //数据分页条

    });

    // 区域(管轴)隐患数量分析统计表TOP10
    table.render({
        elem: '#GZ' //绑定table id
            ,
        url: '/Equipment/getEquipmentByItem' //数据请求路径，
            ,
        cellMinWidth: 9.50,
        toolbar: true,
        totalRow: true,
        cols: [
            [
                // 字段名根据实际情况更改
                { field: 'title', title: '序号', width: '9.1%', align: "center" },
                { field: 'picture', title: '区域(管廊)', width: '9.1%', align: "center" },
                { field: 'title', title: '区域(管轴)', width: '9.1%', align: "center" },
                { field: 'title', title: '数量（次）', width: '9.1%', align: "center" },
                { field: 'picture', title: '比例', width: '9.1%', align: "center" },
            ]
        ],
        id: 'testReload2',
        page: true,
        limit: 10 //默认十条数据一页
            ,
        limits: [10, 20, 30, 50] //数据分页条

    });


    // 隐患重要程度分析表
    table.render({
        elem: '#ZZQ' //绑定table id
            ,
        url: '/Equipment/getEquipmentByItem' //数据请求路径，
            ,
        cellMinWidth: 9.50,
        toolbar: true,
        totalRow: true,
        cols: [
            [
                // 字段名根据实际情况更改
                { field: 'title', title: '序号', width: '11.1%', align: "center" },
                { field: 'picture', title: '装置区域', width: '11.1%', align: "center" },
                { field: 'title', title: '数量（次）', width: '11.1%', align: "center" },
                { field: 'picture', title: '比例', width: '11.1%', align: "center" },
            ]
        ],
        id: 'testReload2',
        page: true,
        limit: 10 //默认十条数据一页
            ,
        limits: [10, 20, 30, 50] //数据分页条

    });


    // 隐患数量分析表
    table.render({
        elem: '#YHSLFX' //绑定table id
            ,
        url: '/Equipment/getEquipmentByItem' //数据请求路径，
            ,
        cellMinWidth: 9.50,
        toolbar: true,
        totalRow: true,
        cols: [
            [
                // 字段名根据实际情况更改
                { field: 'title', title: '序号', width: '22%', align: "center" },
                { field: 'picture', title: '巡检人员', width: '22%', align: "center" },
                { field: 'title', title: '隐患数量（次）', width: '22%', align: "center" },
                { field: 'picture', title: '比例', width: '22%', align: "center" },
            ]
        ],
        id: 'testReload2',
        page: true,
        limit: 10 //默认十条数据一页
            ,
        limits: [10, 20, 30, 50] //数据分页条

    });

});

// 添加班组临时数据
layui.use(['transfer', 'layer', 'util'], function() {
    var $ = layui.$,
        transfer = layui.transfer,
        layer = layui.layer,
        util = layui.util;
    //模拟数据
    var dataBZ = [{
        "value": "1",
        "title": "李白"
    }, {
        "value": "2",
        "title": "杜甫"
    }, {
        "value": "3",
        "title": "苏轼"
    }, {
        "value": "4",
        "title": "李清照"
    }, {
        "value": "5",
        "title": "鲁迅",
        "disabled": true
    }, {
        "value": "6",
        "title": "巴金"
    }, {
        "value": "7",
        "title": "冰心"
    }, {
        "value": "8",
        "title": "矛盾"
    }, {
        "value": "9",
        "title": "贤心"
    }, {
        "value": "10",
        "title": "老者"
    }]

    //定义标题及数据源
    transfer.render({
        elem: '#peopleBZ',
        title: ['候选列表', '已选列表'], //自定义标题
        data: dataBZ,
        width: 500, //定义宽度                   
        height: 300 //定义高度               
    })

});

layui.use(['form', 'layedit', 'laydate'], function() {
    var form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit,
        laydate = layui.laydate;
    //表单取值
    layui.$('#LAY-component-form-getval').on('click', function() {
        var data = form.val('example');
        alert(JSON.stringify(data));
    });

});

layui.use(['form', 'layedit', 'laydate'], function() {
    var form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit,
        laydate = layui.laydate;
    //表单取值
    layui.$('#LAY-component-form-getval').on('click', function() {
        var data = form.val('example');
        alert(JSON.stringify(data));
    });
});

layui.use(['form'], function() {
    var form = layui.form;
    form.render();
});

layui.use(['transfer', 'layer', 'util'], function() {
    var $ = layui.$,
        transfer = layui.transfer,
        layer = layui.layer,
        util = layui.util;

    //模拟数据
    var data1 = [{
            "value": "1",
            "title": "李白"
        }, {
            "value": "2",
            "title": "杜甫"
        }, {
            "value": "3",
            "title": "苏轼"
        }, {
            "value": "4",
            "title": "李清照"
        }, {
            "value": "5",
            "title": "鲁迅",
            "disabled": true
        }, {
            "value": "6",
            "title": "巴金"
        }, {
            "value": "7",
            "title": "冰心"
        }, {
            "value": "8",
            "title": "矛盾"
        }, {
            "value": "9",
            "title": "贤心"
        }]
        //定义标题及数据源
    transfer.render({
        elem: '#CSK',
        title: ['备选指标', '已选指标'] //自定义标题
            ,
        data: data1,
        width: 300 //定义宽度
    })

});

//数据提交
layui.use('form', function() {
    var form = layui.form;
    transfer = layui.transfer,
        //监听提交
        form.on('submit(formDemo)', function(data) {
            layer.msg(JSON.stringify(data.field));
            return false;
        });
    //定义标题及数据源
    transfer.render({
        elem: '#test2',
        title: ['候选文人', '获奖文人'] //自定义标题
            ,
        data: data1,
        width: 400 //定义宽度
            ,
        height: 210 //定义高度
    })
});

layui.use(['transfer', 'layer', 'util'], function() {
    var $ = layui.$,
        transfer = layui.transfer,
        layer = layui.layer,
        util = layui.util;

    //模拟数据
    var data1 = [{
            "value": "1",
            "title": "李白"
        },
        {
            "value": "2",
            "title": "杜甫"
        }, {
            "value": "3",
            "title": "苏轼"
        }, {
            "value": "4",
            "title": "李清照"
        }, {
            "value": "5",
            "title": "鲁迅",
            "disabled": true
        }, {
            "value": "6",
            "title": "巴金"
        }, {
            "value": "7",
            "title": "冰心"
        }, {
            "value": "8",
            "title": "矛盾"
        }, {
            "value": "9",
            "title": "贤心"
        }
    ]


    //定义标题及数据源
    transfer.render({
        elem: '#test2',
        title: ['候选文人', '获奖文人'] //自定义标题
            ,
        data: data1,
        width: 400 //定义宽度
            ,
        height: 210 //定义高度
    })

});