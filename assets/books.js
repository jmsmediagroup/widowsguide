/* ================================================================
   EDIT HERE when a book is published: paste its Amazon link into
   `amazon` (for example "https://www.amazon.com/dp/B0XXXXXXXX").
   That one change does three things:
     - widowsguide.org/N (printed and QR-coded inside the books, and linked
       from every "Book N" mention in the Kindle editions) now goes
       straight to that book's Amazon page;
     - every "Buy" button for that book on this site goes to Amazon;
     - until then, those buttons say "Tell me when it's out" and lead
       to the sign-up.
   build_site.py keeps these links when it rebuilds the site.
   ================================================================ */
const BOOKS = [
  { n: 1, word: "One", title: "The First 30 Days", url: "/books/the-first-30-days/",
    when: "The first month", line: "Who to call, what to find, what can wait.",
    amazon: "" },
  { n: 2, word: "Two", title: "The Money", url: "/books/the-money/",
    when: "Months 1 to 6", line: "Survivor benefits, accounts, insurance.",
    amazon: "" },
  { n: 3, word: "Three", title: "The House and the Things", url: "/books/the-house-and-the-things/",
    when: "Months 3 to 12", line: "Stay or sell, and clearing a life.",
    amazon: "" },
  { n: 4, word: "Four", title: "Everything They Handled", url: "/books/everything-they-handled/",
    when: "Months 1 to 9", line: "The practical jobs that are now yours.",
    amazon: "" },
  { n: 5, word: "Five", title: "The First Year", url: "/books/the-first-year/",
    when: "Months 6 to 15", line: "Anniversaries, holidays, the hardest months.",
    amazon: "" },
  { n: 6, word: "Six", title: "The People Around You", url: "/books/the-people-around-you/",
    when: "Months 3 to 18", line: "Family, friends, and who disappears.",
    amazon: "" },
  { n: 7, word: "Seven", title: "Year Two", url: "/books/year-two/",
    when: "Months 15 to 24", line: "Rebuilding a life that is yours.",
    amazon: "" },
  { n: 8, word: "Eight", title: "Someone New", url: "/books/someone-new/",
    when: "Month 18 and after", line: "Companionship after loss, and what people may say.",
    amazon: "" },
];

/* "How long has it been?": the first book is "start here". */
const WHEN = [
  { label: "Less than a month", start: 1, also: [2] },
  { label: "1 to 6 months", start: 2, also: [4, 3] },
  { label: "6 to 12 months", start: 5, also: [6, 3] },
  { label: "12 to 18 months", start: 5, also: [7, 6] },
  { label: "18 months or more", start: 7, also: [8] }
];
