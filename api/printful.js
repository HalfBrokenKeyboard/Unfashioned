const axios = require('axios');

const printfulApiKey = process.env.PrintfulAPIKey;

module.exports = async (request, response) => {
  try {
    const { body } = request;
    const endpoint = request.query.endpoint;

    const { data } = await axios.get(
      `https://api.printful.com/${endpoint}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${printfulApiKey}`,
        },
      },
    );
    response.status(200).json(data);
  } catch (error) {
    console.error('Error fetching Printful data:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};