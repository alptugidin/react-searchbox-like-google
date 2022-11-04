/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
const addWhite = (hex: string, whiteRatio: number): any => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const hexToRgb = result !== null
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    }
    : null;
  if (hexToRgb !== null) {
    hexToRgb.r = hexToRgb.r + whiteRatio > 255 ? 255 : hexToRgb.r + whiteRatio;
    hexToRgb.g = hexToRgb.g + whiteRatio > 255 ? 255 : hexToRgb.g + whiteRatio;
    hexToRgb.b = hexToRgb.b + whiteRatio > 255 ? 255 : hexToRgb.b + whiteRatio;
  }
  const lightDark = `
  rgb(
    ${hexToRgb?.r.toString()},
    ${hexToRgb?.b.toString()},
    ${hexToRgb?.b.toString()}
    )
  `;
  lightDark.replaceAll(/[\n ]/gi, '');
  return { lightDark };
};

export default addWhite;
