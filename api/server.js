require('dotenv').config()

const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors');

const { getCount, getIncreasedCount } = require('./counter')
const config = require('./config')

const app = new Koa()

app.use(async (ctx, next) => {
    try {
        await next()
        ctx.status = ctx.status || 404
        if (ctx.status === 404) {
            ctx.throw(404)
        }
    } catch (e) {
        ctx.status = e.status || 500
        if (ctx.status === 404) {
            ctx.body = {
                status: 'NG',
                msg: 'Not Found'
            }
        } else if (ctx.status === 500) {
            ctx.body = {
                status: 'NG',
                msg: 'App Error'
            }
        }
        // TODO: other status handle
    }
})

app.use(cors())

const router = new Router({
    prefix: '/counter/v1'
})

router.get('/sites/:sitecode', async (ctx) => {
    let count = await getCount(ctx.params.sitecode)
    ctx.body = {
        status: 'OK',
        pv: count
    }
})

router.put('/sites/:sitecode', async (ctx) => {
    let count = await getIncreasedCount(ctx.params.sitecode)
    ctx.body = {
        status: 'OK',
        pv: count
    }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.on('error', (err, ctx) => {
    ctx.body = {
        status: 'NG',
        msg: 'App Error'
    }
})

app.listen(config.port || 3000)
