import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate
} from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import {
  StructuredOutputParser,
  OutputFixingParser,
} from "langchain/output_parsers";
import { z } from "zod";

const llm = new OpenAI({
  openAIApiKey: process.env.REACT_APP_CHATGPT_API_KEY,
  // temperature: 0
});


const template = "You are a helpful gym assistant who provides custom gym workout routine from persons preference.";
const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(template);
const humanTemplate = "create a workout reoutine with reference of age: {age}, gender: {gender}, weight: {weight}, height: {height}, workout goal: {goal}, daily time spent in gym: {gymTime}, primary muscle to target during workout: {targetMuscle}, workout routine should be in a format of monday to saterday days in a week, with each day what exercise to perform in gym time. exercise in a format of first exercise name then no of raps x repetation.";
const humanMessagePrompt = HumanMessagePromptTemplate.fromTemplate(humanTemplate);

const chatPrompt = ChatPromptTemplate.fromPromptMessages([systemMessagePrompt, humanMessagePrompt]);


async function fetchWorkoutPlan(data) {
  
  const outputParser = StructuredOutputParser.fromZodSchema(
    z.array(
        z.object({
            day: z.string().describe("day of the week"),
            workoutplan: z.array(
              z.object({
                exercise: z.string().describe("name of the exercise to perform"),
                raps: z.string().describe("No. of raps to perform of exersize and repetations")
              })
            ).describe("an Array of objects each containing exercises to perform in raps"),
        })
      )
      .describe("An array of Airtable records, each representing a workout plan for day of a week")
  );

  const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.REACT_APP_CHATGPT_API_KEY,
    modelName: "gpt-3.5-turbo", // Or gpt-3.5-turbo
    temperature: 0, // For best results with the output fixing parser
  });
  
  const outputFixingParser = OutputFixingParser.fromLLM(chatModel, outputParser);

  const prompt = new PromptTemplate({
    template: `create a workout reoutine with reference of age: {age}, gender: {gender}, weight: {weight}, height: {height}, workout goal: {goal}, daily time spent in gym: {gymTime}, primary muscle to target during workout: {targetMuscle}, workout routine should be in a format of monday to saterday days in a week, with each day what exercise to perform in gym time. exercise in a format of first exercise name then no of raps x repetation.`,
    inputVariables: Object.keys(data),
    partialVariables: {
      format_instructions: outputFixingParser.getFormatInstructions(),
    },
  });


  const chain = new LLMChain({
    llm,
    prompt: prompt,
    outputKey: "records",
    outputParser: outputFixingParser,
  });

  try {

    let input_value = {
      ...data,
      targetMuscle: data.targetMuscle,
    };

      // const formattedPrompt = await chatPrompt.formatMessages(input_value);

    let res = await chain.call(input_value);
    return res;
  } catch (error) {
    return false;
  }
}

export default fetchWorkoutPlan;
