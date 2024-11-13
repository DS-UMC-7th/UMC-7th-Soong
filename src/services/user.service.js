import { addUser, getUserPreferencesByUserId, setPreference, getUser } from "../repositories/user.repository.js";
import { responseFromUser } from "../dtos/user.dto.js";
import { ValidationError } from "../errors.js";

export const userSignUp = async (data) => {
  const joinUserId = await addUser(data);
  if (!joinUserId) throw new ValidationError("Email already exists");
  for (const preference of data.preferences) await setPreference(joinUserId, preference);
  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);
  return responseFromUser({ user, preferences });
};
