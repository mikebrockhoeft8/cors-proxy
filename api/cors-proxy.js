export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  try {
    const response = await fetch(targetUrl);
    const data = await response.text(); // or .json() if it's JSON
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', response.headers.get('content-type'));
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch target URL', details: err.toString() });
  }
}
