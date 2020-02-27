/**************
 * 完成度图表 *
 *************/
$.ajax({
    url: BASEURL + "/inspectionTask/getInspectionTaskCount",
    type: 'GET',
    dataType: 'json',
    // data:{},
    success: function(data) {
        // 设置全局使用
        window.echartData = data.data;
        var completeDegree = echartData.completeDegree;
        var inspection = echartData.inspection;
        var workOrder = echartData.workOrder;

        var echartsContainerCompletion = document.getElementById("echartsContainerCompletion");


        var myChart = echarts.init(echartsContainerCompletion);
        var app = {};
        option = null;
        option = {
            // 色盘颜色
            color: ['#c23531', '#00CC99', '#ff7600'],
            title: {
                text: '完成度占比图',
                subtext: '张一鸣',
                left: 'center',
                padding: [100, 0, 0, 0]
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                // show: false //图例不显示
                orient: 'horizontal', //水平朝向
                padding: [480, 0, 0, 0]
            },
            series: [{
                name: '完成度',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [{
                    value: completeDegree[0].countValue,
                    name: completeDegree[0].countName
                }, {
                    value: completeDegree[2].countValue,
                    name: completeDegree[2].countName
                }, {
                    value: completeDegree[1].countValue,
                    name: completeDegree[1].countName
                }],


                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };;

        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }







        /**************
         * 巡查点图表 *
         *************/
        var echartsContainerPatrol = document.getElementById("echartsContainerPatrol");
        var myChart = echarts.init(echartsContainerPatrol);
        var app = {};
        option = null;
        option = {
            // 色盘颜色
            color: ['#00CC99', '#c23531'],
            title: {
                text: '巡检次数占比图',
                subtext: '张一鸣',
                left: 'center',
                padding: [100, 0, 0, 0]
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                // show: false //图例不显示
                orient: 'horizontal', //水平朝向
                padding: [480, 0, 0, 0]
            },
            series: [{
                name: '巡检次数',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [{
                    value: inspection[1].countValue,
                    name: inspection[1].countName
                }, {
                    value: inspection[0].countValue,
                    name: inspection[0].countName
                }],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };;
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }

        /**************
         * 工单处理情况 *
         *************/
        var echartsContainerWork = document.getElementById("echartsContainerWork");
        var myChart2 = echarts.init(echartsContainerWork);
        option = {
            color: ['#3398DB'],
            title: {
                text: '工单处理情况',
                subtext: '张一鸣',
                left: 'center',
                padding: [20, 0, 0, 0]
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '2%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: [workOrder[0].countName, workOrder[1].countName, workOrder[2].countName, workOrder[3].countName, workOrder[4].countName, workOrder[5].countName, workOrder[6].countName, workOrder[7].countName, workOrder[8].countName, ],
                axisTick: {
                    alignWithLabel: true, //显示刻度
                    inside: true //刻度朝内
                },
                axisLabel: {
                    interval: 0, //代表显示所有x轴标签显示
                }
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: '任务数量',
                type: 'bar',
                barWidth: '50%',
                data: [workOrder[0].countValue, workOrder[1].countValue, workOrder[2].countValue, workOrder[3].countValue, workOrder[4].countValue, workOrder[5].countValue, workOrder[6].countValue, workOrder[7].countValue, workOrder[8].countValue, ]
            }]
        };
        if (option && typeof option === "object") {
            myChart2.setOption(option, true);
        }

    },

    error: function(msg) {
        console.log(msg);
    }
});