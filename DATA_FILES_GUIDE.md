# Portfolio Data Files Guide

This guide explains how to edit each data file to customize your portfolio.

## 1. Resume Data (`src/data/resume.json`)

Edit your resume/CV download link:

```json
{
  "fileName": "valentino-phiri-resume.pdf",
  "url": "https://drive.google.com/file/d/YOUR_RESUME_FILE_ID/view",
  "downloadUrl": "https://drive.google.com/uc?export=download&id=YOUR_RESUME_FILE_ID",
  "lastUpdated": "2026-05-04"
}
```

**How to setup:**
1. Upload your resume to Google Drive
2. Right-click → Share → Get link (Anyone with link can view)
3. Extract the file ID from the URL: `https://drive.google.com/file/d/YOUR_FILE_ID/view`
4. Replace `YOUR_RESUME_FILE_ID` with the actual ID
5. Update `lastUpdated` date

---

## 2. Experience Timeline (`src/data/experience.json`)

Add your work experience and education:

```json
[
  {
    "id": 1,
    "type": "experience",  // or "education"
    "role": "Your Role",
    "company": "Company Name",
    "startDate": "2023",
    "endDate": "Present",
    "description": "Brief description of your role",
    "highlights": [
      "Achievement 1",
      "Achievement 2",
      "Achievement 3"
    ]
  }
]
```

**Notes:**
- Use "Present" for current roles
- `type` should be either "experience" or "education"
- Add highlights as bullet points
- Entries appear in timeline order

---

## 3. Blog Posts (`src/data/blog.json`)

Add blog articles:

```json
[
  {
    "id": 1,
    "title": "Article Title",
    "excerpt": "Short description (1-2 sentences)",
    "content": "Full article content (optional for now)",
    "category": "Web Development",  // Create any category
    "tags": ["React", "NextJS", "Tailwind"],
    "date": "2026-04-15",
    "readTime": 8,  // Estimated minutes to read
    "image": "/images/article-image.png",  // or null
    "url": "https://link-to-full-article.com",
    "featured": true  // Shows in featured section
  }
]
```

**Tips:**
- Categories auto-filter in the UI
- `featured: true` shows articles first
- Can link to external blogs or LinkedIn posts
- Use ISO format for dates (YYYY-MM-DD)

---

## 4. Open Source Projects (`src/data/openSource.json`)

Add your open source contributions:

```json
[
  {
    "id": 1,
    "name": "Project Name",
    "description": "What the project does",
    "url": "https://github.com/username/repo",
    "stars": 45,  // GitHub stars count
    "forks": 12,  // GitHub forks count
    "language": "JavaScript",
    "topics": ["tag1", "tag2", "tag3"],
    "featured": true  // Shows first
  }
]
```

**Where to find stars/forks:**
- Go to your GitHub repo
- Stars count is on the right side
- Click "Forks" to see fork count

---

## 5. Testimonials (`src/data/testimonials.json`)

Add testimonials from clients or colleagues:

```json
[
  {
    "id": 1,
    "author": "Person Name",
    "role": "Job Title",
    "company": "Company Name",
    "testimonial": "Their quote about working with you",
    "image": "/path/to/image.jpg",  // or null
    "link": "https://linkedin.com/in/person",  // or null
    "featured": true  // Shows prominently
  }
]
```

**Notes:**
- `featured: true` shows only featured testimonials
- Images should be square (ideally 256x256px)
- Link to their LinkedIn profile or website (optional)

---

## 6. Achievements & Badges (`src/data/achievements.json`)

Add your achievements:

```json
[
  {
    "id": 1,
    "title": "Achievement Name",
    "description": "Brief description",
    "icon": "🚀",  // Use any emoji
    "date": "2026-02-15",
    "category": "milestone"  // "milestone", "skill", or "community"
  }
]
```

**Categories:**
- `milestone` - Major accomplishments (e.g., projects going viral)
- `skill` - Technical skills or expertise
- `community` - Community contributions

**Emoji Ideas:**
- 🚀 Launches, growth, viral
- ⚡ Performance, speed, efficiency
- 🎮 Game development
- 🌐 Web, global
- 🔧 Tools, building
- 🏆 Awards, achievements
- 🎯 Goals, focus
- 💡 Ideas, innovation

---

## 7. Project Statistics (`src/data/projectStats.json`)

Add metrics for your projects (shown on project cards):

```json
{
  "Project Title": {
    "github_stars": 234,
    "github_forks": 89,
    "live_users": 8900,
    "monthly_visitors": 25000,
    "uptime": 99.95,
    "average_rating": 4.9,
    "reviews_count": 156,
    "build_time_days": 14,
    "featured": true
  }
}
```

**Optional Fields (use 0 or omit if not applicable):**
- `github_stars` - GitHub repository stars
- `github_forks` - GitHub repository forks
- `live_users` - Active users on the platform
- `monthly_visitors` - Monthly traffic
- `uptime` - Percentage (e.g., 99.9)
- `average_rating` - Rating out of 5
- `reviews_count` - Number of user reviews
- `build_time_days` - Days to build
- `downloads` - Number of downloads
- `api_calls_monthly` - API usage

**Notes:**
- Only fields with non-zero values will display
- Project title must match exactly with Projects.tsx
- This creates social proof on your project cards

---

## How to Edit Files

### In VS Code:
1. Open the file from `src/data/`
2. Edit the JSON data
3. Keep the JSON structure valid (commas, brackets, quotes)
4. Save the file
5. The changes appear immediately in development

### JSON Formatting Tips:
- Always use double quotes for strings
- Commas between array items and object properties
- Valid dates: YYYY-MM-DD format
- No trailing commas

### Common Mistakes to Avoid:
- ❌ Missing commas between items
- ❌ Using single quotes instead of double quotes
- ❌ Unmatched brackets or braces
- ❌ Project names not matching exactly

---

## Quick Start Checklist

- [ ] Update `resume.json` with your resume link
- [ ] Add 3-5 entries to `experience.json`
- [ ] Add 3-4 blog posts to `blog.json`
- [ ] Add your open source projects to `openSource.json`
- [ ] Add 2-3 testimonials to `testimonials.json`
- [ ] Add 5-6 achievements to `achievements.json`
- [ ] Update `projectStats.json` with project metrics

---

## Troubleshooting

**JSON errors won't display?**
- Check for syntax errors in the file
- Use a JSON validator: https://jsonlint.com

**Data not showing in the UI?**
- Ensure the file has correct structure
- Check browser console for errors (F12)
- Restart the development server

**Can't find where to edit?**
- All data files are in `src/data/` folder
- Edit any `.json` file to update your portfolio

---

## Questions or Need Help?

Refer to the example data already in each file - they show the correct format!
