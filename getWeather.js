// console.log('Loading function');

// export const handler = async (event, context) => {
//     //console.log('Received event:', JSON.stringify(event, null, 2));
    
//     try {
//         const weatherData = await 
//     } catch(e) {
        
//     }
// };

import https from 'https';

export const handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    const url = `https://api.weatherapi.com/v1/forecast.json?key=700247105797450da75152243243108&q=Jerusalem&days=7&aqi=no&alerts=no`;

    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';

            // A chunk of data has been received.
            response.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received.
            response.on('end', () => {
                resolve({
                    statusCode: 200,
                    body: JSON.parse(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                        'Access-Control-Allow-Methods': '*',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
            });

        }).on("error", (err) => {
            reject({
                statusCode: 500,
                body: JSON.stringify({
                    message: "Error fetching weather data",
                    error: err.message
                })
            });
        });
    });
};