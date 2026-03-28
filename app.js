const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Trang chủ - API chính
app.get('/', (req, res) => {
  res.json({
    message: '🚧 STAGING VERSION',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    platform: 'Render.com + GitHub Actions',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint - dùng cho monitoring
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Info endpoint - hiển thị thông tin build
app.get('/info', (req, res) => {
  res.json({
    app: 'DevOps Demo',
    version: '2.0.0',
    node_version: process.version,
    build_time: process.env.BUILD_TIME || 'local',
    commit_sha: process.env.COMMIT_SHA || 'unknown'
  });
});
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
  });
}

// Export app cho test
module.exports = app;