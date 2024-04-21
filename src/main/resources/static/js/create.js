const canvas = document.querySelector("#glcanvas");
const gl = canvas.getContext("webgl");

function tf() {
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0]; // Get the first file from the input
    console.log("tf() call");
    /*
        if (file) {
            // File was selected
            const reader = new FileReader();
            reader.readAsDataURL(file); // Read the file as a data URL

            // Handle the file once it's loaded
            reader.onload = function (event) {
                const fileDataUrl = event.target.result;
                console.log("File loaded:", fileDataUrl);

                // Now you can use the file data (fileDataUrl) as needed, such as uploading it
                // to a server or processing it further
            };
        } else {
            // No file was selected
            console.log("No file selected.");
        }

    */
    if (!file) {
        console.error("No file selected.");
        return;
    }

    // Read the file as an image
    const reader = new FileReader();
    reader.onload = function(event) {
        const image = new Image();
        image.onload = function() {
            /*
            // Create a texture object
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);

            // Upload the image data to the texture
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

            // Set texture parameters
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            // Use the texture in your WebGL rendering
            // For example, you can render a quad with the texture applied...

            // Example: Render a quad with the texture
            // (This requires additional WebGL setup for shaders, buffers, etc.)
             */
        };
        image.src = event.target.result; // Set the image source to the loaded data URL
    };
    reader.readAsDataURL(file); // Read the file as a data URL
}

document.getElementById("uploadButton").addEventListener("click", tf);

if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
}

var vertices = [
    -1.0,  1.0, 0.0,  // Top left
    -1.0, -1.0, 0.0,  // Bottom left
    1.0, -1.0, 0.0,  // Bottom right
    1.0,  1.0, 0.0   // Top right
];

var indices = [
    0, 1, 2,  // First triangle
    0, 2, 3   // Second triangle
];

function createVertexBuffer(vertices){
    var vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return vertex_buffer;
}

function createIndexBuffer(indices) {
    var index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    return index_buffer;
}

function createShader(vertex, vertCode) {
    var shader = 0;
    if (vertex) {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    }

    gl.shaderSource(shader, vertCode);
    gl.compileShader(shader);

    return shader;
}

function createProgram(vertex, fragment) {
    var program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.useProgram(program);

    return program;
}

var vertCode =
    'attribute vec3 coordinates;' +
    'void main(void) {' +
    ' gl_Position = vec4(coordinates, 1.0);' +
    '}';


var fragCode =
    'void main(void) {' +
    ' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);' +
    '}';

var vertShader = createShader(true, vertCode);
var fragShader = createShader(false, fragCode);
var shaderProgram = createProgram(vertShader, fragShader);

var vertex_buffer = createVertexBuffer(vertices);
var index_buffer = createIndexBuffer(indices);

gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
var coord = gl.getAttribLocation(shaderProgram, "coordinates");
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coord);

gl.clearColor(0.35, 0.35, 0.35, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.viewport(0.0, 0.0, canvas.width, canvas.height);

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
