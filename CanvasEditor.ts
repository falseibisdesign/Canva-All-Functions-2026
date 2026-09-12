// CanvasEditor.ts
import { createRect, createCircle, createText, drawShape, hitTest } from "./shapes.js";

type Shape = {
  type: "rect" | "circle" | "text";
  x: number; y: number;
  color: string;
  w?: number; h?: number; r?: number;
  size?: number; text?: string;
};

export class CanvasEditor {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private shapes: Shape[] = [];
  private selected: Shape | null = null;
  private dragOffset = { x: 0, y: 0 };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.bindEvents();
    this.render();
  }

  addShape(shape: Shape): void {
    this.shapes.push(shape);
    this.render();
  }

  addRect(x: number, y: number) { this.addShape(createRect(x, y) as Shape); }
  addCircle(x: number, y: number) { this.addShape(createCircle(x, y) as Shape); }
  addText(x: number, y: number) { this.addShape(createText(x, y) as Shape); }

  render(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const s of this.shapes) drawShape(this.ctx, s);

    if (this.selected) {
      this.ctx.strokeStyle = "#2563eb";
      this.ctx.lineWidth = 2;
      const s = this.selected;
      if (s.type === "rect") {
        this.ctx.strokeRect(s.x - 4, s.y - 4, s.w! + 8, s.h! + 8);
      } else if (s.type === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(s.x, s.y, s.r! + 4, 0, Math.PI * 2);
        this.ctx.stroke();
      }
    }
  }

  private getMouse(e: MouseEvent) {
    const r = this.canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  private bindEvents(): void {
    this.canvas.addEventListener("mousedown", (e) => {
      const { x, y } = this.getMouse(e);
      for (let i = this.shapes.length - 1; i >= 0; i--) {
        if (hitTest(this.shapes[i], x, y)) {
          this.selected = this.shapes[i];
          this.dragOffset = { x: x - this.selected.x, y: y - this.selected.y };
          break;
        }
      }
      this.render();
    });

    this.canvas.addEventListener("mousemove", (e) => {
      if (!this.selected) return;
      const { x, y } = this.getMouse(e);
      this.selected.x = x - this.dragOffset.x;
      this.selected.y = y - this.dragOffset.y;
      this.render();
    });

    window.addEventListener("mouseup", () => {
      this.selected = null;
      this.render();
    });
  }

  deleteSelected(): void {
    if (!this.selected) return;
    this.shapes = this.shapes.filter((s) => s !== this.selected);
    this.selected = null;
    this.render();
  }
}
