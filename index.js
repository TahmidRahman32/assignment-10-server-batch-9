const express = require('express')
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

   app.use(cors());
   app.use(express.json())

app.get('/', (req ,res)=>{
   res.send('assignment server')
})

app.listen(port, ()=>{
   console.log(`assignment server is running || 5000`);
})