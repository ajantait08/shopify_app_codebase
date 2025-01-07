import {LegacyCard, EmptyState,IndexTable,useIndexResourceState,Text,Badge} from '@shopify/polaris';
import React from 'react';
import {authenticate} from '../shopify.server';
import db from '../db.server';
import { useLoaderData } from '@remix-run/react';
import {json} from "@remix-run/node";
import {formatDistanceToNow , parseISO} from 'date-fns';

export const loader = async({request}) => {
  const auth = await authenticate.admin(request);
  const shop = auth.session.shop;
  console.log('shop: -------->',shop);
  console.log('appurl',process.env.SHOPIFY_APP_URL);
  

  const wishlistData = await db.wishlist.findMany({
     where : {
        shop :shop
     },
     orderBy : {
        id : 'asc'
     }
  });

  console.log('wishlistData:------>',wishlistData);
  return json(wishlistData)
};

export default function WishlistData(){
    const wishlistData = useLoaderData();
    const resourceName = {
        singular: 'wishlistData',
        plural: 'wishlistData',
      };
    const {selectedResources, allResourcesSelected, handleSelectionChange} =
      useIndexResourceState(wishlistData);
      if(wishlistData != ''){
    const rowMarkup = wishlistData.map(
      (
        {id,customerId , productId , shop , createdAt},
        index,
      ) => (
        <IndexTable.Row
          id={id}
          key={id}
          selected={selectedResources.includes(id)}
          position={index}
        >
          
          <IndexTable.Cell>{customerId}</IndexTable.Cell>
          <IndexTable.Cell>{productId}</IndexTable.Cell>
          <IndexTable.Cell>{shop}</IndexTable.Cell>
          <IndexTable.Cell>{createdAt}</IndexTable.Cell>
        </IndexTable.Row>
      ),
    );

  
    return (
      <LegacyCard>
        <IndexTable
          resourceName={resourceName}
          itemCount={wishlistData.length}
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            {title: 'Customer'},
            {title: 'Product'},
            {title: 'Shop'},
            {title: 'Date'}
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </LegacyCard>
    );
  }
  else {
  return (
    <LegacyCard sectioned>
      <EmptyState
        heading="Manage your inventory transfers"
        action={{content: 'Add transfer'}}
        secondaryAction={{
          content: 'Learn more',
          url: 'https://help.shopify.com',
        }}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p>Track and receive your incoming inventory from suppliers.</p>
      </EmptyState>
    </LegacyCard>
  );
    }
}