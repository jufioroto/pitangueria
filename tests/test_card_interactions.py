import unittest

from playwright.sync_api import expect, sync_playwright


class CardInteractionsTest(unittest.TestCase):
    def setUp(self):
        self.playwright = sync_playwright().start()
        self.browser = self.playwright.chromium.launch(headless=True)

    def tearDown(self):
        self.browser.close()
        self.playwright.stop()

    def test_each_card_flips_on_mouse_enter_and_returns_on_mouse_leave(self):
        page = self.browser.new_page(viewport={"width": 1280, "height": 1800})
        page.goto("http://localhost:8080", wait_until="networkidle")
        cards = page.locator(".flip")
        self.assertEqual(cards.count(), 3)
        for index in range(3):
            card = cards.nth(index)
            card.hover()
            expect(card).to_have_attribute("aria-pressed", "true")
            card.click()
            expect(card).to_have_attribute("aria-pressed", "true")
            page.mouse.move(0, 0)
            page.wait_for_function(
                "el => el.getAttribute('aria-pressed') === 'false'", arg=card.element_handle()
            )
            expect(card).to_have_attribute("aria-pressed", "false")

    def test_touch_toggles_the_card(self):
        page = self.browser.new_page(
            viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True
        )
        page.goto("http://localhost:8080", wait_until="networkidle")
        card = page.locator(".flip").first
        card.tap()
        expect(card).to_have_attribute("aria-pressed", "true")
        card.tap()
        expect(card).to_have_attribute("aria-pressed", "false")

    def test_keyboard_remains_available(self):
        page = self.browser.new_page(viewport={"width": 1280, "height": 1800})
        page.goto("http://localhost:8080", wait_until="networkidle")
        card = page.locator(".flip").first
        card.focus()
        page.keyboard.press("Enter")
        expect(card).to_have_attribute("aria-pressed", "true")
        page.keyboard.press("Tab")
        expect(card).to_have_attribute("aria-pressed", "false")


if __name__ == "__main__":
    unittest.main()