const { test } = require('tap');
const build = require('../index.js');

test('tests: ', async t => {
    t.plan(3)
    const app = await build(false);
    t.teardown(() => app.close())

    
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
        // t.same(res.json(), { hello: 'world' })
    });

    t.test('GET /movies/:name test', async t => {
        const res = await app.inject({
            method: 'GET',
            url: '/movies/Fargo'
        });
        
        t.equal(res.statusCode, 200);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
    });

    t.test('POST /movies test', async t => {
        const res = await app.inject({
            method: 'POST',
            url: '/movies',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: {
                name: 'qwe', 
                description: 'sad', 
                year: 2001
            }
        });

        t.equal(res.statusCode, 201);
        t.equal(res.headers['content-type'], 'application/json; charset=utf-8');
    });
});