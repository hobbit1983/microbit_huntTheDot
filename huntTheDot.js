let curY = 0
let curX = 0
let y = 0
let x = 0
let counter = 0
let gameWon = false
let gameStarted = false

input.onButtonPressed(Button.B, () => {
    gameStarted = false
    gameWon = false
    counter = 0
    basic.showLeds(`
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . .
        `)
})
input.onButtonPressed(Button.A, () => {
    //update game state
    gameStarted = true
    gameWon = false

    //animate to say we are hiding a dot
    for (let i = 0; i < 2; i++) {
        basic.showIcon(IconNames.SmallDiamond)
        basic.pause(250)
        basic.showIcon(IconNames.Diamond)
        basic.pause(250)
    }

    //where is the dot hiding
    x = Math.random(5)
    y = Math.random(5)

    //start in the middle
    curX = 2
    curY = 2
    led.plot(curX, curY)

    //while we haven't found the dot use tilt to move the dot
    while (!(gameWon)) {
        if (input.acceleration(Dimension.X) < 0 && curX > 0) {
            curX = curX - 1
        }
        if (input.acceleration(Dimension.X) > 0 && curX < 4) {
            curX = curX + 1
        }
        if (input.acceleration(Dimension.Y) < 0 && curY > 0) {
            curY = curY - 1
        }
        if (input.acceleration(Dimension.Y) > 0 && curY < 4) {
            curY = curY + 1
        }
        //clear the screen and show where the current guess is
        basic.clearScreen()
        led.plot(curX, curY)

        //if the dot is found animate it's position
        if (curX == x && curY == y) {
            gameWon = true
            counter = counter + 1
            basic.clearScreen()
            for (let i = 0; i < 4; i++) {
                led.plot(curX, curY)
                basic.pause(250)
                basic.clearScreen()
                basic.pause(250)
            }
            basic.showIcon(IconNames.Yes)
            basic.pause(500)
            basic.showNumber(counter)
            basic.pause(500)
        }
        basic.pause(250)
    }

    //update the game state and show how to restart
    gameStarted == false
    basic.showLeds(`
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . .
        `)
})
while (!(gameStarted)) {
    basic.showLeds(`
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . .
        `)
}

