import api from "./api";

const UserService = {
    authenticatedUser: () => {
        return api.get('user/authenticated')
    }
}

export default UserService;