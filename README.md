# N&N International — Men’s Cosmetic

Next.js static site matching [nandninternation-menscosmetic.netlify.app](https://nandninternation-menscosmetic.netlify.app/) — men’s grooming, skincare, haircare and fragrance, led by Dr. Nadeem and Associates.

## Run locally

```bash
npm install
npm run dev
```

## Static export

```bash
npm run build
```

Output: `out/`

## Edit content (static JSON)

**All text, titles, prices, links, and image paths live in one file:**

```text
src/data/site-content.json
```

Har section ke andar `_comment` / `_fileComment` keys hain — yeh explain karti hain ke field kahan use hoti hai. Unhe delete mat karo (UI mein show nahi hoti).

| JSON key | Use |
| --- | --- |
| `seo` | Page title + meta description |
| `brand` / `nav` | Header logo + menu |
| `hero` | Top banner + featured spinning product |
| `philosophy` | “Our approach” section |
| `brands.items` | Brand grid cards |
| `shop.products` | Shop product cards |
| `categories.items` | Grooming / Skincare / Haircare / Fragrance blocks |
| `expectations` | Three feature columns |
| `contact` | Contact CTA + email |
| `footer` | Team names + copyright |

Styles: `src/app/site.css`  
Images folder: `public/assets/images/`

Placeholder prices are **Rs. 001**. Contact email is currently `info@example.com` (`contact.ctaHref`).
