import {
  CacheLong,
  useQuery,
  Link,
  type HydrogenRouteProps,
  Seo,
} from '@shopify/hydrogen';

import {Suspense} from 'react';
import mongoose from 'mongoose';
/* import main from '../../database/connection'; */
import {eventSchema} from '../../database/schema';

import {PageHeader, Text} from '~/components';
import {Layout} from '~/components/index.server';

const BLOG_HANDLE = 'Events';

export default function Blog({response}: HydrogenRouteProps) {
  response.cache(CacheLong());

  
 
/*   const data = useQuery(
    ['unique', 'key'], // A string or an array to uniquely identify the query.
    async () => {
      await main();
      /* return await mongoose.model('Events', eventSchema).find();
    }
  );  */


console.log('response', response.url)
  const {data} = useQuery(
    ['unique', 'key'], // A string or an array to uniquely identify the query.
    async () => {
  try {
    const res = await fetch(`${new URL(response.url).origin}/api/events`)
    console.log('ressssss', res)
    const data = await res.json()
    console.log('ssdata', data)
    return data
  } catch (error) {
    return error
  }
 
   
    },
    {
     
    },
  );

  console.log('eventdata', data)

  if(!data){
    return (
      <Layout>
      <Seo type="page" data={{title: 'All Journals'}} />
      <PageHeader heading={BLOG_HANDLE} className="gap-0">
        <Link to="/events/add">
          <Text color="subtle">Create event</Text>
        </Link>
    no data found
      </PageHeader>
    </Layout>
    )
  }

  return (
    <Layout>
      <Seo type="page" data={{title: 'All Journals'}} />
      <PageHeader heading={BLOG_HANDLE} className="gap-0">
        <Link to="/events/add">
          <Text color="subtle">Create event</Text>
        </Link>
        <Suspense>
        {data?.map((e, i) => {
            return <div key={e.id}> {e?.name}_________ccc</div>;
          })} 
        </Suspense>
      </PageHeader>
    </Layout>
  );
}
