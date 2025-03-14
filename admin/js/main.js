import { chartConfigs } from './config/chartConfigs.js';
import { PageManager } from './managers/PageManager.js';
import { NotificationManager } from './managers/NotificationManager.js';

let autoUpdateConfig = {
    interval: parseInt(localStorage.getItem('updateInterval')) || 5000,
    enabled: JSON.parse(localStorage.getItem('autoUpdateEnabled') || 'true')
};

const pageManager = new PageManager(chartConfigs, autoUpdateConfig);
const notificationManager = new NotificationManager();

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    pageManager.switchPage('dashboard');
});

function setupEventListeners() {
    // 设置导航菜单点击事件
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href')?.substring(1);
            if (targetId) {
                pageManager.switchPage(targetId);
            }
        });
    });

    // 添加自动更新开关事件处理
    document.querySelectorAll('.switch-toggle').forEach(toggle => {
        toggle.addEventListener('click', function () {
            const isActive = this.classList.toggle('active');
            const container = this.closest('.chart-container');
            const chartBody = container.querySelector('.chart-body');
            const chart = echarts.getInstanceByDom(chartBody);

            if (chart) {
                if (isActive) {
                    startChartUpdate(chart, autoUpdateConfig.interval);
                } else {
                    stopChartUpdate(chart);
                }
            }
        });
    });

    // ... other event listeners ...
}

// 导出全局函数
window.showNotification = (message) => notificationManager.showNotification(message);
window.switchPage = (targetId) => pageManager.switchPage(targetId);

window.toggleAutoUpdate = function (toggle) {
    const isActive = toggle.classList.toggle('active');
    const container = toggle.closest('.chart-container');
    const chartBody = container.querySelector('.chart-body');
    const chart = echarts.getInstanceByDom(chartBody);

    if (chart) {
        if (isActive) {
            startChartUpdate(chart, autoUpdateConfig.interval);
        } else {
            stopChartUpdate(chart);
        }
    }
};

// 添加页面功能函数
function showContractForm() {
    const form = document.getElementById('contractForm');
    if (form) {
        form.style.display = 'block';
    }
}

function hideContractForm() {
    const form = document.getElementById('contractForm');
    if (form) {
        form.style.display = 'none';
    }
}

function createContract() {
    const type = document.getElementById('contractType').value;
    const batch = document.getElementById('contractBatch').value;
    const condition = document.getElementById('contractCondition').value;

    if (!batch || !condition) {
        showNotification('请填写完整信息');
        return;
    }

    // TODO: 发送创建请求
    showNotification('创建合约成功');
    hideContractForm();
}

function searchBlockchain() {
    const searchValue = document.getElementById('blockchain-search').value;
    if (!searchValue) {
        showNotification('请输入搜索内容');
        return;
    }

    // TODO: 发送查询请求
    showNotification('查询中...');
}

function saveSystemSettings() {
    const interval = document.getElementById('updateInterval').value;
    const retention = document.getElementById('dataRetention').value;

    localStorage.setItem('updateInterval', interval);
    autoUpdateConfig.interval = parseInt(interval);

    showNotification('保存成功');
}

// 导出全局函数
window.showContractForm = showContractForm;
window.hideContractForm = hideContractForm;
window.createContract = createContract;
window.searchBlockchain = searchBlockchain;
window.saveSystemSettings = saveSystemSettings;
