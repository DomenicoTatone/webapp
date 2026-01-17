/**
 * Notification Service - Inline Status Bar
 * Shows contextual messages above each page's main card
 */

class NotificationService {
    constructor() {
        this.currentTimeout = null;
    }

    /**
     * Show an inline status message in the page's status bar
     * @param {string} message - The message to display
     * @param {string} type - success | error | warning | info
     * @param {number} duration - Auto-dismiss duration in ms (0 = no auto-dismiss)
     */
    show(message, type = 'info', duration = 4000) {
        // Find the page status container (should exist in rendered page)
        let statusBar = document.getElementById('page-status');

        // Fallback: create one if not found (legacy behavior)
        if (!statusBar) {
            const pageContent = document.getElementById('page-content');
            if (pageContent) {
                statusBar = document.createElement('div');
                statusBar.id = 'page-status';
                statusBar.className = 'page-status';
                pageContent.insertBefore(statusBar, pageContent.firstChild);
            } else {
                console.warn('No page-status element found');
                return;
            }
        }

        // Clear any existing timeout
        if (this.currentTimeout) {
            clearTimeout(this.currentTimeout);
        }

        const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };

        // Set content and styling
        statusBar.innerHTML = `
            <span class="page-status__icon">${icons[type] || icons.info}</span>
            <span class="page-status__message">${message}</span>
        `;
        statusBar.className = `page-status page-status--${type} page-status--visible`;

        // Auto-dismiss after duration
        if (duration > 0) {
            this.currentTimeout = setTimeout(() => {
                this.dismiss();
            }, duration);
        }
    }

    dismiss() {
        const statusBar = document.getElementById('page-status');
        if (statusBar) {
            statusBar.classList.remove('page-status--visible');
            // Clear content after fade animation (fixed space remains)
            setTimeout(() => {
                if (!statusBar.classList.contains('page-status--visible')) {
                    statusBar.innerHTML = '';
                    statusBar.className = 'page-status';
                }
            }, 250);
        }
    }

    success(message, duration) { return this.show(message, 'success', duration); }
    error(message, duration) { return this.show(message, 'error', duration); }
    warning(message, duration) { return this.show(message, 'warning', duration); }
    info(message, duration) { return this.show(message, 'info', duration); }
}

export const notifications = new NotificationService();
export default notifications;

