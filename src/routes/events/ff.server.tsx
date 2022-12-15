import {Suspense} from 'react';
import {
  CacheNone,
  Seo,
  gql,
  useSession,
  useShopQuery,
  type HydrogenRequest,
  type HydrogenApiRouteOptions,
  type HydrogenRouteProps,
} from '@shopify/hydrogen';

import type {
  Collection,
  CollectionConnection,
  Customer,
  MailingAddress,
  Order,
  Product,
  ProductConnection,
} from '@shopify/hydrogen/storefront-api-types';

import {Layout} from '~/components/index.server';

import {EventCreateForm} from '~/components';
/* import main from '../../database/connection'; */
/* import EventModel, {eventSchema} from '../../database/schema';
 */



const QUERY = gql`
  query ShopName($customerAccessToken: String!) {
    shop {
      name
    }
    customer(customerAccessToken: $customerAccessToken) {
      email
      id
    }
  }
`;

export default function Register({response}: HydrogenRouteProps) {
  response.cache(CacheNone());
  const {customerAccessToken} = useSession();
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      customerAccessToken,
    },
  });
/*   console.log('data..............', data)
 */

  return (
    <Layout>
      <Suspense>
        <Seo type="noindex" data={{title: 'Register'}} />
      </Suspense>sss
      <EventCreateForm userId={data?.customer?.id} />
    </Layout>
  );
}

export async function api(
  request: HydrogenRequest,
  {queryShop}: HydrogenApiRouteOptions,
) {
  const jsonBody = await request.json();
  /* console.log('dd', request); */
  if (!jsonBody.name || !jsonBody.description) {
    return new Response(
      JSON.stringify({error: 'Name and description are required'}),
      {status: 400},
    );
  }
  main().catch((e) => console.error(e));
console.log('here--------------------------')
  // a document instance
  const ee = new EventModel({
    name: jsonBody.name,
    description: jsonBody.description,
    startDate: jsonBody.startDate,
    links: jsonBody.links,
    location: jsonBody.location,
    city: jsonBody.city,
    userId: jsonBody.userId,
    approved: false,
  });

  const data = await ee.save();

  const errorMessage = null; //getApiErrorMessage('customerCreate', data, errors);

  if (!errorMessage && data) {
    return new Response(null, {
      status: 200,
    });
  } else {
    return new Response(
      JSON.stringify({
        error: errorMessage ?? 'Unknown error',
      }),
      {status: 401},
    );
  }
}

const CUSTOMER_QUERY = gql`
  query CustomerDetails($customerAccessToken: String!)
  @inContext() {
    customer(customerAccessToken: $customerAccessToken) {
      firstName
    }
  }
`;
