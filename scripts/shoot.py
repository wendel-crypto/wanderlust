import asyncio, sys
from playwright.async_api import async_playwright
APP="file:///home/claude/wl/app/index.html"
SCREENS=["feed","explore","map","trips","profile","create","chat","detail"]
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
        pg=await b.new_page(viewport={"width":390,"height":844},device_scale_factor=2)
        for s in SCREENS:
            await pg.goto(f"{APP}?bare&screen={s}")
            await pg.wait_for_load_state("networkidle")
            if s=="create":
                await pg.click('#picks button[data-k="bali"]'); await pg.click('#picks button[data-k="braies"]')
                await pg.fill('#cCap',"Rice terraces at sunrise, then a dip at Tegenungan. #Bali #Ubud"); await pg.click('#crate button:nth-child(5)')
            if s=="chat":
                await pg.fill('#msgIn',"Mar 18 works! 2 adults"); await pg.click('.composer button'); await pg.wait_for_timeout(1600)
            if s=="detail":
                await pg.click('#drate button:nth-child(4)')
            if s=="map":
                await pg.wait_for_timeout(1500)
                await pg.wait_for_timeout(1500)
            if s=="feed":
                await pg.evaluate("like(1)"); await pg.wait_for_timeout(900)
            await pg.wait_for_timeout(1200)
            await pg.screenshot(path=f"/home/claude/wl/shots/{s}.png")
            print("ok",s)
        await b.close()
asyncio.run(main())
