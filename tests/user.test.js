const tap = require('tap');
const build = require('../index.js');

tap.test('tests1: ', async t => {
    t.plan(6);
    const app = await build(false);
    t.teardown(async () => await app.close());

    const login = await app.inject({
        method: 'POST',
        url: '/login',
        payload: {
            name: 'Marcus', 
            password: 'zxc000'
        }
    });
    const token = login.json().token;

    t.test('GET /users test', async t => {
        const res = await app.inject({
            method: 'GET',
            url: '/users'
        });

        t.equal(res.statusCode, 200);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()[0]), ['id', 'name', 'email', 'password', 'role', 'compilations', 'followers', 'followings']);
    });

    t.test('GET /users/:id test', async t => {
        const res = await app.inject({
            method: 'GET',
            url: '/users/1'
        });
        
        t.equal(res.statusCode, 200);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'name', 'email', 'password', 'role', 'compilations', 'followers', 'followings']);
    });

    t.test('POST /users/:id test', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/users/1',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 200);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'name', 'email', 'password', 'role']);
    });

    t.test('DELETE /users/:id test', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/users/1',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 200);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'name', 'email', 'password', 'role']);
    });

    t.test('/registration test', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/registration',
            payload: {
                email: 'qwerty',
                name: 'asdfgh',
                password: 'zxcvbn'
            }
        });

        t.equal(res.statusCode, 201);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'name', 'email', 'password', 'role']);
    });

    t.test('/login test', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                name: 'asdfgh',
                password: 'zxcvbn'
            }
        });

        t.equal(res.statusCode, 200);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'name', 'email', 'password', 'role', 'token']);
    });
});
