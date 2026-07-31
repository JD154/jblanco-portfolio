import { expect, test } from 'bun:test';
import { getLocalizedProjects } from './projects';

test('returns project content for the requested locale', () => {
  for (const lang of ['en', 'es'] as const) {
    for (const project of getLocalizedProjects(lang)) {
      expect(project.description).not.toBe('');
      expect(project.role).not.toBe('');
      expect(project.challenge).not.toBe('');
      expect(project.decision).not.toBe('');
    }
  }
});
