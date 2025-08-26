'use server';
/**
 * @fileOverview Generates Next.js code snippets from a wireframe image.
 *
 * - generateCode - A function that generates code snippets from a wireframe.
 * - GenerateCodeInput - The input type for the generateCode function.
 * - GenerateCodeOutput - The return type for the generateCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCodeInputSchema = z.object({
  wireframeDataUri: z
    .string()
    .describe(
      "A wireframe image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().describe('A description of the UI components in the wireframe.'),
});
export type GenerateCodeInput = z.infer<typeof GenerateCodeInputSchema>;

const GenerateCodeOutputSchema = z.object({
  codeSnippet: z.string().describe('The generated Next.js code snippet.'),
});
export type GenerateCodeOutput = z.infer<typeof GenerateCodeOutputSchema>;

export async function generateCode(input: GenerateCodeInput): Promise<GenerateCodeOutput> {
  return generateCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodePrompt',
  input: {schema: GenerateCodeInputSchema},
  output: {schema: GenerateCodeOutputSchema},
  prompt: `You are an expert Next.js developer who specializes in generating code from wireframes.

You will use the wireframe and description to generate a Next.js code snippet for the described UI components. The code should be well-formatted and ready to be copy-pasted into a Next.js project.

Description: {{{description}}}
Wireframe: {{media url=wireframeDataUri}}

Make sure that the code uses the correct UI styles such as the vivid purple (#9F5DE2) as primary color, light lavender (#F5F0FF) as background color, bright teal (#5DE2D2) as accent color, and Inter font.
`,
});

const generateCodeFlow = ai.defineFlow(
  {
    name: 'generateCodeFlow',
    inputSchema: GenerateCodeInputSchema,
    outputSchema: GenerateCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
