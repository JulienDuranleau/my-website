new p5((p5) => {
    const angle = 24
    const xa = Math.cos((90 - angle) * Math.PI / 180)
    const ya = Math.sin((90 - angle) * Math.PI / 180)
    const ixa = Math.cos((90 - angle + 180) * Math.PI / 180)
    const iya = Math.sin((90 - angle + 180) * Math.PI / 180)
    const opacity = 0.5

    let raindrops = []
    let sketch = null

    p5.setup = () => {
        sketch = p5.createCanvas(window.innerWidth, window.innerHeight)

        for (let i = 0; i < 500; i++) {
            update()
        }
    }

    p5.draw = () => {
        update()
        p5.background('#282a36')
        renderRaindropLines()
        renderRaindropEnds()
    }

    window.onresize = () => {
        p5.resizeCanvas(window.innerWidth, window.innerHeight)
    }

    function update() {
        if (Math.random() > 0.8) {
            raindrops.push(generateRaindrop())
        }

        let raindrop = null

        for (let i = raindrops.length - 1; i >= 0; i--) {
            raindrop = raindrops[i]
            raindrop.pos.x += xa * raindrop.speed
            raindrop.pos.y += ya * raindrop.speed

            if (raindrop.pos.y - raindrop.length > window.innerHeight) {
                raindrops.splice(i, 1)
            }
        }
    }

    function renderRaindropLines() {
        p5.noFill()

        let raindrop = null

        for (let i = raindrops.length - 1; i >= 0; i--) {
            raindrop = raindrops[i]
            const x1 = raindrop.pos.x
            const y1 = raindrop.pos.y
            const x2 = raindrop.pos.x + ixa * raindrop.length
            const y2 = raindrop.pos.y + iya * raindrop.length

            p5.stroke(raindrop.color)
            p5.line(x1, y1, x2, y2)
        }
    }

    function renderRaindropEnds() {
        p5.noStroke()

        let raindrop = null

        for (let i = raindrops.length - 1; i >= 0; i--) {
            raindrop = raindrops[i]
            const x1 = raindrop.pos.x
            const y1 = raindrop.pos.y

            p5.fill(raindrop.color)
            p5.ellipse(x1, y1, raindrop.dotSize, raindrop.dotSize)
        }
    }

    function generateRaindrop() {
        const z = Math.random()
        const color = p5.color(255, z * 255 * opacity)
        const pos = {
            x: Math.random() * (window.innerWidth + 600) - 300,
            y: 0
        }
        const speed = z * 3 + 2
        const length = Math.random() * 200 + 300
        const dotSize = z * 5 + 3

        return {
            color, length, pos, speed, dotSize, z
        }
    }
})
