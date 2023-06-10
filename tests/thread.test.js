const tap = require('tap');
const build = require('../index.js');

tap.test('Threads related tests', async t => {
    let app, token;

    t.plan(15);

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
        t.same(Object.keys(res.json()), ['id', 'title', 'text', 'movie_name', 'user_id', 'is_review', 'comments']);
    });

    t.test('POST /threads/movie/name test error 400', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/threads/movie/Fargo',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        
        t.equal(res.statusCode, 400);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'error', 'message']);
    });

    t.test('POST /threads/movie/name test error 401', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/threads/movie/Fargo',
            payload: {
                title: 'wqe',
                text: 'jhsajdk kashdj',
                is_review: false
            }
        });
        
        t.equal(res.statusCode, 401);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'code', 'error', 'message']);
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

    t.test('POST /threads/:id/comment test error 400', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/threads/1/comment',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        
        t.equal(res.statusCode, 400);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'error', 'message']);
    });

    t.test('POST /threads/:id/comment test error 401', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/threads/1/comment',
            payload: {
                text: 'jhsajdk kashdj'
            }
        });
        
        t.equal(res.statusCode, 401);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'code', 'error', 'message']);
    });

    t.test('DELETE /threads/:id/comments test', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/threads/6/comment',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 204);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'title', 'text', 'movie_name', 'user_id', 'is_review', 'comments']);
    });

    t.test('DELETE /threads/comments/:id test error 401', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/threads/1/comment'
        });

        t.equal(res.statusCode, 401);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'code', 'error', 'message']);
    });

    t.test('DELETE /threads/comments/:id test error 403', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/threads/1/comment',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 403);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['message']);
    });

    t.test('DELETE /threads/:id test', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/threads/4',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 204);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['message']);
    });

    t.test('DELETE /threads/:id test error 401', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/threads/2'
        });

        t.equal(res.statusCode, 401);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['statusCode', 'code', 'error', 'message']);
    });

    t.test('DELETE /threads/:id test error 403', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/threads/2',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 403);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['message']);
    });
});
