class Astro {
    constructor(radio, urlTextura, distancia, velRotOrb, velRot, stoppable, luz) {
        this.RESOLUCION = 64;
        this.radio = radio;
        this.urlTextura = urlTextura;
        this.distancia = distancia;
        this.velRot = velRot;
        this.velRotOrb = velRotOrb;
        this.stoppable = stoppable;
        this.luz = luz;
        this.sphere = null;
        this.bg = null;
        this.tgRot = null;
        this.tgRotOrb = null;
        this.tgDis = null;
    }

    model () {
        // 球面模型 接受三个参数，半径，球形经纬度分段（segmentsWidth和segmentsHeight）就是在一个球体上，等分多少份，就像切西瓜一样
        let sphereGeometry = new THREE.SphereGeometry(this.radio, this.RESOLUCION, this.RESOLUCION),
            sphereMaterial;
        if (this.luz) {
            //基本组成材料
            sphereMaterial = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture(this.urlTextura) });
        } else {
            sphereMaterial = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture(this.urlTextura) });
        }
        //渲染球体和球体的材料
        this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.sphere.position.x = 0;
        this.sphere.position.y = 0;
        this.sphere.position.z = 0;
        if (this.luz) {
            this.sphere.castShadow = false;
        } else {
            this.sphere.castShadow = true;
        }
        //增加三维物体
        this.bg = new THREE.Object3D;
        this.tgRotOrb = new THREE.Object3D;
        this.tgDis = new THREE.Object3D;
        this.tgRot = new THREE.Object3D;

        this.tgRot.add(this.sphere);
        this.tgDis.add(this.tgRot);
        this.tgRotOrb.add(this.tgDis);
        this.bg.add(this.tgRotOrb);

        if (this.luz) {
            var luzAstro = new Light(0xFFFFFF, this.sphere.position.x, this.sphere.position.y, this.sphere.position.z, true, "point");
            luzAstro.model(this.tgRot);
        }
    };

    get () {
        return this.bg;
    };
    animate () {
        if (!this.stoppable || !MOUSE.click) {
            this.tgRotOrb.rotation.y += this.velRotOrb;
        } else {
            this.tgRotOrb.rotation.y += 0;
        }
        this.tgDis.position.x = this.distancia;
        this.tgRot.rotation.y += this.velRot;
    };
    //增加卫星
    addSatelite (satelite) {
        this.tgDis.add(satelite);
    }
}