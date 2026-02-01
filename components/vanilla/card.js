/**
 * Card Component - Vanilla JavaScript
 * 
 * Creates card components for content display.
 * 
 * @module components/vanilla/card
 */

/**
 * Create a card element
 * 
 * @param {Object} options - Card configuration
 * @param {string} options.title - Card title
 * @param {string} options.subtitle - Card subtitle
 * @param {string} options.content - Card content
 * @param {string} options.image - Image URL
 * @param {Array} options.actions - Array of action buttons
 * @param {string} options.variant - Card variant (default, elevated, outlined)
 * @returns {HTMLDivElement} Card element
 */
export function createCard(options = {}) {
    const {
        title = '',
        subtitle = '',
        content = '',
        image = null,
        actions = [],
        variant = 'default',
        className = ''
    } = options;
    
    const card = document.createElement('div');
    card.className = `jgf-card jgf-card-${variant} ${className}`.trim();
    
    if (image) {
        const cardImage = document.createElement('div');
        cardImage.className = 'jgf-card-image';
        cardImage.style.backgroundImage = `url(${image})`;
        card.appendChild(cardImage);
    }
    
    const cardBody = document.createElement('div');
    cardBody.className = 'jgf-card-body';
    
    if (title) {
        const cardTitle = document.createElement('h3');
        cardTitle.className = 'jgf-card-title';
        cardTitle.textContent = title;
        cardBody.appendChild(cardTitle);
    }
    
    if (subtitle) {
        const cardSubtitle = document.createElement('p');
        cardSubtitle.className = 'jgf-card-subtitle';
        cardSubtitle.textContent = subtitle;
        cardBody.appendChild(cardSubtitle);
    }
    
    if (content) {
        const cardContent = document.createElement('div');
        cardContent.className = 'jgf-card-content';
        cardContent.innerHTML = content;
        cardBody.appendChild(cardContent);
    }
    
    card.appendChild(cardBody);
    
    if (actions.length > 0) {
        const cardActions = document.createElement('div');
        cardActions.className = 'jgf-card-actions';
        actions.forEach(action => cardActions.appendChild(action));
        card.appendChild(cardActions);
    }
    
    return card;
}

/**
 * Create a product card
 * 
 * @param {Object} options - Product card configuration
 * @returns {HTMLDivElement} Product card element
 */
export function createProductCard(options = {}) {
    const {
        name,
        price,
        image,
        description,
        badge = null,
        onAddToCart = null
    } = options;
    
    const card = document.createElement('div');
    card.className = 'jgf-card jgf-product-card';
    
    if (image) {
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'jgf-product-image';
        imageWrapper.style.backgroundImage = `url(${image})`;
        
        if (badge) {
            const badgeEl = document.createElement('span');
            badgeEl.className = 'jgf-product-badge';
            badgeEl.textContent = badge;
            imageWrapper.appendChild(badgeEl);
        }
        
        card.appendChild(imageWrapper);
    }
    
    const cardBody = document.createElement('div');
    cardBody.className = 'jgf-card-body';
    
    const header = document.createElement('div');
    header.className = 'jgf-product-header';
    
    const nameEl = document.createElement('h3');
    nameEl.className = 'jgf-product-name';
    nameEl.textContent = name;
    
    const priceEl = document.createElement('span');
    priceEl.className = 'jgf-product-price';
    priceEl.textContent = `$${price.toFixed(2)}`;
    
    header.appendChild(nameEl);
    header.appendChild(priceEl);
    cardBody.appendChild(header);
    
    if (description) {
        const descEl = document.createElement('p');
        descEl.className = 'jgf-product-description';
        descEl.textContent = description;
        cardBody.appendChild(descEl);
    }
    
    card.appendChild(cardBody);
    
    if (onAddToCart) {
        const cardActions = document.createElement('div');
        cardActions.className = 'jgf-card-actions';
        
        const addButton = document.createElement('button');
        addButton.className = 'jgf-btn jgf-btn-primary jgf-btn-block';
        addButton.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
        addButton.addEventListener('click', () => onAddToCart(options));
        
        cardActions.appendChild(addButton);
        card.appendChild(cardActions);
    }
    
    return card;
}

export default { createCard, createProductCard };
