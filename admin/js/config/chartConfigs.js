export const chartConfigs = {
    dashboardOption: {
        title: {
            text: '监控中心概览',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: ['正常运行', '警告', '错误', '离线', '待机']
        },
        series: [
            {
                name: '设备状态',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 735, name: '正常运行' },
                    { value: 210, name: '警告' },
                    { value: 34, name: '错误' },
                    { value: 135, name: '离线' },
                    { value: 548, name: '待机' }
                ]
            }
        ]
    },
    productionOption: {
        // ...existing productionOption code...
    },
    qualityOption: {
        title: {
            text: '品质评级分布',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: ['A级', 'B级', 'C级', 'D级']
        },
        series: [
            {
                name: '品质等级',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center',
                    formatter: '{b}\n{c}kg ({d}%)'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 20,
                        fontWeight: 'bold'
                    }
                },
                data: [
                    { value: 735, name: 'A级' },
                    { value: 580, name: 'B级' },
                    { value: 300, name: 'C级' },
                    { value: 200, name: 'D级' }
                ]
            }
        ],
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    },
    qualityAnalysisOption: {
        // ...existing qualityAnalysisOption code...
    },
    blockchainOption: {
        title: {
            text: '区块链交易趋势',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                const time = params[0].axisValue;
                const value = params[0].value;
                return `时间: ${time}<br/>交易数: ${value}`;
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
            axisLabel: {
                interval: 0,
                rotate: 30
            }
        },
        yAxis: {
            type: 'value',
            name: '交易数量'
        },
        series: [{
            name: '交易数量',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            sampling: 'average',
            data: [150, 230, 224, 218, 135, 147, 260],
            itemStyle: {
                color: '#1890ff'
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(24,144,255,0.3)'
                    }, {
                        offset: 1,
                        color: 'rgba(24,144,255,0.1)'
                    }]
                }
            }
        }]
    },
    sortingOption: {
        title: {
            text: '分拣管理',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['产量', '合格率', '效率'],
            bottom: 10
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00']
        },
        yAxis: [
            {
                type: 'value',
                name: '数量',
                position: 'left'
            },
            {
                type: 'value',
                name: '百分比',
                position: 'right',
                min: 0,
                max: 100,
                axisLabel: {
                    formatter: '{value}%'
                }
            }
        ],
        series: [
            {
                name: '产量',
                type: 'bar',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '合格率',
                type: 'line',
                yAxisIndex: 1,
                data: [98, 97, 98, 96, 95, 98, 97]
            },
            {
                name: '效率',
                type: 'line',
                yAxisIndex: 1,
                data: [88, 85, 90, 92, 86, 89, 91]
            }
        ]
    }
};
