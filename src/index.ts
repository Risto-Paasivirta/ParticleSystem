import { Application, Loader } from "pixi.js";
import { ExampleTest } from "./example_test";
import "./style.css";

const gameWidth = 800;
const gameHeight = 600;

const app = new Application({
    backgroundColor: 0x051033,
    width: gameWidth,
    height: gameHeight,
});

let example_test: ExampleTest;

window.onload = async (): Promise<void> => {
    await loadGameAssets();
    document.body.appendChild(app.view);
    example_test = new ExampleTest(app.stage);
    example_test.init();
    resizeCanvas();
    window.onresize = resizeCanvas;

    app.ticker.add(() => {
        const dt = app.ticker.elapsedMS / 1000;
        example_test.update(dt);
    });
};

async function loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = Loader.shared;
        loader.add("spritesheet", "./assets/kenney_particlePack.json");

        loader.onComplete.once(() => {
            res();
        });

        loader.onError.once(() => {
            rej();
        });

        loader.load();
    });
}

function resizeCanvas(): void {
    const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);

        //fit the contents to the window
        const scale = Math.min(window.innerWidth / gameWidth, window.innerHeight / gameHeight);
        app.stage.scale.x = scale;
        app.stage.scale.y = scale;
    };

    resize();

    window.addEventListener("resize", resize);
}
