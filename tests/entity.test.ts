import { Entity } from '../src/entity';

describe('Entity', () => {
  it('should parse from raw JSON and return simplified JSON', () => {
    const raw = {
      id: 123,
      name: 'Test Name',
      active: false,
      ignoredField: 'ignore this'
    };

    const entity = new Entity().fromJson(raw);
    const result = entity.toJson();

    expect(result).toEqual({
      id: 123,
      name: 'Test Name',
      active: false
    });
  });

  it('should default "active" to true if not provided', () => {
    const raw = {
      id: 123,
      name: 'Default Active'
    };

    const entity = new Entity().fromJson(raw);
    const result = entity.toJson();

    expect(result.active).toBe(true);
  });
});
