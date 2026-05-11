import asyncio
import re
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        pw = await async_api.async_playwright().start()
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",
                "--disable-dev-shm-usage",
                "--ipc=host",
                "--single-process"
            ],
        )
        context = await browser.new_context()
        context.set_default_timeout(15000)
        page = await context.new_page()
        # -> navigate
        await page.goto("http://localhost:3000/organism/nexus-1778519558047-g39zhxlml")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Click the 'ALL ORGANISMS' button to open the organisms list page and find an existing organism to test evolution on.
        # button "ALL ORGANISMS"
        elem = page.locator("xpath=/html/body/main/div/button").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Navigate to the deployed site organism detail page at https://nexusforge-seven.vercel.app/organism/nexus-1778519558047-g39zhxlml to check if the organism exists there and continue the Force Evolution test.
        await page.goto("https://nexusforge-seven.vercel.app/organism/nexus-1778519558047-g39zhxlml")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Click the 'ALL ORGANISMS' button on the deployed site to open the organisms list and look for an existing organism to test evolution on.
        # button "ALL ORGANISMS"
        elem = page.locator("xpath=/html/body/main/div/button").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Click the 'BIRTH FIRST ORGANISM' button to create a new organism so the Force Evolution flow can be tested (click element index 367).
        # link "BIRTH FIRST ORGANISM"
        elem = page.locator("xpath=/html/body/main/div/div[2]/a").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Open the organisms list page on the deployed site by clicking the 'Organisms' link so an organism can be created or selected.
        # link "Organisms"
        elem = page.locator("xpath=/html/body/nav/div/div/a[2]").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Click the 'BIRTH FIRST ORGANISM' button on the /organisms page to open the Create page and attempt to birth an organism (index 599).
        # link "BIRTH FIRST ORGANISM"
        elem = page.locator("xpath=/html/body/main/div/div[2]/a").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # --> Test blocked (AST guard fallback)
        raise AssertionError("Test blocked during agent run: " + "TEST BLOCKED The test could not be run \u2014 the UI prevents creating the prerequisite organism required to exercise the Force Evolution flow. Observations: - The /create page shows a text input and a 'BIRTH ORGANISM' button that is disabled. - The deployed /organisms page shows STORAGE EMPTY (no existing organisms to select). - Previously visited organism detail pages displayed 'Organism Void', so...")
        await asyncio.sleep(5)
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    