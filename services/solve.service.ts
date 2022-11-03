import { IResult, Operation } from "../interfaces";

export const solve = (
  x: number,
  y: number,
  operation_type: Operation
): IResult => {
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
      throw new Error("Invalid operation type");
  }

  return {
    slackUsername: "princecodes247",
    result,
    operation_type,
  };
};
