// import ResourcePicker from "@shopify/app-bridge-react";
// import { Page } from "@shopify/polaris";
// import React , { useState } from "react";

// export default function ProductPage(){
//     const [isOpen , setIsOpen] = useState(false);
//     return (
//         <Page 
//            title="Product Selector"
//            primaryAction={{
//              content : "Select product",
//              onAction : () => setIsOpen(true),             
//            }}
//         >
//             <ResourcePicker 
//                 resourceType="Product" 
//                 open={isOpen}
//                 onCancel={() => setIsOpen(false)}
//                 onSelection = {
//                     (payload) => {
//                         setIsOpen(false);
//                         console.log(payload);
//                     }
//                     }
//                  />
//         </Page>
//     )
// }