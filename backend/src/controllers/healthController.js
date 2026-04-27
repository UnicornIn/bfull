const getHealth = (req, res) => {
  res.json({
    status: 'ok',
    service: 'GlowUp API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
};

module.exports = { getHealth };
