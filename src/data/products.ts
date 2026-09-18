import { Product, BoxBuilderItem } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'pnt-bill-books',
    name: 'Bill Books',
    slug: 'custom-bill-books',
    tagline: 'A4 1/2: Rs. 350 • A4 Sheet: Rs. 400',
    category: 'bill-books',
    categoryLabel: 'Bill Books',
    price: 350,
    originalPrice: 450,
    rating: 4.98,
    reviewCount: 94,
    image: '/products/bill-books.jpg',
    hoverImage: '/products/bill-books.jpg',
    badge: 'Popular',
    description: 'Custom designed receipt and invoice bill books for independent studios, shops, and businesses. Bill books cost for A4 sheet size paper Rs. 400 per book, A4 1/2 size paper Rs. 350 per book. Crafted with crisp carbonless copy paper and personalized with your brand name, logo, GST details, and sequential numbering.',
    craftDetails: [
      'A4 1/2 size paper: Rs. 350 per book',
      'A4 sheet size paper: Rs. 400 per book',
      'Single / Duplicate / Triplicate carbonless NCR sheets',
      'Custom design & company logo integration',
      'High quality premium paper with firm cardboard backing',
      'Perfect for businesses, boutiques, cafés & freelancers'
    ],
    dimensions: 'A4 1/2 Size (148 x 210 mm) or Executive A4 Size',
    leadTime: 'Printed & wire-stitched in 1–2 business days',
    isPersonalizable: true,
    mockupType: 'billbook',
    occasionTags: ['Just Because'],
    recipientTags: ['For Her', 'For Him'],
    customizationOptions: {
      availableDimensions: [
        { id: 'a5-standard', name: 'Standard A4 1/2 Size (A5)', measurements: '148 x 210 mm (5.8" x 8.3")', description: 'A4 1/2 size paper (Rs. 350 per book) • Ideal for cafés, shops & invoicing', badge: 'Rs. 350 / book' },
        { id: 'compact-quarter', name: 'Compact 1/4 Pocket Size', measurements: '105 x 148 mm (4.1" x 5.8")', description: 'Compact pocket pad for quick hand-delivered receipts' },
        { id: 'a4-executive', name: 'Executive A4 Sheet Size', measurements: '210 x 297 mm (8.3" x 11.7")', description: 'A4 sheet size paper (Rs. 400 per book) • Full-size ledger invoice', badge: 'Rs. 400 / book', priceDelta: 50 }
      ],
      availableMaterials: [
        { id: 'duplicate-ncr', name: 'Duplicate Carbonless NCR (50 Pairs)', spec: 'Crisp blue/pink carbonless sheets', description: 'Clean carbonless duplicate copy without carbon paper', badge: 'Bestseller' },
        { id: 'single-page', name: 'Single Page NCR (100 Leaves)', spec: '75 GSM crisp woodfree bond', description: 'Perforated single-leaf receipts with firm cardboard backing' },
        { id: 'triplicate-ncr', name: 'Triplicate Carbonless NCR (50 Triplicates)', spec: 'White/Yellow/Pink 3-part set', description: '3 copies per receipt: client, accounting & file copy', badge: 'Pro Office', priceDelta: 50 }
      ],
      requiresName: true,
      nameLabel: 'Business / Shop Name',
      namePlaceholder: 'e.g. printsntwins Studio',
      requiresMessage: true,
      messageLabel: 'Contact, Address or GST / Tax Number',
      messagePlaceholder: 'e.g. +91 98765 43210 • printsntwins@gmail.com',
      requiresDate: true,
      dateLabel: 'Starting Invoice / Bill Number (e.g. 001)',
      availableStyles: [
        { id: 'single', name: 'Single Page (100 leaves)' },
        { id: 'duplicate', name: 'Duplicate with Carbonless Copy (50 pairs)' },
        { id: 'triplicate', name: 'Triplicate (50 triplicates)' }
      ],
      availableColors: [
        { id: 'classic-black', name: 'Deep Forest Charcoal', hex: '#2E3A2F' },
        { id: 'terracotta', name: 'Warm Terracotta Rust', hex: '#C96F4F' },
        { id: 'royal-navy', name: 'Navy Blue', hex: '#1E3A8A' }
      ]
    }
  },
  {
    id: 'pnt-photo-cards',
    name: 'Photo Cards',
    slug: 'custom-photo-cards',
    tagline: 'Photo Cards Cost Rs. 60 ♡',
    category: 'photo-cards',
    categoryLabel: 'Photo Cards',
    price: 60,
    originalPrice: 90,
    rating: 5.0,
    reviewCount: 168,
    image: '/products/photo-cards.jpg',
    hoverImage: '/products/photo-cards.jpg',
    badge: 'Bestseller',
    description: '“Good Memories Last Forever ♡”. Transform your camera roll moments, vacation photos, anniversaries, and milestones into museum-quality mini photo cards with vintage Polaroid-style borders and custom handwritten captions. Photo cards cost Rs. 60.',
    craftDetails: [
      'Photo cards cost Rs. 60',
      'Personal photos & cherished memories',
      'Travel memories & holiday captures',
      'Special occasions, weddings & anniversaries',
      'Custom designs, sizes & borders',
      'Perfect for gifting, scrapbooking & mood boards'
    ],
    dimensions: '3.5" x 4.2" Classic Polaroid Size (Rs. 60)',
    leadTime: 'Hand-inspected & printed in 24 hours',
    isPersonalizable: true,
    mockupType: 'photocard',
    occasionTags: ['Birthday', 'Anniversary', 'Love & Romance', 'Wedding', 'Twins & Besties'],
    recipientTags: ['For Couples', 'For Her', 'For Him', 'For Twins & Besties', 'For Parents'],
    customizationOptions: {
      availableDimensions: [
        { id: 'polaroid-classic', name: 'Classic Polaroid Ratio', measurements: '3.5" x 4.2" (89 x 107 mm)', description: 'Timeless Polaroid frame with wide bottom caption border', badge: 'Bestseller' },
        { id: 'wallet-mini', name: 'Mini Wallet & Phone Card', measurements: '2.5" x 3.5" (63 x 89 mm)', description: 'Pocket-friendly mini photo prints for transparent phone cases' },
        { id: 'square-keepsake', name: 'Gallery Square Keepsake', measurements: '4.0" x 4.0" (102 x 102 mm)', description: 'Modern Instagram-style square prints' }
      ],
      availableMaterials: [
        { id: 'archival-matte', name: '350 GSM Archival Art Paper', spec: 'Velvet smooth matte finish', description: 'Anti-glare, fingerprint-resistant museum grade cardstock', badge: 'Standard' },
        { id: 'luster-gloss', name: '400 GSM Ultra Velvet Luster', spec: 'Deep color saturation & pearlescent sheen', description: 'Vibrant photo depth and crystal clear definition', badge: 'Vibrant', priceDelta: 20 },
        { id: 'cotton-rag', name: 'Deckled Organic Cotton Linen', spec: '350 GSM textured cotton rag', description: 'Heirloom tactile grain with luxury deckled card feel', badge: 'Luxury', priceDelta: 30 }
      ],
      requiresName: true,
      nameLabel: 'Names or Header Caption',
      namePlaceholder: 'e.g. Good Memories Last Forever ♡',
      requiresMessage: true,
      messageLabel: 'Memory Caption or Date',
      messagePlaceholder: 'e.g. Paris Summer 2024 • Our Special Day',
      requiresPhoto: true,
      photoLabel: 'Upload Your Photo (or paste image URL)',
      availableFonts: [
        { id: 'script', name: 'Handwritten Script', cssFamily: 'Caveat, cursive' },
        { id: 'serif', name: 'Editorial Serif', cssFamily: 'Playfair Display, serif' },
        { id: 'sans', name: 'Clean Modern', cssFamily: 'Plus Jakarta Sans, sans-serif' }
      ],
      availableStyles: [
        { id: 'polaroid', name: 'Vintage Polaroid Frame' },
        { id: 'minimal-borderless', name: 'Full Bleed Borderless' },
        { id: 'film-strip', name: 'Retro Film Grain Border' }
      ]
    }
  },
  {
    id: 'pnt-custom-stickers',
    name: 'Customized Stickers',
    slug: 'custom-stickers',
    tagline: 'Customized Sticker in PVC Sheet • Rs. 100/sheet',
    category: 'customized-stickers',
    categoryLabel: 'Customized Stickers',
    price: 100,
    originalPrice: 150,
    rating: 4.96,
    reviewCount: 132,
    image: '/products/custom-stickers.jpg',
    hoverImage: '/products/custom-stickers.jpg',
    badge: 'Popular',
    description: '“Stickers Make Everything Brighter ♡”. Waterproof, tear-resistant customized sticker in PVC sheet Rs. 100 per sheet. Featuring your custom names, quotes, logos, and favorite characters. Perfect for laptops, tumblers, planners, skateboards, and packaging.',
    craftDetails: [
      'Customized Sticker in PVC sheet: Rs. 100 per sheet',
      'Name stickers with personalized typography',
      'Logo stickers for small businesses & creators',
      'Character stickers & aesthetic doodle illustrations',
      'Any design you like — fully custom cutlines',
      '100% Waterproof, dishwasher-safe & durable PVC vinyl'
    ],
    dimensions: 'Customized PVC Sheet (Rs. 100 per sheet)',
    leadTime: 'Printed & precision cut in 24 hours',
    isPersonalizable: true,
    mockupType: 'stickers',
    occasionTags: ['Birthday', 'Twins & Besties', 'Just Because'],
    recipientTags: ['For Her', 'For Him', 'For Twins & Besties', 'For Kids & Babies'],
    customizationOptions: {
      availableDimensions: [
        { id: 'diecut-medium', name: 'Customized PVC Sheet', measurements: 'Standard PVC Sheet contour cuts', description: 'Customized sticker in PVC sheet (Rs. 100 per sheet)', badge: 'Rs. 100 / sheet' },
        { id: 'diecut-large', name: 'Statement Large PVC Sheet', measurements: 'Large contour cuts on PVC sheet', description: 'Bold stickers for water bottles, skateboards & bumpers', priceDelta: 30 },
        { id: 'mini-sheet', name: 'Mini Planner Icons PVC Sheet', measurements: 'Mini die-cuts on PVC sheet', description: 'Tiny mood stickers and doodles for bullet journals & packaging' }
      ],
      availableMaterials: [
        { id: 'waterproof-gloss', name: '100% Waterproof Heavy PVC Sheet', spec: 'Premium UV laminate PVC sheet', description: 'Dishwasher safe, weatherproof & scratch-proof PVC sheet', badge: 'Durable' },
        { id: 'holographic-shimmer', name: 'Holographic Rainbow Prism PVC', spec: 'Metallic prismatic shifting film', description: 'Iridescent holographic sparkle finish that catches light beautifully', badge: 'Eye-Catching', priceDelta: 30 },
        { id: 'clear-transparent', name: 'Clear Transparent Vinyl PVC', spec: 'Optically clear contour cut', description: 'Shows through surface texture seamlessly without white edges', badge: 'Aesthetic', priceDelta: 20 },
        { id: 'soft-matte', name: 'Velvet Soft-Touch Matte PVC', spec: 'Matte glare-free protective coat', description: 'Silky smooth hand-feel with rich muted pastel contrast' }
      ],
      requiresName: true,
      nameLabel: 'Name or Sticker Text',
      namePlaceholder: 'e.g. Good Vibes • You Got This',
      requiresMessage: true,
      messageLabel: 'Sticker Theme or Icon Style',
      messagePlaceholder: 'e.g. Butterfly, Retro Flower, Pastel Rainbow',
      availableStyles: [
        { id: 'die-cut', name: 'Contour Die-Cut Individual' },
        { id: 'holographic', name: 'Holographic Glitter Finish' },
        { id: 'transparent', name: 'Clear Transparent Vinyl' }
      ],
      availableColors: [
        { id: 'pastel-pink', name: 'Pastel Blush Pink', hex: '#F9A8D4' },
        { id: 'sunshine-yellow', name: 'Sunshine Warm Gold', hex: '#FBBF24' },
        { id: 'soft-lavender', name: 'Soft Lavender Lilac', hex: '#C084FC' },
        { id: 'mint-green', name: 'Aesthetic Mint Green', hex: '#86EFAC' }
      ]
    }
  },
  {
    id: 'pnt-pipe-cleaner-crafts',
    name: 'Pipe Cleaner Crafts',
    slug: 'pipe-cleaner-crafts',
    tagline: 'Cute • Colorful • Handmade',
    category: 'pipe-cleaner-crafts',
    categoryLabel: 'Pipe Cleaner Crafts',
    price: 150,
    originalPrice: 220,
    rating: 5.0,
    reviewCount: 185,
    image: '/products/pipe-cleaner-crafts.jpg',
    hoverImage: '/products/pipe-cleaner-crafts.jpg',
    badge: 'Handcrafted',
    description: '“Tiny Crafts Big Smiles ♡”. Delightful, everlasting plush pipe cleaner creations hand-sculpted stem-by-stem in our studio. From everlasting tulip and sunflower bouquets to fluffy bunnies and cute bag charms.',
    craftDetails: [
      'Everlasting Flowers (Tulips, Sunflowers, Daisies)',
      'Cute Animals (Fluffy Bunnies, Kittens, Bears)',
      'Custom Keychains & Bag Charms',
      'Charming Desk & Room Decor items',
      '100% Handmade with plush velvet chenille stems'
    ],
    dimensions: 'Hand-crafted 7"–9" Height or 3" Bag Charm',
    leadTime: 'Hand-sculpted in 1–2 business days',
    isPersonalizable: true,
    mockupType: 'craft',
    occasionTags: ['Birthday', 'Anniversary', 'Twins & Besties', 'Love & Romance', 'Just Because'],
    recipientTags: ['For Her', 'For Twins & Besties', 'For Kids & Babies'],
    customizationOptions: {
      availableDimensions: [
        { id: 'bouquet-tall', name: 'Everlasting Stem Bouquet', measurements: '8.0" - 9.0" Height (20 - 23 cm)', description: 'Hand-sculpted everlasting tulips, sunflower & daisy bundle tied with silk ribbon', badge: 'Handcrafted' },
        { id: 'potted-mini', name: 'Potted Mini Clay Bloom', measurements: '5.0" - 6.0" Height (13 - 15 cm)', description: 'Charming desk buddy flower planted in authentic terracotta pot', badge: 'Cute Desk Decor' },
        { id: 'bag-charm', name: 'Plush Bag Charm / Keychain', measurements: '3.5" (9 cm) with gold clasp', description: 'Fluffy chenille bunny/bear with heart charm and sturdy key ring' }
      ],
      availableMaterials: [
        { id: 'plush-chenille', name: 'Plush Velvet Chenille Stems', spec: 'Ultra-dense 6mm velvet wire core', description: 'Extremely soft, bendable & everlasting vibrant velvet finish', badge: 'Studio Choice' },
        { id: 'silk-ribbon', name: 'Silk Satin Ribbon & Wrapped Stem', spec: 'Double-faced champagne silk tie', description: 'Hand-tied ribbon bow with floral paper wrap presentation' },
        { id: 'ceramic-base', name: 'Baked Terracotta Clay Pot Base', spec: 'Natural porous clay container', description: 'Weighted miniature planter pot with moss cushion filler', badge: 'Heavy Base', priceDelta: 50 }
      ],
      requiresName: true,
      nameLabel: 'Recipient Name for Gift Tag',
      namePlaceholder: 'e.g. Chloe & Sienna',
      requiresMessage: true,
      messageLabel: 'Personal Gift Note (Calligraphy Written)',
      messagePlaceholder: 'e.g. You make every day bloom brighter ♡',
      availableStyles: [
        { id: 'tulip-bouquet', name: 'Everlasting Tulip Bouquet (Pink & Cream)' },
        { id: 'potted-sunflower', name: 'Potted Mini Sunflower in Clay Pot' },
        { id: 'fluffy-bunny-charm', name: 'Plush White Bunny with Heart Charm' },
        { id: 'custom-bloom', name: 'Custom Pastel Daisies Mix' }
      ],
      availableColors: [
        { id: 'spring-pastel', name: 'Spring Pastel Palette', hex: '#FBCFE8' },
        { id: 'sunburst-yellow', name: 'Sunburst Golden Bloom', hex: '#F59E0B' },
        { id: 'lavender-dream', name: 'Lavender Mist', hex: '#A855F7' }
      ]
    }
  },
  {
    id: 'pnt-tshirt-printing',
    name: 'Tshirts Printing',
    slug: 'custom-tshirt-printing',
    tagline: 'Tshirts Printing Cost Rs. 200 ♡',
    category: 'tshirts-printing',
    categoryLabel: 'Tshirts Printing',
    price: 200,
    originalPrice: 299,
    rating: 4.97,
    reviewCount: 210,
    image: '/products/tshirts-printing.jpg',
    hoverImage: '/products/tshirts-printing.jpg',
    badge: 'Bestseller',
    description: '“Express Your Style ♡”. Premium 100% combed cotton aesthetic t-shirts printed with your custom quotes, butterfly graphics, photos, or matching twin illustrations. Tshirts printing cost Rs. 200. Ultra-breathable, soft hand-feel, and enduring vibrancy.',
    craftDetails: [
      'Tshirts printing cost: Rs. 200',
      'Custom designs & personalized graphic layouts',
      'Photos, inspirational quotes & minimalist logos',
      'All sizes available (XS, S, M, L, XL, XXL)',
      'High quality, non-cracking screen & DTG print',
      'Perfect for individuals, matching twins, couples & events'
    ],
    dimensions: 'Sizes XS, S, M, L, XL, XXL (Unisex relaxed fit)',
    leadTime: 'Crafted & printed in 2 business days',
    isPersonalizable: true,
    mockupType: 'tshirt',
    occasionTags: ['Birthday', 'Twins & Besties', 'Anniversary', 'Just Because'],
    recipientTags: ['For Twins & Besties', 'For Her', 'For Him', 'For Couples'],
    customizationOptions: {
      availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      availableDimensions: [
        { id: 'unisex-relaxed', name: 'Unisex Relaxed Daily Fit', measurements: 'XS, S, M, L, XL, XXL (Standard sizing)', description: 'Flattering unisex drape with ribbed crewneck collar (Rs. 200)', badge: 'Rs. 200' },
        { id: 'oversized-street', name: 'Korean Oversized Drop-Shoulder', measurements: 'Boxy streetwear cut (order your standard size)', description: 'Trendy street drape with relaxed dropped shoulders', badge: 'Trending', priceDelta: 30 }
      ],
      availableFabrics: [
        { id: 'combed-cotton', name: '100% Combed Cotton', description: '180 GSM • Soft, breathable & everyday comfortable', badge: 'Popular' },
        { id: 'bio-washed-heavy', name: 'Heavyweight Bio-Washed', description: '240 GSM • Dense luxury weave & structured drape', badge: 'Premium' },
        { id: 'oversized-streetwear', name: 'Oversized Streetwear Cotton', description: '220 GSM • Relaxed drop-shoulder Korean fit', badge: 'Trending' },
        { id: 'poly-blend', name: 'Dry-Fit Poly Blend', description: '190 GSM • Flexible, athletic & quick-drying' }
      ],
      availableMaterials: [
        { id: 'combed-cotton', name: '100% Combed Cotton (180 GSM)', spec: 'Single jersey ring-spun cotton', description: 'Breathable, featherlight & everyday cloud-soft comfort', badge: 'Popular' },
        { id: 'bio-washed-heavy', name: 'Heavyweight Bio-Washed (240 GSM)', spec: 'Dense luxury cotton weave', description: 'Structured premium drape with zero pilling or shrinkage', badge: 'Luxury', priceDelta: 50 },
        { id: 'poly-blend', name: 'Dry-Fit Athletic Poly-Cotton (190 GSM)', spec: 'Moisture-wicking micro-poly', description: 'Quick-drying, wrinkle-resistant & flexible stretch' }
      ],
      availablePrintTypes: [
        { id: 'customized', name: 'Customized Print', description: 'Personalized quote, custom text, or uploaded photo/artwork' },
        { id: 'normal', name: 'Normal / Catalog Print', description: 'printsntwins signature studio design (ready-to-wear)' }
      ],
      requiresName: true,
      nameLabel: 'Quote or Graphic Headline',
      namePlaceholder: 'e.g. GOOD THINGS TAKE TIME',
      requiresMessage: true,
      messageLabel: 'Subtitle or Custom Note',
      messagePlaceholder: 'e.g. Butterfly line art or Twin name',
      requiresPhoto: true,
      photoLabel: 'Upload Custom Artwork / Graphic (Optional)',
      availableStyles: [
        { id: 'quote-minimal', name: 'Bold Minimalist Quote (Chest Center)' },
        { id: 'butterfly-graphic', name: 'Aesthetic Line-Art Butterfly' },
        { id: 'floral-illustration', name: 'Fine Line Botanic Blossom' },
        { id: 'custom-artwork', name: 'Custom Uploaded Artwork / Photo' }
      ],
      availableColors: [
        { id: 'crisp-white', name: 'Aesthetic Milk White', hex: '#FAF9F5' },
        { id: 'classic-black', name: 'Vintage Washed Black', hex: '#1C1917' },
        { id: 'soft-peach', name: 'Blush Pastel Peach', hex: '#FED7AA' }
      ]
    }
  },
  {
    id: 'pnt-visiting-cards',
    name: 'Visiting Cards',
    slug: 'luxury-visiting-cards',
    tagline: 'Visiting Cards Cost for 30 Cards Rs. 200',
    category: 'visiting-cards',
    categoryLabel: 'Visiting Cards',
    price: 200,
    originalPrice: 280,
    rating: 4.99,
    reviewCount: 140,
    image: '/products/visiting-cards.jpg',
    hoverImage: '/products/visiting-cards.jpg',
    badge: 'Popular',
    description: '“A Small Card A Big Opportunity ♡”. Premium bespoke visiting cards designed to make a memorable, tactile impression. Visiting cards cost for 30 cards Rs. 200. Offered in luxury matte velvet, gold foil stamping, and organic cotton-rag finishes.',
    craftDetails: [
      'Visiting cards cost for 30 cards: Rs. 200',
      'Business cards for creative studios, boutiques & executives',
      'Personal contact & calling cards',
      'Multiple luxury designs & raised foil finishes',
      'Premium 400gsm heavyweight textured cardstock',
      'Custom branding, font hierarchy & QR code inclusion'
    ],
    dimensions: 'Standard 3.5" x 2.0" (Pack of 30 cards)',
    leadTime: 'Crafted & foil stamped in 2 business days',
    isPersonalizable: true,
    mockupType: 'card',
    occasionTags: ['Just Because'],
    recipientTags: ['For Her', 'For Him'],
    customizationOptions: {
      availableDimensions: [
        { id: 'standard-us', name: 'Standard Business Cards (Set of 30)', measurements: '3.5" x 2.0" (89 x 51 mm) • Pack of 30', description: '30 cards for Rs. 200 • Classic executive and boutique business card profile', badge: '30 Cards Rs. 200' },
        { id: 'square-artisan', name: 'Artisan Square Boutique Size (Set of 30)', measurements: '2.5" x 2.5" (64 x 64 mm) • Pack of 30', description: 'Modern chic square profile for creative studios & designers', badge: 'Creative Choice', priceDelta: 20 },
        { id: 'slim-european', name: 'European Slim Calling Card (Set of 30)', measurements: '3.5" x 1.5" (89 x 38 mm) • Pack of 30', description: 'Sleek, minimalist pocket card with refined modern proportions' }
      ],
      availableMaterials: [
        { id: 'matte-velvet', name: '400 GSM Heavyweight Matte Velvet', spec: 'Soft-touch velvet laminate', description: 'Silky tactile feel with unbending, substantial card weight', badge: 'Bestseller' },
        { id: 'gold-foil', name: 'Raised Metallic Hot Gold Foil', spec: '3D embossed metallic foil on 450 GSM', description: 'Brilliant light-catching raised gold foil typography & botanical accents', badge: 'Ultra Luxury', priceDelta: 50 },
        { id: 'cotton-linen', name: '350 GSM Organic Cotton Linen', spec: 'Natural off-white textured linen rag', description: 'Artisanal cross-hatch linen texture for architects & studios', badge: 'Eco Artisan', priceDelta: 40 },
        { id: 'frosted-polymer', name: 'Frosted Translucent Waterproof', spec: 'Semi-opaque polymer frosted card', description: 'Unique contemporary see-through cards that never tear or bend', badge: 'Modern', priceDelta: 50 }
      ],
      requiresName: true,
      nameLabel: 'Your Full Name & Profession / Title',
      namePlaceholder: 'e.g. Jane Doe • Founder & Artisan',
      requiresMessage: true,
      messageLabel: 'Contact Details (Phone, Email, Website)',
      messagePlaceholder: 'e.g. +91 98765 43210 • printsntwins@gmail.com',
      availableStyles: [
        { id: 'gold-on-black', name: 'Raised Gold Foil on Velvet Black' },
        { id: 'cream-minimal', name: 'Warm Cream Linen with Gold Lettering' },
        { id: 'modern-terracotta', name: 'Artisan Terracotta Studio Theme' }
      ],
      availableColors: [
        { id: 'matte-black', name: 'Matte Velvet Black', hex: '#181513' },
        { id: 'warm-cream', name: 'Warm Off-White Linen', hex: '#FAF5EE' },
        { id: 'deep-navy', name: 'Deep Royal Navy', hex: '#0F172A' }
      ]
    }
  }
];

export const BOX_BUILDER_ITEMS: BoxBuilderItem[] = [
  {
    id: 'box-item-1',
    name: 'Custom Photo Cards (Pack of 5)',
    category: 'Photo Cards',
    price: 60,
    image: '/products/photo-cards.jpg',
    description: 'Polaroid-style custom photo prints with your sweet captions (Rs. 60).',
    badge: 'Rs. 60'
  },
  {
    id: 'box-item-2',
    name: 'Handcrafted Pipe Cleaner Flower Stem',
    category: 'Handmade Crafts',
    price: 80,
    image: '/products/pipe-cleaner-crafts.jpg',
    description: 'Hand-sculpted everlasting tulip or sunflower in vibrant plush chenille.',
    badge: 'Handmade'
  },
  {
    id: 'box-item-3',
    name: 'Customized Sticker in PVC Sheet',
    category: 'Stickers',
    price: 100,
    image: '/products/custom-stickers.jpg',
    description: 'Waterproof die-cut customized sticker in PVC sheet (Rs. 100 per sheet).',
    badge: 'Rs. 100'
  },
  {
    id: 'box-item-4',
    name: 'Custom Graphic Cotton T-Shirt',
    category: 'Apparel',
    price: 200,
    image: '/products/tshirts-printing.jpg',
    description: '100% cotton tee printed with your choice of quote or artwork (Rs. 200).',
    badge: 'Rs. 200'
  },
  {
    id: 'box-item-5',
    name: 'Bespoke Luxury Visiting Cards (30 Cards)',
    category: 'Stationery',
    price: 200,
    image: '/products/visiting-cards.jpg',
    description: 'Gold foil stamped personal calling or business cards (30 cards for Rs. 200).',
    badge: '30 Cards Rs. 200'
  },
  {
    id: 'box-item-6',
    name: 'Custom Bill Book (A4 1/2 Size)',
    category: 'Stationery',
    price: 350,
    image: '/products/bill-books.jpg',
    description: 'Personalized carbonless duplicate receipt pad in A4 1/2 size (Rs. 350 per book).',
    badge: 'Rs. 350'
  }
];
