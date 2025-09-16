import puppeteer from "puppeteer";

const BASE_URL = "https://www.japanesetest4you.com/";
const LEVELS = ["n5"]; // ✅ only test for N5
const TEST_CATEGORIES = ["kanji", "grammar", "vocabulary", "listening"];

/**
 * Scrape one test page
 */
async function scrapeTestPage(page, url, category) {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });

    // Example: grab text from inside content
    const questions = await page.$$eval(".entry-content p", (nodes) =>
      nodes.map((n) => n.innerText.trim()).filter((t) => t.length > 0)
    );

    if (!questions || questions.length === 0) {
      return null;
    }

    return {
      category,
      url,
      questions,
      scrapedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error(`❌ Error scraping ${url}:`, err.message);
    return null;
  }
}

/**
 * Main scraper
 */
async function scrapeAllTests(browser) {
  console.log("🚀 Starting scrape of all exercise tests...");

  let failedUrls = [];

  for (const level of LEVELS) {
    for (const category of TEST_CATEGORIES) {
      let exerciseNum = 1,
        consecutiveFailures = 0;
      console.log(
        `\n--- Scraping Level: ${level.toUpperCase()}, Category: ${category}-test ---`
      );

      while (consecutiveFailures < 3) {
        const urlFormats = [
          `${BASE_URL}japanese-language-proficiency-test-jlpt-${level}-${category}-exercise-${exerciseNum}/`,
          `${BASE_URL}japanese-language-proficiency-test-jlpt-${level}-${category}-exercise-${String(
            exerciseNum
          ).padStart(2, "0")}/`,
        ];

        let quizData = null;
        let triedUrls = [];
        const page = await browser.newPage();

        for (const url of urlFormats) {
          console.log(`Attempting to scrape: ${url}`);
          triedUrls.push(url);
          quizData = await scrapeTestPage(page, url, category);
          if (quizData) break;
        }

        if (quizData) {
          consecutiveFailures = 0;
          console.log(`\n✅ FOUND DATA`);
          console.log(JSON.stringify(quizData, null, 2));
          console.log(`--- END OF DATA ---`);
        } else {
          consecutiveFailures++;
          const currentUrl = triedUrls.join(" OR ");
          const pageContent = await page.content();
          const bodyText = pageContent.replace(/\s+/g, " ").slice(0, 300);

          console.log(
            `⚠️  No valid quiz data found at [${currentUrl}] (Failure ${consecutiveFailures}/3).`
          );

          if (bodyText.includes("404") || bodyText.toLowerCase().includes("not found")) {
            console.log("  ↳ Reason: Page returned 404 / Not Found.");
          } else if (!bodyText) {
            console.log("  ↳ Reason: Empty page content.");
          } else {
            console.log(
              "  ↳ Reason: Page loaded but no questions detected. Sample:",
              bodyText
            );
          }

          if (consecutiveFailures === 3) {
            console.log(`❌ Giving up on: ${currentUrl}`);
            failedUrls.push(currentUrl);
          }
        }

        await page.close();
        exerciseNum++;
      }
    }
  }

  console.log("✅ Finished scraping all exercise tests.");

  if (failedUrls.length > 0) {
    console.log("\n📌 SUMMARY: The following URLs failed to be scraped:");
    failedUrls.forEach((u) => console.log(" - " + u));
  } else {
    console.log("\n🎉 All URLs scraped successfully (no permanent failures).");
  }
}

/**
 * Entry point
 */
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  await scrapeAllTests(browser);
  await browser.close();
})();
