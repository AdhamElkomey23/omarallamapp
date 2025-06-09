Set WshShell = CreateObject("WScript.Shell")

' Get the directory where this VBS file is located
ScriptDir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)

' Change to the application directory
WshShell.CurrentDirectory = ScriptDir

' Start Python HTTP server silently in background
WshShell.Run "python -m http.server 8080", 0, False

' Wait 3 seconds for server to start
WScript.Sleep 3000

' Open the application in default browser
WshShell.Run "http://localhost:8080"