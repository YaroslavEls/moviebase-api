const tap = require('tap');
const build = require('../index.js');

tap.test('Genres related tests', async t => {
    let app, token;

    t.plan(7);

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

    t.test('GET /genres test', async t => {
        const res = await app.inject({
            method: 'GET',
            url: '/genres'
        });

        t.equal(res.statusCode, 200);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()[0]), ['id', 'name']);
    });

    t.test('POST /genres test', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/genres',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            payload: {
                name: 'qwe'
            }
        });

        t.equal(res.statusCode, 201);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['name']);
    });

    t.test('POST /genres test error 400', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/genres',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 400);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'error', 'message']);
    });

    t.test('POST /genres test error 401', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/genres',
            payload: {
                name: 'iojmnk'
            }
        });

        t.equal(res.statusCode, 401);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'code', 'error', 'message']);
    });

    t.test('GET /genres/:id test', async t => {
        const res = await app.inject({
            method: 'GET',
            url: '/genres/1'
        });

        t.equal(res.statusCode, 200);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'name', 'movies']);
    });

    t.test('DELETE /genres/:id test', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/genres/1',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 204);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['message']);
    });

    t.test('DELETE /genres/:id test error 401', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/genres/1'
        });

        t.equal(res.statusCode, 401);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'code', 'error', 'message']);
    });
});
