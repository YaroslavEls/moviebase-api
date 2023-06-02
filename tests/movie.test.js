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

    t.test('GET /movies test', async t => {
        const res = await app.inject({
            method: 'GET',
            url: '/movies'
        });

        t.equal(res.statusCode, 200);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()[0]), ['id', 'name', 'description', 'year', 'genres']);
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
        t.same(Object.keys(res.json()), ['name', 'description', 'year']);
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

        t.equal(res.statusCode, 200);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['message']);
    });

    t.test('GET /genres/:id test', async t => {
        const res = await app.inject({
            method: 'GET',
            url: '/genres/1'
        });

        t.equal(res.statusCode, 200);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()[0]), ['id', 'name', 'description', 'year', 'genres']);
    });
});
