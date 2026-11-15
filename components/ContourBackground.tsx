interface ContourBackgroundProps {
  surface?: "dark" | "light";
  className?: string;
}

export default function ContourBackground({
  surface = "dark",
  className = "",
}: ContourBackgroundProps) {
  const strokeColor =
    surface === "dark"
      ? "rgba(83, 84, 80, 0.28)" // Tarmac Gray on Paddock Olive
      : "rgba(40, 44, 32, 0.12)"; // Paddock Olive on Chalk Cream

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke={strokeColor} strokeWidth="1" vectorEffect="non-scaling-stroke">
          {/* Topographic Contour Ridge 1 */}
          <path d="M-100 120 C 220 80, 480 260, 820 180 C 1140 100, 1380 320, 1560 280" />
          <path d="M-100 180 C 240 140, 500 320, 840 240 C 1160 160, 1400 380, 1560 340" />
          <path d="M-100 240 C 260 200, 520 380, 860 300 C 1180 220, 1420 440, 1560 400" />
          <path d="M-100 300 C 280 260, 540 440, 880 360 C 1200 280, 1440 500, 1560 460" />

          {/* Topographic Concentric Elevation Loop - Summit Alpha */}
          <path d="M 280 620 C 240 540, 340 460, 460 480 C 580 500, 640 600, 560 690 C 480 770, 320 700, 280 620 Z" />
          <path d="M 320 620 C 290 565, 360 510, 450 520 C 540 535, 590 605, 530 665 C 470 720, 350 675, 320 620 Z" />
          <path d="M 360 620 C 340 585, 390 550, 450 555 C 505 565, 540 610, 500 645 C 460 680, 380 650, 360 620 Z" />
          <path d="M 400 620 C 390 600, 420 580, 450 585 C 480 590, 495 615, 475 630 C 455 645, 410 635, 400 620 Z" />

          {/* Topographic Basin & Ridges - South East Area */}
          <path d="M 780 880 C 880 720, 1080 700, 1260 760 C 1380 800, 1480 750, 1560 710" />
          <path d="M 740 920 C 850 770, 1060 750, 1240 810 C 1360 850, 1460 800, 1560 760" />
          <path d="M 700 960 C 820 820, 1040 800, 1220 860 C 1340 900, 1440 850, 1560 810" />

          {/* High Elevation Loop - North East Spur */}
          <path d="M 1020 180 C 960 120, 1040 40, 1180 50 C 1300 60, 1380 140, 1310 220 C 1240 290, 1070 240, 1020 180 Z" />
          <path d="M 1060 175 C 1020 135, 1080 75, 1180 85 C 1265 95, 1320 150, 1270 205 C 1215 255, 1095 215, 1060 175 Z" />
        </g>
      </svg>
    </div>
  );
}
