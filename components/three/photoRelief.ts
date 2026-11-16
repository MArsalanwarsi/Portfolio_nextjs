import * as T from "three";

export function mountPhoto(host: HTMLDivElement, img: HTMLImageElement) {
  const canvas=document.createElement("canvas");
  const context=canvas.getContext("webgl2",{alpha:true,antialias:true});
  if(!context) return;
  const renderer=new T.WebGLRenderer({canvas,context,alpha:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
  const texture = new T.Texture(img);
  texture.colorSpace = T.SRGBColorSpace;
  texture.needsUpdate = true;
  const geometry=new T.PlaneGeometry(1.6,2,68,82);
  const verts=geometry.attributes.position;
  for(let i=0;i<verts.count;i++){
    const x=verts.getX(i), y=verts.getY(i);
    const face=Math.exp(-((x+.14)**2/.08+(y-.38)**2/.12));
    const chest=Math.exp(-(x*x/.36+(y+.43)**2/.7));
    verts.setZ(i,.16*face+.1*chest);
  }
  const material=new T.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false});
  const mesh=new T.Mesh(geometry,material);
  const scene=new T.Scene();scene.add(mesh);
  const camera=new T.PerspectiveCamera(34,.8,.1,20);camera.position.z=3.4;
  host.appendChild(canvas);
  const motion=matchMedia("(prefers-reduced-motion: reduce)");
  let x=0,y=0,rx=0,ry=0,visible=true,frame=0;
  function draw(){
    frame=0;if(!visible||document.hidden)return;
    const shift=motion.matches?0:Math.min(1,scrollY/innerHeight);
    const yaw=motion.matches?0:x*.16, pitch=motion.matches?0:y*.055-shift*.10;
    rx+=(pitch-rx)*.13; ry+=(yaw-ry)*.13;
    mesh.rotation.set(rx,ry,0);mesh.position.y=shift*.09;
    renderer.render(scene,camera);host.dataset.enhanced="true";
    if(Math.abs(rx-pitch)+Math.abs(ry-yaw)>.0002)wake();
  }
  function wake(){if(!frame)frame=requestAnimationFrame(draw);}
  function point(e:PointerEvent){x=e.clientX/innerWidth*2-1;y=e.clientY/innerHeight*2-1;wake();}
  function lost(){visible=false;delete host.dataset.enhanced;}
  const size=new ResizeObserver(()=>{const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();wake();});
  size.observe(host);
  const watch=new IntersectionObserver(([v])=>{visible=v.isIntersecting;wake();});watch.observe(host);
  canvas.addEventListener("webglcontextlost",lost);
  window.addEventListener("pointermove",point,{passive:true});window.addEventListener("scroll",wake,{passive:true});
  document.addEventListener("visibilitychange",wake);motion.addEventListener("change",wake);
  return ()=>{cancelAnimationFrame(frame);watch.disconnect();size.disconnect();window.removeEventListener("scroll",wake);window.removeEventListener("pointermove",point);document.removeEventListener("visibilitychange",wake);motion.removeEventListener("change",wake);canvas.removeEventListener("webglcontextlost",lost);delete host.dataset.enhanced;geometry.dispose();material.dispose();texture.dispose();renderer.dispose();canvas.remove();};
}
