#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

#MaxThreadsperHotkey 2
#IfWinActive Minecraft
z::
	
	toggle := !Toggle
	
	if toggle
	{
		chat("finished")
	}

return

turn(richtung)
{
	x := 876 * richtung
	y := 0

	DllCall("mouse_event", uint, 1, int, x, int, y, uint, 0, int, 0)

}


chat(message)
{
	Send {t}
	Sleep 100
	Send ,[AHK_SCRIPT]: + %message%
	Send {Enter}
}

mine()
{
	Send {LButton down}
	Sleep 600
	Send {LButton up}
}
place()
{
	Send {RButton}
	check_empty()
}

select(slot)
{
	Send {%slot%}
}

walk(blocks)
{
	speed := 1.1
	delay := blocks/speed *1000
	Send {s down}
	Sleep, delay
	Send {s up}
}

jump_place()
{
	Send {1}

	Send {Space down}
	Send {RButton down}
	Sleep, 500
	Send {Space up}	
	Send {RButton up}
	check_empty()
}

check_empty()
{
	ImageSearch, FoundX, FoundY, 0, 0, A_ScreenWidth, A_ScreenHeight, C:\Users\Oskar\Desktop\empty.png
	if (ErrorLevel = 2)
	    chat("check_empty function run error")
	else
	    Send {MButton}
	    return
}

Return

^!o::
ImageSearch, FoundX, FoundY, 0, 0, A_ScreenWidth, A_ScreenHeight, C:\Users\Oskar\Desktop\empty.png
if (ErrorLevel = 2)
    chat("function cant run")
else if (ErrorLevel = 1)
    chat("wasnt found")
else
    chat("was found ")
    return
Return


; TODO immer bei jeden loop fenste rnamen checken 
^!f::	;With "F" you start the Script
toggle := !Toggle

if toggle
{
	Send {Shift down}

	smeng_delay := 20
	counter := 0

	FileRead, pattern_string, C:\Users\Oskar\Desktop\pattern.txt

	word_array := StrSplit(pattern_string, "|") ;

	;inital block height
	jump_place()

	;row loop 
	for index, element in word_array
	{
			
		; for each row it exract slot from sttring and palce block per Slot 

		Loop, Parse, element, % "/"
		{
			walk(1)
			Sleep smeng_delay
			select(A_LoopField)
			Sleep smeng_delay
			place()
			Sleep smeng_delay
			counter = counter +1;
			
		}

		;last block
		walk(1)
		Sleep smeng_delay
		select(1)
		Sleep smeng_delay
		place()

		;pillar up
		Sleep smeng_delay
		jump_place()
		turn(1)
		turn(1)
		Sleep, smeng_delay
	}
	
	Send {Shift up}

	chat("Finished building.Placed blocks:" + counter)

}

return