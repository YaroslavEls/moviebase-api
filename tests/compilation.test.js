const tap = require('tap');
const build = require('../index.js');

tap.test('tests1: ', async t => {
    t.plan(7);
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

    t.test('GET /compilations test', async t => {
        const res = await app.inject({
            method: 'GET',
            url: '/compilations'
        });

        t.equal(res.statusCode, 200);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()[0]), ['id', 'title', 'desc', 'user_id', 'movies']);
    });

    t.test('POST /compilations test', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/compilations',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            payload: {
                title: 'qwe'
            }
        });

        t.equal(res.statusCode, 201);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'title', 'user_id']);
    });

    t.test('GET /compilations/:id test', async t => {
        const res = await app.inject({
            method: 'GET',
            url: '/compilations/1'
        });
        
        t.equal(res.statusCode, 200);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'title', 'desc', 'user_id', 'movies']);
    });

    t.test('PUT /compilations/:id test', async t => {
        const res = await app.inject({
            method: 'PUT',
            url: '/compilations/4',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            payload: {
                desc: 'This one was updated'
            }
        });

        t.equal(res.statusCode, 204);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['message']);
    });

    t.test('POST /compilations/:comp_id/:movie_id test', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/compilations/4/1',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 200);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'title', 'desc', 'user_id']);
    });

    t.test('DELETE /compilations/:comp_id/:movie_id test', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/compilations/4/1',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 200);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'title', 'desc', 'user_id']);
    });

    t.test('DELETE /compilations/:id test', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/compilations/4',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 204);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['message']);
    });
});
