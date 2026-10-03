#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/25078b1341cb8ea49ef35ce2c8cceb524cd89c4c01967926eddd82a2d4d007ef/contract';
import endContract from '../../snapshots/25078b1341cb8ea49ef35ce2c8cceb524cd89c4c01967926eddd82a2d4d007ef/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'AppSetting',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('key', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('value', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['key'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'ChatLog',
        columns: [
          col('audioUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('isHint', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('materialId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('message', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('questionId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('sender', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('sessionId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('studentId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('toolCalled', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('usedModel', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'ExerciseSession',
        columns: [
          col('attemptNo', 'int4', {
            notNull: true,
            default: lit(1),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('completedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('llmContext', 'json', { codecRef: { codecId: 'pg/json@1' } }),
          col('materialId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('startedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('status', 'text', {
            notNull: true,
            default: lit('IN_PROGRESS'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('studentId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('totalScore', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Material',
        columns: [
          col('content', 'json', { notNull: true, codecRef: { codecId: 'pg/json@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('difficulty', 'int4', {
            notNull: true,
            default: lit(1),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('materialLlmContext', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('order', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('subTopicId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'MaterialProgress',
        columns: [
          col('completedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('materialId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('startedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('IN_PROGRESS'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('studentId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('totalScore', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Question',
        columns: [
          col('answers', 'json', { codecRef: { codecId: 'pg/json@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('evaluationParameters', 'json', { codecRef: { codecId: 'pg/json@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('learningObjective', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('materialId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('questionLlmContext', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('questionUi', 'json', { codecRef: { codecId: 'pg/json@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'QuestionProgress',
        columns: [
          col('attemptCount', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('completedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('hintsUsed', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('isPassed', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('masteryScore', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('needsTeacherIntervention', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('questionId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('startedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('studentId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('teacherFeedback', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'SessionQuestionResult',
        columns: [
          col('attemptCount', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('completedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('feedback', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('hintsUsed', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('isPassed', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('masteryScore', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('questionId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('sessionId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'SubTopic',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('order', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('thumbnail', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('topicId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Topic',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('order', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('thumbnail', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'User',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('grade', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('isAdmin', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('levelMaterialId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('levelSetAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('levelSetBy', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('password', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('username', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'ExerciseSession',
        constraint: 'ExerciseSession_studentId_materialId_attemptNo_key',
        columns: ['studentId', 'materialId', 'attemptNo'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'MaterialProgress',
        constraint: 'MaterialProgress_studentId_materialId_key',
        columns: ['studentId', 'materialId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'QuestionProgress',
        constraint: 'QuestionProgress_studentId_questionId_key',
        columns: ['studentId', 'questionId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'SessionQuestionResult',
        constraint: 'SessionQuestionResult_sessionId_questionId_key',
        columns: ['sessionId', 'questionId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'SubTopic',
        constraint: 'SubTopic_slug_key',
        columns: ['slug'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Topic',
        constraint: 'Topic_slug_key',
        columns: ['slug'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'User',
        constraint: 'User_username_key',
        columns: ['username'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ChatLog',
        index: 'ChatLog_materialId_idx_e0f85a6d',
        columns: ['materialId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ChatLog',
        index: 'ChatLog_questionId_idx_fdb42076',
        columns: ['questionId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ChatLog',
        index: 'ChatLog_sessionId_idx_29f415d4',
        columns: ['sessionId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ChatLog',
        index: 'ChatLog_sessionId_questionId_sender_idx_03c45b8d',
        columns: ['sessionId', 'questionId', 'sender'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ChatLog',
        index: 'ChatLog_studentId_idx_bf255322',
        columns: ['studentId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ChatLog',
        index: 'ChatLog_usedModel_idx_a7373e82',
        columns: ['usedModel'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ExerciseSession',
        index: 'ExerciseSession_materialId_idx_e0f85a6d',
        columns: ['materialId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ExerciseSession',
        index: 'ExerciseSession_studentId_idx_bf255322',
        columns: ['studentId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ExerciseSession',
        index: 'ExerciseSession_studentId_materialId_status_idx_08dfa1e2',
        columns: ['studentId', 'materialId', 'status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Material',
        index: 'Material_subTopicId_idx_627371a0',
        columns: ['subTopicId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'MaterialProgress',
        index: 'MaterialProgress_materialId_idx_e0f85a6d',
        columns: ['materialId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'MaterialProgress',
        index: 'MaterialProgress_studentId_idx_bf255322',
        columns: ['studentId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Question',
        index: 'Question_materialId_idx_e0f85a6d',
        columns: ['materialId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'QuestionProgress',
        index: 'QuestionProgress_questionId_idx_fdb42076',
        columns: ['questionId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'QuestionProgress',
        index: 'QuestionProgress_studentId_idx_bf255322',
        columns: ['studentId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'SessionQuestionResult',
        index: 'SessionQuestionResult_questionId_idx_fdb42076',
        columns: ['questionId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'SessionQuestionResult',
        index: 'SessionQuestionResult_sessionId_idx_29f415d4',
        columns: ['sessionId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'SubTopic',
        index: 'SubTopic_topicId_idx_6f05808f',
        columns: ['topicId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ChatLog',
        foreignKey: {
          name: 'ChatLog_studentId_fkey',
          columns: ['studentId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ChatLog',
        foreignKey: {
          name: 'ChatLog_materialId_fkey',
          columns: ['materialId'],
          references: { schema: 'public', table: 'Material', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ChatLog',
        foreignKey: {
          name: 'ChatLog_questionId_fkey',
          columns: ['questionId'],
          references: { schema: 'public', table: 'Question', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ChatLog',
        foreignKey: {
          name: 'ChatLog_sessionId_fkey',
          columns: ['sessionId'],
          references: { schema: 'public', table: 'ExerciseSession', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ExerciseSession',
        foreignKey: {
          name: 'ExerciseSession_studentId_fkey',
          columns: ['studentId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ExerciseSession',
        foreignKey: {
          name: 'ExerciseSession_materialId_fkey',
          columns: ['materialId'],
          references: { schema: 'public', table: 'Material', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Material',
        foreignKey: {
          name: 'Material_subTopicId_fkey',
          columns: ['subTopicId'],
          references: { schema: 'public', table: 'SubTopic', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'MaterialProgress',
        foreignKey: {
          name: 'MaterialProgress_studentId_fkey',
          columns: ['studentId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'MaterialProgress',
        foreignKey: {
          name: 'MaterialProgress_materialId_fkey',
          columns: ['materialId'],
          references: { schema: 'public', table: 'Material', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Question',
        foreignKey: {
          name: 'Question_materialId_fkey',
          columns: ['materialId'],
          references: { schema: 'public', table: 'Material', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'QuestionProgress',
        foreignKey: {
          name: 'QuestionProgress_studentId_fkey',
          columns: ['studentId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'QuestionProgress',
        foreignKey: {
          name: 'QuestionProgress_questionId_fkey',
          columns: ['questionId'],
          references: { schema: 'public', table: 'Question', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'SessionQuestionResult',
        foreignKey: {
          name: 'SessionQuestionResult_sessionId_fkey',
          columns: ['sessionId'],
          references: { schema: 'public', table: 'ExerciseSession', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'SessionQuestionResult',
        foreignKey: {
          name: 'SessionQuestionResult_questionId_fkey',
          columns: ['questionId'],
          references: { schema: 'public', table: 'Question', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'SubTopic',
        foreignKey: {
          name: 'SubTopic_topicId_fkey',
          columns: ['topicId'],
          references: { schema: 'public', table: 'Topic', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
