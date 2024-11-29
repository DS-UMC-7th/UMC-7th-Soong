import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res) => {
  const userData = bodyToUser(req.body);
  
  try {
    let userResponse; 

    const existingUser = await prisma.user.findUnique({ where: { email: userData.email } });
    
    if (existingUser) { 
      userResponse = await prisma.user.update({
        where: { email: userData.email },
        data: {
          name: userData.name,
          gender: userData.gender,
          birthdate: userData.birthdate,
          address: userData.address,
          spec_address: userData.spec_address,
          phonenumber: userData.phonenumber,
        }
      });
    } else { 
      userResponse = await userSignUp(userData);
    }

    return res.status(StatusCodes.CREATED).success(userResponse);
  } catch (error) {
    next(error);
  }
};


export const handleUpdateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { name, gender, birthdate, address, spec_address, phonenumber } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        name,
        gender,
        birthdate: birthdate ? new Date(birthdate) : undefined,
        address,
        spec_address,
        phonenumber,
      },
    });

    return res.status(StatusCodes.OK).success(updatedUser);
  } catch (error) {
    next(error);
  }
};
