cd webapps\contentservices
start "Content Services" run.bat
cd ..\orchestrator
start "Orchestrator" run.bat

cd ..\portalserver
if "%1" == "-d" GOTO withdemo
if "%2" == "-d" GOTO withdemo

ECHO Run Portal without Demo Services
start "Portal Server" run.bat
GOTO portallaunched

:withdemo
ECHO Run Portal with Demo Services
start "Portal Server" run_with_demo.bat

:portallaunched

cd ..\solr
start "Solr" run.bat


if "%1" == "-f" GOTO runforms
if "%2" == "-f" GOTO runforms

ECHO Skipped launching Forms Runtime. Use the -f flag to launch Forms.
GOTO end

:runforms
cd ..\forms-runtime
start "Forms Runtime" run.bat

:end
cd ..\..
