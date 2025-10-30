# 🌌 Abishua Space - Your Personal Universe

Welcome to **Abishua Space**, a stunning 3D space portal that provides easy access to all your personal productivity apps. Each app is represented as a planet orbiting around a beautiful glowing blue star!

## ✨ Features

- **Immersive 3D Space Scene**: Built with Three.js for smooth, beautiful graphics
- **Orbiting Planets**: Each of your apps orbits around a central blue star at different speeds
- **Interactive Experience**: Click on any planet to learn more and navigate to your apps
- **Stunning Animations**:
  - Rotating planets with glowing effects
  - 3000+ twinkling stars in the background
  - Pulsing planet glows
  - Smooth camera movements
  - Beautiful modal transitions
- **Responsive Design**: Works great on desktop, tablet, and mobile devices

## 🪐 Your Planets

1. **Planner** (Purple Planet) - Organize your life and tasks
2. **Budgeter** (Green Planet) - Manage your finances
3. **Skills Tracker** (Pink Planet) - Track your learning journey
4. **Bible Memory** (Gold Planet) - Strengthen your faith with scripture

## 🚀 How to Deploy on GitHub Pages

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add Abishua Space portal"
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings**
3. Scroll down to **Pages** (in the left sidebar)
4. Under **Source**, select your branch (usually `main`)
5. Select `/root` as the folder
6. Click **Save**

Your site will be live at: `https://yourusername.github.io/abishua-space/`

### Step 3: Update Planet Links

Once your individual apps are deployed, update the URLs in `app.js`:

```javascript
// Find this section in app.js (around line 2)
const planetsData = [
    {
        name: "Planner",
        // ... other properties
        url: "https://your-planner-url.github.io", // UPDATE THIS
    },
    {
        name: "Budgeter",
        url: "https://your-budgeter-url.github.io", // UPDATE THIS
    },
    // ... etc
];
```

## 🎨 Customization

### Change Planet Colors

In `app.js`, modify the `color` property (hex color values):

```javascript
{
    name: "Planner",
    color: 0x667eea, // Change this hex color
    // ...
}
```

### Adjust Orbit Speed & Size

Modify these properties for each planet:

```javascript
{
    orbitRadius: 8,    // Distance from center
    size: 1.2,         // Planet size
    orbitSpeed: 0.0008 // How fast it orbits (smaller = slower)
}
```

### Change the Central Star Color

In `app.js`, find the `createSun()` function and modify:

```javascript
const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0x4299e1,        // Change this for star color
    emissive: 0x4299e1,     // Change this too
    // ...
});
```

### Add More Planets

Simply add more objects to the `planetsData` array in `app.js`:

```javascript
{
    name: "New App",
    description: "Description here",
    features: ["Feature 1", "Feature 2"],
    color: 0xFF6B6B,
    url: "https://your-new-app.github.io",
    orbitRadius: 24,
    size: 1.0,
    orbitSpeed: 0.0002
}
```

## 🛠️ Technologies Used

- **Three.js** - 3D graphics and WebGL rendering
- **Vanilla JavaScript** - No framework dependencies
- **CSS3** - Beautiful animations and styling
- **HTML5 Canvas** - Rendering surface

## 📱 Browser Support

Works best on modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers

## 🎯 Tips for Best Experience

- Use a desktop or laptop for the full immersive experience
- Make sure hardware acceleration is enabled in your browser
- For better performance, close other heavy tabs

## 📝 Local Development

Simply open `index.html` in your browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve
```

Then visit `http://localhost:8000`

## 🌟 Enjoy Your Personal Universe!

Your personal space portal is ready! Each time you need to access your apps, just visit Abishua Space and click on the planet you want to explore.

---

Made with ❤️ and lots of ✨ stardust
