/**
 * CustomSelect - Modern Dropdown Component
 * 
 * Features:
 * - Full keyboard navigation (Arrow keys, Enter, Escape)
 * - ARIA accessibility (combobox, listbox, option roles)
 * - Smooth animations
 * - Search/filter support
 * - Custom styling with CSS variables
 */

export class CustomSelect {
    constructor(selectElement, options = {}) {
        this.originalSelect = selectElement;
        this.options = {
            searchable: options.searchable || false,
            placeholder: options.placeholder || 'Select...',
            ...options
        };

        this.isOpen = false;
        this.selectedIndex = -1;
        this.focusedIndex = -1;
        this.id = `custom-select-${Math.random().toString(36).substr(2, 9)}`;

        this.init();
    }

    init() {
        // Hide original select
        this.originalSelect.style.display = 'none';
        this.originalSelect.setAttribute('aria-hidden', 'true');

        // Build custom dropdown
        this.container = this.createContainer();
        this.originalSelect.parentNode.insertBefore(this.container, this.originalSelect.nextSibling);

        // Sync initial value
        this.syncFromOriginal();

        // Bind events
        this.bindEvents();
    }

    createContainer() {
        const container = document.createElement('div');
        container.className = 'custom-select';
        container.innerHTML = `
            <button type="button" 
                    class="custom-select__trigger"
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded="false"
                    aria-controls="${this.id}-listbox"
                    id="${this.id}-button">
                <span class="custom-select__value">${this.options.placeholder}</span>
                <span class="custom-select__arrow">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            </button>
            <div class="custom-select__dropdown" id="${this.id}-listbox" role="listbox" aria-labelledby="${this.id}-button">
                ${this.options.searchable ? `
                    <div class="custom-select__search">
                        <input type="text" placeholder="Search..." class="custom-select__search-input" />
                    </div>
                ` : ''}
                <ul class="custom-select__options">
                    ${this.renderOptions()}
                </ul>
            </div>
        `;
        return container;
    }

    renderOptions() {
        const originalOptions = this.originalSelect.querySelectorAll('option');
        return Array.from(originalOptions).map((option, index) => {
            const isSelected = option.selected;
            const isDisabled = option.disabled;
            return `
                <li class="custom-select__option ${isSelected ? 'is-selected' : ''} ${isDisabled ? 'is-disabled' : ''}"
                    role="option"
                    aria-selected="${isSelected}"
                    data-value="${option.value}"
                    data-index="${index}"
                    tabindex="-1">
                    ${option.textContent}
                </li>
            `;
        }).join('');
    }

    bindEvents() {
        const trigger = this.container.querySelector('.custom-select__trigger');
        const dropdown = this.container.querySelector('.custom-select__dropdown');
        const optionsList = this.container.querySelector('.custom-select__options');

        // Toggle dropdown
        trigger.addEventListener('click', () => this.toggle());

        // Option selection
        optionsList.addEventListener('click', (e) => {
            const option = e.target.closest('.custom-select__option');
            if (option && !option.classList.contains('is-disabled')) {
                this.selectOption(parseInt(option.dataset.index));
            }
        });

        // Keyboard navigation
        trigger.addEventListener('keydown', (e) => this.handleKeydown(e));
        dropdown.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this.close();
            }
        });

        // Search functionality
        if (this.options.searchable) {
            const searchInput = this.container.querySelector('.custom-select__search-input');
            searchInput.addEventListener('input', (e) => this.filterOptions(e.target.value));
        }
    }

    handleKeydown(e) {
        const options = this.container.querySelectorAll('.custom-select__option:not(.is-disabled):not(.is-hidden)');

        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (this.isOpen && this.focusedIndex >= 0) {
                    const focusedOption = options[this.focusedIndex];
                    if (focusedOption) {
                        this.selectOption(parseInt(focusedOption.dataset.index));
                    }
                } else {
                    this.toggle();
                }
                break;

            case 'Escape':
                e.preventDefault();
                this.close();
                break;

            case 'ArrowDown':
                e.preventDefault();
                if (!this.isOpen) {
                    this.open();
                } else {
                    this.focusOption(Math.min(this.focusedIndex + 1, options.length - 1));
                }
                break;

            case 'ArrowUp':
                e.preventDefault();
                if (!this.isOpen) {
                    this.open();
                } else {
                    this.focusOption(Math.max(this.focusedIndex - 1, 0));
                }
                break;

            case 'Tab':
                this.close();
                break;
        }
    }

    focusOption(index) {
        const options = this.container.querySelectorAll('.custom-select__option:not(.is-disabled):not(.is-hidden)');

        // Remove previous focus
        options.forEach(opt => opt.classList.remove('is-focused'));

        if (options[index]) {
            options[index].classList.add('is-focused');
            options[index].scrollIntoView({ block: 'nearest' });
            this.focusedIndex = index;
        }
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        if (this.isOpen) return;

        this.isOpen = true;
        this.container.classList.add('is-open');

        const trigger = this.container.querySelector('.custom-select__trigger');
        trigger.setAttribute('aria-expanded', 'true');

        // Focus selected option or first option
        const selectedOption = this.container.querySelector('.custom-select__option.is-selected');
        if (selectedOption) {
            const allOptions = this.container.querySelectorAll('.custom-select__option:not(.is-disabled)');
            this.focusedIndex = Array.from(allOptions).indexOf(selectedOption);
            this.focusOption(this.focusedIndex);
        } else {
            this.focusOption(0);
        }

        // Focus search input if searchable
        if (this.options.searchable) {
            setTimeout(() => {
                this.container.querySelector('.custom-select__search-input').focus();
            }, 50);
        }
    }

    close() {
        if (!this.isOpen) return;

        this.isOpen = false;
        this.container.classList.remove('is-open');

        const trigger = this.container.querySelector('.custom-select__trigger');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();

        // Reset search
        if (this.options.searchable) {
            const searchInput = this.container.querySelector('.custom-select__search-input');
            searchInput.value = '';
            this.filterOptions('');
        }

        // Remove focus from options
        this.container.querySelectorAll('.custom-select__option').forEach(opt => {
            opt.classList.remove('is-focused');
        });
        this.focusedIndex = -1;
    }

    selectOption(index) {
        const originalOptions = this.originalSelect.querySelectorAll('option');
        const option = originalOptions[index];

        if (!option || option.disabled) return;

        // Update original select
        this.originalSelect.value = option.value;
        this.originalSelect.dispatchEvent(new Event('change', { bubbles: true }));

        // Update custom select display
        const valueDisplay = this.container.querySelector('.custom-select__value');
        valueDisplay.textContent = option.textContent;
        valueDisplay.classList.add('has-value');

        // Update option states
        this.container.querySelectorAll('.custom-select__option').forEach((opt, i) => {
            opt.classList.toggle('is-selected', i === index);
            opt.setAttribute('aria-selected', i === index);
        });

        this.selectedIndex = index;
        this.close();
    }

    filterOptions(query) {
        const options = this.container.querySelectorAll('.custom-select__option');
        const lowerQuery = query.toLowerCase();

        options.forEach(option => {
            const text = option.textContent.toLowerCase();
            const matches = text.includes(lowerQuery);
            option.classList.toggle('is-hidden', !matches);
        });

        // Reset focus to first visible option
        this.focusedIndex = -1;
        this.focusOption(0);
    }

    syncFromOriginal() {
        const selectedOption = this.originalSelect.querySelector('option:checked');
        if (selectedOption && selectedOption.value) {
            const index = Array.from(this.originalSelect.querySelectorAll('option')).indexOf(selectedOption);
            if (index >= 0) {
                const valueDisplay = this.container.querySelector('.custom-select__value');
                valueDisplay.textContent = selectedOption.textContent;
                valueDisplay.classList.add('has-value');
                this.selectedIndex = index;

                const customOption = this.container.querySelector(`[data-index="${index}"]`);
                if (customOption) {
                    customOption.classList.add('is-selected');
                    customOption.setAttribute('aria-selected', 'true');
                }
            }
        }
    }

    // Public API
    getValue() {
        return this.originalSelect.value;
    }

    setValue(value) {
        const options = this.originalSelect.querySelectorAll('option');
        const index = Array.from(options).findIndex(opt => opt.value === value);
        if (index >= 0) {
            this.selectOption(index);
        }
    }

    destroy() {
        this.originalSelect.style.display = '';
        this.originalSelect.removeAttribute('aria-hidden');
        this.container.remove();
    }
}

// Auto-initialize all selects with [data-custom-select]
export function initCustomSelects() {
    document.querySelectorAll('select[data-custom-select]').forEach(select => {
        new CustomSelect(select, {
            searchable: select.dataset.searchable === 'true'
        });
    });
}

export default CustomSelect;
