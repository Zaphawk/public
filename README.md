# 🧠 Brain Browser - Your Mind in Tabs

A creative personal website that visualizes your brain as a browser with infinite tabs. Each tab represents a different aspect of your life, thoughts, and work - all beautifully rendered as a Chrome-like interface.

## ✨ Features

### Core Concept
Your website IS your brain, literally rendered as a browser with these unique features:

- **📑 Living Tabs**: Each tab represents different aspects of you
  - 📚 Currently Reading
  - 🎯 Active Projects (Kanban board)
  - 📊 Impact Metrics Dashboard
  - 💭 Random Thoughts
  - 💬 Let's Talk (Contact)

- **🎨 Animated Tabs**: Tabs are alive!
  - Pulse animation on active content
  - Auto-reorder by priority
  - Pinned tabs for important content
  - Smooth transitions and hover effects

- **🌐 Dynamic URL Bar**: Shows your current status
  - "debugging life.exe"
  - "compiling ideas..."
  - "brewing coffee && coding"
  - And more rotating status messages!

### Twist #1: Browser History Mode
Click the calendar (📅) to see "what tabs were open" on specific dates:
- View your brain's state from past dates
- See how projects evolved over time
- Track your reading and coffee consumption
- Nostalgic journey through your digital mind

### Twist #2: Collaborative Cursor Mode
Real-time visitor presence and interaction:
- 👻 Ghost cursors of recent visitors
- 🔥 Heatmap showing what people find interesting
- 👥 Live visitor count
- See where others are exploring your brain

### The Dev Console
Persistent F12-style console at the bottom with:
- 💻 Real-time terminal commands
- 🎵 Current Spotify track (Now Playing)
- ☕ Coffee consumption counter
- 💬 IRC-style chat to ping you
- ⏱️ Uptime statistics

## 🚀 Getting Started

### Installation

Simply clone and open in a browser - no build process needed!

```bash
git clone <repository-url>
cd public
```

### Running Locally

Option 1: Simple HTTP Server
```bash
python -m http.server 8000
# or
python3 -m http.server 8000
```

Option 2: Node.js HTTP Server
```bash
npx http-server
```

Then open `http://localhost:8000` in your browser.

### No Dependencies!
This project uses vanilla JavaScript, HTML, and CSS - no frameworks, no build tools, just pure web technologies.

## 📁 Project Structure

```
.
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── app.js             # Main application controller
├── tabs.js            # Tab management system
├── console.js         # Dev console features
├── history.js         # Browser history & calendar
├── cursors.js         # Collaborative cursors & heatmap
├── data.js            # Content and configuration
└── README.md          # You are here!
```

## 🎨 Customization

### Adding Your Own Content

Edit `data.js` to customize:

```javascript
const tabsData = [
    {
        id: 'your-tab-id',
        icon: '📌',
        title: 'Your Tab Title',
        type: 'markdown', // or 'kanban', 'dashboard', 'text', 'chat'
        pinned: true,     // Pin important tabs
        pulse: true,      // Add pulse animation
        content: `Your content here...`
    }
];
```

### Supported Tab Types

1. **markdown**: Rich text with markdown formatting
2. **kanban**: Project board with drag-and-drop cards
3. **dashboard**: Metrics and statistics cards
4. **text**: Plain text, monospace (for thoughts/notes)
5. **chat**: Contact form with chat interface

### Status Messages

Customize URL bar messages in `data.js`:

```javascript
const statusMessages = [
    'your custom status',
    'another creative message',
    // Add your own!
];
```

### Styling

All styles are in `styles.css`. Key customization points:

- **Color scheme**: Edit CSS variables in `:root`
- **Animations**: Modify `@keyframes` definitions
- **Layout**: Adjust grid and flexbox properties
- **Browser chrome**: Customize `.browser-chrome` styles

## 🎯 Features Deep Dive

### Tab System (`tabs.js`)
- Dynamic tab creation and management
- Multiple content type renderers
- Simple markdown parser
- Kanban board visualization
- Metrics dashboard
- Priority-based auto-reordering

### Dev Console (`console.js`)
- Multi-panel console system
- Real-time terminal simulation
- Music track rotation
- Statistics tracking
- IRC-style chat with simulated visitors

### History Mode (`history.js`)
- Calendar widget for date selection
- Historical state snapshots
- Project and activity tracking
- Visual timeline of your brain's evolution

### Collaborative Features (`cursors.js`)
- Simulated ghost cursors with smooth movement
- Click heatmap visualization
- Real-time visitor tooltips
- Point clustering algorithm for heatmap

### Easter Eggs
- 🎮 Konami Code (↑↑↓↓←→←→BA) - Rainbow mode!
- Triple-click window controls for secrets
- Console welcome message with tips
- Dynamic page title on blur

## 🛠️ Technical Details

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Uses ES6+ JavaScript features
- CSS Grid and Flexbox layouts
- CSS animations and transitions

### Performance
- Vanilla JS for minimal overhead
- Efficient DOM manipulation
- Throttled animations
- Memory usage monitoring (in console)

### Future Enhancements
Ideas for expansion:
- Real backend integration
- Actual Spotify API integration
- Persistent data storage
- Real-time multiplayer cursors (WebSocket)
- Service Worker for offline support
- Dark mode toggle
- Mobile-responsive improvements

## 🎭 Use Cases

Perfect for:
- Personal portfolios with personality
- Digital garden / second brain visualization
- Creative developer showcases
- Interactive resume
- Project documentation site
- Learning platform
- Any website that wants to be memorable!

## 📝 License

MIT License - Feel free to use, modify, and share!

## 🤝 Contributing

This is a creative experiment, but contributions are welcome:
1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Submit a pull request

## 💡 Inspiration

This project combines concepts from:
- Second Brain methodology (PARA, Zettelkasten)
- Browser UI/UX design
- Collaborative tools (Figma cursors, Google Docs)
- OS interface design
- Task management systems

## 🙏 Credits

Built with ☕ and curiosity as an exploration of creative web design.

---

**Remember**: Your website is your brain. Make it interesting! 🧠✨