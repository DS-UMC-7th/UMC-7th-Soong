export class CreateMissionDTO {
  constructor({ title, description, reward }) {
    this.title = title;
    this.description = description;
    this.reward = reward;
  }

  static validate(missionData) {
    const { title, description, reward } = missionData;

    if (!title || typeof title !== 'string') {
      throw new Error("Invalid or missing 'title' field");
    }

    if (description && typeof description !== 'string') {
      throw new Error("Invalid 'description' field");
    }

    if (typeof reward !== 'number' || reward < 0) {
      throw new Error("Invalid 'reward' field: must be a non-negative number");
    }

    return new CreateMissionDTO(missionData);
  }
}
