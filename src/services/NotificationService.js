/**
 * Notification Service - Toast notifications
 */

class NotificationService {
    constructor() {
        this.container = null;
    }

    init() {
        if (this.container) return;

        this.container = document.createElement('div');
        this.container.id = 'notification-container';
        this.container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
    `;
        document.body.appendChild(this.container);

        // Add animation styles
        if (!document.getElementById('toast-styles')) {
            const style = document.createElement('style');
            style.id = 'toast-styles';
            style.textContent = `
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
      `;
            document.head.appendChild(style);
        }
    }

    show(message, type = 'info', duration = 3000) {
        this.init();

        const toast = document.createElement('div');
        const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
        const colors = {
            success: { bg: '#d4edda', border: '#28a745', text: '#155724' },
            error: { bg: '#f8d7da', border: '#dc3545', text: '#721c24' },
            warning: { bg: '#fff3cd', border: '#ffc107', text: '#856404' },
            info: { bg: '#d1ecf1', border: '#17a2b8', text: '#0c5460' }
        };
        const color = colors[type] || colors.info;

        toast.style.cssText = `
      display: flex; align-items: center; gap: 12px;
      padding: 14px 20px;
      background-color: ${color.bg};
      border-left: 4px solid ${color.border};
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      color: ${color.text};
      font-size: 14px; font-weight: 500;
      animation: slideIn 0.3s ease;
      cursor: pointer;
    `;

        toast.innerHTML = `<span style="font-size: 18px;">${icons[type]}</span><span>${message}</span>`;
        toast.addEventListener('click', () => this.dismiss(toast));
        this.container.appendChild(toast);

        if (duration > 0) {
            setTimeout(() => this.dismiss(toast), duration);
        }
        return toast;
    }

    dismiss(toast) {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }

    success(message, duration) { return this.show(message, 'success', duration); }
    error(message, duration) { return this.show(message, 'error', duration); }
    warning(message, duration) { return this.show(message, 'warning', duration); }
    info(message, duration) { return this.show(message, 'info', duration); }
}

export const notifications = new NotificationService();
export default notifications;
