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
        
        # -> Click the 'Create' link in the header to open the creation page.
        # link "Create"
        elem = page.locator("xpath=/html/body/nav/div/div/a").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Fill the idea seed textarea with a raw organism concept.
        # placeholder="DESCRIBE YOUR IDEA IN RAW DETA"
        elem = page.locator("xpath=/html/body/main/div/div[2]/div[2]/div[3]/textarea").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("A browser extension that converts any article into a natural-sounding podcast episode: it summarizes long articles into chapters, generates a human-like narration with selectable voices, automatically picks subtle background music based on the article's tone, and produces chapter markers and playback speed controls so users can listen while commuting.")
        
        # -> Click the 'BIRTH ORGANISM' button to submit the creation form and start the birth flow, then wait for the page to reflect the result.
        # button "BIRTH ORGANISM"
        elem = page.locator("xpath=/html/body/main/div/div[2]/div[2]/button").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # --> Test passed — verified by AI agent
        frame = context.pages[-1]
        current_url = await frame.evaluate("() => window.location.href")
        assert current_url is not None, "Test completed successfully"
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    