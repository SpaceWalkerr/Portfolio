/**
 * GET /api/leetcode — solved counts and contest rating from LeetCode's public
 * GraphQL endpoint (no CORS for browsers, so it's proxied here). Cached at
 * the edge for 6 hours.
 */
const USERNAME = 'SurajNandan';

const QUERY = `query($u: String!) {
  matchedUser(username: $u) {
    submitStatsGlobal { acSubmissionNum { difficulty count } }
    profile { ranking }
  }
  userContestRanking(username: $u) { rating attendedContestsCount topPercentage }
  allQuestionsCount { difficulty count }
}`;

interface Count {
  difficulty: 'All' | 'Easy' | 'Medium' | 'Hard';
  count: number;
}

export async function GET(): Promise<Response> {
  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Referer: 'https://leetcode.com' },
      body: JSON.stringify({ query: QUERY, variables: { u: USERNAME } }),
    });
    if (!res.ok) throw new Error(`LeetCode ${res.status}`);
    const { data } = await res.json();
    const solved: Count[] = data?.matchedUser?.submitStatsGlobal?.acSubmissionNum ?? [];
    const total: Count[] = data?.allQuestionsCount ?? [];
    const pick = (list: Count[], d: Count['difficulty']) => list.find((c) => c.difficulty === d)?.count ?? 0;
    const contest = data?.userContestRanking;

    const body = {
      username: USERNAME,
      solved: { all: pick(solved, 'All'), easy: pick(solved, 'Easy'), medium: pick(solved, 'Medium'), hard: pick(solved, 'Hard') },
      available: { all: pick(total, 'All'), easy: pick(total, 'Easy'), medium: pick(total, 'Medium'), hard: pick(total, 'Hard') },
      ranking: data?.matchedUser?.profile?.ranking ?? null,
      contest: contest
        ? { rating: Math.round(contest.rating), attended: contest.attendedContestsCount, topPercentage: contest.topPercentage }
        : null,
    };
    return Response.json(body, {
      headers: { 'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400' },
    });
  } catch (error) {
    console.error('leetcode error', error);
    return Response.json({ error: 'unavailable' }, { status: 502, headers: { 'Cache-Control': 'public, s-maxage=300' } });
  }
}
