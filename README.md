# Test Automation training from jaktestowac.pl

## Links
- course https://jaktestowac.pl/course/playwright-wprowadzenie/
- test site https://demo-bank.vercel.app/  
if link is broken check https://jaktestowac.pl/lesson/pw1s01l01/

## Commands
- check `NodeJS` version  
`node -v`
- new project with Playwright  
`npm init playwright@latest`
- record tests for given site  
`npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI  
`npx playwright test`
- run tests with browser GUI  
`npx playwright test --headed`
- view report  
`npx playwright show-report`

## Playwright Config modifications
- config file `playwright.config.ts`
- disable browsers, i.e. Firefox  
    ```javascript
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    ```

## Playwright snippets

- import: import { test, expect } from '@playwright/test';

- test: 
test('Test description', asycn ({ page }) => {
    
});

- describe:
test.describe('Group description', () => {
    
});

## Visual Studio Code
- Preview: for READ.md
- Auto Save: in File -> Auto Save
- Formating: editor -> contex menu -> Format document