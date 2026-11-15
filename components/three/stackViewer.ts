import * as THREE from "three";

export type StackViewer = {
  select: (index: number) => void;
  turn: (direction: number) => void;
  dispose: () => void;
};

export function createStackViewer(host: HTMLDivElement, count: number, initial: number, onPick: (index: number) => void, onLoss: () => void): StackViewer {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  host.append(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 40);
  camera.position.set(3.3, 2.9, 6.2);
  camera.lookAt(0, 0, 0);
  const stack = new THREE.Group();
  scene.add(stack, new THREE.HemisphereLight(0xfcfcfc, 0x787878, 1.8));
  const key = new THREE.DirectionalLight(0xfbfbfb, 3);
  key.position.set(-3, 6, 4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xececec, 1.3);
  rim.position.set(3, 1, -4);
  scene.add(rim);

  const shape = new THREE.Shape();
  const corners = [[-1.09, -.66], [.93, -.66], [1.09, -.50], [1.09, .55], [.98, .66], [-.98, .66], [-1.09, .55]];
  corners.forEach(([x, y], i) => i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y));
  shape.closePath();
  const plate = new THREE.ExtrudeGeometry(shape, { depth: .065, bevelEnabled: true, bevelThickness: .025, bevelSize: .025, bevelSegments: 2, steps: 1 });
  plate.rotateX(-Math.PI / 2);
  const block = new THREE.BoxGeometry(1, 1, 1);
  const disk = new THREE.CylinderGeometry(.14, .14, .045, 28);
  const metal = new THREE.MeshStandardMaterial({ color: 0x383838, roughness: .36, metalness: .3 });
  const alloy = new THREE.MeshStandardMaterial({ color: 0xc5c5c5, roughness: .35, metalness: .45 });
  const glass = new THREE.MeshStandardMaterial({ color: 0x252525, roughness: .18, metalness: .25 });
  const faces: THREE.MeshStandardMaterial[] = [];
  const hits: THREE.Mesh[] = [];
  const layers: THREE.Group[] = [];
  for (let index = 0; index < count; index++) {
    const layer = new THREE.Group();
    layer.position.y = ((count - 1) / 2 - index) * .51;
    stack.add(layer);
    layers.push(layer);
    const face = new THREE.MeshStandardMaterial({ color: 0x7f7f7f, metalness: .24, roughness: .46 });
    faces.push(face);
    function part(geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0) {
      const piece = new THREE.Mesh(geo, mat);
      piece.position.set(x, y, z);
      piece.userData.index = index;
      layer.add(piece);
      hits.push(piece);
      return piece;
    }
    function bar(x: number, z: number, width: number, depth: number, height: number, mat = metal) {
      part(block, mat, x, .09 + height / 2, z).scale.set(width, height, depth);
    }
    part(plate, face);
    if (index === 0) {
      // Inset viewport and its window controls.
      bar(-.12, -.02, 1.5, .84, .025, glass);
      for (let i = 0; i < 3; i++) bar(.79, -.24 + .22 * i, .13, .11, .04, alloy);
    } else if (index === 1) {
      for (let i = 0; i < 7; i++) bar(-.74 + i * .22, -.03, .11, .82, .14, metal);
    } else if (index === 2) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 2; j++) part(disk, j ? metal : alloy, -.58 + i * .56, .12 + j * .056, .04).scale.set(1.6, 1, 1.6);
      }
    } else {
      for (let i = 0; i < 3; i++) {
        bar(-.65 + i * .62, -.05, .36, .57, .08);
        bar(-.65 + i * .62, .43, .16, .08, .03, alloy);
      }
    }
    for (let i = 0; i <= index; i++) bar(-.82 + .13 * i, .55, .07, .035, .015, metal);
  }
  let selected = initial;
  let angle = 0;
  let frame = 0;
  let visible = true;
  let disposed = false;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  function render() {
    frame = 0;
    if (!visible || document.hidden || disposed) return;
    const delta = angle - stack.rotation.y;
    stack.rotation.y += reduced.matches || Math.abs(delta) < .002 ? delta : delta * .2;
    renderer.render(scene, camera);
    if (Math.abs(angle - stack.rotation.y) > .001) invalidate();
  }
  function invalidate() {
    if (visible && !document.hidden && !disposed && !frame) frame = requestAnimationFrame(render);
  }
  function select(index: number) {
    selected = index;
    faces.forEach((face, i) => face.color.setHex(i === index ? 0xbcbcbc : 0x6a6a6a));
    layers.forEach((layer, i) => { layer.position.x = i === index ? .13 : 0; });
    invalidate();
  }
  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    const half = Math.max(1.6, 1.59 * height / width);
    camera.top = half; camera.bottom = -half;
    camera.right = half * width / height; camera.left = -camera.right;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    invalidate();
  }
  const size = new ResizeObserver(resize);
  size.observe(host);
  const onScreen = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; invalidate(); });
  onScreen.observe(host);
  document.addEventListener("visibilitychange", invalidate);
  const lost = () => { dispose(); onLoss(); };
  canvas.addEventListener("webglcontextlost", lost);
  const ray = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let gesture: { id: number; x: number; y: number; angle: number; moved: boolean } | null = null;
  function down(e: PointerEvent) {
    if (!e.isPrimary || e.button !== 0) return;
    gesture = { id: e.pointerId, x: e.clientX, y: e.clientY, angle, moved: false };
    canvas.setPointerCapture(e.pointerId);
  }
  function move(e: PointerEvent) {
    if (!gesture || gesture.id !== e.pointerId) return;
    const dx = e.clientX - gesture.x;
    gesture.moved ||= Math.hypot(dx, e.clientY - gesture.y) > 6;
    if (!gesture.moved) return;
    angle = gesture.angle + dx * .012;
    invalidate();
  }
  function up(e: PointerEvent) {
    if (!gesture || gesture.id !== e.pointerId) return;
    const tap = !gesture.moved;
    gesture = null;
    if (!tap) return;
    const r = canvas.getBoundingClientRect();
    pointer.set((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1);
    ray.setFromCamera(pointer, camera);
    const hit = ray.intersectObjects(hits, false)[0];
    if (hit && hit.object.userData.index !== selected) onPick(hit.object.userData.index);
  }
  function cancel() { gesture = null; }
  canvas.addEventListener("pointerdown", down);
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerup", up);
  canvas.addEventListener("lostpointercapture", cancel);
  select(initial);
  resize();
  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    onScreen.disconnect();
    size.disconnect();
    document.removeEventListener("visibilitychange", invalidate);
    canvas.removeEventListener("webglcontextlost", lost);
    canvas.removeEventListener("pointerdown", down);
    canvas.removeEventListener("pointermove", move);
    canvas.removeEventListener("pointerup", up);
    canvas.removeEventListener("lostpointercapture", cancel);
    [plate, block, disk, metal, glass, alloy, ...faces].forEach(resource => resource.dispose());
    renderer.dispose();
    canvas.remove();
  }
  return { select, turn: (direction) => { angle += direction * Math.PI / 6; invalidate(); }, dispose };
}
