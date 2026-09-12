// shapes.js
export function createRect(x, y, w = 120, h = 80, color = "#4f46e5") {
  return { type: "rect", x, y, w, h, color };
}

export function createCircle(x, y, r = 50, color = "#ef4444") {
  return { type: "circle", x, y, r, color };
}

export function createText(x, y, text = "Hello Canva", size = 24, color = "#111827") {
  return { type: "text", x, y, text, size, color };
}

export function drawShape(ctx, shape) {
  ctx.fillStyle = shape.color;
  switch (shape.type) {
    case "rect":
      ctx.fillRect(shape.x, shape.y, shape.w, shape.h);
      break;
    case "circle":
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.r, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "text":
      ctx.font = `${shape.size}px sans-serif`;
      ctx.fillText(shape.text, shape.x, shape.y);
      break;
  }
}

export function hitTest(shape, mx, my) {
  if (shape.type === "rect") {
    return mx >= shape.x && mx <= shape.x + shape.w &&
           my >= shape.y && my <= shape.y + shape.h;
  }
  if (shape.type === "circle") {
    const dx = mx - shape.x, dy = my - shape.y;
    return dx * dx + dy * dy <= shape.r * shape.r;
  }
  return false;
}
