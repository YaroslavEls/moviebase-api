const tap = require('tap');
const build = require('../index.js');

tap.test('Users related tests', async t => {
    let app, token;

    t.plan(12);

    t.before(async () => {
        app = await build(false);

        const login = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                name: 'Marcus', 
                password: 'zxc000'
            }
        });
        token = login.json().token;
    });

    t.teardown(async () => {
        await app.close();
    });

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

    t.test('POST /users/follow/:id test', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/users/follow/1',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 201);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'name', 'email', 'password', 'role', 'compilations', 'followers', 'followings']);
    });

    t.test('POST /users/follow/:id test error 401', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/users/follow/1'
        });

        t.equal(res.statusCode, 401);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'code', 'error', 'message']);
    });

    t.test('DELETE /users/:id test', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/users/follow/1',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 204);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'name', 'email', 'password', 'role', 'compilations', 'followers', 'followings']);
    });

    t.test('DELETE /users/:id test error 401', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/users/follow/1'
        });

        t.equal(res.statusCode, 401);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'code', 'error', 'message']);
    });

    t.test('GET /users/:id/ratings test', async t => {
        const res = await app.inject({
            method: 'GET',
            url: '/users/1/ratings'
        });
        
        t.equal(res.statusCode, 200);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()[0]), ['movie_id', 'user_id', 'score', 'movie']);
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

    t.test('/registration test error 400', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/registration'
        });

        t.equal(res.statusCode, 400);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'error', 'message']);
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

    t.test('/login test error invalid username', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                name: 'asdfghh',
                password: 'zxcvbn'
            }
        });

        t.equal(res.statusCode, 400);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['message']);
    });

    t.test('/login test error invalid password', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                name: 'asdfgh',
                password: 'zxcvbnii'
            }
        });

        t.equal(res.statusCode, 400);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['message']);
    });
});
