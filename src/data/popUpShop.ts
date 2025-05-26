export type PopUpItem = {
  id: string;
  title: string;
  description: string;
  ingredients: string;
  price: number;
  image: string;
  available: number;
};

export type PopUpEvent = {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  description: string;
  imageSrc: string;
  fullDescription: string;
  mapLocation: string;
  items: PopUpItem[];
};

export const POP_UP_EVENTS: PopUpEvent[] = [
  {
    id: 1,
    title: 'Downtown Market Pop-up',
    location: '123 Market Street, Downtown',
    date: '2024-04-15',
    time: '10:00 AM - 4:00 PM',
    description: 'Join us at the vibrant downtown market for fresh sourdough bread and pastries.',
    imageSrc: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop',
    fullDescription: 'Experience the warmth and aroma of freshly baked bread at our downtown market pop-up. We\'ll be featuring our signature sourdough varieties, artisanal pastries, and special market-day treats. Come early for the best selection, as our products tend to sell out quickly!',
    mapLocation: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71774937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2sBrooklyn%20Bridge!5b1!3m2!1sen!2sus!4v1579814256969!5m2!1sen!2sus',
    items: [
      {
        id: 'market-sourdough',
        title: 'Market Special Sourdough',
        description: 'Our signature sourdough with a market-day twist',
        ingredients: 'Organic flour, water, salt, market-fresh herbs',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=1000&auto=format&fit=crop',
        available: 20
      },
      {
        id: 'market-croissant',
        title: 'Artisanal Croissants',
        description: 'Flaky, buttery croissants made fresh for the market',
        ingredients: 'Organic flour, French butter, milk, eggs',
        price: 3.99,
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop',
        available: 30
      }
    ]
  },
  {
    id: 2,
    title: 'Farmers Market Special',
    location: '456 Farm Road, Countryside',
    date: '2024-04-22',
    time: '8:00 AM - 2:00 PM',
    description: 'Experience our artisanal bread selection at the local farmers market.',
    imageSrc: 'https://images.unsplash.com/photo-1556471013-0001958d2f12?q=80&w=1000&auto=format&fit=crop',
    fullDescription: 'Join us at the local farmers market for a special selection of our artisanal breads. We\'ll be bringing our popular country loaf, whole grain varieties, and seasonal specials. Perfect opportunity to pair our breads with fresh local produce!',
    mapLocation: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71774937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2sBrooklyn%20Bridge!5b1!3m2!1sen!2sus!4v1579814256969!5m2!1sen!2sus',
    items: [
      {
        id: 'farmers-rye',
        title: 'Farmers Market Rye',
        description: 'Dense and flavorful rye bread perfect for the farmers market',
        ingredients: 'Organic rye flour, water, salt, caraway seeds',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=1000&auto=format&fit=crop',
        available: 15
      },
      {
        id: 'farmers-focaccia',
        title: 'Garden Herb Focaccia',
        description: 'Focaccia topped with fresh herbs from local farmers',
        ingredients: 'Organic flour, olive oil, fresh herbs, sea salt',
        price: 6.99,
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop',
        available: 25
      }
    ]
  }
]; 