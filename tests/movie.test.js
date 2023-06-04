const tap = require('tap');
const build = require('../index.js');

tap.test('Movies related tests', async t => {
    let app, token;

    t.plan(15);

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

    t.test('GET /movies test', async t => {
        const res = await app.inject({
            method: 'GET',
            url: '/movies'
        });

        t.equal(res.statusCode, 200);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()[0]), ['id', 'name', 'description', 'year', 'genres']);
    });

    t.test('POST /movies test', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/movies',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            payload: {
                name: 'qwe', 
                description: 'sad', 
                year: 2001
            }
        });

        t.equal(res.statusCode, 201);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'name', 'description', 'year', 'genres']);
    });

    t.test('POST /movies test error 400', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/movies',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 400);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'error', 'message']);
    });

    t.test('POST /movies test error 401', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/movies',
            payload: {
                name: 'iuyiut',
                description: 'erye', 
                year: 2001
            }
        });

        t.equal(res.statusCode, 401);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'code', 'error', 'message']);
    });

    t.test('GET /movies/:name test', async t => {
        const res = await app.inject({
            method: 'GET',
            url: '/movies/Fargo'
        });
        
        t.equal(res.statusCode, 200);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'name', 'description', 'year', 'genres']);
    });

    t.test('DELETE /movies/:id test', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/movies/2',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 204);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['message']);
    });

    t.test('DELETE /movies/:id test error 401', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/movies/2'
        });

        t.equal(res.statusCode, 401);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'code', 'error', 'message']);
    });

    t.test('PUT /movies/:id test', async t => {
        const res = await app.inject({
            method: 'PUT',
            url: '/movies/1',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            payload: {
                description: 'This one was updated'
            }
        });

        t.equal(res.statusCode, 201);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'name', 'description', 'year', 'genres']);
    });

    t.test('PUT /movies/:id test error 401', async t => {
        const res = await app.inject({
            method: 'PUT',
            url: '/movies/1',
            payload: {
                description: 'This one was updated'
            }
        });

        t.equal(res.statusCode, 401);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'code', 'error', 'message']);
    });

    t.test('POST /movies/:id/rate test', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/movies/1/rate',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            payload: {
                score: 7
            }
        });

        t.equal(res.statusCode, 201);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'name', 'description', 'year', 'genres']);
    });

    t.test('POST /movies/:id/rate test update', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/movies/1/rate',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            payload: {
                score: 9
            }
        });

        t.equal(res.statusCode, 201);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'name', 'description', 'year', 'genres']);
    });

    t.test('POST /movies/:id/rate test error 400', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/movies/1/rate',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            payload: {
                score: 11
            }
        });

        t.equal(res.statusCode, 400);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'error', 'message']);
    });

    t.test('POST /movies/:id/rate test error 401', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/movies/1/rate',
            payload: {
                score: 7
            }
        });

        t.equal(res.statusCode, 401);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'code', 'error', 'message']);
    });

    t.test('DELETE /movies/:id/rate test', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/movies/1/rate',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 204);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'name', 'description', 'year', 'genres']);
    });

    t.test('DELETE /movies/:id/rate test error 401', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/movies/1/rate'
        });

        t.equal(res.statusCode, 401);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'code', 'error', 'message']);
    });
});
