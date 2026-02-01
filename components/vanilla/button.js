/**
 * Button Component - Vanilla JavaScript
 * 
 * Creates customizable button elements with variants, sizes, and states.
 * 
 * @module components/vanilla/button
 */

/**
 * Create a button element
 * 
 * @param {Object} options - Button configuration
 * @param {string} options.text - Button text
 * @param {string} options.variant - Button variant (primary, secondary, outline, ghost)
 * @param {string} options.size - Button size (sm, md, lg)
 * @param {boolean} options.disabled - Disabled state
 * @param {boolean} options.loading - Loading state
 * @param {string} options.icon - Icon class (Font Awesome)
 * @param {Function} options.onClick - Click handler
 * @returns {HTMLButtonElement} Button element
 */
export function createButton(options = {}) {
    const {
        text = 'Button',
        variant = 'primary',
        size = 'md',
        disabled = false,
        loading = false,
        icon = null,
        onClick = null,
        className = ''
    } = options;
    
    const button = document.createElement('button');
    button.className = `jgf-btn jgf-btn-${variant} jgf-btn-${size} ${className}`.trim();
    
    if (disabled || loading) {
        button.disabled = true;
        button.classList.add('jgf-btn-disabled');
    }
    
    if (loading) {
        button.classList.add('jgf-btn-loading');
        button.innerHTML = `
            <span class="jgf-spinner"></span>
            <span>${text}</span>
        `;
    } else {
        if (icon) {
            button.innerHTML = `
                <i class="${icon}"></i>
                <span>${text}</span>
            `;
        } else {
            button.textContent = text;
        }
    }
    
    if (onClick && typeof onClick === 'function') {
        button.addEventListener('click', onClick);
    }
    
    return button;
}

/**
 * Button group - organize multiple buttons
 * 
 * @param {Array<HTMLButtonElement>} buttons - Array of button elements
 * @param {Object} options - Group configuration
 * @returns {HTMLDivElement} Button group element
 */
export function createButtonGroup(buttons, options = {}) {
    const { vertical = false, className = '' } = options;
    
    const group = document.createElement('div');
    group.className = `jgf-btn-group ${vertical ? 'jgf-btn-group-vertical' : ''} ${className}`.trim();
    
    buttons.forEach(button => group.appendChild(button));
    
    return group;
}

export default { createButton, createButtonGroup };
