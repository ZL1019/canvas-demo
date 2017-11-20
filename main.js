var yyy = document.getElementById('xxx')
var zzz = yyy.getContext('2d')

autoSetCanvasSize(yyy)
/*zzz.fillStyle = 'white';
zzz.fillRect(0, 0, yyy.width, yyy.height);*/

listenToUser(yyy)

var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    brush.classList.remove('active')
}
brush.onclick = function () {
    eraserEnabled = false
    eraser.classList.remove('active')
    brush.classList.add('active')
}
red.onclick = function () {
    zzz.strokeStyle = 'red';
    red.classList.add('active')
    blue.classList.remove('active')
    green.classList.remove('active')
    black.classList.remove('active')
}
blue.onclick = function () {
    zzz.strokeStyle = 'blue';
    red.classList.remove('active')
    blue.classList.add('active')
    green.classList.remove('active')
    black.classList.remove('active')
}
green.onclick = function () {
    zzz.strokeStyle = 'green';
    red.classList.remove('active')
    blue.classList.remove('active')
    green.classList.add('active')
    black.classList.remove('active')
}
black.onclick = function () {
    zzz.strokeStyle = 'black';
    red.classList.remove('active')
    blue.classList.remove('active')
    green.classList.remove('active')
    black.classList.add('active')
}
clear.onclick = function () {
    zzz.clearRect(0, 0, yyy.width, yyy.height)
}
download.onclick = function () {
    var url = yyy.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画儿'
    a.target = '_blank'
    a.click()
}

function listenToUser(canvas) {
    var using = false
    var lastPoint = { 'x': undefined, 'y': undefined }
    if (document.body.ontouchstart !== undefined) {
        //触屏设备
        canvas.ontouchstart = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            using = true
            if (eraserEnabled) {
                zzz.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { 'x': x, 'y': y }
            }
        }
        canvas.ontouchmove = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            if (!using) { return }
            if (eraserEnabled) {
                zzz.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = { 'x': x, 'y': y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function () {
            using = false
        }
    } else {
        //非触屏设备
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled) {
                zzz.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { 'x': x, 'y': y }
            }
        }
        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            if (!using) { return }
            if (eraserEnabled) {
                zzz.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = { 'x': x, 'y': y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.onmouseup = function () {
            using = false
        }
    }
}

function autoSetCanvasSize(canvas) {
    setCanvasSize()
    window.onresize = function () {
        setCanvasSize()
    }
    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function drawLine(x1, y1, x2, y2) {
    zzz.beginPath();
    zzz.moveTo(x1, y1);
    zzz.lineWidth = 5
    zzz.lineTo(x2, y2);
    zzz.stroke();
}

