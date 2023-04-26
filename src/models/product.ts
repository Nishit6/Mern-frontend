class Product {
    name: string;
    desc: string;
    Id: number;
    img: string;
    price: string;
    quantity: number;
    username: string;
    email: string;
    isLoggedIn: boolean

    constructor(productName: string, productDesc: string, productId: number, isLoggedIn: boolean, username: string, email: string, productPrice: string, productQuantity: number, productImg: string) {
        this.name = productName;
        this.desc = productDesc;
        this.img = productImg,
            this.quantity = productQuantity,
            this.price = productPrice
        this.Id = productId;
        this.isLoggedIn = isLoggedIn;
        this.username = username;
        this.email = email
    }
}

export default Product;