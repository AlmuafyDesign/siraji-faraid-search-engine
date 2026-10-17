# সিরাজী ফারায়েজ গবেষণা সার্চ

বাংলা ও আরবি পাঠ্যে সিরাজী ফারায়েজের দলিল খোঁজার browser-only অ্যাপ। এটি ব্যবহার করতে **Node.js, npm, সার্ভার, login, API key বা কোনো paid service লাগে না**।

## ব্যবহার

### GitHub Pages থেকে

এই repository-র GitHub Pages চালু হলে ব্রাউজারে প্রকাশিত অ্যাপের লিংক খুলুন। প্রথমবার পৃষ্ঠা লোড হওয়ার পর app shell offline-এও খুলতে পারবে।

### কম্পিউটারে সরাসরি

GitHub-এর **Code → Download ZIP** থেকে ZIP নামিয়ে Extract করুন, তারপর `public/index.html` ফাইলে ডাবল-ক্লিক করুন। আধুনিক Chrome, Edge বা Firefox ব্যবহার করুন। IndexedDB সমর্থন চালু থাকতে হবে।

## কিতাব আমদানি

অ্যাপের `কিতাব যোগ` পাতায় কিতাবের পরিচিতি লিখে JSON, TXT, Markdown, HTML বা XML ফাইল বেছে নিন। সর্বোচ্চ ৮ MB; একটি আমদানিতে ১০,০০০ অনুচ্ছেদ পর্যন্ত। JSON উদাহরণ:

```json
{
  "book_id": "sirajiyyah-madina-library",
  "passages": [
    {
      "chapter": "باب العول",
      "page_start": 10,
      "original_text": "অনুমতিপ্রাপ্ত উৎস থেকে হুবহু যাচাইকৃত ইবারত"
    }
  ]
}
```

অ্যাপটি কোনো ওয়েবসাইট থেকে কিতাব scrape বা download করে না। নিজের কাছে থাকা এবং আমদানির অনুমতি আছে এমন পাঠ্য দিন। Dawat-e-Islami-র অনলাইন `السراجية في الميراث` পরিচিতি রাখা হয়েছে; পূর্ণ বইয়ের পাঠ্য কপি করা হয়নি, পুনঃপ্রকাশের অনুমতিও যাচাই করা হয়নি।

## ব্যক্তিগত ডেটা ও ব্যাকআপ

কিতাবের পাঠ্য, আমদানি-ইতিহাস ও অনুসন্ধানযোগ্য সংগ্রহ বর্তমান ব্রাউজারের IndexedDB-তে থাকে। GitHub-এ আপনার import-গুলো পাঠানো হয় না। একই GitHub Pages app অন্য browser profile বা device-এ খুললে সেটি আলাদা খালি সংগ্রহ পাবে। `ব্যাকআপ নামান` দিয়ে JSON ব্যাকআপ নিন; অন্য ডিভাইসে ঐ backup আবার import করুন।

Browser storage মুছে ফেললে স্থানীয় আমদানি হারাতে পারে। প্রয়োজন হলে নিয়মিত backup রাখুন।

## গবেষণার সীমা

এই repository-তে **পূর্ণ কিতাবের পাঠ্য নেই**। প্রথমবার খুললে একটিমাত্র remote bibliographic reference দেখা যাবে, কিন্তু সূচিবদ্ধ অনুচ্ছেদ শূন্য। অনুমতিপ্রাপ্ত পাঠ্য আমদানি না করা পর্যন্ত স্থানীয় search result আসবে না। আমদানি করা পাঠ্য মানব-যাচাই বাকি হিসেবে চিহ্নিত হয়; OCR ভুল থাকতে পারে।

মিরাস ক্যালকুলেটরের নিয়ম যোগ্য আলেমের দ্বারা যাচাই করে যোগ করা হয়নি, তাই এটি কোনো অংশ বা টাকার অঙ্ক গণনা করে না। Search result-ও চূড়ান্ত ফতোয়া নয়।

সম্পূর্ণ source provenance ও অধিকার-সংক্রান্ত নোট [docs/source-acquisition-report.json](docs/source-acquisition-report.json)-এ আছে।

## GitHub Pages

`.github/workflows/pages.yml` `public/`-এর static files publish করার জন্য প্রস্তুত। GitHub Pages public GitHub Free repository-তে পাওয়া যায়; Private repository রাখতে হলে উপযুক্ত paid plan লাগতে পারে। প্রকাশ করলে website-টি internet-এ সবার জন্য দেখা যাবে।
