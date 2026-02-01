/**
 * Toast Notification Component - Vanilla JavaScript
 * 
 * Creates toast notifications for user feedback.
 * 
 * @module components/vanilla/toast
 */

const toastContainer = (() => {
    let container = document.getElementById('jgf-toast-container');
    
    if (!container) {
        container = document.createElement('div');
        container.id = 'jgf-toast-container';
        container.className = 'jgf-toast-container';
        document.body.appendChild(container);
    }
    
    return container;
})();

/**
 * Show a toast notification
 * 
 * @param {Object} options - Toast configuration
 * @param {string} options.message - Toast message
 * @param {string} options.type - Toast type (success, error, warning, info)
 * @param {number} options.duration - Duration in ms (0 = permanent)
 * @param {string} options.position - Position (top-right, top-left, bottom-right, bottom-left, top-center, bottom-center)
 * @returns {Object} Toast controller
 */
export function showToast(options = {}) {
    const {
        message = '',
        type = 'info',
        duration = 3000,
        position = 'top-right',
        dismissible = true,
        icon = true
    } = options;
    
    const toast = document.createElement('div');
    toast.className = `jgf-toast jgf-toast-${type}`;
    
    // Icon mapping
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    let toastContent = '';
    
    if (icon) {
        toastContent += `<i class="fas ${icons[type] || icons.info}"></i>`;
    }
    
    toastContent += `<span class="jgf-toast-message">${message}</span>`;
    
    if (dismissible) {
        toastContent += `<button class="jgf-toast-close"><i class="fas fa-times"></i></button>`;
    }
    
    toast.innerHTML = toastContent;
    
    // Position container
    toastContainer.className = `jgf-toast-container jgf-toast-${position}`;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('jgf-toast-show'), 10);
    
    // Controller
    const controller = {
        element: toast,
        
        close() {
            toast.classList.remove('jgf-toast-show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }
    };
    
    // Close button
    if (dismissible) {
        const closeBtn = toast.querySelector('.jgf-toast-close');
        closeBtn.addEventListener('click', () => controller.close());
    }
    
    // Auto dismiss
    if (duration > 0) {
        setTimeout(() => controller.close(), duration);
    }
    
    return controller;
}

// Convenience methods
export const toast = {
    success: (message, duration) => showToast({ message, type: 'success', duration }),
    error: (message, duration) => showToast({ message, type: 'error', duration }),
    warning: (message, duration) => showToast({ message, type: 'warning', duration }),
    info: (message, duration) => showToast({ message, type: 'info', duration })
};

export default toast;
