import * as THREE from 'three';

function uploadImg() {
    const fileInput = document.getElementById("file").value;
    alert(fileInput);
}

const canvas = document.getElementById("canvas");

function generateGIF(element, renderFunction, duration = 1, fps = 30) {
    const frames = duration * fps;

    canvas.width = element.width;
    canvas.height = element.height;
    const context = canvas.getContext( '2d' );

    const buffer = new Uint8Array( canvas.width * canvas.height * frames * 5 );
    const pixels = new Uint8Array( canvas.width * canvas.height );
    const writer = new GifWriter( buffer, canvas.width, canvas.height, { loop: 0 } );

    let current = 0;

    return new Promise(async function addFrame(resolve) {
        renderFunction(current / frames);
        context.drawImage(element, 0, 0);

        const data = context.getImageData(0, 0, canvas.width, canvas.height).data;

        const palette = [];

        for (var j = 0, k = 0, jl = data.length; j < jl; j += 4, k++) {

            const r = Math.floor(data[ j + 0 ] * 0.1) * 10;
            const g = Math.floor(data[ j + 1 ] * 0.1) * 10;
            const b = Math.floor(data[ j + 2 ] * 0.1) * 10;
            const color = r << 16 | g << 8 | b << 0;

            const index = palette.indexOf(color);

            if (index === -1) {
                pixels[k] = palette.length;
                palette.push(color);

            } else {
                pixels[k] = index;
            }

        }

        let powof2 = 1;
        while (powof2 < palette.length) powof2 <<= 1;
        palette.length = powof2;


        const delay = 100 / fps; // Delay in hundredths of a sec (100 = 1s)
        const options = { palette: new Uint32Array( palette ), delay: delay };
        writer.addFrame( 0, 0, canvas.width, canvas.height, pixels, options );

        current ++;

        progress.value = current / frames;

        if ( current < frames ) {
            await setTimeout(addFrame, 0, resolve);
        } else {
            resolve(buffer.subarray(0, writer.end()));
        }
    } );

}

const button = document.getElementById('renderButton');
const progress = document.getElementById( 'progress');

button.addEventListener( 'click', async function () {
    button.style.display = 'none';
    progress.style.display = '';

    const buffer = await generateGIF(canvas, render, 4, 30);

    button.style.display = '';
    progress.style.display = 'none';
    // Download

    const blob = new Blob( [ buffer ], { type: 'image/gif' } );

    const link = document.createElement( 'a' );
    link.href = URL.createObjectURL( blob );
    link.download = 'animation.gif';
    link.dispatchEvent( new MouseEvent( 'click' ) );
} );

// Animation
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 10);
camera.position.z = 2;

const scene = new THREE.Scene();

const geometry = new THREE.IcosahedronGeometry(0.75, 1);
const material = new THREE.MeshNormalMaterial({ flatShading: true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer( { canvas: canvas } );
renderer.setClearColor(0xffffff, 1);
renderer.setSize(500, 500);
document.body.appendChild(renderer.domElement);
//

function render(progress) {
    // progress goes from 0 to 1
    mesh.rotation.x = progress * Math.PI * 2;
    mesh.rotation.y = - progress * Math.PI * 2;

    renderer.render(scene, camera);
}

function animation(time) {
    if (progress.style.display === 'none' ) {
        // Only render when not generating
        render( (time / 5000) % 1);
    }

    requestAnimationFrame( animation );
}

requestAnimationFrame(animation);

document.getElementById("uploadButton").addEventListener("click", uploadImg);
