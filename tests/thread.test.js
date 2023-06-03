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

    // fix this
    t.test('POST /threads/movie/name test', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/threads/movie/Fargo',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            payload: {
                title: 'wqe',
                text: 'jhsajdk kashdj',
                is_review: false
            }
        });
        
        t.equal(res.statusCode, 201);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        // t.same(Object.keys(res.json()), ['id', 'title', 'text', 'movie_name', 'user_id', 'is_review', 'comments']);
        t.same(Object.keys(res.json()), ['id', 'title', 'text', 'movie_name', 'user_id', 'is_review']);
    });

    t.test('GET /threads test', async t => {
        const res = await app.inject({
            method: 'GET',
            url: '/threads'
        });

        t.equal(res.statusCode, 200);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()[0]), ['id', 'title', 'text', 'movie_name', 'user_id', 'is_review', 'comments']);
    });

    t.test('GET /threads/:id test', async t => {
        const res = await app.inject({
            method: 'GET',
            url: '/threads/1'
        });

        t.equal(res.statusCode, 200);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'title', 'text', 'movie_name', 'user_id', 'is_review', 'comments']);
    });

    t.test('GET /threads/movie/:name test', async t => {
        const res = await app.inject({
            method: 'GET',
            url: '/threads/movie/Fargo'
        });

        t.equal(res.statusCode, 200);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()[0]), ['id', 'title', 'text', 'movie_name', 'user_id', 'is_review', 'comments']);
    });

    t.test('POST /threads/:id/comment test', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/threads/1/comment',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            payload: {
                text: 'jhsajdk kashdj'
            }
        });
        
        t.equal(res.statusCode, 201);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'title', 'text', 'movie_name', 'user_id', 'is_review', 'comments']);
    });

    t.test('DELETE /threads/comments/:id test', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/threads/1/comment',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 204);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'title', 'text', 'movie_name', 'user_id', 'is_review', 'comments']);
    });

    t.test('DELETE /threads/:id test', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/threads/1',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 204);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['message']);
    });
});
