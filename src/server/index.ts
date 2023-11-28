import express from "express";

// Caching strategy depends on requirements.
// For now just fetch once.
const cache = fetch(
  "https://s3.eu-west-2.amazonaws.com/interview.mock.data/payload.json"
).then((payload) => payload.json());

const app = express();
app.use(express.static(__dirname));
app.get("/api", async (_, res) => {
  try {
    res.status(200).json(await cache);
  } catch (err) {
    res.status(500).json({
      error: "Could not get API",
    });
  }
});
app.listen(3000, () => console.log("started"));
