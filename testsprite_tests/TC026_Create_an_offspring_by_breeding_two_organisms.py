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
        
        # -> Open the organisms list by clicking the 'ALL ORGANISMS' button so the breeding workflow can be started (locate /breed or breeding UI).
        # button "ALL ORGANISMS"
        elem = page.locator("xpath=/html/body/main/div/button").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Click the 'BIRTH FIRST ORGANISM' button to create the first organism and observe the resulting UI.
        # link "BIRTH FIRST ORGANISM"
        elem = page.locator("xpath=/html/body/main/div/div[2]/a").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Fill the idea textarea with a seed description to enable the 'BIRTH ORGANISM' button, then click 'BIRTH ORGANISM' to create the first organism.
        # placeholder="DESCRIBE YOUR IDEA IN RAW DETA"
        elem = page.locator("xpath=/html/body/main/div/div[2]/div[2]/div[3]/textarea").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("A collaborative map-making app that turns daily walks into annotated city maps, automatically clustering POIs and generating shareable neighborhood routes.")
        
        # -> Fill the idea textarea with a seed description to enable the 'BIRTH ORGANISM' button, then click 'BIRTH ORGANISM' to create the first organism.
        # button "BIRTH ORGANISM"
        elem = page.locator("xpath=/html/body/main/div/div[2]/div[2]/button").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Navigate to the breed UI at /breed to locate the breeding workflow.
        await page.goto("https://nexusforge-seven.vercel.app/breed")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # --> Test failed (AST guard fallback)
        raise AssertionError("Test failed during agent run: " + "TEST FAILURE The breeding workflow could not be executed \u2014 the /breed UI is not available. Observations: - Navigating to https://nexusforge-seven.vercel.app/breed returned a 404 page stating 'This page could not be found.' - The page contains no interactive elements to select parent organisms or submit a breed request")
        await asyncio.sleep(5)
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    