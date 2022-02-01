class AuthService {
     SetToken(token){
        localStorage.setItem('token', token);
    }

    GetToken(){
        localStorage.getItem('token');
    }
    IsUserLoggedIn(){
        if () {
            
        }
    }
}

export default new AuthService();