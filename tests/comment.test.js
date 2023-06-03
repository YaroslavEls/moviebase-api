const tap = require('tap');
const build = require('../index.js');

tap.test('tests1: ', async t => {
    t.plan(2);
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

    t.test('POST /threads/:id test', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/threads/1',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            payload: {
                text: 'jhsajdk kashdj'
            }
        });
        
        t.equal(res.statusCode, 201);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['id', 'text', 'thread_id', 'user_id']);
    });

    t.test('DELETE /threads/comments/:id test', async t => {
        const res = await app.inject({
            method: 'DELETE',
            url: '/threads/comments/1',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        t.equal(res.statusCode, 200);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        t.same(Object.keys(res.json()), ['message']);
    });
});
