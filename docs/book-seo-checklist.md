# Book SEO: what's done on the site, and what only Suraj can do

Goal: searching **Suraj Nandan** shows both books; searching **Above the Clouds** or **Unscrolled** shows them; and Google recognises Suraj Nandan as their author.

## Done on surajnandan.in (15 Nov 2026)

| Page | Title in Google | What it tells search engines |
|---|---|---|
| `/` | Suraj Nandan — Author of Above the Clouds & Unscrolled \| AI Engineer | Person (jobTitle Author, both books in the description, Amazon author page in `sameAs`) and both Book entities |
| `/books` | Books by Suraj Nandan — Above the Clouds & Unscrolled | CollectionPage listing both books with Suraj as author |
| `/books/above-the-clouds` | Above the Clouds by Suraj Nandan — A Horror Thriller Novel Set in India | Book + all 3 editions (ISBNs, ASINs, pages, dates, Amazon offers), FAQ, breadcrumbs |
| `/book` | Unscrolled by Suraj Nandan — Book on Focus, Attention & Phone Addiction | The same, for Unscrolled |

- Every page is prerendered, so crawlers get full HTML. All four are in `sitemap.xml`, and each has its own share image.
- The book data lives in `src/data/book.ts`. Pages, structured data, sitemap and the site assistant are all generated from it, so editing that one file updates everything.
- IndexNow (Bing, Yandex and others) was notified of all 37 URLs. Run `npm run indexnow` again after big changes.

## Your steps, in order of impact

### 1. Google Search Console (today, about 10 minutes)
1. Go to https://search.google.com/search-console and open the `surajnandan.in` property. If you don't have one, add it as a **Domain** property and verify it with the DNS record it gives you.
2. **Sitemaps** → submit `https://surajnandan.in/sitemap.xml`.
3. **URL Inspection** → paste each URL below → **Request indexing**:
   - `https://surajnandan.in/`
   - `https://surajnandan.in/books`
   - `https://surajnandan.in/books/above-the-clouds`
   - `https://surajnandan.in/book`
4. A few days later, open **Enhancements** and check that it shows the FAQ and breadcrumbs as valid.

### 2. Amazon Author Central (today)
Your author page already exists: https://www.amazon.com/stores/author/B0HRRX84CH. It lists Unscrolled but **not Above the Clouds yet**.
1. Sign in at https://author.amazon.com with your KDP account.
2. **Books** → **Add more books** → search "Above the Clouds Suraj Nandan" → claim the Kindle, paperback and hardcover editions.
3. **Profile**:
   - Add the same photo you use on the site.
   - Add a biography that starts "Suraj Nandan is the author of *Above the Clouds* and *Unscrolled*…" and mentions surajnandan.in.

Google trusts Amazon's author pages heavily, and this is one of the strongest "this person wrote these books" signals you can give it.

### 3. Goodreads (this week)
1. Search Goodreads for each book by ISBN:
   - Above the Clouds: paperback `9798142762078`, hardcover `9798142766922`
   - Unscrolled: paperback `9798166800497`, hardcover `9798167726031`
2. If a book isn't there yet, add it, or wait a few days for Amazon's feed to bring it in.
3. On your author name, choose **Is this you? Let us know** to join the Goodreads Author Program.
4. Fill in your profile and set your website to https://surajnandan.in/books.

### 4. Put the same name and links everywhere (this week)
Use "Suraj Nandan" spelled exactly the same everywhere, linking back to https://surajnandan.in/books.
- **LinkedIn:** under **Add section → Publications**, add both books with their Amazon links. Set your headline to include "Author of Above the Clouds & Unscrolled".
- **Medium, DEV and GitHub bios:** add "Author of Above the Clouds & Unscrolled" and the /books link.
- **Medium:** write one essay about how the dream became a novel, linking to `/books/above-the-clouds`. Real articles linking to the page help it rank for the title.

### 5. Google Books (optional, free)
Add both books at https://play.google.com/books/publish (Google Play Books Partner Center). Google then holds its own record of the books with you as author, linked by ISBN. If you sell the ebook there, check the KDP Select exclusivity rules first. The print editions alone are enough for the catalogue record.

### 6. The Google Knowledge Panel ("Google says I'm the author")
- Nobody can create a Knowledge Panel directly. Google builds one once it has enough consistent evidence: the site's structured data, Amazon, Goodreads, Google Books, LinkedIn.
- Once a panel appears when you search your name, click **Claim this knowledge panel** at its bottom and verify with the Google account that owns Search Console for surajnandan.in.
- After that you can suggest edits, such as listing both books.
- Expect weeks to months, not days.

## What to expect
- **"Suraj Nandan" and "Suraj Nandan books":** the most achievable. The name is fairly uncommon and the site is already indexed for it, so the book pages should appear within a few weeks of the steps above.
- **"Above the Clouds novel" / "Above the Clouds Suraj Nandan":** realistic. **"Above the Clouds" alone** is hard: other books, a film and an audiobook share the title, so Amazon and older pages will rank above a new book at first.
- **"Unscrolled book":** realistic. "Unscrolled" alone depends on how much else uses the word.
- Reviews on Amazon and Goodreads, plus links from articles or interviews, are what move rankings from here.

## Checking it worked
- Rich Results Test: https://search.google.com/test/rich-results?url=https%3A%2F%2Fsurajnandan.in%2Fbooks%2Fabove-the-clouds
- Search `site:surajnandan.in books` after a week to see which pages are indexed.
