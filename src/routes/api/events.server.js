var data = JSON.stringify({
  collection: 'events',
  database: 'test',
  dataSource: 'Cluster0',
});

var config = {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key':
      't0FA8t5vlbggADy0PP0ZE3voJkCvQm8w0ux7PFHTtykkQEDOeWvY6DIzEML9z6dG',
  },
  body: data,
};

const queryDatabase = async () => {
  const res = await fetch(
    'https://data.mongodb-api.com/app/data-iobky/endpoint/data/v1/action/find',
    config,
  );

  return res;
};

const pushToDatabase = async (data3, re) => {
  try {
    var data2 = {
      collection: 'events',
      database: 'test',
      dataSource: 'Cluster0',
      document: {
        "status": "open2",
        "text": "Do the dishes2"
      },
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
const data = await res.json()
    console.log('reest', data.insertedId);
   return data
  } catch (error) {
    return error;
  }
};

export async function api(request, res ) {
  try {
    switch (request.method) {
      case 'GET':
        return queryDatabase();
      case 'POST':
        const z =await pushToDatabase(JSON.parse(request.body), res);
     
        return new Response(null, {status:400 }); 
      default:
        return {statusCode: 400};
    }
  } catch (error) {
    throw error
  }
}
