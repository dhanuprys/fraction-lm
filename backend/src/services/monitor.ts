import { EventEmitter } from 'node:events';

export const monitorEmitter = new EventEmitter();

// Typical events we might want to broadcast:
// - student_activity: e.g. student started a session, answered a question, etc.
// - alarm: the AI tool called request_teacher_intervention
