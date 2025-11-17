// Dev Console Manager
class DevConsoleManager {
    constructor() {
        this.console = document.getElementById('devConsole');
        this.consoleToggle = document.getElementById('consoleToggle');
        this.terminalOutput = document.getElementById('terminalOutput');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.chatSend = document.getElementById('chatSend');
        this.coffeeCount = 0;
        this.visitorCount = 0;
        this.startTime = Date.now();

        this.init();
    }

    init() {
        // Console toggle
        this.consoleToggle.addEventListener('click', () => {
            this.console.classList.toggle('collapsed');
            this.consoleToggle.textContent = this.console.classList.contains('collapsed') ? '▲' : '_';
        });

        // Console tab switching
        document.querySelectorAll('.console-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const consoleType = tab.dataset.console;
                this.switchConsolePanel(consoleType);

                // Update active tab
                document.querySelectorAll('.console-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });

        // Chat functionality
        this.chatSend.addEventListener('click', () => this.sendChatMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendChatMessage();
            }
        });

        // Initialize all panels
        this.initTerminal();
        this.initSpotify();
        this.initStats();
        this.initChat();
    }

    switchConsolePanel(panelName) {
        document.querySelectorAll('.console-panel').forEach(panel => {
            panel.classList.remove('active');
        });

        const panelMap = {
            'terminal': 'terminalPanel',
            'spotify': 'spotifyPanel',
            'stats': 'statsPanel',
            'chat': 'chatPanel'
        };

        const panel = document.getElementById(panelMap[panelName]);
        if (panel) {
            panel.classList.add('active');
        }
    }

    initTerminal() {
        // Simulate terminal commands
        let commandIndex = 0;
        const addCommand = () => {
            if (commandIndex < terminalCommands.length) {
                const line = document.createElement('div');
                line.className = 'terminal-line';
                line.textContent = terminalCommands[commandIndex];
                this.terminalOutput.appendChild(line);

                // Auto-scroll
                this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;

                commandIndex++;
                setTimeout(addCommand, Math.random() * 3000 + 2000);
            } else {
                // Loop back or add random commands
                setTimeout(() => {
                    const randomCommands = [
                        '$ git pull origin main',
                        'Already up to date.',
                        '$ npm test',
                        '✓ All tests passing',
                        '$ echo "Still thinking..."',
                        'Still thinking...',
                        '$ whoami',
                        'builder, thinker, coffee drinker'
                    ];

                    const line = document.createElement('div');
                    line.className = 'terminal-line';
                    line.textContent = randomCommands[Math.floor(Math.random() * randomCommands.length)];
                    this.terminalOutput.appendChild(line);
                    this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;

                    // Keep only last 20 lines
                    while (this.terminalOutput.children.length > 20) {
                        this.terminalOutput.removeChild(this.terminalOutput.firstChild);
                    }
                }, Math.random() * 5000 + 3000);
            }
        };

        addCommand();
    }

    initSpotify() {
        // Rotate through music tracks
        const trackName = document.getElementById('trackName');
        let trackIndex = 0;

        const updateTrack = () => {
            trackName.textContent = musicTracks[trackIndex];
            trackIndex = (trackIndex + 1) % musicTracks.length;
        };

        updateTrack();
        setInterval(updateTrack, 180000); // Change every 3 minutes
    }

    initStats() {
        // Coffee counter - increment randomly
        setInterval(() => {
            if (Math.random() > 0.95) {
                this.coffeeCount++;
                document.getElementById('coffeeCount').textContent = this.coffeeCount;
            }
        }, 10000);

        // Visitor counter - simulate visitors
        this.visitorCount = Math.floor(Math.random() * 10) + 1;
        document.getElementById('visitorCount').textContent = this.visitorCount;

        setInterval(() => {
            const change = Math.random() > 0.5 ? 1 : -1;
            this.visitorCount = Math.max(1, this.visitorCount + change);
            document.getElementById('visitorCount').textContent = this.visitorCount;
        }, 15000);

        // Uptime counter
        const updateUptime = () => {
            const elapsed = Date.now() - this.startTime;
            const hours = Math.floor(elapsed / 3600000);
            const minutes = Math.floor((elapsed % 3600000) / 60000);
            document.getElementById('uptime').textContent = `${hours}h ${minutes}m`;
        };

        updateUptime();
        setInterval(updateUptime, 60000); // Update every minute
    }

    initChat() {
        // Add welcome message
        this.addChatMessage('System', 'IRC-style chat active. Say hi! 👋');

        // Simulate occasional visitor messages
        const visitorMessages = [
            'Love the brain browser concept!',
            'This is so creative',
            'How did you build this?',
            'Checking out your projects 👀',
            'Coffee counter is relatable 😄',
            'Great idea with the tabs!',
            'Your reading list is inspiring'
        ];

        setInterval(() => {
            if (Math.random() > 0.7) {
                const visitor = mockVisitors[Math.floor(Math.random() * mockVisitors.length)];
                const message = visitorMessages[Math.floor(Math.random() * visitorMessages.length)];
                this.addChatMessage(visitor.name, message);
            }
        }, 30000); // Every 30 seconds
    }

    sendChatMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        this.addChatMessage('You', message);
        this.chatInput.value = '';

        // Simulate response
        setTimeout(() => {
            const responses = [
                'Thanks for reaching out! 👍',
                'Interesting point!',
                'I\'ll think about that',
                'Great question!',
                'Appreciate the feedback!'
            ];
            this.addChatMessage('Host', responses[Math.floor(Math.random() * responses.length)]);
        }, 1000 + Math.random() * 2000);
    }

    addChatMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message';

        const timestamp = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });

        messageDiv.innerHTML = `
            <span class="timestamp">${timestamp}</span>
            <strong>${sender}:</strong> ${message}
        `;

        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;

        // Keep only last 50 messages
        while (this.chatMessages.children.length > 50) {
            this.chatMessages.removeChild(this.chatMessages.firstChild);
        }
    }
}

// Initialize console manager
let consoleManager;
document.addEventListener('DOMContentLoaded', () => {
    consoleManager = new DevConsoleManager();
});
