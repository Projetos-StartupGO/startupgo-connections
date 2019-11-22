const Startup = require('../models/Startup');

module.exports = {
  store(req, res) {
    const { founder, name, description, market, target_audience, stage, address } = req.body;

    if (!req.body) {
      return res.status(400).json({ Error: 'No body provided' });
    }

    // TODO get lat and long using the address provided

    Startup.create(
      {
        founder,
        name,
        description,
        market,
        target_audience,
        stage,
        address
      },
      (err, startup) => {
        if (err) return res.status(500).json(err.message);

        else return res.status(201).json(startup);
      }
    );
  },

  index(req, res) {
    const { startupId } = req.params;

    if (!startupId) {
      return res.status(400).json({ Error: 'No id provided to found' });
    }

    Startup.findById(startupId).exec((err, startup) => {
      if (!startup) {
        return res.status(404).json({ Error: 'No startups found' })
      }

      if (err) {
        console.log(err);
        return res.status(500).json(err.message);
      }

      else return res.status(200).json(startup);
    })
  },

  show(req, res) {
    const { market } = req.query;

    if (market) {
      Startup.find({ market }).exec((err, startups) => {
        if (!startups) return res.status(404).json({ Error: 'No startups found' });

        if (err) return res.status(500).json(err.message);

        else return res.status(200).json(startups);
      });
    } else {
      Startup.find({}).exec((err, startups) => {
        if (err) return res.status(500).json(err.message);

        else return res.status(200).json(startups);
      });
    }
  },

  update(req, res) {
    const { startupId } = req.params;

    if (!startupId) return res.status(400).json({ Error: 'No startupId provided' });

    Startup.findById(startupId).exec((err, startup) => {
      if (err) return res.status(500).json(err.message);

      startup.name = req.body.name;
      startup.founders = req.body.founders;
      startup.description = req.body.description;
      startup.market = req.body.market;
      startup.target_audience = req.body.target_audience;
      startup.stage = req.body.stage;
      startup.address = req.body.address;

      startup.save((err, newStartup) => {
        if (err) return res.status(500).json(err.message);

        return res.status(200).json(newStartup);
      });
    });
  },

  delete(req, res) {
    const { startupId } = req.body;

    Startup.findByIdAndRemove(startupId).exec((err, startup) => {
      if (err) return res.status(500).json(err.message);

      return res.status(200).json(null);
    });
  }
}