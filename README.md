# Movie Reservation System

A cinema seat-booking interface built with plain HTML, CSS and JavaScript — no frameworks, no
build step, no backend. Open `index.html` in a browser and it runs.

## How it works

The screen is split into three panels:

**Left — user information.** Name, surname, e-mail, phone and age. Submitting the form creates
the current user and decides two things: the ticket price and whether the user is an admin.

**Centre — the seating chart.** An admin enters a row and column count and the grid is
generated on the fly. Regular users click seats to select or deselect them; selected seats
display their price, and confirmed seats are greyed out and become unclickable.

**Right — reservation details.** Live summary of the selected seats and the running total,
with a Confirm button that shows the final booking.

## Pricing

Ticket price is derived from the age entered in the form:

| Age | Price |
| --- | --- |
| Under 18 | $10 |
| 18–25 | $15 |
| 26–64 | $25 |
| 65 and over | $10 |

Each seat is priced at the moment it is selected, so the total is simply the sum of the
selected seats.

## Roles

Signing in with `admin@admin.com` unlocks the admin panel, which is the only way to define the
seat layout. Any other e-mail address is treated as a regular customer and can only select
from an already-generated grid.

## Files

```
moviereservationsystem/
  index.html    the three-panel layout
  style.css     grid, seat states and panel styling
  script.js     pricing, role check, seat selection, confirmation
```

## Scope

This is a front-end exercise, so a few things are deliberately out of scope:

- **No persistence.** Seat state lives in memory only; refreshing the page clears every
  reservation and the seating chart itself.
- **No real authentication.** The admin check is a single string comparison in the browser,
  which is fine for a demo and unsuitable for anything else.
- **Single session.** There is no server, so two visitors cannot see each other's bookings.
