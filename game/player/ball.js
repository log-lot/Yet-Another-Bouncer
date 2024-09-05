import { Coin } from "./coins.js"

export class Ball{
    x = 838
    y = 0
    velX = 0
    velY = 0
    coins = 0
    coinTime = 0
    coinTimeLimit = 100
    game
    player
    coins = []

    constructor(Game){
        this.game = Game
        this.player = this.game.player
    }

    update(){
        this.velY += .8
        this.x += this.velX
        this.y += this.velY
        this.colide()
        this.coinTime++
        if(this.coinTime == this.coinTimeLimit){
            this.coinTime = 0
            this.coins[this.coins.length] = new Coin()
        }
    }
    colide(){
        if(this.y > 750 && (this.x > this.player.x - 120 && this.x < this.player.x + 120) && this.y < 800){
            this.velY = -15 - Math.abs(this.player.diffX/20)
            this.velX = -this.player.diffX / 15
        }
        if(this.x < 40 || this.x > 1636){
            this.velX = -this.velX
        }
        if(this.y > 1200){
            this.x = 838
            this.y = 0
            this.velX = 0
            this.velY = 0
            this.game.vars.title = true
            if(this.game.vars.score > this.game.vars.highScore){
                this.game.vars.highScore = this.game.vars.score
            }
            this.coins = []
        }

        for(let i = 0; i < this.coins.length; i++){
            if (Math.hypot(this.x - this.coins[i].x, this.y - this.coins[i].y) <= 25 + 15) {
                this.coins.splice(i,1)
                this.game.vars.score++
                console.log(this.game.vars.score)
            }
        }
    }
}