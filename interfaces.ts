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

interface ISolution {
  result: number;
  operation_type: Operation;
}

interface IResult extends ISolution {
  slackUsername: string;
}

export { IRequest, IResult, ISolution, Operation };
