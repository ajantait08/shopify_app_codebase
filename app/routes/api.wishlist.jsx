import {json} from "@remix-run/node";
import db from "../db.server";
import { cors } from "remix-utils/cors";

export async function loader({request}) {
    // Parse the URL and extract query parameters
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // Get specific query parameters
    const customerId = searchParams.get('customerId');
    const productId = searchParams.get('productId');
    const shop = searchParams.get('shop');
    // get data from database
    // const settings = {    
    //     customerId: customerId,
    //     productId : productId,
    //     shop : shop
    // }

    const wishlistItem = await db.wishlist.findFirst({
        where: {
          customerId: customerId,
          productId: productId,
          shop: shop,
        },
      });

    //return json(settings);
    const response = json({message : 'Product Found' , wishlistItem : wishlistItem});
    return cors(request,response);
  }

export async function action({request}){
    const method = request.method;
    let data = await request.formData();   
    data = Object.fromEntries(data);
    const customerId = data.customerId;
    const productId = data.productId;
    const shop = data.shop;
    const _action = data._action;

    if(customerId=='' || productId=='' || shop=='' || _action == ''){
        return json({
            message : "Missing data.Required data : customerId , productId , shop , _action",
            method : _action
        });
    }

    let response;

    switch(_action){
       
        case "CREATE":
            const wishlist = await db.wishlist.create({
                data : {
                    customerId,
                    productId,
                    shop
                }
            });
            response = json({message : "Product added to wishlist",method : _action, wishlist : wishlist});
            return cors(request,response);
        case "UPDATE":
            return json({message:"Success",method : "PATCH"});
        case "DELETE":
            await db.wishlist.deleteMany({
                where : {
                    customerId : customerId,
                    shop : shop,
                    productId : productId
                }
            });
            response =  json({message:"Product removed from your wishlist",method: _action,wishlisted:false});
            return cors(request,response);
        default:
            return new Response('Method Not Allowed',{status:405});    
    }
}