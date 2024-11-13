export class CreateMissionDTO {
  constructor({ title, description, reward }) {
    this.title = title;
    this.description = description;
    this.reward = reward;
  }

  static validate(missionData) {
    const { title, description, reward } = missionData;
    if (!title || typeof title !== 'string') throw new ValidationError("Invalid or missing 'title'");
    if (description && typeof description !== 'string') throw new ValidationError("Invalid 'description'");
    if (typeof reward !== 'number' || reward < 0) throw new ValidationError("Invalid 'reward'");
    return new CreateMissionDTO(missionData);
  }
}
