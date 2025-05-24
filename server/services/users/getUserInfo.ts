import getIsUserAdmin from "./getIsUserAdmin";

const getUserInfo = async (userId: string) => {

    const isAdmin = await getIsUserAdmin(userId);
    return {
        isAdmin: isAdmin,
    }

}

export default getUserInfo;