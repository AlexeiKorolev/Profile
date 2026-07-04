import React, { useCallback, useEffect, useRef, useState } from 'react';
import '../style/PlusNav.css';
import Center from './Center';
import Experience from './Experience';
import Projects from './Projects';
import Papers from './Papers';
import Leadership from './Leadership';

const SECTIONS = {
    up: { label: 'Leadership' },
    down: { label: 'Experience' },
    left: { label: 'Papers' },
    right: { label: 'Projects' },
};

const OPPOSITE = { up: 'down', down: 'up', left: 'right', right: 'left' };
const VIEW_TO_HASH = { up: '#leadership', down: '#experience', left: '#papers', right: '#projects' };
const HASH_TO_VIEW = Object.fromEntries(
    Object.entries(VIEW_TO_HASH).map(([view, hash]) => [hash, view])
);
const ARROW_ZONE = 150;      // px from edge where the arrow appears; clicks there navigate
const NAV_COOLDOWN = 380;    // ms between navigations (just past the slide)
const SWIPE_MIN = 60;        // px minimum swipe distance
const WHEEL_THRESHOLD = 280; // accumulated wheel delta that triggers navigation
const WHEEL_COOLDOWN = 380;  // ms wheel is ignored after a navigation (≈ slide length)

const PlusNav = () => {
    const [view, setView] = useState(() => HASH_TO_VIEW[window.location.hash] || 'center');
    const [arrow, setArrow] = useState(null);
    const lastNav = useRef(0);
    const rafRef = useRef(null);
    const touchStart = useRef(null);
    const wheelAccum = useRef({ dir: null, amount: 0, t: 0 });
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

    // Desktop: edge-proximity arrows (navigation happens on click, not proximity)
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
                setArrow((prev) => (prev === best ? prev : best));
            });
        };
        window.addEventListener('mousemove', onMove);
        return () => {
            window.removeEventListener('mousemove', onMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        };
    }, [view, navigate]);

    // Scroll wheel / trackpad navigation.
    // The Experience panel scrolls horizontally and Papers/Projects scroll
    // vertically, so a panel's content axis never lines up with the wheel
    // gesture that leaves it — no accidental page switches mid-scroll.
    useEffect(() => {
        const onWheel = (e) => {
            const now = Date.now();
            if (now - lastNav.current < WHEEL_COOLDOWN) {
                wheelAccum.current.amount = 0;
                return;
            }
            const absX = Math.abs(e.deltaX);
            const absY = Math.abs(e.deltaY);
            let dir = null;
            if (absY > absX) dir = e.deltaY > 0 ? 'down' : 'up';
            else if (absX > absY) dir = e.deltaX > 0 ? 'right' : 'left';
            if (!dir) return;

            if (view !== 'center') {
                if (dir !== OPPOSITE[view]) return;
                // Leadership scrolls vertically — only wheel home from its bottom edge.
                const el = panelRefs.current[view];
                if (view === 'up' && el && el.scrollTop + el.clientHeight < el.scrollHeight - 4) return;
            }

            const acc = wheelAccum.current;
            if (acc.dir !== dir || now - acc.t > 400) {
                acc.dir = dir;
                acc.amount = 0;
            }
            acc.t = now;
            acc.amount += Math.max(absX, absY);
            if (acc.amount >= WHEEL_THRESHOLD) {
                acc.amount = 0;
                navigate(dir);
            }
        };
        window.addEventListener('wheel', onWheel, { passive: true });
        return () => window.removeEventListener('wheel', onWheel);
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
        // Leadership scrolls vertically — only swipe home from its bottom edge.
        // Experience scrolls horizontally and Papers/Projects vertically, so
        // their back-swipe axis never fights the content scroll.
        const el = panelRefs.current[view];
        if (view === 'up' && el && el.scrollTop + el.clientHeight < el.scrollHeight - 4) return;
        navigate(dir);
    };

    const setPanelRef = (key) => (el) => { panelRefs.current[key] = el; };

    // A click anywhere in the edge zone (while its arrow is showing) navigates —
    // no need to hit the arrow button itself. Real links/buttons keep priority.
    const onViewportClick = (e) => {
        if (!arrow) return;
        if (e.target.closest('a, button')) return;
        navigate(arrow);
    };

    return (
        <div
            className={`plus-viewport ${arrow ? 'nav-ready' : ''}`}
            onClick={onViewportClick}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            <div className={`plus-board view-${view}`}>
                <section className="panel panel-center" aria-hidden={view !== 'center'}>
                    <Center />
                </section>
                <section className="panel panel-up" aria-hidden={view !== 'up'}>
                    <div className="panel-scroll" ref={setPanelRef('up')}>
                        <Leadership />
                    </div>
                </section>
                <section className="panel panel-down" aria-hidden={view !== 'down'}>
                    <Experience />
                </section>
                <section className="panel panel-left" aria-hidden={view !== 'left'}>
                    <div className="panel-scroll" ref={setPanelRef('left')}>
                        <Papers />
                    </div>
                </section>
                <section className="panel panel-right" aria-hidden={view !== 'right'}>
                    <div className="panel-scroll" ref={setPanelRef('right')}>
                        <Projects />
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
