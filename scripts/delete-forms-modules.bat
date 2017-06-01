@echo off
setlocal


rem Deletes all the forms related configurations from a project. The final project will run cxp modules only.


rem Check if executed in same directory as script directory
if not "%cd%\" == "%~dp0" (
    echo ERROR: Script must be executed in the directory in which it is located.
    echo Execution dir = %cd%\, but script dir = %~dp0"
    goto :EOF
)

:LOOP1
set /P isConfirmed=All Forms modules in your project will be removed (it can only be undone if the project is under version control). Continue? [y/n]
if /I "%isConfirmed%" == "y" (
    cd ..
    rem Remove all folders starting with 'forms-'
    for /D /R %%X in (forms-*) do (rd /S /Q "%%X")

    rem Delete modules from ../pom.xml
    rem        <module>forms-parent</module>
    rem        <module>forms-home</module>
    rem        <module>forms-plugins</module>
    rem type pom.xml | findstr /v module\>forms-
    call :del-line pom.xml "module\>forms-"


    rem Delete dependencies from ../pom.xml
    call :del-between-markers pom.xml FORMS-DEPENDENCIES-START FORMS-DEPENDENCIES-END


    rem Delete properties from ../pom.xml
    rem type pom.xml | findstr /v forms.version | findstr /v forms.home | findstr /v forms-runtime.dir
    call :del-line pom.xml "forms.version forms.home forms-runtime.dir"


    rem Delete module from ../webapps/pom.xml
    rem       <module>forms-runtime</module>
    call :del-line webapps\pom.xml "module>forms-"

    rem Delete forms proxy from ../webapps/portalserver/pom.xml
    call :del-between-markers webapps\portalserver\pom.xml FORMS-PROXY-START FORMS-PROXY-END

    rem Delete property from ../configuration/pom.xml
    rem       <forms.home>some-forms-home-path</forms.home>
    call :del-line configuration\pom.xml "forms.home"

    rem Delete plugin from ../configuration/pom.xml
    call :del-between-markers configuration\pom.xml FORMS-CONTEXT-START FORMS-CONTEXT-END

    rem Delete war from assembly
    call :del-between-markers dist\assembly\assembly.xml FORMS-RUNTIME-START FORMS-RUNTIME-END

    echo.
    echo "Forms modules removed."
    goto :EOF
)
if /I "%isConfirmed%" == "n" (
    echo.
    echo Cancelled.
    goto :EOF
)
goto :LOOP1

:: force execution to quit at the end of the "main" logic
EXIT /B %ERRORLEVEL%



rem FUNCTION ------------- del-between-markers -------------

:del-between-markers
set filename=%1
set startline=%2
set endline=%3

echo Delete between markers %startline% and %endline% in file %filename%.

rem Get start and end line numbers of the unwanted section
set start=

for /F "delims=:" %%a in ('findstr /N "%startline% %endline%" "%filename%"') do (
   if not defined start (
      set start=%%a
   ) else (
      set end=%%a
      goto :exitloop
   )
)

:exitloop

if /I "%start%" == "" (
   echo - Start marker %startline% not found in file %filename%. Skip modification!
   goto :eofnc
)
if /I "%end%" == "" (
   echo - End marker %endline% not found in file %filename%. Skip modification!
   goto :eofnc
)

echo - Line nr start is %start%
echo - Line nr end is %end%

rem Copy all lines, excepting the ones in start-end section
(for /F "tokens=1* delims=:" %%a in ('findstr /N "^" "%filename%"') do (
   if %%a lss %start% echo(%%b
   if %%a gtr %end% echo(%%b
)) > tempFile.xml

xcopy /y tempFile.xml %filename% > nul
del tempFile.xml

:eofnc
echo.
EXIT /B 0


rem FUNCTION ------------- del-line -------------

:del-line
set filename=%1
set marker=%2

echo Delete line with marker %marker% from file %filename%
echo.

rem Delete the line containing a specified marker
type %filename% | findstr /v %marker% > tempFile.xml
xcopy /y tempFile.xml %filename% > nul
del tempFile.xml
EXIT /B 0


