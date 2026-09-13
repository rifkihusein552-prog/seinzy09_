/* =====================================================
   CANVAS SETUP
===================================================== */

const scene =
    document.getElementById("scene");

const canvas =
    document.getElementById("canvas");

const ctx =
    canvas.getContext("2d");


let width = 0;
let height = 0;


function resizeCanvas() {

    const rect =
        scene.getBoundingClientRect();

    width = rect.width;
    height = rect.height;


    const dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    canvas.width =
        width * dpr;

    canvas.height =
        height * dpr;


    canvas.style.width =
        width + "px";

    canvas.style.height =
        height + "px";


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );
}


window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();


/* =====================================================
   CAMERA
===================================================== */

let rotationY = 0;

let rotationX = 0;

let targetRotationY = 0;

let targetRotationX = 0;


/* =====================================================
   ZOOM
===================================================== */

let zoom = 1;

let targetZoom = 1;


const MIN_ZOOM = .55;

const MAX_ZOOM = 2.2;


/* =====================================================
   DRAG
===================================================== */

let dragging = false;

let previousX = 0;

let previousY = 0;


scene.addEventListener(
    "pointerdown",
    event => {

        dragging = true;

        previousX =
            event.clientX;

        previousY =
            event.clientY;

        scene.setPointerCapture(
            event.pointerId
        );
    }
);


scene.addEventListener(
    "pointermove",
    event => {

        if (!dragging) {
            return;
        }


        const moveX =
            event.clientX -
            previousX;


        const moveY =
            event.clientY -
            previousY;


        targetRotationY +=
            moveX * .006;


        targetRotationX +=
            moveY * .004;


        targetRotationX =
            Math.max(
                -1.35,
                Math.min(
                    1.35,
                    targetRotationX
                )
            );


        previousX =
            event.clientX;

        previousY =
            event.clientY;
    }
);

scene.addEventListener(
    "pointerup",
    event => {

        dragging = false;

        try {

            scene.releasePointerCapture(
                event.pointerId
            );

        } catch(e) {}
    }
);


scene.addEventListener(
    "pointercancel",
    () => {

        dragging = false;
    }
);


/* =====================================================
   MOUSE WHEEL ZOOM
===================================================== */

scene.addEventListener(
    "wheel",
    event => {

        event.preventDefault();


        if (event.deltaY < 0) {

            targetZoom += .12;

        } else {

            targetZoom -= .12;
        }


        targetZoom =
            Math.max(
                MIN_ZOOM,
                Math.min(
                    MAX_ZOOM,
                    targetZoom
                )
            );

    },
    {
        passive: false
    }
);


/* =====================================================
   OBJECT STORAGE
===================================================== */

const objects = [];


/* =====================================================
   FLOWERS
===================================================== */

const flowerTypes = [

    "🌻",
    "🌼",
    "💐",
    "🌻🌼"

];


function addFlower(
    x,
    y,
    z,
    size
) {

    objects.push({

        type: "flower",

        x,
        y,
        z,

        size,

        emoji:
            flowerTypes[
                Math.floor(
                    Math.random() *
                    flowerTypes.length
                )
            ],

        phase:
            Math.random() *
            Math.PI * 2,

        speed:
            .0005 +
            Math.random() * .0007
    });
}


/* =====================================================
   FLOWERS 360°
===================================================== */

addFlower(-5, 1, 9, 48);
addFlower(5, 0, 9, 50);

addFlower(-8, 3, 4, 42);
addFlower(8, 2, 4, 44);

addFlower(-7, -2, -4, 45);
addFlower(7, 1, -5, 47);

addFlower(-4, 4, -9, 38);
addFlower(4, 3, -9, 40);

addFlower(-10, -3, 0, 42);
addFlower(10, -2, 0, 43);

addFlower(0, 4, -11, 42);
addFlower(0, -4, 10, 40);


/* =====================================================
   RANDOM FLOWERS
===================================================== */

for (
    let i = 0;
    i < 22;
    i++
) {

    const angle =
        Math.random() *
        Math.PI * 2;


    const radius =
        6 +
        Math.random() * 9;


    addFlower(

        Math.cos(angle) *
        radius,

        -4 +
        Math.random() * 8,

        Math.sin(angle) *
        radius,

        18 +
        Math.random() * 20
    );
}

/* =====================================================
   9 LOVE TEXTS
===================================================== */

const loveTexts = [

    "I love you 💗",

    "You are my sunshine ☀️",

    "You are precious 🌻",

    "Forever with you 🤍",

    "You make me smile 🌼",

    "You are my favorite 💗",

    "You mean so much to me 🤍",

    "You make life beautiful 🌻",

    "Always in my heart 💗"

];


function addText(
    text,
    x,
    y,
    z,
    size
) {

    objects.push({

        type: "text",

        text,

        x,
        y,
        z,

        size,

        phase:
            Math.random() *
            Math.PI * 2,

        speed:
            .0004 +
            Math.random() * .0006
    });
}


/* =====================================================
   TEXT POSITIONS
===================================================== */

addText(
    loveTexts[0],
    -5,
    3,
    8,
    15
);


addText(
    loveTexts[1],
    6,
    4,
    4,
    14
);


addText(
    loveTexts[2],
    -7,
    -1,
    -5,
    14
);


addText(
    loveTexts[3],
    7,
    1,
    -7,
    14
);


addText(
    loveTexts[4],
    0,
    5,
    -10,
    14
);


addText(
    loveTexts[5],
    -8,
    4,
    0,
    13
);


addText(
    loveTexts[6],
    8,
    -2,
    1,
    13
);


addText(
    loveTexts[7],
    -4,
    -4,
    -8,
    13
);


addText(
    loveTexts[8],
    4,
    -4,
    8,
    13
);

/* =====================================================
   GOLD PARTICLES
===================================================== */

for (
    let i = 0;
    i < 700;
    i++
) {

    objects.push({

        type: "particle",

        x:
            (Math.random() - .5) *
            32,

        y:
            (Math.random() - .5) *
            24,

        z:
            (Math.random() - .5) *
            32,

        size:
            .25 +
            Math.random() * 1.6,

        phase:
            Math.random() *
            Math.PI * 2,

        speed:
            .0004 +
            Math.random() * .001
    });
}


/* =====================================================
   HEART PARTICLES
===================================================== */

function heartPoint(t) {

    return {

        x:
            16 *
            Math.pow(
                Math.sin(t),
                3
            ),

        y:
            -(
                13 * Math.cos(t)
                - 5 * Math.cos(2*t)
                - 2 * Math.cos(3*t)
                - Math.cos(4*t)
            )
    };
}


for (
    let i = 0;
    i < 190;
    i++
) {

    const t =
        Math.random() *
        Math.PI * 2;


    const p =
        heartPoint(t);


    objects.push({

        type:
            "heartParticle",

        x:
            p.x * .23,

        y:
            p.y * .23,

        z:
            8 +
            (Math.random() - .5) *
            1.5,

        size:
            .6 +
            Math.random() * 1.5,

        phase:
            Math.random() *
            Math.PI * 2
    });
}


/* =====================================================
   GALAXY STARS
===================================================== */

const galaxyStars = [];


for (
    let i = 0;
    i < 1800;
    i++
) {

    const arm =
        Math.floor(
            Math.random() * 4
        );


    const angle =
        arm *
        Math.PI / 2 +
        Math.random() *
        Math.PI * 1.8;


    const radius =
        Math.pow(
            Math.random(),
            .65
        ) * 17;


    const spiral =
        angle +
        radius * .32;


    const spread =
        (Math.random() - .5) *
        (.4 + radius * .08);


    const x =
        Math.cos(spiral) *
        radius +
        Math.cos(
            spiral + Math.PI / 2
        ) *
        spread;


    const z =
        Math.sin(spiral) *
        radius +
        Math.sin(
            spiral + Math.PI / 2
        ) *
        spread;


    const y =
        (Math.random() - .5) *
        (
            .25 +
            radius * .035
        );


    galaxyStars.push({

        x,
        y,
        z,

        size:
            .3 +
            Math.random() * 1.3,

        brightness:
            .35 +
            Math.random() * .65,

        phase:
            Math.random() *
            Math.PI * 2
    });
}

let galaxyRotation = 0;


/* =====================================================
   3D ROTATION
===================================================== */

function rotatePoint(
    x,
    y,
    z
) {

    const cosY =
        Math.cos(
            rotationY
        );

    const sinY =
        Math.sin(
            rotationY
        );


    const x1 =
        x * cosY -
        z * sinY;


    const z1 =
        x * sinY +
        z * cosY;


    const cosX =
        Math.cos(
            rotationX
        );

    const sinX =
        Math.sin(
            rotationX
        );


    const y2 =
        y * cosX -
        z1 * sinX;


    const z2 =
        y * sinX +
        z1 * cosX;


    return {

        x: x1,
        y: y2,
        z: z2
    };
}


/* =====================================================
   PROJECT 3D
===================================================== */

function project(
    x,
    y,
    z
) {

    const rotated =
        rotatePoint(
            x,
            y,
            z
        );


    const camera = 22;


    const depth =
        camera /
        (
            camera +
            rotated.z
        );


    return {

        x:
            width / 2 +
            rotated.x *
            depth *
            34 *
            zoom,

        y:
            height / 2 +
            rotated.y *
            depth *
            34 *
            zoom,

        scale:
            depth *
            zoom,

        z:
            rotated.z
    };
}


/* =====================================================
   BACKGROUND
===================================================== */

function drawBackground() {

    const gradient =
        ctx.createRadialGradient(

            width * .5,
            height * .45,
            0,

            width * .5,
            height * .5,
            width * .78
        );


    gradient.addColorStop(
        0,
        "rgba(255,225,80,.20)"
    );


    gradient.addColorStop(
        .25,
        "rgba(80,60,0,.16)"
    );


    gradient.addColorStop(
        .65,
        "rgba(5,8,18,.35)"
    );


    gradient.addColorStop(
        1,
        "#010102"
    );


    ctx.fillStyle =
        gradient;


    ctx.fillRect(
        0,
        0,
        width,
        height
    );
}


/* =====================================================
   GALAXY NEBULA
===================================================== */

function drawGalaxyNebula() {

    const cx =
        width * .5;

    const cy =
        height * .86;


    const blue =
        ctx.createRadialGradient(

            cx,
            cy,
            5,

            cx,
            cy,
            width * .65
        );


    blue.addColorStop(
        0,
        "rgba(100,170,255,.34)"
    );


    blue.addColorStop(
        .20,
        "rgba(45,100,230,.25)"
    );


    blue.addColorStop(
        .55,
        "rgba(20,50,160,.13)"
    );


    blue.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );


    ctx.fillStyle =
        blue;


    ctx.fillRect(
        0,
        height * .48,
        width,
        height * .52
    );


    const core =
        ctx.createRadialGradient(

            cx,
            cy,
            0,

            cx,
            cy,
            width * .20
        );


    core.addColorStop(
        0,
        "rgba(255,240,255,.9)"
    );


    core.addColorStop(
        .10,
        "rgba(230,200,255,.7)"
    );


    core.addColorStop(
        .28,
        "rgba(150,110,255,.45)"
    );


    core.addColorStop(
        .55,
        "rgba(50,110,255,.20)"
    );


    core.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );


    ctx.fillStyle =
        core;


    ctx.fillRect(
        0,
        height * .58,
        width,
        height * .42
    );
}


/* =====================================================
   GALAXY STARS
===================================================== */

function drawGalaxyStars(time) {

    galaxyRotation += .00015;


    for (
        let i = 0;
        i < galaxyStars.length;
        i++
    ) {

        const star =
            galaxyStars[i];


        const cos =
            Math.cos(
                galaxyRotation
            );


        const sin =
            Math.sin(
                galaxyRotation
            );


        const gx =
            star.x * cos -
            star.z * sin;


        const gz =
            star.x * sin +
            star.z * cos;


        const p =
            project(
                gx,
                star.y + 7,
                gz
            );


        if (
            p.scale <= 0
        ) {
            continue;
        }


        const twinkle =
            star.brightness *
            (
                .7 +
                Math.sin(
                    time * .002 +
                    star.phase
                ) * .3
            );


        const radius =
            Math.max(
                .3,
                star.size *
                p.scale
            );


        ctx.beginPath();


        ctx.arc(
            p.x,
            p.y,
            radius,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(
                150,
                190,
                255,
                ${twinkle}
            )`;


        ctx.shadowBlur =
            radius > 1
            ? 5
            : 0;


        ctx.shadowColor =
            "#4f8dff";


        ctx.fill();


        ctx.shadowBlur = 0;
    }
}


/* =====================================================
   GALAXY DISK
===================================================== */

function drawGalaxyDisk() {

    const cx =
        width / 2;

    const cy =
        height * .82;


    ctx.save();


    ctx.translate(
        cx,
        cy
    );


    ctx.rotate(
        -.12 +
        Math.sin(
            rotationY * .3
        ) * .03
    );


    const outer =
        ctx.createRadialGradient(
            0,
            0,
            5,
            0,
            0,
            width * .47
        );


    outer.addColorStop(
        0,
        "rgba(255,235,255,.65)"
    );


    outer.addColorStop(
        .08,
        "rgba(220,170,255,.45)"
    );


    outer.addColorStop(
        .22,
        "rgba(100,130,255,.30)"
    );


    outer.addColorStop(
        .48,
        "rgba(40,80,220,.16)"
    );


    outer.addColorStop(
        .75,
        "rgba(20,50,140,.08)"
    );


    outer.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );


    ctx.fillStyle =
        outer;


    ctx.scale(
        1,
        .28
    );


    ctx.beginPath();


    ctx.arc(
        0,
        0,
        width * .48,
        0,
        Math.PI * 2
    );


    ctx.fill();


    const core =
        ctx.createRadialGradient(
            0,
            0,
            0,
            0,
            0,
            width * .13
        );


    core.addColorStop(
        0,
        "rgba(255,255,255,.95)"
    );


    core.addColorStop(
        .15,
        "rgba(255,225,255,.85)"
    );


    core.addColorStop(
        .35,
        "rgba(210,160,255,.55)"
    );


    core.addColorStop(
        1,
        "rgba(80,100,255,0)"
    );


    ctx.fillStyle =
        core;


    ctx.beginPath();


    ctx.arc(
        0,
        0,
        width * .14,
        0,
        Math.PI * 2
    );


    ctx.fill();


    ctx.restore();
}

/* =====================================================
   GOLD PARTICLE
===================================================== */

function drawParticle(
    object,
    point,
    time
) {

    const twinkle =
        .35 +
        Math.sin(
            time * .003 +
            object.phase
        ) * .35;


    const radius =
        Math.max(
            .3,
            object.size *
            point.scale
        );


    ctx.beginPath();


    ctx.arc(
        point.x,
        point.y,
        radius,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        `rgba(
            255,
            225,
            60,
            ${twinkle}
        )`;


    ctx.shadowBlur = 7;

    ctx.shadowColor =
        "#ffe900";


    ctx.fill();


    ctx.shadowBlur = 0;
}


/* =====================================================
   HEART PARTICLE
===================================================== */

function drawHeartParticle(
    object,
    point,
    time
) {

    const pulse =
        .7 +
        Math.sin(
            time * .003 +
            object.phase
        ) * .3;


    const radius =
        object.size *
        point.scale *
        pulse;


    ctx.beginPath();


    ctx.arc(
        point.x,
        point.y,
        radius,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "rgba(255,245,120,.82)";


    ctx.shadowBlur = 9;

    ctx.shadowColor =
        "#ffe900";


    ctx.fill();


    ctx.shadowBlur = 0;
}


/* =====================================================
   FLOWER
===================================================== */

function drawFlower(
    object,
    point,
    time
) {

    const floatX =
        Math.sin(
            time *
            object.speed +
            object.phase
        ) * 3;


    const floatY =
        Math.cos(
            time *
            object.speed *
            1.2 +
            object.phase
        ) * 4;


    ctx.save();


    ctx.translate(

        point.x +
        floatX *
        point.scale,

        point.y +
        floatY *
        point.scale
    );


    const scale =
        Math.max(
            .25,
            point.scale
        );


    ctx.scale(
        scale,
        scale
    );


    ctx.font =
        `${object.size}px
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Noto Color Emoji",
        sans-serif`;


    ctx.textAlign =
        "center";


    ctx.textBaseline =
        "middle";


    ctx.shadowBlur = 10;


    ctx.shadowColor =
        "rgba(255,220,30,.9)";


    ctx.fillText(
        object.emoji,
        0,
        0
    );


    ctx.restore();


    ctx.shadowBlur = 0;
}


/* =====================================================
   TEXT
===================================================== */

function drawText(
    object,
    point,
    time
) {

    const floatX =
        Math.sin(
            time *
            object.speed +
            object.phase
        ) * 4;


    const floatY =
        Math.cos(
            time *
            object.speed *
            1.3 +
            object.phase
        ) * 4;


    ctx.save();


    ctx.translate(

        point.x +
        floatX *
        point.scale,

        point.y +
        floatY *
        point.scale
    );


    const scale =
        Math.max(
            .45,
            point.scale
        );


    ctx.scale(
        scale,
        scale
    );


    ctx.font =
        `bold
        ${object.size}px
        Georgia,
        serif`;


    ctx.textAlign =
        "center";


    ctx.textBaseline =
        "middle";


    ctx.fillStyle =
        "rgba(255,255,245,.95)";


    ctx.shadowBlur = 8;


    ctx.shadowColor =
        "rgba(255,220,60,.9)";


    ctx.fillText(
        object.text,
        0,
        0
    );


    ctx.restore();


    ctx.shadowBlur = 0;
}

/* =====================================================
   MAIN ANIMATION
===================================================== */

function animate(time) {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* CAMERA */

    rotationY +=
        (
            targetRotationY -
            rotationY
        ) * .09;


    rotationX +=
        (
            targetRotationX -
            rotationX
        ) * .09;


    /* ZOOM */

    zoom +=
        (
            targetZoom -
            zoom
        ) * .10;


    /* AUTO ROTATION */

    if (!dragging) {

        targetRotationY +=
            .0012;
    }


    /* BACKGROUND */

    drawBackground();


    /* GALAXY */

    drawGalaxyNebula();

    drawGalaxyDisk();

    drawGalaxyStars(
        time
    );


    /* 3D OBJECTS */

    const visible = [];


    for (
        let i = 0;
        i < objects.length;
        i++
    ) {

        const object =
            objects[i];


        const point =
            project(
                object.x,
                object.y,
                object.z
            );


        if (
            point.scale <= 0 ||
            point.scale > 5
        ) {
            continue;
        }


        visible.push({

            object,
            point
        });
    }


    /* DEPTH SORT */

    visible.sort(
        (a,b) =>
            b.point.z -
            a.point.z
    );


    /* DRAW */

    for (
        let i = 0;
        i < visible.length;
        i++
    ) {

        const object =
            visible[i].object;

        const point =
            visible[i].point;


        if (
            object.type ===
            "particle"
        ) {

            drawParticle(
                object,
                point,
                time
            );

        }

        else if (
            object.type ===
            "heartParticle"
        ) {

            drawHeartParticle(
                object,
                point,
                time
            );

        }

        else if (
            object.type ===
            "flower"
        ) {

            drawFlower(
                object,
                point,
                time
            );

        }

        else if (
            object.type ===
            "text"
        ) {

            drawText(
                object,
                point,
                time
            );
        }
    }


    requestAnimationFrame(
        animate
    );
}


requestAnimationFrame(
    animate
);


/* =====================================================
   PINCH ZOOM
===================================================== */

let pinchStartDistance = 0;

let pinchStartZoom = 1;


function getTouchDistance(
    touches
) {

    const dx =
        touches[0].clientX -
        touches[1].clientX;


    const dy =
        touches[0].clientY -
        touches[1].clientY;


    return Math.sqrt(
        dx * dx +
        dy * dy
    );
}


scene.addEventListener(
    "touchstart",
    event => {

        if (
            event.touches.length === 2
        ) {

            event.preventDefault();


            dragging = false;


            pinchStartDistance =
                getTouchDistance(
                    event.touches
                );


            pinchStartZoom =
                targetZoom;
        }

    },
    {
        passive: false
    }
);


scene.addEventListener(
    "touchmove",
    event => {

        if (
            event.touches.length === 2
        ) {

            event.preventDefault();


            const distance =
                getTouchDistance(
                    event.touches
                );


            const difference =
                distance -
                pinchStartDistance;


            targetZoom =
                pinchStartZoom +
                difference * .003;


            targetZoom =
                Math.max(
                    MIN_ZOOM,
                    Math.min(
                        MAX_ZOOM,
                        targetZoom
                    )
                );
        }

    },
    {
        passive: false
    }
);


scene.addEventListener(
    "touchend",
    event => {

        if (
            event.touches.length < 2
        ) {

            pinchStartDistance = 0;
        }

    }
);