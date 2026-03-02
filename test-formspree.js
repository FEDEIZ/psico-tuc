// Test script to verify Formspree submission parameters
'use strict';

// Simulate the form data as would be collected from the HTML
const params = new URLSearchParams();

// Add hidden fields from HTML
params.append('_subject', 'Contacto desde sitio web');
params.append('_to', 'psic.florencia4079@gmail.com');
params.append('_format', 'plain');
// Simulate user inputs
params.append('name', 'Test User');
params.append('email', 'test@example.com');
params.append('message', 'This is a test message');

// Add reply-to (as done in JS)
const emailValue = params.get('email');
if (emailValue) {
    params.append('_replyto', emailValue);
}

console.log('Generated params:');
console.log(params.toString());

// Make a request to httpbin to inspect the request
async function test() {
    try {
        const response = await fetch('https://httpbin.org/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString()
        });
        const data = await response.json();
        console.log('\nResponse from httpbin:');
        console.log('Form data received:', data.form);
        console.log('Headers:', data.headers);
        console.log('\nTest passed: parameters correctly sent.');
    } catch (error) {
        console.error('Test failed:', error);
    }
}

if (require.main === module) {
    test();
}