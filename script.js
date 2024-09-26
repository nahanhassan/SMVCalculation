let cycleTime = document.getElementById("ct").value;
let ctN = parseInt(cycleTime);

let ratingFactor = document.getElementById("rf").value;
let rfN = parseFloat(ratingFactor);

let allowance = document.getElementById("alw").value;
let alwN = parseInt(allowance);

let calculation = document.getElementById("cal");
let display = document.getElementById("dis");

calculation.addEventListener("click", function (e) {
  e.preventDefault();
  let smv;
  smv = ctN * rfN;

  console.dir(cycleTime, smv);
  console.log("hello");
});
