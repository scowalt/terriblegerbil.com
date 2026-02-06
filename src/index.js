export default {
  async fetch(request) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Terrible Gerbil</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      min-height: 100vh;
      background: #fef3c7;
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      overflow-x: hidden;
    }

    .sky {
      position: fixed;
      top: 0; left: 0; right: 0;
      height: 60vh;
      background: linear-gradient(180deg, #7dd3fc 0%, #bae6fd 60%, #fef3c7 100%);
      z-index: 0;
    }

    .cloud {
      position: fixed;
      background: white;
      border-radius: 50px;
      opacity: 0.8;
    }
    .cloud::before, .cloud::after {
      content: '';
      position: absolute;
      background: white;
      border-radius: 50%;
    }
    .cloud-1 {
      width: 120px; height: 40px;
      top: 8%; left: 10%;
      animation: drift 25s linear infinite;
    }
    .cloud-1::before { width: 50px; height: 50px; top: -25px; left: 20px; }
    .cloud-1::after { width: 70px; height: 55px; top: -30px; left: 45px; }
    .cloud-2 {
      width: 160px; height: 50px;
      top: 15%; left: 55%;
      animation: drift 35s linear infinite;
    }
    .cloud-2::before { width: 65px; height: 60px; top: -30px; left: 25px; }
    .cloud-2::after { width: 85px; height: 65px; top: -35px; left: 60px; }
    .cloud-3 {
      width: 100px; height: 35px;
      top: 5%; left: 80%;
      animation: drift 30s linear infinite reverse;
    }
    .cloud-3::before { width: 45px; height: 45px; top: -22px; left: 15px; }
    .cloud-3::after { width: 60px; height: 48px; top: -28px; left: 38px; }

    @keyframes drift {
      from { transform: translateX(-200px); }
      to { transform: translateX(calc(100vw + 200px)); }
    }

    .content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 3rem 1rem;
    }

    h1 {
      font-size: clamp(2.5rem, 8vw, 5rem);
      color: #92400e;
      text-shadow: 3px 3px 0 #fbbf24;
      margin-bottom: 0.5rem;
      text-align: center;
      animation: wiggle 3s ease-in-out infinite;
    }

    @keyframes wiggle {
      0%, 100% { transform: rotate(-1deg); }
      50% { transform: rotate(1deg); }
    }

    .subtitle {
      font-size: clamp(1rem, 3vw, 1.5rem);
      color: #b45309;
      margin-bottom: 2rem;
      text-align: center;
    }

    .gerbil-container {
      position: relative;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .gerbil-container:hover {
      transform: scale(1.05);
    }
    .gerbil-container:active {
      transform: scale(0.95);
    }

    .gerbil-svg {
      width: clamp(250px, 50vw, 420px);
      height: auto;
      filter: drop-shadow(4px 8px 12px rgba(0,0,0,0.15));
      animation: bob 2s ease-in-out infinite;
    }

    @keyframes bob {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-12px); }
    }

    .speech-bubble {
      background: white;
      border: 3px solid #92400e;
      border-radius: 20px;
      padding: 1rem 1.5rem;
      margin-top: 1.5rem;
      max-width: 380px;
      text-align: center;
      font-size: 1.15rem;
      color: #78350f;
      position: relative;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.3s, transform 0.3s;
    }
    .speech-bubble.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .speech-bubble::before {
      content: '';
      position: absolute;
      top: -15px;
      left: 50%;
      margin-left: -12px;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-bottom: 15px solid #92400e;
    }
    .speech-bubble::after {
      content: '';
      position: absolute;
      top: -11px;
      left: 50%;
      margin-left: -10px;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 13px solid white;
    }

    .facts {
      margin-top: 3rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
      max-width: 900px;
      width: 100%;
      padding: 0 1rem;
    }

    .fact-card {
      background: white;
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 4px 12px rgba(146, 64, 14, 0.1);
      border: 2px solid #fbbf24;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .fact-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(146, 64, 14, 0.15);
    }
    .fact-card h3 {
      color: #92400e;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }
    .fact-card p {
      color: #78350f;
      line-height: 1.5;
      font-size: 0.95rem;
    }

    .footer {
      margin-top: 4rem;
      padding: 2rem;
      text-align: center;
      color: #b45309;
      font-size: 0.9rem;
    }

    .ground {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60px;
      background: linear-gradient(180deg, #a3e635 0%, #65a30d 100%);
      z-index: 0;
    }

    .seeds {
      position: fixed;
      pointer-events: none;
      z-index: 10;
    }
    .seed {
      position: fixed;
      font-size: 1.5rem;
      animation: fall 1.5s ease-in forwards;
      pointer-events: none;
    }
    @keyframes fall {
      0% { opacity: 1; transform: translateY(0) rotate(0deg); }
      100% { opacity: 0; transform: translateY(120px) rotate(360deg); }
    }

    /* Eyes blink */
    @keyframes blink {
      0%, 95%, 100% { transform: scaleY(1); }
      97% { transform: scaleY(0.05); }
    }
    .gerbil-eye {
      animation: blink 4s ease-in-out infinite;
      transform-origin: center;
    }
  </style>
</head>
<body>
  <div class="sky"></div>
  <div class="cloud cloud-1"></div>
  <div class="cloud cloud-2"></div>
  <div class="cloud cloud-3"></div>
  <div class="ground"></div>

  <div class="content">
    <h1>Terrible Gerbil</h1>
    <p class="subtitle">The most chaotic rodent on the internet</p>

    <div class="gerbil-container" id="gerbil" title="Click me!">
      <svg class="gerbil-svg" viewBox="0 0 400 450" xmlns="http://www.w3.org/2000/svg">
        <!-- Body -->
        <ellipse cx="200" cy="310" rx="95" ry="110" fill="#d4a574"/>
        <ellipse cx="200" cy="310" rx="80" ry="95" fill="#e8c9a0"/>

        <!-- Feet -->
        <ellipse cx="150" cy="410" rx="30" ry="14" fill="#c4956a" transform="rotate(-10, 150, 410)"/>
        <ellipse cx="250" cy="410" rx="30" ry="14" fill="#c4956a" transform="rotate(10, 250, 410)"/>

        <!-- Arms -->
        <ellipse cx="120" cy="310" rx="18" ry="50" fill="#d4a574" transform="rotate(15, 120, 310)"/>
        <ellipse cx="280" cy="310" rx="18" ry="50" fill="#d4a574" transform="rotate(-15, 280, 310)"/>
        <!-- Tiny paws -->
        <circle cx="112" cy="355" r="10" fill="#c4956a"/>
        <circle cx="288" cy="355" r="10" fill="#c4956a"/>

        <!-- Head -->
        <ellipse cx="200" cy="170" rx="85" ry="80" fill="#d4a574"/>
        <ellipse cx="200" cy="180" rx="65" ry="55" fill="#e8c9a0"/>

        <!-- Ears -->
        <ellipse cx="135" cy="105" rx="28" ry="42" fill="#d4a574" transform="rotate(-15, 135, 105)"/>
        <ellipse cx="135" cy="105" rx="18" ry="30" fill="#f0b8b8" transform="rotate(-15, 135, 105)"/>
        <ellipse cx="265" cy="105" rx="28" ry="42" fill="#d4a574" transform="rotate(15, 265, 105)"/>
        <ellipse cx="265" cy="105" rx="18" ry="30" fill="#f0b8b8" transform="rotate(15, 265, 105)"/>

        <!-- Eyes -->
        <g class="gerbil-eye">
          <circle cx="172" cy="160" r="16" fill="white"/>
          <circle cx="175" cy="158" r="10" fill="#1a1a2e"/>
          <circle cx="179" cy="154" r="4" fill="white"/>
        </g>
        <g class="gerbil-eye">
          <circle cx="228" cy="160" r="16" fill="white"/>
          <circle cx="231" cy="158" r="10" fill="#1a1a2e"/>
          <circle cx="235" cy="154" r="4" fill="white"/>
        </g>

        <!-- Nose -->
        <ellipse cx="200" cy="190" rx="8" ry="6" fill="#c4956a"/>

        <!-- Mouth / mischievous grin -->
        <path d="M 178 200 Q 190 218 200 210 Q 210 218 222 200" stroke="#92400e" stroke-width="2.5" fill="none" stroke-linecap="round"/>

        <!-- Whiskers -->
        <line x1="155" y1="190" x2="110" y2="182" stroke="#92400e" stroke-width="1.5" opacity="0.6"/>
        <line x1="155" y1="196" x2="108" y2="198" stroke="#92400e" stroke-width="1.5" opacity="0.6"/>
        <line x1="245" y1="190" x2="290" y2="182" stroke="#92400e" stroke-width="1.5" opacity="0.6"/>
        <line x1="245" y1="196" x2="292" y2="198" stroke="#92400e" stroke-width="1.5" opacity="0.6"/>

        <!-- Cheeks -->
        <circle cx="155" cy="195" r="14" fill="#f0b8b8" opacity="0.4"/>
        <circle cx="245" cy="195" r="14" fill="#f0b8b8" opacity="0.4"/>

        <!-- Tail -->
        <path d="M 290 340 Q 340 310 350 260 Q 360 230 340 220" stroke="#d4a574" stroke-width="10" fill="none" stroke-linecap="round"/>

        <!-- Belly spot -->
        <ellipse cx="200" cy="300" rx="40" ry="50" fill="#f0dcc0" opacity="0.6"/>

        <!-- Seed in paws -->
        <ellipse cx="200" cy="360" rx="12" ry="8" fill="#92400e" transform="rotate(-20, 200, 360)"/>
        <ellipse cx="200" cy="360" rx="10" ry="6" fill="#a3692a" transform="rotate(-20, 200, 360)"/>
      </svg>
    </div>

    <div class="speech-bubble" id="bubble">Click the gerbil!</div>

    <div class="facts">
      <div class="fact-card">
        <h3>&#127803; Chaos Agent</h3>
        <p>This gerbil has chewed through 14 phone chargers, 3 ethernet cables, and one mortgage document.</p>
      </div>
      <div class="fact-card">
        <h3>&#127858; Seed Hoarder</h3>
        <p>Maintains a sunflower seed reserve large enough to survive a 47-year winter. Just in case.</p>
      </div>
      <div class="fact-card">
        <h3>&#9201; 3AM Wheel Runner</h3>
        <p>Exclusively exercises at maximum speed between 2:00 AM and 4:00 AM. No exceptions.</p>
      </div>
      <div class="fact-card">
        <h3>&#128683; Escape Artist</h3>
        <p>Has escaped the cage 23 times. Has been found in the fridge twice. Nobody knows how.</p>
      </div>
      <div class="fact-card">
        <h3>&#129520; Tunnel Engineer</h3>
        <p>Has constructed a bedding tunnel system more complex than the London Underground.</p>
      </div>
      <div class="fact-card">
        <h3>&#128064; Judgmental Stare</h3>
        <p>Will sit perfectly still and stare at you for 20 minutes straight. Judging. Always judging.</p>
      </div>
    </div>

    <div class="footer">
      <p>&#169; Terrible Gerbil Inc. All rights reserved. No seeds were harmed in the making of this website.</p>
    </div>
  </div>

  <script>
    const quotes = [
      "I chewed through your USB cable. You're welcome.",
      "*aggressively stuffs cheeks with seeds*",
      "I'm not fat, I'm storing food for winter. In my face.",
      "Your homework? Yeah, I shredded it. It's bedding now.",
      "I will run on this wheel at 3 AM and you WILL listen.",
      "Escape attempt #24 is already in motion.",
      "I knocked over my water bottle on purpose. Chaos.",
      "That cable looked delicious and I have no regrets.",
      "I've been digging this tunnel for 6 months. Almost to freedom.",
      "You think this cage can hold me? Adorable.",
      "I hid seeds in your keyboard. You'll find them eventually.",
      "My bedding arrangement is an art installation. Don't touch it.",
      "*vibrates with chaotic energy*",
      "The wheel goes squeak squeak squeak squeak squeak...",
      "I see you have snacks. Those are my snacks now.",
    ];

    let lastIndex = -1;
    const bubble = document.getElementById('bubble');
    const gerbil = document.getElementById('gerbil');

    // Show bubble on load
    setTimeout(() => bubble.classList.add('visible'), 500);

    gerbil.addEventListener('click', (e) => {
      // Pick a random quote (avoid repeats)
      let idx;
      do { idx = Math.floor(Math.random() * quotes.length); } while (idx === lastIndex);
      lastIndex = idx;

      // Update bubble
      bubble.classList.remove('visible');
      setTimeout(() => {
        bubble.textContent = quotes[idx];
        bubble.classList.add('visible');
      }, 150);

      // Spawn falling seeds
      for (let i = 0; i < 5; i++) {
        const seed = document.createElement('div');
        seed.className = 'seed';
        seed.textContent = ['&#127804;', '&#127793;', '&#129372;', '&#127803;'][Math.floor(Math.random() * 4)];
        seed.innerHTML = seed.textContent;
        seed.style.left = (e.clientX + (Math.random() - 0.5) * 80) + 'px';
        seed.style.top = (e.clientY - 20) + 'px';
        document.body.appendChild(seed);
        setTimeout(() => seed.remove(), 1600);
      }
    });
  </script>
</body>
</html>`;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html;charset=UTF-8' },
    });
  },
};
