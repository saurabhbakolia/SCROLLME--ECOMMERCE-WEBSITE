const axios = require("axios");

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const fetchImageUrl = async (query) => {
	try {
		const response = await axios.get("https://api.unsplash.com/search/photos", {
			params: {
				query,
				per_page: 1,
			},
			headers: {
				Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
			},
		});

		if (response.data.results.length > 0) {
			return response.data.results[0].urls.small; // Returns a small-sized image URL
		}
		return "https://via.placeholder.com/300"; // Placeholder image if none found
	} catch (error) {
		console.error("Error fetching image from Unsplash:", error);
		return "https://via.placeholder.com/300"; // Fallback placeholder image
	}
};

module.exports = fetchImageUrl;
