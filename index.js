
if (window.location.search.includes('debug')) {
    setupXNudgeTool();
}

function setupXNudgeTool() {
    const x = document.getElementById('letterX');

    const readout = document.createElement('div');
    readout.style.cssText = `
        position: fixed; top: 10px; left: 10px; z-index: 9999;
        background: rgba(0,0,0,0.85); color: #0f0; font-family: monospace;
        font-size: 13px; line-height: 1.5; padding: 10px 14px;
        border-radius: 6px; white-space: pre;
    `;
    document.body.appendChild(readout);

    let top = parseFloat(getComputedStyle(x).top) || 0;
    let left = parseFloat(getComputedStyle(x).left) || 0;
    let width = parseFloat(getComputedStyle(x).width) || 0;

    function update() {
        x.style.top = top + 'px';
        x.style.left = left + 'px';
        x.style.width = width + 'px';
        readout.textContent =
            `#letterX {\n  top: ${top}px;\n  left: ${left}px;\n  width: ${width}px;\n}\n\n` +
            `Arrows: move | Shift: x5 | W/S: width`;
    }
    update();

    window.addEventListener('keydown', (e) => {
        const step = e.shiftKey ? 5 : 1;
        if (e.key === 'ArrowUp') top -= step;
        if (e.key === 'ArrowDown') top += step;
        if (e.key === 'ArrowLeft') left -= step;
        if (e.key === 'ArrowRight') left += step;
        if (e.key === 'w' || e.key === 'W') width += step;
        if (e.key === 's' || e.key === 'S') width -= step;
        update();
        e.preventDefault();
    });
}

const tl = gsap.timeline({ repeat: -1 });

tl.set("#logoGroup", { y: 0, opacity: 1 })
  .set("#letterX", { scale: 1, opacity: 1 })
  .set(["#glrLogo", "#logoEpo", "#textGroup"], { opacity: 0, y: 0 });

tl.fromTo("#letterX",
    { scale: 0, opacity: 0 },
    { scale: 3.5, opacity: 1, duration: 1.2, ease: "back.out(1.4)" }
)
.to("#letterX", { scale: 1.5, duration: 1.8, ease: "sine.inOut" })
.to("#letterX", { scale: 1.0, duration: 2.0, ease: "power2.inOut" })

.to(["#glrLogo", "#logoEpo"], {
    opacity: 1,
    duration: 0.6,
    stagger: 0.15,
    ease: "power1.out"
})
.to({}, { duration: 2.5 });
tl.to("#logoGroup", {
    y: 220,
    opacity: 0,
    duration: 0.7,
    ease: "power2.in"
})
.fromTo("#textGroup",
    { y: -220, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
    "-=0.5"
)
.to({}, { duration: 3.5 });

tl.to("#textGroup", {
    y: 220,
    opacity: 0,
    duration: 0.6,
    ease: "power2.in"
});