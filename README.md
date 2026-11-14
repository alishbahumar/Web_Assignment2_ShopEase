# ShopEase - Online Shopping Website

Software Engineering - Assignment 2
Faculty of Computing, Riphah International University, Islamabad (Gulberg Green Campus)
Instructor: Ms. Kausar Nasreen Khattak

**Designed by Alishba Umar**

ShopEase is a responsive online shopping website built with plain HTML, CSS and JavaScript (no frameworks).

## Features

- Navigation bar (Home, Products, Categories, About Us, Contact Us, Login/Signup, Cart) and a sliding navigation drawer
- Auto-playing image slideshow with Next/Previous buttons, dots and fade transitions
- Home page: welcome banner, Featured, New Arrivals, Best Sellers and Special Offers
- Product search, plus sidebar filters for category, price, brand and rating
- Product cards, product details page with image gallery and quantity selection
- Shopping cart: add, remove, change quantity, live total and cart count
- Wishlist (add/remove)
- Login/Signup and Contact forms with JavaScript validation
- Checkout with delivery address, Cash on Delivery, card and mobile wallet options, and an order confirmation page
- Order details are emailed to the shop owner (via FormSubmit)
- CSS: Flexbox, Grid, transitions, transforms, keyframe animations, box-shadow, border-radius, linear-gradient, position, media queries, z-index

## Project structure

```
ShopEase/
  index.html     page structure
  style.css      all styling and animations
  script.js      all functionality
  images/        product, category and slideshow images
  README.md
```

## Run locally

Download or clone the repository and open `index.html` in a browser. No installation is needed.

## Live demo

Enable GitHub Pages (Settings > Pages > Deploy from branch > main > / (root)) and the site will be available at
`https://<your-username>.github.io/<repository-name>/`

## Notes

- Card and wallet forms only collect and validate details. No real payment is processed; Cash on Delivery is the working option.
- Cart, wishlist and orders are saved in the browser (localStorage). There is no server or database.
- Product images are used for academic demonstration only.
