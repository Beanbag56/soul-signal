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
  { id: "daily", label: "Daily Signal", icon: "◯", description: "Your message for today", premium: false },
  { id: "love", label: "Heart Signal", icon: "◇", description: "What the universe whispers about love", premium: false },
  { id: "career", label: "Path Signal", icon: "△", description: "Your destined direction revealed", premium: false },
  { id: "shadow", label: "Shadow Signal", icon: "◐", description: "The truth you're not telling yourself", premium: false },
  { id: "manifestation", label: "Manifest Signal", icon: "✦", description: "Unlock what's already yours", premium: false },
  { id: "pastlife", label: "Past Life Signal", icon: "⟳", description: "Echoes from beyond this lifetime", premium: true },
  { id: "soulmate", label: "Soul Mate Signal", icon: "⋈", description: "The connection you're truly seeking", premium: true },
];

const LOADING_MESSAGES = [
  "The cosmos is listening...",
  "Ancient starlight converges...",
  "Your signal cuts through the void...",
  "The universe speaks only truth...",
  "Something profound is forming...",
  "The stars align for you alone...",
  "Your destiny takes shape...",
];

function buildPrompt(sign, readingType, userName, userAge, currentMood) {
  const timeOfDay = new Date().getHours();
  const dayOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()];
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"][new Date().getMonth()];
  const timeLabel = timeOfDay < 12 ? 'morning' : timeOfDay < 17 ? 'afternoon' : 'evening';
  const typeInstructions = {
    daily: `Theme: daily horoscope. Weave in: sleep and rest, decisions on their mind, the rhythm of this ${dayOfWeek} ${timeLabel}. Include one gentle prediction about the rest of their day. Ground it in the body — how they're holding themselves physically right now.`,
    love: `Theme: love and relationships. Explore the ache of wanting to be truly known by another person, the courage it takes to stay open, the way the body holds romantic feeling. Speak to the tender space between who they show and who they are in love.`,
    career: `Theme: purpose and career. Speak to the feeling of having gifts the world hasn't fully recognized yet, the quiet ambition they may not voice, the tension between security and calling. Give three concrete actions grounded in self-trust.`,
    shadow: `Theme: inner shadow work. With great compassion, explore the gap between their public face and private world. Be loving but unflinching. End with reassurance that awareness itself is the transformation.`,
    manifestation: `Theme: manifestation and alignment. Speak to the thing they've been quietly wanting. Give them three specific actionable steps to take today. Make them feel the timing of this reading is not a coincidence.`,
    pastlife: `Theme: past life reading. This is an exclusive premium reading. Speak as though you can see fragments of their soul's journey across multiple lifetimes. Reference a specific past life era or setting that feels relevant to their current struggles. Connect past life patterns to their present circumstances. Be mystical, poetic, and deeply personal. Suggest what soul lesson they are here to complete in this lifetime. This should feel like the most profound reading they've ever received.`,
    soulmate: `Theme: soul mate and deep connection. This is an exclusive premium reading. Speak to the nature of their most significant soul connection — whether they've met this person or not yet. Describe the energetic signature of this connection. Reference what this person brings out in them and what they bring out in this person. If they're already with someone, affirm the soul-level depth of that bond. If they're single, describe the qualities of the connection that's coming. Make this feel like cosmic confirmation of something they've always sensed.`,
  };
  return `You are a deeply gifted psychic oracle writer for "Soul Signal Premium" — the most exclusive AI astrology experience available. You write for subscribers who have invested in the deepest possible cosmic guidance.

This is a creative writing task for an entertainment astrology app. The subscriber has opted in for the most profound, premium reading experience possible.

PREMIUM VOICE & STYLE:
- Write in second person ("you") — intimate, knowing, almost uncomfortably accurate
- More mystical and poetic than standard horoscopes — this is premium content
- Longer and more detailed than a standard reading — these subscribers deserve more
- Reference specific sensations, images, and moments that feel eerily personal
- Anchor in time: today is ${dayOfWeek}, ${month} ${new Date().getDate()}, ${new Date().getFullYear()}. It's ${timeLabel}.
- Include two or three vivid, relatable details that ground the reading
- End with a line so quotable they'll screenshot it immediately

FORMAT:
- 5-7 flowing paragraphs — more depth than a free reading
- No bullet points, no numbered lists, no headers, no emojis
- Pure flowing prose — this should read like literature

${userName ? `The reader's name is ${userName}. Weave it in naturally once or twice.` : ''}
${userAge ? `The reader is ${userAge}. Let this deeply inform the life-stage themes.` : ''}
${currentMood ? `Their current state: "${currentMood}". Thread this throughout as if you divined it.` : ''}

Sign: ${sign.name} (${sign.element}).

${typeInstructions[readingType]}

Write the premium reading now. Only output the reading — no preamble, no sign-off, no meta-commentary.`;
}

// ═══════════════════════════════════════════
// DEEP COSMIC BACKGROUND — darker, richer
// ═══════════════════════════════════════════
function CosmicBackground({ intensity = "normal" }) {
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

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: Math.random() * 2.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.15 - 0.05,
        opacity: Math.random() * 0.6 + 0.1,
        pulse: Math.random() * 0.008 + 0.002,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.7 ? 280 : Math.random() > 0.5 ? 200 : 40,
      });
    }

    function spawnStar() {
      shootingStars.push({
        x: Math.random() * canvas.width * 0.7,
        y: Math.random() * canvas.height * 0.4,
        vx: 3 + Math.random() * 4, vy: 1.5 + Math.random() * 2,
        life: 1, decay: 0.012 + Math.random() * 0.008,
        len: 40 + Math.random() * 60,
      });
    }

    function draw() {
      time += 0.008;
      const active = intensityRef.current === "active";
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep space gradient overlay
      const spaceGrad = ctx.createRadialGradient(
        canvas.width * 0.4, canvas.height * 0.3, 0,
        canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.8
      );
      const pulse = Math.sin(time * 0.4) * 0.015;
      spaceGrad.addColorStop(0, `rgba(60,20,80,${0.15 + pulse})`);
      spaceGrad.addColorStop(0.4, `rgba(20,10,40,${0.08})`);
      spaceGrad.addColorStop(1, `rgba(10,5,20,0)`);
      ctx.fillStyle = spaceGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (active) {
        // Gold nebula
        const nGrad = ctx.createRadialGradient(canvas.width*0.5, canvas.height*0.4, 0, canvas.width*0.5, canvas.height*0.4, canvas.width*0.5);
        nGrad.addColorStop(0, `rgba(180,140,80,${0.06 + pulse})`);
        nGrad.addColorStop(1, `rgba(180,140,80,0)`);
        ctx.fillStyle = nGrad; ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Purple nebula
        const n2Grad = ctx.createRadialGradient(canvas.width*0.6, canvas.height*0.6, 0, canvas.width*0.6, canvas.height*0.6, canvas.width*0.4);
        n2Grad.addColorStop(0, `rgba(120,60,160,${0.05 + pulse})`);
        n2Grad.addColorStop(1, `rgba(120,60,160,0)`);
        ctx.fillStyle = n2Grad; ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Constellation lines
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 200) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(180,150,220,${(1-dist/200)*0.07})`;
              ctx.lineWidth = 0.4; ctx.stroke();
            }
          }
        }
      }

      particles.forEach(p => {
        const twinkle = Math.sin(time * p.twinkleSpeed * 60 + p.twinklePhase);
        const o = (active ? p.opacity * 1.4 : p.opacity) + twinkle * 0.15;
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.y > canvas.height + 10) p.y = -10;

        // Different star colours — gold, blue, white, purple
        const colors = p.hue === 40 ? `rgba(220,190,130,${o})` : p.hue === 200 ? `rgba(150,190,240,${o})` : `rgba(200,160,240,${o})`;
        const glowR = p.r * 8;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        grad.addColorStop(0, colors);
        grad.addColorStop(1, `rgba(0,0,0,0)`);
        ctx.beginPath(); ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2); ctx.fillStyle = grad; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,230,255,${o})`; ctx.fill();
      });

      if (active && Math.random() < 0.015) spawnStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += s.vx; s.y += s.vy; s.life -= s.decay;
        if (s.life <= 0) { shootingStars.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * s.len * 0.15, s.y - s.vy * s.len * 0.15);
        const sGrad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * s.len * 0.15, s.y - s.vy * s.len * 0.15);
        sGrad.addColorStop(0, `rgba(220,200,255,${s.life * 0.8})`);
        sGrad.addColorStop(1, `rgba(220,200,255,0)`);
        ctx.strokeStyle = sGrad; ctx.lineWidth = 1.5; ctx.stroke();
        const hGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 8);
        hGrad.addColorStop(0, `rgba(255,240,255,${s.life * 0.6})`);
        hGrad.addColorStop(1, `rgba(255,240,255,0)`);
        ctx.beginPath(); ctx.arc(s.x, s.y, 8, 0, Math.PI * 2); ctx.fillStyle = hGrad; ctx.fill();
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
// PREMIUM SACRED LOADER
// ═══════════════════════════════════════════
function PremiumLoader({ sign }) {
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
    const cx = W/2, cy = H/2;
    let t = 0, animId;
    const energyParticles = [];

    function emitEnergy() {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.4 + Math.random() * 2;
      energyParticles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        life: 1, decay: 0.006 + Math.random() * 0.006,
        r: 1 + Math.random() * 2,
        hue: Math.random() > 0.5 ? 'gold' : 'purple',
      });
    }

    function draw() {
      t += 0.006;
      ctx.clearRect(0, 0, W, H);

      // Deep ambient glow — purple and gold
      const ambGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 220);
      ambGrad.addColorStop(0, `rgba(140,80,200,${0.1 + Math.sin(t*1.5)*0.04})`);
      ambGrad.addColorStop(0.5, `rgba(180,140,80,${0.05 + Math.sin(t)*0.02})`);
      ambGrad.addColorStop(1, `rgba(0,0,0,0)`);
      ctx.fillStyle = ambGrad; ctx.fillRect(0, 0, W, H);

      // Outermost ring — slow, dotted
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(t*0.2);
      for (let i = 0; i < 90; i++) {
        const a = (i/90)*Math.PI*2;
        const bright = 0.06 + Math.sin(t*2+i*0.4)*0.04;
        ctx.beginPath(); ctx.arc(Math.cos(a)*200, Math.sin(a)*200, 0.8, 0, Math.PI*2);
        ctx.fillStyle = `rgba(180,150,220,${bright})`; ctx.fill();
      }
      // 12 mark lines
      for (let i = 0; i < 12; i++) {
        const a = (i/12)*Math.PI*2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a)*188, Math.sin(a)*188);
        ctx.lineTo(Math.cos(a)*212, Math.sin(a)*212);
        ctx.strokeStyle = `rgba(180,150,220,${0.18+Math.sin(t+i)*0.1})`;
        ctx.lineWidth = 1.2; ctx.stroke();
        ctx.beginPath(); ctx.arc(Math.cos(a)*216, Math.sin(a)*216, 1.5, 0, Math.PI*2);
        ctx.fillStyle = `rgba(200,170,240,0.3)`; ctx.fill();
      }
      ctx.restore();

      // Second ring — hexagram, counter-rotate
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(-t*0.35);
      ctx.beginPath(); ctx.arc(0, 0, 155, 0, Math.PI*2);
      ctx.strokeStyle = `rgba(160,120,210,${0.08+Math.sin(t*2)*0.04})`; ctx.lineWidth=0.6; ctx.stroke();
      for (let tri = 0; tri < 2; tri++) {
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
          const a = (i/3)*Math.PI*2 + (tri*Math.PI/3) - Math.PI/2;
          if (i===0) ctx.moveTo(Math.cos(a)*155, Math.sin(a)*155);
          else ctx.lineTo(Math.cos(a)*155, Math.sin(a)*155);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(160,120,210,${0.1+Math.sin(t*2.5+tri)*0.06})`;
        ctx.lineWidth=0.8; ctx.stroke();
      }
      ctx.restore();

      // Flower of Life
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(t*0.12);
      const fR = 38;
      const fOp = 0.05 + Math.sin(t*1.8)*0.025;
      ctx.beginPath(); ctx.arc(0,0,fR,0,Math.PI*2);
      ctx.strokeStyle=`rgba(180,140,80,${fOp})`; ctx.lineWidth=0.5; ctx.stroke();
      for (let i=0;i<6;i++) {
        const a=(i/6)*Math.PI*2;
        ctx.beginPath(); ctx.arc(Math.cos(a)*fR, Math.sin(a)*fR, fR, 0, Math.PI*2);
        ctx.strokeStyle=`rgba(180,140,80,${fOp+Math.sin(t*3+i)*0.015})`; ctx.lineWidth=0.4; ctx.stroke();
      }
      ctx.restore();

      // Inner ring with triangle
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(t*0.7);
      ctx.beginPath(); ctx.arc(0,0,112,0,Math.PI*2);
      ctx.strokeStyle=`rgba(200,160,240,${0.1+Math.sin(t*2.5)*0.05})`; ctx.lineWidth=0.7; ctx.stroke();
      ctx.beginPath();
      for (let i=0;i<3;i++) {
        const a=(i/3)*Math.PI*2-Math.PI/2;
        if(i===0) ctx.moveTo(Math.cos(a)*112,Math.sin(a)*112);
        else ctx.lineTo(Math.cos(a)*112,Math.sin(a)*112);
      }
      ctx.closePath();
      ctx.strokeStyle=`rgba(200,160,240,${0.08+Math.sin(t*3)*0.05})`; ctx.lineWidth=0.8; ctx.stroke();
      ctx.restore();

      // 10 orbiting bodies — more than free version
      for (let i=0;i<10;i++) {
        const speed = 0.3 + i*0.1;
        const orbitR = 70 + i*14;
        const a = t*speed + (i/10)*Math.PI*2;
        const ox = cx + Math.cos(a)*orbitR;
        const oy = cy + Math.sin(a)*orbitR;
        const dotR = 1.5 + Math.sin(t*4+i*3)*0.7;
        const isGold = i % 3 === 0;
        const dotColor = isGold ? `rgba(220,185,100,` : `rgba(180,140,230,`;

        for (let tr=1;tr<=8;tr++) {
          const trA = a - tr*0.04;
          const tx = cx + Math.cos(trA)*orbitR;
          const ty = cy + Math.sin(trA)*orbitR;
          ctx.beginPath(); ctx.arc(tx, ty, dotR*(1-tr*0.1), 0, Math.PI*2);
          ctx.fillStyle = `${dotColor}${0.15-tr*0.015})`; ctx.fill();
        }
        const dGrad = ctx.createRadialGradient(ox,oy,0,ox,oy,dotR*9);
        dGrad.addColorStop(0, `${dotColor}${0.4+Math.sin(t*2+i)*0.15})`);
        dGrad.addColorStop(1, `${dotColor}0)`);
        ctx.beginPath(); ctx.arc(ox,oy,dotR*9,0,Math.PI*2); ctx.fillStyle=dGrad; ctx.fill();
        ctx.beginPath(); ctx.arc(ox,oy,dotR,0,Math.PI*2);
        ctx.fillStyle=`${dotColor}${0.7+Math.sin(t*3+i)*0.2})`; ctx.fill();
        ctx.beginPath(); ctx.arc(ox,oy,dotR*0.3,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,250,255,0.7)`; ctx.fill();
      }

      // Radar sweep — purple
      ctx.save(); ctx.translate(cx,cy); ctx.rotate(t*0.55);
      ctx.beginPath(); ctx.moveTo(0,0); ctx.arc(0,0,170,0,0.5); ctx.closePath();
      const sweepGrad = ctx.createConicGradient(0,0,0);
      sweepGrad.addColorStop(0,`rgba(160,100,220,${0.1+Math.sin(t)*0.03})`);
      sweepGrad.addColorStop(0.08,`rgba(160,100,220,0)`);
      sweepGrad.addColorStop(1,`rgba(160,100,220,0)`);
      ctx.fillStyle=sweepGrad; ctx.fill(); ctx.restore();

      // Second radar sweep — gold, opposite direction
      ctx.save(); ctx.translate(cx,cy); ctx.rotate(-t*0.4);
      ctx.beginPath(); ctx.moveTo(0,0); ctx.arc(0,0,130,0,0.4); ctx.closePath();
      const sweep2Grad = ctx.createConicGradient(0,0,0);
      sweep2Grad.addColorStop(0,`rgba(200,160,80,${0.08+Math.sin(t*1.5)*0.02})`);
      sweep2Grad.addColorStop(0.07,`rgba(200,160,80,0)`);
      sweep2Grad.addColorStop(1,`rgba(200,160,80,0)`);
      ctx.fillStyle=sweep2Grad; ctx.fill(); ctx.restore();

      // Pulse waves
      for (let i=0;i<4;i++) {
        const wP = (t*0.35 + i/4) % 1;
        const wR = wP * 220;
        const wO = (1-wP) * 0.07;
        ctx.beginPath(); ctx.arc(cx,cy,wR,0,Math.PI*2);
        ctx.strokeStyle=`rgba(180,140,230,${wO})`; ctx.lineWidth=1; ctx.stroke();
      }

      // Core glow — purple-gold
      const coreR = 28 + Math.sin(t*2.5)*5;
      const coreGrad = ctx.createRadialGradient(cx,cy,0,cx,cy,coreR*4);
      coreGrad.addColorStop(0,`rgba(200,160,240,${0.2+Math.sin(t*2)*0.07})`);
      coreGrad.addColorStop(0.4,`rgba(180,140,80,${0.08})`);
      coreGrad.addColorStop(1,`rgba(0,0,0,0)`);
      ctx.beginPath(); ctx.arc(cx,cy,coreR*4,0,Math.PI*2); ctx.fillStyle=coreGrad; ctx.fill();
      ctx.beginPath(); ctx.arc(cx,cy,coreR,0,Math.PI*2);
      ctx.strokeStyle=`rgba(200,160,240,${0.3+Math.sin(t*2.5)*0.12})`; ctx.lineWidth=1.5; ctx.stroke();

      // Energy particles
      if (Math.random()<0.2) emitEnergy();
      for (let i=energyParticles.length-1;i>=0;i--) {
        const ep=energyParticles[i];
        ep.x+=ep.vx; ep.y+=ep.vy; ep.life-=ep.decay;
        if(ep.life<=0){energyParticles.splice(i,1);continue;}
        const epColor = ep.hue==='gold' ? `rgba(220,185,100,` : `rgba(180,130,240,`;
        const epGrad=ctx.createRadialGradient(ep.x,ep.y,0,ep.x,ep.y,ep.r*5);
        epGrad.addColorStop(0,`${epColor}${ep.life*0.5})`);
        epGrad.addColorStop(1,`${epColor}0)`);
        ctx.beginPath(); ctx.arc(ep.x,ep.y,ep.r*5,0,Math.PI*2); ctx.fillStyle=epGrad; ctx.fill();
        ctx.beginPath(); ctx.arc(ep.x,ep.y,ep.r*0.6,0,Math.PI*2);
        ctx.fillStyle=`${epColor}${ep.life*0.7})`; ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div style={{ textAlign:"center", padding:"10px 0 40px" }}>
      <div style={{ position:"relative", width:240, height:240, margin:"0 auto 28px" }}>
        <canvas ref={canvasRef} style={{ width:240, height:240, position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)" }} />
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", zIndex:2 }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:"2.2rem", color:"#c8a0e8", animation:"glowPulsePremium 3s ease-in-out infinite", textShadow:"0 0 20px rgba(180,120,240,0.5)" }}>{sign?.symbol||"✦"}</div>
            <div style={{ fontSize:"0.55rem", color:"rgba(180,140,220,0.5)", letterSpacing:"0.2em", textTransform:"uppercase", marginTop:4 }}>Premium</div>
          </div>
        </div>
      </div>
      <p key={msgIndex} style={{ fontFamily:"'Libre Baskerville',Georgia,serif", fontStyle:"italic", color:"rgba(200,170,240,0.8)", fontSize:"1rem", animation:"textFade 2.6s ease-in-out", minHeight:"1.4em" }}>{LOADING_MESSAGES[msgIndex]}</p>
      <div style={{ marginTop:14, display:"flex", justifyContent:"center", gap:8 }}>
        {[0,1,2,3,4].map(i=>(
          <div key={i} style={{ width:3, height:3, borderRadius:"50%", background:"rgba(180,140,220,0.4)", animation:`dotPulse 1.5s ease-in-out ${i*0.15}s infinite` }} />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// TYPEWRITER
// ═══════════════════════════════════════════
function TypewriterText({ text, speed = 16 }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed(""); setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0,i+1)); i++; }
      else { setDone(true); clearInterval(interval); }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return (
    <p style={{ fontFamily:"'Libre Baskerville','Georgia',serif", fontSize:"1.08rem", lineHeight:2.1, color:"#e8e0f0", whiteSpace:"pre-wrap", letterSpacing:"0.01em" }}>
      {displayed}
      {!done && <span style={{ animation:"blink 1s infinite", color:"#c8a0e8" }}>▍</span>}
    </p>
  );
}

// ═══════════════════════════════════════════
// THEME — deep cosmic dark
// ═══════════════════════════════════════════
const T = {
  bg: "#0d0a14",
  bg2: "#120d1e",
  text: "#e8e0f0",
  textMid: "#b8a8d0",
  textLight: "#7a6a90",
  accent: "#c8a0e8",
  accentGold: "#d4a840",
  accentSoft: "rgba(180,120,240,0.1)",
  accentBorder: "rgba(180,120,240,0.2)",
  accentHover: "rgba(180,120,240,0.18)",
  card: "rgba(25,15,40,0.7)",
  cardHover: "rgba(35,20,55,0.85)",
  glow: "rgba(160,100,220,0.2)",
  glowGold: "rgba(200,160,80,0.2)",
};

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
  @keyframes blink { 0%,50%{opacity:1} 51%,100%{opacity:0} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes glowPulsePremium {
    0%,100% { opacity:0.7; filter:drop-shadow(0 0 10px rgba(180,120,240,0.4)); transform:scale(1); }
    50% { opacity:1; filter:drop-shadow(0 0 28px rgba(200,140,255,0.7)); transform:scale(1.15); }
  }
  @keyframes goldGlow {
    0%,100% { opacity:0.7; filter:drop-shadow(0 0 8px rgba(200,160,80,0.3)); }
    50% { opacity:1; filter:drop-shadow(0 0 20px rgba(220,180,100,0.6)); }
  }
  @keyframes orbFloat {
    0%,100% { transform:translateY(0) scale(1); box-shadow: 0 0 60px rgba(160,100,220,0.2), 0 0 120px rgba(160,100,220,0.08); }
    50% { transform:translateY(-12px) scale(1.05); box-shadow: 0 0 80px rgba(180,120,240,0.4), 0 0 160px rgba(180,120,240,0.15); }
  }
  @keyframes textFade {
    0%,10%{opacity:0;transform:translateY(8px)} 20%,78%{opacity:1;transform:translateY(0)} 88%,100%{opacity:0;transform:translateY(-8px)}
  }
  @keyframes ringRotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes ringRotateReverse { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
  @keyframes cardEnter { from{opacity:0;transform:translateY(18px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes dotPulse { 0%,100%{opacity:0.2;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.8)} }
  @keyframes premiumBadge {
    0%,100%{box-shadow:0 0 8px rgba(200,160,80,0.3)} 50%{box-shadow:0 0 20px rgba(220,180,100,0.6)}
  }
  @keyframes shimmerGold {
    0%{background-position:-200% center} 100%{background-position:200% center}
  }
  * { margin:0; padding:0; box-sizing:border-box; }
  input::placeholder { color: #5a4a70; }
  input:focus { border-color: #c8a0e8 !important; outline:none; }
  body { background: #0d0a14; }
`;

// ═══════════════════════════════════════════
// LOCK SCREEN
// ═══════════════════════════════════════════
const PREMIUM_KEY = "starseed2026";

function LockScreen() {
  const [attempt, setAttempt] = useState("");
  const [wrong, setWrong] = useState(false);
  const check = () => {
    if (attempt.toLowerCase().trim() === PREMIUM_KEY) {
      window.location.href = `/premium?key=${PREMIUM_KEY}`;
    } else {
      setWrong(true);
      setTimeout(() => setWrong(false), 2000);
    }
  };
  return (
    <div style={{ minHeight:"100vh", background:"#0d0a14", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <style>{GLOBAL_CSS}</style>
      <div style={{ textAlign:"center", padding:"40px 24px", maxWidth:380, width:"100%" }}>
        <div style={{ fontSize:"2.5rem", marginBottom:20, color:"#c8a0e8", animation:"glowPulsePremium 3s infinite" }}>✦</div>
        <h2 style={{ fontFamily:"'Libre Baskerville',Georgia,serif", fontWeight:400, fontSize:"1.6rem", color:"#e8e0f0", marginBottom:10 }}>Members Only</h2>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.85rem", color:"#7a6a90", marginBottom:32, lineHeight:1.7 }}>Enter your Soul Signal access key to continue.</p>
        <input
          type="text" placeholder="Enter your access key..."
          value={attempt} onChange={e=>setAttempt(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&check()}
          style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${wrong?"#e05050":"rgba(180,120,240,0.25)"}`, borderRadius:4, padding:"14px 18px", color:"#e8e0f0", fontFamily:"'Libre Baskerville',Georgia,serif", fontSize:"1rem", width:"100%", outline:"none", marginBottom:12, textAlign:"center", letterSpacing:"0.1em", transition:"border-color 0.3s" }}
        />
        {wrong && <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.75rem", color:"#e05050", marginBottom:12 }}>That key isn't right. Check your confirmation email.</p>}
        <button onClick={check}
          onMouseEnter={e=>{e.target.style.background="rgba(180,120,240,0.2)";}}
          onMouseLeave={e=>{e.target.style.background="rgba(180,120,240,0.1)";}}
          style={{ background:"rgba(180,120,240,0.1)", border:"1px solid rgba(180,120,240,0.25)", color:"#e8e0f0", padding:"14px 40px", borderRadius:3, cursor:"pointer", fontFamily:"'Libre Baskerville',Georgia,serif", fontSize:"0.88rem", letterSpacing:"0.1em", textTransform:"uppercase", transition:"all 0.3s ease", width:"100%" }}
        >Enter</button>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.68rem", color:"#5a4a70", marginTop:24 }}>
          Not a member? <a href="/" style={{ color:"#c8a0e8", textDecoration:"none" }}>Try a free reading</a>
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════
export default function SoulSignalPremium() {
  const [screen, setScreen] = useState("landing");
  const [userName, setUserName] = useState("");
  const [userBirthDate, setUserBirthDate] = useState("");
  const [currentMood, setCurrentMood] = useState("");
  const [selectedSign, setSelectedSign] = useState(null);
  const [selectedReading, setSelectedReading] = useState(null);
  const [reading, setReading] = useState("");
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("key") === PREMIUM_KEY) setUnlocked(true);
  }, []);

  useEffect(() => { setTimeout(() => setFadeIn(true), 100); }, []);
  useEffect(() => { setFadeIn(false); setTimeout(() => setFadeIn(true), 50); }, [screen]);

  if (!unlocked) return <LockScreen />;

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
    } catch(e) { setReading("The signal couldn't come through just now. Try again."); }
    setLoading(false);
  }

  const inputBase = { background:"rgba(255,255,255,0.04)", border:`1px solid ${T.accentBorder}`, borderRadius:4, padding:"14px 18px", color:T.text, fontFamily:"'Libre Baskerville',Georgia,serif", fontSize:"1rem", width:"100%", outline:"none", transition:"border-color 0.3s" };
  const labelStyle = { fontFamily:"'DM Sans',sans-serif", fontSize:"0.68rem", color:T.textLight, letterSpacing:"0.15em", textTransform:"uppercase", display:"block", marginBottom:8, fontWeight:400 };

  const hoverCard = (e,on) => {
    e.currentTarget.style.background = on ? T.cardHover : T.card;
    e.currentTarget.style.borderColor = on ? T.accent : T.accentBorder;
    e.currentTarget.style.transform = on ? "translateX(5px)" : "translateX(0)";
    e.currentTarget.style.boxShadow = on ? `0 6px 30px ${T.glow}` : "none";
  };

  // ━━━ LANDING ━━━
  if (screen==="landing") return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(180deg, #0f0b18 0%, ${T.bg} 50%, #0a0710 100%)`, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", position:"relative", overflow:"hidden" }}>
      <CosmicBackground />
      <style>{GLOBAL_CSS}</style>
      <div style={{ position:"relative", zIndex:1, textAlign:"center", padding:"40px 24px", opacity:fadeIn?1:0, transition:"opacity 2s ease" }}>
        {/* Premium badge */}
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px", border:`1px solid rgba(200,160,80,0.4)`, borderRadius:20, marginBottom:28, animation:"premiumBadge 3s ease-in-out infinite", background:"rgba(200,160,80,0.08)" }}>
          <span style={{ color:T.accentGold, fontSize:"0.6rem" }}>✦</span>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.62rem", color:T.accentGold, letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:400 }}>Premium Member</span>
          <span style={{ color:T.accentGold, fontSize:"0.6rem" }}>✦</span>
        </div>

        {/* Orb */}
        <div style={{ width:140, height:140, borderRadius:"50%", margin:"0 auto 16px", background:"radial-gradient(circle at 40% 35%, rgba(180,120,240,0.3) 0%, rgba(140,80,200,0.1) 40%, rgba(100,50,160,0.02) 70%, transparent 100%)", border:"1px solid rgba(180,120,240,0.15)", animation:"orbFloat 6s ease-in-out infinite", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
          <div style={{ position:"absolute", width:80, height:80, borderRadius:"50%", border:"0.5px solid rgba(180,120,240,0.12)", animation:"ringRotate 18s linear infinite" }} />
          <div style={{ position:"absolute", width:108, height:108, borderRadius:"50%", border:"0.5px solid rgba(200,160,80,0.08)", animation:"ringRotateReverse 28s linear infinite" }} />
          <div style={{ position:"absolute", width:60, height:60, borderRadius:"50%", border:"0.3px solid rgba(180,120,240,0.1)", animation:"ringRotate 12s linear infinite" }} />
          <span style={{ fontSize:"1.6rem", color:T.accent, animation:"glowPulsePremium 4s infinite" }}>✦</span>
        </div>

        <div style={{ fontSize:"0.52rem", color:"rgba(180,150,220,0.3)", letterSpacing:"0.35em", marginBottom:38 }}>♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓</div>

        <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.65rem", color:T.textLight, letterSpacing:"0.35em", textTransform:"uppercase", marginBottom:14 }}>AI-Powered Oracle</p>
        <h1 style={{ fontFamily:"'Libre Baskerville',Georgia,serif", fontWeight:400, fontSize:"clamp(2.6rem,8vw,4.2rem)", color:T.text, letterSpacing:"0.03em", marginBottom:8 }}>Soul Signal</h1>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.7rem", color:T.accentGold, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:20, animation:"goldGlow 3s infinite" }}>Premium Edition</p>
        <p style={{ fontFamily:"'Libre Baskerville',Georgia,serif", fontStyle:"italic", fontSize:"1.05rem", color:T.textMid, margin:"0 auto 48px", maxWidth:380, lineHeight:1.8 }}>
          Unlimited signals. Deeper readings.<br/>Exclusive channels unavailable to others.
        </p>
        <button
          onClick={()=>setScreen("onboard")}
          onMouseEnter={e=>{e.target.style.background="rgba(180,120,240,0.2)";e.target.style.boxShadow=`0 0 40px ${T.glow}`;e.target.style.borderColor=T.accent;}}
          onMouseLeave={e=>{e.target.style.background=T.accentSoft;e.target.style.boxShadow="none";e.target.style.borderColor=T.accentBorder;}}
          style={{ background:T.accentSoft, border:`1px solid ${T.accentBorder}`, color:T.text, padding:"18px 52px", borderRadius:3, cursor:"pointer", fontFamily:"'Libre Baskerville',Georgia,serif", fontSize:"0.92rem", letterSpacing:"0.1em", textTransform:"uppercase", transition:"all 0.3s ease" }}
        >Enter the Signal</button>
      </div>
    </div>
  );

  // ━━━ ONBOARDING ━━━
  if (screen==="onboard") {
    const det = getZodiacFromDate(userBirthDate);
    return (
      <div style={{ minHeight:"100vh", background:T.bg, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
        <CosmicBackground />
        <style>{GLOBAL_CSS}</style>
        <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:420, padding:"40px 24px", opacity:fadeIn?1:0, transition:"opacity 1s ease" }}>
          <p style={{...labelStyle, letterSpacing:"0.25em", marginBottom:10, fontSize:"0.6rem"}}>Premium Calibration</p>
          <h2 style={{ fontFamily:"'Libre Baskerville',Georgia,serif", fontWeight:400, fontSize:"1.7rem", color:T.text, marginBottom:36 }}>Open your channel</h2>
          <div style={{marginBottom:22}}><label style={labelStyle}>Your name</label><input type="text" placeholder="First name" value={userName} onChange={e=>setUserName(e.target.value)} style={inputBase} /></div>
          <div style={{marginBottom:22}}>
            <label style={labelStyle}>Date of birth</label>
            <input type="date" value={userBirthDate} onChange={e=>{setUserBirthDate(e.target.value);const s=getZodiacFromDate(e.target.value);if(s)setSelectedSign(s);}} style={inputBase} />
            {det && <div style={{ marginTop:14, padding:"18px 20px", background:"rgba(180,120,240,0.08)", border:`1px solid ${T.accentBorder}`, borderRadius:4, display:"flex", alignItems:"center", gap:16, animation:"fadeUp 0.5s ease both", boxShadow:`0 4px 24px ${T.glow}` }}>
              <span style={{ fontSize:"2rem", color:T.accent, animation:"glowPulsePremium 3s infinite" }}>{det.symbol}</span>
              <div><p style={{ fontFamily:"'Libre Baskerville',Georgia,serif", color:T.text, fontSize:"1.08rem" }}>{det.name}</p><p style={{ fontFamily:"'DM Sans',sans-serif", color:T.textLight, fontSize:"0.75rem", fontWeight:300 }}>{det.element} sign · {det.dates}</p></div>
            </div>}
          </div>
          <div style={{marginBottom:32}}><label style={labelStyle}>Current state of mind <span style={{opacity:0.4}}>(optional)</span></label><input type="text" placeholder="Lost, hopeful, restless, ready..." value={currentMood} onChange={e=>setCurrentMood(e.target.value)} style={inputBase} /></div>
          <button
            onClick={()=>setScreen("oracle")} disabled={!userBirthDate}
            onMouseEnter={e=>{if(userBirthDate){e.target.style.background="rgba(180,120,240,0.2)";e.target.style.boxShadow=`0 0 30px ${T.glow}`;}}}
            onMouseLeave={e=>{e.target.style.background=T.accentSoft;e.target.style.boxShadow="none";}}
            style={{ background:T.accentSoft, border:`1px solid ${T.accentBorder}`, color:T.text, padding:"16px", width:"100%", borderRadius:3, cursor:userBirthDate?"pointer":"not-allowed", fontFamily:"'Libre Baskerville',Georgia,serif", fontSize:"0.88rem", letterSpacing:"0.1em", textTransform:"uppercase", transition:"all 0.3s ease", opacity:userBirthDate?1:0.3 }}
          >Open the Signal →</button>
        </div>
      </div>
    );
  }

  // ━━━ ORACLE ━━━
  if (screen==="oracle") {
    const sign = selectedSign||getZodiacFromDate(userBirthDate)||ZODIAC_SIGNS[0];
    return (
      <div style={{ minHeight:"100vh", background:T.bg, position:"relative", overflow:"hidden" }}>
        <CosmicBackground />
        <style>{GLOBAL_CSS}</style>
        <div style={{ position:"relative", zIndex:1, maxWidth:520, margin:"0 auto", padding:"60px 24px", opacity:fadeIn?1:0, transition:"opacity 1s ease" }}>
          <div style={{ textAlign:"center", marginBottom:44 }}>
            {/* Premium badge */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"4px 12px", border:`1px solid rgba(200,160,80,0.35)`, borderRadius:20, marginBottom:16, background:"rgba(200,160,80,0.07)" }}>
              <span style={{ color:T.accentGold, fontSize:"0.55rem" }}>✦</span>
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.58rem", color:T.accentGold, letterSpacing:"0.18em", textTransform:"uppercase" }}>Unlimited Access</span>
            </div>
            <span style={{ fontSize:"2.6rem", display:"block", marginBottom:10, color:T.accent, animation:"glowPulsePremium 4s infinite" }}>{sign.symbol}</span>
            <h2 style={{ fontFamily:"'Libre Baskerville',Georgia,serif", fontWeight:400, fontSize:"1.5rem", color:T.text }}>{userName?`${userName}, choose your signal`:"Choose your signal"}</h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.78rem", color:T.textLight, marginTop:8 }}>{sign.name} · {sign.element} · Premium</p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {READING_TYPES.map((type,i) => (
              <button key={type.id} onClick={()=>generateReading(type)} onMouseEnter={e=>hoverCard(e,true)} onMouseLeave={e=>hoverCard(e,false)}
                style={{ background:T.card, border:`1px solid ${type.premium ? "rgba(200,160,80,0.3)" : T.accentBorder}`, borderRadius:4, padding:"20px 22px", display:"flex", alignItems:"center", gap:18, cursor:"pointer", textAlign:"left", transition:"all 0.35s ease", animation:`cardEnter 0.5s ease ${i*0.07}s both`, backdropFilter:"blur(10px)" }}>
                <span style={{ fontSize:"1.3rem", width:40, textAlign:"center", color:type.premium?T.accentGold:T.accent, filter:`drop-shadow(0 0 6px ${type.premium?"rgba(200,160,80,0.4)":"rgba(180,120,240,0.4)"})` }}>{type.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                    <p style={{ fontFamily:"'Libre Baskerville',Georgia,serif", color:T.text, fontSize:"0.92rem", letterSpacing:"0.06em", textTransform:"uppercase" }}>{type.label}</p>
                    {type.premium && <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.5rem", color:T.accentGold, letterSpacing:"0.15em", textTransform:"uppercase", border:`1px solid rgba(200,160,80,0.4)`, padding:"2px 6px", borderRadius:10 }}>Exclusive</span>}
                  </div>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontStyle:"italic", fontWeight:300, color:T.textLight, fontSize:"0.77rem" }}>{type.description}</p>
                </div>
              </button>
            ))}
          </div>
          <div style={{ marginTop:44, textAlign:"center", fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.63rem", color:T.textLight, opacity:0.4 }}>Unlimited readings · No restrictions</div>
        </div>
      </div>
    );
  }

  // ━━━ READING ━━━
  if (screen==="reading") {
    const sign = selectedSign||getZodiacFromDate(userBirthDate)||ZODIAC_SIGNS[0];
    return (
      <div style={{ minHeight:"100vh", background:T.bg, position:"relative", overflow:"hidden" }}>
        <CosmicBackground intensity={loading?"active":"normal"} />
        <style>{GLOBAL_CSS}</style>
        <div style={{ position:"relative", zIndex:1, maxWidth:600, margin:"0 auto", padding:"50px 24px", opacity:fadeIn?1:0, transition:"opacity 1s ease" }}>
          <button onClick={()=>setScreen("oracle")} style={{ background:"none", border:"none", color:T.textLight, fontFamily:"'DM Sans',sans-serif", fontSize:"0.78rem", fontWeight:300, cursor:"pointer", marginBottom:36 }}>← Choose another</button>
          <div style={{ marginBottom:30, animation:"fadeUp 0.6s ease both" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.63rem", color:T.textLight, letterSpacing:"0.22em", textTransform:"uppercase" }}>{selectedReading?.label} · {sign?.name||""}</p>
              {selectedReading?.premium && <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.5rem", color:T.accentGold, letterSpacing:"0.12em", textTransform:"uppercase", border:`1px solid rgba(200,160,80,0.4)`, padding:"2px 6px", borderRadius:10 }}>Exclusive</span>}
            </div>
            <div style={{ width:36, height:1, background:T.accentBorder, marginBottom:8 }} />
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontStyle:"italic", fontSize:"0.73rem", color:T.textLight }}>{new Date().toLocaleDateString("en-GB",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
          </div>

          {loading && <PremiumLoader sign={sign} />}

          {!loading && reading && (
            <div style={{ animation:"fadeUp 0.8s ease both" }}>
              <TypewriterText text={reading} speed={16} />
              <div style={{ marginTop:44, paddingTop:28, borderTop:`1px solid ${T.accentBorder}`, display:"flex", gap:10, flexWrap:"wrap" }}>
                {[{label:"Copy reading",action:()=>navigator.clipboard?.writeText(reading)},{label:"↻ New signal",action:()=>generateReading(selectedReading)}].map(b=>(
                  <button key={b.label} onClick={b.action}
                    onMouseEnter={e=>{e.target.style.borderColor=T.accent;e.target.style.boxShadow=`0 2px 16px ${T.glow}`;e.target.style.color=T.text;}}
                    onMouseLeave={e=>{e.target.style.borderColor=T.accentBorder;e.target.style.boxShadow="none";e.target.style.color=T.textMid;}}
                    style={{ background:"none", border:`1px solid ${T.accentBorder}`, color:T.textMid, padding:"10px 20px", borderRadius:3, fontFamily:"'DM Sans',sans-serif", fontSize:"0.73rem", fontWeight:300, cursor:"pointer", transition:"all 0.3s ease" }}>{b.label}</button>
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
