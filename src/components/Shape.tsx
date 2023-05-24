import { ProjectItem } from "../types"

export const Shape = (props: ProjectItem) => {
  switch(props.type) {
    case 'rectangle':
      return <Rectangle {...props} />
    case 'ellipse':
      return <Ellipse {...props} />
  }
}

const Rectangle = ({ x, y, width, height, color, rotation }: ProjectItem) => {
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

const Ellipse = ({ x, y, width, height, color, rotation }: ProjectItem) => {
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
