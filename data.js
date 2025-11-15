// Tab data and content
const tabsData = [
    {
        id: 'currently-reading',
        icon: '📚',
        title: 'Currently Reading',
        type: 'markdown',
        pinned: true,
        pulse: true,
        content: `
# Currently Reading

## Books in Progress

### "Thinking, Fast and Slow" by Daniel Kahneman
*Started: November 1, 2025*

- **Progress:** 65%
- **Key Insights:**
  - System 1 (fast, intuitive) vs System 2 (slow, deliberate)
  - Cognitive biases shape our decisions more than we think
  - WYSIATI: What You See Is All There Is

**Favorite Quote:** "Nothing in life is as important as you think it is, while you are thinking about it."

---

### "Building a Second Brain" by Tiago Forte
*Started: October 15, 2025*

- **Progress:** 40%
- **Current Chapter:** The Cathedral Effect
- **Application:** Implementing PARA method for digital organization

---

## Up Next

1. "The Pragmatic Programmer" (re-read)
2. "Staff Engineer" by Will Larson
3. "An Elegant Puzzle" by Will Larson

## Recently Finished

- ✅ "Atomic Habits" by James Clear (Oct 2025)
- ✅ "Deep Work" by Cal Newport (Sep 2025)
- ✅ "The Mom Test" by Rob Fitzpatrick (Aug 2025)
        `
    },
    {
        id: 'active-projects',
        icon: '🎯',
        title: 'Active Projects',
        type: 'kanban',
        pulse: true,
        content: {
            columns: [
                {
                    title: 'Planning',
                    cards: [
                        { id: 1, title: 'AI-powered code review tool', tags: ['ML', 'DevTools'] },
                        { id: 2, title: 'Personal knowledge graph visualizer', tags: ['Data Viz', 'Learning'] }
                    ]
                },
                {
                    title: 'In Progress',
                    cards: [
                        { id: 3, title: 'Brain Browser Website', tags: ['Web', 'Creative'] },
                        { id: 4, title: 'Open source contribution to TypeScript', tags: ['OSS', 'TypeScript'] },
                        { id: 5, title: 'Weekend side project: Task automation bot', tags: ['Automation', 'Python'] }
                    ]
                },
                {
                    title: 'Review',
                    cards: [
                        { id: 6, title: 'Blog post: "Building in Public"', tags: ['Writing', 'Reflection'] }
                    ]
                },
                {
                    title: 'Done',
                    cards: [
                        { id: 7, title: 'Portfolio redesign', tags: ['Design', 'Web'] },
                        { id: 8, title: 'Learning Rust basics', tags: ['Learning', 'Rust'] }
                    ]
                }
            ]
        }
    },
    {
        id: 'impact-metrics',
        icon: '📊',
        title: 'Impact Metrics',
        type: 'dashboard',
        content: {
            metrics: [
                { label: 'GitHub Contributions', value: '1,247', color: '#667eea' },
                { label: 'Blog Readers', value: '12.5K', color: '#764ba2' },
                { label: 'Open Source Projects', value: '23', color: '#f093fb' },
                { label: 'Coffee Consumed', value: '∞', color: '#4facfe' },
                { label: 'Ideas Captured', value: '487', color: '#43e97b' },
                { label: 'Learning Streak', value: '127 days', color: '#fa709a' }
            ]
        }
    },
    {
        id: 'random-thoughts',
        icon: '💭',
        title: 'Random Thoughts',
        type: 'text',
        content: `2025-11-15 14:23
Why do we call it "debugging"? Are we removing bugs or studying them?
Maybe debugging is more like archaeology—carefully excavating to understand what went wrong.

2025-11-14 09:17
Idea: What if documentation could show you what changed based on YOUR last visit?
Everyone sees a personalized "what's new since you were here last" section.

2025-11-13 22:45
The best code I ever wrote was the code I deleted.
Sometimes the most valuable contribution is knowing what NOT to build.

2025-11-12 16:33
Learning in public is uncomfortable but transformative.
Every time I share something "unfinished," I learn 10x more from the feedback.

2025-11-11 11:11
Make a wish! Also: why do we still use 12-hour time formats?
24-hour time makes so much more sense for developers.

2025-11-10 08:05
Coffee thought: What if we measured productivity in problems solved, not hours worked?
Would change the whole conversation about remote work.
        `
    },
    {
        id: 'lets-talk',
        icon: '💬',
        title: "Let's Talk",
        type: 'chat',
        pinned: false,
        content: `
# Get in Touch

I love connecting with interesting people! Whether you want to discuss a project, share ideas, or just say hi, I'm here.

## Ways to Reach Me

- **Email:** [your.email@example.com](mailto:your.email@example.com)
- **Twitter:** [@yourhandle](https://twitter.com/yourhandle)
- **GitHub:** [@yourusername](https://github.com/yourusername)
- **LinkedIn:** [Your Name](https://linkedin.com/in/yourprofile)

## Quick Chat

Use the form below to send me a quick message, or use the chat in the dev console for real-time IRC-style conversation!
        `
    }
];

// Status messages that rotate in the URL bar
const statusMessages = [
    'debugging life.exe',
    'compiling ideas...',
    'refactoring thoughts',
    'git commit -m "daily progress"',
    'npm install inspiration',
    'brewing coffee && coding',
    'sudo think harder',
    'while(true) { learn(); }',
    'importing creativity',
    'optimizing neural pathways'
];

// Historical states for the brain history feature
const brainHistory = {
    '2025-11-01': {
        tabs: ['currently-reading', 'active-projects', 'impact-metrics'],
        notes: 'Started reading "Thinking, Fast and Slow". Feeling inspired about cognitive biases.',
        projects: 2,
        coffee: 4
    },
    '2025-10-15': {
        tabs: ['currently-reading', 'random-thoughts'],
        notes: 'Deep dive into second brain methodology. Mind = blown.',
        projects: 3,
        coffee: 5
    },
    '2025-10-01': {
        tabs: ['active-projects', 'impact-metrics'],
        notes: 'Shipped portfolio redesign! Feeling accomplished.',
        projects: 4,
        coffee: 6
    },
    '2025-09-15': {
        tabs: ['currently-reading', 'random-thoughts', 'lets-talk'],
        notes: 'Learning Rust. Head hurts but in a good way.',
        projects: 2,
        coffee: 7
    }
};

// Terminal command history
const terminalCommands = [
    '$ cd ~/projects/brain-browser',
    '$ git status',
    'On branch main',
    'nothing to commit, working tree clean',
    '$ npm run dev',
    'Server running on http://localhost:3000',
    '$ coffee --strength=max',
    'Brewing... ☕',
    '$ echo "Another day, another commit"',
    'Another day, another commit'
];

// Mock visitor data for collaborative cursors
const mockVisitors = [
    { id: 1, name: 'Anonymous Fox', color: '#ff6b6b' },
    { id: 2, name: 'Curious Cat', color: '#4ecdc4' },
    { id: 3, name: 'Wandering Bear', color: '#45b7d1' },
    { id: 4, name: 'Thoughtful Owl', color: '#96ceb4' },
    { id: 5, name: 'Creative Dolphin', color: '#dda15e' }
];

// Music tracks for "Now Playing"
const musicTracks = [
    '🎵 Lofi Hip Hop Radio - Beats to Relax/Study To',
    '🎸 Tame Impala - The Less I Know The Better',
    '🎹 Daft Punk - Digital Love',
    '🎼 Hans Zimmer - Time (Inception OST)',
    '🎧 Tycho - Awake',
    '🎤 Phoenix - 1901',
    '🎺 Vulfpeck - Back Pocket'
];
