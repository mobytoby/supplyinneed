import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

interface Supply {
  lat: string;
  long: string;
  quantity: number;
}

export const handler: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
  let quantity = '';
  let lat = '';
  let long = '';

  if (event.queryStringParameters && event.queryStringParameters.quantity) {
    console.log("Received quantity: " + event.queryStringParameters.quantity);
    quantity = event.queryStringParameters.quantity;
  }

  if (event.queryStringParameters && event.queryStringParameters.lat) {
    console.log("Received lat: " + event.queryStringParameters.lat);
    lat = event.queryStringParameters.lat;
  }

  if (event.queryStringParameters && event.queryStringParameters.long) {
    console.log("Received long: " + event.queryStringParameters.long);
    long = event.queryStringParameters.long;
  }

  let result: Supply[] = [
    {
      // Spokane
      lat: '47.6588N',
      long: '117.4260W',
      quantity: 50
    },
    {
      // Seattle
      lat: '47.6062N',
      long: '122.3321W',
      quantity: 1000,
    },
    {
      // Santa Monica
      lat: '34.0195N',
      long: '118.4912W',
      quantity: 5000
    }
  ];


  // The output from a Lambda proxy integration must be 
  // in the following JSON object. The 'headers' property 
  // is for custom response headers in addition to standard 
  // ones. The 'body' property  must be a JSON string. For 
  // base64-encoded payload, you must also set the 'isBase64Encoded'
  // property to 'true'.
  let response: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify(result)
  };
  console.log("response: " + JSON.stringify(response))
  return response;
}
