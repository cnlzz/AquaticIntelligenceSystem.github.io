import { initCharts } from '../utils/chartUtils.js';

export class PageManager {
    constructor(chartConfigs, autoUpdateConfig) {
        this.chartConfigs = chartConfigs;
        this.autoUpdateConfig = autoUpdateConfig;
    }

    switchPage(targetId) {
        const currentPage = document.querySelector('.page.active');
        const targetPage = document.getElementById(targetId);

        if (currentPage === targetPage) return;

        if (currentPage) {
            this.exitPage(currentPage);
        }

        if (targetPage) {
            this.enterPage(targetPage);
        }
    }

    exitPage(page) {
        page.classList.add('exit');
        setTimeout(() => {
            page.style.display = 'none';
            page.classList.remove('active', 'exit');
        }, 300);
    }

    enterPage(page) {
        page.style.display = 'block';

        // 延迟初始化图表，等待DOM完全渲染
        setTimeout(() => {
            page.classList.add('active');
            console.log('页面激活:', page.id);
            this.initPageCharts(page.id);
        }, 100);
    }

    initPageCharts(pageId) {
        console.log('开始初始化图表:', pageId);
        const page = document.getElementById(pageId);
        if (!page) {
            console.error('页面不存在:', pageId);
            return;
        }

        const containers = page.querySelectorAll('.chart-container');
        console.log(`找到 ${containers.length} 个图表容器`);

        containers.forEach((container, index) => {
            const chartBody = container.querySelector('.chart-body');
            if (!chartBody) {
                console.error('图表容器不存在');
                return;
            }
            console.log('图表容器尺寸:', chartBody.offsetWidth, chartBody.offsetHeight);
        });

        initCharts(pageId, containers, this.chartConfigs, this.autoUpdateConfig);
    }
}
