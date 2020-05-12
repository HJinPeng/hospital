const express = require('express')


const app = express()
app.set('secret','45fsdgsd4564sdg31hr')   //用户token加密，一般存在数据库中

app.use(require('cors')())   //中间件，使用跨域模块app.use(express.json())   //中间件，让await Category.create(req.body); 能用
app.use(express.json())   //中间件，让await Category.create(req.body); 能用

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/hospital')(app)
require('./routes/web-wx')(app)

app.listen(3000,() => {
  console.log("http://localhost:3000");
});