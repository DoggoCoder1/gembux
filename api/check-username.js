export default async function handler(req, res) {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Missing username" });
  }

  const profileUrl = `https://www.roblox.com/users/profile?username=${encodeURIComponent(username)}`;

  try {
    const response = await fetch(profileUrl, {
      method: 'GET',
      redirect: 'manual' // So we can read 302 headers
    });

    if (response.status === 302 && response.headers.get('location')?.includes('/users/')) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from Roblox' });
  }
}
