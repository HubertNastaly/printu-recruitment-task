const PIVOT_RADIUS = 2
const LABEL_OFFSET = 4

interface Props {
  x: number
  y: number
  rotation: number
  color: string
}

export const Pivot = ({ x, y, color, rotation }: Props) => {
  return (
    <>
      <ellipse className="pivot" cx={x} cy={y} rx={PIVOT_RADIUS} ry={PIVOT_RADIUS} fill={color} />
      <text className="pivotLabel" x={x + LABEL_OFFSET} y={y + LABEL_OFFSET} fill={color}>{rotation}°</text>
    </>
  )
}
