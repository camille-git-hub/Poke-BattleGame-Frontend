const storeCredentials = (token: string, user: any) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
};

const clearCredentials = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

export { storeCredentials, clearCredentials };