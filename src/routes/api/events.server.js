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

    console.log('reest', res, re);
   return {...res,status: res.status}; 
  } catch (error) {
    return JSON.stringify(error);
  }
};

export async function api(request, res ) {
  try {
    switch (request.method) {
      case 'GET':
        return queryDatabase();
      case 'POST':
        return pushToDatabase(JSON.parse(request.body), res);
      default:
        return {statusCode: 400};
    }
  } catch (error) {
    return error;
  }
}
