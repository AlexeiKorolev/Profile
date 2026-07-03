import React, { useCallback, useEffect, useRef, useState } from 'react';
import '../style/PlusNav.css';
import Center from './Center';
import Experience from './Experience';
import Projects from './Projects';
import Papers from './Papers';
import Leadership from './Leadership';

const SECTIONS = {
    up: { label: 'Experience' },
    down: { label: 'Projects' },
    left: { label: 'Papers' },
    right: { label: 'Leadership' },
};

const OPPOSITE = { up: 'down', down: 'up', left: 'right', right: 'left' };
const VIEW_TO_HASH = { up: '#experience', down: '#projects', left: '#papers', right: '#leadership' };
const HASH_TO_VIEW = Object.fromEntries(
    Object.entries(VIEW_TO_HASH).map(([view, hash]) => [hash, view])
);
const ARROW_ZONE = 150;   // px from edge where the arrow appears
const TRIGGER_ZONE = 16;  // px from edge that triggers navigation
const NAV_COOLDOWN = 900; // ms between navigations
const SWIPE_MIN = 60;     // px minimum swipe distance

const PlusNav = () => {
    const [view, setView] = useState(() => HASH_TO_VIEW[window.location.hash] || 'center');
    const [arrow, setArrow] = useState(null);
    const lastNav = useRef(0);
    const rafRef = useRef(null);
    const touchStart = useRef(null);
    const panelRefs = useRef({});

    const navigate = useCallback((dir) => {
        const now = Date.now();
        if (now - lastNav.current < NAV_COOLDOWN) return;
        setView((v) => {
            let next = v;
            if (v === 'center' && SECTIONS[dir]) next = dir;
            else if (v !== 'center' && dir === OPPOSITE[v]) next = 'center';
            if (next !== v) {
                lastNav.current = now;
                setArrow(null);
            }
            return next;
        });
    }, []);

    // Keep the URL hash in sync so panels are deep-linkable
    useEffect(() => {
        window.history.replaceState(null, '', VIEW_TO_HASH[view] || window.location.pathname + window.location.search);
    }, [view]);

    // Desktop: edge-proximity arrows + trigger
    useEffect(() => {
        if (!window.matchMedia('(pointer: fine)').matches) return undefined;
        const onMove = (e) => {
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = null;
                const dist = {
                    left: e.clientX,
                    right: window.innerWidth - e.clientX,
                    up: e.clientY,
                    down: window.innerHeight - e.clientY,
                };
                const active = view === 'center'
                    ? ['up', 'down', 'left', 'right']
                    : [OPPOSITE[view]];
                let best = null;
                active.forEach((dir) => {
                    if (dist[dir] < ARROW_ZONE && (best === null || dist[dir] < dist[best])) {
                        best = dir;
                    }
                });
                setArrow(best);
                if (best && dist[best] < TRIGGER_ZONE) navigate(best);
            });
        };
        window.addEventListener('mousemove', onMove);
        return () => {
            window.removeEventListener('mousemove', onMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        };
    }, [view, navigate]);

    // Keyboard navigation
    useEffect(() => {
        const keyMap = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
        const onKey = (e) => {
            if (e.key === 'Escape' && view !== 'center') {
                navigate(OPPOSITE[view]);
                return;
            }
            const dir = keyMap[e.key];
            if (!dir) return;
            if (view === 'center' || dir === OPPOSITE[view]) {
                e.preventDefault();
                navigate(dir);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [view, navigate]);

    // Mobile: swipe navigation (natural scroll direction)
    const onTouchStart = (e) => {
        const t = e.touches[0];
        touchStart.current = { x: t.clientX, y: t.clientY };
    };

    const onTouchEnd = (e) => {
        if (!touchStart.current) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - touchStart.current.x;
        const dy = t.clientY - touchStart.current.y;
        touchStart.current = null;
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);
        if (Math.max(absX, absY) < SWIPE_MIN) return;

        // Swiping left reveals the panel to the right, etc.
        let dir = null;
        if (absX > absY * 1.5) dir = dx < 0 ? 'right' : 'left';
        else if (absY > absX * 1.5) dir = dy < 0 ? 'down' : 'up';
        if (!dir) return;

        if (view === 'center') {
            navigate(dir);
            return;
        }
        if (dir !== OPPOSITE[view]) return;
        // Vertical sections scroll internally — only swipe home from the scroll boundary.
        const el = panelRefs.current[view];
        if (view === 'up' && el && el.scrollTop + el.clientHeight < el.scrollHeight - 4) return;
        if (view === 'down' && el && el.scrollTop > 4) return;
        navigate(dir);
    };

    const setPanelRef = (key) => (el) => { panelRefs.current[key] = el; };

    return (
        <div className="plus-viewport" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div className={`plus-board view-${view}`}>
                <section className="panel panel-center" aria-hidden={view !== 'center'}>
                    <Center />
                </section>
                <section className="panel panel-up" aria-hidden={view !== 'up'}>
                    <div className="panel-scroll" ref={setPanelRef('up')}>
                        <Experience />
                    </div>
                </section>
                <section className="panel panel-down" aria-hidden={view !== 'down'}>
                    <div className="panel-scroll" ref={setPanelRef('down')}>
                        <Projects />
                    </div>
                </section>
                <section className="panel panel-left" aria-hidden={view !== 'left'}>
                    <div className="panel-scroll" ref={setPanelRef('left')}>
                        <Papers />
                    </div>
                </section>
                <section className="panel panel-right" aria-hidden={view !== 'right'}>
                    <div className="panel-scroll" ref={setPanelRef('right')}>
                        <Leadership />
                    </div>
                </section>
            </div>

            {/* Static edge hints on the hub (main discoverability on mobile) */}
            {view === 'center' && Object.keys(SECTIONS).map((dir) => (
                <button
                    key={dir}
                    className={`edge-hint hint-${dir} ${arrow === dir ? 'suppressed' : ''}`}
                    onClick={() => navigate(dir)}
                    aria-label={`Open ${SECTIONS[dir].label}`}
                >
                    <span className={`chevron chevron-${dir}`} />
                    <span className="hint-label">{SECTIONS[dir].label}</span>
                </button>
            ))}

            {/* Proximity arrow (desktop) */}
            {arrow && (
                <button
                    className={`edge-arrow edge-${arrow}`}
                    onClick={() => navigate(arrow)}
                    aria-label={view === 'center' ? `Open ${SECTIONS[arrow].label}` : 'Back to home'}
                >
                    <span className="edge-arrow-label">
                        {view === 'center' ? SECTIONS[arrow].label : 'Home'}
                    </span>
                    <span className={`chevron chevron-${arrow}`} />
                </button>
            )}

            {/* Persistent home button inside sections (needed on mobile) */}
            {view !== 'center' && (
                <button
                    className={`home-btn home-${OPPOSITE[view]}`}
                    onClick={() => navigate(OPPOSITE[view])}
                    aria-label="Back to home"
                >
                    <span className={`chevron chevron-${OPPOSITE[view]}`} />
                    <span className="hint-label">Home</span>
                </button>
            )}
        </div>
    );
};

export default PlusNav;
