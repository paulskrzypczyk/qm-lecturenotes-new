// A small orthographic 3D view for the plots (ground rules §6): world axes
// (X, Y, Z) with Z up and Y towards the viewer; a yaw about Z and a pitch about the
// screen's horizontal axis. Projects to viewBox units around a centre (cx, cy) with
// a fixed scale, so that nothing rescales when the reader turns the view.

export class View3 {
  constructor({ cx, cy, scale, yaw = 0, pitch = 0 }) {
    Object.assign(this, { cx, cy, scale, yaw, pitch });
  }

  /** Camera angles in degrees. */
  set(yaw, pitch) { this.yaw = yaw; this.pitch = Math.max(-89, Math.min(89, pitch)); }

  /** Move the centre so that the world point (X, Y, Z) projects to (sx, sy). */
  centreOn(X, Y, Z, sx, sy) {
    this.cx = 0; this.cy = 0;
    const p = this.project(X, Y, Z);
    this.cx = sx - p.x; this.cy = sy - p.y;
  }

  /** World → {x, y, depth}: screen position in viewBox units, depth > 0 towards the viewer. */
  project(X, Y, Z) {
    const a = (this.yaw * Math.PI) / 180, b = (this.pitch * Math.PI) / 180;
    const u = X * Math.cos(a) + Y * Math.sin(a);
    const d = -X * Math.sin(a) + Y * Math.cos(a);
    const v = Z * Math.cos(b) - d * Math.sin(b);
    const depth = Z * Math.sin(b) + d * Math.cos(b);
    return { x: this.cx + this.scale * u, y: this.cy - this.scale * v, depth };
  }
}
