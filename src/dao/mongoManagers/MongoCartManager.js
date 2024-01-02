import cartModel from '../models/carts.model.js';
import productModel from '../models/products.model.js';

class MongoCartManager {

    getCarts = async () => {
        const carts = await cartModel.find()
        return carts;
    }

    getCartByID = async (cid) => {
        const cart = await cartModel.find({_id:cid})
        return cart;
    }

    createCart = async () => {
        const cart = await cartModel.create();
        return cart;
    }

    addProductToCart = async (cid, pid, quantity = 1) => {
        const cart = await cartModel.findOne({_id:cid});
        if (!cart){
            return {
                status: "error",
                msg: `El carrito con el id ${cid} no existe`
            } 
        };
        const product = await productModel.findOne({_id:pid});
        if (!product){
            return {
                status: "error",
                msg: `El producto con el id ${pid} no existe`
            } 
        };

        let productsInCart = cart.products;
        
        const indexProduct = productsInCart.findIndex((product)=> product.product == pid );

        if(indexProduct == -1){
            const newProduct = {
                product: pid,
                quantity: quantity
            }
            cart.products.push(newProduct);
        }else{
            cart.products[indexProduct].quantity += quantity;
        }

        await cart.save();
        
        return cart;
    
    }

    deleteCart = async (cid, pid) => {
        const cart = await cartModel.findOne({_id:cid});
        if (!cart){
            return {
                status: "error",
                msg: `El carrito con el id ${cid} no existe`
                
            } 
        };
        const product = await productModel.findOne({_id:pid});
        if (!product){
            return {
                status: "error",
                msg: `El producto con el id ${pid} no existe`
            } 
        };

        let productsInCart = cart.products;
        
        const indexProduct = productsInCart.findIndex((product)=> product.product == pid );

        if(indexProduct == -1){
            return {
                status: "error",
                msg: `El producto con el id ${pid} no existe en el carrito con el id ${cid}`
            } 
        }else{
            cart.products.splice(indexProduct,1);
        }

        await cart.save();
        
        return cart;
    
    }

    updateCart = async (cid) => {
        const cart = await cartModel.findOne({_id:cid});
        if (!cart){
            return {
                status: "error",
                msg: `El carrito con el id ${cid} no existe`
            } 
        };

        await cart.save();
        
        return cart;
    
    }


}

export default MongoCartManager;