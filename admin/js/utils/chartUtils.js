export function initCharts(pageId, containers, chartConfigs, autoUpdateConfig) {
    if (!window.echarts) {
        console.error('ECharts 未加载');
        return;
    }

    window.chartInstances = window.chartInstances || {};
    console.log('初始化图表配置:', chartConfigs);

    containers.forEach((container, index) => {
        const chartBody = container.querySelector('.chart-body');
        if (!chartBody) {
            console.error('图表容器不存在');
            return;
        }

        try {
            // 确保之前的实例被销毁
            const existingChart = echarts.getInstanceByDom(chartBody);
            if (existingChart) {
                existingChart.dispose();
            }

            const chart = echarts.init(chartBody);
            const optionKey = `${pageId}Option`;
            console.log('使用配置键:', optionKey);

            if (chartConfigs[optionKey]) {
                const option = JSON.parse(JSON.stringify(chartConfigs[optionKey]));
                console.log('图表配置:', option);
                chart.setOption(option);
                window.chartInstances[`${pageId}-${index}`] = chart;

                // 添加窗口大小变化监听
                const resizeHandler = () => chart.resize();
                window.addEventListener('resize', resizeHandler);

                // 立即触发一次 resize
                chart.resize();

                if (autoUpdateConfig.enabled) {
                    startChartUpdate(chart, autoUpdateConfig.interval);
                }
            } else {
                console.error(`找不到图表配置: ${optionKey}`);
            }
        } catch (error) {
            console.error('图表初始化失败:', error);
        }
    });
}

export function startChartUpdate(chart, interval) {
    if (chart._autoUpdateTimer) {
        clearInterval(chart._autoUpdateTimer);
    }

    const option = chart.getOption();
    chart._autoUpdateTimer = setInterval(() => {
        updateChartData(chart, option);
    }, interval);
}

export function stopChartUpdate(chart) {
    if (chart._autoUpdateTimer) {
        clearInterval(chart._autoUpdateTimer);
        chart._autoUpdateTimer = null;
    }
}

export function updateChartData(chart, option) {
    if (!chart || !option) return;

    try {
        const seriesType = option.series[0]?.type;
        if (!seriesType) return;

        switch (seriesType) {
            case 'bar':
                updateBarChartData(chart, option);
                break;
            case 'line':
                updateLineChartData(chart, option);
                break;
            case 'pie':
                updatePieChartData(chart);
                break;
        }
    } catch (error) {
        console.error('更新图表数据失败:', error);
    }
}

function updateBarChartData(chart, option) {
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newOption = { ...option };
    if (newOption.xAxis?.[0]?.data) {
        newOption.xAxis[0].data.shift();
        newOption.xAxis[0].data.push(time);
    }

    newOption.series.forEach(series => {
        series.data.shift();
        series.data.push(generateRandomData(series.type));
    });

    chart.setOption(newOption);
}

function updateLineChartData(chart, option) {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // 生成更真实的数据波动
    const lastValue = option.series[0].data[option.series[0].data.length - 1];
    const maxChange = 30; // 最大变化幅度
    const newValue = Math.max(0, lastValue + (Math.random() - 0.5) * maxChange);

    const newOption = { ...option };
    if (newOption.xAxis?.data) {
        newOption.xAxis.data.shift();
        newOption.xAxis.data.push(time);
    }

    newOption.series.forEach(series => {
        if (series.data) {
            series.data.shift();
            series.data.push(Math.round(newValue));
        }
    });

    chart.setOption(newOption);
}

function updatePieChartData(chart) {
    // 生成真实的随机数据并保持总量相对稳定
    const total = 2000;
    const randomFactor = 0.2; // 波动范围20%

    const getRandomValue = (base) => {
        const variance = base * randomFactor;
        return Math.round(base + (Math.random() - 0.5) * variance * 2);
    };

    const newData = [
        { value: getRandomValue(800), name: 'A级' },
        { value: getRandomValue(600), name: 'B级' },
        { value: getRandomValue(400), name: 'C级' },
        { value: getRandomValue(200), name: 'D级' }
    ];

    // 重新计算百分比保证总和为100%
    const sum = newData.reduce((acc, cur) => acc + cur.value, 0);
    newData.forEach(item => {
        item.value = Math.round((item.value / sum) * total);
    });

    chart.setOption({
        series: [{
            data: newData
        }]
    });
}

function generateRandomData(type) {
    switch (type) {
        case 'bar':
            return {
                value: Math.round(Math.random() * 200 + 800),
                itemStyle: {
                    color: '#5470C6',
                    opacity: 0.8
                }
            };
        case 'line':
            return Math.round(Math.random() * 10 + 85);
        default:
            return 0;
    }
}
