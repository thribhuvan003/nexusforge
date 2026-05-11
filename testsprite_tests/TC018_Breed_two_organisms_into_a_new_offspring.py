import asyncio
import re
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",
                "--disable-dev-shm-usage",
                "--ipc=host",
                "--single-process"
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        # Wider default timeout to match the agent's DOM-stability budget;
        # auto-waiting Playwright APIs (expect, locator.wait_for) inherit this.
        context.set_default_timeout(15000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Interact with the page elements to simulate user flow
        # -> navigate
        await page.goto("http://localhost:3000/organism/nexus-1778519558047-g39zhxlml")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Navigate to the deployed Vercel organism URL to check the same organism on production and continue the breed flow there.
        await page.goto("https://nexusforge-seven.vercel.app/organism/nexus-1778519558047-g39zhxlml")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Open the All Organisms list to find available organisms or the breed UI by clicking the 'ALL ORGANISMS' button.
        # button "ALL ORGANISMS"
        elem = page.locator("xpath=/html/body/main/div/button").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Click 'BIRTH FIRST ORGANISM' to create the first organism (start the setup for the breeding flow).
        # link "BIRTH FIRST ORGANISM"
        elem = page.locator("xpath=/html/body/main/div/div[2]/a").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Enter a seed description in the 'DESCRIBE YOUR IDEA' textarea to enable the 'BIRTH ORGANISM' button, then click 'BIRTH ORGANISM' to create the first organism.
        # placeholder="DESCRIBE YOUR IDEA IN RAW DETA"
        elem = page.locator("xpath=/html/body/main/div/div[2]/div[2]/div[3]/textarea").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Seed for testing breeding flow: a small collaborative city-mapping app that turns daily walks into shared maps. Use this as a test organism.")
        
        # -> Enter a seed description in the 'DESCRIBE YOUR IDEA' textarea to enable the 'BIRTH ORGANISM' button, then click 'BIRTH ORGANISM' to create the first organism.
        # button "BIRTH ORGANISM"
        elem = page.locator("xpath=/html/body/main/div/div[2]/div[2]/button").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Navigate to the deployed app's /breed page to locate the breeding UI. If /breed is not reachable via page links, open it directly.
        await page.goto("https://nexusforge-seven.vercel.app/breed")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # --> Assertions to verify final state
        assert await page.locator("xpath=//*[contains(., 'Offspring created')]").nth(0).is_visible(), "A new offspring organism should be created after breeding completes"
        assert await page.locator("xpath=//*[contains(., 'View Offspring')]").nth(0).is_visible(), "The offspring should be available for further viewing after it is created"
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    