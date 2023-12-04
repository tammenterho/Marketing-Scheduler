import { Campaign } from './Campaign';

export const CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    owner: 123456789,
    name: 'Summer Campaign Boats',
    adTitle: 'Now cheaper boats than ever!',
    adText:
      'Come see our boats! They are very cheap and cool. You can also call us if you need a boat. p. 0400 123456',
    adTarget: 'boatpeople age 50+',
    adArea: 'Turku area',
    adBudget: 500,
    adDuration: {
      start: new Date(2023, 4, 5), // Huomaa, että kuukaudet alkavat nollasta (toukokuu on 4)
      end: new Date(2023, 4, 20),
    },
    mediaInfo: 'create a image with our logo and with text: nice boats here!',
    adUrl: 'www.niceboats.fi',
    adOther: 'img has to have our both logos',
    adStatus: true,
  },
  {
    id: 2,
    owner: 987654321,
    name: 'Winter Campaign Ski Equipment',
    adTitle: 'Get ready for the snow!',
    adText:
      'Check out our ski equipment! We have everything you need for a great winter adventure. Call us at 0400 987654.',
    adTarget: 'skiers and snowboarders of all ages',
    adArea: 'Northern regions',
    adBudget: 750,
    adDuration: {
      start: new Date(2023, 5, 5), // Huomaa, että kuukaudet alkavat nollasta (toukokuu on 4)
      end: new Date(2023, 5, 25),
    },
    mediaInfo:
      'Show skiers having fun in the snow with our equipment. Use our logo and slogan: "Ski Your Heart Out!"',
    adUrl: 'www.skifunland.com',
    adOther: 'Include our brand logos in the image.',
    adStatus: false,
  },
  {
    id: 3,
    owner: 555555555,
    name: 'Spring Campaign Gardening Tools',
    adTitle: 'Upgrade your garden!',
    adText:
      'Explore our gardening tools! We offer high-quality tools for your gardening needs. Call us at 0400 555555.',
    adTarget: 'gardeners and homeowners',
    adArea: 'Nationwide',
    adBudget: 600,
    adDuration: {
      start: new Date(2023, 4, 1), // Huomaa, että kuukaudet alkavat nollasta (toukokuu on 4)
      end: new Date(2023, 5, 1),
    },
    mediaInfo:
      'Show a beautiful garden with our tools in action. Use our logo and tagline: "Grow with Us!"',
    adUrl: 'www.gardenmasters.com',
    adOther: 'Incorporate our brand logos into the image.',
    adStatus: false,
  },
  {
    id: 4,
    owner: 111111111,
    name: 'Holiday Campaign Travel Packages',
    adTitle: 'Book your dream vacation!',
    adText:
      'Plan your dream vacation with our travel packages. Call us at 0400 111111 for inquiries.',
    adTarget: 'travel enthusiasts',
    adArea: 'Worldwide',
    adBudget: 1000,
    adDuration: {
      start: new Date(2023, 4, 15), // Huomaa, että kuukaudet alkavat nollasta (toukokuu on 4)
      end: new Date(2023, 4, 29),
    },
    mediaInfo:
      'Feature stunning travel destinations in our ads. Use our logo and motto: "Explore the World!"',
    adUrl: 'www.traveladventures.com',
    adOther: 'Include our brand logos in the image.',
    adStatus: false,
  },
];
