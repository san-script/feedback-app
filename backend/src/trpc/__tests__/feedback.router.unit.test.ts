import { describe, expect, it, vi } from 'vitest';

import { feedbackRouter } from '../feedback';

/**
 * Mock the database BEFORE importing the router
 */
vi.mock('../../db', () => {
  const mockRows = [
    {
      id: 1,
      message: 'Mock feedback',
      rating: 8,
      author: 'Tester',
      createdAt: new Date(),
    },
  ];

  return {
    db: {
      select: vi.fn(() => ({
        from: vi.fn(() => ({
          orderBy: vi.fn(() => mockRows),
        })),
      })),

      insert: vi.fn(() => ({
        values: vi.fn(() => ({
          returning: vi.fn(() => mockRows),
        })),
      })),

      update: vi.fn(() => ({
        set: vi.fn(() => ({
          where: vi.fn(() => ({
            returning: vi.fn(() => [
              {
                ...mockRows[0],
                message: 'Updated feedback',
                rating: 9,
              },
            ]),
          })),
        })),
      })),

      delete: vi.fn(() => ({
        where: vi.fn(),
      })),
    },
  };
});

const caller = feedbackRouter.createCaller({});

describe('feedbackRouter (unit tests, mocked db)', () => {
  it('creates feedback', async () => {
    const result = await caller.create({
      message: 'Mock feedback',
      rating: 8,
      author: 'Tester',
    });

    expect(result).toMatchObject({
      message: 'Mock feedback',
      rating: 8,
      author: 'Tester',
    });

    expect(result.id).toBeDefined();
  });

  it('validates input (empty message)', async () => {
    await expect(
      caller.create({
        message: '',
        rating: 5,
      }),
    ).rejects.toThrow();
  });

  it('validates input (rating out of range)', async () => {
    await expect(
      caller.create({
        message: 'Invalid rating',
        rating: 11,
      }),
    ).rejects.toThrow();
  });

  it('returns feedback list', async () => {
    const result = await caller.getAll();

    expect(result).toHaveLength(1);
    expect(result[0].message).toBe('Mock feedback');
  });

  it('updates feedback', async () => {
    const result = await caller.update({
      id: 1,
      message: 'Updated feedback',
      rating: 9,
      author: 'Tester',
    });

    expect(result).toMatchObject({
      message: 'Updated feedback',
      rating: 9,
    });
  });

  it('deletes feedback', async () => {
    const result = await caller.delete({ id: 1 });
    expect(result).toEqual({ success: true });
  });
});
