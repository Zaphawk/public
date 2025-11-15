// Browser History Manager
class HistoryManager {
    constructor() {
        this.modal = document.getElementById('historyModal');
        this.historyBtn = document.getElementById('historyBtn');
        this.closeBtn = document.getElementById('closeHistory');
        this.calendar = document.getElementById('calendar');
        this.historyPreview = document.getElementById('historyPreview');

        this.init();
    }

    init() {
        // Open history modal
        this.historyBtn.addEventListener('click', () => {
            this.openHistory();
        });

        // Close history modal
        this.closeBtn.addEventListener('click', () => {
            this.closeHistory();
        });

        // Close on overlay click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeHistory();
            }
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeHistory();
            }
        });
    }

    openHistory() {
        this.modal.classList.add('active');
        this.renderCalendar();
    }

    closeHistory() {
        this.modal.classList.remove('active');
    }

    renderCalendar() {
        // Create a simple calendar for the current month
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        let calendarHTML = `
            <div class="calendar-header">
                <h3>${firstDay.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
            </div>
            <div class="calendar-grid">
                <div class="calendar-day-name">Sun</div>
                <div class="calendar-day-name">Mon</div>
                <div class="calendar-day-name">Tue</div>
                <div class="calendar-day-name">Wed</div>
                <div class="calendar-day-name">Thu</div>
                <div class="calendar-day-name">Fri</div>
                <div class="calendar-day-name">Sat</div>
        `;

        // Empty cells before the first day
        for (let i = 0; i < startingDayOfWeek; i++) {
            calendarHTML += '<div class="calendar-day empty"></div>';
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateString = date.toISOString().split('T')[0];
            const hasHistory = brainHistory[dateString];
            const isToday = day === now.getDate();

            calendarHTML += `
                <div class="calendar-day ${hasHistory ? 'has-history' : ''} ${isToday ? 'today' : ''}"
                     data-date="${dateString}"
                     onclick="historyManager.showHistoryForDate('${dateString}')">
                    ${day}
                    ${hasHistory ? '<span class="history-indicator">•</span>' : ''}
                </div>
            `;
        }

        calendarHTML += '</div>';

        // Add some CSS for the calendar
        const style = `
            <style>
                .calendar-header {
                    text-align: center;
                    margin-bottom: 16px;
                }
                .calendar-header h3 {
                    font-size: 18px;
                    color: #333;
                }
                .calendar-grid {
                    display: grid;
                    grid-template-columns: repeat(7, 1fr);
                    gap: 8px;
                }
                .calendar-day-name {
                    text-align: center;
                    font-weight: 600;
                    font-size: 12px;
                    color: #666;
                    padding: 8px;
                }
                .calendar-day {
                    aspect-ratio: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    cursor: pointer;
                    position: relative;
                    font-size: 14px;
                    transition: all 0.2s;
                }
                .calendar-day.empty {
                    cursor: default;
                }
                .calendar-day.has-history {
                    background: #e3f2fd;
                    color: #1976d2;
                    font-weight: 600;
                }
                .calendar-day.has-history:hover {
                    background: #bbdefb;
                    transform: scale(1.1);
                }
                .calendar-day.today {
                    border: 2px solid #1976d2;
                }
                .history-indicator {
                    position: absolute;
                    bottom: 2px;
                    font-size: 20px;
                    color: #1976d2;
                }
            </style>
        `;

        this.calendar.innerHTML = style + calendarHTML;
    }

    showHistoryForDate(dateString) {
        const history = brainHistory[dateString];

        if (!history) {
            this.historyPreview.innerHTML = `
                <div class="placeholder">
                    <p>No recorded state for this date.</p>
                    <p style="font-size: 12px; color: #999; margin-top: 8px;">
                        Brain states are captured automatically as you work.
                    </p>
                </div>
            `;
            return;
        }

        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        let previewHTML = `
            <div class="history-detail">
                <h3 style="margin-bottom: 16px; color: #1976d2;">${formattedDate}</h3>

                <div style="margin-bottom: 16px;">
                    <h4 style="font-size: 14px; color: #666; margin-bottom: 8px;">Active Tabs</h4>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        `;

        history.tabs.forEach(tabId => {
            const tabData = tabsData.find(t => t.id === tabId);
            if (tabData) {
                previewHTML += `
                    <span style="background: #e3f2fd; padding: 4px 12px; border-radius: 12px; font-size: 12px;">
                        ${tabData.icon} ${tabData.title}
                    </span>
                `;
            }
        });

        previewHTML += `
                    </div>
                </div>

                <div style="margin-bottom: 16px;">
                    <h4 style="font-size: 14px; color: #666; margin-bottom: 8px;">Notes</h4>
                    <p style="font-size: 13px; font-style: italic; color: #444;">
                        "${history.notes}"
                    </p>
                </div>

                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                    <div style="background: #f5f5f5; padding: 12px; border-radius: 8px;">
                        <div style="font-size: 12px; color: #666;">Active Projects</div>
                        <div style="font-size: 20px; font-weight: 600; color: #1976d2;">${history.projects}</div>
                    </div>
                    <div style="background: #f5f5f5; padding: 12px; border-radius: 8px;">
                        <div style="font-size: 12px; color: #666;">Coffee Count</div>
                        <div style="font-size: 20px; font-weight: 600; color: #1976d2;">☕ ${history.coffee}</div>
                    </div>
                </div>

                <div style="margin-top: 16px; padding: 12px; background: #fff3e0; border-left: 4px solid #ff9800; border-radius: 4px;">
                    <p style="font-size: 12px; color: #e65100;">
                        💡 This is a snapshot of your brain's state on this date.
                    </p>
                </div>
            </div>
        `;

        this.historyPreview.innerHTML = previewHTML;
    }
}

// Initialize history manager
let historyManager;
document.addEventListener('DOMContentLoaded', () => {
    historyManager = new HistoryManager();
});
