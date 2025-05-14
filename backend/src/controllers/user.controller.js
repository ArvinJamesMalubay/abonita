const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Ensure the user can only update their own profile
    if (req.userId !== parseInt(userId) && req.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this profile'
      });
    }

    // Find the user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prepare update data
    const updateData = {};
    
    // Basic fields
    if (req.body.name) updateData.fullName = req.body.name;
    if (req.body.email) {
      // Check if email already exists (for another user)
      const existingUser = await User.findOne({
        where: {
          email: req.body.email,
          id: { [Op.ne]: userId } // Not equal to this user's ID
        }
      });
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email is already in use by another account'
        });
      }
      
      updateData.email = req.body.email;
    }
    if (req.body.phone) updateData.phone = req.body.phone;
    
    // Password change if provided
    if (req.body.currentPassword && req.body.newPassword) {
      // Verify current password
      const isPasswordValid = await user.validatePassword(req.body.currentPassword);
      
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Current password is incorrect'
        });
      }
      
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(req.body.newPassword, salt);
    }
    
    // Handle profile image if provided
    if (req.file) {
      // Delete old profile image if it exists
      if (user.profileImage && !user.profileImage.includes('default')) {
        const oldImagePath = path.join(__dirname, '..', '..', user.profileImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      // Save new image path
      updateData.profileImage = `/uploads/profile/${req.file.filename}`;
    }
    
    // Update the user
    await user.update(updateData);
    
    // Get updated user without password
    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    });
    
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
};

// Get user settings
exports.getUserSettings = async (req, res) => {
  try {
    const userId = req.userId;
    
    // Find the user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Get settings from user model (or return default settings if not set)
    const settings = user.settings || {
      general: {
        language: 'en',
        dateFormat: 'MM/DD/YYYY',
        timeFormat: '12h',
        currency: 'PHP',
        timezone: 'Asia/Manila'
      },
      notifications: {
        emailNotifications: true,
        orderUpdates: true,
        quotationUpdates: true,
        productUpdates: true,
        newsletterSubscription: false
      },
      security: {
        twoFactorAuth: false,
        loginNotifications: true,
        sessionTimeout: 30
      },
      appearance: {
        theme: 'light',
        fontSize: 'medium',
        sidebarCollapsed: false,
        compactTables: false
      }
    };
    
    res.status(200).json({
      success: true,
      settings
    });
    
  } catch (error) {
    console.error('Get user settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve settings',
      error: error.message
    });
  }
};

// Update user settings
exports.updateUserSettings = async (req, res) => {
  try {
    const userId = req.userId;
    const newSettings = req.body;
    
    // Find the user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Update settings
    await user.update({
      settings: newSettings
    });
    
    res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      settings: newSettings
    });
    
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update settings',
      error: error.message
    });
  }
}; 