import { isGuestChatAuthor } from './chat-display.constants';
import { ChatMessage } from '@showcase/models/showcase.model';

export type ChatRoleKey = 'self' | 'guest' | 'mod' | 'bot' | 'member';

export interface ChatRoleMeta {
  key: ChatRoleKey;
  icon: string;
  label: string;
}

const ROLE_META: Record<ChatRoleKey, ChatRoleMeta> = {
  self: { key: 'self', icon: '◆', label: 'You' },
  guest: { key: 'guest', icon: '◇', label: 'Anonymous' },
  mod: { key: 'mod', icon: '✦', label: 'Moderator' },
  bot: { key: 'bot', icon: '▣', label: 'Bot' },
  member: { key: 'member', icon: '●', label: 'Member' },
};

export function chatRoleFor(message: ChatMessage): ChatRoleMeta {
  if (message.self) {
    return ROLE_META.self;
  }

  const author = (message.author ?? '').trim().toLowerCase();

  if (isGuestChatAuthor(message.author)) {
    return ROLE_META.guest;
  }

  if (author.includes('mod') || author.includes('admin') || author.includes('staff')) {
    return ROLE_META.mod;
  }

  if (author.includes('bot') || author.endsWith('[bot]')) {
    return ROLE_META.bot;
  }

  return ROLE_META.member;
}
