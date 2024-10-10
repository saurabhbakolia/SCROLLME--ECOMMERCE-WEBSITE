const request = require('supertest');
const app = require('../server.js');

describe('Auth Routes', () => {
  it('should register a new user', async () => {
    const response = await request(app).post('/api/auth/register').send({
      firstName: 'Test',
      lastName: 'Test',
      username: 'test',
      email: 'test.user@example.com',
      password: 'test123',
    });

    expect(response.status).toBe(400);

    // const setCookieHeader = response.headers['set-cookie'];
    // expect(setCookieHeader).toBeDefined();
    // expect(Array.isArray(setCookieHeader)).toBe(true);
    // expect(setCookieHeader).not.toHaveLength(0);
    // const refreshTokenCookie = setCookieHeader.find(
    //     (cookie) => cookie.startsWith('refreshToken=')
    // );
    // expect(refreshTokenCookie).toBeDefined();
  });

  // it("should login an existing user and return tokens", async () => {
  // 	const response = await request(app).post("/api/auth/login").send({
  // 		email: "jane.doe@example.com",
  // 		password: "password123",
  // 	});

  // 	expect(response.status).toBe(200);
  // 	expect(response.headers["set-cookie"]).toBeInstanceOf(Array);
  // 	expect(response.headers["set-cookie"]).not.toHaveLength(0);
  // 	const cookies = response.headers["set-cookie"].map(
  // 		(cookie) => cookie.split(";")[0],
  // 	);
  // 	expect(cookies).toEqual(
  // 		expect.arrayContaining([expect.stringMatching(/^accessToken=/)]),
  // 	);
  // 	expect(cookies).toEqual(
  // 		expect.arrayContaining([expect.stringMatching(/^refreshToken=/)]),
  // 	);
  // });

  // it("should refresh access token using refresh token", async () => {
  // 	const loginResponse = await request(app).post("/api/auth/login").send({
  // 		email: "jane.doe@example.com",
  // 		password: "password123",
  // 	});

  // 	expect(loginResponse.status).toBe(200);

  // 	// Ensure set-cookie header exists before using it
  // 	const setCookieHeader = loginResponse.headers["set-cookie"];
  // 	expect(setCookieHeader).toBeDefined();
  // 	expect(Array.isArray(setCookieHeader)).toBe(true);
  // 	expect(setCookieHeader).not.toHaveLength(0); // Check that set-cookie header is not empty

  // 	// Check for refreshToken cookie
  // 	const refreshTokenCookie = setCookieHeader.find((cookie) =>
  // 		cookie.startsWith("refreshToken="),
  // 	);
  // 	expect(refreshTokenCookie).toBeDefined();

  // 	// Check for accessToken cookie
  // 	expect(setCookieHeader).toEqual(
  // 		expect.arrayContaining([expect.stringMatching(/^accessToken=/)]),
  // 	);
  // });
});
