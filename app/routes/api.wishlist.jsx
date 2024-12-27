import {json} from "@remix-run/node";
import db from "../db.server";
import { cors } from "remix-utils/cors";

export async function loader() {
    // get data from database
    const settings = {
        name: "My app 1",
        description: "My app description new"
    }
    return json(settings);
  }

export async function action({request}){
    const method = request.method;
    let data = await request.formData();   
    data = Object.fromEntries(data);
    const customerId = data.customerId;
    const productId = data.productId;
    const shop = data.shop

    if(customerId=='' || productId=='' || shop==''){
        return json({
            message : "Missing data.Required data : customerId , productId , shop",
            method : method
        });
    }
    switch(method){
        case "POST":
            const wishlist = await db.wishlist.create({
                data : {
                    customerId,
                    productId,
                    shop
                }
            });
            const response = json({message : "Product added to wishlist",method : "POST", wishlist : wishlist});
            return cors(request,response);
        case "PATCH":
            return json({message:"Success",method : "PATCH"});
        default:
            return new Response('Method Not Allowed',{status:405});    
    }
}