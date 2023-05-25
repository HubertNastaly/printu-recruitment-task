import { ProjectItem } from "../types"
import { toRadians } from "./toRadians"

const { sin, cos, tan, atan, PI } = Math

export function calculateEllipseBoundingBox({ x: xCenter, y: yCenter, width, height, rotation }: ProjectItem) {
  const rotationInRadians = toRadians(rotation)

  const xRadius = width / 2
  const yRadius = height / 2

  const [xMin, xMax] = calculateXExtremes(xRadius, yRadius, rotationInRadians).map(x => x + xCenter)
  const [yMin, yMax] = calculateYExtremes(xRadius, yRadius, rotationInRadians).map(y => y + yCenter)

  return { xMin, yMin, xMax, yMax }
}

function calculateXExtremes(xRadius: number, yRadius: number, rotationInRadians: number) {
  // https://en.wikipedia.org/wiki/Ellipse, look: Standard parametric representation
  // xRotated(t) = x(t) * cos(rotation) - y(t) * sin(rotation)
  // xRotated(t) = xRadius * cos(rotation) * cos(t) - yRadius * sin(rotation) * sin(t)
  const xRotated = (radians: number) => xRadius * cos(rotationInRadians) * cos(radians) - yRadius * sin(rotationInRadians) * sin(radians)

  // xRotated'(t) = -xRadius * cos(rotation) sin(t) - yRadius * sin(rotation) * cos(t)
  // xRotated'(t) = 0  =>  tg(t) = -(yRadius / xRadius) * tg(rotation)
  const basicXExtremeAngle = atan(-yRadius / xRadius * tan(rotationInRadians))

  // t = atan(...) + n * PI
  const xExtremeAngles = [basicXExtremeAngle, basicXExtremeAngle + PI]

  return xExtremeAngles.map(xRotated).sort()
}

// analogically to x extremes
function calculateYExtremes(xRadius: number, yRadius: number, rotationInRadians: number) {
  const yRotated = (radians: number) => xRadius * sin(rotationInRadians) * cos(radians) + yRadius * cos(rotationInRadians) * sin(radians)

  const basicYExtremeAngle = atan(yRadius / xRadius / tan(rotationInRadians))
  const yExtremeAngles = [basicYExtremeAngle, basicYExtremeAngle + PI]

  return yExtremeAngles.map(yRotated).sort()
}
