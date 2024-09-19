const { faker } = require('@faker-js/faker');
const fs = require('node:fs');

// Array of possible colors
const colors = [
    'Red', 'Green', 'Blue', 'Yellow', 'Orange', 'Purple', 'Pink', 'Brown', 'Black', 'White'
];

// Function to create a product
function createProduct() {
    return {
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        price: Number.parseFloat(faker.commerce.price()),
        category: faker.commerce.department(),
        stock: faker.number.int({ min: 0, max: 100 }),
        imageUrl: `https://via.placeholder.com/150?text=${faker.commerce.productName()}`,
        brand: faker.company.name(),
        weight: Number.parseFloat((Math.random() * 10 + 1).toFixed(2)),
        dimensions: {
            length: Number.parseFloat(faker.number.int({ min: 1, max: 100 })),
            width: Number.parseFloat(faker.number.int({ min: 1, max: 100 })),
            height: Number.parseFloat(faker.number.int({ min: 1, max: 100 })),
        },
        material: faker.commerce.productMaterial(),
        color: colors[Math.floor(Math.random() * colors.length)],
        ratings: {
            averageRating: Number.parseFloat(faker.number.int({ min: 1, max: 5, precision: 0.1 })),
            numberOfReviews: faker.number.int({ min: 0, max: 500 }),
        },
        isActive: faker.datatype.boolean(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
    };
}

// Generate an array of 200 products
const products = Array.from({ length: 1000 }, createProduct);

// Write the JSON to a file
fs.writeFile('products.json', JSON.stringify(products, null, 2), (err) => {
    if (err) throw err;
    console.log('products.json has been saved!');
});
