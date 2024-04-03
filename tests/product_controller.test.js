const { container, setup } = require('../di-setup/container');

setup()

const ProductController = container.resolve('ProductController')


//postProducts and getProducts tests
const mockProduct = {
    body: {
        name: "galaxy авививив",
        description: "good",
        price: 50999,
        picture: 'phone',
    }
};

let mockNewProduct = {
    body: {
        name: "iphone 15",
        description: "norm",
        price: 32000,
        picture: 'phone',
    },
    params: {
        productId: "4ba0d384-0bbd-46eb-b21b-c38d09045fb2"
    }
};
let mockProductId = {
    params: {
        productId: "4ba0d384-0bbd-46eb-b21b-c38d09045fb2"
    }
}

describe('ProductController', () => {

    it('should add and return products', async () => {
        const mockResponse = jest.fn().mockReturnValue({ json: jest.fn() });
        const res = mockResponse();

        const mockRespon = jest.fn().mockReturnValue({ json: jest.fn() });
        const response = mockRespon();

        await ProductController.postProducts(mockProduct, response)

        const productList = await ProductController.getProducts(null, res);

        const lastElement = productList[productList.length - 1];

        expect(lastElement.name).toBe(mockProduct.body.name);
        expect(lastElement.description).toBe(mockProduct.body.description);
        expect(lastElement.picture).toBe(mockProduct.body.picture);
        expect(lastElement.price).toBe(mockProduct.body.price);
    });

    it('should handle errors gracefully', async () => {
        const mockProductModelWithError = {
            getProducts: async () => {
                throw new Error('Failed to retrieve products');
            }
        }

        const productController = {
            ProductModel: mockProductModelWithError
        };

        const mockResponse = jest.fn().mockReturnValue({ json: jest.fn() });
        const res = mockResponse();

        try {
            await productController.ProductModel.getProducts(null, res);
        } catch (error) {
            expect(res.json).not.toHaveBeenCalled();
            expect(error.message).toBe('Failed to retrieve products');
        }
    });

    it('should update product status', async () => {
        const mockResponse = jest.fn().mockReturnValue({ json: jest.fn() });
        const res = mockResponse();

        const mockRespon = jest.fn().mockReturnValue({ json: jest.fn() });
        const response = mockRespon();

        const products = await ProductController.getProducts(null, res);

        const lastElement = products[products.length - 1];

        mockNewProduct.params.productId = lastElement.uuid

        await ProductController.changeProduct(mockNewProduct, response)
        const changedProduct = await ProductController.getProductswithId(mockNewProduct, response)

        console.log(changedProduct)

        expect(changedProduct[0].uuid).toBe(mockNewProduct.params.productId);
        expect(changedProduct[0].name).toBe(mockNewProduct.body.name);
        expect(changedProduct[0].description).toBe(mockNewProduct.body.description);
        expect(changedProduct[0].picture).toBe(mockNewProduct.body.picture);
        expect(changedProduct[0].price).toBe(mockNewProduct.body.price);
    });

    it('should handle errors gracefully (change product)', async () => {
        const mockProductWithError = {
            changeProduct: async () => {
                throw new Error('Failed to retrieve products');
            }
        }
        const mockResponse = jest.fn().mockReturnValue({ json: jest.fn() });
        const res = mockResponse();


        try {
            const ProductController = {
                ProductModel: mockProductWithError
            };

            await expect(ProductController.ProductModel.changeProduct(mockNewProduct, res)).rejects.toThrowError('Failed to retrieve products');
        } catch (error) {
            expect(res.json).not.toHaveBeenCalled();
            expect(error.message).toBe('Failed to retrieve products');
        }
    });

    it('should delete product', async () => {
        const mockResponse = jest.fn().mockReturnValue({ json: jest.fn() });
        const res = mockResponse();

        const mockRespon = jest.fn().mockReturnValue({ json: jest.fn() });
        const response = mockRespon();

        const mockRes = jest.fn().mockReturnValue({ json: jest.fn() });
        const resp = mockRespon();

        const products = await ProductController.getProducts(null, res);

        const lastElement = products[products.length - 1];
        
        mockProductId.params.productId = lastElement.uuid

        await ProductController.deleteProduct(mockProductId, resp)


        const product = await ProductController.getProductswithId(mockProductId, res);
        expect(JSON.stringify(product)).toBe(JSON.stringify([]));
    });
});




