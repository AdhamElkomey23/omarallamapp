# Al-Wasiloon Fertilizer Factory Management System

## Standalone Desktop Application

Complete standalone version of the Al-Wasiloon Factory Management System that runs locally without requiring internet connection, server installation, or external dependencies.

## System Requirements

- Windows 7/8/10/11
- No additional software required
- All functionality runs directly from the executable files

## Quick Start

1. **Extract all files** to any folder on your computer
2. **Double-click `START-APP.bat`** 
   - Launches the complete desktop application
   - No browser or server setup required
   - Runs as native Windows application

## Features

### Complete Factory Management
- **Sales Management** - Track all sales transactions and client information
- **Storage/Inventory** - Monitor raw materials, finished products, and stock levels
- **Expenses Tracking** - Record and categorize all business expenses
- **Workers Management** - Employee records, positions, and salary information
- **Activity Logs** - Record important factory operations and events
- **Reports & Analytics** - Financial summaries and data visualization

### Language Support
- **Arabic** (Default) - Complete right-to-left interface
- **English** - Full left-to-right interface
- Instant language switching with preserved data

### Data Management
- **Automatic Save** - All data saved locally to files
- **Data Export** - Export individual modules (Sales, Expenses, etc.)
- **Backup System** - Create complete data backups
- **Import/Restore** - Restore from previous backups

## Application Files

```
fertilizer-standalone/
├── Al-Wasiloon-Factory-Management.hta    # Main application (HTA format)
├── START-APP.bat                         # Application launcher (RECOMMENDED)
└── README.md                            # This documentation
```

## How It Works

- **Al-Wasiloon-Factory-Management.hta** - Self-contained Windows HTML Application
- **START-APP.bat** - Simple launcher that starts the application
- All data stored in local files alongside the application
- No internet connection required after initial setup
- Complete offline functionality

## Data Storage

- All data stored locally in the application folder
- Data persists between sessions
- Automatic backup to `factory_data.json`
- Safe and secure - data never leaves your computer

## Technical Details

- **Format**: Windows HTA (HTML Application)
- **Charts**: Chart.js for financial visualizations
- **Fonts**: Google Fonts (Cairo for Arabic, Inter for English)
- **Storage**: Local file system with JSON format
- **Compatibility**: All Windows versions with Internet Explorer engine

## Usage Tips

1. **First Time Setup**: Application comes with sample data to demonstrate interface
2. **Regular Backups**: Use the Export function to backup your data regularly
3. **Multi-User**: Each installation maintains separate data
4. **Performance**: Application handles thousands of records efficiently

## Troubleshooting

### Application Won't Start
1. Ensure all files are extracted to the same folder
2. Right-click `START-APP.bat` and select "Run as administrator"
3. Check Windows security settings allow HTA files to run

### Data Loss Prevention
1. Use the Export function regularly to backup your data
2. Data is stored in `factory_data.json` in the application folder
3. Keep backup copies of this file for safety

### Browser Compatibility
- Runs on Windows Internet Explorer engine (built into Windows)
- No external browser required
- Modern HTML/CSS/JavaScript features supported

## Security

- All data stored locally on your computer
- No external connections except for fonts (optional)
- No user accounts or passwords required
- Complete offline functionality
- Data files can be encrypted using Windows file encryption

## Support

This standalone desktop application contains the exact original functionality from the Replit web version, converted to run natively on Windows without any external dependencies.

---

**Al-Wasiloon Factory Management System v1.0**  
*Standalone Desktop Edition - HTA Format*