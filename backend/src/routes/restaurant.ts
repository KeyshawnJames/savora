import express from "express";

// A Router is a mini-app grouping all /restaurants routes. It's mounted under
// the "/restaurants" prefix in index.ts, so paths here are relative to that.
const router = express.Router();

// GET /restaurants — placeholder; will return the list of restaurants next.
router.get("/", (req, res) => {
  res.send("restaurant route works");
});

export default router;
