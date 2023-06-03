const tap = require('tap');
const build = require('../index.js');

tap.test('tests1: ', async t => {
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

    t.test('GET /rate test', async t => {
        const res = await app.inject({
            method: 'GET',
            url: '/rate'
        });

        t.equal(res.statusCode, 200);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()[0]), ['movie_id', 'user_id', 'score']);
    });

    t.test('POST /rate/:id test', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/rate/1',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            payload: {
                score: 7
            }
        });

        t.equal(res.statusCode, 201);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['movie_id', 'user_id', 'score']);
    });

    t.test('DELETE /rate/:id test', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/rate/1',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 204);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['message']);
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
});
