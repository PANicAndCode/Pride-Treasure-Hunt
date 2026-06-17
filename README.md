# Pride Hunt

This package is a reusable QR-based Pride-themed race site with unlimited custom teams, join-or-create team flow, mascot selection, shared live progress, named game presets, and a random clue order for each team. Clues 1 through 10 are shuffled once per team, clue 11 stays last for everyone, and the leaderboard ranks finished teams by fastest completion time.

## What is included
- Website files (`index.html`, `styles.css`, `config.js`, `supabase-config.js`)
- Split runtime files (`script-part-1.js` through `script-part-4.js`) for deployment
- `treasure_hunt_setup.sql` for a brand-new Pride Hunt Supabase setup
- `leaderboard_and_progress_setup.sql` as an alternate full setup file
- `dynamic_teams_migration.sql` for upgrading an older Pride Hunt database with timing, presets, and hint-sync fields
- `supabase-config.js` for your project URL and anon key

## Setup
1. Upload the website files to your new Pride Hunt repo.
2. Put your real Supabase URL and anon key into `supabase-config.js`.
3. Run `treasure_hunt_setup.sql` in Supabase.
4. If you are upgrading an older Pride Hunt install, run `dynamic_teams_migration.sql` once after the main setup file.
5. Hard refresh phones after publishing.

## Database tables
- `leaderboard_pride_hunt`
- `team_progress_pride_hunt`
- `game_presets_pride_hunt`

## Notes
- This build remembers the same team on the same device after the first join.
- Players can either create a new team or join an existing team that was already created.
- The admin view is available from the opening screen and the top bar.
- `Leave this device` is admin-only.
- The admin panel can reset one team or wipe the full game.
- The admin panel can save multiple named game presets, switch the live preset, and delete old custom presets.
- Each preset can edit clue text, location, and hints for clues 1 through 10. Clue 11 stays the final clue, but its clue text and location are editable.
- Map features are intentionally disabled in this build.
- Finished teams are ranked by `completion_time_ms`, and unfinished teams stay underneath with a live race clock.
- The visual theme follows the device light/dark setting automatically.
- Change `ADMIN_PASSCODE` in `script-part-1.js` before using this for a real event.
