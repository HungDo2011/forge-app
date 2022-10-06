export const testUserName = (value) => {
    return 6 < value.split('').length < 20;
};

export const testEmail = (value) => {
    // eslint-disable-next-line
    const regexEmail = /^[a-z][a-z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm;

    return regexEmail.test(value) || value.length === 0;
};

export function testPassword(password) {
    return (6 <= password.length && password.length) || password.length === 0;
}

export function verifyPassword(password, comparePassword) {
    return password === comparePassword;
}
