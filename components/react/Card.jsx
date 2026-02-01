/**
 * Card Component - React
 * 
 * Flexible card component for content display.
 * 
 * @module components/react/Card
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card Component
 */
export const Card = ({
    children,
    variant = 'default',
    className = '',
    ...props
}) => {
    const classes = [
        'jgf-card',
        `jgf-card-${variant}`,
        className
    ].filter(Boolean).join(' ');
    
    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
};

/**
 * Card Header Component
 */
export const CardHeader = ({ children, className = '', ...props }) => (
    <div className={`jgf-card-header ${className}`} {...props}>
        {children}
    </div>
);

/**
 * Card Body Component
 */
export const CardBody = ({ children, className = '', ...props }) => (
    <div className={`jgf-card-body ${className}`} {...props}>
        {children}
    </div>
);

/**
 * Card Title Component
 */
export const CardTitle = ({ children, className = '', ...props }) => (
    <h3 className={`jgf-card-title ${className}`} {...props}>
        {children}
    </h3>
);

/**
 * Card Actions Component
 */
export const CardActions = ({ children, className = '', ...props }) => (
    <div className={`jgf-card-actions ${className}`} {...props}>
        {children}
    </div>
);

/**
 * Complete Card with all parts
 */
export const FullCard = ({
    title,
    subtitle,
    image,
    children,
    actions,
    variant = 'default',
    className = ''
}) => (
    <Card variant={variant} className={className}>
        {image && (
            <div className="jgf-card-image" style={{ backgroundImage: `url(${image})` }} />
        )}
        <CardBody>
            {title && <CardTitle>{title}</CardTitle>}
            {subtitle && <p className="jgf-card-subtitle">{subtitle}</p>}
            <div className="jgf-card-content">{children}</div>
        </CardBody>
        {actions && <CardActions>{actions}</CardActions>}
    </Card>
);

Card.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['default', 'elevated', 'outlined']),
    className: PropTypes.string
};

CardHeader.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

CardBody.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

CardTitle.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

CardActions.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

FullCard.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    image: PropTypes.string,
    children: PropTypes.node.isRequired,
    actions: PropTypes.node,
    variant: PropTypes.oneOf(['default', 'elevated', 'outlined']),
    className: PropTypes.string
};

export default Card;
