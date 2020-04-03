const solutions = [
  "rrbybbyybyyrrbrrrrryybbsb",
  "ryybryrbyrsbbrbrrrbybyybr",
  "bbbrrrsyrrbyyybybrybrbrry",
  "rbybbybrrrbbsryrryyrbyrby",
  "byyybrrbryryyrrbrbrbyrsbb",
  "ybrrrbbryyrbrbrbsybyrrbyy",
  "rbybbsryrbbyybyrrryryrbbb",
  "rrybrbrsybyyybbrrbrrbybry",
  "yrrbbrbbbyyyrybsbrrrrbryy",
  "rbyrbysbbybybyrrybrrbrbyr",
  "byryrrbybbrybrrsbbyryrbyb",
  "ybryrrsyrbrbyrbbbrrbybyyb",
  "byybbryryybrbbrbrsrrbyyrr",
  "rybbryrbrybrbyrybrbbysbyr",
  "rbbyrrbrbbybyryyysbybbrrr",
  "yryyrbyrbbbbrrrrysybbbbry",
  "brrryyybrbybybrbrrbbsybyr",
  "byrbrbryrrbrbsyyrrbbyyybb",
  "brrrybryybybbyrrybsbbryrb",
  "rbybyybrrbbrsryybybbbryrr",
  "bybrrrbrrbybsyybrybrbybry",
  "yrbsrryrybbybbbbyyrbyrbrr",
  "ybrrbbbyryrbrbrybrybrybsy",
  "bybrryrrybybbyrbrbsybrryr",
  "rysybyrbrrybrbrbybbryrybb",
  "brbbrrryryyyrbbbybyryrrbs",
  "ybsrbybyryrbrbryrrrbyrybb",
  "rbybrrbryrbybbrybsyrrryyb",
  "bbrrrbyrybrybrbybyrbsrryy",
  "yrysbbbrbyyyrbrrbybbyrrrr",
  "brbybrrybrrbryrybybbsyyrb",
  "byrbybbyysbbrbryrrbrryrby",
  "rbysrbyrybyyrbbrbrbyryrrb",
  "ybybybyryrbrbbbrbryrrrysr",
  "yrbyyybbbrrysrbryrrbrbbyr",
  "rbyybbybyrbrrrsrbrrbyybby"
];

function getRandomSolution() {
  const hydration = {
    r: "red",
    b: "blue",
    y: "yellow",
    s: "black"
  };
  const solutionIndex = Math.floor(Math.random() * solutions.length);
  const solution = solutions[solutionIndex].split("");
  return solution.map(value => hydration[value]);
}

function getSolution() {
  const rotations = Math.floor(Math.random() * 4);
  let solution = getRandomSolution();
  for (let i = 0; i < rotations; i++) {
    solution = rotate(solution);
  }
  return solution;
}

function rotate(solution) {
  return [
    solution[20],
    solution[15],
    solution[10],
    solution[5],
    solution[0],
    solution[21],
    solution[16],
    solution[11],
    solution[6],
    solution[1],
    solution[22],
    solution[17],
    solution[12],
    solution[7],
    solution[2],
    solution[23],
    solution[18],
    solution[13],
    solution[8],
    solution[3],
    solution[24],
    solution[19],
    solution[14],
    solution[9],
    solution[4]
  ];
}
module.exports = getSolution;
