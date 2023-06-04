const tap = require('tap');
const build = require('../index.js');

tap.test('Compilations related tests', async t => {
    let app, token;

    t.plan(17);

    t.before(async () => {
        app = await build(false);

        const login = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                name: 'John', 
                password: '123abc'
            }
        });
        token = login.json().token;
    });

    t.teardown(async () => {
        await app.close();
    });

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
                title: 'qwe',
                desc: 'ieryiure'
            }
        });

        t.equal(res.statusCode, 201);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'title', 'desc', 'user_id']);
    });

    t.test('POST /compilations test error 400', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/compilations',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 400);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'error', 'message']);
    });

    t.test('POST /compilations test error 401', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/compilations',
            payload: {
                title: 'qwe',
                desc: 'ieryiure'
            }
        });

        t.equal(res.statusCode, 401);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'code', 'error', 'message']);
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

        t.equal(res.statusCode, 201);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'title', 'desc', 'user_id', 'movies']);
    });

    t.test('PUT /compilations/:id test error 401', async t => {
        const res = await app.inject({
            method: 'PUT',
            url: '/compilations/4',
            payload: {
                desc: 'This one was updated'
            }
        });

        t.equal(res.statusCode, 401);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'code', 'error', 'message']);
    });

    t.test('PUT /compilations/:id test error 403', async t => {
        const res = await app.inject({
            method: 'PUT',
            url: '/compilations/2',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            payload: {
                desc: 'This one was updated'
            }
        });

        t.equal(res.statusCode, 403);
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

        t.equal(res.statusCode, 201);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'title', 'desc', 'user_id', 'movies']);
    });

    t.test('POST /compilations/:comp_id/:movie_id test error 401', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/compilations/4/1'
        });

        t.equal(res.statusCode, 401);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'code', 'error', 'message']);
    });

    t.test('POST /compilations/:comp_id/:movie_id test error 403', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/compilations/2/1',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 403);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['message']);
    });

    t.test('DELETE /compilations/:comp_id/:movie_id test', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/compilations/4/1',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 204);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'title', 'desc', 'user_id', 'movies']);
    });

    t.test('DELETE /compilations/:comp_id/:movie_id test error 401', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/compilations/2/1'
        });

        t.equal(res.statusCode, 401);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'code', 'error', 'message']);
    });

    t.test('DELETE /compilations/:comp_id/:movie_id test error 403', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/compilations/2/1',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 403);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['message']);
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

    t.test('DELETE /compilations/:id test error 401', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/compilations/2'
        });

        t.equal(res.statusCode, 401);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'code', 'error', 'message']);
    });

    t.test('DELETE /compilations/:id test error 403', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/compilations/2',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 403);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['message']);
    });
});
