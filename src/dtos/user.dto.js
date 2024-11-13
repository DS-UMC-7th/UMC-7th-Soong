export const bodyToUser = (body) => ({
  email: body.email,
  name: body.name,
  gender: body.gender,
  birth: new Date(body.birth),
  address: body.address || "",
  detailAddress: body.detailAddress || "",
  phoneNumber: body.phoneNumber,
  preferences: body.preferences,
});
