scene.setBackgroundColor(8)
let spacePlane = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . 1 . . . 1 . . .
    . . . . . . . 1 1 . . 1 1 1 . .
    . . . . . . 1 1 1 1 . 1 1 1 . .
    . . . . . . 1 1 1 1 1 1 1 1 . .
    . . . . . . 1 1 1 f 1 1 f 1 1 .
    . . . . . . 1 1 1 1 1 1 1 1 1 .
    . 1 . . . . 1 1 f 1 1 f 1 1 1 .
    . 1 . . 1 1 1 1 f f 1 1 1 1 1 .
    . 1 1 1 1 1 1 1 1 1 1 1 1 . . .
    . 1 1 1 1 1 1 1 1 1 1 1 1 . . .
    . 1 1 1 1 1 1 1 1 1 1 1 1 . . .
    . 1 1 1 1 1 1 1 1 1 1 1 . . . .
    . . 1 . 1 . 1 . . 1 . . . . . .
    . . 1 . 1 . 1 . . 1 . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
info.setLife(3)
spacePlane.setStayInScreen(true)
controller.moveSprite(spacePlane, 200, 200)
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    let missile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . 5 . . . . . . . .
            . . . . . . . 5 . . . . . . . .
            . . . . . . 5 5 5 . . . . . . .
            . . . . . 5 5 5 5 5 . . . . . .
            . . . . . 5 5 5 5 5 . . . . . .
            . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 .
            . . 5 5 5 5 5 5 5 5 5 5 5 5 . .
            . . . 5 5 5 5 5 5 5 5 5 5 . . .
            . . . . . 5 5 5 5 5 5 . . . . .
            . . . . 5 5 5 5 5 5 5 5 . . . .
            . . . 5 5 5 5 . 5 5 5 5 5 . . .
            . . 5 5 5 . . . . . . 5 5 5 . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, spacePlane, 200, 0)
})
game.onUpdateInterval(500, function on_update() {
    let bogy = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . e e e e e e e e . . . .
        . . . e e e e 4 4 4 e e e . . .
        . . e e e e e e e 4 4 e e e . .
        . e e e e e e e e e 4 e e e e .
        . e e 4 4 4 e e e e e e e e e .
        . e e e e 4 e e e e e e e 4 e .
        . e 4 e 4 e e e e e e e e 4 e .
        . e 4 e 4 e e e 4 4 4 e e 4 e .
        . e 4 e e e e e 4 e e e e 4 e .
        . e e 4 4 e e e 4 e 4 e e e e .
        . . e e e e e 4 e e 4 e 4 e . .
        . . . e e e e 4 4 e e e e . . .
        . . . . e e e e e 4 4 e . . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Enemy)
    bogy.setVelocity(-100, randint(-30, 30))
    bogy.y = randint(0, scene.screenHeight())
    bogy.left = scene.screenWidth()
    bogy.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_hit(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy(effects.confetti, 100)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_crash(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy()
    info.changeLifeBy(-1)
})
