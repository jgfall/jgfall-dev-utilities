/**
 * Button Component - React
 * 
 * Customizable button component with variants, sizes, and states.
 * 
 * @module components/react/Button
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button Component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button variant
 * @param {string} props.size - Button size
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.loading - Loading state
 * @param {string} props.icon - Icon class
 * @param {Function} props.onClick - Click handler
 * @param {string} props.className - Additional CSS classes
 */
export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    icon = null,
    onClick,
    className = '',
    type = 'button',
    ...props
}) => {
    const classes = [
        'jgf-btn',
        `jgf-btn-${variant}`,
        `jgf-btn-${size}`,
        disabled && 'jgf-btn-disabled',
        loading && 'jgf-btn-loading',
        className
    ].filter(Boolean).join(' ');
    
    return (
        <button
            type={type}
            className={classes}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading && <span className="jgf-spinner" />}
            {!loading && icon && <i className={icon} />}
            <span>{children}</span>
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    icon: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset'])
};

export default Button;
