import { ISolution, Operation } from "../interfaces";

export const solve = (
  x: number,
  y: number,
  operation_type: Operation
): ISolution => {
  let result: number;
  // Make sure x and y are numbers

  // x =

  switch (operation_type) {
    case Operation.ADDITION:
      result = x + y;
      break;
    case Operation.SUBTRACTION:
      result = x - y;
      break;
    case Operation.MULTIPLICATION:
      result = x * y;
      break;
    default:
      console.log("Invalid operation", operation_type, x, y);
      result = 0;
  }

  return {
    result,
    operation_type,
  };
};
