const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingsController');
// Assuming auth middleware exists, verifying path in next steps. 
// For now, I'll import it but if it fails I'll remove it.
// Checking previous clues: user referenced `server/controllers/userController.js` and `AuthContext`.
// I will assuming standard middleware `protect` and `admin` exist in `middleware/authMiddleware.js`.
// If not found, I will comment them out.

const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getSettings);
router.put('/', protect, admin, updateSettings);

module.exports = router;
