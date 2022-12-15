
var data = JSON.stringify({
  "collection": "events",
  "database": "test",
  "dataSource": "Cluster0",

});
          
var config = {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': 't0FA8t5vlbggADy0PP0ZE3voJkCvQm8w0ux7PFHTtykkQEDOeWvY6DIzEML9z6dG',
  },
  body: data
};



const queryDatabase = async () => {
 const res = await fetch('https://data.mongodb-api.com/app/data-iobky/endpoint/data/v1/action/find',config)
const data = await res.json()

return JSON.stringify(data)

};

const pushToDatabase = async ( data3) => {
console.log('________________', data3)
  var data2 = {
    "collection": "events",
    "database": "test",
    "dataSource": "Cluster0",
    "document" : data3
  
  };
            
  var config2 = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'api-key': 't0FA8t5vlbggADy0PP0ZE3voJkCvQm8w0ux7PFHTtykkQEDOeWvY6DIzEML9z6dG',
    },
    body: {"document": {
      "name": "open",
      "text": "Do the dishes"
    }}
  };
      

  const res = await fetch('https://data.mongodb-api.com/app/data-iobky/endpoint/data/v1/action/insertOne',config2)
  
  console.log('reest', res)
  return JSON.stringify(res)
 
   
  
  
};

      




export async function api(request, {params, queryShop}) {
  try {

/* 
  const db = await connectToDatabase(MONGODB_URI); */

  switch (request.method ) {
    case "GET":
      console.log('hhhd')
      return queryDatabase();
    case "POST":
      return pushToDatabase( JSON.parse(request.body));
    default:
      return { statusCode: 400 };
  }

} catch (error) {
  return error
}

}