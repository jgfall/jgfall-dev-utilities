/**
 * Modal Component - Vanilla JavaScript
 * 
 * Creates modal dialogs with customizable content and actions.
 * 
 * @module components/vanilla/modal
 */

/**
 * Create a modal dialog
 * 
 * @param {Object} options - Modal configuration
 * @param {string} options.title - Modal title
 * @param {string|HTMLElement} options.content - Modal content
 * @param {Array} options.actions - Array of action buttons
 * @param {boolean} options.closeOnOverlay - Close when clicking overlay
 * @param {boolean} options.showCloseButton - Show X close button
 * @param {Function} options.onClose - Callback when modal closes
 * @returns {Object} Modal controller object
 */
export function createModal(options = {}) {
    const {
        title = '',
        content = '',
        actions = [],
        closeOnOverlay = true,
        showCloseButton = true,
        onClose = null,
        size = 'md',
        className = ''
    } = options;
    
    // Create modal elements
    const overlay = document.createElement('div');
    overlay.className = 'jgf-modal-overlay';
    
    const modal = document.createElement('div');
    modal.className = `jgf-modal jgf-modal-${size} ${className}`.trim();
    
    const modalContent = document.createElement('div');
    modalContent.className = 'jgf-modal-content';
    
    // Header
    if (title || showCloseButton) {
        const modalHeader = document.createElement('div');
        modalHeader.className = 'jgf-modal-header';
        
        if (title) {
            const modalTitle = document.createElement('h3');
            modalTitle.className = 'jgf-modal-title';
            modalTitle.textContent = title;
            modalHeader.appendChild(modalTitle);
        }
        
        if (showCloseButton) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'jgf-modal-close';
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            closeBtn.addEventListener('click', () => controller.close());
            modalHeader.appendChild(closeBtn);
        }
        
        modalContent.appendChild(modalHeader);
    }
    
    // Body
    const modalBody = document.createElement('div');
    modalBody.className = 'jgf-modal-body';
    
    if (typeof content === 'string') {
        modalBody.innerHTML = content;
    } else if (content instanceof HTMLElement) {
        modalBody.appendChild(content);
    }
    
    modalContent.appendChild(modalBody);
    
    // Footer
    if (actions.length > 0) {
        const modalFooter = document.createElement('div');
        modalFooter.className = 'jgf-modal-footer';
        actions.forEach(action => modalFooter.appendChild(action));
        modalContent.appendChild(modalFooter);
    }
    
    modal.appendChild(modalContent);
    overlay.appendChild(modal);
    
    // Close on overlay click
    if (closeOnOverlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                controller.close();
            }
        });
    }
    
    // Controller object
    const controller = {
        element: overlay,
        
        open() {
            document.body.appendChild(overlay);
            overlay.classList.add('jgf-modal-active');
            document.body.style.overflow = 'hidden';
        },
        
        close() {
            overlay.classList.remove('jgf-modal-active');
            setTimeout(() => {
                document.body.removeChild(overlay);
                document.body.style.overflow = '';
                if (onClose) onClose();
            }, 300);
        },
        
        updateContent(newContent) {
            if (typeof newContent === 'string') {
                modalBody.innerHTML = newContent;
            } else if (newContent instanceof HTMLElement) {
                modalBody.innerHTML = '';
                modalBody.appendChild(newContent);
            }
        },
        
        updateTitle(newTitle) {
            const titleEl = modalContent.querySelector('.jgf-modal-title');
            if (titleEl) {
                titleEl.textContent = newTitle;
            }
        }
    };
    
    return controller;
}

/**
 * Create a confirmation dialog
 * 
 * @param {Object} options - Confirmation options
 * @returns {Promise<boolean>} Promise that resolves to true/false
 */
export function createConfirmDialog(options = {}) {
    const {
        title = 'Confirm',
        message = 'Are you sure?',
        confirmText = 'Confirm',
        cancelText = 'Cancel',
        variant = 'primary'
    } = options;
    
    return new Promise((resolve) => {
        const confirmBtn = document.createElement('button');
        confirmBtn.className = `jgf-btn jgf-btn-${variant}`;
        confirmBtn.textContent = confirmText;
        
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'jgf-btn jgf-btn-secondary';
        cancelBtn.textContent = cancelText;
        
        const modal = createModal({
            title,
            content: `<p>${message}</p>`,
            actions: [cancelBtn, confirmBtn],
            closeOnOverlay: false,
            size: 'sm'
        });
        
        confirmBtn.addEventListener('click', () => {
            modal.close();
            resolve(true);
        });
        
        cancelBtn.addEventListener('click', () => {
            modal.close();
            resolve(false);
        });
        
        modal.open();
    });
}

export default { createModal, createConfirmDialog };
