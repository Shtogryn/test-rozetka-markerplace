const { defineConfig } = require("cypress");

module.exports = defineConfig({
    env: {...process.env },
    e2e: {
        experimentalSessionAndOrigin: true,
        defaultCommandTimeout: 5000,
        viewportHeight: 1080,
        viewportWidth: 1920,
        baseUrl: 'https://rozetka.com.ua/ua/',
        setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on);
        },
    },
});