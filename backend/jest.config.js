// jest.config.js
module.exports = {
	testEnvironment: "node",
	testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
	transform: {
		"^.+\\.jsx?$": "babel-jest",
	},
	testPathIgnorePatterns: ["/node_modules/", "/__tests__/setup.test.js"],
};
