import test from 'node:test';
import assert from 'node:assert/strict';
import { createToastQueue } from '../src/features/notifications/model.ts';

test('a repeated operation updates one notice and refreshes its expiry revision', () => {
  const queue = createToastQueue();
  queue.push('loading', 'Saving', { id: 'save' });
  const before = queue.getSnapshot()[0].revision;
  queue.push('success', 'Saved', { id: 'save' });
  assert.equal(queue.getSnapshot().length, 1);
  assert.equal(queue.getSnapshot()[0].kind, 'success');
  assert(queue.getSnapshot()[0].revision > before);
  assert.equal(queue.getSnapshot()[0].duration, 8000);
});
test('errors and active loading do not expire automatically; notices remain bounded', () => {
  const queue = createToastQueue();
  queue.push('error', 'Failed');
  queue.push('loading', 'Loading');
  assert(queue.getSnapshot().every(notice => notice.duration === null));
  queue.push('info', 'Info');
  queue.push('success', 'Done');
  assert.equal(queue.getSnapshot().length, 3);
});
test('Undo actions survive other notifications and dismissal only removes its target', () => {
  const queue = createToastQueue();
  let undone = false;
  const deletion = queue.push('info', 'Removed', { action: { label: 'Undo', onClick: () => { undone = true; } } });
  const saved = queue.push('success', 'Saved');
  queue.getSnapshot()[0].action.onClick();
  assert(undone);
  queue.dismiss(saved);
  assert.deepEqual(queue.getSnapshot().map(notice => notice.id), [deletion]);
  const snapshot = queue.getSnapshot();
  queue.dismiss('already-gone');
  assert.equal(queue.getSnapshot(), snapshot);
});
