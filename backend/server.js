import express from "express"
import settings from "./data/common.json" with { type: 'json' }
import pages from "./data/pages.json" with { type: 'json' }


const app = express()

const PORT = process.env.POST || 3000

app.get("/api/settings", (req, res) => {
    res.json(settings)
})

app.get("/api/pages",(req, res) => {
    const page = pages.find( (p) => p.path === req.query.path )

    if(!page){
        return res.status(404).json({error: 'Page not found'})
    }

    return res.json(page)
})

app.listen(PORT, () => {
    console.log(`Server works on http://localhost:${PORT}`)
})