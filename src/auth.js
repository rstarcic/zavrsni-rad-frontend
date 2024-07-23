export function hasRole(role) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user && user.role === role;
}

export function hasRoleAndType(role, type) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user && user.role === role && user.type === type;
}
