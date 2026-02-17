import './style.css'

const app = document.querySelector('#app')

// Content Data
const profile = {
  name: "Valentino Phiri",
  titles: ["Software Developer", "Game Programmer", "Founder of Veigatec", "Low-Level Enthusiast"],
  bio: `I bridge the gap between High-Level Web Applications and Low-Level System Design. 
        Founder of Veigatec and currently studying at NACIT. Whether it's optimizing memory 
        management in C++ or deploying scalable APIs with Python, I write code that performs.`,
  quote: "I command code, not armies."
}

const skills = {
  languages: ["Python", "JavaScript", "Java", "C#", "C++", "C", "Rust", "Go", "PHP", "TypeScript", "SQL"],
  web: ["NextJS", "FastAPI", "React", "Laravel", "Tailwind", "Node.js"],
  games: ["Godot Engine", "Unity", "GameMaker", "Pygame", "OpenGL"]
}

const projects = [
  {
    title: "Project Alpha",
    description: "A high-performance system utility developed in C++.",
    tags: ["C++", "Systems"],
    link: "#"
  },
  {
    title: "Veigatec Dashboard",
    description: "Cloud-based management system for enterprise clients.",
    tags: ["NextJS", "FastAPI", "Cloud"],
    link: "https://veigatec.rf.gd"
  },
  {
    title: "Stellar Drift",
    description: "A 2D space exploration game built with Godot.",
    tags: ["Godot", "GDScript", "Games"],
    link: "#"
  }
]

app.innerHTML = `
  <nav class="glass" style="position: fixed; top: 1rem; left: 50%; transform: translateX(-50%); width: calc(100% - 2rem); max-width: 1100px; z-index: 1000; padding: 0.75rem 2rem; display: flex; justify-content: space-between; align-items: center;">
    <div style="font-weight: 800; font-family: 'Outfit'; font-size: 1.25rem;">VP<span style="color: var(--primary);">.</span></div>
    <div style="display: flex; gap: 2rem; font-weight: 500; font-size: 0.9rem;">
      <a href="#home">Home</a>
      <a href="#projects">Projects</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </div>
  </nav>

  <section id="home" style="min-height: 100vh; display: flex; align-items: center; position: relative; overflow: hidden;">
    <canvas id="hero-canvas" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; opacity: 0.4;"></canvas>
    <div class="container" style="text-align: center;">
      <div style="margin-bottom: 2rem; border-radius: 50%; width: 140px; height: 140px; margin-inline: auto; padding: 4px; background: linear-gradient(45deg, var(--primary), transparent); overflow: hidden;">
        <img src="/imgs/valentino-phiri-programmer.jpg" alt="${profile.name}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" onerror="this.src='https://ui-avatars.com/api/?name=Valentino+Phiri&background=10b981&color=fff&size=200'">
      </div>
      <h1 style="font-size: 4rem; margin-bottom: 1rem;">${profile.name}</h1>
      <p style="font-size: 1.5rem; color: var(--text-dim); min-height: 1.5em; font-family: 'Inter';">
        <span id="type-target"></span><span class="cursor" style="color: var(--primary); animation: blink 1s infinite;">|</span>
      </p>
      <div style="margin-top: 3rem; display: flex; gap: 1rem; justify-content: center;">
        <a href="#projects" class="btn btn-primary">View Projects <i data-lucide="arrow-right"></i></a>
        <a href="https://github.com/Valent-p" class="btn btn-outline"><i data-lucide="github"></i> GitHub</a>
      </div>
    </div>
  </section>

  <section id="projects" class="container">
    <h2 class="section-title">Featured <span>Projects</span></h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
      ${projects.map(p => `
        <div class="glass" style="padding: 2rem; display: flex; flex-direction: column; gap: 1rem; transition: var(--transition-fast);" onmouseover="this.style.transform='translateY(-10px)'; this.style.borderColor='var(--primary)'" onmouseout="this.style.transform='none'; this.style.borderColor='var(--border)'">
          <h3 style="font-size: 1.5rem;">${p.title}</h3>
          <p style="color: var(--text-dim); flex-grow: 1;">${p.description}</p>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            ${p.tags.map(t => `<span style="font-size: 0.75rem; padding: 0.25rem 0.75rem; background: rgba(16, 185, 129, 0.1); color: var(--primary); border-radius: 99px; border: 1px solid rgba(16, 185, 129, 0.2);">${t}</span>`).join('')}
          </div>
          <a href="${p.link}" style="margin-top: 1rem; font-weight: 600; display: flex; align-items: center; gap: 0.25rem; color: var(--primary);">View Details <i data-lucide="external-link" style="width: 14px;"></i></a>
        </div>
      `).join('')}
    </div>
  </section>

  <section id="about" style="background: rgba(15, 23, 42, 0.3);">
    <div class="container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
      <div>
        <h2 style="font-size: 2.5rem; margin-bottom: 2rem;">About <span>Me</span></h2>
        <p style="font-size: 1.1rem; color: var(--text-dim); margin-bottom: 1.5rem;">${profile.bio}</p>
        <p style="font-style: italic; color: var(--primary); font-family: 'Outfit';">"${profile.quote}"</p>
      </div>
      <div class="glass" style="padding: 2.5rem;">
        <h3 style="margin-bottom: 1.5rem;">Technical Arsenal</h3>
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div>
            <div style="font-size: 0.8rem; color: var(--text-dim); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.1em;">Core Languages</div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              ${skills.languages.map(s => `<span style="padding: 0.25rem 0.5rem; background: var(--bg-surface-light); border-radius: 4px; font-size: 0.85rem;">${s}</span>`).join('')}
            </div>
          </div>
          <div>
            <div style="font-size: 0.8rem; color: var(--text-dim); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.1em;">Web Ecosystem</div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              ${skills.web.map(s => `<span style="padding: 0.25rem 0.5rem; background: var(--bg-surface-light); border-radius: 4px; font-size: 0.85rem;">${s}</span>`).join('')}
            </div>
          </div>
          <div>
            <div style="font-size: 0.8rem; color: var(--text-dim); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.1em;">Game Engines</div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              ${skills.games.map(s => `<span style="padding: 0.25rem 0.5rem; background: var(--bg-surface-light); border-radius: 4px; font-size: 0.85rem;">${s}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer style="padding: 4rem 0; border-top: 1px solid var(--border); text-align: center;">
    <div class="container">
      <div style="margin-bottom: 2rem; font-weight: 800; font-family: 'Outfit'; font-size: 1.5rem;">VP<span style="color: var(--primary);">.</span></div>
      <div style="display: flex; justify-content: center; gap: 2rem; margin-bottom: 2rem;">
        <a href="https://github.com/Valent-p"><i data-lucide="github"></i></a>
        <a href="https://www.linkedin.com/in/valentino-phiri-74263237b/"><i data-lucide="linkedin"></i></a>
        <a href="mailto:contact@veigatec.rf.gd"><i data-lucide="mail"></i></a>
      </div>
      <p style="color: var(--text-dim); font-size: 0.9rem;">&copy; 2026 Valentino Phiri. Built with passion in Malawi 🇲🇼</p>
    </div>
  </footer>

  <style>
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    @media (max-width: 768px) {
      #about .container { grid-template-columns: 1fr !important; gap: 2rem !important; }
      h1 { font-size: 2.5rem !important; }
      nav div:last-child { display: none !important; }
    }
  </style>
`

// Initialize Lucide
lucide.createIcons()

// Typewriter Effect
let textIndex = 0
let charIndex = 0
let isDeleting = false
const typeTarget = document.querySelector('#type-target')

function type() {
  const current = profile.titles[textIndex]
  if (isDeleting) {
    typeTarget.textContent = current.substring(0, charIndex - 1)
    charIndex--
  } else {
    typeTarget.textContent = current.substring(0, charIndex + 1)
    charIndex++
  }

  let typeSpeed = 100
  if (isDeleting) typeSpeed /= 2

  if (!isDeleting && charIndex === current.length) {
    typeSpeed = 2000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    textIndex = (textIndex + 1) % profile.titles.length
    typeSpeed = 500
  }

  setTimeout(type, typeSpeed)
}

type()

// Canvas Animation (Refined)
const canvas = document.getElementById("hero-canvas")
const ctx = canvas.getContext("2d")
let particles = []

function initCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  particles = []
  const count = (canvas.width * canvas.height) / 15000
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1
    })
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = "#10b981"
  ctx.strokeStyle = "rgba(16, 185, 129, 0.15)"

  particles.forEach((p, i) => {
    p.x += p.vx
    p.y += p.vy

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fill()

    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j]
      const dx = p.x - p2.x
      const dy = p.y - p2.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 150) {
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }
    }
  })
  requestAnimationFrame(animate)
}

window.addEventListener('resize', initCanvas)
initCanvas()
animate()
