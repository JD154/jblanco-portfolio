import { expect, test } from 'bun:test';
import { getLocalizedProjects } from './projects';

test('returns project content for the requested locale', () => {
  expect(getLocalizedProjects('en')[0]?.description).toContain('reusable UI');
  expect(getLocalizedProjects('es')[0]?.description).toContain('interfaz reutilizable');
});
