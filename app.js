// Planet data for each app
const planetsData = [
  {
    name: "Planner",
    description:
      "Organize your life, tasks, and goals in one beautiful interface. Stay on top of your schedule and achieve your dreams.",
    features: [
      "Daily task management",
      "Goal tracking",
      "Calendar integration",
      "Priority organization",
    ],
    color: 0x667eea,
    url: "https://aabishuaa.github.io/planner/",
    orbitRadius: 8,
    size: 1.2,
    orbitSpeed: 0.0008,
  },
  {
    name: "Budgeter",
    description:
      "Take control of your finances with smart budgeting tools. Track expenses, set savings goals, and build wealth.",
    features: [
      "Expense tracking",
      "Budget planning",
      "Savings goals",
      "Financial insights",
    ],
    color: 0x48bb78,
    url: "https://aabishuaa.github.io/budgeter/",
    orbitRadius: 12,
    size: 1.4,
    orbitSpeed: 0.0006,
  },
  {
    name: "Skills Tracker",
    description:
      "Level up your abilities and track your learning journey. Master new skills and celebrate your growth.",
    features: [
      "Skill progress tracking",
      "Learning milestones",
      "Practice logs",
      "Achievement system",
    ],
    color: 0xf093fb,
    url: "http://localhost:3000/",
    orbitRadius: 16,
    size: 1.1,
    orbitSpeed: 0.0004,
  },
  {
    name: "Bible Memory",
    description:
      "Strengthen your faith by memorizing scripture. Build a strong foundation in God's Word with interactive tools.",
    features: [
      "Verse memorization",
      "Daily devotionals",
      "Progress tracking",
      "Review reminders",
    ],
    color: 0xfbd38d,
    url: "https://bible-memory-f26bb.web.app/",
    orbitRadius: 20,
    size: 1.3,
    orbitSpeed: 0.0003,
  },
];

// Three.js setup
let scene,
  camera,
  renderer,
  planets = [],
  sun,
  starField;
let raycaster,
  mouse,
  hoveredPlanet = null;

function init() {
  // Scene setup
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.00025);

  // Camera setup
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 15, 30);
  camera.lookAt(0, 0, 0);

  // Renderer setup
  const canvas = document.getElementById("space-canvas");
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Raycaster for click detection
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // Create the blue star (sun)
  createSun();

  // Create starfield
  createStarField();

  // Create planets
  createPlanets();

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0x4299e1, 2, 100);
  pointLight.position.set(0, 0, 0);
  scene.add(pointLight);

  // Event listeners
  window.addEventListener("resize", onWindowResize);
  canvas.addEventListener("click", onCanvasClick);
  canvas.addEventListener("mousemove", onMouseMove);

  // Hide loading screen
  setTimeout(() => {
    document.getElementById("loading-screen").classList.add("hidden");
  }, 1500);

  // Start animation
  animate();
}

function createSun() {
  // Create glowing blue star
  const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
  const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0x4299e1,
    emissive: 0x4299e1,
    emissiveIntensity: 1,
  });
  sun = new THREE.Mesh(sunGeometry, sunMaterial);
  scene.add(sun);

  // Add glow effect
  const glowGeometry = new THREE.SphereGeometry(2.5, 32, 32);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x4299e1,
    transparent: true,
    opacity: 0.3,
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  sun.add(glow);

  // Outer glow
  const outerGlowGeometry = new THREE.SphereGeometry(3.5, 32, 32);
  const outerGlowMaterial = new THREE.MeshBasicMaterial({
    color: 0x667eea,
    transparent: true,
    opacity: 0.15,
  });
  const outerGlow = new THREE.Mesh(outerGlowGeometry, outerGlowMaterial);
  sun.add(outerGlow);
}

function createStarField() {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 3000;
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i += 3) {
    // Random position in a sphere
    const radius = 100 + Math.random() * 200;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i + 2] = radius * Math.cos(phi);

    // Varied star colors (white, blue, yellow)
    const colorChoice = Math.random();
    if (colorChoice < 0.7) {
      // White stars
      colors[i] = 1;
      colors[i + 1] = 1;
      colors[i + 2] = 1;
    } else if (colorChoice < 0.85) {
      // Blue stars
      colors[i] = 0.5;
      colors[i + 1] = 0.7;
      colors[i + 2] = 1;
    } else {
      // Yellow stars
      colors[i] = 1;
      colors[i + 1] = 1;
      colors[i + 2] = 0.5;
    }
  }

  starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  starGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const starMaterial = new THREE.PointsMaterial({
    size: 0.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  });

  starField = new THREE.Points(starGeometry, starMaterial);
  scene.add(starField);
}

function createPlanets() {
  planetsData.forEach((data, index) => {
    // Create planet mesh
    const geometry = new THREE.SphereGeometry(data.size, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: data.color,
      emissive: data.color,
      emissiveIntensity: 0.3,
      roughness: 0.7,
      metalness: 0.3,
    });
    const planet = new THREE.Mesh(geometry, material);

    // Create orbit line
    const orbitGeometry = new THREE.BufferGeometry();
    const orbitPoints = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      orbitPoints.push(
        Math.cos(angle) * data.orbitRadius,
        0,
        Math.sin(angle) * data.orbitRadius
      );
    }
    orbitGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(orbitPoints, 3)
    );
    const orbitMaterial = new THREE.LineBasicMaterial({
      color: 0x4299e1,
      transparent: true,
      opacity: 0.2,
    });
    const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
    scene.add(orbit);

    // Add glow to planet
    const glowGeometry = new THREE.SphereGeometry(data.size * 1.2, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: data.color,
      transparent: true,
      opacity: 0.3,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    planet.add(glow);

    // Store planet data
    planet.userData = {
      ...data,
      angle: ((Math.PI * 2) / planetsData.length) * index,
      orbitRadius: data.orbitRadius,
      orbitSpeed: data.orbitSpeed,
      originalScale: 1,
      glow: glow,
    };

    planets.push(planet);
    scene.add(planet);
  });
}

function animate() {
  requestAnimationFrame(animate);

  // Rotate sun
  if (sun) {
    sun.rotation.y += 0.002;
  }

  // Orbit planets
  planets.forEach((planet) => {
    planet.userData.angle += planet.userData.orbitSpeed;
    planet.position.x =
      Math.cos(planet.userData.angle) * planet.userData.orbitRadius;
    planet.position.z =
      Math.sin(planet.userData.angle) * planet.userData.orbitRadius;

    // Rotate planets
    planet.rotation.y += 0.005;

    // Pulse glow
    if (planet.userData.glow) {
      const pulseScale = 1 + Math.sin(Date.now() * 0.002) * 0.1;
      planet.userData.glow.scale.set(pulseScale, pulseScale, pulseScale);
    }
  });

  // Rotate starfield slowly
  if (starField) {
    starField.rotation.y += 0.0001;
  }

  // Camera gentle movement
  camera.position.x = Math.sin(Date.now() * 0.0001) * 2;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planets);

  // Reset all planets
  planets.forEach((planet) => {
    planet.scale.set(1, 1, 1);
    planet.material.emissiveIntensity = 0.3;
  });

  // Highlight hovered planet
  if (intersects.length > 0) {
    const planet = intersects[0].object;
    planet.scale.set(1.2, 1.2, 1.2);
    planet.material.emissiveIntensity = 0.6;
    document.body.style.cursor = "pointer";
    hoveredPlanet = planet;
  } else {
    document.body.style.cursor = "default";
    hoveredPlanet = null;
  }
}

function onCanvasClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planets);

  if (intersects.length > 0) {
    const planet = intersects[0].object;
    openPlanetModal(planet.userData);
  }
}

function openPlanetModal(data) {
  const modal = document.getElementById("planet-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalFeaturesList = document.getElementById("modal-features-list");
  const modalLink = document.getElementById("modal-link");
  const planetIcon = document.querySelector(".planet-icon");

  // Set content
  modalTitle.textContent = data.name;
  modalDescription.textContent = data.description;
  modalLink.href = data.url;

  // Set planet icon color
  planetIcon.style.background = `radial-gradient(circle at 30% 30%, ${rgbToString(
    data.color
  )}, transparent)`;
  planetIcon.style.boxShadow = `0 0 40px ${rgbToString(
    data.color
  )}, inset 0 0 30px ${rgbToString(data.color)}`;

  // Set features
  modalFeaturesList.innerHTML = "";
  data.features.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    modalFeaturesList.appendChild(li);
  });

  // Show modal
  modal.classList.add("active");
}

function rgbToString(hex) {
  const r = (hex >> 16) & 255;
  const g = (hex >> 8) & 255;
  const b = hex & 255;
  return `rgba(${r}, ${g}, ${b}, 0.6)`;
}

// Close modal
document.querySelector(".close-btn").addEventListener("click", () => {
  document.getElementById("planet-modal").classList.remove("active");
});

document.getElementById("planet-modal").addEventListener("click", (e) => {
  if (e.target.id === "planet-modal") {
    document.getElementById("planet-modal").classList.remove("active");
  }
});

// Keyboard shortcut to close modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.getElementById("planet-modal").classList.remove("active");
  }
});

// Initialize when page loads
window.addEventListener("load", init);
