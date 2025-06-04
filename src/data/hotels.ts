
import { Hotel } from '@/contexts/BookingContext';

export const DUMMY_HOTELS: Hotel[] = [
  {
    id: "h001",
    name: "Grand Palace Hotel",
    city: "Paris",
    country: "France",
    rating: 4.8,
    price: 250,
    currency: "EUR",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500",
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym", "Room Service"],
    description: "Luxurious 5-star hotel in the heart of Paris with stunning city views.",
    address: "123 Champs-Élysées, 75008 Paris, France",
    category: "Luxury"
  },
  {
    id: "h002",
    name: "Ocean View Resort",
    city: "Miami",
    country: "USA",
    rating: 4.6,
    price: 180,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=500",
    amenities: ["Beach Access", "Pool", "WiFi", "Restaurant", "Bar", "Parking"],
    description: "Beachfront resort with spectacular ocean views and modern amenities.",
    address: "456 Ocean Drive, Miami Beach, FL 33139, USA",
    category: "Resort"
  },
  {
    id: "h003",
    name: "Mountain Lodge Retreat",
    city: "Aspen",
    country: "USA",
    rating: 4.7,
    price: 320,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500",
    amenities: ["Ski Access", "Fireplace", "WiFi", "Restaurant", "Spa", "Hot Tub"],
    description: "Cozy mountain lodge perfect for skiing and winter activities.",
    address: "789 Mountain View Dr, Aspen, CO 81611, USA",
    category: "Lodge"
  },
  {
    id: "h004",
    name: "City Center Business Hotel",
    city: "New York",
    country: "USA",
    rating: 4.4,
    price: 199,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?w=500",
    amenities: ["WiFi", "Business Center", "Gym", "Restaurant", "Concierge", "Parking"],
    description: "Modern business hotel in Manhattan's financial district.",
    address: "321 Wall Street, New York, NY 10005, USA",
    category: "Business"
  },
  {
    id: "h005",
    name: "Boutique Charm Hotel",
    city: "London",
    country: "UK",
    rating: 4.5,
    price: 160,
    currency: "GBP",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500",
    amenities: ["WiFi", "Library", "Restaurant", "Bar", "Room Service", "Concierge"],
    description: "Charming boutique hotel in the heart of London's West End.",
    address: "456 Piccadilly, London W1J 0DS, UK",
    category: "Boutique"
  },
  {
    id: "h006",
    name: "Desert Oasis Resort",
    city: "Dubai",
    country: "UAE",
    rating: 4.9,
    price: 400,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500",
    amenities: ["Pool", "Spa", "Golf Course", "WiFi", "Multiple Restaurants", "Butler Service"],
    description: "Ultra-luxury resort in the heart of Dubai with world-class amenities.",
    address: "123 Sheikh Zayed Road, Dubai, UAE",
    category: "Ultra-Luxury"
  },
  {
    id: "h007",
    name: "Sakura Garden Hotel",
    city: "Tokyo",
    country: "Japan",
    rating: 4.3,
    price: 140,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1580041065738-e72023775cdc?w=500",
    amenities: ["WiFi", "Traditional Spa", "Restaurant", "Garden View", "Tea Service"],
    description: "Traditional Japanese hotel with modern comforts in Shibuya.",
    address: "789 Shibuya Crossing, Tokyo 150-0043, Japan",
    category: "Traditional"
  },
  {
    id: "h008",
    name: "Alpine View Hotel",
    city: "Zurich",
    country: "Switzerland",
    rating: 4.6,
    price: 280,
    currency: "CHF",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500",
    amenities: ["Mountain View", "WiFi", "Restaurant", "Spa", "Ski Storage", "Concierge"],
    description: "Elegant hotel with breathtaking Alpine views and Swiss hospitality.",
    address: "321 Bahnhofstrasse, 8001 Zurich, Switzerland",
    category: "Mountain"
  },
  {
    id: "h009",
    name: "Tropical Paradise Resort",
    city: "Bali",
    country: "Indonesia",
    rating: 4.7,
    price: 120,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500",
    amenities: ["Beach Access", "Pool", "Spa", "WiFi", "Restaurant", "Water Sports"],
    description: "Stunning beachfront resort in Bali with tropical gardens.",
    address: "456 Seminyak Beach, Bali 80361, Indonesia",
    category: "Beach Resort"
  },
  {
    id: "h010",
    name: "Historic Castle Hotel",
    city: "Edinburgh",
    country: "Scotland",
    rating: 4.4,
    price: 190,
    currency: "GBP",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=500",
    amenities: ["Historic Architecture", "WiFi", "Restaurant", "Bar", "Library", "Tour Guide"],
    description: "Historic castle converted into a luxury hotel with period furnishings.",
    address: "123 Royal Mile, Edinburgh EH1 2NG, Scotland",
    category: "Historic"
  }
];

// Generate additional hotels to reach 100+ records
const cities = [
  { name: "Barcelona", country: "Spain", currency: "EUR" },
  { name: "Rome", country: "Italy", currency: "EUR" },
  { name: "Sydney", country: "Australia", currency: "AUD" },
  { name: "Toronto", country: "Canada", currency: "CAD" },
  { name: "Berlin", country: "Germany", currency: "EUR" },
  { name: "Amsterdam", country: "Netherlands", currency: "EUR" },
  { name: "Prague", country: "Czech Republic", currency: "CZK" },
  { name: "Vienna", country: "Austria", currency: "EUR" },
  { name: "Stockholm", country: "Sweden", currency: "SEK" },
  { name: "Copenhagen", country: "Denmark", currency: "DKK" },
  { name: "Oslo", country: "Norway", currency: "NOK" },
  { name: "Helsinki", country: "Finland", currency: "EUR" },
  { name: "Lisbon", country: "Portugal", currency: "EUR" },
  { name: "Madrid", country: "Spain", currency: "EUR" },
  { name: "Brussels", country: "Belgium", currency: "EUR" },
  { name: "Warsaw", country: "Poland", currency: "PLN" },
  { name: "Budapest", country: "Hungary", currency: "HUF" },
  { name: "Athens", country: "Greece", currency: "EUR" },
  { name: "Istanbul", country: "Turkey", currency: "TRY" },
  { name: "Bangkok", country: "Thailand", currency: "THB" },
  { name: "Singapore", country: "Singapore", currency: "SGD" },
  { name: "Hong Kong", country: "Hong Kong", currency: "HKD" },
  { name: "Seoul", country: "South Korea", currency: "KRW" },
  { name: "Mumbai", country: "India", currency: "INR" },
  { name: "Delhi", country: "India", currency: "INR" },
  { name: "São Paulo", country: "Brazil", currency: "BRL" },
  { name: "Buenos Aires", country: "Argentina", currency: "ARS" },
  { name: "Mexico City", country: "Mexico", currency: "MXN" },
  { name: "Cairo", country: "Egypt", currency: "EGP" },
  { name: "Cape Town", country: "South Africa", currency: "ZAR" }
];

const hotelTypes = [
  "Grand Hotel", "Plaza Hotel", "Royal Hotel", "Imperial Hotel", "Boutique Hotel",
  "Business Hotel", "City Hotel", "Garden Hotel", "Palace Hotel", "Resort Hotel",
  "Luxury Inn", "Executive Hotel", "Premium Hotel", "Elite Hotel", "Signature Hotel"
];

const amenityGroups = [
  ["WiFi", "Restaurant", "Bar", "Gym", "Pool"],
  ["WiFi", "Spa", "Restaurant", "Room Service", "Concierge"],
  ["WiFi", "Business Center", "Meeting Rooms", "Restaurant", "Parking"],
  ["WiFi", "Pool", "Beach Access", "Water Sports", "Restaurant"],
  ["WiFi", "Ski Access", "Spa", "Restaurant", "Mountain View"],
  ["WiFi", "Airport Shuttle", "Restaurant", "Bar", "Luggage Storage"],
  ["WiFi", "Pet Friendly", "Restaurant", "Garden", "Parking"],
  ["WiFi", "Family Rooms", "Kids Club", "Pool", "Restaurant"]
];

const categories = ["Business", "Luxury", "Boutique", "Resort", "Budget", "Family", "Romantic", "Adventure"];

const images = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=500",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500",
  "https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?w=500",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500",
  "https://images.unsplash.com/photo-1580041065738-e72023775cdc?w=500",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500",
  "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=500"
];

// Generate additional hotels
for (let i = 11; i <= 120; i++) {
  const cityIndex = (i - 11) % cities.length;
  const city = cities[cityIndex];
  const hotelType = hotelTypes[(i - 11) % hotelTypes.length];
  const amenities = amenityGroups[(i - 11) % amenityGroups.length];
  const category = categories[(i - 11) % categories.length];
  const image = images[(i - 11) % images.length];
  
  DUMMY_HOTELS.push({
    id: `h${i.toString().padStart(3, '0')}`,
    name: `${hotelType} ${city.name}`,
    city: city.name,
    country: city.country,
    rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
    price: Math.round(80 + Math.random() * 300),
    currency: city.currency,
    image,
    amenities,
    description: `A wonderful ${category.toLowerCase()} hotel in the heart of ${city.name} offering excellent service and comfort.`,
    address: `${Math.floor(Math.random() * 999) + 1} Main Street, ${city.name}, ${city.country}`,
    category
  });
}

export const searchHotels = (city: string, checkIn: string, checkOut: string, guests: number) => {
  return DUMMY_HOTELS.filter(hotel => 
    hotel.city.toLowerCase().includes(city.toLowerCase()) ||
    hotel.country.toLowerCase().includes(city.toLowerCase())
  ).slice(0, 20); // Return top 20 matches
};

export const getHotelById = (id: string) => {
  return DUMMY_HOTELS.find(hotel => hotel.id === id);
};
