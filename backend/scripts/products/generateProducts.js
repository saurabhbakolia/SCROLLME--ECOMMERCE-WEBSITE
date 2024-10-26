const { faker } = require('@faker-js/faker');
const fs = require('node:fs');
const existingData = require('./products.json');

// Array of possible colors
const colors = [
  'Red',
  'Green',
  'Blue',
  'Yellow',
  'Orange',
  'Purple',
  'Pink',
  'Brown',
  'Black',
  'White',
];
const sizes = [38, 39, 40, 42, 44];


const generateProductFromJson = (jsonData) => {
  return {
    name: jsonData.product_name || faker.commerce.productName(),
    description: jsonData.meta_description || faker.lorem.paragraph(),
    price: jsonData.marked_price || Number.parseFloat(faker.number.int({ min: 1200, max: 5600 })),
    discounted_price: jsonData.discounted_price || Number.parseFloat(faker.number.int({ min: 50, max: 4000 })),
    category: jsonData.brand_tag || faker.commerce.department(),
    stock: faker.number.int({ min: 0, max: 100 }),
    imageUrl: jsonData.img_link || `https://via.placeholder.com/150?text=${faker.commerce.productName()}`,
    brand: jsonData.brand_tag || faker.company.name(),
    weight: Number.parseFloat((Math.random() * 10 + 1).toFixed(2)),
    dimensions: {
      length: Number.parseFloat(faker.number.int({ min: 1, max: 100 })),
      width: Number.parseFloat(faker.number.int({ min: 1, max: 100 })),
      height: Number.parseFloat(faker.number.int({ min: 1, max: 100 })),
    },
    material: faker.commerce.productMaterial(),
    color: colors[Math.floor(Math.random() * colors.length)],
    sizes: sizes.filter(() => Math.random() < 0.5), // Random selection of sizes
    tags: jsonData.tags || faker.commerce.productAdjective().split(' '), // Generating some random words as tags
    ratings: {
      averageRating: jsonData.rating || Number.parseFloat(faker.number.int({ min: 1, max: 5, precision: 0.1 })),
      numberOfReviews: jsonData.rating_count || faker.number.int({ min: 0, max: 500 }),
    },
    isActive: faker.datatype.boolean(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  };
};

// Generate an array of 200 products
const products = existingData.map(generateProductFromJson);
// const products = Array.from({ length: 1000 }, createProduct);

// Write the JSON to a file
fs.writeFile('generatedProducts.json', JSON.stringify(products, null, 2), (err) => {
  if (err) throw err;
  console.log('products.json has been saved!');
});
