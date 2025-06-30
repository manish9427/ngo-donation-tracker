# NGO Donation Tracker

A lightweight MVP for tracking food donations with a charcoal sketch and glowing lantern aesthetic.

## Setup
1. Install dependencies: `npm install`
2. Set up MongoDB Atlas:
   - Create a cluster and get the connection URI.
   - Add the URI to `.env.local` as `MONGODB_URI`.
3. Add a lantern image to `public/lantern.png` (optional).
4. Run the app: `npm run dev`
5. Access at `http://localhost:3000`

## Features
- Add new donations (donor name, food type, quantity)
- View and search donations
- Filter by status

## Deployment
Deployed on Vercel: [Link to be added]
Git Repository: [Link to be added]



# NGO Donation Tracker MVP Write-Up

## User Problem Solved
The focus is **tracking donations**, providing an efficient system to record and monitor food donations for NGOs. The updated design incorporates a charcoal sketch aesthetic with glowing lanterns to create a warm, inviting interface, addressing previous UI/UX feedback.

## Design Rationale
- **Functionality**: Users can add, view, search, and filter donations by status, with validated inputs.
- **Tech Stack**: Next.js with TypeScript for type safety, MongoDB Atlas for persistence.
- **UX**: Improved with a sketch-like texture, animated lanterns, and better spacing. Validation prevents invalid data.
- **Visuals**: Charcoal sketch effect via textured background and borders, with glowing lanterns as decorative animations.

## Coding, Performance, and UX Decisions
- **Coding**: API routes support filtering; CSS handles the sketch and lantern effects.
- **Performance**: MongoDB queries are optimized; lantern animations use minimal resources.
- **UX**: Clean table layout, validated form, and decorative lanterns enhance engagement.
- **Trade-offs**:
  - No edit/delete to focus on core features.
  - Basic validation (required fields, quantity > 0).
  - Lanterns are decorative, not interactive.

## Scalability for 1,000 NGOs
- **Database**: MongoDB Atlas with sharding and tenant IDs.
- **Backend**: Add authentication, caching, and rate limiting.
- **Performance**: Pagination, edge functions.
- **Deployment**: Vercel or AWS with CDN.
- **Features**: Edit/delete, advanced filters, reports.

## Shortcuts and Trade-offs
- No edit/delete or advanced validation.
- Lanterns are static animations, not functional.
- Minimal accessibility enhancements.

## Submission
- **Prototype**: Vercel URL to be provided.
- **Git Repository**: GitHub link to be provided.
- **Access**: Via Vercel URL, with setup in README.