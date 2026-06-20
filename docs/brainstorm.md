# Brainstorm: Savora

## Project Idea

Savora's primary focus is unification: right now booking is scattered across many different restaurant booking apps/sites, and menus are scattered across inconsistent formats or missing entirely. Savora brings booking and menus together into one place for customers, so they don't need a different app or site for every restaurant. On top of that unified base, customers can discover new restaurants and see where their friends have been — and over time, a fuller social media layer gets built on top of that.

For restaurants, Savora gives them a page to express themselves and their food (customizable, with an AI-assisted builder as one feature of that, not the main focus) — but the core hook for customers is having one place instead of many.

It blends a few things that today live in separate apps:
- A unified booking + menu layer, so customers aren't bouncing between different restaurants' individual booking systems and menu formats
- A page for each restaurant to express their brand and food (customizable; AI-assisted page generation from an imported menu is one feature of this, not the centerpiece)
- A discovery and (eventually, growing) social layer — trending restaurants, friends' visits — that gets layered on top of the unified base
- A business/marketing layer connecting restaurants with local influencers for promotional deals

## Problem Statement

- Booking is fragmented — many restaurants each use their own booking app/site (or none), so customers juggle multiple apps just to make reservations across different restaurants.
- Menus are scattered across inconsistent formats (PDFs, photos, third-party sites) and some restaurants don't have one online at all — this creates friction when customers try to find or evaluate a new restaurant.
- Because booking and menus are scattered, there's no single place for customers to discover new restaurants, see what's available, and book — let alone see where friends have gone. Right now that discovery/social layer doesn't really exist for restaurants the way it does for other categories.
- Restaurants without design or dev resources struggle to express their brand and food online; even those with a website often end up with something generic or dated-looking.

## Target Users

- **Customers**: people who want a single, visually engaging place to discover restaurants, view real menus and food photos, see what friends/others think, and book a table — similar to how they currently use Beli/Instagram/Google Maps together.
- **Restaurants**: owners or staff (likely with little to no design/dev skill) who want a page that looks professionally designed without hiring a designer or developer, and who want a channel to reach customers and influencers directly.
- **Influencers / content creators**: people who post food content (e.g. on TikTok) and want a direct way to be discovered by restaurants for promotional deals.

## Goals

- **Learning goals:** I want real, structured software-building experience end-to-end. I want Claude to act like a senior engineer pairing with me — helping plan, structuring the work, offering suggestions and sanity-checking my ideas, and guiding me through building rather than handing over finished code or going fully hands-off.
- **Product goals:** This is meant to become a real, launchable product — not just a learning exercise. Success looks like restaurants actually creating pages, customers actually discovering/booking through it, and a viable path to revenue (see pricing ideas below).

## Collaboration Preferences

- **Overall learning style:** Structured/guided, but product-oriented — closer to "guided" than "hands-off," but the emphasis is on planning, structure, and decision-making support rather than line-by-line teaching of basic syntax. I want Claude to act like a senior dev collaborator: propose approaches, flag tradeoffs, sanity-check my own ideas, and let me drive the build with that support.
- **Notes:** Revisit this per stack-component in Phase 3 — some pieces (e.g. infra/boilerplate) may be fine hands-off, while core product logic is where I want to actually build and learn with guidance.

## Initial Thoughts / Raw Brainstorm

Inspired by restaurant webpage menus, Instagram, OpenTable, and Beli.

**App / social aspect**
- Unified restaurant experience with social features layered on top — discovery + culture, not just utility.
- Instagram-like: share images, search, find pages, comment.
- Beli-like: view trending restaurants, see what others think, see where friends have gone/are going.
- Profiles show top restaurants, count of restaurants visited, favorite restaurant, etc.
- Restaurants can find and connect with local influencers through a business version of Savora to form promo deals.

**Restaurant aspect**
- Restaurants create and customize their own page: custom fonts, font color/size, heading size, custom backgrounds.
- Restaurants import their existing menu; AI converts it into a chosen visual theme (presets + a described custom style via an AI page builder).
- Potential revenue: charge for account creation, charge for AI page creation, offer food photography as an add-on service.

**Customer aspect**
- Easily find and save favorite restaurants.
- Browse menus easily, browse photos, read reviews.
- Direct interaction with restaurant pages.
- Creators who post food content (e.g. TikTok) can cross-post directly to Savora — doubles as an influencer discovery surface for restaurants.
- Community/forum-style discussion about restaurants and food, even for restaurants that don't have a Savora page yet.
- Search by dish (not just restaurant) and see every page that has it; AI can suggest similar dishes; restaurants can pay for top placement in search.

**Other services**
- Food and restaurant photography as a paid add-on service Savora itself could offer.

**Pricing model ideas (raw, to revisit in Phase 3/vision)**
- Cut from bookings.
- Paid access for restaurants to view/contact influencers for promotional material.
- Paid photoshoots for food/restaurant.
- Potential subscription model.
- Paid placement in dish/restaurant search results.

**Open questions to resolve in Phase 2 (Vision):**
- What's the actual MVP — likely too much to build all of this at once (page builder + AI theming + social feed + booking + influencer marketplace + photography service are each substantial).
- Which single wedge proves the concept first: the restaurant page builder, or the customer discovery/social feed?
- Booking — build in-house or integrate with an existing reservation system initially?
