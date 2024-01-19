const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/TicketCancel", (req, res) => {
  const { ticket, mobile, uid } = req.body;
  const values = [ticket, mobile, uid];
  const sql =
    "SELECT * FROM TICKETCANCEL WHERE TICKET_NO  = ? AND MOBILE = ? AND UID = ?";
  db.query(sql, values, (err, result) => {
    if (err) res.status(500).send(err);
    if(result.length === 0)
    return res.json({message:'No records found'})
    res.status(200).send(result);
  });
});

app.delete("/TicketCancel/:ticket_no", (req, res) => {
  const ticket_no = parseInt(req.params.ticket_no); // Parse the specific parameter to an integer
  const values = [ticket_no];
  const sql = "DELETE FROM TICKETCANCEL WHERE TICKET_NO = ?";

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).send(err);
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "No record found" });
      return;
    }

    res.status(200).send(result);
  });
});

app.post("/buses", (req, res) => {
  const { from, to, date } = req.body;
  const values = [from, to, date];
  const sql =
    "SELECT * FROM AKBUSES WHERE FROM_PLACE = ? AND TO_PLACE = ? AND JOURNEY_DATE = ?";
  db.query(sql, values, (err, result) => {
    if (err) return console.log(err);
    res.status(200).send(result);
  });
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "busesdata",
});

db.connect((err) => {
  if (err) console.log("Cannot connected to database", err);
  console.log("sucessfully connected ");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
