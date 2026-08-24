import realSimbi from '../assets/Simbi_Bag.jpg'
import realSimbi1 from '../assets/Simbi_Bag1.jpg'
import realSimbi2 from '../assets/Simbi_Bag2.jpg'
import realSimbi3 from '../assets/Simbi_Bag3.jpg'
import realA825 from '../assets/_A9A0861_copy.jpg'
import realA828 from '../assets/_A9A0828_copy.jpg'
import realA830 from '../assets/_A9A0830_copy.jpg'
import realA851 from '../assets/_A9A0851_copy.jpg'
import realA853 from '../assets/_A9A0853_copy.jpg'
import realA835 from '../assets/_A9A0835_copy.jpg'
import realA848 from '../assets/_A9A0848_copy.jpg'
import realA855 from '../assets/_A9A0855_copy.jpg'
import realA856 from '../assets/_A9A0856_copy.jpg'
import realA859 from '../assets/_A9A0859_copy.jpg'
import realA863 from '../assets/_A9A0863_copy.jpg'
import realA867 from '../assets/_A9A0867_copy.jpg'
import realA869 from '../assets/_A9A0869_copy.jpg'
import realA872 from '../assets/_A9A0872_copy.jpg'

export const signature = [
  {
    id: 'ew', name: 'EAST-WEST BAG', price: 1340, img: realA856,
    material: 'Full-grain leather', dimensions: '34 × 22 × 12 cm',
    desc: 'The East-West Bag stretches horizontally for a low, elegant profile that sits flat against the body. A wide zip opening and reinforced base keep your essentials organised from morning commute to evening dinner.',
    features: ['Wide zip opening', 'Reinforced flat base', 'Hand-painted edges', 'Adjustable shoulder strap'],
    images: [
      { color: '#111111', img: realA856 },
      { color: '#111111', img: realA830 },
      { color: '#111111', img: realA853 },
    ],
  },
  {
    id: 'mb', name: 'MODERN BUCKET', price: 1290, img: realA863,
    material: 'Full-grain leather', dimensions: '26 × 27 × 16 cm',
    desc: 'A soft drawstring silhouette with a structured base, the Modern Bucket holds more than it lets on. Cinch it closed for the city or wear it slouched off the shoulder for the weekend.',
    features: ['Drawstring closure', 'Structured leather base', 'Interior slip pocket', 'Detachable crossbody strap'],
    images: [
      { color: '#111111', img: realA863 },
      { color: '#111111', img: realSimbi2 },
      { color: '#111111', img: realA872 },
    ],
  },
  {
    id: 'ns', name: 'NORTH-SOUTH TOTE', price: 1420, img: realA855,
    material: 'Full-grain leather', dimensions: '30 × 36 × 14 cm',
    desc: 'Tall, slim and quietly architectural. The North-South Tote carries a laptop, a folder and a water bottle without ever losing its shape — the everyday bag for people who carry their whole day with them.',
    features: ['Fits a 14" laptop', 'Magnetic top closure', 'Suede-lined interior', 'Dual carry handles'],
    images: [
      { color: '#111111', img: realA855 },
      { color: '#111111', img: realSimbi3 },
      { color: '#111111', img: realA851 },
    ],
  },
  {
    id: 'st', name: 'STRUCTURED TOTE', price: 1560, img: realA867,
    material: 'Full-grain leather', dimensions: '38 × 28 × 14 cm',
    desc: 'Our most architectural piece. Panelled walls and a hidden frame give the Structured Tote a crisp silhouette that holds its lines for a lifetime — the definitive work bag.',
    features: ['Hidden internal frame', 'Brass feet on base', 'Zip pocket + key leash', 'Hand-stitched handles'],
    images: [
      { color: '#111111', img: realA867 },
      { color: '#111111', img: realA859 },
      { color: '#111111', img: realSimbi },
    ],
  },
]

const aureliaDesc = 'The Aurelia is the AUK signature tote — clean lines, one uninterrupted panel of full-grain leather and a spacious interior that swallows a day without bulging. Designed to be carried every day for decades.'

export const popularRow1 = [
  {
    id: 'aurelia', name: 'AURELIA TOTE', price: 1240, img: realSimbi1, large: true,
    material: 'Full-grain leather', dimensions: '38 × 28 × 14 cm',
    desc: aureliaDesc,
    features: ['Spacious main compartment', 'Interior zip pocket', 'Soft microfiber lining', 'Handcrafted construction'],
  },
  {
    id: 'aurelia2', name: 'AURELIA TOTE', price: 1340, img: realA872,
    material: 'Full-grain leather', dimensions: '40 × 30 × 15 cm',
    desc: aureliaDesc + ' This edition comes in our larger weekend proportion.',
    features: ['Weekend-size interior', 'Reinforced handles', 'Solid brass hardware', 'Handcrafted construction'],
  },
  {
    id: 'aurelia3', name: 'AURELIA TOTE', price: 1340, img: realA853,
    material: 'Full-grain leather', dimensions: '38 × 28 × 14 cm',
    desc: aureliaDesc,
    features: ['Spacious main compartment', 'Contrast edge paint', 'Interior organiser', 'Handcrafted construction'],
  },
]

export const popularRow2 = [
  {
    id: 'luxe', name: 'LUXEJOIE BAG', price: 1340, img: realA851,
    material: 'Full-grain leather', dimensions: '28 × 20 × 10 cm',
    desc: 'Compact but commanding, the Luxejoie is our evening piece — a firm little rectangle with a short drop handle meant to be held in the crook of the arm.',
    features: ['Firm structured body', 'Short arm-carry handle', 'Twist-lock closure', 'Suede-lined interior'],
  },
  {
    id: 'elara', name: 'ELARA BAG', price: 1540, img: realSimbi2,
    material: 'Full-grain leather', dimensions: '32 × 24 × 12 cm',
    desc: 'The Elara balances softness and structure — gently rounded panels, a protected zip opening and a strap long enough to wear crossbody through the whole city.',
    features: ['Rounded soft panels', 'Crossbody strap included', 'Protected zip opening', 'Hand-painted edges'],
  },
  {
    id: 'aurelia4', name: 'AURELIA TOTE', price: 940, img: realA830,
    material: 'Full-grain leather', dimensions: '34 × 26 × 13 cm',
    desc: aureliaDesc + ' Our compact edition, in black.',
    features: ['Compact everyday size', 'Magnetic closure', 'Soft microfiber lining', 'Handcrafted construction'],
  },
]

export const craftRows = [
  { n: '01', t: 'MATERIALS', img: realA869, desc: 'Full-grain leathers, solid brass hardware, and microfiber linings selected for decades of use.' },
  { n: '02', t: 'CUSTOM DESIGN', img: realA825, desc: 'Every bag is made to match your personal style and preferences. You can choose the size, color, and details that suit you best.' },
  { n: '03', t: 'TIMELESS QUALITY', img: realSimbi, desc: 'Reinforced stitching, hand-painted edges, and rigorous quality control ensure lasting beauty.' },
  { n: '04', t: 'HANDCRAFTED', img: realA828, desc: 'Cut, stitched and finished by hand in our Kigali atelier — one craftsman with one bag from first cut to final stitch.' },
]

// The Making — craftsmanship process strip shown in the Craftsmanship section
export const makingSteps = [
  {
    n: '01', t: 'THE MATERIAL', img: realA835, alt: 'Suede leather and engraved wooden panel detail',
    desc: 'Full-grain leather, suede and solid brass — chosen by hand, never from a catalogue.',
  },
  {
    n: '02', t: 'THE STITCH', img: realA848, alt: 'Hand saddle-stitched seams on brown suede',
    desc: 'Every seam is saddle-stitched by hand — two needles, one thread, no shortcuts.',
  },
  {
    n: '03', t: 'THE FINISH', img: realA828, alt: 'Finished AUK satchel with wooden side panel',
    desc: 'Edges painted, wood engraved, brass set — then a final check before a bag leaves the atelier.',
  },
]

// Every product in the catalogue — used to rehydrate saved carts after a rebuild
// (asset URLs are content-hashed, so we never persist them).
export const allProducts = [...signature, ...popularRow1, ...popularRow2]
