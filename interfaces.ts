enum Operation {
  ADDITION = "addition",
  SUBTRACTION = "subtraction",
  MULTIPLICATION = "multiplication",
}

interface IRequest {
  operation_type: Operation;
  x: number;
  y: number;
}
interface IResult {
  slackUsername: string;
  result: number;
  operation_type: Operation;
}

export { IRequest, IResult, Operation };
