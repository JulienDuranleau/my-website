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

    p5.mouseMoved = () => {
        const xo = p5.pmouseX - p5.mouseX

        for (let i = raindrops.length - 1; i >= 0; i--) {
            //raindrops[i].pos.x += xo * raindrops[i].z * 0.05
            //raindrops[i].speed *= 1.01
        }
    }

    window.onresize = () => {
        p5.resizeCanvas(window.innerWidth, window.innerHeight)
    }

    function update() {
        if (Math.random() > 0.8) {
            for (let i = 0; i < 1; i++) {
                raindrops.push(generateRaindrop())
            }
        }

        for (let i = raindrops.length - 1; i >= 0; i--) {
            raindrops[i].pos.x += xa * raindrops[i].speed
            raindrops[i].pos.y += ya * raindrops[i].speed
            
            if (raindrops[i].pos.y - raindrops[i].length > window.innerHeight) {
                raindrops.splice(i, 1)
                continue
            }
        }
    }

    function renderRaindropLines() {
        p5.noFill()

        for (let i = raindrops.length - 1; i >= 0; i--) {
            const x1 = raindrops[i].pos.x
            const y1 = raindrops[i].pos.y
            const x2 = raindrops[i].pos.x + ixa * raindrops[i].length
            const y2 = raindrops[i].pos.y + iya * raindrops[i].length

            p5.stroke(raindrops[i].color)
            p5.line(x1, y1, x2, y2)
        }
    }

    function renderRaindropEnds() {
        p5.noStroke()

        for (let i = raindrops.length - 1; i >= 0; i--) {
            const x1 = raindrops[i].pos.x
            const y1 = raindrops[i].pos.y

            p5.fill(raindrops[i].color)
            p5.ellipse(x1,y1,raindrops[i].dotSize,raindrops[i].dotSize)
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
