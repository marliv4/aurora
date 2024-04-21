const canvas = document.querySelector("#glcanvas");
const gl = canvas.getContext("webgl");

function renderImg() {
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];

    if (!file) {
        console.error("No file selected.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const image = new Image();
        image.onload = function() {
        };
        image.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

document.getElementById("uploadButton").addEventListener("click", renderImg);

if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
}

var vertices = [
    -1.0,  1.0, 0.0,
    -1.0, -1.0, 0.0,
    1.0, -1.0, 0.0,
    1.0,  1.0, 0.0
];

var indices = [
    0, 1, 2,
    0, 2, 3
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
