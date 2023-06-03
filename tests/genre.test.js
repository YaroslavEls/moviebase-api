const tap = require('tap');
const build = require('../index.js');

tap.test(': ', async t => {
    t.plan(4);
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
});