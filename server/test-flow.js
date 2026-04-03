// Step 12 & 13: Full message flow tests
const http = require('http');

function makeRequest(method, path, body, token = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(data) }));
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  try {
    console.log('\n=== STEP 12: Full Message Flow Test ===\n');

    // Start a session
    console.log('Creating session...');
    const sessionRes = await makeRequest('POST', '/api/session/start', { tags: ['Placements'] });
    const { token, sessionId } = sessionRes.data;
    console.log('✓ Session created');
    console.log(`  Token: ${token.substring(0, 20)}...`);
    console.log(`  Session ID: ${sessionId}\n`);

    // Test safe message
    console.log('--- Test 1: Safe message ---');
    const safeRes = await makeRequest(
      'POST',
      '/api/chat/message',
      { text: 'I am stressed about placements', sessionId },
      token
    );
    console.log('Status:', safeRes.status);
    console.log('Response:', JSON.stringify(safeRes.data, null, 2));

    console.log('\n--- Test 2: Emergency message ---');
    const emergencyRes = await makeRequest(
      'POST',
      '/api/chat/message',
      { text: 'I want to kill myself', sessionId },
      token
    );
    console.log('Status:', emergencyRes.status);
    console.log('Response:', JSON.stringify(emergencyRes.data, null, 2));

    console.log('\n=== STEP 13: Matchmaking Test ===\n');
    const matchRes = await makeRequest(
      'POST',
      '/api/volunteer/match',
      { tags: ['Placements'] },
      token
    );
    console.log('Status:', matchRes.status);
    console.log('Response:', JSON.stringify(matchRes.data, null, 2));
    console.log('\n✓ All tests completed!\n');

  } catch (error) {
    console.error('Test error:', error.message);
  }
}

runTests();
