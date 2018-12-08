//场景
const scene = new THREE.Scene();;
//取景器
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
//渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight, false);

let sun0, sun1, sun2,star;
function rendererScene() {
    sun0.animate();
    sun1.animate();
    sun2.animate();
    star.animate();
    //原生方法，告诉浏览器开始产生动画，接受一个回调函数
    requestAnimationFrame(rendererScene);
    //threejs方法，渲染场景个取景器
    renderer.render(scene,camera);    
}
function main() {
    // 设置颜色和透明度 hexcolor
    renderer.setClearColor(0x000000, 0.0)
    //打开阴影渲染
    renderer.shadowMapEnabled = true;
    //初始化canvas
    MOUSE.initialize("#canvas");
    //取景器位置
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 20;
    camera.lookAt(scene.position);
    //初始化太阳光，颜色，取景器位置，
    let SUN_LIGHT = new Light(0x555555, camera.position.x, camera.position.y, camera.position.z, true, "ambient");
    SUN_LIGHT.model(scene);
    // Modelo
    star = new Astro(0.004 / 2, "../imgfile/sol.jpg", 0, 0.01, 0.002, false, true);
    star.model();

    sun0 = new Astro(4 / 2, "../imgfile/sol.jpg", 10, 0.01, 0.002, false, true);
    sun0.model();

    sun1 = new Astro(4 / 2, "../imgfile/sol.jpg", 10, 0.01, 0.005,false, true);
    sun1.model();

    sun2 = new Astro(4 / 2, "../imgfile/sol.jpg", 20, 0.01, 0, false, true);
    sun2.model();

    scene.add(star.get());
    star.addSatelite(sun0.get());
    sun0.addSatelite(sun1.get());
    sun1.addSatelite(sun2.get());


    $("#canvas").append(renderer.domElement);

    rendererScene();

    
}
main() ;
