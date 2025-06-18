export async function GetUser(call, callback) {
    try {
        const user = { id: 1, name: 'proto', email: 'proto@gmail.com' };
        callback(null, {
            id: user.id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        callback(error, null);
    }
}

export async function CreateUser(call, callback) {
    try {
        const { name, email } = call.request;
        const user = { id: 1, name: name, email: email };
        callback(null, {
            id: user.id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        callback(error, null);
    }
}
