import {
  useLocalization,
  useShopQuery,
  Seo,
  gql,
  Image,
  useSession,
  CacheLong,
  CacheNone,
  type HydrogenRouteProps,
} from '@shopify/hydrogen';
import type {Blog} from '@shopify/hydrogen/storefront-api-types';
import {Suspense} from 'react';

import {CustomFont, PageHeader, Section, EventCreateForm} from '~/components';
import {Layout, NotFound} from '~/components/index.server';
import {ATTR_LOADING_EAGER} from '~/lib/const';

const BLOG_HANDLE = 'journal';

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

export default function Post({params, response}: HydrogenRouteProps) {

  response.cache(CacheNone());
  const {customerAccessToken} = useSession();
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      customerAccessToken,
    },
  });
  console.log('data..............', data)



  return (
    <Layout>
    fgfgfgfg
    <EventCreateForm userId={data?.customer?.id} />
    </Layout>
  );
}

