/**
 * Debug panel for psychologist landing page sandbox.
 * Loads when URL contains ?debug=1
 * Provides performance monitoring, accessibility testing, and UX tools.
 */

(function() {
    'use strict';

    // Check for debug flag
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('debug')) return;

    // Panel CSS
    const style = document.createElement('style');
    style.textContent = `
        #debug-panel {
            position: fixed;
            bottom: 10px;
            right: 10px;
            width: 400px;
            max-height: 500px;
            background: #1a1a1a;
            color: #f0f0f0;
            border: 2px solid #444;
            border-radius: 8px;
            font-family: monospace;
            font-size: 12px;
            z-index: 9999;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            resize: both;
            overflow: auto;
        }
        #debug-panel-header {
            background: #333;
            padding: 8px 12px;
            cursor: move;
            display: flex;
            justify-content: space-between;
            align-items: center;
            user-select: none;
        }
        #debug-panel-title {
            font-weight: bold;
        }
        #debug-panel-close {
            background: #666;
            border: none;
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            cursor: pointer;
            font-size: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        #debug-panel-content {
            padding: 12px;
        }
        .debug-tab {
            display: none;
        }
        .debug-tab.active {
            display: block;
        }
        .debug-tabs {
            display: flex;
            border-bottom: 1px solid #444;
            margin-bottom: 10px;
        }
        .debug-tab-button {
            background: transparent;
            color: #aaa;
            border: none;
            padding: 6px 12px;
            cursor: pointer;
            font-family: monospace;
            font-size: 12px;
        }
        .debug-tab-button.active {
            color: #fff;
            border-bottom: 2px solid #4caf50;
        }
        .metric {
            margin-bottom: 8px;
            padding: 6px;
            background: #222;
            border-radius: 4px;
        }
        .metric label {
            display: block;
            color: #aaa;
            font-size: 10px;
            text-transform: uppercase;
        }
        .metric value {
            font-size: 14px;
            color: #4caf50;
        }
        .metric.warning value {
            color: #ff9800;
        }
        .metric.error value {
            color: #f44336;
        }
        button {
            background: #555;
            color: white;
            border: none;
            padding: 6px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-family: monospace;
            margin-right: 6px;
            margin-bottom: 6px;
        }
        button:hover {
            background: #666;
        }
        .log {
            font-family: monospace;
            background: #111;
            padding: 4px;
            border-radius: 3px;
            margin-top: 4px;
            overflow-x: auto;
            white-space: pre-wrap;
        }
        .toggle-container {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }
        .toggle-container label {
            margin-right: 8px;
        }
        .switch {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 20px;
        }
        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #555;
            transition: .4s;
            border-radius: 20px;
        }
        .slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 2px;
            bottom: 2px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        input:checked + .slider {
            background-color: #4caf50;
        }
        input:checked + .slider:before {
            transform: translateX(20px);
        }
    `;
    document.head.appendChild(style);

    // Create panel HTML
    const panel = document.createElement('div');
    panel.id = 'debug-panel';
    panel.innerHTML = `
        <div id="debug-panel-header">
            <span id="debug-panel-title">🧠 Sandbox Debug Panel</span>
            <button id="debug-panel-close">×</button>
        </div>
        <div class="debug-tabs">
            <button class="debug-tab-button active" data-tab="performance">Performance</button>
            <button class="debug-tab-button" data-tab="accessibility">Accessibility</button>
            <button class="debug-tab-button" data-tab="ux">UX Tools</button>
            <button class="debug-tab-button" data-tab="logs">Logs</button>
        </div>
        <div id="debug-panel-content">
            <div id="tab-performance" class="debug-tab active">
                <h3>Core Web Vitals</h3>
                <div class="metric" id="metric-lcp">
                    <label>LCP ( Largest Contentful Paint )</label>
                    <value>—</value>
                </div>
                <div class="metric" id="metric-fid">
                    <label>FID ( First Input Delay )</label>
                    <value>—</value>
                </div>
                <div class="metric" id="metric-cls">
                    <label>CLS ( Cumulative Layout Shift )</label>
                    <value>—</value>
                </div>
                <button id="btn-capture">Capture Now</button>
                <button id="btn-reset">Reset</button>
                <p><small>Values update automatically. Green = good, Yellow = needs improvement, Red = poor.</small></p>
            </div>
            <div id="tab-accessibility" class="debug-tab">
                <h3>Accessibility Audit</h3>
                <button id="btn-run-axe">Run axe‑core audit</button>
                <div id="axe-results"></div>
            </div>
            <div id="tab-ux" class="debug-tab">
                <h3>UX Testing Tools</h3>
                <div class="toggle-container">
                    <label>Simulate slow network (3G)</label>
                    <label class="switch">
                        <input type="checkbox" id="toggle-throttle">
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="toggle-container">
                    <label>Disable JavaScript</label>
                    <label class="switch">
                        <input type="checkbox" id="toggle-js">
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="toggle-container">
                    <label>Emulate color blindness</label>
                    <select id="select-colorblind">
                        <option value="none">None</option>
                        <option value="protanopia">Protanopia</option>
                        <option value="deuteranopia">Deuteranopia</option>
                        <option value="tritanopia">Tritanopia</option>
                    </select>
                </div>
                <button id="btn-simulate-mobile">Simulate Mobile Viewport</button>
                <button id="btn-clear-cache">Clear Local Storage & Cache</button>
            </div>
            <div id="tab-logs" class="debug-tab">
                <h3>Console Logs</h3>
                <button id="btn-clear-logs">Clear Logs</button>
                <div id="log-container"></div>
            </div>
        </div>
    `;
    document.body.appendChild(panel);

    // Make panel draggable
    let isDragging = false;
    let offsetX, offsetY;
    const header = document.getElementById('debug-panel-header');
    header.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);

    function startDrag(e) {
        isDragging = true;
        const rect = panel.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        panel.style.cursor = 'grabbing';
    }
    function drag(e) {
        if (!isDragging) return;
        panel.style.left = (e.clientX - offsetX) + 'px';
        panel.style.top = (e.clientY - offsetY) + 'px';
        panel.style.right = 'auto';
        panel.style.bottom = 'auto';
    }
    function stopDrag() {
        isDragging = false;
        panel.style.cursor = '';
    }

    // Close button
    document.getElementById('debug-panel-close').addEventListener('click', () => {
        panel.style.display = 'none';
    });

    // Tab switching
    const tabButtons = document.querySelectorAll('.debug-tab-button');
    const tabs = document.querySelectorAll('.debug-tab');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            tabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.id === 'tab-' + tabName) tab.classList.add('active');
            });
        });
    });

    // Performance monitoring
    function loadWebVitals() {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/web-vitals@3/dist/web-vitals.attribution.iife.js';
        script.onload = () => {
            const { onLCP, onFID, onCLS } = window.webVitals;
            onLCP(updateMetric.bind(null, 'lcp'));
            onFID(updateMetric.bind(null, 'fid'));
            onCLS(updateMetric.bind(null, 'cls'));
            console.log('Web Vitals loaded');
        };
        script.onerror = () => console.error('Failed to load web-vitals');
        document.head.appendChild(script);
    }

    function updateMetric(metric, data) {
        const element = document.getElementById('metric-' + metric);
        if (!element) return;
        const value = data.value.toFixed(2);
        const label = data.name;
        let status = 'good';
        if (metric === 'lcp') status = value > 4000 ? 'error' : value > 2500 ? 'warning' : 'good';
        if (metric === 'fid') status = value > 300 ? 'error' : value > 100 ? 'warning' : 'good';
        if (metric === 'cls') status = value > 0.25 ? 'error' : value > 0.1 ? 'warning' : 'good';
        element.classList.remove('warning', 'error', 'good');
        element.classList.add(status);
        element.querySelector('value').textContent = `${value} ${label}`;
        log(`[Performance] ${metric.toUpperCase()}: ${value} (${status})`);
    }

    document.getElementById('btn-capture').addEventListener('click', () => {
        log('Manually capturing Web Vitals...');
        if (window.webVitals) {
            // Force re‑capture? web‑vitals doesn't support re‑capture; just log current values.
            log('Web Vitals already captured automatically.');
        } else {
            loadWebVitals();
        }
    });

    document.getElementById('btn-reset').addEventListener('click', () => {
        ['lcp','fid','cls'].forEach(m => {
            const el = document.getElementById('metric-' + m);
            if (el) {
                el.querySelector('value').textContent = '—';
                el.className = 'metric';
            }
        });
        log('Performance metrics reset.');
    });

    // Accessibility audit
    document.getElementById('btn-run-axe').addEventListener('click', () => {
        const resultsEl = document.getElementById('axe-results');
        resultsEl.innerHTML = '<div class="log">Running accessibility audit...</div>';
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/axe-core@4/dist/axe.min.js';
        script.onload = () => {
            axe.run(document, { resultTypes: ['violations', 'incomplete'] })
                .then(results => {
                    const violations = results.violations;
                    const incomplete = results.incomplete;
                    let html = `<div class="log"><strong>Violations: ${violations.length}</strong>`;
                    violations.forEach(v => {
                        html += `<div style="margin-top: 8px;"><strong>${v.id}</strong>: ${v.description}<br>Impact: ${v.impact}</div>`;
                        v.nodes.forEach(node => {
                            html += `<div style="margin-left: 12px;">• ${node.html}</div>`;
                        });
                    });
                    html += `<br><strong>Incomplete: ${incomplete.length}</strong>`;
                    incomplete.forEach(i => {
                        html += `<div style="margin-top: 8px;"><strong>${i.id}</strong>: ${i.description}</div>`;
                    });
                    html += '</div>';
                    resultsEl.innerHTML = html;
                    log(`Accessibility audit completed. Violations: ${violations.length}, Incomplete: ${incomplete.length}`);
                })
                .catch(err => {
                    resultsEl.innerHTML = `<div class="log">Error: ${err.message}</div>`;
                    log(`Accessibility audit error: ${err.message}`);
                });
        };
        script.onerror = () => {
            resultsEl.innerHTML = '<div class="log">Failed to load axe‑core.</div>';
            log('Failed to load axe‑core.');
        };
        document.head.appendChild(script);
    });

    // UX Tools
    document.getElementById('toggle-throttle').addEventListener('change', function(e) {
        log(`Network throttling ${e.target.checked ? 'enabled' : 'disabled'} (UI only)`);
        // Note: Actual throttling requires browser dev tools; we can only simulate by delaying requests.
        // This is a placeholder.
    });

    document.getElementById('toggle-js').addEventListener('change', function(e) {
        log(`JavaScript ${e.target.checked ? 'disabled' : 'enabled'} (UI only)`);
        // Cannot actually disable JS, just simulate.
    });

    document.getElementById('select-colorblind').addEventListener('change', function(e) {
        const filter = e.target.value;
        log(`Color blindness simulation: ${filter}`);
        // Apply CSS filter
        document.body.style.filter = filter === 'none' ? '' : getFilter(filter);
    });

    function getFilter(type) {
        const filters = {
            protanopia: 'url(#protanopia)',
            deuteranopia: 'url(#deuteranopia)',
            tritanopia: 'url(#tritanopia)'
        };
        // For simplicity, we'll just apply a grayscale or hue-rotate.
        // In a real implementation, you'd use SVG filters.
        return 'grayscale(100%)';
    }

    document.getElementById('btn-simulate-mobile').addEventListener('click', () => {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.content = 'width=375, initial-scale=1';
            log('Viewport changed to mobile (375px). Refresh to reset.');
        }
    });

    document.getElementById('btn-clear-cache').addEventListener('click', () => {
        localStorage.clear();
        sessionStorage.clear();
        log('Local Storage and Session Storage cleared.');
        // Cannot clear HTTP cache; notify user.
    });

    // Logging
    const logContainer = document.getElementById('log-container');
    function log(message) {
        const entry = document.createElement('div');
        entry.className = 'log';
        entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        logContainer.appendChild(entry);
        logContainer.scrollTop = logContainer.scrollHeight;
        console.log(`[Sandbox] ${message}`);
    }

    document.getElementById('btn-clear-logs').addEventListener('click', () => {
        logContainer.innerHTML = '';
        log('Logs cleared.');
    });

    // Initialize
    log('Debug panel initialized.');
    loadWebVitals();

    // Add a simple filter SVG for color blindness simulation (placeholder)
    const svg = `<svg style="position: absolute; width: 0; height: 0;" aria-hidden="true">
        <defs>
            <filter id="protanopia"><feColorMatrix values="0.567 0.433 0 0 0 0.558 0.442 0 0 0 0 0.242 0.758 0 0 0 0 0 1 0" /></filter>
            <filter id="deuteranopia"><feColorMatrix values="0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0.3 0.7 0 0 0 0 0 1 0" /></filter>
            <filter id="tritanopia"><feColorMatrix values="0.95 0.05 0 0 0 0 0.433 0.567 0 0 0 0.475 0.525 0 0 0 0 0 1 0" /></filter>
        </defs>
    </svg>`;
    document.body.insertAdjacentHTML('beforeend', svg);

})();