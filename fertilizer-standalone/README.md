# Al-Wasiloon Fertilizer Factory Management System

## Standalone Desktop Application

This is a complete standalone version of the Al-Wasiloon Fertilizer Factory Management System that runs locally on your laptop without requiring internet connection or browser hosting.

## System Requirements

- Windows 7/8/10/11
- Python (automatically available on most Windows systems)
- Any modern web browser (Chrome, Firefox, Edge, Safari)

## Installation & Usage

### Quick Start (Recommended)

1. **Extract all files** to any folder on your computer
2. **Double-click `START-SILENT.vbs`** for silent startup
   - This starts the application without showing terminal windows
   - Opens automatically in your default browser

### Alternative Start Methods

- **`START.bat`** - Shows terminal window with status information
- Both methods work identically, choose based on your preference

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
- **Automatic Save** - All data saved locally in browser storage
- **Data Export** - Export individual modules (Sales, Expenses, etc.)
- **Backup System** - Create complete data backups
- **Import/Restore** - Restore from previous backups

## Application Structure

```
fertilizer-standalone/
├── index.html          # Main application interface
├── app.js             # Complete application logic
├── START.bat          # Windows batch launcher (with terminal)
├── START-SILENT.vbs   # Silent VBS launcher (no terminal)
└── README.md          # This documentation
```

## Data Storage

- All data is stored locally in your browser's local storage
- No internet connection required after initial setup
- Data persists between sessions
- Safe and secure - data never leaves your computer

## Technical Details

- **Frontend**: Pure HTML5, CSS3, JavaScript
- **Charts**: Chart.js for financial visualizations
- **Fonts**: Google Fonts (Cairo for Arabic, Inter for English)
- **Server**: Python HTTP server (built into Windows)
- **Port**: 8080 (automatically configured)

## Troubleshooting

### Application Won't Start
1. Ensure Python is installed (usually pre-installed on Windows)
2. Try running `START.bat` to see error messages
3. Check if port 8080 is available

### Data Loss Prevention
1. Use the Export function regularly to backup your data
2. Data is stored in browser - clearing browser data will delete application data
3. Export before major system changes or browser updates

### Browser Compatibility
- Tested on: Chrome, Firefox, Edge, Safari
- Requires JavaScript enabled
- Modern browser features required (ES6+)

## Usage Tips

1. **First Time Setup**: Application comes with sample data to help you understand the interface
2. **Regular Backups**: Export your data weekly using the Reports section
3. **Multi-User**: Each browser profile maintains separate data
4. **Performance**: Application handles thousands of records efficiently

## Security

- All data stored locally on your computer
- No external connections except for fonts (optional)
- No user accounts or passwords required
- Complete offline functionality

## Support

This is the exact original Replit application code converted to run as a standalone desktop application. All functionality from the original web version is preserved with no modifications to the core business logic.

---

**Al-Wasiloon Factory Management System v1.0**  
*Standalone Desktop Edition*