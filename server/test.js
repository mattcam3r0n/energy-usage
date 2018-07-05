import Egauge from "./Egauge";
import moment from "moment";
console.log(Egauge);

const eg = new Egauge();

/* NOTES
* use d to get data in days, then skip N-1 days.
* use data from row 1 (not 0). always ignore first row.
* divide 3,600,000 to get kWh
* s should be 1 less than you're looking for.  if you want 3d usage, use 2. 1d, use 0.
* n should be 1 more than you'd expect.  n = 3 to get two rows back. and use row 2 (1).
* f - from timestamp - should be most recent
* t - to timestamp - should be least recent
* 
* Examples
* 1 day usage: d, s = 0, n = 3
* 3 day usage: d, s = 2, n = 3
* 30 day usage: d, s = 29, n = 3 
* 1 day usage from given start date: d, s=0, n=3, f=1529686996 (unix timestamp)


* fetch two specific points in time (more recent ts first)
http://egauge17632.egaug.es/cgi-bin/egauge-show?n=1&d&T=1529730000,1529470800

*/

eg.getStoredData({
  a: null,
  C: null,
  m: null,
  n: 720,
  s: 1,
  t: moment().subtract(1, "d").unix(),
}).then((data) => {
  console.log(data.rows);
  console.log("use:", data.rows[1].cells[0] / 3600000);
  console.log("gen:", data.rows[1].cells[1] / 3600000);
});

// eg.getStoredData({
//   T: moment().unix() + "," + moment().subtract(1, "days").unix()
// }).then((data) => {
//   console.log(data);
//   console.log("use:", data.rows[1].cells[0] / 3600000);
//   console.log("gen:", data.rows[1].cells[1] / 3600000);
// });
