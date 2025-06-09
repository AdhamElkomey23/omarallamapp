Set WshShell = CreateObject("WScript.Shell")
Set FSO = CreateObject("Scripting.FileSystemObject")

' Get the directory where this VBS file is located
ScriptDir = FSO.GetParentFolderName(WScript.ScriptFullName)

' Change to the application directory
WshShell.CurrentDirectory = ScriptDir

' Try Node.js first (most reliable)
On Error Resume Next
WshShell.Run "node --version", 0, True
If Err.Number = 0 Then
    ' Node.js is available, start Node server
    WshShell.Run "node server.js", 0, False
    WScript.Sleep 3000
    WshShell.Run "http://localhost:8080"
    WScript.Quit
End If
On Error Goto 0

' Try Python 3 as fallback
On Error Resume Next
WshShell.Run "python --version", 0, True
If Err.Number = 0 Then
    ' Python 3 is available
    WshShell.Run "python -m http.server 8080", 0, False
    WScript.Sleep 3000
    WshShell.Run "http://localhost:8080"
    WScript.Quit
End If
On Error Goto 0

' Try Python 2 as final fallback
On Error Resume Next
WshShell.Run "python2 --version", 0, True
If Err.Number = 0 Then
    ' Python 2 is available
    WshShell.Run "python2 -m SimpleHTTPServer 8080", 0, False
    WScript.Sleep 3000
    WshShell.Run "http://localhost:8080"
    WScript.Quit
End If
On Error Goto 0

' If no server is available, show error message
MsgBox "Error: No suitable server found." & vbCrLf & vbCrLf & _
       "Please install one of the following:" & vbCrLf & _
       "1. Node.js (Recommended) - https://nodejs.org" & vbCrLf & _
       "2. Python 3 - https://python.org" & vbCrLf & vbCrLf & _
       "After installation, restart this application.", _
       vbCritical, "Al-Wasiloon Factory Management"