// Collaborative Cursors and Heatmap Manager
class CollaborativeCursorsManager {
    constructor() {
        this.cursorsContainer = document.getElementById('cursorsContainer');
        this.heatmapOverlay = document.getElementById('heatmapOverlay');
        this.activeCursors = new Map();
        this.heatmapPoints = [];
        this.clickHeatmap = [];

        this.init();
    }

    init() {
        // Track user's own mouse movement for heatmap
        document.addEventListener('mousemove', (e) => {
            this.addHeatmapPoint(e.clientX, e.clientY);
        });

        document.addEventListener('click', (e) => {
            this.addClickHeatmap(e.clientX, e.clientY);
        });

        // Simulate ghost cursors from other visitors
        this.startGhostCursors();

        // Update heatmap visualization
        this.updateHeatmapVisualization();
        setInterval(() => this.updateHeatmapVisualization(), 5000);

        // Show visitor count tooltip
        this.showVisitorTooltip();
    }

    startGhostCursors() {
        // Create 2-3 ghost cursors
        const numCursors = Math.floor(Math.random() * 2) + 2;

        for (let i = 0; i < numCursors; i++) {
            const visitor = mockVisitors[i % mockVisitors.length];
            this.createGhostCursor(visitor);
        }
    }

    createGhostCursor(visitor) {
        const cursor = document.createElement('div');
        cursor.className = 'ghost-cursor';
        cursor.style.color = visitor.color;
        cursor.innerHTML = `
            <div class="cursor-label" style="background: ${visitor.color}">
                ${visitor.name}
            </div>
        `;

        this.cursorsContainer.appendChild(cursor);
        this.activeCursors.set(visitor.id, {
            element: cursor,
            visitor: visitor,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
        });

        // Animate cursor movement
        this.animateCursor(visitor.id);
    }

    animateCursor(cursorId) {
        const cursorData = this.activeCursors.get(cursorId);
        if (!cursorData) return;

        const moveCursor = () => {
            // Random movement with some smoothness
            const targetX = Math.random() * (window.innerWidth - 100);
            const targetY = Math.random() * (window.innerHeight - 100);

            const duration = 2000 + Math.random() * 3000;
            const startX = cursorData.x;
            const startY = cursorData.y;
            const startTime = Date.now();

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function
                const eased = progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

                cursorData.x = startX + (targetX - startX) * eased;
                cursorData.y = startY + (targetY - startY) * eased;

                cursorData.element.style.transform = `translate(${cursorData.x}px, ${cursorData.y}px)`;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    // Wait a bit before next movement
                    setTimeout(() => moveCursor(), Math.random() * 2000 + 1000);
                }
            };

            animate();
        };

        moveCursor();
    }

    addHeatmapPoint(x, y) {
        this.heatmapPoints.push({ x, y, timestamp: Date.now() });

        // Keep only recent points (last 30 seconds)
        const cutoff = Date.now() - 30000;
        this.heatmapPoints = this.heatmapPoints.filter(p => p.timestamp > cutoff);
    }

    addClickHeatmap(x, y) {
        this.clickHeatmap.push({ x, y, timestamp: Date.now() });

        // Keep only recent clicks (last minute)
        const cutoff = Date.now() - 60000;
        this.clickHeatmap = this.clickHeatmap.filter(p => p.timestamp > cutoff);

        // Create visual feedback
        const feedback = document.createElement('div');
        feedback.style.position = 'fixed';
        feedback.style.left = x + 'px';
        feedback.style.top = y + 'px';
        feedback.style.width = '20px';
        feedback.style.height = '20px';
        feedback.style.borderRadius = '50%';
        feedback.style.border = '2px solid rgba(138, 180, 248, 0.6)';
        feedback.style.pointerEvents = 'none';
        feedback.style.zIndex = '9999';
        feedback.style.animation = 'clickRipple 0.6s ease-out forwards';

        document.body.appendChild(feedback);

        setTimeout(() => feedback.remove(), 600);
    }

    updateHeatmapVisualization() {
        // Clear existing heatmap
        this.heatmapOverlay.innerHTML = '';

        // Create style for click ripple animation if not exists
        if (!document.getElementById('clickRippleStyle')) {
            const style = document.createElement('style');
            style.id = 'clickRippleStyle';
            style.textContent = `
                @keyframes clickRipple {
                    0% {
                        transform: scale(0);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(3);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Group points into clusters
        const clusters = this.clusterPoints(this.clickHeatmap, 100);

        clusters.forEach(cluster => {
            if (cluster.points.length >= 2) {
                const point = document.createElement('div');
                point.className = 'heatmap-point';
                point.style.left = (cluster.x - 30) + 'px';
                point.style.top = (cluster.y - 30) + 'px';

                // Intensity based on number of clicks
                const intensity = Math.min(cluster.points.length / 5, 1);
                point.style.opacity = intensity * 0.6;

                this.heatmapOverlay.appendChild(point);
            }
        });
    }

    clusterPoints(points, radius) {
        const clusters = [];

        points.forEach(point => {
            // Find existing cluster
            let foundCluster = false;

            for (const cluster of clusters) {
                const distance = Math.sqrt(
                    Math.pow(cluster.x - point.x, 2) +
                    Math.pow(cluster.y - point.y, 2)
                );

                if (distance < radius) {
                    cluster.points.push(point);
                    // Recalculate center
                    cluster.x = cluster.points.reduce((sum, p) => sum + p.x, 0) / cluster.points.length;
                    cluster.y = cluster.points.reduce((sum, p) => sum + p.y, 0) / cluster.points.length;
                    foundCluster = true;
                    break;
                }
            }

            if (!foundCluster) {
                clusters.push({
                    x: point.x,
                    y: point.y,
                    points: [point]
                });
            }
        });

        return clusters;
    }

    showVisitorTooltip() {
        // Create a floating tooltip showing visitor count
        const tooltip = document.createElement('div');
        tooltip.style.cssText = `
            position: fixed;
            bottom: 220px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 13px;
            z-index: 1000;
            animation: fadeIn 0.3s;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;

        const updateCount = () => {
            const count = this.activeCursors.size + 1; // +1 for the user
            const reading = Math.floor(Math.random() * 100) + 400; // Simulate total readers

            tooltip.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 16px;">👥</span>
                    <div>
                        <div style="font-weight: 600;">${count} active now</div>
                        <div style="font-size: 11px; opacity: 0.7;">${reading} reading this tab</div>
                    </div>
                </div>
            `;
        };

        updateCount();
        setInterval(updateCount, 5000);

        document.body.appendChild(tooltip);

        // Make it dismissible
        tooltip.addEventListener('click', () => {
            tooltip.style.animation = 'fadeOut 0.3s';
            setTimeout(() => tooltip.remove(), 300);
        });

        // Add fadeOut animation
        if (!document.getElementById('tooltipAnimations')) {
            const style = document.createElement('style');
            style.id = 'tooltipAnimations';
            style.textContent = `
                @keyframes fadeOut {
                    from {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize collaborative cursors
let cursorsManager;
document.addEventListener('DOMContentLoaded', () => {
    cursorsManager = new CollaborativeCursorsManager();
});
