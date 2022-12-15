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
      </Suspense>sssw
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

console.log('here--------------------------')
  // a document instance
  const data3 = {
    name: jsonBody.name,
    description: jsonBody.description,
    startDate: jsonBody.startDate,
    links: jsonBody.links,
    location: jsonBody.location,
    city: jsonBody.city,
    userId: jsonBody.userId,
    approved: false,
  };

  try {
    var data2 = {
      collection: 'events',
      database: 'test',
      dataSource: 'Cluster0',
      document: data3,
    };

    var config2 = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'api-key':
          't0FA8t5vlbggADy0PP0ZE3voJkCvQm8w0ux7PFHTtykkQEDOeWvY6DIzEML9z6dG',
      },
      body: JSON.stringify(data2),
    };
    const res = await fetch(
      'https://data.mongodb-api.com/app/data-iobky/endpoint/data/v1/action/insertOne',
      config2,
    );

    return new Response(null, {
      status: 203,

    })
const data = await res.json()
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
  } catch (error) {
    return JSON.stringify(error);
  }




}


