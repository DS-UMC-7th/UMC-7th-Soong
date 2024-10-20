export class CreateStoreDTO {
  constructor({ name, location, description }) {
    this.name = name;
    this.location = location;
    this.description = description;
  }

  static validate(storeData) {
    const { name, location, description } = storeData;

    if (!name || typeof name !== 'string') {
      throw new Error("Invalid or missing 'name' field");
    }

    if (!location || typeof location !== 'string') {
      throw new Error("Invalid or missing 'location' field");
    }

    if (description && typeof description !== 'string') {
      throw new Error("Invalid 'description' field");
    }

    return new CreateStoreDTO(storeData);
  }
}
