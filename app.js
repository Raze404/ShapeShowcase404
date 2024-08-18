let scene, camera, renderer, shape;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 5;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    animate();
}

function showShape(type) {
    if (shape) scene.remove(shape);

    let title = '';
    let description = '';

    switch (type) {
        case 'cylinder':
            shape = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 2, 64), new THREE.MeshStandardMaterial({ color: 0x87cefa }));
            title = 'Cylinder';
            description = 'A cylindrical shape with circular bases.';
            break;
        case 'cone':
            shape = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 64), new THREE.MeshStandardMaterial({ color: 0xffd700 }));
            title = 'Cone';
            description = 'A conical shape with a circular base tapering to a point.';
            break;
        case 'cube':
            shape = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshStandardMaterial({ color: 0x90ee90 }));
            title = 'Cube';
            description = 'A 3D shape with six equal square faces.';
            break;
        case 'pentagonalPrism':
            shape = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 2, 5, 64), new THREE.MeshStandardMaterial({ color: 0x9370db }));
            title = 'Pentagonal Prism';
            description = 'A prism with pentagonal bases.';
            break;
        case 'hexagonalPrism':
            shape = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 2, 6, 64), new THREE.MeshStandardMaterial({ color: 0x8b008b }));
            title = 'Hexagonal Prism';
            description = 'A prism with hexagonal bases.';
            break;
        case 'pentagrammicPrism':
            shape = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 2, 5, 64), new THREE.MeshStandardMaterial({ color: 0xdc143c }));
            title = 'Pentagrammic Prism';
            description = 'A prism with pentagram bases.';
            break;
        case 'triangularPrism':
            shape = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 2, 3, 64), new THREE.MeshStandardMaterial({ color: 0x4682b4 }));
            title = 'Triangular Prism';
            description = 'A prism with triangular bases.';
            break;
        case 'squarePyramid':
            shape = new THREE.Mesh(new THREE.ConeGeometry(1.5, 2, 4, 64), new THREE.MeshStandardMaterial({ color: 0xffd700 }));
            title = 'Square Pyramid';
            description = 'A pyramid with a square base.';
            break;
        case 'dodecahedron':
            shape = new THREE.Mesh(new THREE.DodecahedronGeometry(1.5), new THREE.MeshStandardMaterial({ color: 0x8a2be2 }));
            title = 'Dodecahedron';
            description = 'A polyhedron with twelve pentagonal faces.';
            break;
        case 'torus':
            shape = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 64), new THREE.MeshStandardMaterial({ color: 0xff4500 }));
            title = 'Torus';
            description = 'A ring-shaped surface.';
            break;
        case 'icosahedron':
            shape = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5), new THREE.MeshStandardMaterial({ color: 0x00ffff }));
            title = 'Icosahedron';
            description = 'A polyhedron with twenty triangular faces.';
            break;
        case 'tetrahedron':
            shape = new THREE.Mesh(new THREE.TetrahedronGeometry(1.5), new THREE.MeshStandardMaterial({ color: 0xff69b4 }));
            title = 'Tetrahedron';
            description = 'A polyhedron with four triangular faces.';
            break;
        case 'octahedron':
            shape = new THREE.Mesh(new THREE.OctahedronGeometry(1.5), new THREE.MeshStandardMaterial({ color: 0x40e0d0 }));
            title = 'Octahedron';
            description = 'A polyhedron with eight triangular faces.';
            break;
    }

    if (shape) {
        shape.rotationSpeed = 0.02;
        scene.add(shape);

        // Update shape details
        document.getElementById('shapeTitle').textContent = title;
        document.getElementById('shapeDescription').textContent = description;
        document.getElementById('shapeDetails').style.display = 'block';
    }

    hideUI();
    document.getElementById('projectName').style.display = 'none'; // Hide project name when shape is displayed
}

function hideUI() {
    document.getElementById('controls').style.display = 'none';
    document.getElementById('returnButton').style.display = 'block';
    document.getElementById('animationControls').style.display = 'block';
    document.getElementById('shapeDetails').style.display = 'block';
}

function showUI() {
    document.getElementById('controls').style.display = 'block';
    document.getElementById('returnButton').style.display = 'none';
    document.getElementById('animationControls').style.display = 'none';
    document.getElementById('shapeDetails').style.display = 'none';
    document.getElementById('projectName').style.display = 'block'; // Show project name when at shape choose screen
    if (shape) scene.remove(shape);
}

let rotationPaused = false;

function startRotation() {
    rotationPaused = false;
}

function pauseRotation() {
    rotationPaused = true;
}

function resetRotation() {
    if (shape) {
        shape.rotation.set(0, 0, 0);
    }
    startRotation();
}

function animate() {
    requestAnimationFrame(animate);

    if (shape && !rotationPaused) {
        shape.rotation.x += shape.rotationSpeed;
        shape.rotation.y += shape.rotationSpeed;
        shape.rotation.z += shape.rotationSpeed;
    }

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

init();
