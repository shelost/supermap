const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// Initialize

Resize()

var CX, CY, ONE, MX, MY, Mousedown

var Year = 2000

var Scrubber = new Squircle(canvas.width-35*ONE, canvas.height-38*ONE, 10*ONE, 16*ONE, 5*ONE, false)
Scrubber.active = false

var Background = new Image()
Background.src = 'supermap-bg.svg'

var Supermap = new Image()
Supermap.src = 'supermap.svg'

// Loop

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const loop = () => {

    if (Year > 1270){
        Supermap.src = 'supermap-07.svg'
    }else if (Year > 1260){
        Supermap.src = 'supermap-06.svg'
    }else if (Year > 1250){
        Supermap.src = 'supermap-05.svg'
    }else if (Year > 1240){
        Supermap.src = 'supermap-04.svg'
    }else if (Year > 1230){
        Supermap.src = 'supermap-03.svg'
    }else if (Year > 1220){
        Supermap.src = 'supermap-02.svg'
    }else if (Year > 1210){
        Supermap.src = 'supermap-01.svg'
    }

    Resize()

    // Scrubber Scrolling

    if (Click(Scrubber)){

        Scrubber.active = true
    }

    if (Scrubber.active){

        Scrubber.x = MX
    }

    if (!Mousedown){

        Scrubber.active = false
    }

    if (Scrubber.x > canvas.width-35*ONE){

        Scrubber.x = canvas.width-35*ONE
    }else if (Scrubber.x < 30*ONE){

        Scrubber.x = 30*ONE
    }

    Year = Math.round((Scrubber.x-30*ONE)/ONE)+1000

    // DRAW

    // Background
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,canvas.width,canvas.height)

    // Timeline
    ctx.strokeStyle = '#909090'
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.moveTo( 30*ONE, canvas.height-30*ONE)
    ctx.lineTo(canvas.width-30*ONE, canvas.height-30*ONE)
    ctx.closePath()
    ctx.stroke()

    // Scrubber
    if (Scrubber.active){
        ctx.fillStyle = 'white'
    }else{
        ctx.fillStyle = '#909090'
    }
    Scrubber.draw()

    // Year
    ctx.fillStyle = 'white'
    ctx.font = '25px Arial'
    ctx.fillText(Year, Scrubber.x-10*ONE, Scrubber.y-10*ONE)

    window.requestAnimationFrame(loop)

    //Map
    ctx.drawImage(Background, 125*ONE, -10*ONE, 750*ONE, 500*ONE )
    ctx.drawImage(Supermap, 125*ONE, -10*ONE, 750*ONE, 500*ONE )
}

window.requestAnimationFrame(loop)

window.addEventListener('mousemove', MousePosition)
window.addEventListener('mousedown', ()=>{

    Mousedown = true
})
window.addEventListener('mouseup', ()=> {

    Mousedown = false
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function Resize(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    CX = canvas.width/2
    CY = canvas.height/2
    ONE = canvas.width/1000

}

function Click(target){

    if (MX>target.x && MX<target.x+target.w && MY > target.y && MY < target.y+target.h && Mousedown){

        return true
    }else{

        return false

    }
}

function MousePosition(e){

    MX = e.clientX
    MY = e.clientY
}

//Shape Functions
function Circle(x,y,r, xspeed, yspeed){

    this.x = x
    this.y = y
    this.r = r

    this.ix = x
    this.iy = y
    this.ir = r

    this.xspeed = xspeed
    this.yspeed = yspeed

    this.draw=function(){

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2)
        ctx.closePath()
        ctx.stroke()
    }
}

function Squircle(x,y,w,h,r, strokeOnly){

    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.r = r

    this.ix = x
    this.iy = y
    this.iw = w
    this.ih = h

    this.strokeOnly = strokeOnly

    this.xspeed = 0
    this.yspeed = 0

    this.playerOn = false

    this.draw = function(){

        ctx.beginPath()
        ctx.moveTo(this.x+this.r, this.y)
        ctx.lineTo(this.x+this.w-this.r, this.y)
        ctx.arc(this.x+this.w-this.r, this.y+this.r, this.r, Math.PI*3/2, Math.PI*2)
        ctx.lineTo(this.x+this.w, this.y+this.h-this.r)
        ctx.arc(this.x+this.w-this.r, this.y+this.h-this.r,this.r, 0, Math.PI/2)
        ctx.lineTo(this.x+this.r, this.y+this.h)
        ctx.arc(this.x+this.r, this.y+this.h-this.r, this.r, Math.PI/2, Math.PI)
        ctx.lineTo(this.x, this.y+this.r)
        ctx.arc(this.x+this.r, this.y+this.r, this.r, Math.PI, Math.PI*3/2)
        if (this.strokeOnly){

            ctx.stroke()
        }else{
            ctx.fill()

        }
       
        ctx.closePath()

    }
}