require("dotenv").config();
describe("Environment Variables", () => {
	it("should load JWT_SECRET from environment variables", () => {
		// Ensure the JWT_SECRET environment variable is loaded
		expect(process.env.JWT_SECRET).toBeDefined();
		// Optionally, you can check its value or other properties
		expect(process.env.JWT_SECRET).toBe("someone");
	});
});
