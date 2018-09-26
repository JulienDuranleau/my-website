const angle = 20
const xa = Math.cos((90 - angle) * Math.PI / 180)
const ya = Math.sin((90 - angle) * Math.PI / 180)
const ixa = Math.cos((90 - angle + 180) * Math.PI / 180)
const iya = Math.sin((90 - angle + 180) * Math.PI / 180)

let raindrops = []

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
}

function draw() {
    tick()    
    background(25)
    renderRaindropLines()
    renderRaindropEnds()
}

function tick() {
    if (Math.random() > 0.8) {
        for (let i = 0; i < 1; i++) {
            raindrops.push(generateRaindrop())
        }
    }

    for (let i = raindrops.length - 1; i >= 0; i--) {
        // update
        raindrops[i].pos.x += xa * raindrops[i].speed
        raindrops[i].pos.y += ya * raindrops[i].speed
        
        if (raindrops[i].pos.y - raindrops[i].length > window.innerHeight) {
            raindrops.splice(i, 1)
            continue
        }
    }
}

function renderRaindropLines() {
    noFill()

    for (let i = raindrops.length - 1; i >= 0; i--) {
        const x1 = raindrops[i].pos.x
        const y1 = raindrops[i].pos.y
        const x2 = raindrops[i].pos.x + ixa * raindrops[i].length
        const y2 = raindrops[i].pos.y + iya * raindrops[i].length

        stroke(raindrops[i].color)
        line(x1, y1, x2, y2)
    }
}

function renderRaindropEnds() {
    noStroke()

    for (let i = raindrops.length - 1; i >= 0; i--) {
        const x1 = raindrops[i].pos.x
        const y1 = raindrops[i].pos.y

        fill(raindrops[i].color)
        ellipse(x1,y1,raindrops[i].dotSize,raindrops[i].dotSize)
    }
}

function generateRaindrop() {
    const z = Math.random()
    const color = '#'+((z * 230 + 25) >> 0).toString(16).padStart(2,'0').repeat(3)
    const pos = { 
        x: Math.random() * (window.innerWidth + 600) - 300, 
        y: 0
    }
    const speed = z * 4 + 2
    const length = Math.random() * 200 + 300
    const dotSize = z * 5 + 3

    return {
        color, length, pos, speed, dotSize
    }
}
