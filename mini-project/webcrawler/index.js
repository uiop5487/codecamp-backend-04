// 여기어때 크롤링 위법 사례: https://biz.chosun.com/topics/law_firm/2021/09/29/OOBWHWT5ZBF7DESIRKNPYIODLA/

import mongoose from "mongoose";
import puppeteer from "puppeteer";
import { Starbucks } from "./models/starbucks.model.js";

// 몽고DB 접속!!
mongoose.connect("mongodb://localhost:27017/mydocker04");

const startCrawlin = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://www.starbucks.co.kr/menu/drink_list.do");
  await page.waitForTimeout(1000);

  for (let i = 1; i <= 30; i++) {
    const img = await page.$eval(
      `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(6) > ul > li:nth-child(${i}) > dl > dt > a > img`,
      (el) => el.getAttribute("src")
    );

    const name = await page.$eval(
      `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(6) > ul > li:nth-child(${i}) > dl > dd`,
      (el) => el.textContent
    );

    const starbucks = new Starbucks({
      name,
      img,
    });

    await starbucks.save();
  }

  await browser.close();
};

startCrawlin();
