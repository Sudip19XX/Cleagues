export function createBackgroundLines() {
    const bg = document.createElement('div');
    bg.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
  `;

    // Grid Lines - smoother animation with reduced opacity and larger grid
    bg.innerHTML = `
    <div class="grid-container" style="
      position: absolute;
      width: 400%;
      height: 400%;
      top: -150%;
      left: -150%;
      background-image:
        linear-gradient(rgba(9, 194, 133, 0.12) 1px, transparent 1px),
        linear-gradient(90deg, rgba(9, 194, 133, 0.12) 1px, transparent 1px);
      background-size: 50px 50px;
      transform: perspective(1000px) rotateX(70deg);
      animation: gridMove 50s linear infinite;
      will-change: transform;
    "></div>

    <!-- Subtle fade at edges only -->
    <div style="
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: 
        radial-gradient(ellipse 120% 100% at center 100%, transparent 0%, transparent 60%, var(--color-bg-primary) 90%),
        linear-gradient(to bottom, var(--color-bg-primary) 0%, transparent 5%, transparent 95%, var(--color-bg-primary) 100%),
        linear-gradient(to right, var(--color-bg-primary) 0%, transparent 5%, transparent 95%, var(--color-bg-primary) 100%);
      pointer-events: none;
    "></div>
    
    <style>
      @keyframes gridMove {
        0% { transform: perspective(1000px) rotateX(70deg) translateY(0); }
        100% { transform: perspective(1000px) rotateX(70deg) translateY(50px); }
      }
    </style>
  `;

    return bg;
}
