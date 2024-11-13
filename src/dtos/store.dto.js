export class CreateStoreDTO {
  constructor({ name, location, description }) {
    this.name = name;
    this.location = location;
    this.description = description;
  }

  static validate(storeData) {
    const { name, location, description } = storeData;
    if (!name || typeof name !== 'string') throw new ValidationError("Invalid or missing 'name'");
    if (!location || typeof location !== 'string') throw new ValidationError("Invalid or missing 'location'");
    if (description && typeof description !== 'string') throw new ValidationError("Invalid 'description'");
    return new CreateStoreDTO(storeData);
  }
}
