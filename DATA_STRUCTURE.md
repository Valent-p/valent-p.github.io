# Portfolio Data Structure

## File Locations

```
src/data/
├── resume.json              # CV/Resume download link
├── experience.json          # Timeline: Work & Education
├── blog.json               # Blog posts with filtering
├── openSource.json         # Open source projects
├── testimonials.json       # Client/colleague quotes
├── achievements.json       # Badges & milestones
└── projectStats.json       # Project metrics & stats
```

## How Each Data File Connects

```
┌─────────────────────────────────────────────────────────┐
│                    Your Portfolio                        │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Hero Section                                             │
│  ├─ Resume Button ← resume.json                          │
│  └─ CTA Buttons                                           │
│                                                           │
│  Projects Section                                         │
│  ├─ Project Cards ← projectStats.json                    │
│  ├─ Tech Filters ← Projects.tsx (reads tags)            │
│  └─ Featured Badges ← Projects.tsx                       │
│                                                           │
│  Experience Section                                       │
│  └─ Timeline Items ← experience.json                     │
│                                                           │
│  Blog Section                                             │
│  ├─ Category Filters ← blog.json                         │
│  ├─ Featured Posts ← blog.json                           │
│  └─ Article Cards ← blog.json                            │
│                                                           │
│  Achievements Section                                     │
│  └─ Badge Groups ← achievements.json                     │
│                                                           │
│  Testimonials Section                                     │
│  └─ Quote Cards ← testimonials.json                      │
│                                                           │
│  Open Source Section                                      │
│  └─ Project Cards ← openSource.json                      │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

## What Each File Contains

| File | Purpose | When to Edit |
|------|---------|--------------|
| `resume.json` | CV download link | When you update your resume |
| `experience.json` | Work history & education | After changing jobs or finishing courses |
| `blog.json` | Articles & posts | When you write new articles |
| `openSource.json` | GitHub projects | When you contribute to open source |
| `testimonials.json` | Client feedback | After getting new recommendations |
| `achievements.json` | Milestones & badges | After major accomplishments |
| `projectStats.json` | Project metrics | To show social proof & engagement |

## Sample Data Format Reference

### Experience Entry
```json
{
  "id": 1,
  "type": "experience",
  "role": "Developer",
  "company": "Company",
  "startDate": "2023",
  "endDate": "Present",
  "description": "What I do",
  "highlights": ["Achievement 1", "Achievement 2"]
}
```

### Blog Post Entry
```json
{
  "id": 1,
  "title": "Post Title",
  "excerpt": "Short description",
  "category": "Web Development",
  "tags": ["React", "JavaScript"],
  "date": "2026-04-15",
  "readTime": 8,
  "image": "/images/post.png",
  "url": "https://link.com",
  "featured": true
}
```

### Achievement Entry
```json
{
  "id": 1,
  "title": "Achievement",
  "description": "Details",
  "icon": "🚀",
  "date": "2026-02-15",
  "category": "milestone"
}
```

### Project Stats Entry
```json
{
  "Project Title": {
    "github_stars": 234,
    "live_users": 8900,
    "average_rating": 4.9,
    "uptime": 99.95
  }
}
```

## Quick Commands

**Build & deploy:**
```bash
npm run build
npm run deploy
```

**Start development server:**
```bash
npm run dev
```

**Validate JSON files:**
- Use VS Code's built-in JSON validation
- Or: https://jsonlint.com

---

**All data files are located in:** `src/data/`
