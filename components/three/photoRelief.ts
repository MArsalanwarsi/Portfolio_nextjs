import * as T from "three";

// Outline in original photograph coordinates, normalized to a 368 × 460 plate.
const outline = [[91,123],[94,99],[104,86],[127,72],[151,64],[174,64],[192,73],[204,85],[210,103],[207,124],[201,149],[200,168],[211,178],[221,194],[252,201],[277,212],[287,221],[293,246],[305,281],[315,318],[322,354],[320,374],[309,407],[294,441],[291,460],[95,460],[104,399],[99,375],[84,386],[77,380],[74,371],[62,373],[47,365],[34,359],[33,351],[19,346],[19,342],[51,345],[62,339],[65,327],[72,320],[81,323],[90,338],[99,315],[100,229],[106,215],[120,207],[139,201],[145,193],[130,190],[123,182],[120,174],[115,174],[111,165],[106,165],[101,154],[107,149],[98,143]];
export function mountPhoto(host: HTMLDivElement, img: HTMLImageElement) {
  const canvas=document.createElement("canvas");
  const context=canvas.getContext("webgl2",{alpha:true,antialias:true});
  if(!context) return;
  const renderer=new T.WebGLRenderer({canvas,context,alpha:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
  const plate=document.createElement("canvas");
  plate.width=img.naturalWidth; plate.height=img.naturalHeight;
  const brush=plate.getContext("2d")!;
  brush.scale(plate.width/368,plate.height/460); brush.beginPath();
  outline.forEach(([x,y],i)=>{if(i===0)brush.moveTo(x,y);else brush.lineTo(x,y);});
  brush.closePath();brush.clip();brush.drawImage(img,0,0,368,460);
  const texture=new T.CanvasTexture(plate);texture.colorSpace=T.SRGBColorSpace;
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
