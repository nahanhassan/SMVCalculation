let lCurve = {
  veryBasic: [0.4, 0.5, 0.6, 0.7, 0.75, 0.75, 0.75, 0.8, 0.8, 0.85],
  basic: [0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.75, 0.75, 0.8, 0.8],
  semiCritical_1: [0.25, 0.35, 0.45, 0.55, 0.6, 0.65, 0.65, 0.7, 0.7, 0.75],
  semiCritical_2: [0.2, 0.3, 0.4, 0.5, 0.55, 0.6, 0.6, 0.6, 0.65, 0.7],
  critical_1: [0.15, 0.25, 0.35, 0.45, 0.55, 0.55, 0.6, 0.6, 0.6, 0.65],
  critical_2: [0.15, 0.25, 0.35, 0.45, 0.55, 0.55, 0.55, 0.6, 0.6, 0.6],
  heavyCritical_1: [0.1, 0.2, 0.3, 0.4, 0.5, 0.5, 0.5, 0.55, 0.55, 0.6],
  heavyCritical_2: [0.1, 0.2, 0.3, 0.4, 0.5, 0.5, 0.5, 0.5, 0.55, 0.55],
};

function category(smv) {
  switch (true) {
    case smv <= 4.5:
      return "veryBasic";
    case smv >= 4.51 && smv <= 7.5:
      return "basic";
    case smv >= 7.51 && smv <= 11.5:
      return "semiCritical_1";
    case smv >= 11.51 && smv <= 15.0:
      return "semiCritical_2";
    case smv >= 15.01 && smv <= 18.5:
      return "critical_1";
    case smv >= 18.51 && smv <= 22.0:
      return "critical_2";
    case smv >= 22.01 && smv <= 25.0:
      return "heavyCritical_1";
    case smv >= 25.01:
      return "heavyCritical_2";
  }
}

let orderQty = 1000;
let smv = 7.4;
let machine = 20;
let helper = 4;
let manpower = machine + helper;
let setupTime = (machine * 9) / 60;
let workingHours = 10;
let hundredTarget = (60 * manpower * workingHours) / smv;
let hundredProduce = hundredTarget * smv;
let productCategory = category(smv);
let learningCurve = lCurve[productCategory];

let maxDays = 18;
let totalProduction = 0;
let totalProductionArray = [];
let dayProductionArray = [];
let runDays = [];
let newDays = production();

let totalAvailableHours = manpower * workingHours * newDays;
let totalProduceHours = 0;
let lines = orderQty / totalProductionArray[totalProductionArray.length - 1];

/* function production() {
  for (let i = 1; i <= maxDays; i++) {
    if (i <= 10) {
      let dayProduction = Math.round((learningCurve[i] / 100) * hundredTarget);
      totalProduction += Math.round((learningCurve[i] / 100) * hundredTarget);
      totalProductionArray.push(totalProduction);
      if (totalProduction >= orderQty) {
        break;
      } else {
        dayProductionArray.push(dayProduction);
      }
    } else {
      let dayProduction = Math.round((learningCurve[10] / 100) * hundredTarget);
      totalProduction += Math.round((learningCurve[10] / 100) * hundredTarget);
      totalProductionArray.push(totalProduction);
      dayProductionArray.push(dayProduction);

      if (totalProduction >= orderQty) {
        break;
      } else {
        dayProductionArray.push(dayProduction);
      }
    }
  } */

function production() {
  for (let i = 0; i <= maxDays; i++) {
    if (i <= 9) {
      let dayProduction = Math.round(learningCurve[i] * hundredTarget);
      totalProduction += Math.round(learningCurve[i] * hundredTarget);
      totalProductionArray.push(totalProduction);

      if (totalProduction >= orderQty) {
        break;
      } else {
        dayProductionArray.push(dayProduction);
      }
    } else {
      let dayProduction = Math.round(learningCurve[9] * hundredTarget);
      totalProduction += Math.round(learningCurve[9] * hundredTarget);
      totalProductionArray.push(totalProduction);
      dayProductionArray.push(dayProduction);

      if (totalProduction >= orderQty) {
        break;
      } else {
        dayProductionArray.push(dayProduction);
      }
    }
  }

  return dayProductionArray;
}

let dayProductionSum = 0;
for (let i = 0; i <= dayProductionArray.length - 1; i++) {
  dayProductionSum += dayProductionArray[i];
}

let remainingQty = orderQty - dayProductionSum;
if (remainingQty >= 0) {
  dayProductionArray.push(remainingQty);
}

let dayProductionSumN = 0;
for (let i = 0; i <= dayProductionArray.length - 1; i++) {
  dayProductionSumN += dayProductionArray[i];
}

console.log(dayProductionArray);
console.log(totalProductionArray);
console.log({ dayProductionSum, dayProductionSumN, dayProductionArray });

function produceCount() {
  for (let i = 1; i <= newDays; i++) {
    if (i <= 10) {
      totalProduction += (learningCurve[i] / 100) * hundredTarget;
      totalProductionArray.push(totalProduction);
    } else {
      totalProduction += (learningCurve[10] / 100) * hundredTarget;
      totalProductionArray.push(totalProduction);
    }
  }

  for (let j = 0; j <= totalProductionArray.length; j++) {
    if (totalProductionArray[j] <= orderQty) {
      runDays.push(j);
    }
  }
  return runDays.length + 1;
}

/* const lProduction =
  style.smv > 5
    ? lCurve2.map((n) => {
        return (n * style.perDayProduction) / 100;
      })
    : lCurve1.map((n) => {
        return (n * style.perDayProduction) / 100;
      });

let sum = 0;
for (let i = 0; i < lProduction.length; i++) {
  sum = sum + lProduction[i];
  if (sum <= style.orderQty) {
    console.log(sum, lProduction[i]);
  }
}

let style = {
  orderQty: 100,
  smv: 4.5,
  reqManpower: 26,
  get perDayProduction() {
    return Math.round((600 * this.reqManpower) / this.smv);
  },
  get reqDays() {
    return Math.round(this.orderQty / this.perDayProduction);
  },
}; */



