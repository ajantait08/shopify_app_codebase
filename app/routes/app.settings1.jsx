import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  TextField,
  useBreakpoints,
  Divider,
  Button
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import {useState} from "react";
import {json} from "@remix-run/node";
import {useLoaderData,Form} from "@remix-run/react";

// Import prisma DB
import db from '../db.server'; // db will have access to all models


export async function loader() {
  // get data from database
  const settings = await db.settings.findFirst();
  console.log('settings ----->' , settings);

  return json(settings);
}

// export default function Component() {
//   // renders the UI
// }

export async function action({ request }){
       
     let formdata = Object.fromEntries(await request.formData())
     //return json({name: formdata.name, description: formdata.description});
     // update database
     await db.settings.create({       
        data : {
          name : formdata.name,
          description : formdata.description
        }
     });  
     
     return json(formdata);
}

export default function Settings1Page() {
  //const { smUp } = useBreakpoints();
  const settings = useLoaderData();
  const [formState,setFormState] = useState({});

  
  return (
    <Page>
      <TitleBar title="Settings page" />
      <Layout>
        <Layout.Section>
          <Card>
          <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Settings
              </Text>
              <Text as="p" variant="bodyMd">
                Update app settings and preferences.
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="post">
            <BlockStack gap="400">
              {/* <TextField label="App name" name="name" value={formState.name} onChange={(value) => setFormState({...formState,name:value})} /> */}
              <TextField label="App name" name="name" value={formState?.name} onChange={(value) => setFormState({...formState,name:value})} />
              <TextField label="Description" name="description" value={formState?.description} onChange={(value) => setFormState({...formState,description:value}) } />
              <Button submit={true}>Save</Button>
            </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
        {/*
        {smUp ? <Divider /> : null}
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Dimensions
              </Text>
              <Text as="p" variant="bodyMd">
                Interjambs are the rounded protruding bits of your puzzlie piece
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <TextField label="Horizontal" />
              <TextField label="Interjamb ratio" />
            </BlockStack>
          </Card>
        </InlineGrid> */ }
      </BlockStack>
          </Card>
        </Layout.Section>      
      </Layout>
    </Page>
  );
}


