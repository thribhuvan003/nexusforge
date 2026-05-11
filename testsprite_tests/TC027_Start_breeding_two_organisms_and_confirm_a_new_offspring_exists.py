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
        
        # -> Open the Organisms list to locate available organisms and the breed feature (click the 'Organisms' nav link).
        # link "Organisms"
        elem = page.locator("xpath=/html/body/nav/div/div/a[2]").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # --> Test blocked (AST guard fallback)
        raise AssertionError("Test blocked during agent run: " + "TEST BLOCKED The test could not be run \u2014 there are no organisms in bio-storage to select for breeding. Observations: - The Organisms page displays \"STORAGE EMPTY\" and a prominent \"BIRTH FIRST ORGANISM\" button. - No organism entries or a breeding UI (/breed) link are present on the page.")
        await asyncio.sleep(5)
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    