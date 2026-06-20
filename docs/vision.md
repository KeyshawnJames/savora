# Vision: Savora

## Product Overview

Savora is a web platform (mobile to follow later) where customers can browse a unified set of restaurant pages — menus, photos, location, and hours — without needing a separate app or site per restaurant. For the MVP, a small number of real restaurants are onboarded manually to seed the platform with genuine content. Browsing is public; an account is only needed to save favorite restaurants, send booking requests, and (later) take part in the social/discovery layer.

## Core Features

- Public restaurant pages: name, location, hours, full menu, photo gallery
- Public browsing/search across all seeded restaurants — no account required
- Customer accounts: sign up/log in to save favorite restaurants and send booking requests
- Booking requests: a simple request form per restaurant (not real-time availability) — proves the "unification" pitch without building reservation infra yet
- Manual restaurant onboarding: founder-created pages for a handful of real restaurants at launch

## MVP Scope

**Included in MVP:**
- Web app (React, TypeScript, Tailwind)
- Public restaurant pages with menu, photos, hours, location
- Public browse/search of seeded restaurants
- Customer account creation (sign up/log in)
- Save favorite restaurants (requires account)
- Booking request form per restaurant (requires account) — request only, not real-time availability/confirmation
- A small number of restaurants onboarded manually by hand (not self-serve)

**Explicitly excluded from MVP (for now):**
- Self-serve restaurant signup / page builder
- AI-assisted page theming/generation
- Real-time booking availability and confirmed reservations
- Reviews
- Social/discovery layer (friends' visits, trending, profiles, following)
- Influencer-restaurant marketplace
- Food/restaurant photography service
- Mobile app
- Any monetization (booking cut, subscriptions, paid placement, etc.)

## User Flow

1. A customer lands on Savora and browses restaurant pages without signing up — sees menus, photos, hours, location.
2. They find a restaurant they like and either save it (prompted to create an account) or submit a booking request (also requires an account).
3. Once signed up, they can revisit their saved restaurants and see the status of any booking requests they've sent.
4. Behind the scenes, the founder has manually created each restaurant's page (no self-serve builder yet) — content is seeded by hand to ensure quality for the first real restaurants on the platform.

## Future Features

- Self-serve restaurant signup and page builder (with custom fonts/colors/layout), with AI-assisted page generation from an imported menu as one feature of that builder
- Real-time booking availability and confirmed reservations, replacing the request-form flow
- Reviews
- Social/discovery layer: trending restaurants, seeing where friends have been, public profiles (restaurants visited, favorites) — growing into a fuller social media layer over time
- Influencer-restaurant marketplace for promotional deals
- Food/restaurant photography as a paid add-on service
- Mobile app (after the web version is built)
- Monetization: cut from bookings, paid influencer access, paid photoshoots, subscriptions, paid search placement
