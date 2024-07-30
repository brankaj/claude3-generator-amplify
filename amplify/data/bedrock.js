export function request(ctx) {
  const { ingredients = [] } = ctx.args;

  const prompt = `You are an expert who is familiar with OpenScenario and OpenDrive standards, and github repo scenariogeneration. You write a python code using scenariogeneration repo examples and based on the users input defined in : ${ingredients.join(
    ","
  )}.`;

  return {
    resourcePath: `/model/anthropic.claude-3-sonnet-20240229-v1:0/invoke`,
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `\n\nHuman:${prompt}\n\nAssistant:`,
              },
            ],
          },
        ],
      },
    },
  };
}

export function response(ctx) {
  return {
    body: ctx.result.body,
  };
}
