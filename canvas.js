const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.height = 100;
canvas.width = canvas.height * 2;
var depth = canvas.height / 2;

alert("the code I wrote for this is probably shit and inefficient\n\nuse wasd to move around and e and c to go up or down and arrow keys to look around!\n\nI might use this for my f3x build editor\n\nthe link title says what direction you are looking in");

var distance = (x0,y0,x2,y2) => {
    //d=√((x_2-x_0)²+(y_2-y_0)²)
    return Math.sqrt((x2-x0)**2+(y2-y0)**2);
}
var test = (x,y,x2,y2,XorY) => {
    let aX = x - x2;
    let aY = y - y2;
    let sumX = 0 - aX;
    let sumY = 0 - aY;
    let division = (Math.abs(aX) + Math.abs(aY));
    if(XorY == "X") {
        return sumX / division;
    } else if(XorY == "Y") {
        return sumY / division;
    }
}

var where = (max,value,max2) => {
    return (value / max) * max2;
}

var test3D = (x,y,z,x2,y2,z2,XorYorZ) => {
    let aX = x - x2;
    let aY = y - y2;
    let aZ = z - z2;
    let sumX = 0 - aX;
    let sumY = 0 - aY;
    let sumZ = 0 - aZ;
    let division = (Math.abs(aX) + Math.abs(aY) + Math.abs(aZ));
    if(XorYorZ == "X") {
        return sumX / division;
    } else if(XorYorZ == "Y") {
        return sumY / division;
    } else if(XorYorZ == "Z") {
        return sumZ / division;
    }
}

function RB(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const array3D = (x, y, z) => {
    const array = [];
    for (let i = 0; i < z; i++) {
        array[i] = [];
        for (let j = 0; j < y; j++) {
            array[i][j] = [];
            for (let k = 0; k < x; k++) {
                array[i][j][k] = 0;
            }
        }
    }
    return array;
}
var map = array3D(canvas.height,canvas.width,depth);

for(let i = 0; i < depth; i++) {
    for(let j = 0; j < canvas.height; j++) {
        for(let k = 0; k < canvas.width; k++) {
            if(RB(1,200) == 1) map[i][j][k] = 1;
        }
    }
}


var mouse = {
    x: 0,
    y: 0
}

class player {
	constructor(x,y,z) {
		this.x = x;
		this.y = y;
        this.z = z;
	}
}

addEventListener("mousemove", (e) => {
        mouse.y = Math.floor((e.y / window.innerHeight) * canvas.height);
        mouse.x = Math.floor((e.x / window.innerWidth) * canvas.width);
})

var keys = [];
var dframecheck = 0;
var viewx = 0; //Yeah im sorry I dont know how to do 3d angles and this may be inefficient but this is also my first time coding something like this. Atleast it works!
var viewy = 1;
/*
viewx0 = front
viewx1 = right
viewx2 = back
viewx3 = left

viewy0 = down
viewy1 = viewx
viewy2 = up
*/
onkeydown = onkeyup = (e) => {
    keys[e.keyCode] = e.type == 'keydown';
    let increment = 1;
    let speedX = 0;
    let speedY = 0
    let speedZ = 0;
    if(dframecheck == 0) {
        //uhh yeah maybe inefficient shitty code (I need to learn more math) probably confusing for the user (troll)
        if(keys[68]) {//d
            if(viewy == 1) {
                if(viewx == 0) {
                    speedY = 1 * increment;
                } else if(viewx == 1) {
                    speedX = 1 * increment;
                } else if(viewx == 2) {
                    speedY = 1 * increment;
                } else if(viewx == 3) {
                    speedX = 1 * increment;
                }
            } else if(viewy == 0) {
                speedX = 1 * increment;
            } else if(viewy == 2) {
                speedX = 1 * increment;
            }
            keys[68] = 0;
        }
        if(keys[39]) { //right arrow
            viewx++;
            if(viewx > 3) viewx = 0;
            keys[39] = 0;
        }
        if(keys[65]) {//a
            if(viewy == 1) {
                if(viewx == 0) {
                    speedY = -1 * increment;
                } else if(viewx == 1) {
                    speedX = -1 * increment;
                } else if(viewx == 2) {
                    speedY = -1 * increment;
                } else if(viewx == 3) {
                    speedX = -1 * increment;
                }
            } else if(viewy == 0) {
                speedX = -1 * increment;
            } else if(viewy == 2) {
                speedX = -1 * increment;
            }
            keys[65] = 0;
        }
        if(keys[37]) { //left arrow
            viewx--;
            if(viewx < 0) viewx = 3;
            keys[37] = 0;
        }
        if(keys[87]) {//w
            if(viewy == 1) {
                if(viewx == 0) {
                    speedX = 1 * increment;
                } else if(viewx == 1) {
                    speedY = 1 * increment;
                } else if(viewx == 2) {
                    speedX = -1 * increment;
                } else if(viewx == 3) {
                    speedY = -1 * increment;
                }
            } else if(viewy == 0) {
                speedZ = -1 * increment;
            } else if(viewy == 2) {
                speedZ = 1 * increment;
            }
                keys[87] = 0;
        }
        if(keys[38]) { //up arrow
            viewy++;
            if(viewy > 2) viewy = 0;
            keys[38] = 0;
        }
	if(keys[83]) { //s
		if(viewy == 1) {
            if(viewx == 0) {
                speedX = -1 * increment;
            } else if(viewx == 1) {
                speedY = -1 * increment;
            } else if(viewx == 2) {
                speedX = 1 * increment;
            } else if(viewx == 3) {
                speedY = 1 * increment;
            }
        } else if(viewy == 0) {
            speedZ = 1 * increment;
        } else if(viewy == 2) {
            speedZ = -1 * increment;
        }
		keys[83] = 0;
	}
    if(keys[40]) { //down arrow
        viewy--;
        if(viewy < 0) viewy = 2;
        keys[40] = 0;
    }
    if(keys[69]) { //e
        if(viewy == 1) {
            speedZ = -1 * increment;
        } else if(viewy == 2) {
            speedY = -1 * increment;
        } else if(viewy == 0) {
            speedY = -1 * increment;
        }
        keys[69] = 0;
    }
    if(keys[67]) { //c
        if(viewy == 1) {
            speedZ = 1 * increment;
        } else if(viewy == 2) {
            speedY = 1 * increment;
        } else if(viewy == 0) {
            speedY = 1 * increment;
        }
        keys[67] = 0;
    }
    player1.x += speedX;
    player1.y += speedY;
    player1.z += speedZ;
    drawing();
}
}


var drawing = () => {
    if(dframecheck == 1) return 0;
    dframecheck = 1;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	for(let i = 0; i < canvas.height; i++) {
        for(let j = 0; j < canvas.width; j++) {
            let x = player1.x;
            let y = player1.y;
            let z = player1.z;
            let ii = canvas.height / -2 + i;
            let jj = canvas.width / -2 + j;
            let count = 0;
            let fov = canvas.height;
            let xs = 0;
            let ys = 0;
            let zs = 0;
            //this test3d function is just something I wrote after thinking a bit how to move to another coordinate in a straight line one bit at a time (I dont know 3d angles)
            if(viewy == 1) { //watdasigma IS THIS TRASH AND INEFFICIENT?
                if(viewx == 0) { //front
                    xs = test3D(x,y,z,x + fov,y + jj, z + ii,"X");
                    ys = test3D(x,y,z,x + fov,y + jj, z + ii,"Y");
                    zs = test3D(x,y,z,x + fov,y + jj, z + ii,"Z");
                    document.title = "FRONT";
                } else if(viewx == 1) { //right
                    xs = test3D(x,y,z,x + jj,y + fov, z + ii,"X");
                    ys = test3D(x,y,z,x + jj,y + fov, z + ii,"Y");
                    zs = test3D(x,y,z,x + jj,y + fov, z + ii,"Z");
                    document.title = "RIGHT";
                } else if(viewx == 2) { //back
                    xs = test3D(x,y,z,x - fov,y + jj, z + ii,"X");
                    ys = test3D(x,y,z,x - fov,y + jj, z + ii,"Y");
                    zs = test3D(x,y,z,x - fov,y + jj, z + ii,"Z");
                    document.title = "BACK";
                } else if(viewx == 3) { //left
                    xs = test3D(x,y,z,x + jj,y - fov, z + ii,"X");
                    ys = test3D(x,y,z,x + jj,y - fov, z + ii,"Y");
                    zs = test3D(x,y,z,x + jj,y - fov, z + ii,"Z");
                    document.title = "LEFT";
                }
            } else if(viewy == 0) { //down
                document.title = "DOWN";
                xs = test3D(x,y,z,x + jj,y + ii, z + fov,"X");
                ys = test3D(x,y,z,x + jj,y + ii, z + fov,"Y");
                zs = test3D(x,y,z,x + jj,y + ii, z + fov,"Z");
            } else if(viewy == 2) { //up
                document.title = "UP";
                xs = test3D(x,y,z,x + jj,y + ii, z - fov,"X");
                ys = test3D(x,y,z,x + jj,y + ii, z - fov,"Y");
                zs = test3D(x,y,z,x + jj,y + ii, z - fov,"Z");
            }
            let accuracy = 3;
            let accuracy2 = accuracy * 2;
            let maxc = 50 * accuracy;
            while(true) {
                x += xs / accuracy;
                y += ys / accuracy;
                z += zs / accuracy;
                count++;
                if(map[Math.floor(z)]?.[Math.floor(y)]?.[Math.floor(x)] === 1 || map[Math.ceil(z)]?.[Math.ceil(y)]?.[Math.ceil(x)] === 1 
                || map[Math.floor(z + zs / accuracy2)]?.[Math.floor(y + ys / accuracy2)]?.[Math.floor(x + xs / accuracy2)] === 1 || map[Math.ceil(z + zs / accuracy2)]?.[Math.ceil(y + ys / accuracy2)]?.[Math.ceil(x + xs / accuracy2)] === 1
                || map[Math.floor(z - zs / accuracy2)]?.[Math.floor(y - ys / accuracy2)]?.[Math.floor(x - xs / accuracy2)] === 1 || map[Math.ceil(z - zs / accuracy2)]?.[Math.ceil(y - ys / accuracy2)]?.[Math.ceil(x - xs / accuracy2)] === 1) {
                    let borderx = Math.ceil(x) - x;
                    let bordery = Math.ceil(y) - y;
                    let borderz = Math.ceil(z) - z;
                    let bordermin = 0.4;
                    let bordermax = 1 - bordermin;
                    if((borderx < bordermin || borderx > bordermax) && (bordery < bordermin || bordery > bordermax) && (borderz < bordermin || borderz > bordermax)) {
                        ctx.fillStyle = "blue";
                    } else ctx.fillStyle = "yellow";
                    ctx.globalAlpha = 1 - (count / maxc);
                    ctx.fillRect(j,i,1,1);
                    break;
                } else if(count >= maxc) break; //|| (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height || z < 0 || z >= depth) just in case I need to use this
            }
        }
    }
    setTimeout(() => {
        dframecheck = 0;
    }, 1000 / 30)
}

var player1 = new player(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2),Math.floor(depth / 2));

drawing();