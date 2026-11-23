import {
  ChatUserIcon,
  CodeFolderIcon,
  DocumentAttachmentIcon,
  InternetIcon,
  LanguageSquareIcon,
  SecurityIcon,
} from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';

interface FaqEntry {
  /** Key under `faq.items` in the locale files. */
  id: 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'q6';
  icon: IconSvgElement;
}

export const FAQ: FaqEntry[] = [
  { id: 'q1', icon: CodeFolderIcon },
  { id: 'q2', icon: ChatUserIcon },
  { id: 'q3', icon: InternetIcon },
  { id: 'q4', icon: SecurityIcon },
  { id: 'q5', icon: DocumentAttachmentIcon },
  { id: 'q6', icon: LanguageSquareIcon },
];
