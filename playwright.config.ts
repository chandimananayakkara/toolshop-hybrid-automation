import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  testDir: "./tests",
  timeout:45*1000,
  expect:{
    timeout:8000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright'],
  ],
  use: {
    trace: "on-first-retry",
    baseURL:'https://practicesoftwaretesting.com',
    screenshot:'only-on-failure',
    video:'retain-on-failure',
    navigationTimeout:20000,
    extraHTTPHeaders:{
      'Accept':'application/json'
    }

  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name:'mobile-chrome',
      use:{...devices['Pixel 5']}
    },
    {
      name:'api',
      use:{
        baseURL:'https://api.practicesoftwaretesting.com',
        extraHTTPHeaders:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        }
      },
      testDir:'./tests/api'
    }
  ],
});
