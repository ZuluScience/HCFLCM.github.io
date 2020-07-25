let solver;
let state;
let HCFButton;
let numberArray;
function setup() {
    createCanvas(700, 700);
    state = 'Choose Number';
    HCFButton = new Button(createVector(width / 2 - 50, height / 2), 60, 30, 'HCF', 10);
    LCMButton = new Button(createVector(width / 2 + 50, height / 2), 60, 30, 'LCM', 10);
    numberArray = new NumberArray();
}
function draw() {
    background(200);
    if (state === 'Choose Number') {
        numberArray.run();
        if (numberArray.go) {
            state = 'Choose Mode';
        }
    } else if (state === 'Choose Mode') {
        textSize(30);
        textAlign(CENTER);
        text('HCF or LCM?', width / 2, height / 5);
        HCFButton.show();
        LCMButton.show();
        solver = new Solver(numberArray.numbersToSolve);
        if (HCFButton.amPressed()) {
            state = 'solve';
            solver.mode = 'HCF';
            solver.findFactors();
        } else if (LCMButton.amPressed()) {
            state = 'solve';
            solver.mode = 'LCM';
            solver.findFactorsLCM();
        }

    } else {
        solver.run();
        if (solver.finished) {
            state = 'Choose Number';
            numberArray.go = false;
        }
    }
    
}
function mouseClicked() {
    if (state === 'Choose Mode' || state === 'solve'){
        solver.clicked = true;

    }
    for (let numberChooser of numberArray.numbers) {
        for (let buttons of numberChooser.buttons) {
            for (let button of buttons) {
                button.clicked = true;
            }
        }
    }
}
