'use server';

/**
 * @fileOverview An AI agent that provides feedback on design mockups.
 *
 * - provideDesignFeedback - A function that handles the design feedback process.
 * - ProvideDesignFeedbackInput - The input type for the provideDesignFeedback function.
 * - ProvideDesignFeedbackOutput - The return type for the provideDesignFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideDesignFeedbackInputSchema = z.object({
  designDataUri: z
    .string()
    .describe(
      "A design mockup, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ProvideDesignFeedbackInput = z.infer<typeof ProvideDesignFeedbackInputSchema>;

const ProvideDesignFeedbackOutputSchema = z.object({
  feedback: z.string().describe('The design feedback.'),
});
export type ProvideDesignFeedbackOutput = z.infer<typeof ProvideDesignFeedbackOutputSchema>;

export async function provideDesignFeedback(input: ProvideDesignFeedbackInput): Promise<ProvideDesignFeedbackOutput> {
  return provideDesignFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideDesignFeedbackPrompt',
  input: {schema: ProvideDesignFeedbackInputSchema},
  output: {schema: ProvideDesignFeedbackOutputSchema},
  prompt: `You are a design expert, and will provide feedback on a design mockup. Focus on typography, color palettes and layout, and provide best practices. Use the following as the primary source of information about the design.

Design: {{media url=designDataUri}}`,
});

const provideDesignFeedbackFlow = ai.defineFlow(
  {
    name: 'provideDesignFeedbackFlow',
    inputSchema: ProvideDesignFeedbackInputSchema,
    outputSchema: ProvideDesignFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
