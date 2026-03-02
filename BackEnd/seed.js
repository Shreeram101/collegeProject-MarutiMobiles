const mongoose = require('mongoose');
const { Product } = require('./model/ProductModel'); 

// --- Configuration ---
const MONGO_URI = 'mongodb://127.0.0.1:27017/SamsungProject'; 

const products = [
  // --- SMARTPHONES ---
  {
    title: "Samsung Galaxy S25 Ultra",
    description: "Experience the next level of mobile AI with the Galaxy S25 Ultra. Titanium frame, 200MP camera, and Snapdragon 8 Gen 4.",
    price: 1299,
    rating: 4.9,
    category: "Smartphone",
    stock: 50,
    avatar: "1751856645244-galaxy-s25-ultra-share-image.webp"
  },
  {
    title: "iPhone 15 Pro Max",
    description: "Forged in titanium. Features the A17 Pro chip and the most powerful camera system in an iPhone.",
    price: 1199,
    rating: 4.8,
    category: "Smartphone",
    stock: 45,
    avatar: "1758208252195-iPhone-15-Pro-Max-Black-Titanium1-600x525.png"
  },
  {
    title: "Google Pixel 10 Pro Fold",
    description: "Unfold a new world. The Pixel 10 Pro Fold combines Google AI with a massive flexible display.",
    price: 1799,
    rating: 4.6,
    category: "Smartphone",
    stock: 20,
    avatar: "1763436668164-Google-Pixel-10-Pro-Fold-Moonstone.webp"
  },
  {
    title: "Samsung Galaxy Z Fold 7",
    description: "The ultimate multitasking device. Thinner, lighter, and more powerful than ever before.",
    price: 1899,
    rating: 4.7,
    category: "Smartphone",
    stock: 15,
    avatar: "1757413334224-samsung z fold 7.jpg"
  },
  {
    title: "Oppo Reno 14 Pro 5G",
    description: "Portrait expert with Sony flagship sensors and 80W SUPERVOOC flash charge.",
    price: 599,
    rating: 4.3,
    category: "Smartphone",
    stock: 60,
    avatar: "1758516580272-ZDBnfS5X5A-opporeno14pro5g-494582039-i-1-1200wx1200h.avif"
  },
  {
    title: "Samsung Galaxy S24 FE",
    description: "Flagship features at a fan-edition price. Pro-grade camera and long-lasting battery.",
    price: 649,
    rating: 4.4,
    category: "Smartphone",
    stock: 75,
    avatar: "1750504738284-Samsung-GalaxyS24-FE.png"
  },
  {
    title: "Google Pixel 10 Pro XL",
    description: "The biggest, most powerful Pixel yet. Advanced AI photography and all-day battery life.",
    price: 1099,
    rating: 4.7,
    category: "Smartphone",
    stock: 30,
    avatar: "1758253320909-Pixel10ProXL-Moonstone-Front.jpg"
  },

  // --- LAPTOPS ---
  {
    title: "Samsung Galaxy Book4 Pro",
    description: "Power and portability in perfect harmony. Dynamic AMOLED 2X display and Intel Core Ultra.",
    price: 1449,
    rating: 4.5,
    category: "Laptop",
    stock: 30,
    avatar: "1751689123638-in-galaxy-book4-pro-16-inch-np960-np960xgk-kg1in-539965055.webp"
  },

  // --- WEARABLES & AUDIO ---
  {
    title: "Samsung Galaxy Buds3 Pro",
    description: "Crystal clear sound with adaptive noise control and a sleek new blade design.",
    price: 249,
    rating: 4.7,
    category: "Audio",
    stock: 100,
    avatar: "1750476571954-in-galaxy-buds3-pro-r630-sm-r630nzaainu-542134810.webp"
  },
  {
    title: "Galaxy Watch 8",
    description: "Your advanced health companion. Track sleep, fitness, and heart health.",
    price: 349,
    rating: 4.6,
    category: "Wearables",
    stock: 80,
    avatar: "1753325224078-in-galaxy-watch8-l325-sm-l325fdaains-547660314.avif"
  },
  {
    title: "Galaxy Watch Ultra",
    description: "Built for extremes. Titanium cushion case and 10ATM water resistance.",
    price: 649,
    rating: 4.8,
    category: "Wearables",
    stock: 25,
    avatar: "1753327704871-download (2).jpg"
  },

  // --- HOME APPLIANCES ---
  {
    title: "Bespoke AI Refrigerator",
    description: "Smart cooling customized for you. AI Energy mode saves power and keeps food fresh.",
    price: 2199,
    rating: 4.8,
    category: "Appliances",
    stock: 10,
    avatar: "1753327972729-Bespoke-AI-REF-DT.webp"
  },
  {
    title: "Samsung AI Washing Machine",
    description: "Intelligent wash cycles that adapt to fabric type and soil level.",
    price: 899,
    rating: 4.5,
    category: "Appliances",
    stock: 15,
    avatar: "1753958940543-washine machine.jpg"
  },
  {
    title: "Samsung Neo QLED 8K TV",
    description: "The ultimate picture quality. Quantum Matrix Technology Pro for unimaginable detail.",
    price: 3499,
    rating: 4.9,
    category: "Appliances",
    stock: 5,
    avatar: "1753697433060-samsung tv.jpeg"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('🔌 Connected to Database: SamsungProject');

    // Remove existing products to avoid duplicates and broken links
    await Product.deleteMany({});
    console.log('🧹 Cleared existing products...');

    await Product.insertMany(products);
    console.log(`✅ Added ${products.length} Premium Products with VALID images!`);

    mongoose.disconnect();
    console.log('👋 Disconnected.');
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();