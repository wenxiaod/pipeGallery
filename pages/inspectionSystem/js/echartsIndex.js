/**************
 * 完成度图表 *
 *************/
$.ajax({
    url: "http://192.168.0.117:8000/api/v1/inspection/inspectionTask/getInspectionTaskCount",
    type: 'GET',
    dataType: 'json',
    // data:{},
    success: function(data) {
        // 设置全局使用
        window.echartData = data.data;
        console.log(echartData);
        var echartsContainerCompletion = document.getElementById("echartsContainerCompletion");
        var myChart = echarts.init(echartsContainerCompletion);
        var app = {};
        option = null;
        option = {
            // 色盘颜色
            color: ['#00CC99', '#ff7600', '#c23531', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
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
                    value: echartData.finishedOnTime,
                    name: "按时完成"
                }, {
                    value: echartData.delayFinished,
                    name: "延时完成"
                }, {
                    value: echartData.unfinished,
                    name: "未完成"
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

    },
    error: function(msg) {
        console.log(msg);
    }
});



/**************
 * 巡查点图表 *
 *************/
var echartsContainerPatrol = document.getElementById("echartsContainerPatrol");
var myChart = echarts.init(echartsContainerPatrol);
var app = {};
option = null;
option = {
    // 色盘颜色
    color: ['#00CC99', '#ff7600', '#c23531', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
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
            value: 120,
            name: '已巡检次数'
        }, {
            value: 60,
            name: '未巡检次数'
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
        data: ['已完成任务', '正在进行的任务', '已接受任务', '未接受任务', '已中断任务', '已关闭任务', '已过期任务', '已拒绝任务', '已流转任务'],
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
        data: [10, 2, 1, 1, 2, 3, 5, 2, 8]
    }]
};
if (option && typeof option === "object") {
    myChart2.setOption(option, true);
}