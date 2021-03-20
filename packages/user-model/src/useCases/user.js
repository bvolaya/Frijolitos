

async function createdUser(UserModel,UserData) {
    try {
        const userInstance = await UserModel.create({
          firstName: UserData.firstName,
          lastName: UserData.lastName,
          mail: UserData.mail,
          password: UserData.password,
        });

        return userInstance;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { createdUser };