#!/usr/bin/env node

// Simple development server for ATC MVP
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// Handle SPA routing - serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 ATC MVP Server running at http://localhost:${PORT}`);
  console.log(`📱 Mobile-optimized interface for tenant services`);
  console.log(`🔧 Features: Maintenance, Communications, Payments, Support`);
  console.log(`\nPress Ctrl+C to stop the server`);
});