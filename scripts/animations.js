document.addEventListener('DOMContentLoaded', function() {
    const dataPoints = 30;
    const networkLines = 40;
    const svgNS = "http://www.w3.org/2000/svg";

    createDataPoints();
    createNetworkLines();

    animateBitcoinLogo();
    animateLightningBolt();
    animateDataPoints();
    animateNetworkLines();
});

function createDataPoints() {
    const dataPointsGroup = document.getElementById('data-points');
    for (let i = 0; i < dataPoints; i++) {
        const circle = document.createElementNS(svgNS, 'circle');
        circle.setAttribute('cx', Math.random() * 800);
        circle.setAttribute('cy', Math.random() * 400);
        circle.setAttribute('r', 2 + Math.random() * 3);
        circle.setAttribute('fill', '#3282B8'); // Updated to highlight-color
        circle.setAttribute('filter', 'url(#glow)');
        dataPointsGroup.appendChild(circle);
    }
}

function createNetworkLines() {
    const networkLinesGroup = document.getElementById('network-lines');
    for (let i = 0; i < networkLines; i++) {
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', Math.random() * 800);
        line.setAttribute('y1', Math.random() * 400);
        line.setAttribute('x2', Math.random() * 800);
        line.setAttribute('y2', Math.random() * 400);
        line.setAttribute('stroke', '#C9D6DF'); // Updated to accent-color
        line.setAttribute('stroke-width', 0.5);
        line.setAttribute('opacity', 0.3);
        networkLinesGroup.appendChild(line);
    }
}

function animateBitcoinLogo() {
    gsap.to("#bitcoin-logo", {
        duration: 2,
        attr: { d: "M300,200 L320,180 L300,160 L280,180 Z" },
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stroke: "#3282B8" // Updated to highlight-color
    });
}

function animateLightningBolt() {
    gsap.to("#lightning-bolt", {
        duration: 1.5,
        attr: { d: "M500,100 L480,200 L520,200 L500,300" },
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stroke: "#C9D6DF" // Updated to accent-color
    });
}

function animateDataPoints() {
    gsap.to("#data-points circle", {
        duration: 2,
        scale: 1.5,
        opacity: 0.7,
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

function animateNetworkLines() {
    gsap.to("#network-lines line", {
        duration: 3,
        opacity: 0.8,
        stagger: 0.05,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}
