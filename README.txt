WIDOWSGUIDE.ORG: THE SITE
A plain static site. No database, no server code. Upload this folder as it is.

HOW IT IS MADE
  Every page is generated from the books by one script:
      python3 09_site/build_site.py        (run from the project folder)
  It reads each book's book.json, its chapters (title, question, short answer)
  and the description in its KDP-listing.md. Edit the script, not the HTML,
  then run it again. It keeps the Amazon links you pasted into assets/books.js.

PAGES
  /                  home: what the books are, "How long has it been?", all eight
  /books/            the eight books, with the "How long has it been?" picker
  /books/<title>/    one page per book: description, every chapter with its
                     short answer, buy (or "tell me when it's out"), next book
  /start/            the free checklist (download, no sign-up needed)
  /first-30-days/    landing page for search ads: the checklist first, then Book 1
  /for-family/       which book to give, and what helps besides a book
  /about/            the author, how the books are written and checked
  /help-tonight/     crisis lines (also in every page footer)
  /contact/ /privacy/ /terms/
  /thanks/           shown after a sign-up (the conversion page for ads)
  /1/ ... /8/        printed with QR codes inside the books, and linked from every
                     "Book N" mention in the Kindle editions. Each goes to that
                     book's Amazon page once its link is in assets/books.js;
                     until then, to the book's page here, with the sign-up ready.
  /next/             old address; forwards to /books/

WHEN A BOOK IS PUBLISHED
  Open assets/books.js and paste its Amazon link into  amazon: ""  for that
  book (the Kindle page, amazon.com/dp/<ASIN>; KDP links the paperback and
  hardcover to it). Then run  python3 09_site/build_site.py  and upload the site again. Every printed QR code, short
  address and Kindle link in the books already published now leads there,
  and every "Tell me when it's out" button for that book becomes "Buy".

HOSTING
  Netlify: drag this folder onto app.netlify.com/drop, then point widowsguide.org
  at it. The sign-up forms use Netlify Forms, so emails are collected with no
  other service (Site > Forms; export the list or connect an email tool).
  _redirects is read by Netlify. On another host, the forms need an email
  provider's form endpoint in their action="..." attribute.
  Don't upload _source/ publicly if your host serves it (robots.txt blocks it).

ADS AND MEASUREMENT
  1. Create a Google Analytics 4 property and a Google Ads account.
  2. Put the IDs at the top of 09_site/build_site.py (GA4_ID, ADS_ID and the
     three conversion labels: sign-up, checklist download, click to Amazon),
     run the script, upload. The privacy page then describes the tracking.
  3. Point ads at /first-30-days/ (people searching for what to do after a
     husband dies) and /for-family/ (people buying for someone).
  4. Use keyword search ads. Google restricts ads personalized on "personal
     hardships", which includes bereavement, so don't build remarketing or
     audience lists around grief, and don't write ad text that implies you know
     the reader's situation ("Did your husband just die?"). Check Google's
     current policy before launching.
  Visits to /2/ ... /8/ count print read-through: a reader who finished one book
  and looked for the next.

BEFORE IT GOES LIVE
  1. Register widowsguide.org (the .com is taken) and point it at the host.
  2. Paste each Amazon link into assets/books.js as the books publish.
  3. Re-check the phone numbers on the checklist and in the footer against the
     agencies' own pages.
  4. Have the privacy and terms pages read by someone qualified before you
     collect emails at scale or run ads.

THE CHECKLIST PDF
  Source: _source/checklist.html (identical to Book 1's printed checklist).
  Re-render after edits:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless
        --no-pdf-header-footer --print-to-pdf=out.pdf _source/checklist.html
  then copy it to assets/the-first-two-weeks.pdf and
  00_templates/04_lead-magnet/the-first-two-weeks.pdf.

DESIGN NOTES
  Built for a reader in her sixties on a phone: 19 to 21px body text, 52 to
  64px buttons, high contrast, no pop-ups, nothing that moves. The checklist
  is free with no email required; sign-up is offered alongside, never as a gate.
