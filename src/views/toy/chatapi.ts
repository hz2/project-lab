// import { Configuration, OpenAIApi } from "openai";
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY || openai_api_key,
// });
// const openai = new OpenAIApi(configuration);

// console.log("configuration", configuration);

// export default async function (prompt: any) {
//   //   if (!configuration.apiKey) {
//   //     res.status(500).json({
//   //       error: {
//   //         message:
//   //           "OpenAI API key not configured, please follow instructions in README.md",
//   //       },
//   //     });
//   //     return;
//   //   }

//   //   const animal = req.body.animal || "";
//   //   if (animal.trim().length === 0) {
//   //     res.status(400).json({
//   //       error: {
//   //         message: "Please enter a valid animal",
//   //       },
//   //     });
//   //     return;
//   //   }

//   try {
//     const completion = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: prompt ||
//         'I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "Unknown".\n\nQ: What is human life expectancy in the United States?\nA: Human life expectancy in the United States is 78 years.\n\nQ: Who was president of the United States in 1955?\nA: Dwight D. Eisenhower was president of the United States in 1955.\n\nQ: Which party did he belong to?\nA: He belonged to the Republican Party.\n\nQ: What is the square root of banana?\nA: Unknown\n\nQ: How does a telescope work?\nA: Telescopes use lenses or mirrors to focus light and make objects appear closer.\n\nQ: Where were the 1992 Olympics held?\nA: The 1992 Olympics were held in Barcelona, Spain.\n\nQ: How many squigs are in a bonk?\nA: Unknown\n\nQ: Where is the Valley of Kings?\nA:',
//       temperature: 0,
//       max_tokens: 100,
//       top_p: 1,
//       frequency_penalty: 0.0,
//       presence_penalty: 0.0,
//       stop: ["\n"],
//     });

//     return completion.data.choices[0].text;

//     // res.status(200).json({ result: completion.data.choices[0].text });
//   } catch (error: any) {
//     // Consider adjusting the error handling logic for your use case
//     if (error.response) {
//       console.error(error.response.status, error.response.data);
//       //   res.status(error.response.status).json(error.response.data);
//     } else {
//       console.error(`Error with OpenAI API request: ${error.message}`);
//       //   res.status(500).json({
//       //     error: {
//       //       message: "An error occurred during your request.",
//       //     },
//       //   });
//     }
//   }
// }
const DEFAULT_PARAMS = {
  "model": "text-davinci-003",
  "temperature": 0.7,
  "max_tokens": 256,
  "top_p": 1,
  "frequency_penalty": 0,
  "presence_penalty": 0,
};

export async function query(params = {}) {
  const params_ = { ...DEFAULT_PARAMS, ...params };
  const requestOptions = {
    method: "POST",
    // mode: "cors" as RequestMode,
    body: JSON.stringify(params_),
    // headers: {
    //   "Content-Type": "application/json",
    // },
  };
  const response = await fetch(
    // "https://respok.com/chat",
    // "https://app.p0t.top/openai/v1/completions",
    "https://app.hz2.workers.dev/openai/v1/completions",
    // "https://respok.com/ipinfo_io/default",
    requestOptions,
  );
  const data = await response.json();
  return data.choices[0].text;
}
