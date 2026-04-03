const { scanForTriggers } = require('./src/utils/triggerScanner');

console.log('\n--- Test 1: Safe message ---');
console.log(scanForTriggers("I want to kill this exam"));
console.log('Expected: { safe: true, riskLevel: "safe", ... }\n');

console.log('--- Test 2: Emergency message ---');
console.log(scanForTriggers("I want to kill myself"));
console.log('Expected: { safe: false, riskLevel: "emergency", ... }\n');

console.log('--- Test 3: Flagged message ---');
console.log(scanForTriggers("I feel so hopeless today"));
console.log('Expected: { safe: false, riskLevel: "flagged", ... }\n');
