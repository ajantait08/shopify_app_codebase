import { redirect } from "@remix-run/node";
import { authenticate, MONTHLY_PLAN , ANNUAL_PLAN } from "../shopify.server";

export const loader = async ({ request }) => {
  const { billing , session } = await authenticate.admin(request);
  const {shop} = session;
  const myShop = shop.replace(".myshopify.com","");
  await billing.require({
    plans: [MONTHLY_PLAN],
    onFailure: async () => billing.request({
      plan: MONTHLY_PLAN,
      isTest: true,
      returnUrl: `https://admin.shopify.com/store/${process.env.APP_NAME}/apps/${myShop}/app/pricing`,
    }),
  });
  // App logic
};