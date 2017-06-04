import * as THREE from 'three';

var camera: THREE.OrthographicCamera;
var scene: THREE.Scene;
var renderer: THREE.WebGLRenderer;

var innerCubeSize: number;
var innerCubeGeometry: THREE.BoxGeometry;
var innerCubeMaterial: THREE.MeshBasicMaterial;
var innerCube: THREE.Mesh;
var innerCubeEdges: THREE.EdgesGeometry;
var innerCubeLineMat: THREE.LineBasicMaterial;
var innerCubeLine: THREE.LineSegments;

var outerCubeSize: number;
var outerCubeGeometry: THREE.BoxGeometry;
var outerCubeMaterial: THREE.MeshBasicMaterial;
var outerCube: THREE.Mesh;
var outerCubeEdges: THREE.EdgesGeometry;
var outerCubeLineMat: THREE.LineBasicMaterial;
var outerCubeLine: THREE.LineSegments;

init();
animate();

function init(): void {

	innerCubeSize = 60;
	innerCubeGeometry = new THREE.BoxGeometry(innerCubeSize, innerCubeSize, innerCubeSize);
	innerCubeMaterial = new THREE.MeshBasicMaterial({
		color: new THREE.Color("hsl(207, 74%, 44%)")
	});
	innerCube = new THREE.Mesh(innerCubeGeometry, innerCubeMaterial);
	innerCube.translateZ(0);
	innerCube.translateY(0);
	innerCube.rotateY(THREE.Math.degToRad(45));

	innerCubeEdges = new THREE.EdgesGeometry(innerCube.geometry);
	innerCubeLineMat = new THREE.LineBasicMaterial({
		color: 0xffffff,
		linewidth: 1
	});
	innerCubeLine = new THREE.LineSegments(innerCubeEdges, innerCubeLineMat)
	innerCubeLine.translateZ(0);
	innerCubeLine.rotateY(THREE.Math.degToRad(45));

	outerCubeSize = 120;
	outerCubeGeometry = new THREE.BoxGeometry(outerCubeSize, outerCubeSize, outerCubeSize);
	outerCubeMaterial = new THREE.MeshBasicMaterial({
		color: new THREE.Color("hsl(199, 90%, 76%)"),
		transparent: true,
		opacity: 0.5
	});
	outerCube = new THREE.Mesh(outerCubeGeometry, outerCubeMaterial);
	outerCube.translateZ(0);
	outerCube.rotateY(THREE.Math.degToRad(45));

	outerCubeEdges = new THREE.EdgesGeometry(outerCube.geometry);
	outerCubeLineMat = new THREE.LineBasicMaterial({
		color: 0xffffff,
		linewidth: 6,
		linecap: 'butt',
		linejoin: 'miter'
	});
	outerCubeLine = new THREE.LineSegments(outerCubeEdges, outerCubeLineMat)
	outerCubeLine.translateZ(0);
	outerCubeLine.applyMatrix(new THREE.Matrix4().makeScale(1.02, 1.02, 1.02));
	outerCubeLine.rotateY(THREE.Math.degToRad(45));

	scene = new THREE.Scene();
	scene.add(innerCube);
	scene.add(innerCubeLine);
	scene.add(outerCube);
	scene.add(outerCubeLine);
	scene.background = new THREE.Color(0x2b3a42);

	camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / - 2, window.innerHeight / 2, 1, 10000);
	camera.translateZ(1000);
	camera.translateY(-1000 * THREE.Math.degToRad(33.5) + (-outerCubeSize / 2));
	camera.rotateX(THREE.Math.degToRad(33.5));

	renderer = new THREE.WebGLRenderer({
		alpha: true
	});
	renderer.setFaceCulling(THREE.CullFaceFront);
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.insertBefore(renderer.domElement, document.body.firstChild);

}

function animate(): void {

	requestAnimationFrame(animate);

	innerCube.rotateY(-0.0174533);
	innerCubeLine.rotateY(-0.0174533);
	outerCube.rotateY(0.0174533);
	outerCubeLine.rotateY(0.0174533);

	renderer.render(scene, camera);

}
