import { ProjectItem } from "../schemas/projectItem"

type Props = ProjectItem

export const Shape = ({ type, ...commonProps }: Props) => {
  switch(type) {
    case 'rectangle':
      return <Rectangle {...commonProps} />
    case 'ellipse':
      return <Ellipse {...commonProps} />
  }
}

type CommonProps = Omit<Props, 'type'>

const Rectangle = ({ x, y, width, height, color, rotation }: CommonProps) => {
  const topY = y - height / 2
  const leftX = x - width / 2

  return (
    <rect
      x={leftX}
      y={topY}
      width={width}
      height={height}
      fill={color}
      transform={rotate(rotation, x, y)}
    />
  )
}

const Ellipse = ({ x, y, width, height, color, rotation }: CommonProps) => {
  return (
    <ellipse
      cx={x}
      cy={y}
      rx={width / 2}
      ry={height / 2}
      fill={color}
      transform={rotate(rotation, x, y)}
    />
  )
}

const rotate = (degrees: number, pivotX: number, pivotY: number) => `rotate(${degrees}, ${pivotX}, ${pivotY})`
