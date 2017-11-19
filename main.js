var yyy = document.getElementById('xxx')
var zzz = yyy.getContext('2d');

autoSetCanvasSize(yyy)

listenToUser(yyy)

var eraserEnabled  = false
    eraser.onclick = function(){
        eraserEnabled = true
        actions.className = 'actions x'
    }
    brush.onclick = function(){
        eraserEnabled = false
        actions.className = 'actions'
    }



function listenToUser(canvas){
    var using = false
    var lastPoint = {x:undefined,y:undefined}
    if(document.body.ontouchstart !== undefined){
        cnavas.ontouchstart = function(aaa){
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            console.log(x,y)
            using = true
                if(eraserEnabled){
                    zzz.clearRect(x-5,y-5,10,10)
                }else{
                    lastPoint = {x:x,y:y} 
        }
    }
        canvas.ontouchmove = function(aaa){
            console.log('边摸变动')
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            if(!using){return}
                if(eraserEnabled){
                    zzz.clearRect(x-5,y-5,10,10)                    
                }else{
                    var newPoint = {x:x,y:y}
                    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                    lastPoint = newPoint
                }
        }
        canvas.ontouchend =function(){
            using = false
        }
    }
        else{
            canvas.onmousedown = function(aaa){
                var x = aaa.clientX
                var y = aaa.clientY
                using = true
                    if(eraserEnabled){
                        zzz.clearRect(x-5,y-5,10,10)
                    }else{
                        lastPoint = {x:x,y:y}
                    }
                }
            
                canvas.onmousemove = function(aaa){
                var x = aaa.clientX
                var y = aaa.clientY
                if(!using){return}
                    if(eraserEnabled){
                        zzz.clearRect(x-5,y-5,10,10)                    
                    }else{
                        var newPoint = {x:x,y:y}
                        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                        lastPoint = newPoint
                    }
                }
                canvas.onmouseup = function(aaa){
                    using = false
                }
        }

}

//工具函数
function autoSetCanvasSize(canvas){
    setCanvasSize()
    window.onresize = function(){
        setCanvasSize()
    }
    function setCanvasSize(){
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function drawCircle(x,y,radius){
    zzz.beginPath()
    zzz.arc(x,y,radius,0,Math.PI*2)
    zzz.fill()
}

function drawLine(x1,y1,x2,y2){
    zzz.beginPath()
    zzz.lineWidth = 2
    zzz.moveTo(x1,y1)
    zzz.lineTo(x2,y2)
    zzz.strokeStyle = 'black'
    zzz.stroke()
    zzz.closePath()
}