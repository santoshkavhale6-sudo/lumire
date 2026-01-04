// test-agents.js
// A simple script to test your AI Agent Team
// Usage: node test-agents.js

const http = require('http');

// Configuration
const PORT = 5004;
const BASE_URL = `http://localhost:${PORT}/api/agents`;

// Helper function to make POST requests
function chatWithAgents(message, targetAgent = null) {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify({ message, targetAgent });

        const options = {
            hostname: 'localhost',
            port: PORT,
            path: '/api/agents/chat',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve({ error: "Failed to parse response", raw: data });
                }
            });
        });

        req.on('error', (e) => {
            console.error(`Problem with request: ${e.message}`);
            reject(e);
        });

        req.write(body);
        req.end();
    });
}

async function runTests() {
    console.log('\n🤖 Testing Multi-Agent System...\n');
    console.log('Note: Ensure your server is running on port 5000 and OPENAI_API_KEY is set.\n');

    // Test 1: Strategy Question (Should go to CEO)
    console.log('1️⃣  Sending Strategy Question (Expect: CEO)...');
    console.log('   "How can we position our brand as ultra-luxury?"');
    const res1 = await chatWithAgents("How can we position our brand as ultra-luxury?");
    console.log(`   👉 Answered by: [${res1.agent?.toUpperCase()}]`);
    console.log(`   📝 Response: ${res1.response?.substring(0, 100)}...`);
    console.log(`   🐛 Debug Raw:`, JSON.stringify(res1, null, 2));
    process.exit(0);

    // Test 2: Technical Question (Should go to Developer)
    console.log('2️⃣  Sending Tech Question (Expect: DEVELOPER)...');
    console.log('   "Write a MongoDB query to find users who spent over $1000"');
    const res2 = await chatWithAgents("Write a MongoDB query to find users who spent over $1000");
    console.log(`   👉 Answered by: [${res2.agent?.toUpperCase()}]`);
    console.log(`   📝 Response: ${res2.response?.substring(0, 100)}...\n`);

    // Test 3: Design Question (Should go to Designer)
    console.log('3️⃣  Sending Design Question (Expect: DESIGNER)...');
    console.log('   "What color palette conveys trust and exclusivity?"');
    const res3 = await chatWithAgents("What color palette conveys trust and exclusivity?");
    console.log(`   👉 Answered by: [${res3.agent?.toUpperCase()}]`);
    console.log(`   📝 Response: ${res3.response?.substring(0, 100)}...\n`);

    console.log('✅ Tests Completed!');
}

runTests();
