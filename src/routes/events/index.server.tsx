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

  
 


  const xx = useQuery(
    ['unique', 'key'], // A string or an array to uniquely identify the query.
    async () => {
  try {
    const res = await fetch(`${new URL(response.url).origin}/api/events`)
    const data = await res.json()
  
return data

    
  } catch (error) {
   throw `eerrre! ${error}`;
  }
 
   
    },
    {
     
    },
  );

 console.log('eventdata', xx.data) 



  return (
    <Layout>
      <Seo type="page" data={{title: 'All Journals'}} />
      <PageHeader heading={BLOG_HANDLE} className="gap-0">
        <Link to="/events/add">
          <Text color="subtle">Create event</Text>
        </Link>
        <Suspense>
        {xx.data?.documents?.map((e, i) => {
            return <div key={e.id}> {e?.name}___e______ccc</div>;
          })} 
        </Suspense>
      </PageHeader>
    </Layout>
  );
}
