// Tab management system
class TabManager {
    constructor() {
        this.tabs = [];
        this.activeTabId = null;
        this.tabsContainer = document.getElementById('tabsContainer');
        this.contentArea = document.getElementById('tabContentArea');
        this.urlInput = document.getElementById('urlInput');
        this.init();
    }

    init() {
        // Load tabs from data
        tabsData.forEach(tabData => {
            this.createTab(tabData);
        });

        // Activate first tab
        if (this.tabs.length > 0) {
            this.activateTab(this.tabs[0].id);
        }

        // Start tab reordering animation
        this.startPriorityReordering();
    }

    createTab(tabData) {
        // Create tab element
        const tab = document.createElement('div');
        tab.className = 'tab';
        tab.dataset.tabId = tabData.id;

        if (tabData.pinned) {
            tab.classList.add('pinned');
        }

        if (tabData.pulse) {
            tab.classList.add('pulse');
        }

        tab.innerHTML = `
            <span class="tab-icon">${tabData.icon}</span>
            <span class="tab-title">${tabData.title}</span>
            <span class="tab-close">×</span>
        `;

        // Event listeners
        tab.addEventListener('click', (e) => {
            if (!e.target.classList.contains('tab-close')) {
                this.activateTab(tabData.id);
            }
        });

        tab.querySelector('.tab-close').addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeTab(tabData.id);
        });

        this.tabsContainer.appendChild(tab);

        // Create content
        this.createTabContent(tabData);

        this.tabs.push({ id: tabData.id, element: tab, data: tabData });
    }

    createTabContent(tabData) {
        const contentDiv = document.createElement('div');
        contentDiv.className = 'tab-content';
        contentDiv.dataset.tabId = tabData.id;

        switch (tabData.type) {
            case 'markdown':
                contentDiv.innerHTML = `<div class="content-markdown">${this.parseMarkdown(tabData.content)}</div>`;
                break;

            case 'kanban':
                contentDiv.innerHTML = this.renderKanban(tabData.content);
                break;

            case 'dashboard':
                contentDiv.innerHTML = this.renderDashboard(tabData.content);
                break;

            case 'text':
                contentDiv.innerHTML = `<div class="content-text">${tabData.content}</div>`;
                break;

            case 'chat':
                contentDiv.innerHTML = `
                    <div class="content-chat">
                        <div class="chat-welcome">
                            ${this.parseMarkdown(tabData.content)}
                            <div class="chat-form">
                                <input type="text" placeholder="Your Name" id="chatName">
                                <input type="email" placeholder="Your Email" id="chatEmail">
                                <textarea placeholder="Your Message" id="chatMessage" rows="4"></textarea>
                                <button onclick="sendChatMessage()">Send Message</button>
                            </div>
                        </div>
                    </div>
                `;
                break;
        }

        this.contentArea.appendChild(contentDiv);
    }

    parseMarkdown(text) {
        // Simple markdown parser
        return text
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^- (.*$)/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^(?!<[h|u|l])/gm, '<p>')
            .replace(/(?<![>])$/gm, '</p>');
    }

    renderKanban(data) {
        let html = '<div class="content-kanban">';

        data.columns.forEach(column => {
            html += `
                <div class="kanban-column">
                    <div class="kanban-header">${column.title}</div>
            `;

            column.cards.forEach(card => {
                const tags = card.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
                html += `
                    <div class="kanban-card" draggable="true">
                        <div class="card-title">${card.title}</div>
                        <div class="card-tags">${tags}</div>
                    </div>
                `;
            });

            html += '</div>';
        });

        html += '</div>';
        return html;
    }

    renderDashboard(data) {
        let html = '<div class="content-dashboard">';

        data.metrics.forEach(metric => {
            html += `
                <div class="metric-card" style="background: linear-gradient(135deg, ${metric.color} 0%, ${this.adjustColor(metric.color, -20)} 100%)">
                    <div class="metric-label">${metric.label}</div>
                    <div class="metric-value">${metric.value}</div>
                </div>
            `;
        });

        html += '</div>';
        return html;
    }

    adjustColor(color, percent) {
        // Simple color adjustment for gradients
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255))
            .toString(16).slice(1);
    }

    activateTab(tabId) {
        // Deactivate all tabs
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });

        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Activate selected tab
        const tab = this.tabs.find(t => t.id === tabId);
        if (tab) {
            tab.element.classList.add('active');
            const content = document.querySelector(`.tab-content[data-tab-id="${tabId}"]`);
            if (content) {
                content.classList.add('active');
            }
            this.activeTabId = tabId;
            this.updateURL(tab.data);
        }
    }

    updateURL(tabData) {
        const urls = {
            'currently-reading': 'brain://localhost/reading',
            'active-projects': 'brain://localhost/projects',
            'impact-metrics': 'brain://localhost/metrics',
            'random-thoughts': 'brain://localhost/thoughts.txt',
            'lets-talk': 'brain://localhost/contact'
        };
        this.urlInput.value = urls[tabData.id] || 'brain://localhost/';
    }

    closeTab(tabId) {
        const tabIndex = this.tabs.findIndex(t => t.id === tabId);
        if (tabIndex === -1) return;

        const tab = this.tabs[tabIndex];

        // Don't close if it's the last tab
        if (this.tabs.length === 1) {
            return;
        }

        // Remove elements
        tab.element.remove();
        document.querySelector(`.tab-content[data-tab-id="${tabId}"]`).remove();

        // Remove from array
        this.tabs.splice(tabIndex, 1);

        // Activate another tab if this was active
        if (this.activeTabId === tabId) {
            const newActiveIndex = Math.min(tabIndex, this.tabs.length - 1);
            this.activateTab(this.tabs[newActiveIndex].id);
        }
    }

    startPriorityReordering() {
        // Simulate dynamic tab reordering based on "priority"
        setInterval(() => {
            // Get non-pinned tabs
            const nonPinnedTabs = this.tabs.filter(t => !t.data.pinned);

            if (nonPinnedTabs.length > 1 && Math.random() > 0.7) {
                // Randomly swap two tabs (simulate priority change)
                const idx1 = Math.floor(Math.random() * nonPinnedTabs.length);
                let idx2 = Math.floor(Math.random() * nonPinnedTabs.length);
                while (idx2 === idx1) {
                    idx2 = Math.floor(Math.random() * nonPinnedTabs.length);
                }

                const tab1 = nonPinnedTabs[idx1].element;
                const tab2 = nonPinnedTabs[idx2].element;

                // Swap in DOM
                const parent = tab1.parentNode;
                const next1 = tab1.nextSibling === tab2 ? tab1 : tab1.nextSibling;
                tab2.parentNode.insertBefore(tab1, tab2);
                parent.insertBefore(tab2, next1);
            }
        }, 8000); // Every 8 seconds
    }
}

// Initialize tab manager
let tabManager;
document.addEventListener('DOMContentLoaded', () => {
    tabManager = new TabManager();
});

// Helper function for chat
function sendChatMessage() {
    const name = document.getElementById('chatName')?.value;
    const email = document.getElementById('chatEmail')?.value;
    const message = document.getElementById('chatMessage')?.value;

    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }

    // In a real implementation, this would send to a backend
    alert(`Thanks ${name}! Your message has been sent. I'll get back to you soon!`);

    // Clear form
    document.getElementById('chatName').value = '';
    document.getElementById('chatEmail').value = '';
    document.getElementById('chatMessage').value = '';
}
