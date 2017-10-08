basic.forever(() => {
    //DRAW STUFF
    basic.clearScreen()
    if (input.buttonIsPressed(Button.A) && (game_state == 1 || game_state == 2)) {
        game_state = 0;
        dot_pos = [2, 2]
        dot_dir = 0
        // game.startCountdown(10000)
    }
    if (game_state == 1) {

        basic.showLeds(`
1 1 1 . .
1 . . 1 .
1 1 1 . .
1 . . 1 .
1 1 1 . .
`)
        return;
    }
    if (game_state == 2) {

        basic.showLeds(`
. 1 1 1 .
1 . . . 1
1 1 1 1 1
1 . . . 1
1 . . . 1
`)
        return;
    }


    //MOVE PADDLE
    paddle_pos_a[1] = pins.map(input.rotation(Rotation.Pitch), -90, 90, 0, screen_size[1])

    //MOVE DOT
    if (move_counter > 4) {
        move_counter = 0
        switch (dot_dir) {
            case 0:


                if (dot_pos[1] == paddle_pos_b[1] + 1 && dot_pos[0] == paddle_pos_b[0] + 1) {
                    dot_dir = 3
                    return;
                } else if (dot_pos[1] == paddle_pos_b[1] && dot_pos[0] == paddle_pos_b[0] - 1) {
                    dot_dir = 2
                    return;
                }

                dot_pos[0] += 1
                dot_pos[1] -= 1
                paddle_pos_b[1] = dot_pos[1]
                if (dot_pos[0] >= screen_size[0] - 1) {
                    game_state = 1
                    break;
                }
                if (dot_pos[1] <= 0) {
                    dot_dir = 1
                }

                break;
            case 1:

                if (dot_pos[1] == paddle_pos_b[1] + 1 && dot_pos[0] == paddle_pos_b[0] + 1) {
                    dot_dir = 2
                    return;
                } else if (dot_pos[1] == paddle_pos_b[1] && dot_pos[0] == paddle_pos_b[0] - 1) {
                    dot_dir = 3
                    return;
                }

                dot_pos[0] += 1
                dot_pos[1] += 1
                paddle_pos_b[1] = dot_pos[1]
                if (dot_pos[0] >= screen_size[0] - 1) {
                    game_state = 1
                    break;
                }

                if (dot_pos[1] >= screen_size[1] - 1) {
                    dot_dir = 0
                }
                break;
            case 2:
                if (dot_pos[1] - 1 == paddle_pos_a[1] && dot_pos[0] - 1 == paddle_pos_a[0]) {
                    dot_dir = 1
                    return;
                } else if (dot_pos[1] == paddle_pos_a[1] && dot_pos[0] - 1 == paddle_pos_a[0]) {
                    dot_dir = 0
                    return;
                }

                dot_pos[0] -= 1
                dot_pos[1] -= 1
                paddle_pos_b[1] = dot_pos[1]
                if (dot_pos[0] <= 0) {
                    game_state = 2
                    break;
                }
                if (dot_pos[1] <= 0) {
                    dot_dir = 3
                }
                break;
            case 3:
                if (dot_pos[1] + 1 == paddle_pos_a[1] && dot_pos[0] - 1 == paddle_pos_a[0]) {
                    dot_dir = 0
                    return;
                } else if (dot_pos[1] == paddle_pos_a[1] && dot_pos[0] - 1 == paddle_pos_a[0]) {
                    dot_dir = 1
                    return;
                }

                dot_pos[0] -= 1
                dot_pos[1] += 1
                paddle_pos_b[1] = dot_pos[1]
                if (dot_pos[0] <= 0) {
                    game_state = 2
                    break;
                }

                if (dot_pos[1] >= screen_size[1] - 1) {
                    dot_dir = 2
                }
                break;
        }
    }
    move_counter += 1
    paddle_pos_b[1] = dot_pos[1]
    //DRAW STUFF
    led.plot(dot_pos[0], dot_pos[1])
    for (let i = 0; i < paddle_width; i++) {
        led.plot(paddle_pos_a[0], paddle_pos_a[1] + i)
        led.plot(paddle_pos_b[0], paddle_pos_b[1] + i)
    }

    basic.pause(100)
})
let move_action: boolean = false;
let move_counter: number = 0
let game_state: number = 0
let paddle_width = 1
let dot_dir = 0
let dot_pos: number[] = []
let screen_size: number[] = []
let paddle_pos_b: number[] = []
let paddle_pos_a: number[] = []
move_counter = 0
game_state = 0
paddle_pos_a = [0, 1]
paddle_pos_b = [4, 2]
screen_size = [5, 5]
dot_pos = [2, 2]
dot_dir = 1
//game.startCountdown(10000)
