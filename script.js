// Основной JavaScript файл для сайта BEACONSCRIPT

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация
    init();
});

function init() {
    // Инициализация анимаций при прокрутке
    initScrollAnimations();
    
    // Инициализация плавной прокрутки
    initSmoothScroll();
    
    // Инициализация адаптивного меню (если понадобится)
    initResponsiveFeatures();
}


// Анимации при прокрутке
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдение за элементами
    const animatedElements = document.querySelectorAll('.feature-card, .feature-item, .privacy-section');
    animatedElements.forEach(function(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Плавная прокрутка
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Учитываем высоту заголовка
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Адаптивные функции
function initResponsiveFeatures() {
    // Обработка изменения размера окна
    window.addEventListener('resize', function() {
        handleResize();
    });
    
    // Обработка ориентации устройства
    window.addEventListener('orientationchange', function() {
        setTimeout(handleResize, 100);
    });
}

function handleResize() {
    // Адаптация под размер экрана
    // Фоновое изображение автоматически адаптируется через CSS
}

// Функции для работы с изображениями
function preloadImages() {
    const images = [
        'images/hi.jpg',
        'images/obyaz.jpg',
        'images/nospam.jpg'
    ];
    
    images.forEach(function(src) {
        const img = new Image();
        img.src = src;
    });
}

// Инициализация предзагрузки изображений
preloadImages();

// Функции для улучшения производительности
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Оптимизированная обработка прокрутки
const debouncedScrollHandler = debounce(function() {
    // Логика обработки прокрутки
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Можно добавить эффекты при прокрутке
    if (scrollTop > 100) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Функции для работы с формами (если понадобятся)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(function(input) {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Функции для работы с модальными окнами (если понадобятся)
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Обработка кликов вне модального окна
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Функции для работы с уведомлениями
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: var(--shadow-medium);
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(function() {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Автоматическое скрытие
    setTimeout(function() {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(function() {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Функции для работы с копированием в буфер обмена
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
            showNotification('Скопировано в буфер обмена!', 'success');
        }).catch(function() {
            showNotification('Ошибка копирования', 'error');
        });
    } else {
        // Fallback для старых браузеров
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showNotification('Скопировано в буфер обмена!', 'success');
        } catch (err) {
            showNotification('Ошибка копирования', 'error');
        }
        document.body.removeChild(textArea);
    }
}

// Обработка ошибок JavaScript
window.addEventListener('error', function(e) {
    console.error('JavaScript ошибка:', e.error);
    // Можно отправить ошибку на сервер для мониторинга
});

// Функции для работы с localStorage
function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Ошибка сохранения в localStorage:', e);
    }
}

function getFromStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error('Ошибка чтения из localStorage:', e);
        return null;
    }
}

// Инициализация темы (если понадобится)
function initTheme() {
    const savedTheme = getFromStorage('theme');
    if (savedTheme) {
        document.body.classList.add(`theme-${savedTheme}`);
    }
}

// Экспорт функций для использования в других скриптах
window.BEACONSCRIPT = {
    showNotification: showNotification,
    copyToClipboard: copyToClipboard,
    openModal: openModal,
    closeModal: closeModal,
    saveToStorage: saveToStorage,
    getFromStorage: getFromStorage
};
