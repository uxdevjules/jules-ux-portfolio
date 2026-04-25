// Portrait — framed photo with terminal corner ticks, scan lines and a mono tag.
// Uses a plain <img> (not next/image) because the design's absolute-positioned
// overlays expect the image to be a direct child of .portrait-frame.
/* eslint-disable @next/next/no-img-element */

export function Portrait() {
  return (
    <div className="portrait" aria-hidden="true">
      <div className="portrait-frame">
        <img
          src="/jules-portrait.jpeg"
          alt="Jules"
          className="portrait-img"
        />
        <div className="portrait-corners">
          <span /><span /><span /><span />
        </div>
        <div className="portrait-tag">{"// jules.jpeg"}</div>
        <div className="portrait-scan" aria-hidden="true" />
      </div>
      <span className="portrait-caption">
        {"// 1 photo · netherlands · 2025"}
      </span>
    </div>
  );
}
