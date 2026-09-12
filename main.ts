// main.ts
import { CanvasEditor } from "./CanvasEditor.js";

const canvas = document.getElementById("stage") as HTMLCanvasElement;
canvas.width = 800;
canvas.height = 500;

const editor = new CanvasEditor(canvas);

// стартовые фигуры
editor.addRect(80, 80);
editor.addCircle(350, 200);
editor.addText(150, 350);

// кнопки
document.getElementById("addRect")!.onclick = () => editor.addRect(200, 150);
document.getElementById("addCircle")!.onclick = () => editor.addCircle(400, 250);
document.getElementById("addText")!.onclick = () => editor.addText(250, 400);
document.getElementById("del")!.onclick = () => editor.deleteSelected();
