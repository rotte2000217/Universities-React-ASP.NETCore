class AuthService {
     SetToken(token){
        localStorage.setItem('token', token);
    }

    GetToken(){
        localStorage.getItem('token');
    }

    DeleteToken(token){
        localStorage.removeItem(token);
    }
    
    IsUserLoggedIn(){
        if (localStorage.getItem('token') === null) {
            return false;
        }
        return true;
    }
}

export default new AuthService();