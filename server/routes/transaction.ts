import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Getting transactions.");
});

router.post("/", (req, res) => {
  res.send("Transaction added.");
});

router.put("/", (req, res) => {
  res.send("Transaction updated.");
});

router.delete("/", (req, res) => {
  res.send("Transaction deleted.");
});

// module.exports = router;
export default router;