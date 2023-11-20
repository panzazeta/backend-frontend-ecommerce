import { faker } from "@faker-js/faker";

const modelProduct = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.number.int(),
        category: faker.commerce.department(),
        status: faker.datatype.boolean(),
        code: faker.commerce.isbn()
    }
}

export const createProducts = () => {
    const products = [];
    for (let i = 0 ; i < 3 ; i++) {
        products.push(modelProduct());
    }
    return products
}

// console.log(createProducts())