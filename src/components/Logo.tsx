interface CognitarProps {
  height: string;
  width: string;
}

export default function Cognitar({ height, width }: CognitarProps) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 1080 1080"
      >
        <desc>Created with Fabric.js 5.2.4</desc>
        <defs></defs>
        <g
          transform="matrix(1 0 0 1 540 540)"
          id="33bc5c55-8aa7-48f0-a111-998461e3c864"
        >
          <rect
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(255,255,255)",
              fillRule: "nonzero",
              opacity: 1,
              visibility: "hidden",
            }}
            vectorEffect="non-scaling-stroke"
            x="-540"
            y="-540"
            rx="0"
            ry="0"
            width="1080"
            height="1080"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 540 540)"
          id="fa2e5491-dc5d-46b9-8dde-d798dd71f237"
        ></g>
        <g
          transform="matrix(-13.99 0 0 -13.99 540 540)"
          id="12f327d4-ba68-4a88-83de-f74e7684eaf1"
        >
          <polygon
            style={{
              stroke: "rgb(0,0,0)",
              strokeWidth: 0,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(50,76,194)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            points="-37.43,32.41 0,-32.41 37.43,32.41"
          />
        </g>
      </svg>
    </div>
  );
}
