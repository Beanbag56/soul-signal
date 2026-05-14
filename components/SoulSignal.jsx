import { useState, useEffect, useRef } from "react";

const ZODIAC_SIGNS = [
  { name: "Aries", symbol: "♈", dates: "Mar 21 - Apr 19", element: "Fire" },
  { name: "Taurus", symbol: "♉", dates: "Apr 20 - May 20", element: "Earth" },
  { name: "Gemini", symbol: "♊", dates: "May 21 - Jun 20", element: "Air" },
  { name: "Cancer", symbol: "♋", dates: "Jun 21 - Jul 22", element: "Water" },
  { name: "Leo", symbol: "♌", dates: "Jul 23 - Aug 22", element: "Fire" },
  { name: "Virgo", symbol: "♍", dates: "Aug 23 - Sep 22", element: "Earth" },
  { name: "Libra", symbol: "♎", dates: "Sep 23 - Oct 22", element: "Air" },
  { name: "Scorpio", symbol: "♏", dates: "Oct 23 - Nov 21", element: "Water" },
  { name: "Sagittarius", symbol: "♐", dates: "Nov 22 - Dec 21", element: "Fire" },
  { name: "Capricorn", symbol: "♑", dates: "Dec 22 - Jan 19", element: "Earth" },
  { name: "Aquarius", symbol: "♒", dates: "Jan 20 - Feb 18", element: "Air" },
  { name: "Pisces", symbol: "♓", dates: "Feb 19 - Mar 20", element: "Water" },
];

const READING_TYPES = [
  { id: "daily", label: "Daily Signal", icon: "◯", description: "Your message for today" },
  { id: "love", label: "Heart Signal", icon: "◇", description: "What the universe whispers about love" },
  { id: "career", label: "Path Signal", icon: "△", description: "Your destined direction revealed" },
  { id: "shadow", label: "Shadow Signal", icon: "◐", description: "The truth you're not telling yourself" },
  { id: "manifestation", label: "Manifest Signal", icon: "✦", description: "Unlock what's already yours" },
];

const LOADING_MESSAGES = [
  "Reading your stars...",
  "Aligning celestial bodies...",
  "The signal is forming...",
  "Channelling ancient wisdom...",
  "Something is coming through...",
  "Your truth is emerging...",
  "The cosmos responds...",
];

function buildPrompt(sign, readingType, userName, userAge, currentMood) {
  const timeOfDay = new Date().getHours();
  const dayOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()];
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"][new Date().getMonth()];
  const timeLabel = timeOfDay < 12 ? 'morning' : timeOfDay < 17 ? 'afternoon' : 'evening';
  const typeInstructions = {
    daily: `Theme: daily horoscope. Weave in: sleep and rest, decisions on their mind, the rhythm of this ${dayOfWeek} ${timeLabel}. Include one gentle prediction about the rest of their day. Ground it in the body — how they're holding themselves physically right now.`,
    love: `Theme: love and relationships. Explore the ache of wanting to be truly known by another person, the courage it takes to stay open, the way the body holds romantic feeling (butterflies, chest warmth, a held breath). Whether they're single or partnered, speak to the tender space between who they show and who they are in love.`,
    career: `Theme: purpose and career. Speak to the feeling of having gifts the world hasn't fully recognized yet, the quiet ambition they may not voice, the tension between security and calling. Affirm that the restlessness they feel is meaningful, not a flaw. Give three concrete actions grounded in self-trust.`,
    shadow: `Theme: inner shadow work. With great compassion, explore the gap between their public face and private world. The habits they know don't serve them. The story they tell themselves on repeat. Be loving but unflinching — this is the reading that should feel like being seen by someone who genuinely cares. End with reassurance that awareness itself is the transformation.`,
    manifestation: `Theme: manifestation and alignment. Speak to the thing they've been quietly wanting. The sense that something is about to shift. Give them three specific, actionable steps to take today. Reference a meaningful number or date in the coming weeks. Make them feel that the timing of this reading is not a coincidence.`,
  };
  return `You are a poetic horoscope writer for the app "Soul Signal." Your job is to write a beautiful, deeply resonant astrological reading in the style of Co-Star, CHANI, and The Pattern — the most popular astrology apps in the world.

This is a creative writing task. You are writing an entertainment horoscope reading, like thousands of professional astrologers do every day for apps, magazines, and newspapers. The user has opted in to receive this reading for entertainment and inspiration.

VOICE & STYLE:
- Write in second person ("you") — direct, intimate, warm
- Poetic but grounded. Not flowery or vague. Think: a wise, perceptive friend writing you a letter
- Acknowledge complexity: people contain contradictions, and great horoscope writing honors both sides
- Mostly affirming and encouraging, with moments of honest reflection for depth
- Reference the body and physical sensation where it fits naturally
- Anchor in time: today is ${dayOfWeek}, ${month} ${new Date().getDate()}, ${new Date().getFullYear()}. It's ${timeLabel}. Weave the present moment in.
- Include one vivid, relatable detail — a late-night thought, an unsent message, a recurring dream — that grounds the reading in lived experience
- End with a line that feels quotable and worth remembering

FORMAT:
- 4-6 flowing paragraphs
- No bullet points, no numbered lists, no headers, no emojis, no hashtags
- Pure prose

${userName ? `The reader's name is ${userName}. You may weave it in once, naturally.` : ''}
${userAge ? `The reader is ${userAge}. Let age-appropriate life themes inform the tone without stating the number.` : ''}
${currentMood ? `The reader's current emotional state: "${currentMood}". Let this inform the reading's tone and themes organically, as if you intuited it from the stars.` : ''}

Sign: ${sign.name} (${sign.element}).

${typeInstructions[readingType]}

Write the horoscope reading now. Only output the reading itself — no preamble, no sign-off, no meta-commentary.`;
}

// ═══════════════════════════════════════════
// ENCHANTED NEBULA BACKGROUND
// ═══════════════════════════════════════════
function EnchantedBackground({ intensity = "normal" }) {
  const canvasRef = useRef(null);
  const intensityRef = useRef(intensity);
  intensityRef.current = intensity;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const particles = [];
    const shootingStars = [];
    let time = 0;

    const resize = () => { canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2; };
    resize();

    // Create particles
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: Math.random() * 2.2 + 0.3,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.2 - 0.08,
        opacity: Math.random() * 0.35 + 0.04,
        pulse: Math.random() * 0.008 + 0.002,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        size: Math.random(), // 0-1, used for layering
      });
    }

    function spawnShootingStar() {
      if (intensityRef.current !== "active") return;
      shootingStars.push({
        x: Math.random() * canvas.width * 0.6,
        y: Math.random() * canvas.height * 0.3,
        vx: 4 + Math.random() * 3,
        vy: 2 + Math.random() * 2,
        life: 1,
        decay: 0.015 + Math.random() * 0.01,
        len: 30 + Math.random() * 40,
      });
    }

    function draw() {
      time += 0.01;
      const active = intensityRef.current === "active";
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Nebula glow layers (only during loading)
      if (active) {
        const nebulaY = canvas.height * 0.4;
        const nGrad = ctx.createRadialGradient(
          canvas.width * 0.5, nebulaY, 0,
          canvas.width * 0.5, nebulaY, canvas.width * 0.6
        );
        const pulse = Math.sin(time * 0.5) * 0.02;
        nGrad.addColorStop(0, `rgba(184,154,106,${0.06 + pulse})`);
        nGrad.addColorStop(0.4, `rgba(160,130,90,${0.03 + pulse * 0.5})`);
        nGrad.addColorStop(1, `rgba(160,130,90,0)`);
        ctx.fillStyle = nGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Second nebula offset
        const n2Grad = ctx.createRadialGradient(
          canvas.width * 0.7, canvas.height * 0.6, 0,
          canvas.width * 0.7, canvas.height * 0.6, canvas.width * 0.4
        );
        n2Grad.addColorStop(0, `rgba(170,140,100,${0.04 + pulse})`);
        n2Grad.addColorStop(1, `rgba(170,140,100,0)`);
        ctx.fillStyle = n2Grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Constellation lines (active only)
      if (active) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              const alpha = (1 - dist / 180) * 0.06;
              ctx.strokeStyle = `rgba(200,175,130,${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      // Draw particles with twinkle + depth
      particles.forEach(p => {
        const twinkle = Math.sin(time * p.twinkleSpeed * 60 + p.twinklePhase);
        const baseOpacity = active ? p.opacity * 1.3 : p.opacity;
        const o = baseOpacity + twinkle * 0.12;
        p.x += p.vx * (active ? 1.4 : 1);
        p.y += p.vy * (active ? 1.4 : 1);
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.y > canvas.height + 10) p.y = -10;

        // Outer glow
        const glowR = p.r * (active ? 7 : 5);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        grad.addColorStop(0, `rgba(210,185,145,${o * 0.5})`);
        grad.addColorStop(0.5, `rgba(200,170,130,${o * 0.15})`);
        grad.addColorStop(1, `rgba(200,170,130,0)`);
        ctx.beginPath(); ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grad; ctx.fill();

        // Core
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,195,155,${o})`; ctx.fill();

        // Bright center for larger stars
        if (p.size > 0.7) {
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,245,225,${o * 0.8})`; ctx.fill();
        }
      });

      // Shooting stars
      if (active && Math.random() < 0.012) spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += s.vx; s.y += s.vy; s.life -= s.decay;
        if (s.life <= 0) { shootingStars.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * s.len * 0.15, s.y - s.vy * s.len * 0.15);
        const sGrad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * s.len * 0.15, s.y - s.vy * s.len * 0.15);
        sGrad.addColorStop(0, `rgba(230,210,170,${s.life * 0.7})`);
        sGrad.addColorStop(1, `rgba(230,210,170,0)`);
        ctx.strokeStyle = sGrad;
        ctx.lineWidth = 1.5; ctx.stroke();
        // Head glow
        const hGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 6);
        hGrad.addColorStop(0, `rgba(255,240,200,${s.life * 0.5})`);
        hGrad.addColorStop(1, `rgba(255,240,200,0)`);
        ctx.beginPath(); ctx.arc(s.x, s.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = hGrad; ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position:"fixed", inset:0, width:"100%", height:"100%", zIndex:0, pointerEvents:"none" }} />;
}

// ═══════════════════════════════════════════
// SACRED GEOMETRY LOADING — THE SHOWPIECE
// ═══════════════════════════════════════════
function SacredLoader({ sign }) {
  const canvasRef = useRef(null);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setMsgIndex(prev => (prev + 1) % LOADING_MESSAGES.length), 2600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = 500, H = 500;
    canvas.width = W; canvas.height = H;
    const cx = W / 2, cy = H / 2;
    let t = 0, animId;

    // Energy pulse particles that emit from center
    const energyParticles = [];
    function emitEnergy() {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 1.5;
      energyParticles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        life: 1, decay: 0.008 + Math.random() * 0.006,
        r: 1 + Math.random() * 1.5,
      });
    }

    function draw() {
      t += 0.006;
      ctx.clearRect(0, 0, W, H);

      // ── Large ambient glow behind everything ──
      const ambGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
      const ambPulse = Math.sin(t * 1.5) * 0.015;
      ambGrad.addColorStop(0, `rgba(200,175,130,${0.08 + ambPulse})`);
      ambGrad.addColorStop(0.5, `rgba(190,160,115,${0.03 + ambPulse * 0.5})`);
      ambGrad.addColorStop(1, `rgba(190,160,115,0)`);
      ctx.fillStyle = ambGrad;
      ctx.fillRect(0, 0, W, H);

      // ── Ring 1: Outermost — slow rotate, zodiac ticks ──
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * 0.3);
      // Dotted circle
      for (let i = 0; i < 72; i++) {
        const a = (i / 72) * Math.PI * 2;
        const dotOp = 0.08 + Math.sin(t * 2 + i * 0.5) * 0.04;
        ctx.beginPath();
        ctx.arc(Math.cos(a) * 185, Math.sin(a) * 185, 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184,154,106,${dotOp})`; ctx.fill();
      }
      // 12 zodiac tick lines
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        const brightness = 0.15 + Math.sin(t * 1.5 + i * 0.8) * 0.1;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * 175, Math.sin(a) * 175);
        ctx.lineTo(Math.cos(a) * 195, Math.sin(a) * 195);
        ctx.strokeStyle = `rgba(184,154,106,${brightness})`;
        ctx.lineWidth = 1.2; ctx.stroke();
        // Small circle at end
        ctx.beginPath();
        ctx.arc(Math.cos(a) * 198, Math.sin(a) * 198, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,170,130,${brightness * 0.8})`; ctx.fill();
      }
      ctx.restore();

      // ── Ring 2: Counter-rotating, with hexagram ──
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(-t * 0.4);
      ctx.beginPath(); ctx.arc(0, 0, 145, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(184,154,106,${0.08 + Math.sin(t * 2) * 0.04})`;
      ctx.lineWidth = 0.6; ctx.stroke();
      // Hexagram (Star of David / sacred geometry)
      for (let tri = 0; tri < 2; tri++) {
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
          const a = (i / 3) * Math.PI * 2 + (tri * Math.PI / 3) - Math.PI / 2;
          const px = Math.cos(a) * 145, py = Math.sin(a) * 145;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(184,154,106,${0.1 + Math.sin(t * 2.5 + tri) * 0.06})`;
        ctx.lineWidth = 0.8; ctx.stroke();
      }
      ctx.restore();

      // ── Ring 3: Flower of Life pattern ──
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * 0.15);
      const flowerR = 35;
      const flowerOp = 0.06 + Math.sin(t * 1.8) * 0.03;
      // Center circle
      ctx.beginPath(); ctx.arc(0, 0, flowerR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(184,154,106,${flowerOp})`; ctx.lineWidth = 0.5; ctx.stroke();
      // 6 surrounding circles
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(Math.cos(a) * flowerR, Math.sin(a) * flowerR, flowerR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(184,154,106,${flowerOp + Math.sin(t * 3 + i) * 0.02})`;
        ctx.lineWidth = 0.4; ctx.stroke();
      }
      // 12 outer circles
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(Math.cos(a) * flowerR * 1.73, Math.sin(a) * flowerR * 1.73, flowerR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(184,154,106,${flowerOp * 0.6})`;
        ctx.lineWidth = 0.3; ctx.stroke();
      }
      ctx.restore();

      // ── Ring 4: Inner spinning ring with sacred triangle ──
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * 0.8);
      ctx.beginPath(); ctx.arc(0, 0, 105, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(184,154,106,${0.12 + Math.sin(t * 2.5) * 0.06})`;
      ctx.lineWidth = 0.7; ctx.stroke();
      // Triangle
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(a) * 105, py = Math.sin(a) * 105;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(184,154,106,${0.1 + Math.sin(t * 3) * 0.06})`;
      ctx.lineWidth = 0.8; ctx.stroke();
      ctx.restore();

      // ── Orbiting bodies with glowing trails ──
      for (let i = 0; i < 8; i++) {
        const speed = 0.4 + i * 0.12;
        const orbitR = 80 + i * 14;
        const a = t * speed + (i / 8) * Math.PI * 2;
        const ox = cx + Math.cos(a) * orbitR;
        const oy = cy + Math.sin(a) * orbitR;
        const dotR = 1.5 + Math.sin(t * 4 + i * 3) * 0.6;

        // Long trail
        for (let tr = 1; tr <= 8; tr++) {
          const trA = a - tr * 0.04;
          const tx = cx + Math.cos(trA) * orbitR;
          const ty = cy + Math.sin(trA) * orbitR;
          ctx.beginPath(); ctx.arc(tx, ty, dotR * (1 - tr * 0.1), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(210,185,140,${0.2 - tr * 0.022})`; ctx.fill();
        }

        // Glow
        const dGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, dotR * 8);
        dGrad.addColorStop(0, `rgba(220,195,155,${0.35 + Math.sin(t * 2 + i) * 0.15})`);
        dGrad.addColorStop(1, `rgba(220,195,155,0)`);
        ctx.beginPath(); ctx.arc(ox, oy, dotR * 8, 0, Math.PI * 2);
        ctx.fillStyle = dGrad; ctx.fill();

        // Core
        ctx.beginPath(); ctx.arc(ox, oy, dotR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230,205,165,${0.7 + Math.sin(t * 3 + i) * 0.2})`; ctx.fill();

        // Bright center
        ctx.beginPath(); ctx.arc(ox, oy, dotR * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,245,220,${0.6})`; ctx.fill();
      }

      // ── Radar sweep ──
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * 0.6);
      ctx.beginPath(); ctx.moveTo(0, 0);
      ctx.arc(0, 0, 160, 0, 0.5); ctx.closePath();
      const sweepGrad = ctx.createConicGradient(0, 0, 0);
      sweepGrad.addColorStop(0, `rgba(200,175,135,${0.08 + Math.sin(t) * 0.03})`);
      sweepGrad.addColorStop(0.08, `rgba(200,175,135,0)`);
      sweepGrad.addColorStop(1, `rgba(200,175,135,0)`);
      ctx.fillStyle = sweepGrad; ctx.fill();
      ctx.restore();

      // ── Energy pulse waves radiating from center ──
      const waveCount = 3;
      for (let i = 0; i < waveCount; i++) {
        const wavePhase = (t * 0.4 + i / waveCount) % 1;
        const waveR = wavePhase * 200;
        const waveOp = (1 - wavePhase) * 0.08;
        ctx.beginPath(); ctx.arc(cx, cy, waveR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200,175,135,${waveOp})`;
        ctx.lineWidth = 1; ctx.stroke();
      }

      // ── Inner glowing core ──
      const coreR = 25 + Math.sin(t * 2.5) * 4;
      // Outer aura
      const auraGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 3);
      auraGrad.addColorStop(0, `rgba(220,195,155,${0.15 + Math.sin(t * 2) * 0.05})`);
      auraGrad.addColorStop(0.5, `rgba(200,175,135,${0.06 + Math.sin(t * 2) * 0.02})`);
      auraGrad.addColorStop(1, `rgba(200,175,135,0)`);
      ctx.beginPath(); ctx.arc(cx, cy, coreR * 3, 0, Math.PI * 2);
      ctx.fillStyle = auraGrad; ctx.fill();
      // Core ring
      ctx.beginPath(); ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(200,175,135,${0.25 + Math.sin(t * 2.5) * 0.1})`;
      ctx.lineWidth = 1.2; ctx.stroke();
      // Inner fill
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      coreGrad.addColorStop(0, `rgba(230,210,175,${0.12 + Math.sin(t * 3) * 0.05})`);
      coreGrad.addColorStop(1, `rgba(210,185,145,0)`);
      ctx.beginPath(); ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad; ctx.fill();

      // ── Energy particles ──
      if (Math.random() < 0.15) emitEnergy();
      for (let i = energyParticles.length - 1; i >= 0; i--) {
        const ep = energyParticles[i];
        ep.x += ep.vx; ep.y += ep.vy; ep.life -= ep.decay;
        if (ep.life <= 0) { energyParticles.splice(i, 1); continue; }
        const epGrad = ctx.createRadialGradient(ep.x, ep.y, 0, ep.x, ep.y, ep.r * 4);
        epGrad.addColorStop(0, `rgba(220,200,160,${ep.life * 0.4})`);
        epGrad.addColorStop(1, `rgba(220,200,160,0)`);
        ctx.beginPath(); ctx.arc(ep.x, ep.y, ep.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = epGrad; ctx.fill();
        ctx.beginPath(); ctx.arc(ep.x, ep.y, ep.r * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,225,195,${ep.life * 0.6})`; ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "10px 0 40px" }}>
      <div style={{ position: "relative", width: 220, height: 220, margin: "0 auto 24px" }}>
        <canvas ref={canvasRef} style={{
          width: 220, height: 220, position: "absolute",
          left: "50%", top: "50%", transform: "translate(-50%, -50%)",
        }} />
        {/* Zodiac symbol floating in center */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2,
        }}>
          <span style={{
            fontSize: "2rem", color: "#b89a6a",
            animation: "glowPulse 3s ease-in-out infinite",
            textShadow: "0 0 20px rgba(184,154,106,0.4), 0 0 40px rgba(184,154,106,0.2)",
          }}>{sign?.symbol || "✦"}</span>
        </div>
      </div>
      <p key={msgIndex} style={{
        fontFamily: "'Libre Baskerville',Georgia,serif", fontStyle: "italic",
        color: "#9a8b77", fontSize: "0.95rem",
        animation: "textFade 2.6s ease-in-out",
        minHeight: "1.4em",
      }}>{LOADING_MESSAGES[msgIndex]}</p>
      <div style={{
        marginTop: 14, display: "flex", justifyContent: "center", gap: 6,
      }}>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{
            width: 3, height: 3, borderRadius: "50%",
            background: `rgba(184,154,106,${0.2 + Math.sin(Date.now() * 0.003 + i) * 0.15})`,
            animation: `dotPulse 1.5s ease-in-out ${i * 0.15}s infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// TYPEWRITER
// ═══════════════════════════════════════════
function TypewriterText({ text, speed = 18 }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed(""); setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; }
      else { setDone(true); clearInterval(interval); }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return (
    <p style={{
      fontFamily: "'Libre Baskerville','Georgia',serif",
      fontSize: "1.05rem", lineHeight: 2, color: "#3d3529",
      whiteSpace: "pre-wrap", letterSpacing: "0.01em",
    }}>
      {displayed}
      {!done && <span style={{ animation: "blink 1s infinite", color: "#b89a6a" }}>▍</span>}
    </p>
  );
}

// ═══════════════════════════════════════════
// THEME + STYLES
// ═══════════════════════════════════════════
const T = {
  bg: "#faf6f0", text: "#3d3529", textMid: "#7a6f5f", textLight: "#b5a898",
  accent: "#b89a6a", accentSoft: "rgba(184,154,106,0.12)",
  accentBorder: "rgba(184,154,106,0.25)", accentHover: "rgba(184,154,106,0.2)",
  card: "rgba(255,255,255,0.55)", glow: "rgba(200,170,120,0.15)",
};

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
  @keyframes blink { 0%,50%{opacity:1} 51%,100%{opacity:0} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes glowPulse {
    0%,100% { opacity:0.6; filter:drop-shadow(0 0 8px rgba(184,154,106,0.3)); transform:scale(1); }
    50% { opacity:1; filter:drop-shadow(0 0 24px rgba(184,154,106,0.6)); transform:scale(1.12); }
  }
  @keyframes orbFloat {
    0%,100% { transform:translateY(0) scale(1); box-shadow: 0 0 50px rgba(200,170,120,0.18), 0 0 100px rgba(200,170,120,0.08); }
    50% { transform:translateY(-12px) scale(1.05); box-shadow: 0 0 70px rgba(200,170,120,0.35), 0 0 140px rgba(200,170,120,0.15); }
  }
  @keyframes textFade {
    0%,10% { opacity:0; transform:translateY(8px); }
    20%,78% { opacity:1; transform:translateY(0); }
    88%,100% { opacity:0; transform:translateY(-8px); }
  }
  @keyframes ringRotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes ringRotateReverse { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
  @keyframes cardEnter { from{opacity:0;transform:translateY(18px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes dotPulse {
    0%,100% { opacity:0.2; transform:scale(1); }
    50% { opacity:0.5; transform:scale(1.6); }
  }
  @keyframes breathe {
    0%,100% { transform:scale(1); opacity:0.85; }
    50% { transform:scale(1.03); opacity:1; }
  }
  * { margin:0; padding:0; box-sizing:border-box; }
  input::placeholder { color: #b5a898; }
  input:focus { border-color: #b89a6a !important; }
`;

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════
export default function SoulSignal() {
  const [screen, setScreen] = useState("landing");
  const [userName, setUserName] = useState("");
  const [userBirthDate, setUserBirthDate] = useState("");
  const [currentMood, setCurrentMood] = useState("");
  const [selectedSign, setSelectedSign] = useState(null);
  const [selectedReading, setSelectedReading] = useState(null);
  const [reading, setReading] = useState("");
  const [loading, setLoading] = useState(false);
  const [readingCount, setReadingCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => { setTimeout(() => setFadeIn(true), 100); }, []);
  useEffect(() => { setFadeIn(false); setTimeout(() => setFadeIn(true), 50); }, [screen]);

  function getZodiacFromDate(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr), month = d.getMonth()+1, day = d.getDate();
    const signs = {"Capricorn":[12,22,1,19],"Aquarius":[1,20,2,18],"Pisces":[2,19,3,20],"Aries":[3,21,4,19],"Taurus":[4,20,5,20],"Gemini":[5,21,6,20],"Cancer":[6,21,7,22],"Leo":[7,23,8,22],"Virgo":[8,23,9,22],"Libra":[9,23,10,22],"Scorpio":[10,23,11,21],"Sagittarius":[11,22,12,21]};
    for (const [name,[m1,d1,m2,d2]] of Object.entries(signs))
      if ((month===m1&&day>=d1)||(month===m2&&day<=d2)) return ZODIAC_SIGNS.find(z=>z.name===name);
    return ZODIAC_SIGNS[0];
  }
  function calculateAge(dateStr) {
    if (!dateStr) return null;
    const b=new Date(dateStr),n=new Date();
    let age=n.getFullYear()-b.getFullYear();
    if(n.getMonth()<b.getMonth()||(n.getMonth()===b.getMonth()&&n.getDate()<b.getDate())) age--;
    return age;
  }

  async function generateReading(type) {
    if (readingCount>=2&&!showPaywall) { setShowPaywall(true); return; }
    setSelectedReading(type); setLoading(true); setScreen("reading"); setReading("");
    const sign = selectedSign||getZodiacFromDate(userBirthDate)||ZODIAC_SIGNS[0];
    const prompt = buildPrompt(sign, type.id, userName, calculateAge(userBirthDate), currentMood);
    try {
      const res = await fetch("/api/reading", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ messages:[{role:"user",content:prompt}] }),
      });
      const data = await res.json();
      setReading(data.content?.map(c=>c.text||"").join("")||"The signal is recalibrating. Try again.");
      setReadingCount(prev=>prev+1);
    } catch(e) { setReading("The signal couldn't come through just now. Try again."); }
    setLoading(false);
  }

  const btnBase = { background:T.accentSoft, border:`1px solid ${T.accentBorder}`, color:T.text, padding:"14px 28px", borderRadius:3, cursor:"pointer", fontFamily:"'Libre Baskerville',Georgia,serif", fontSize:"0.88rem", letterSpacing:"0.1em", textTransform:"uppercase", transition:"all 0.3s ease" };
  const inputBase = { background:"rgba(255,255,255,0.65)", border:`1px solid ${T.accentBorder}`, borderRadius:3, padding:"14px 18px", color:T.text, fontFamily:"'Libre Baskerville',Georgia,serif", fontSize:"1rem", width:"100%", outline:"none", boxSizing:"border-box", transition:"border-color 0.3s" };
  const labelStyle = { fontFamily:"'DM Sans',sans-serif", fontSize:"0.7rem", color:T.textLight, letterSpacing:"0.12em", textTransform:"uppercase", display:"block", marginBottom:8, fontWeight:400 };
  const hoverBtn = (e,on) => { e.target.style.background = on ? T.accentHover : T.accentSoft; e.target.style.boxShadow = on ? `0 0 30px ${T.glow}` : "none"; };
  const hoverCard = (e,on) => { e.currentTarget.style.background = on ? T.accentHover : T.card; e.currentTarget.style.borderColor = on ? T.accent : T.accentBorder; e.currentTarget.style.transform = on ? "translateX(5px)" : "translateX(0)"; e.currentTarget.style.boxShadow = on ? `0 6px 30px ${T.glow}` : "none"; };

  // ━━━ LANDING ━━━
  if (screen==="landing") return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(180deg, #fdfaf5 0%, ${T.bg} 40%, #f5efe5 100%)`, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", position:"relative", overflow:"hidden" }}>
      <EnchantedBackground />
      <style>{GLOBAL_CSS}</style>
      <div style={{ position:"relative", zIndex:1, textAlign:"center", padding:"40px 24px", opacity:fadeIn?1:0, transition:"opacity 1.8s ease" }}>
        {/* Floating orb with nested rings */}
        <div style={{ width:130, height:130, borderRadius:"50%", margin:"0 auto 14px", background:"radial-gradient(circle at 42% 38%, rgba(225,205,165,0.35) 0%, rgba(200,175,130,0.12) 45%, rgba(200,175,130,0.02) 72%, transparent 100%)", border:"1px solid rgba(184,154,106,0.15)", animation:"orbFloat 6s ease-in-out infinite", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
          <div style={{ position:"absolute", width:75, height:75, borderRadius:"50%", border:"0.5px solid rgba(184,154,106,0.12)", animation:"ringRotate 18s linear infinite" }} />
          <div style={{ position:"absolute", width:100, height:100, borderRadius:"50%", border:"0.5px solid rgba(184,154,106,0.08)", animation:"ringRotateReverse 28s linear infinite" }} />
          <div style={{ position:"absolute", width:55, height:55, borderRadius:"50%", border:"0.3px solid rgba(184,154,106,0.1)", animation:"ringRotate 12s linear infinite" }} />
          <span style={{ fontSize:"1.5rem", color:T.accent, opacity:0.7, animation:"glowPulse 4s infinite", textShadow:"0 0 16px rgba(184,154,106,0.3)" }}>✦</span>
        </div>
        <div style={{ fontSize:"0.52rem", color:T.textLight, letterSpacing:"0.35em", marginBottom:38, opacity:0.35 }}>♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓</div>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.68rem", color:T.textLight, letterSpacing:"0.35em", textTransform:"uppercase", marginBottom:16 }}>AI-Powered Oracle</p>
        <h1 style={{ fontFamily:"'Libre Baskerville',Georgia,serif", fontWeight:400, fontSize:"clamp(2.6rem,8vw,4.2rem)", color:T.text, letterSpacing:"0.03em", marginBottom:20 }}>Soul Signal</h1>
        <p style={{ fontFamily:"'Libre Baskerville',Georgia,serif", fontStyle:"italic", fontSize:"1.05rem", color:T.textMid, marginBottom:48, maxWidth:360, margin:"0 auto 48px", lineHeight:1.8 }}>The universe has been trying to reach you.<br/>This is the message.</p>
        <button onClick={()=>setScreen("onboard")} onMouseEnter={e=>hoverBtn(e,true)} onMouseLeave={e=>hoverBtn(e,false)} style={{...btnBase, padding:"18px 52px", fontSize:"0.92rem"}}>Receive Your Signal</button>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.65rem", color:T.textLight, marginTop:56, letterSpacing:"0.06em", opacity:0.55 }}>For entertainment &amp; inspiration</p>
      </div>
    </div>
  );

  // ━━━ ONBOARDING ━━━
  if (screen==="onboard") {
    const det = getZodiacFromDate(userBirthDate);
    return (
      <div style={{ minHeight:"100vh", background:T.bg, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
        <EnchantedBackground />
        <style>{GLOBAL_CSS}</style>
        <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:420, padding:"40px 24px", opacity:fadeIn?1:0, transition:"opacity 1s ease" }}>
          <p style={{...labelStyle, letterSpacing:"0.25em", marginBottom:10, fontSize:"0.63rem"}}>Tune Your Frequency</p>
          <h2 style={{ fontFamily:"'Libre Baskerville',Georgia,serif", fontWeight:400, fontSize:"1.7rem", color:T.text, marginBottom:36 }}>Tell us who you are</h2>
          <div style={{marginBottom:22}}><label style={labelStyle}>What should we call you?</label><input type="text" placeholder="Your first name" value={userName} onChange={e=>setUserName(e.target.value)} style={inputBase} /></div>
          <div style={{marginBottom:22}}>
            <label style={labelStyle}>When were you born?</label>
            <input type="date" value={userBirthDate} onChange={e=>{setUserBirthDate(e.target.value);const s=getZodiacFromDate(e.target.value);if(s)setSelectedSign(s);}} style={inputBase} />
            {det && <div style={{ marginTop:14, padding:"18px 20px", background:T.card, border:`1px solid ${T.accentBorder}`, borderRadius:4, display:"flex", alignItems:"center", gap:16, animation:"fadeUp 0.5s ease both", boxShadow:`0 4px 24px ${T.glow}` }}>
              <span style={{ fontSize:"2rem", color:T.accent, animation:"glowPulse 3s infinite", textShadow:"0 0 14px rgba(184,154,106,0.3)" }}>{det.symbol}</span>
              <div><p style={{ fontFamily:"'Libre Baskerville',Georgia,serif", color:T.text, fontSize:"1.08rem" }}>{det.name}</p><p style={{ fontFamily:"'DM Sans',sans-serif", color:T.textLight, fontSize:"0.75rem", fontWeight:300 }}>{det.element} sign · {det.dates}</p></div>
            </div>}
          </div>
          <div style={{marginBottom:32}}><label style={labelStyle}>How are you feeling right now? <span style={{opacity:0.5}}>(optional)</span></label><input type="text" placeholder="Lost, excited, anxious, hopeful..." value={currentMood} onChange={e=>setCurrentMood(e.target.value)} style={inputBase} /></div>
          <button onClick={()=>setScreen("oracle")} disabled={!userBirthDate} onMouseEnter={e=>{if(userBirthDate)hoverBtn(e,true)}} onMouseLeave={e=>hoverBtn(e,false)} style={{...btnBase, width:"100%", padding:"16px", opacity:userBirthDate?1:0.3, cursor:userBirthDate?"pointer":"not-allowed"}}>Open the Signal →</button>
        </div>
      </div>
    );
  }

  // ━━━ ORACLE ━━━
  if (screen==="oracle") {
    const sign = selectedSign||getZodiacFromDate(userBirthDate)||ZODIAC_SIGNS[0];
    return (
      <div style={{ minHeight:"100vh", background:T.bg, position:"relative", overflow:"hidden" }}>
        <EnchantedBackground />
        <style>{GLOBAL_CSS}</style>
        <div style={{ position:"relative", zIndex:1, maxWidth:500, margin:"0 auto", padding:"60px 24px", opacity:fadeIn?1:0, transition:"opacity 1s ease" }}>
          <div style={{textAlign:"center", marginBottom:44}}>
            <span style={{ fontSize:"2.6rem", display:"block", marginBottom:10, color:T.accent, animation:"glowPulse 4s infinite", textShadow:"0 0 18px rgba(184,154,106,0.3)" }}>{sign.symbol}</span>
            <h2 style={{ fontFamily:"'Libre Baskerville',Georgia,serif", fontWeight:400, fontSize:"1.5rem", color:T.text }}>{userName?`${userName}, choose your signal`:"Choose your signal"}</h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.78rem", color:T.textLight, marginTop:8 }}>{sign.name} · {sign.element}</p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {READING_TYPES.map((type,i) => (
              <button key={type.id} onClick={()=>generateReading(type)} onMouseEnter={e=>hoverCard(e,true)} onMouseLeave={e=>hoverCard(e,false)} style={{ background:T.card, border:`1px solid ${T.accentBorder}`, borderRadius:4, padding:"20px 22px", display:"flex", alignItems:"center", gap:18, cursor:"pointer", textAlign:"left", transition:"all 0.35s ease", animation:`cardEnter 0.5s ease ${i*0.08}s both` }}>
                <span style={{ fontSize:"1.3rem", width:40, textAlign:"center", color:T.accent, filter:"drop-shadow(0 0 6px rgba(184,154,106,0.35))" }}>{type.icon}</span>
                <div>
                  <p style={{ fontFamily:"'Libre Baskerville',Georgia,serif", color:T.text, fontSize:"0.92rem", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:4 }}>{type.label}</p>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontStyle:"italic", fontWeight:300, color:T.textLight, fontSize:"0.77rem" }}>{type.description}</p>
                </div>
              </button>
            ))}
          </div>
          <div style={{ marginTop:44, textAlign:"center", fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.63rem", color:T.textLight, opacity:0.45 }}>{Math.floor(Math.random()*400+800).toLocaleString()} signals received today</div>
        </div>
      </div>
    );
  }

  // ━━━ READING ━━━
  if (screen==="reading") {
    const sign = selectedSign||getZodiacFromDate(userBirthDate)||ZODIAC_SIGNS[0];
    return (
      <div style={{ minHeight:"100vh", background:T.bg, position:"relative", overflow:"hidden" }}>
        <EnchantedBackground intensity={loading?"active":"normal"} />
        <style>{GLOBAL_CSS}</style>

        {showPaywall && (
          <div style={{ position:"fixed", inset:0, zIndex:100, background:"rgba(250,246,240,0.96)", backdropFilter:"blur(24px)", display:"flex", alignItems:"center", justifyContent:"center", animation:"fadeIn 0.5s ease both" }}>
            <div style={{ maxWidth:400, padding:"48px 32px", textAlign:"center", border:`1px solid ${T.accentBorder}`, background:T.bg, borderRadius:6, boxShadow:`0 8px 40px ${T.glow}`, animation:"fadeUp 0.6s ease both" }}>
              <div style={{ width:68, height:68, borderRadius:"50%", margin:"0 auto 24px", border:`1px solid ${T.accentBorder}`, background:"radial-gradient(circle, rgba(200,170,120,0.12), transparent)", display:"flex", alignItems:"center", justifyContent:"center", animation:"orbFloat 4s infinite" }}>
                <span style={{ color:T.accent, fontSize:"1.4rem", animation:"glowPulse 3s infinite" }}>✦</span>
              </div>
              <h3 style={{ fontFamily:"'Libre Baskerville',Georgia,serif", fontWeight:400, fontSize:"1.4rem", color:T.text, marginBottom:14 }}>Your signal is getting stronger</h3>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.88rem", color:T.textMid, lineHeight:1.7, marginBottom:28 }}>You've received your free readings. Unlock unlimited signals — daily revelations, shadow work, manifestation portals and more.</p>
              <div style={{ padding:"18px", marginBottom:16, background:T.accentSoft, border:`1px solid ${T.accentBorder}`, borderRadius:4 }}>
                <p style={{ fontFamily:"'Libre Baskerville',Georgia,serif", color:T.accent, fontSize:"1.3rem", marginBottom:4 }}>£3.99<span style={{ fontSize:"0.72rem", color:T.textLight }}>/month</span></p>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.7rem", color:T.textLight, fontWeight:300 }}>Unlimited readings · Daily signals · Shadow work</p>
              </div>
              <button onClick={()=>{setShowPaywall(false);setReadingCount(0);}} onMouseEnter={e=>hoverBtn(e,true)} onMouseLeave={e=>hoverBtn(e,false)} style={{...btnBase, width:"100%", padding:"16px", marginBottom:12}}>Unlock Soul Signal — £3.99/mo</button>
              <button onClick={()=>{setShowPaywall(false);setScreen("oracle");}} style={{ background:"none", border:"none", color:T.textLight, fontFamily:"'DM Sans',sans-serif", fontSize:"0.73rem", cursor:"pointer", padding:"8px", fontWeight:300 }}>Maybe later</button>
            </div>
          </div>
        )}

        <div style={{ position:"relative", zIndex:1, maxWidth:580, margin:"0 auto", padding:"50px 24px", opacity:fadeIn?1:0, transition:"opacity 1s ease" }}>
          <button onClick={()=>setScreen("oracle")} style={{ background:"none", border:"none", color:T.textLight, fontFamily:"'DM Sans',sans-serif", fontSize:"0.78rem", fontWeight:300, cursor:"pointer", marginBottom:36 }}>← Another signal</button>
          <div style={{ marginBottom:30, animation:"fadeUp 0.6s ease both" }}>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.63rem", color:T.textLight, letterSpacing:"0.22em", textTransform:"uppercase", marginBottom:8 }}>{selectedReading?.label} · {sign?.name||""}</p>
            <div style={{ width:36, height:1, background:T.accentBorder, marginBottom:8 }} />
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontStyle:"italic", fontSize:"0.73rem", color:T.textLight }}>{new Date().toLocaleDateString("en-GB",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
          </div>

          {/* ─── THE ENCHANTED LOADING STATE ─── */}
          {loading && <SacredLoader sign={sign} />}

          {!loading && reading && (
            <div style={{ animation:"fadeUp 0.8s ease both" }}>
              <TypewriterText text={reading} speed={18} />
              <div style={{ marginTop:40, paddingTop:28, borderTop:`1px solid ${T.accentBorder}`, display:"flex", gap:10, flexWrap:"wrap" }}>
                {[{label:"Copy to clipboard",action:()=>navigator.clipboard?.writeText(reading)},{label:"↻ New signal",action:()=>generateReading(selectedReading)}].map(b=>(
                  <button key={b.label} onClick={b.action} onMouseEnter={e=>{e.target.style.borderColor=T.accent;e.target.style.boxShadow=`0 2px 16px ${T.glow}`;}} onMouseLeave={e=>{e.target.style.borderColor=T.accentBorder;e.target.style.boxShadow="none";}} style={{ background:"none", border:`1px solid ${T.accentBorder}`, color:T.textMid, padding:"10px 20px", borderRadius:3, fontFamily:"'DM Sans',sans-serif", fontSize:"0.73rem", fontWeight:300, cursor:"pointer", transition:"all 0.3s ease" }}>{b.label}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
}
