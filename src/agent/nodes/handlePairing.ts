import { RunInput } from '../state';
import { loadPrompt } from '../../utils/prompts';
import { z } from 'zod';
import { getNanoLLM } from '../../utils/llm';

/**
 * Suggests complementary pairing tags; outputs text reply_type.
 */

export async function handlePairingNode(state: { input: RunInput; messages?: unknown[]; intent?: string }): Promise<{ replies: Array<{ reply_type: 'text'; reply_text: string }> }>{
  const llm = getNanoLLM();
  const { input } = state;
  const messages = (state.messages as unknown[]) || [];
  const question = input.text || 'How to pair items?';
  const intent: string | undefined = state.intent;
  const systemPrompt = loadPrompt('handle_pairing.txt');
  const prompt: Array<{ role: 'system' | 'user'; content: string }> = [
    { role: 'system', content: systemPrompt },
    { role: 'system', content: `UserGender: ${input.gender ?? 'unknown'} (choose examples and fits appropriate to gender).` },
    { role: 'system', content: `Intent: ${intent || 'pairing'}` },
    { role: 'system', content: `Conversation: ${JSON.stringify(messages)}` },
    { role: 'user', content: question },
  ];
  const Schema = z.object({ reply_text: z.string(), followup_text: z.string().nullable() });
  console.log('🧩 [PAIRING:INPUT]', { userText: question, lastTurns: messages.slice(-4) });
  const resp = await llm.withStructuredOutput(Schema).invoke(prompt);
  console.log('🧩 [PAIRING:OUTPUT]', resp);
  const replies: Array<{ reply_type: 'text'; reply_text: string }> = [{ reply_type: 'text', reply_text: resp.reply_text }];
  if (resp.followup_text) replies.push({ reply_type: 'text', reply_text: resp.followup_text });
  return { replies };
}
