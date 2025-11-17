// Main Application Controller
class BrainBrowserApp {
    constructor() {
        this.statusIndicator = document.getElementById('statusIndicator');
        this.backBtn = document.getElementById('backBtn');
        this.forwardBtn = document.getElementById('forwardBtn');
        this.refreshBtn = document.getElementById('refreshBtn');

        this.init();
    }

    init() {
        console.log('🧠 Brain Browser initialized');

        // Start status message rotation
        this.rotateStatusMessages();

        // Navigation buttons
        this.setupNavigation();

        // Add some Easter eggs
        this.setupEasterEggs();

        // Window focus effects
        this.setupFocusEffects();

        // Performance monitoring
        this.monitorPerformance();
    }

    rotateStatusMessages() {
        let currentIndex = 0;

        const updateStatus = () => {
            this.statusIndicator.textContent = statusMessages[currentIndex];
            currentIndex = (currentIndex + 1) % statusMessages.length;

            // Trigger animation by removing and re-adding
            this.statusIndicator.style.animation = 'none';
            setTimeout(() => {
                this.statusIndicator.style.animation = '';
            }, 10);
        };

        updateStatus();
        setInterval(updateStatus, 8000); // Change every 8 seconds
    }

    setupNavigation() {
        // Back button
        this.backBtn.addEventListener('click', () => {
            this.showToast('No previous page in history');
        });

        // Forward button
        this.forwardBtn.addEventListener('click', () => {
            this.showToast('No forward page in history');
        });

        // Refresh button
        this.refreshBtn.addEventListener('click', () => {
            this.refreshCurrentTab();
        });
    }

    refreshCurrentTab() {
        const refreshIcon = this.refreshBtn;
        refreshIcon.style.animation = 'spin 0.5s ease-in-out';

        setTimeout(() => {
            refreshIcon.style.animation = '';
            this.showToast('Tab refreshed ✓');
        }, 500);

        // Add spin animation
        if (!document.getElementById('spinAnimation')) {
            const style = document.createElement('style');
            style.id = 'spinAnimation';
            style.textContent = `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 10000;
            animation: toastSlide 0.3s ease-out;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'toastSlideOut 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 2000);

        // Add toast animations
        if (!document.getElementById('toastAnimations')) {
            const style = document.createElement('style');
            style.id = 'toastAnimations';
            style.textContent = `
                @keyframes toastSlide {
                    from {
                        opacity: 0;
                        transform: translateX(-50%) translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                }
                @keyframes toastSlideOut {
                    from {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(-50%) translateY(-20px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupEasterEggs() {
        // Konami code Easter egg
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;

        document.addEventListener('keydown', (e) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    this.activateKonamiMode();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });

        // Triple-click on logo area
        let clickCount = 0;
        let clickTimer;

        document.querySelector('.window-controls').addEventListener('click', () => {
            clickCount++;
            clearTimeout(clickTimer);

            if (clickCount === 3) {
                this.showSecretMessage();
                clickCount = 0;
            } else {
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 500);
            }
        });
    }

    activateKonamiMode() {
        this.showToast('🎮 Konami Code Activated! Brain Mode: ULTRA');

        // Add rainbow effect to tabs
        document.querySelectorAll('.tab').forEach((tab, index) => {
            tab.style.animation = `rainbow 3s linear infinite ${index * 0.2}s`;
        });

        // Add rainbow animation
        if (!document.getElementById('rainbowAnimation')) {
            const style = document.createElement('style');
            style.id = 'rainbowAnimation';
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        // Remove after 10 seconds
        setTimeout(() => {
            document.querySelectorAll('.tab').forEach(tab => {
                tab.style.animation = '';
            });
        }, 10000);
    }

    showSecretMessage() {
        const messages = [
            '🎯 You found a secret! Keep exploring...',
            '🧠 Your curiosity is appreciated!',
            '✨ Easter egg discovered!',
            '🔍 You\'re quite observant!',
            '💡 Secret achievement unlocked!'
        ];

        const message = messages[Math.floor(Math.random() * messages.length)];
        this.showToast(message);
    }

    setupFocusEffects() {
        // Change title when tab loses focus
        let originalTitle = document.title;

        document.addEventListener('visibilationchange', () => {
            if (document.hidden) {
                document.title = '🧠 Come back!';
            } else {
                document.title = originalTitle;
            }
        });

        // Also handle window blur/focus
        window.addEventListener('blur', () => {
            document.title = '🧠 Missing you...';
        });

        window.addEventListener('focus', () => {
            document.title = originalTitle;
        });
    }

    monitorPerformance() {
        // Log performance metrics to console
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = window.performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

                    console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
                    console.log('📊 Performance metrics:', {
                        'DNS Lookup': perfData.domainLookupEnd - perfData.domainLookupStart,
                        'TCP Connection': perfData.connectEnd - perfData.connectStart,
                        'DOM Loading': perfData.domComplete - perfData.domLoading,
                        'Page Load': pageLoadTime
                    });
                }, 0);
            });
        }

        // Memory usage (if available)
        if (window.performance && window.performance.memory) {
            setInterval(() => {
                const memory = window.performance.memory;
                const usedMB = (memory.usedJSHeapSize / 1048576).toFixed(2);
                const totalMB = (memory.totalJSHeapSize / 1048576).toFixed(2);

                console.log(`🧠 Memory: ${usedMB}MB / ${totalMB}MB`);
            }, 60000); // Every minute
        }
    }
}

// Initialize the app
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new BrainBrowserApp();

    // Welcome message in console
    console.log('%c🧠 Welcome to Brain Browser!', 'font-size: 20px; font-weight: bold; color: #8ab4f8;');
    console.log('%cThis is a creative experiment in digital expression.', 'font-size: 12px; color: #9aa0a6;');
    console.log('%cFeel free to explore the code!', 'font-size: 12px; color: #9aa0a6;');
    console.log('%c\nTry these:', 'font-size: 14px; font-weight: bold; color: #81c995;');
    console.log('- Click the 📅 button to see brain history');
    console.log('- Watch for ghost cursors from other visitors');
    console.log('- Check the dev console at the bottom');
    console.log('- Triple-click the window controls for a surprise');
    console.log('\n💡 Tip: Try the Konami code!');
});

// Handle errors gracefully
window.addEventListener('error', (e) => {
    console.error('❌ Error caught:', e.message);
});

// Service Worker for offline capability (optional future enhancement)
if ('serviceWorker' in navigator) {
    // Commented out for now, but ready to implement
    // navigator.serviceWorker.register('/sw.js');
}
