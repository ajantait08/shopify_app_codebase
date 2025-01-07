import React from 'react';
import { Card, Page, Text , Layout, Button } from '@shopify/polaris';
import { Link } from '@remix-run/react';
import { TitleBar } from '@shopify/app-bridge-react';

export default function BulkOperations(){
    return (
    <Page>
        <TitleBar title="Bulk Operations" />
           <Layout>
            <Layout.Section>
                <Card>
                    <Text as="h4" variant="headingMd">
                        Export
                    </Text>
                    <br />
                    <Text as="h6">
                    You will be able to select the particular data items to export
                    </Text>
                    <br />
                    <Link to="/app/exportform">
                    <Button variant="primary">New Export</Button>
                    </Link>
                </Card>
            </Layout.Section>
           </Layout>
    </Page>
    );
}