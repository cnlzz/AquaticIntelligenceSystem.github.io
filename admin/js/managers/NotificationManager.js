export class NotificationManager {
    constructor() {
        this.setupPanel();
    }

    setupPanel() {
        const notificationBtn = document.querySelector('.header-notifications');
        const notificationPanel = document.getElementById('notificationPanel');

        if (notificationBtn && notificationPanel) {
            const newNotificationBtn = notificationBtn.cloneNode(true);
            notificationBtn.parentNode.replaceChild(newNotificationBtn, notificationBtn);

            newNotificationBtn.addEventListener('click', () => {
                notificationPanel.classList.toggle('active');
            });
        }
    }

    showNotification(message) {
        if (!message) return;

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;

        const oldNotification = document.querySelector('.notification');
        if (oldNotification) {
            oldNotification.remove();
        }

        document.body.appendChild(notification);

        requestAnimationFrame(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        });
    }
}
