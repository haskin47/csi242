

var canvas = document.getElementsByTagName("canvas").item(0)
var test = document.getElementsByTagName("canvas").item(0)


console.log(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

console.log(c);

//  Drawing
//c.fillRect(x,y,width,height);
c.fillStyle = "blue";
c.fillRect(100,100,100,150);

c.fillStyle = "yellow";
c.fillRect(200,300,150,100);

//  Lines
c.beginPath();
c.fillStyle = "green";
c.moveTo(100,100);
c.lineTo(200,300);
c.stroke();

c.lineTo(200,400);
c.fillStyle = "blue";
c.stroke();

//  arcs & Circles
//c.arc(x,y,radius,start angle, end angle);
c.beginPath();
c.arc(450,450,50,Math.PI*0.25,Math.PI*1.25);
c.fillStyle = "black";
c.lineWidth = 5;
c.stroke();
c.fillStyle = "blue";
c.fill();

canvas = test;

//  Animating
/*function animate(){
    console.log("animate");
    
    requestAnimationFrame(animate);
}

animate();*/

//  Interaction


