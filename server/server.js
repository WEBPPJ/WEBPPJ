const express = require('express')
const app = express()

    




app.get('/api/details/:coaster_id', (req, res) => {

    const { coaster_id } = req.params

    Coaster
        .findById(coaster_id)
        .then(coaster => res.json(coaster))
})

app.listen(5005, () => console.log('SERVIDOR LEVANTADO'))