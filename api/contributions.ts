/**
 * GET /api/contributions — the last year of GitHub contributions, parsed from
 * the public contributions calendar (no token needed). Cached for 6 hours.
 */
const USERNAME = 'SpaceWalkerr';

export async function GET(): Promise<Response> {
  try {
    const res = await fetch(`https://github.com/users/${USERNAME}/contributions`, {
      headers: { 'User-Agent': 'surajnandan.in' },
    });
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    const html = await res.text();

    // Cells: <td data-date="2025-09-21" id="contribution-day-component-0-0" data-level="1">
    const levels = new Map<string, { date: string; level: number }>();
    for (const m of html.matchAll(/data-date="(\d{4}-\d{2}-\d{2})"\s+id="([^"]+)"[^>]*data-level="(\d)"/g)) {
      levels.set(m[2], { date: m[1], level: Number(m[3]) });
    }
    // Counts live in tooltips: <tool-tip for="contribution-day-component-0-0">2 contributions on …
    const counts = new Map<string, number>();
    for (const m of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>\s*(No|\d+) contributions?/g)) {
      counts.set(m[1], m[2] === 'No' ? 0 : Number(m[2]));
    }

    const days = [...levels.entries()]
      .map(([id, d]) => ({ date: d.date, level: d.level, count: counts.get(id) ?? 0 }))
      .sort((a, b) => a.date.localeCompare(b.date));
    if (!days.length) throw new Error('calendar markup changed');

    const total = days.reduce((sum, d) => sum + d.count, 0);
    // Current streak, counting back from the latest day (today may still be empty)
    let streak = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].count > 0) streak++;
      else if (i !== days.length - 1) break;
    }

    return Response.json(
      { username: USERNAME, total, streak, days },
      { headers: { 'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400' } }
    );
  } catch (error) {
    console.error('contributions error', error);
    return Response.json({ error: 'unavailable' }, { status: 502, headers: { 'Cache-Control': 'public, s-maxage=300' } });
  }
}
